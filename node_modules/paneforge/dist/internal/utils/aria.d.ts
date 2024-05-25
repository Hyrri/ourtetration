import type { PaneData } from "../types.js";
/**
 * A utility function that calculates the `aria-valuemax`, `aria-valuemin`,
 * and `aria-valuenow` values for a pane based on its layout and constraints.
 */
export declare function calculateAriaValues({ layout, panesArray, pivotIndices, }: {
    layout: number[];
    panesArray: PaneData[];
    pivotIndices: number[];
}): {
    valueMax: number;
    valueMin: number;
    valueNow: number;
};
