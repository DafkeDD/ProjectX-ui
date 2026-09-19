"use client";
import { Avatar, Button, Icon, Indicator } from "@projectx/ui";

export default function Demo() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
      <Indicator badge={3} label="3 nieuwe meldingen">
        <Button variant="secondary" icon={<Icon name="bell" />} aria-label="Meldingen" />
      </Indicator>

      <Indicator badge={128} max={99} tone="accent">
        <Button variant="secondary" icon={<Icon name="mail" />} aria-label="Berichten" />
      </Indicator>

      <Indicator dot tone="green" placement="bottom-right">
        <Avatar name="Jan Peeters" size={40} />
      </Indicator>

      <Indicator hidden badge={0}>
        <Button variant="secondary" icon={<Icon name="ticket" />} aria-label="Tickets" />
      </Indicator>
    </div>
  );
}
