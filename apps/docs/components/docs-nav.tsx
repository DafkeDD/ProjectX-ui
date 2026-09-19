"use client";
import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "@projectx/ui";
import { COMPONENTS, componentsByCategory } from "../content/catalog";

const START_LINKS = [
  { href: "/docs", label: "Introductie", icon: "sparkles" as const },
  { href: "/docs/installatie", label: "Installatie", icon: "download" as const },
  { href: "/docs/theming", label: "Thema & tokens", icon: "layers" as const },
];

export function DocsNav({ open }: { open?: boolean }) {
  const pathname = usePathname();
  const [query, setQuery] = React.useState("");
  const groups = componentsByCategory();

  const hits = COMPONENTS.filter((c) => match(c.name, query) || match(c.description, query));
  const filtered = query.trim() ? [{ category: `${hits.length} resultaten`, items: hits }] : groups;

  return (
    <nav className="docs-nav" data-open={open ? "" : undefined}>
      <Link href="/" className="docs-nav-brand">
        <span className="docs-nav-mark">X</span>
        <span>
          <span className="docs-nav-name">ProjectX UI</span>
          <span className="docs-nav-sub">Design system</span>
        </span>
      </Link>

      {/* Tijdelijk een gewone input; wordt <Input> zodra dat component bestaat. */}
      <label className="docs-search">
        <Icon name="search" size={15} />
        <input
          placeholder="Zoek component…"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
      </label>

      {!query && (
        <div className="docs-nav-group">
          <div className="docs-nav-group-title">Aan de slag</div>
          {START_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="docs-nav-link"
              data-active={pathname === link.href ? "" : undefined}
            >
              <Icon name={link.icon} size={15} />
              {link.label}
            </Link>
          ))}
        </div>
      )}

      {filtered.map((group) => (
        <div className="docs-nav-group" key={group.category}>
          <div className="docs-nav-group-title">{group.category}</div>
          {group.items.map((item) => {
            const href = `/docs/componenten/${item.slug}`;
            return (
              <Link key={item.slug} href={href} className="docs-nav-link" data-active={pathname === href ? "" : undefined}>
                {item.name}
                {item.isNew && <span className="docs-new">nieuw</span>}
              </Link>
            );
          })}
        </div>
      ))}
    </nav>
  );
}

function match(value: string, query: string): boolean {
  return value.toLowerCase().includes(query.trim().toLowerCase());
}
