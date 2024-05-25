/// <reference types="svelte" />
import { type Writable } from "svelte/store";
import type { PaneData } from "../types.js";
export type PaneConfigState = {
    expandToSizes: {
        [paneId: string]: number;
    };
    layout: number[];
};
export type SerializedPaneGroupState = {
    [paneIds: string]: PaneConfigState;
};
export type PaneGroupStorage = {
    getItem(name: string): string | null;
    setItem(name: string, value: string): void;
};
/**
 * Initializes the storage object with the appropriate getItem
 *  and setItem functions depending on the environment (browser or not).
 */
export declare function initializeStorage(storageObject: PaneGroupStorage): void;
/**
 * Loads the pane group state from local storage.
 * If the state is not found, returns null.
 */
export declare function loadPaneGroupState(autoSaveId: string, panes: PaneData[], storage: PaneGroupStorage): PaneConfigState | null;
/**
 * Saves the pane group state to local storage.
 */
export declare function savePaneGroupState(autoSaveId: string, panes: PaneData[], paneSizesBeforeCollapse: Map<string, number>, sizes: number[], storage: PaneGroupStorage): void;
/**
 * Updates the values in local storage based on the current state of
 * the pane group.
 * This function is debounced to limit the frequency of local storage writes.
 */
export declare function updateStorageValues({ autoSaveId, layout, storage, paneDataArrayStore, paneSizeBeforeCollapseStore, }: {
    autoSaveId: string;
    layout: number[];
    storage: PaneGroupStorage;
    paneDataArrayStore: Writable<PaneData[]>;
    paneSizeBeforeCollapseStore: Writable<Map<string, number>>;
}): void;
