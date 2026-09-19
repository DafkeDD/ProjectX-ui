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
  /** Breedte van het scherm in px; de hoogte volgt uit de verhouding. */
  width?: number;
  /** Verhouding hoogte/breedte. Standaard 19.5:9, zoals een moderne telefoon. */
  ratio?: number;
  /** "island" is de pil bovenaan, "notch" de bredere inkeping. */
  top?: "island" | "notch" | "none";
  /** Streepje onderaan voor het vegen. */
  homeBar?: boolean;
  dark?: boolean;
}

/** MockupPhone — een schermontwerp in een telefoonframe. */
export const MockupPhone = React.forwardRef<HTMLDivElement, MockupPhoneProps>(function MockupPhone(
  { width = 280, ratio = 19.5 / 9, top = "island", homeBar = true, dark, className, children, style, ...rest },
  ref
) {
  return (
    <div
      ref={ref}
      className={cn("pxui-mockup-phone", dark && "pxui-mockup-dark", className)}
      style={{ width, ...style }}
      {...rest}
    >
      <div className="pxui-mockup-phone-frame" style={{ aspectRatio: `1 / ${ratio}` }}>
        {top !== "none" && <span className={cn("pxui-mockup-phone-top", `pxui-mockup-phone-${top}`)} />}
        <div className="pxui-mockup-screen">{children}</div>
        {homeBar && <span className="pxui-mockup-phone-home" />}
      </div>
    </div>
  );
});

function Dots() {
  return (
    <span className="pxui-mockup-dots" aria-hidden="true">
      <span />
      <span />
      <span />
    </span>
  );
}
