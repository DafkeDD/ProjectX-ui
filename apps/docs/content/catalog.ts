export interface DemoEntry {
  /** Sleutel van het demobestand in /demos. */
  key: string;
  title: string;
  description?: string;
  /** Inhoud links uitlijnen in plaats van centreren. */
  align?: "center" | "start" | "block";
  /** Toont een "nieuw"-label bij deze demo. */
  isNew?: boolean;
}

export interface ComponentEntry {
  slug: string;
  name: string;
  description: string;
  category: string;
  /** Bestanden uit packages/ui die dit component nodig heeft. */
  files: string[];
  /** Andere componenten die mee gekopieerd worden. */
  dependsOn?: string[];
  demos: DemoEntry[];
  /** Namen van interfaces waarvan de props-tabel getoond wordt. */
  props?: string[];
  notes?: string[];
  /** Toont een "nieuw"-label in de navigatie en op de pagina. */
  isNew?: boolean;
}

export const CATEGORIES = [
  "Basis",
  "Formulieren",
  "Overlays",
  "Navigatie",
  "Datum & planning",
  "Data",
  "Feedback",
  "Layout",
] as const;

/*
 * Elke stap van de opbouw voegt hier componenten toe.
 * Houd de opmaak aan (twee spaties + "{" op een eigen regel): scripts/build-registry.mjs leest dit bestand.
 */
export const COMPONENTS: ComponentEntry[] = [
  {
    slug: "button",
    name: "Button",
    description: "Knop met zes varianten, drie maten, iconen en laadstatus.",
    category: "Basis",
    files: ["button.tsx", "button.css"],
    dependsOn: ["spinner"],
    demos: [
      { key: "button-variants", title: "Varianten" },
      { key: "button-sizes", title: "Maten en iconen" },
      { key: "button-states", title: "Laden, uitgeschakeld en groep" },
    ],
    props: ["ButtonProps"],
    notes: [
      "Met asChild rendert de knop jouw eigen element — bijvoorbeeld een link of next/link — met behoud van alle stijl en states.",
    ],
  },
  {
    slug: "badge",
    name: "Badge",
    description: "Compact label voor status, categorie of telling.",
    category: "Basis",
    files: ["badge.tsx", "badge.css"],
    demos: [
      { key: "badge-tones", title: "Tonen" },
      { key: "badge-usage", title: "Met stip en icoon" },
    ],
    props: ["BadgeProps"],
  },
  {
    slug: "card",
    name: "Card",
    description: "Basiscontainer met kop, inhoud en voettekst.",
    category: "Basis",
    files: ["card.tsx", "card.css"],
    demos: [{ key: "card-basic", title: "Opbouw", align: "block" }],
    props: ["CardProps"],
  },
  {
    slug: "spinner",
    name: "Spinner",
    description: "Ronddraaiende laadindicator die de tekstkleur erft.",
    category: "Basis",
    files: ["spinner.tsx", "spinner.css"],
    demos: [{ key: "spinner-basic", title: "Maten" }],
    props: ["SpinnerProps"],
  },
  {
    slug: "icon",
    name: "Icon",
    description: "Eigen icon set: één stroke-based glyph per naam.",
    category: "Basis",
    files: ["../icons/icon.tsx", "../icons/icons.ts"],
    demos: [{ key: "icon-gallery", title: "Volledige set", align: "block" }],
    props: ["IconProps"],
  },
  {
    slug: "theme",
    name: "Theme",
    description: "Licht/donker met ThemeProvider, useTheme en ThemeToggle.",
    category: "Layout",
    files: ["theme.tsx", "theme.css"],
    demos: [
      { key: "theme-basic", title: "Schakelen", align: "block" },
      { key: "density-basic", title: "Dichtheid", description: "Compact, normaal of ruim — alle componenten schalen mee.", align: "block" },
    ],
    props: ["ThemeProviderProps", "ThemeToggleProps", "DensityToggleProps"],
    notes: [
      "Plaats ThemeScript in je head zodat het opgeslagen thema al vóór de eerste paint staat — geen witte flits bij het laden.",
      "De dichtheid staat in één token: --density. Elke hoogte en padding in de library is calc(Npx * var(--density)), dus compact en ruim werken meteen door in alle componenten.",
    ],
  },
];

export function componentBySlug(slug: string): ComponentEntry | undefined {
  return COMPONENTS.find((component) => component.slug === slug);
}

export function componentsByCategory(): Array<{ category: string; items: ComponentEntry[] }> {
  return CATEGORIES.map((category) => ({
    category,
    items: COMPONENTS.filter((component) => component.category === category),
  })).filter((group) => group.items.length > 0);
}

export function newComponents(): ComponentEntry[] {
  return COMPONENTS.filter((component) => component.isNew);
}
