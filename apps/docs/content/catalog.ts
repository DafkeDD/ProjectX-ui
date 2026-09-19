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
    slug: "separator",
    name: "Separator",
    description: "Scheidingslijn, horizontaal of verticaal, met optioneel label.",
    category: "Basis",
    files: ["separator.tsx", "separator.css"],
    demos: [{ key: "separator-basic", title: "Varianten", align: "block" }],
    props: ["SeparatorProps"],
  },
  {
    slug: "kbd",
    name: "Kbd",
    description: "Toetsaanslag of sneltoets tonen.",
    category: "Basis",
    files: ["kbd.tsx", "kbd.css"],
    demos: [{ key: "kbd-basic", title: "Sneltoetsen" }],
    props: ["KbdProps"],
  },
  {
    slug: "skeleton",
    name: "Skeleton",
    description: "Laadplaceholder met shimmer.",
    category: "Basis",
    files: ["skeleton.tsx", "skeleton.css"],
    demos: [{ key: "skeleton-basic", title: "Vormen", align: "block" }],
    props: ["SkeletonProps"],
  },
  {
    slug: "avatar",
    name: "Avatar",
    description: "Foto of initialen, met statusstip en groepsweergave.",
    category: "Basis",
    files: ["avatar.tsx", "avatar.css"],
    demos: [{ key: "avatar-basic", title: "Maten, status en groep" }],
    props: ["AvatarProps", "AvatarGroupProps"],
  },
  {
    slug: "chip",
    name: "Chip",
    description: "Klikbaar filterlabel, of een verwijderbare tag.",
    category: "Basis",
    files: ["chip.tsx", "chip.css"],
    demos: [{ key: "chip-basic", title: "Filters en tags", align: "block" }],
    props: ["ChipProps", "ChipGroupProps"],
    notes: ["Badge is een label om te lezen, Chip is er een om op te klikken. Met onRemove wordt het een tag met kruisje."],
  },
  {
    slug: "copy-button",
    name: "CopyButton",
    description: "Kopieert een waarde en bevestigt dat kort met een vinkje.",
    category: "Basis",
    files: ["copy-button.tsx", "copy-button.css"],
    demos: [{ key: "copybutton-basic", title: "Kopiëren", align: "block" }],
    props: ["CopyButtonProps"],
  },
  {
    slug: "label",
    name: "Label",
    description: "Bijschrift voor een formulierveld, met verplicht-markering.",
    category: "Formulieren",
    files: ["label.tsx", "label.css"],
    demos: [{ key: "label-basic", title: "Standaard", align: "block" }],
    props: ["LabelProps"],
  },
  {
    slug: "input",
    name: "Input",
    description: "Tekstveld met iconen, addon, maten en foutstatus.",
    category: "Formulieren",
    files: ["input.tsx", "input.css"],
    dependsOn: ["field"],
    demos: [
      { key: "input-basic", title: "Maten en varianten", align: "block" },
      { key: "input-affix", title: "Icoon, suffix en addon", align: "block" },
    ],
    props: ["InputProps"],
  },
  {
    slug: "textarea",
    name: "Textarea",
    description: "Meerregelig tekstveld, optioneel meegroeiend.",
    category: "Formulieren",
    files: ["textarea.tsx", "textarea.css"],
    dependsOn: ["field"],
    demos: [{ key: "textarea-basic", title: "Standaard en meegroeiend", align: "block" }],
    props: ["TextareaProps"],
  },
  {
    slug: "field",
    name: "Field",
    description: "Koppelt label, hint en foutmelding aan één invoerveld.",
    category: "Formulieren",
    files: ["field.tsx", "field.css"],
    dependsOn: ["label"],
    demos: [{ key: "field-basic", title: "Label, hint en fout", align: "block" }],
    props: ["FieldProps"],
    notes: [
      "Field zet automatisch id, aria-describedby en aria-invalid op het veld erin — je hoeft niets handmatig te koppelen.",
    ],
  },
  {
    slug: "checkbox",
    name: "Checkbox",
    description: "Aanvinkvakje met derde staat en beschrijving.",
    category: "Formulieren",
    files: ["checkbox.tsx", "checkbox.css"],
    demos: [{ key: "checkbox-basic", title: "Staten", align: "block" }],
    props: ["CheckboxProps"],
  },
  {
    slug: "radio-group",
    name: "RadioGroup",
    description: "Groep keuzerondjes, ook als klikbare kaarten.",
    category: "Formulieren",
    files: ["radio-group.tsx", "radio-group.css"],
    demos: [
      { key: "radio-basic", title: "Standaard", align: "block" },
      { key: "radio-cards", title: "Als kaarten", align: "block" },
    ],
    props: ["RadioGroupProps", "RadioProps"],
  },
  {
    slug: "switch",
    name: "Switch",
    description: "Aan/uit-schakelaar met label en beschrijving.",
    category: "Formulieren",
    files: ["switch.tsx", "switch.css"],
    demos: [{ key: "switch-basic", title: "Varianten", align: "block" }],
    props: ["SwitchProps"],
  },
  {
    slug: "select",
    name: "Select",
    description: "Eigen keuzelijst — geen native select, volledig stijlbaar.",
    category: "Formulieren",
    files: ["select.tsx", "select.css"],
    demos: [
      { key: "select-basic", title: "Standaard", align: "block" },
      { key: "select-rich", title: "Met groepen, iconen en zoeken", align: "block" },
    ],
    props: ["SelectProps", "SelectItemProps", "SelectContentProps"],
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
