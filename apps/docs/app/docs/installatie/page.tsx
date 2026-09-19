import { Alert, Badge, Card, CardContent, Icon } from "@projectx/ui";
import { CodeBlock } from "../../../components/code-block";

export default function InstallatiePage() {
  return (
    <div className="docs-body">
      <Badge tone="accent">Aan de slag</Badge>
      <h1 className="docs-title" style={{ marginTop: 14 }}>Installatie</h1>
      <p className="docs-lead">
        ProjectX UI werkt in elk React-project met een bundler (Next.js, Vite, Remix).
      </p>

      <div className="docs-section">
        <h2 className="docs-section-title">1 · De monorepo lokaal draaien</h2>
        <p className="docs-p">Dit is de documentatiesite die je nu bekijkt, met alle bronbestanden ernaast.</p>
        <CodeBlock standalone code={"npm install\nnpm run dev      # documentatiesite op http://localhost:3000\nnpm run registry # props-tabellen, demo-index en registry opnieuw genereren"} />
        <p className="docs-p">
          Structuur: <code className="docs-inline-code">packages/ui</code> (de library),{" "}
          <code className="docs-inline-code">apps/docs</code> (deze site),{" "}
          <code className="docs-inline-code">scripts/</code> (generator) en{" "}
          <code className="docs-inline-code">registry/</code> (gegenereerde JSON voor de CLI).
        </p>
      </div>

      <div className="docs-section">
        <h2 className="docs-section-title">2 · Importeren tijdens het ontwikkelen</h2>
        <CodeBlock
          standalone
          code={`/* globals.css */
@import "tailwindcss";              /* optioneel */
@import "@projectx/ui/styles";      /* tokens + alle componenten */

// app/layout.tsx
import { ThemeProvider, ThemeScript } from "@projectx/ui";

<html lang="nl" suppressHydrationWarning>
  <head><ThemeScript /></head>
  <body><ThemeProvider>{children}</ThemeProvider></body>
</html>`}
        />
      </div>

      <div className="docs-section">
        <h2 className="docs-section-title">3 · Kopiëren met de CLI</h2>
        <div style={{ marginTop: 14 }}>
          <Alert tone="amber" icon={<Icon name="clock" size={17} />} title="Komt in de laatste stap">
            De CLI (<code className="docs-inline-code">npx projectx-ui add button</code>) bouwen we zodra de
            componenten er staan. De registry wordt nu al bij elke <code className="docs-inline-code">npm run registry</code> gegenereerd.
          </Alert>
        </div>
      </div>

      <div className="docs-section">
        <h2 className="docs-section-title">Vereisten</h2>
        <Card style={{ marginTop: 14 }}>
          <CardContent>
            <ul style={{ margin: 0, paddingLeft: 18, lineHeight: 1.9, fontSize: 14, color: "var(--text-2)" }}>
              <li>React 18 of 19</li>
              <li>Node 20+</li>
              <li>Een bundler die CSS-imports aankan (Next.js, Vite, …)</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
