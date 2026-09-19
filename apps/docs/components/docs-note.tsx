import { Icon, type IconName } from "@projectx/ui";

/** Eenvoudige melding voor de docs. Wordt <Alert> zodra dat component bestaat. */
export function DocsNote({
  title,
  icon = "info",
  tone = "accent",
  children,
}: {
  title?: string;
  icon?: IconName;
  tone?: "accent" | "green" | "amber" | "blue";
  children: React.ReactNode;
}) {
  return (
    <div className="docs-note" data-tone={tone}>
      <Icon name={icon} size={17} />
      <div>
        {title && <div className="docs-note-title">{title}</div>}
        <div className="docs-note-body">{children}</div>
      </div>
    </div>
  );
}
