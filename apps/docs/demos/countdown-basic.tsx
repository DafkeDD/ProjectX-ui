"use client";
import { useMemo, useState } from "react";
import { Badge, Countdown } from "@projectx/ui";

export default function Demo() {
  // Een vast moment verderop, zodat de demo altijd loopt.
  const straks = useMemo(() => Date.now() + 1000 * 60 * 60 * 26, []);
  const bijna = useMemo(() => Date.now() + 1000 * 12, []);
  const [klaar, setKlaar] = useState(false);

  return (
    <div style={{ display: "grid", gap: 20, justifyItems: "center" }}>
      <Countdown to={straks} />
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <Countdown to={bijna} compact showDays={false} onComplete={() => setKlaar(true)} />
        {klaar && <Badge tone="green" size="sm">tijd om</Badge>}
      </div>
    </div>
  );
}
