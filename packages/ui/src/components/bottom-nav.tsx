"use client";
import * as React from "react";
import { cn } from "../lib/cn";
import { Slot } from "../lib/slot";

export interface BottomNavProps extends React.HTMLAttributes<HTMLElement> {
  /** Toont de balk ook op grote schermen; standaard alleen onder 860px. */
  always?: boolean;
  /** Houdt ruimte vrij voor de homebalk van iOS (standaard aan). */
  safeArea?: boolean;
}

/**
 * BottomNav — vaste navigatiebalk onderaan op mobiel.
 * Zet in je layout `padding-bottom` gelijk aan `var(--pxui-bottomnav-h)`,
 * zodat de laatste inhoud niet onder de balk verdwijnt.
 */
export const BottomNav = React.forwardRef<HTMLElement, BottomNavProps>(function BottomNav(
  { always, safeArea = true, className, children, ...rest },
  ref
) {
  return (
    <nav
      ref={ref}
      className={cn("pxui-bottomnav", className)}
      data-always={always ? "" : undefined}
      data-safe={safeArea ? "" : undefined}
      {...rest}
    >
      {children}
    </nav>
  );
});

export interface BottomNavItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode;
  active?: boolean;
  /** Telling of stip rechtsboven het icoon. `true` toont een stip. */
  badge?: React.ReactNode | true;
  asChild?: boolean;
}

export const BottomNavItem = React.forwardRef<HTMLButtonElement, BottomNavItemProps>(function BottomNavItem(
  { icon, active, badge, asChild, className, children, ...rest },
  ref
) {
  const Comp = (asChild ? Slot : "button") as React.ElementType;

  return (
    <Comp
      ref={ref}
      type={asChild ? undefined : "button"}
      aria-current={active ? "page" : undefined}
      data-active={active ? "" : undefined}
      className={cn("pxui-bottomnav-item", className)}
      {...rest}
    >
      <span className="pxui-bottomnav-icon">
        {icon}
        {badge !== undefined && badge !== false && (
          <span className={cn("pxui-bottomnav-badge", badge === true && "pxui-bottomnav-dot")}>
            {badge === true ? null : badge}
          </span>
        )}
      </span>
      <span className="pxui-bottomnav-label">{children}</span>
    </Comp>
  );
});
