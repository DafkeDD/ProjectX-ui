# ProjectX UI

Een volledig eigen React component library, gebouwd op het **ProjectX UI-design**.
Werkt zoals shadcn/ui — dezelfde compositie, dezelfde copy-paste-aanpak — maar **zonder één regel
code van shadcn, Radix, Headless UI, cva of clsx**. Alles staat in `packages/ui/src`.

We bouwen de library **stap voor stap** op. De voortgang staat in `apps/docs/content/roadmap.ts`
en is zichtbaar op de introductiepagina van de docs-site.

## Snel starten

```bash
npm install
npm run dev        # genereert registry + start de docs op http://localhost:3000
```

| Commando | Wat het doet |
| --- | --- |
| `npm run dev` | Regenereert registry/props/demo-index en start de documentatiesite (Next.js 15) |
| `npm run build` | Genereert de registry en bouwt de site |
| `npm run registry` | Regenereert `registry/`, de props-tabellen en de demo-index |
| `npm run typecheck` | TypeScript-check op de library |

## Structuur

```
CustomUI/
├─ packages/ui/src/
│  ├─ components/   één .tsx + één .css per component
│  ├─ lib/          cn, variants, Slot, hooks
│  ├─ icons/        eigen icon set (24×24, stroke)
│  └─ styles/       tokens.css + base.css + index.css
├─ apps/docs/       documentatiesite met live previews
│  ├─ content/      catalog.ts (componentenlijst) + roadmap.ts
│  └─ demos/        één bestand per voorbeeld
├─ registry/        gegenereerd — bron voor de latere CLI
└─ scripts/build-registry.mjs
```

## Een nieuw component toevoegen

1. `packages/ui/src/components/<naam>.tsx` + `<naam>.css` (klassen met prefix `pxui-`, enkel tokens).
2. Export in `packages/ui/src/index.ts`, CSS-import in `packages/ui/src/styles/index.css`.
3. Demo('s) in `apps/docs/demos/<naam>-basic.tsx`.
4. Entry in `apps/docs/content/catalog.ts`.
5. `npm run registry` (gebeurt ook automatisch bij `npm run dev`).

## Conventies

- Elke CSS-klasse begint met `pxui-`. Componenten schrijven nooit een hex-waarde: alleen `var(--…)`.
- Dichtheid zit in één token: `--density`. Hoogtes en paddings zijn `calc(Npx * var(--density))`.
- Sub-componenten volgen de shadcn-compositie: `Card / CardHeader / CardTitle / CardContent / CardFooter`.
- Props-tabellen worden uit de TypeScript-bron gegenereerd; schrijf JSDoc (`/** … */`) boven elke prop.
- Tailwind v4 draait enkel als CSS-engine (reset + utilities) en is niet verplicht.
