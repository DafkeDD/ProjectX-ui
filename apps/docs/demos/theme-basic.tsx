"use client";
import { Badge, Button, Card, CardContent, Icon, ThemeToggle, useTheme } from "@projectx/ui";

export default function Demo() {
  const { theme, resolved, setTheme } = useTheme();
  const options = [
    { value: "light", label: "Licht", icon: "sun" },
    { value: "dark", label: "Donker", icon: "moon" },
    { value: "system", label: "Systeem", icon: "monitor" },
  ] as const;

  return (
    <Card>
      <CardContent>
        <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
          <ThemeToggle />
          {options.map((option) => (
            <Button
              key={option.value}
              size="sm"
              variant={theme === option.value ? "primary" : "secondary"}
              icon={<Icon name={option.icon} />}
              onClick={() => setTheme(option.value)}
            >
              {option.label}
            </Button>
          ))}
          <Badge tone="accent">actief: {resolved}</Badge>
        </div>
        <p style={{ marginTop: 16, fontSize: 14 }}>
          Alle componenten schakelen mee omdat ze uitsluitend tokens gebruiken — geen enkele kleur staat hardcoded in een component.
        </p>
        <div style={{ display: "flex", gap: 10, marginTop: 14, flexWrap: "wrap" }}>
          <Button>Primair</Button>
          <Button variant="secondary">Secundair</Button>
          <Badge tone="green">Betaald</Badge>
          <Badge tone="red">Vervallen</Badge>
        </div>
      </CardContent>
    </Card>
  );
}
