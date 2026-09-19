"use client";
import * as React from "react";
import { cn } from "../lib/cn";

export type TimelineTone = "neutral" | "accent" | "green" | "amber" | "red" | "blue";

export interface TimelineProps extends React.HTMLAttributes<HTMLOListElement> {
  /** Compacte variant met kleinere stippen en minder ruimte. */
  dense?: boolean;
}

/** Timeline — verticale lijn met gebeurtenissen: audit-log, dossierverloop, statuswissels. */
export const Timeline = React.forwardRef<HTMLOListElement, TimelineProps>(function Timeline(
  { dense, className, ...rest },
  ref
) {
  return <ol ref={ref} className={cn("pxui-timeline", dense && "pxui-timeline-dense", className)} {...rest} />;
});

export interface TimelineItemProps extends Omit<React.HTMLAttributes<HTMLLIElement>, "title"> {
  /** Icoon in de stip; zonder icoon blijft het een gevulde bol. */
  icon?: React.ReactNode;
  tone?: TimelineTone;
  /** Tijdstip of datum, rechts van de titel. */
  time?: React.ReactNode;
  title?: React.ReactNode;
  /** Wie de gebeurtenis veroorzaakte. */
  by?: React.ReactNode;
  /** Markeert dit als de huidige stap. */
  active?: boolean;
  /** Onderbroken lijn onder deze stip, voor wat nog moet komen. */
  pending?: boolean;
}

export const TimelineItem = React.forwardRef<HTMLLIElement, TimelineItemProps>(function TimelineItem(
  { icon, tone = "neutral", time, title, by, active, pending, className, children, ...rest },
  ref
) {
  return (
    <li
      ref={ref}
      className={cn("pxui-timeline-item", `pxui-timeline-${tone}`, className)}
      data-active={active ? "" : undefined}
      data-pending={pending ? "" : undefined}
      {...rest}
    >
      <span className="pxui-timeline-marker" aria-hidden="true">
        <span className="pxui-timeline-dot">{icon}</span>
      </span>

      <div className="pxui-timeline-content">
        {(title || time) && (
          <div className="pxui-timeline-head">
            {title && <span className="pxui-timeline-title">{title}</span>}
            {time && <time className="pxui-timeline-time">{time}</time>}
          </div>
        )}
        {by && <div className="pxui-timeline-by">{by}</div>}
        {children && <div className="pxui-timeline-body">{children}</div>}
      </div>
    </li>
  );
});
