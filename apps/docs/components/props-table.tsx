import { propsFor } from "../lib/props";

/** Props-tabel, gegenereerd uit de TypeScript-bron. (Wordt <Table> zodra dat component bestaat.) */
export function PropsTable({ name }: { name: string }) {
  const entry = propsFor(name);
  if (!entry || entry.props.length === 0) return null;

  return (
    <div className="docs-props">
      <h3 className="docs-h3">
        <code className="docs-inline-code">{name}</code>
      </h3>
      {entry.extends && (
        <p className="docs-p" style={{ marginTop: 6 }}>
          Erft daarnaast alle props van <code className="docs-inline-code">{entry.extends}</code>.
        </p>
      )}
      <div className="docs-table-wrap">
        <table className="docs-table">
          <thead>
            <tr>
              <th>Prop</th>
              <th>Type</th>
              <th>Standaard</th>
              <th>Omschrijving</th>
            </tr>
          </thead>
          <tbody>
            {entry.props.map((prop) => (
              <tr key={prop.name}>
                <td className="docs-table-strong">
                  {prop.name}
                  {prop.required && <span style={{ color: "var(--red)" }}>*</span>}
                </td>
                <td><span className="docs-type">{prop.type}</span></td>
                <td><span className="docs-default">{prop.default ?? "—"}</span></td>
                <td>{prop.description || "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
