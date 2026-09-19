/**
 * ProjectX UI — publieke API.
 * Alles is zelf geschreven: geen shadcn, geen Radix, geen externe UI-dependencies.
 */

/* ---------- Hulpmiddelen ---------- */
export { cn, type ClassValue } from "./lib/cn";
export { variants, type VariantConfig, type VariantsFn } from "./lib/variants";
export { Slot, composeRefs } from "./lib/slot";
export { Portal } from "./lib/portal";
export { useAnchorPosition, type Side, type Align, type AnchorOptions } from "./lib/anchor";
export {
  useControllableState,
  useOutsideClick,
  useEscapeKey,
  useLockScroll,
  useFocusTrap,
  useRovingIndex,
  useCopyToClipboard,
  useMounted,
  useIsoLayoutEffect,
} from "./lib/hooks";

/* ---------- Iconen ---------- */
export { Icon, ICONS, ICON_NAMES, type IconName, type IconProps } from "./icons/icon";

/* ---------- Componenten ---------- */
export * from "./components/avatar";
export * from "./components/badge";
export * from "./components/button";
export * from "./components/card";
export * from "./components/checkbox";
export * from "./components/chip";
export * from "./components/copy-button";
export * from "./components/field";
export * from "./components/input";
export * from "./components/kbd";
export * from "./components/label";
export * from "./components/radio-group";
export * from "./components/select";
export * from "./components/separator";
export * from "./components/skeleton";
export * from "./components/spinner";
export * from "./components/switch";
export * from "./components/textarea";
export * from "./components/theme";
