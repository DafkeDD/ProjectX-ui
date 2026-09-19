"use client";
import * as React from "react";
import { cn } from "../lib/cn";

/* ============================ Browser ============================ */
export interface MockupBrowserProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Adres in de balk. */
  url?: string;
  /** Verbergt de drie knopjes linksboven. */
  hideDots?: boolean;
  /** Donkere chroom, ook in lichte modus. */
  dark?: boolean;
}

/** MockupBrowser — een schermafbeelding in een browservenster zetten. */
export const MockupBrowser = React.forwardRef<HTMLDivElement, MockupBrowserProps>(function MockupBrowser(
  { url, hideDots, dark, className, children, ...rest },
  ref
) {
  return (
    <div ref={ref} className={cn("pxui-mockup", "pxui-mockup-browser", dark && "pxui-mockup-dark", className)} {...rest}>
      <div className="pxui-mockup-bar">
        {!hideDots && <Dots />}
        {url !== undefined && (
          <span className="pxui-mockup-url" title={url}>
            {url}
          </span>
        )}
      </div>
      <div className="pxui-mockup-screen">{children}</div>
    </div>
  );
});

/* ============================ Window ============================ */
export interface MockupWindowProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  title?: React.ReactNode;
  hideDots?: boolean;
  dark?: boolean;
}

/** MockupWindow — venster met titelbalk, voor een desktop-app of dialoog. */
export const MockupWindow = React.forwardRef<HTMLDivElement, MockupWindowProps>(function MockupWindow(
  { title, hideDots, dark, className, children, ...rest },
  ref
) {
  return (
    <div ref={ref} className={cn("pxui-mockup", "pxui-mockup-window", dark && "pxui-mockup-dark", className)} {...rest}>
      <div className="pxui-mockup-bar">
        {!hideDots && <Dots />}
        {title && <span className="pxui-mockup-title">{title}</span>}
      </div>
      <div className="pxui-mockup-screen">{children}</div>
    </div>
  );
});

/* ============================ Phone ============================ */
export interface MockupPhoneProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Breedte van het toestel in px; alles erin schaalt mee. */
  width?: number;
  /** Verhouding hoogte/breedte. Standaard 19.5:9, zoals een moderne telefoon. */
  ratio?: number;
  /** "island" is de pil, "notch" de bredere inkeping, "none" laat het weg. */
  top?: "island" | "notch" | "none";
  /** Statusbalk met tijd, signaal, wifi en batterij. Geef eigen inhoud mee of false. */
  statusBar?: boolean | React.ReactNode;
  /** Tijd links in de statusbalk. */
  time?: string;
  /** Streepje onderaan voor het vegen. */
  homeBar?: boolean;
  /** Kleur van het frame, bijvoorbeeld "#ff8938". */
  frameColor?: string;
  /** Zijknoppen (volume en aan/uit) tonen. */
  buttons?: boolean;
}

/** MockupPhone — een schermontwerp in een telefoonframe. */
export const MockupPhone = React.forwardRef<HTMLDivElement, MockupPhoneProps>(function MockupPhone(
  {
    width = 280,
    ratio = 19.5 / 9,
    top = "island",
    statusBar = true,
    time = "9:41",
    homeBar = true,
    frameColor,
    buttons = true,
    className,
    children,
    style,
    ...rest
  },
  ref
) {
  return (
    <div
      ref={ref}
      className={cn("pxui-mockup-phone", className)}
      style={
        {
          "--pxui-phone-w": `${width}px`,
          ...(frameColor ? { "--pxui-phone-frame": frameColor } : {}),
          ...style,
        } as React.CSSProperties
      }
      {...rest}
    >
      <div className="pxui-mockup-phone-frame" style={{ aspectRatio: `1 / ${ratio}` }}>
        {buttons && (
          <>
            <span className="pxui-mockup-phone-btn pxui-mockup-phone-silent" aria-hidden="true" />
            <span className="pxui-mockup-phone-btn pxui-mockup-phone-vol-up" aria-hidden="true" />
            <span className="pxui-mockup-phone-btn pxui-mockup-phone-vol-down" aria-hidden="true" />
            <span className="pxui-mockup-phone-btn pxui-mockup-phone-power" aria-hidden="true" />
          </>
        )}

        <div className="pxui-mockup-phone-screen" data-top={top}>
          {(statusBar !== false || top !== "none") && (
            <div className="pxui-mockup-phone-status">
              {top !== "none" && <span className={cn("pxui-mockup-phone-top", `pxui-mockup-phone-${top}`)} />}
              {statusBar === true ? (
                <>
                  <span className="pxui-mockup-phone-time">{time}</span>
                  <span className="pxui-mockup-phone-icons" aria-hidden="true">
                    <Signaal />
                    <Wifi />
                    <Batterij />
                  </span>
                </>
              ) : (
                statusBar !== false && statusBar
              )}
            </div>
          )}

          <div className="pxui-mockup-phone-content">{children}</div>

          {homeBar && <span className="pxui-mockup-phone-home" aria-hidden="true" />}
        </div>
      </div>
    </div>
  );
});

/* De statusbalk-icoontjes zijn hier getekend; de icon set van de library
   bevat geen signaal-, wifi- of batterijsymbool. */
function Signaal() {
  return (
    <svg viewBox="0 0 18 12" width="17" height="11" fill="currentColor">
      <rect x="0" y="8" width="3" height="4" rx="1" />
      <rect x="5" y="5.5" width="3" height="6.5" rx="1" />
      <rect x="10" y="3" width="3" height="9" rx="1" />
      <rect x="15" y="0.5" width="3" height="11.5" rx="1" opacity=".35" />
    </svg>
  );
}

function Wifi() {
  return (
    <svg viewBox="0 0 16 12" width="15" height="11" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M1 4.2a10 10 0 0 1 14 0" strokeLinecap="round" />
      <path d="M3.6 6.9a6.4 6.4 0 0 1 8.8 0" strokeLinecap="round" />
      <path d="M6.2 9.5a2.7 2.7 0 0 1 3.6 0" strokeLinecap="round" />
    </svg>
  );
}

function Batterij() {
  return (
    <svg viewBox="0 0 26 12" width="24" height="11" fill="none">
      <rect x="0.6" y="0.6" width="21" height="10.8" rx="3.2" stroke="currentColor" strokeOpacity=".45" />
      <rect x="2.4" y="2.4" width="13" height="7.2" rx="1.8" fill="currentColor" />
      <path d="M23.4 4.2v3.6a2.2 2.2 0 0 0 0-3.6z" fill="currentColor" fillOpacity=".45" />
    </svg>
  );
}

function Dots() {
  return (
    <span className="pxui-mockup-dots" aria-hidden="true">
      <span />
      <span />
      <span />
    </span>
  );
}
