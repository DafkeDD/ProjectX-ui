"use client";
import { Badge, Icon, MockupBrowser, MockupPhone, MockupWindow, Segmented } from "@projectx/ui";
import { useState } from "react";

export default function Demo() {
  const [soort, setSoort] = useState("browser");

  return (
    <div style={{ display: "grid", gap: 16, justifyItems: "center", width: "100%" }}>
      <Segmented
        size="sm"
        value={soort}
        onValueChange={setSoort}
        options={[
          { value: "browser", label: "Browser" },
          { value: "window", label: "Venster" },
          { value: "phone", label: "Telefoon" },
        ]}
      />

      {soort === "browser" && (
        <MockupBrowser url="https://praktijk.projectx.be/agenda" style={{ width: "100%", maxWidth: 520 }}>
          <Scherm />
        </MockupBrowser>
      )}

      {soort === "window" && (
        <MockupWindow title="ProjectX — Dossier Peeters" style={{ width: "100%", maxWidth: 520 }}>
          <Scherm />
        </MockupWindow>
      )}

      {soort === "phone" && (
        <MockupPhone width={240}>
          <Scherm compact />
        </MockupPhone>
      )}
    </div>
  );
}

function Scherm({ compact }: { compact?: boolean }) {
  return (
    <div style={{ padding: compact ? 14 : 20, display: "grid", gap: 10 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <Icon name="calendar" size={16} />
        <strong style={{ fontSize: compact ? 13 : 14.5 }}>Agenda</strong>
        <span style={{ flex: 1 }} />
        <Badge tone="accent" size="sm">4</Badge>
      </div>
      {["09:00 Jan Peeters", "10:30 Marie Dubois", "14:00 Controle OD"].map((regel) => (
        <div
          key={regel}
          style={{
            padding: compact ? "8px 10px" : "10px 12px",
            border: "1px solid var(--border)", borderRadius: "var(--r-sm)",
            background: "var(--surface-2)", fontSize: compact ? 11.5 : 13,
          }}
        >
          {regel}
        </div>
      ))}
    </div>
  );
}
