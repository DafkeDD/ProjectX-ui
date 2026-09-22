"use client";
import * as React from "react";
import { variants } from "../lib/variants";

const text = variants({
  base: "pxui-text",
  variants: {
    variant: {
      display: "pxui-display",
      h1: "pxui-h1",
      h2: "pxui-h2",
      h3: "pxui-h3",
      body: "",
      small: "pxui-text-sm",
      caption: "pxui-text-caption",
      eyebrow: "pxui-eyebrow",
      mono: "pxui-mono pxui-text-sm",
    },
    tone: {
      default: "",
      muted: "pxui-text-muted",
      subtle: "pxui-text-subtle",
      accent: "pxui-text-accent",
      green: "pxui-text-green",
      amber: "pxui-text-amber",
      red: "pxui-text-red",
      inverse: "pxui-text-inverse",
    },
    weight: { regular: "", medium: "pxui-text-medium", semibold: "pxui-text-semibold", bold: "pxui-text-bold" },
    align: { left: "", center: "pxui-text-center", right: "pxui-text-right" },
    truncate: { true: "pxui-text-truncate", false: "" },
  },
  defaultVariants: { variant: "body", tone: "default", weight: "regular", align: "left", truncate: false },
});

export type TextVariant =
  | "display" | "h1" | "h2" | "h3" | "body" | "small" | "caption" | "eyebrow" | "mono";
export type TextTone =
  | "default" | "muted" | "subtle" | "accent" | "green" | "amber" | "red" | "inverse";

export interface TextProps extends React.HTMLAttributes<HTMLElement> {
  /** Grootte en gewicht; kiest ook een passend element als je `as` weglaat. */
  variant?: TextVariant;
  tone?: TextTone;
  weight?: "regular" | "medium" | "semibold" | "bold";
  align?: "left" | "center" | "right";
  /** Kapt één regel af met drie puntjes. */
  truncate?: boolean;
  /** Kapt af na zoveel regels; overschrijft `truncate`. */
  lines?: number;
  /** Eigen element, bv. "span", "label" of "h2". */
  as?: React.ElementType;
}

const ELEMENT: Record<TextVariant, React.ElementType> = {
  display: "h1",
  h1: "h1",
  h2: "h2",
  h3: "h3",
  body: "p",
  small: "p",
  caption: "span",
  eyebrow: "span",
  mono: "span",
};

/**
 * Text — één component voor alle tekst: kopregels, lopende tekst, bijschriften
 * en cijfers. Kleuren en maten komen uit de tokens, dus nooit een los font-size
 * in je markup.
 */
export const Text = React.forwardRef<HTMLElement, TextProps>(function Text(
  { variant = "body", tone, weight, align, truncate, lines, as, className, style, ...rest },
  ref
) {
  const Comp = (as ?? ELEMENT[variant]) as React.ElementType;

  return (
    <Comp
      ref={ref}
      className={text({ variant, tone, weight, align, truncate: truncate && !lines, className })}
      style={
        lines
          ? ({
              display: "-webkit-box",
              WebkitLineClamp: lines,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              ...style,
            } as React.CSSProperties)
          : style
      }
      {...rest}
    />
  );
});
