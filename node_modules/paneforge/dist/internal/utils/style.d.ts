import type { DragState, PaneData } from "../types.js";
/**
 * A utility function that converts a style object to a string,
 * which can be used as the value of the `style` attribute for
 * an element.
 *
 * @param style - The style object to convert
 * @returns The style object as a string
 */
export declare function styleToString(style: StyleObject): string;
export type StyleObject = Record<string, number | string | undefined>;
type CursorState = "horizontal" | "horizontal-max" | "horizontal-min" | "vertical" | "vertical-max" | "vertical-min";
/**
 * Returns the cursor style for a given cursor state.
 */
export declare function getCursorStyle(state: CursorState): string;
/**
 * Resets the global cursor style to the default.
 */
export declare function resetGlobalCursorStyle(): void;
/**
 * Sets the global cursor style to the given state.
 */
export declare function setGlobalCursorStyle(state: CursorState): void;
/**
 * Computes the flexbox style for a pane given its layout and drag state.
 */
export declare function computePaneFlexBoxStyle({ defaultSize, dragState, layout, paneData, paneIndex, precision, }: {
    defaultSize: number | undefined;
    layout: number[];
    dragState: DragState | null;
    paneData: PaneData[];
    paneIndex: number;
    precision?: number;
}): string;
export {};
