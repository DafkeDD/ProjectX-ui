import Link from "next/link";
import { Alert, Badge, Button, Card, CardContent, Icon } from "@projectx/ui";
import { COMPONENTS, componentsByCategory } from "../../content/catalog";
import { ROADMAP } from "../../content/roadmap";

export default function DocsIntroPage() {
  const groups = componentsByCategory();
  const done = ROADMAP.filter((step) => step.done).length;

  return (
    <div className="docs-body">
      <Badge tone="accent">Introductie</Badge>
      <h1 className="docs-title" style={{ marginTop: 14 }}>ProjectX UI</h1>
      <p className="docs-lead">
        Een eigen React component library, opgebouwd uit het ProjectX UI-design. De API voelt aan als shadcn —
        compositie met sub-componenten, <code className="docs-inline-code">asChild</code>, controlled én
        uncontrolled — maar er zit geen enkele regel externe UI-code in. Geen shadcn, geen Radix, geen
        Headless UI, geen cva, geen clsx: alles staat in <code className="docs-inline-code">packages/ui/src</code>.
      </p>

      <div className="docs-section">
        <h2 className="docs-section-title">
          Opbouw <Badge tone="accent" size="sm">{done}/{ROADMAP.length} stappen</Badge>
        </h2>
        <p className="docs-section-desc">De library groeit stap voor stap. Elke stap voegt componenten én hun docs toe.</p>
        <div className="docs-roadmap">
          {ROADMAP.map((step, index) => (
            <div key={step.title} className="docs-roadmap-item" data-done={step.done ? "" : undefined}>
              <span className="docs-roadmap-step">
                {step.done ? <Icon name="check" size={14} strokeWidth={3} /> : index + 1}
              </span>
              <div>
                <div className="docs-roadmap-title">{step.title}</div>
                <div className="docs-roadmap-desc">{step.description}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="docs-section">
        <h2 className="docs-section-title">Wat je krijgt</h2>
        <div className="docs-grid-2">
          {[
            { icon: "layers", title: `${COMPONENTS.length} componenten`, text: "Allemaal met dezelfde tokens, en er komen er elke stap bij." },
            { icon: "code", title: "Eigen primitieven", text: "cn(), variants(), Slot en hooks — zelf geschreven." },
            { icon: "moon", title: "Licht + donker", text: "Twee volledige paletten, één ThemeProvider." },
            { icon: "shield", title: "Toegankelijk", text: "ARIA-rollen, toetsenbordnavigatie en zichtbare focus op elk interactief component." },
          ].map((item) => (
            <Card key={item.title}>
              <CardContent>
                <span style={{ display: "inline-flex", color: "var(--accent)", marginBottom: 8 }}>
                  <Icon name={item.icon as "layers"} size={20} />
                </span>
                <div style={{ fontWeight: 650, fontSize: 14.5 }}>{item.title}</div>
                <p style={{ fontSize: 13.5, marginTop: 4 }}>{item.text}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="docs-section">
        <h2 className="docs-section-title">Regels van dit design system</h2>
        <div style={{ display: "grid", gap: 12, marginTop: 16 }}>
          <Alert tone="accent" title="Alle kleuren komen uit het ProjectX UI-design">
            Componenten gebruiken uitsluitend CSS-variabelen (<code className="docs-inline-code">var(--accent)</code>,{" "}
            <code className="docs-inline-code">var(--surface)</code>, …). Wil je herkleuren? Pas{" "}
            <code className="docs-inline-code">tokens.css</code> aan en de hele library volgt.
          </Alert>
          <Alert tone="green" title="Eén klassenprefix">
            Elke klasse begint met <code className="docs-inline-code">pxui-</code>, dus niets botst met bestaande CSS in je projecten.
          </Alert>
          <Alert tone="amber" title="Tailwind is enkel de engine">
            Tailwind v4 levert de reset en de utilities voor nieuwe markup. De componenten zelf zijn gewone
            CSS-klassen — geen utility-soep, wél volledig aanpasbaar.
          </Alert>
        </div>
      </div>

      <div className="docs-section">
        <h2 className="docs-section-title">Overzicht</h2>
        {groups.map((group) => (
          <div key={group.category} style={{ marginTop: 20 }}>
            <div className="pxui-eyebrow">{group.category}</div>
            <div style={{ display: "grid", gap: 8, marginTop: 10, gridTemplateColumns: "repeat(auto-fill, minmax(210px, 1fr))" }}>
              {group.items.map((item) => (
                <Link
                  key={item.slug}
                  href={`/docs/componenten/${item.slug}`}
                  style={{
                    padding: "11px 13px", border: "1px solid var(--border)", borderRadius: "var(--r-sm)",
                    background: "var(--surface)", textDecoration: "none",
                  }}
                >
                  <div style={{ fontSize: 13.5, fontWeight: 600 }}>{item.name}</div>
                  <div style={{ fontSize: 12, color: "var(--text-3)", marginTop: 2 }}>{item.description}</div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="docs-section">
        <Button asChild>
          <Link href="/docs/installatie">Naar de installatie</Link>
        </Button>
      </div>
    </div>
  );
}
