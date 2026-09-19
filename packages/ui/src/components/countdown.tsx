"use client";
import * as React from "react";
import { cn } from "../lib/cn";

export interface CountdownProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Moment waarnaar afgeteld wordt. */
  to: Date | string | number;
  /** Toont dagen zolang er meer dan 24 uur over is. */
  showDays?: boolean;
  /** Alleen de cijfers, gescheiden door dubbele punten. */
  compact?: boolean;
  /** Wordt één keer aangeroepen zodra de teller op nul staat. */
  onComplete?: () => void;
  labels?: { days: string; hours: string; minutes: string; seconds: string };
}

const STANDAARD = { days: "dagen", hours: "uur", minutes: "min", seconds: "sec" };

function resterend(doel: number) {
  const verschil = Math.max(doel - Date.now(), 0);
  return {
    d: Math.floor(verschil / 86400000),
    u: Math.floor((verschil / 3600000) % 24),
    m: Math.floor((verschil / 60000) % 60),
    s: Math.floor((verschil / 1000) % 60),
    klaar: verschil === 0,
  };
}

/** Countdown — telt af naar een moment en stopt vanzelf op nul. */
export const Countdown = React.forwardRef<HTMLDivElement, CountdownProps>(function Countdown(
  { to, showDays = true, compact, onComplete, labels = STANDAARD, className, ...rest },
  ref
) {
  const doel = React.useMemo(() => new Date(to).getTime(), [to]);
  const [tijd, setTijd] = React.useState(() => resterend(doel));
  const gemeld = React.useRef(false);

  React.useEffect(() => {
    gemeld.current = false;
    setTijd(resterend(doel));
    const timer = window.setInterval(() => {
      const volgende = resterend(doel);
      setTijd(volgende);
      if (volgende.klaar && !gemeld.current) {
        gemeld.current = true;
        onComplete?.();
        window.clearInterval(timer);
      }
    }, 1000);
    return () => window.clearInterval(timer);
  }, [doel, onComplete]);

  const delen = [
    ...(showDays && tijd.d > 0 ? [{ waarde: tijd.d, label: labels.days }] : []),
    { waarde: tijd.u, label: labels.hours },
    { waarde: tijd.m, label: labels.minutes },
    { waarde: tijd.s, label: labels.seconds },
  ];

  return (
    <div
      ref={ref}
      role="timer"
      data-done={tijd.klaar ? "" : undefined}
      className={cn("pxui-countdown", compact && "pxui-countdown-compact", className)}
      {...rest}
    >
      {delen.map((deel, index) => (
        <React.Fragment key={deel.label}>
          {compact && index > 0 && <span className="pxui-countdown-dubbelepunt">:</span>}
          <span className="pxui-countdown-deel">
            <span className="pxui-countdown-getal">{String(deel.waarde).padStart(2, "0")}</span>
            {!compact && <span className="pxui-countdown-label">{deel.label}</span>}
          </span>
        </React.Fragment>
      ))}
    </div>
  );
});
