/**
 * ProjectX UI — optionele motion-laag.
 *
 * Deze map is het enige deel van de library met een externe dependency:
 * `motion` (voorheen framer-motion). Importeer je er niets uit, dan blijft
 * de rest van de library dependency-vrij.
 *
 *   npm i motion
 *   import { MotionDrawerContent } from "@projectx/ui/motion";
 */
export * from "./motion-drawer";
export * from "./motion-segmented";
export * from "./reorder-list";
