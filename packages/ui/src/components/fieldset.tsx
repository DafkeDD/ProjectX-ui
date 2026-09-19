"use client";
import * as React from "react";
import { cn } from "../lib/cn";

export interface FieldsetProps extends Omit<React.FieldsetHTMLAttributes<HTMLFieldSetElement>, "title"> {
  legend?: React.ReactNode;
  /** Uitleg onder de titel. */
  description?: React.ReactNode;
  /** Kader rond de groep in plaats van alleen een kopregel. */
  bordered?: boolean;
  /** Velden naast elkaar in plaats van onder elkaar. */
  row?: boolean;
}

/**
 * Fieldset — groepje bij elkaar horende velden met een gedeelde titel.
 * Gebruikt het echte fieldset-element, dus `disabled` zet alles erin uit.
 */
export const Fieldset = React.forwardRef<HTMLFieldSetElement, FieldsetProps>(function Fieldset(
  { legend, description, bordered, row, className, children, ...rest },
  ref
) {
  return (
    <fieldset
      ref={ref}
      className={cn("pxui-fieldset", bordered && "pxui-fieldset-bordered", className)}
      {...rest}
    >
      {legend && <legend className="pxui-fieldset-legend">{legend}</legend>}
      {description && <p className="pxui-fieldset-description">{description}</p>}
      <div className={cn("pxui-fieldset-velden", row && "pxui-fieldset-row")}>{children}</div>
    </fieldset>
  );
});
