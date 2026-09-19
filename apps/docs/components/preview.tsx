"use client";
import * as React from "react";
import { Button, Icon } from "@projectx/ui";
import { DEMOS } from "../demos";
import { CodeBlock } from "./code-block";

export interface PreviewProps {
  demoKey: string;
  code: string;
  align?: "center" | "start" | "block";
}

/** Preview — live component, met de echte broncode van de demo achter een tab. */
export function Preview({ demoKey, code, align = "center" }: PreviewProps) {
  const [tab, setTab] = React.useState<"preview" | "code">("preview");
  const Demo = DEMOS[demoKey];

  // Tijdelijk twee knoppen; wordt <Segmented> zodra dat component bestaat.
  return (
    <div className="docs-preview">
      <div className="docs-preview-bar">
        <Button
          size="sm"
          variant={tab === "preview" ? "secondary" : "ghost"}
          icon={<Icon name="eye" />}
          onClick={() => setTab("preview")}
        >
          Voorbeeld
        </Button>
        <Button
          size="sm"
          variant={tab === "code" ? "secondary" : "ghost"}
          icon={<Icon name="code" />}
          onClick={() => setTab("code")}
        >
          Code
        </Button>
        <span style={{ flex: 1 }} />
        <span style={{ fontSize: 11.5, color: "var(--text-3)", fontFamily: "var(--mono)" }}>
          demos/{demoKey}.tsx
        </span>
      </div>

      {tab === "preview" ? (
        <div
          className={
            "docs-preview-stage" +
            (align === "start" ? " docs-preview-stage-start" : "") +
            (align === "block" ? " docs-preview-stage-block" : "")
          }
        >
          {Demo ? <Demo /> : <span style={{ color: "var(--text-3)" }}>Demo “{demoKey}” niet gevonden.</span>}
        </div>
      ) : (
        <CodeBlock code={code} />
      )}
    </div>
  );
}
