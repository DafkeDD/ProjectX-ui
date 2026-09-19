"use client";
import { Card, CardContent, CopyButton, Icon } from "@projectx/ui";

export default function Demo() {
  return (
    <Card style={{ maxWidth: 460 }}>
      <CardContent>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 8, flex: 1, fontSize: 14 }}>
            <Icon name="phone" size={15} />
            +32 476 21 33 08
          </span>
          <CopyButton value="+32 476 21 33 08" />
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 14 }}>
          <code className="docs-inline-code" style={{ flex: 1 }}>BE 0123.456.789</code>
          <CopyButton size="sm" value="BE 0123.456.789" />
        </div>

        <div style={{ marginTop: 16 }}>
          <CopyButton variant="outline" value="npx projectx-ui add copy-button" label="Commando kopiëren" />
        </div>
      </CardContent>
    </Card>
  );
}
