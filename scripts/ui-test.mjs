#!/usr/bin/env node
/**
 * Klikt de interactieve componenten na in een echte browser.
 *
 *   npm run test:ui                 bouwt de site, start ze en test
 *   node scripts/ui-test.mjs        test tegen de laatste build
 *   node scripts/ui-test.mjs --base http://localhost:3000   tegen een draaiende site
 *   node scripts/ui-test.mjs --base http://localhost:3005
 *
 * Chrome wordt gezocht op de gebruikelijke plekken; met CHROME_PATH wijs je
 * zelf een browser aan. Alleen puppeteer-core is nodig — geen eigen Chromium.
 */
import { createServer } from "node:net";
import { spawn, spawnSync } from "node:child_process";
import { existsSync, rmSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const require_ = createRequire(import.meta.url);

const CHROME_PADEN = [
  process.env.CHROME_PATH,
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/usr/bin/google-chrome",
  "/usr/bin/chromium",
].filter(Boolean);

function zoekChrome() {
  const pad = CHROME_PADEN.find((kandidaat) => existsSync(kandidaat));
  if (!pad) {
    console.error(
      "Geen Chrome gevonden. Zet CHROME_PATH naar je browser, bijvoorbeeld:\n" +
        '  CHROME_PATH="C:/Program Files/Google/Chrome/Application/chrome.exe" npm run test:ui'
    );
    process.exit(2);
  }
  return pad;
}

function vrijePoort() {
  return new Promise((resolve, reject) => {
    const server = createServer();
    server.unref();
    server.on("error", reject);
    server.listen(0, () => {
      const { port } = server.address();
      server.close(() => resolve(port));
    });
  });
}

/** Wacht tot de site antwoordt, of geef op na een halve minuut. */
async function wachtOpServer(basis) {
  for (let poging = 0; poging < 60; poging += 1) {
    try {
      const antwoord = await fetch(basis, { signal: AbortSignal.timeout(2000) });
      if (antwoord.ok) return true;
    } catch {
      // nog niet klaar
    }
    await new Promise((klaar) => setTimeout(klaar, 500));
  }
  return false;
}

/* ------------------------------------------------------------------ */
/* Controles                                                           */
/* ------------------------------------------------------------------ */
const resultaten = [];
const wacht = (ms) => new Promise((klaar) => setTimeout(klaar, ms));

function check(naam, geslaagd, extra = "") {
  resultaten.push({ naam, geslaagd });
  console.log(`  ${geslaagd ? "\u001b[32mOK\u001b[0m  " : "\u001b[31mFOUT\u001b[0m"}  ${naam}${extra ? `  — ${extra}` : ""}`);
}

async function testAlles(page, basis) {
  const ga = async (pad) => {
    await page.goto(`${basis}${pad}`, { waitUntil: "networkidle2", timeout: 60000 });
    await wacht(400);
  };

  console.log("\nAlertDialog");
  await ga("/docs/componenten/alert-dialog");
  {
    let openKnop = null;
    for (const knop of await page.$$("button")) {
      const tekst = await page.evaluate((el) => el.innerText, knop);
      if (tekst.includes("Afspraak verwijderen")) openKnop = knop;
    }
    await openKnop.click();
    await wacht(350);
    check("opent", Boolean(await page.$('[role="alertdialog"]')));

    const focus = await page.evaluate(() => document.activeElement?.innerText?.trim() ?? "");
    check("focus staat op Annuleren", focus === "Annuleren", `focus: ${focus}`);

    await page.mouse.click(20, 20);
    await wacht(300);
    check("klik ernaast sluit niet", Boolean(await page.$('[role="alertdialog"]')));

    const knoppen = await page.$$('[role="alertdialog"] button');
    await knoppen[knoppen.length - 1].click();
    await wacht(1400);
    check("sluit na bevestigen", !(await page.$('[role="alertdialog"]')));
  }

  console.log("\nContextMenu");
  await ga("/docs/componenten/context-menu");
  {
    const zone = await page.$(".pxui-context-trigger div");
    const doos = await zone.boundingBox();
    await page.mouse.click(doos.x + 100, doos.y + 60, { button: "right" });
    await wacht(350);
    check("opent bij rechtermuisklik", Boolean(await page.$(".pxui-menu")));

    const eerste = await (await page.$(".pxui-menu")).boundingBox();
    await page.mouse.click(doos.x + 20, doos.y + 20, { button: "right" });
    await wacht(400);
    const tweede = await (await page.$(".pxui-menu")).boundingBox();
    check("verhuist mee met de cursor", Math.abs(tweede.x - eerste.x) > 50,
      `x ${Math.round(eerste.x)} -> ${Math.round(tweede.x)}`);

    const items = await page.$$("[data-pxui-menuitem]");
    await items[0].click();
    await wacht(300);
    check("sluit na een keuze", !(await page.$(".pxui-menu")));
    check("geeft de keuze door", (await page.evaluate(() => document.body.innerText)).includes("Gekozen: Details"));
  }

  console.log("\nHoverCard");
  await ga("/docs/componenten/hover-card");
  {
    await (await page.$(".pxui-hovercard-trigger")).hover();
    await wacht(700);
    const kaart = await page.$(".pxui-hovercard");
    check("opent bij hoveren", Boolean(kaart));
    if (kaart) {
      const tekst = await page.evaluate((el) => el.innerText, kaart);
      check("toont de inhoud", tekst.toLowerCase().includes("penicilline"));
    }
    await page.mouse.move(5, 5);
    await wacht(600);
    check("sluit weer", !(await page.$(".pxui-hovercard")));
  }

  console.log("\nMessageThread");
  await ga("/docs/componenten/message-thread");
  {
    const voor = (await page.$$(".pxui-message")).length;
    await page.type(".pxui-composer textarea, .pxui-composer input", "Creditnota is verstuurd.");
    await page.keyboard.press("Enter");
    await wacht(400);
    const na = (await page.$$(".pxui-message")).length;
    check("Composer voegt een bericht toe", na === voor + 1, `${voor} -> ${na}`);
  }

  console.log("\nMockup");
  await ga("/docs/componenten/mockup");
  {
    check("browserframe staat er", Boolean(await page.$(".pxui-mockup-browser")));
    for (const knop of await page.$$('[role="tab"]')) {
      if ((await page.evaluate((el) => el.innerText.trim(), knop)) === "Telefoon") await knop.click();
    }
    await wacht(400);
    check("wisselt naar het telefoonframe", Boolean(await page.$(".pxui-mockup-phone")));
    const status = await page.$(".pxui-mockup-phone-status");
    check("telefoon heeft een statusbalk", Boolean(status));
  }

  console.log("\nTimeline");
  await ga("/docs/componenten/timeline");
  check("tekent alle stippen", (await page.$$(".pxui-timeline-item")).length === 5);

  console.log("\nResizable");
  await ga("/docs/componenten/resizable");
  {
    const breedte = async () => (await (await page.$(".pxui-resizable-panel")).boundingBox()).width;
    const voor = await breedte();

    const greep = await page.$(".pxui-resizable-handle");
    const doos = await greep.boundingBox();
    await page.mouse.move(doos.x + doos.width / 2, doos.y + doos.height / 2);
    await page.mouse.down();
    await page.mouse.move(doos.x + 90, doos.y + doos.height / 2, { steps: 12 });
    await page.mouse.up();
    await wacht(300);
    check("slepen verbreedt het paneel", (await breedte()) - voor > 50);

    await greep.focus();
    const tussen = await breedte();
    await page.keyboard.press("ArrowLeft");
    await page.keyboard.press("ArrowLeft");
    await wacht(250);
    check("pijltjestoetsen werken", tussen - (await breedte()) > 5);

    for (let i = 0; i < 40; i += 1) await page.keyboard.press("ArrowLeft");
    await wacht(300);
    const groep = (await (await page.$(".pxui-resizable")).boundingBox()).width;
    check("minSize houdt stand", (await breedte()) / groep > 0.18);
  }

  console.log("\nCarousel");
  await ga("/docs/componenten/carousel");
  {
    const spoor = await page.$(".pxui-carousel-track");
    const begin = await page.evaluate((el) => el.scrollLeft, spoor);
    const knoppen = await page.$$(".pxui-carousel-btn");
    await knoppen[1].click();
    await wacht(700);
    check("volgende schuift op", (await page.evaluate((el) => el.scrollLeft, spoor)) > begin + 50);

    const actief = await page.$$eval(".pxui-carousel-dot", (els) =>
      els.findIndex((el) => el.hasAttribute("data-active"))
    );
    check("de stip volgt de positie", actief === 1);

    const stippen = await page.$$(".pxui-carousel-dot");
    await stippen[stippen.length - 1].click();
    await wacht(800);
    const eind = await page.evaluate((el) => ({ links: el.scrollLeft, max: el.scrollWidth - el.clientWidth }), spoor);
    check("stip springt naar het laatste item", eind.links >= eind.max - 4);
    check("knop volgende gaat uit op het einde",
      (await page.$eval(".pxui-carousel-btn:last-of-type", (el) => el.disabled)) === true);
  }

  console.log("\nToggle");
  await ga("/docs/componenten/toggle");
  {
    const eerste = await page.$(".pxui-toggle");
    const voor = await page.evaluate((el) => el.getAttribute("aria-pressed"), eerste);
    await eerste.click();
    await wacht(200);
    check("klikken wisselt aria-pressed", voor !== (await page.evaluate((el) => el.getAttribute("aria-pressed"), eerste)));

    const items = await page.$$(".pxui-toggle-group .pxui-toggle");
    await items[1].click();
    await wacht(200);
    const meerdere = await page.$$eval(".pxui-toggle-group .pxui-toggle", (els) =>
      els.filter((el) => el.getAttribute("aria-pressed") === "true").length
    );
    check("groep multiple: meerdere tegelijk aan", meerdere >= 2, `${meerdere} aan`);

    const enkel = await page.$$(".pxui-btn-group .pxui-toggle");
    await enkel[2].click();
    await wacht(250);
    const aantal = await page.$$eval(".pxui-btn-group .pxui-toggle", (els) =>
      els.filter((el) => el.getAttribute("aria-pressed") === "true").length
    );
    check("groep single: hoogstens één aan", aantal === 1, `${aantal} aan`);
  }

  console.log("\nCollapsible");
  await ga("/docs/componenten/collapsible");
  {
    const hoogte = () => page.$eval(".pxui-collapsible-inner", (el) => Math.round(el.getBoundingClientRect().height));
    const open = await hoogte();
    await (await page.$(".pxui-collapsible-trigger")).click();
    await wacht(700);
    check("dichtklappen brengt de hoogte naar nul", (await hoogte()) === 0, `${open} -> 0 px`);
    check("dichte inhoud is niet focusbaar",
      (await page.$eval(".pxui-collapsible-inner", (el) => getComputedStyle(el).visibility)) === "hidden");

    await (await page.$(".pxui-collapsible-trigger")).click();
    await wacht(700);
    check("opent weer op volle hoogte", (await hoogte()) > 50);
  }

  console.log("\nScrollArea");
  await ga("/docs/componenten/scroll-area");
  {
    const vlak = await page.$(".pxui-scroll-area");
    const randen = (el) => ({ boven: el.hasAttribute("data-fade-top"), onder: el.hasAttribute("data-fade-bottom") });
    const begin = await page.evaluate(randen, vlak);
    check("bovenaan geen vervaging, onderaan wel", begin.boven === false && begin.onder === true);

    await page.evaluate((el) => el.scrollTo({ top: el.scrollHeight, behavior: "instant" }), vlak);
    await wacht(400);
    const eind = await page.evaluate(randen, vlak);
    check("onderaan draait de vervaging om", eind.boven === true && eind.onder === false);
  }

  console.log("\nUitgaande animaties");
  await ga("/docs/componenten/dialog");
  {
    // Openen, dan sluiten: de dialoog hoort nog even te blijven staan met
    // data-state="closed" en pas daarna te verdwijnen.
    for (const knop of await page.$$("button")) {
      const tekst = await page.evaluate((el) => el.innerText, knop);
      if (tekst.includes("Tenant verwijderen")) await knop.click();
    }
    await wacht(400);
    check("Dialog opent", Boolean(await page.$('[role="dialog"]')));

    await page.keyboard.press("Escape");
    await wacht(60);
    const staat = await page
      .$eval('[role="dialog"]', (el) => el.getAttribute("data-state"))
      .catch(() => null);
    check("Dialog blijft staan tijdens het sluiten", staat === "closed", `data-state: ${staat}`);

    await wacht(500);
    check("Dialog is daarna weg", !(await page.$('[role="dialog"]')));
  }

  await ga("/docs/componenten/accordion");
  {
    const hoogte = () =>
      page.$eval(".pxui-accordion-content-wrap", (el) => Math.round(el.getBoundingClientRect().height));
    const voor = await hoogte();
    await (await page.$(".pxui-accordion-trigger")).click();
    await wacht(600);
    const na = await hoogte();
    check("Accordion animeert de hoogte", voor !== na && (voor === 0 || na === 0), `${voor} -> ${na} px`);
  }


  console.log("\nQrCode");
  await ga("/docs/componenten/qr-code");
  {
    const modules = await page.$eval(".pxui-qr-fg", (el) => (el.getAttribute("d").match(/M/g) ?? []).length);
    check("tekent een volledige code", modules > 200, `${modules} donkere modules`);
  }
}

/* ------------------------------------------------------------------ */
/* Uitvoeren                                                           */
/* ------------------------------------------------------------------ */
/**
 * Opnieuw bouwen met een schone .next-map. Een half afgebroken build laat
 * `next start` struikelen met "Cannot find module for page", en dat mag een
 * testcommando niet overkomen.
 */
function bouw() {
  console.log("Site bouwen …");
  rmSync(join(root, "apps/docs/.next"), { recursive: true, force: true });
  const resultaat = spawnSync("npm", ["run", "build"], { cwd: root, stdio: "inherit", shell: true });
  if (resultaat.status !== 0) {
    console.error("De build is mislukt; de test kan niet draaien.");
    process.exit(2);
  }
}

const basisArg = process.argv.indexOf("--base");
const eigenBasis = basisArg === -1 ? process.env.TEST_BASE : process.argv[basisArg + 1];

let server = null;
let basis = eigenBasis;

if (!basis) {
  if (process.argv.includes("--build")) bouw();
  const poort = await vrijePoort();
  basis = `http://localhost:${poort}`;
  console.log(`Site starten op ${basis} …`);
  server = spawn("npm", ["start", "-w", "@projectx/docs"], {
    cwd: root,
    env: { ...process.env, PORT: String(poort) },
    stdio: "ignore",
    shell: true,
  });
  if (!(await wachtOpServer(basis))) {
    console.error("De site kwam niet op. Draai eerst `npm run build`.");
    server.kill();
    process.exit(2);
  }
}

const puppeteer = require_("puppeteer-core");
const browser = await puppeteer.launch({
  executablePath: zoekChrome(),
  headless: true,
  args: ["--no-sandbox"],
  defaultViewport: { width: 1280, height: 900 },
});

const page = await browser.newPage();
const fouten = [];
page.on("pageerror", (error) => fouten.push(String(error)));
page.on("console", (bericht) => {
  // De 404 op favicon.ico hoort niet bij de componenten.
  if (bericht.type() === "error" && !bericht.text().includes("404")) fouten.push(bericht.text());
});

let afgebroken = null;
try {
  await testAlles(page, basis);
} catch (error) {
  afgebroken = error;
}

await browser.close();
if (server) server.kill();

if (afgebroken) {
  console.error("\nTest afgebroken:", afgebroken.message);
  process.exit(1);
}

const mislukt = resultaten.filter((r) => !r.geslaagd).length;
console.log(`\nJS-fouten in de console: ${fouten.length ? fouten.slice(0, 4).join(" | ") : "geen"}`);
console.log(`${resultaten.length - mislukt} van ${resultaten.length} controles geslaagd`);
process.exit(mislukt === 0 && fouten.length === 0 ? 0 : 1);
