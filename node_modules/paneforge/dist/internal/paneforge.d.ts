/// <reference types="svelte" />
import type { DragState, Direction, PaneData, ResizeEvent } from "./types.js";
import { type PaneGroupStorage } from "./utils/index.js";
export type PaneGroupOnLayout = (layout: number[]) => void;
export type PaneGroupProps = {
    autoSaveId?: string | null;
    direction: Direction;
    id?: string | null;
    keyboardResizeBy?: number | null;
    onLayout?: PaneGroupOnLayout | null;
    storage?: PaneGroupStorage;
    style?: string;
    tagName?: keyof HTMLElementTagNameMap;
};
export declare const defaultStorage: PaneGroupStorage;
export type CreatePaneForgeProps = {
    autoSaveId: string | null;
    direction: Direction;
    id: string | null | undefined;
    keyboardResizeBy: number | null;
    onLayout: PaneGroupOnLayout | null;
    storage: PaneGroupStorage;
};
export declare function createPaneForge(props: CreatePaneForgeProps): {
    methods: {
        collapsePane: (paneData: PaneData) => void;
        expandPane: (paneData: PaneData) => void;
        getSize: (paneData: PaneData) => number;
        getPaneStyle: import("svelte/store").Readable<(paneData: PaneData, defaultSize: number | undefined) => string>;
        isCollapsed: (paneData: PaneData) => boolean;
        isExpanded: (paneData: PaneData) => boolean;
        registerPane: (paneData: PaneData) => void;
        registerResizeHandle: (dragHandleId: string) => (event: ResizeEvent) => void;
        resizePane: (paneData: PaneData, unsafePaneSize: number) => void;
        startDragging: (dragHandleId: string, event: ResizeEvent) => void;
        stopDragging: () => void;
        unregisterPane: (paneData: PaneData) => void;
        setLayout: (newLayout: number[]) => void;
        getLayout: () => number[];
    };
    states: {
        direction: import("svelte/store").Writable<Direction>;
        dragState: import("svelte/store").Writable<DragState | null>;
        groupId: import("svelte/store").Writable<string>;
        paneGroupAttrs: import("svelte/store").Readable<{
            "data-pane-group": string;
            "data-direction": Direction;
            "data-pane-group-id": string;
            style: string;
        }>;
        paneGroupSelectors: import("svelte/store").Readable<{
            "data-pane-group": string;
            "data-direction": Direction;
            "data-pane-group-id": string;
        }>;
        paneGroupStyle: import("svelte/store").Readable<string>;
        layout: import("svelte/store").Writable<number[]>;
    };
    options: import("./utils/index.js").ToWritableStores<{
        autoSaveId: string | null;
        direction: Direction;
        id: string | null | undefined;
        keyboardResizeBy: number | null;
        onLayout: PaneGroupOnLayout | null;
        storage: PaneGroupStorage;
    }>;
};
export declare function getResizeHandleElementsForGroup(groupId: string): HTMLElement[];
export declare function getResizeHandlePaneIds(groupId: string, handleId: string, panesArray: PaneData[]): [idBefore: string | null, idAfter: string | null];
export declare function getResizeHandleElement(id: string): HTMLElement | null;
export declare function getResizeHandleElementIndex(groupId: string, id: string): number | null;
