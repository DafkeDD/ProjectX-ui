# ProjectX UI

Een volledig eigen React component library, gebouwd op het **ProjectX UI-design**.
Werkt zoals shadcn/ui — dezelfde compositie, dezelfde copy-paste-aanpak — maar **zonder één regel
code van shadcn, Radix, Headless UI, cva of clsx**. Alles staat in `packages/ui/src`.

```
92 componenten · 4 talen · 2 thema's · 3 dichtheden · 0 UI-dependencies in de kern
```

| Categorie | Aantal | Waarvoor |
| --- | --- | --- |
| Basis | 11 | Button, Badge, Card, Avatar, Icon, Kbd, Skeleton … |
| Formulieren | 20 | Input, Select, Combobox, Toggle, Rating, Fieldset, RichEditor … |
| Overlays | 11 | Dialog, AlertDialog, Drawer, Popover, ContextMenu, HoverCard … |
| Data | 12 | Table, Chart, Stat, Timeline, MessageThread, Carousel, Countdown … |
| Navigatie | 12 | Tabs, Sidebar, BottomNav, Menubar, Fab, Collapsible, Stepper … |
| Datum & planning | 8 | Calendar, WeekSchedule, ResourceColumns, Swimlanes … |
| Layout | 10 | AppShell, Resizable, ScrollArea, AspectRatio, Mockup … |
| Feedback | 5 | Alert, EmptyState, Indicator, Confetti, PulseDot |
| Motion | 3 | Optioneel, achter `@projectx/ui/motion` |

---

## Snel starten

```bash
npm install
npm run dev        # documentatiesite op http://localhost:3000 (of 3001, 3002, ... als 3000 bezet is)
```

| Commando | Wat het doet |
| --- | --- |
| `npm run dev` | Start de documentatiesite (Next.js 15) |
| `npm run build` | Genereert de registry en bouwt de site |
| `npm run registry` | Regenereert `registry/`, de props-tabellen en de demo-index |
| `npm run typecheck` | TypeScript-check op de library |
| `npm run test:ui` | Bouwt de site en klikt de interactieve componenten na in Chrome |
| `npm run cli -- <commando>` | De CLI rechtstreeks vanuit de monorepo draaien |

---

## Structuur

```
projectx-ui/
├─ packages/
│  ├─ ui/                 De library
│  │  └─ src/
│  │     ├─ components/   89 componenten (.tsx + .css per component)
│  │     ├─ motion/       3 componenten achter @projectx/ui/motion (optioneel)
│  │     ├─ lib/          cn, variants, Slot, Portal, hooks, positionering, datums
│  │     ├─ icons/        eigen icon set (één path per glyph)
│  │     └─ styles/       tokens.css + base.css + index.css
│  └─ cli/                npx projectx-ui  (init / add / update / list)
├─ apps/
│  └─ docs/               De documentatiesite met live previews
├─ registry/              Gegenereerd: bron per component voor de CLI
└─ scripts/
   └─ build-registry.mjs  Genereert registry, props-tabellen en demo-index
```

---

## In een ander project gebruiken

Zolang de CLI niet op npm staat, koppel je hem eenmalig vanuit deze repo:

```bash
cd packages/cli && npm link            # daarna werkt `projectx-ui` overal op je machine
```

```bash
npx projectx-ui init                   # tokens, base-CSS en hulpfuncties
npx projectx-ui add button card dialog # componenten kopiëren (+ afhankelijkheden)
npx projectx-ui add --all              # alles in één keer
npx projectx-ui update                 # alles bijwerken + nieuwe componenten erbij
npx projectx-ui list                   # overzicht
npx projectx-ui add button --registry https://raw.githubusercontent.com/<jij>/<repo>/main/registry/index.json
```

De CLI schrijft naar `components/ui/` (instelbaar in `projectx-ui.json`), herschrijft de imports naar
één platte map en houdt `components/ui/ui.css` (CSS-imports) en `components/ui/index.ts` (exports) bij. Importeer dat ene
bestand in je globale stylesheet en je bent klaar.

`update` haalt de nieuwste versie van alles wat al in je project staat, installeert meteen de componenten
die sinds je laatste update in de registry bijgekomen zijn, en laat bestanden die je zelf aangepast hebt met
rust — die worden overgeslagen tenzij je `--force` meegeeft. Wat er precies zou gebeuren zie je vooraf met
`--dry-run`; met `--only-installed` blijf je bij wat je al hebt. De CLI houdt daarvoor `projectx-ui.lock.json`
bij (welke componenten je hebt + een hash per bestand) — commit dat bestand mee.

---

## Animatie in de kern

Overlays komen zacht binnen én gaan zacht weg: Dialog, Drawer, Popover, Tooltip
en Toast blijven na het sluiten kort in de DOM staan met `data-state="closed"`,
zodat de CSS een uitgaande animatie kan draaien. Dat regelt de hook `usePresence`
in `packages/ui/src/lib/hooks.ts` — ongeveer veertig regels, geen dependency.

Accordion en Collapsible animeren hun hoogte met `grid-template-rows: 0fr → 1fr`.
Zo hoeft de hoogte niet gemeten te worden en schuift ook inhoud die onderweg
verandert netjes mee.

Alles respecteert `prefers-reduced-motion`.

---

## Motion-laag (optioneel)

De kern van de library heeft geen enkele dependency en dat blijft zo. Daarnaast staat er één
map die wél iets nodig heeft: `packages/ui/src/motion`, met de dingen die in pure CSS veel te
duur worden — gebaren, uitgaande animaties en meeschuivende layout.

```bash
npm i motion            # alleen nodig als je hieruit importeert
```

```tsx
import { MotionDrawerContent, ReorderList, MotionSegmented } from "@projectx/ui/motion";
```

| Component | Wat het toevoegt |
|---|---|
| `MotionDrawerContent` | Vervangt `DrawerContent`: veerbeweging, echte exit-animatie, wegvegen om te sluiten |
| `ReorderList` | Lijst waarvan je de volgorde sleept, met of zonder greepje |
| `MotionSegmented` | Zelfde API als `Segmented`, maar de actieve achtergrond schuift mee |

`motion` staat in `package.json` als **optionele** peer dependency: importeer je niets uit
`@projectx/ui/motion`, dan hoef je het niet te installeren en komt het ook niet in je bundel.

De CLI houdt dat onderscheid vast: `npx projectx-ui add --all` slaat deze drie over, en
`npx projectx-ui update` installeert ze niet vanzelf. Je haalt ze er bewust bij met hun naam
of met `--with-extras`; daarna vertelt de CLI welk npm-package je nog nodig hebt.

Alle drie respecteren `prefers-reduced-motion`: dan vervagen ze in plaats van te bewegen en
staat slepen uit.

---

## Meertalige documentatiesite

De docs-site draait op [next-intl](https://next-intl.dev), opgezet zoals de ProjectX-frontend:

```
apps/docs/i18n/routing.ts      # locales + defaultLocale + localePrefix
apps/docs/i18n/request.ts      # laadt messages/<locale>.json per request
apps/docs/i18n/navigation.ts   # Link, redirect, usePathname, useRouter
apps/docs/middleware.ts        # taaldetectie (Next 16 noemt dit proxy.ts)
apps/docs/messages/*.json      # nl · fr · en · de
apps/docs/app/[locale]/...     # alle routes onder een locale-segment
```

`localePrefix` staat op `never`: de URL blijft `/docs`, de taal komt uit de
`NEXT_LOCALE`-cookie en anders uit de `Accept-Language`-header. De taalkiezer
rechtsboven (`components/locale-switcher.tsx`) zet die cookie.

Een tekst vertalen: sleutel toevoegen in alle vier de `messages/*.json`, daarna
`useTranslations("namespace")` in een client component of
`getTranslations("namespace")` in een server component.

Vertaald zijn de metadata, de navigatie, de topbar en de homepage. De teksten op
de documentatiepagina's zelf (introductie, installatie, theming, componentbeschrijvingen
in `content/catalog.ts`) staan nog hardcoded in het Nederlands.

---

## Design tokens

**Alle kleuren komen uit `packages/ui/src/styles/tokens.css`** — exact overgenomen uit het
ProjectX UI-design. Componenten schrijven nooit een hex-waarde; ze gebruiken uitsluitend variabelen:

```css
--accent: #0d9488;   --surface: #ffffff;   --text: #0f1729;
--green: #16a34a;    --amber: #d97706;     --red: #dc2626;
--r-sm: 8px;         --sh-md: 0 4px 12px rgba(16,23,41,.07);
```

Eén token aanpassen herkleurt de hele library, in licht én donker.
Donkere modus staat in hetzelfde bestand onder `[data-theme="dark"]`.

---

## Eigen primitieven (geen dependencies)

| Bestand | Vervangt | Wat het doet |
| --- | --- | --- |
| `lib/cn.ts` | clsx / classnames | Klassen samenvoegen |
| `lib/variants.ts` | cva | Varianten → klassen |
| `lib/slot.tsx` | @radix-ui/react-slot | `asChild`-patroon |
| `lib/anchor.ts` | Floating UI / Popper | Positionering met flip + clamp |
| `lib/portal.tsx` | Radix Portal | Renderen in `document.body` |
| `lib/hooks.ts` | Radix-hooks | Controlled state, focus-trap, escape, scroll-lock, outside-click |
| `lib/date.ts` | date-fns / dayjs | Weken, maanden, ISO-weeknummers, tijd parsen en formatteren (Intl, nl-BE) |
| `lib/schedule.ts` | — | Gedeeld agendamodel: resources, events, overlap-packing, groeperen |
| `lib/use-voice.ts` | react-speech-recognition | Spraakherkenning van de browser, met nette terugval |
| `lib/image.ts` | react-easy-crop / browser-image-compression | Foto vierkant bijsnijden en verkleinen op canvas |
| `icons/` | lucide / feather | Eigen icon set, 24×24, stroke-based |

---

## Componenten

**Basis** — Button, Badge, Chip, Avatar, Card, Separator, Kbd, Skeleton, Spinner, CopyButton, Icon
**Formulieren** — Input, Textarea, Field, Label, Checkbox, RadioGroup, Switch, Select, Combobox, Slider, OtpInput, FileDrop, Composer, VoiceButton, AvatarUpload, SwatchPicker
**Overlays** — Dialog, Drawer, Popover, DropdownMenu, Tooltip, Command, Toast, ModalProvider (imperatief)
**Navigatie** — Tabs, Accordion, Breadcrumb, Pagination, Segmented, Stepper, Toolbar, Sidebar
**Datum & planning** — Calendar, DatePicker, DateRangePicker, TimeField, TimeRangeField, PeriodNav
**Agendaweergaven** — WeekSchedule (tijdraster), ResourceColumns, Swimlanes, TimeSlotList — één datamodel
**Data** — Table, ListRow, TaskItem, Stat, DataPill, Charts (bar / line / donut / sparkline), Progress
**Feedback** — Alert, EmptyState, PulseDot, ConfettiBurst
**Layout** — AppShell, Workspace, SectionHeader, EntityHeader, AuthLayout, Theme (+ DensityToggle)

Elk component: TypeScript, controlled + uncontrolled, ARIA-rollen, toetsenbordnavigatie,
zichtbare focus, licht + donker.

---

## Conventies

- Elke CSS-klasse begint met `pxui-` — botst nooit met bestaande styling.
- Eén `.tsx` + één `.css` per component, altijd samen gekopieerd.
- Sub-componenten volgen de compositie die je van shadcn kent:
  `Dialog / DialogTrigger / DialogContent / DialogHeader / DialogTitle / DialogFooter`.
- Props-tabellen in de docs worden **uit de TypeScript-bron gegenereerd** en kunnen dus niet verouderen.
- Tailwind v4 draait enkel als CSS-engine (reset + utilities voor je eigen markup) en is niet verplicht.
- Drag & drop (WeekSchedule) is eigen pointer-code: geen dnd-kit, geen react-beautiful-dnd.
- `Sidebar` heeft een `tone="inverted"` variant: een donkere rail waarvan alle kleuren met `color-mix`
  uit de bestaande tokens komen, dus ook die blijft binnen het ProjectX UI-palet.
- `Workspace` stapelt op basis van zijn eigen breedte (container query), niet op vensterbreedte.
- De vier agendaweergaven delen `ScheduleResource` en `ScheduleEvent` uit `lib/schedule.ts`, dus wisselen
  van weergave kost geen omzetting van je data.
- Dichtheid zit in één token: `--density`. Elke hoogte en padding is `calc(Npx * var(--density))`, dus
  `DensityToggle` (compact / normaal / ruim) schaalt de hele library zonder een component aan te raken.
- Spraak (`VoiceButton`, `Composer`) draait op de Web Speech API van de browser. Ondersteunt die het niet,
  dan verdwijnt de knop of wordt ze grijs — je krijgt nooit een dood knopje.
- Nieuwe componenten dragen `isNew: true` in `apps/docs/content/catalog.ts`; dat toont het "nieuw"-label
  in de navigatie, op de pagina en in het blok "Nieuw in deze versie".

---

## Opbouw

Deze library is in acht stappen opgebouwd (zie `apps/docs/content/roadmap.ts` en de introductiepagina):
fundament → formulieren & basis → navigatie & feedback → overlays → datum & planning → data & layout → extra's → CLI.

## Labels per release

`isNew` en `isUpdated` in `apps/docs/content/catalog.ts` horen bij één release, niet bij een component.
Bij elke release: eerst alle vlaggen weghalen, daarna alleen de componenten van die release opnieuw labelen.
