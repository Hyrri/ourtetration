/// <reference types="svelte" />
import { type CreatePaneForgeProps } from "../internal/paneforge.js";
export declare function setCtx(props: CreatePaneForgeProps): {
    updateOption: <K extends string, V extends unknown>(key: K, value: V | undefined) => void;
    methods: {
        collapsePane: (paneData: import("../internal/types").PaneData) => void;
        expandPane: (paneData: import("../internal/types").PaneData) => void;
        getSize: (paneData: import("../internal/types").PaneData) => number;
        getPaneStyle: import("svelte/store").Readable<(paneData: import("../internal/types").PaneData, defaultSize: number | undefined) => string>;
        isCollapsed: (paneData: import("../internal/types").PaneData) => boolean;
        isExpanded: (paneData: import("../internal/types").PaneData) => boolean;
        registerPane: (paneData: import("../internal/types").PaneData) => void;
        registerResizeHandle: (dragHandleId: string) => (event: import("../internal/types").ResizeEvent) => void;
        resizePane: (paneData: import("../internal/types").PaneData, unsafePaneSize: number) => void;
        startDragging: (dragHandleId: string, event: import("../internal/types").ResizeEvent) => void;
        stopDragging: () => void;
        unregisterPane: (paneData: import("../internal/types").PaneData) => void;
        setLayout: (newLayout: number[]) => void;
        getLayout: () => number[];
    };
    states: {
        direction: import("svelte/store").Writable<import("../internal/types").Direction>;
        dragState: import("svelte/store").Writable<import("../internal/types").DragState | null>;
        groupId: import("svelte/store").Writable<string>;
        paneGroupAttrs: import("svelte/store").Readable<{
            "data-pane-group": string;
            "data-direction": import("../internal/types").Direction;
            "data-pane-group-id": string;
            style: string;
        }>;
        paneGroupSelectors: import("svelte/store").Readable<{
            "data-pane-group": string;
            "data-direction": import("../internal/types").Direction;
            "data-pane-group-id": string;
        }>;
        paneGroupStyle: import("svelte/store").Readable<string>;
        layout: import("svelte/store").Writable<number[]>;
    };
    options: import("../internal/utils/index.js").ToWritableStores<{
        autoSaveId: string | null;
        direction: import("../internal/types").Direction;
        id: string | null | undefined;
        keyboardResizeBy: number | null;
        onLayout: import("../internal/paneforge.js").PaneGroupOnLayout | null;
        storage: import("../internal/utils/index.js").PaneGroupStorage;
    }>;
};
export declare function getCtx(componentName: string): {
    updateOption: <K extends string, V extends unknown>(key: K, value: V | undefined) => void;
    methods: {
        collapsePane: (paneData: import("../internal/types").PaneData) => void;
        expandPane: (paneData: import("../internal/types").PaneData) => void;
        getSize: (paneData: import("../internal/types").PaneData) => number;
        getPaneStyle: import("svelte/store").Readable<(paneData: import("../internal/types").PaneData, defaultSize: number | undefined) => string>;
        isCollapsed: (paneData: import("../internal/types").PaneData) => boolean;
        isExpanded: (paneData: import("../internal/types").PaneData) => boolean;
        registerPane: (paneData: import("../internal/types").PaneData) => void;
        registerResizeHandle: (dragHandleId: string) => (event: import("../internal/types").ResizeEvent) => void;
        resizePane: (paneData: import("../internal/types").PaneData, unsafePaneSize: number) => void;
        startDragging: (dragHandleId: string, event: import("../internal/types").ResizeEvent) => void;
        stopDragging: () => void;
        unregisterPane: (paneData: import("../internal/types").PaneData) => void;
        setLayout: (newLayout: number[]) => void;
        getLayout: () => number[];
    };
    states: {
        direction: import("svelte/store").Writable<import("../internal/types").Direction>;
        dragState: import("svelte/store").Writable<import("../internal/types").DragState | null>;
        groupId: import("svelte/store").Writable<string>;
        paneGroupAttrs: import("svelte/store").Readable<{
            "data-pane-group": string;
            "data-direction": import("../internal/types").Direction;
            "data-pane-group-id": string;
            style: string;
        }>;
        paneGroupSelectors: import("svelte/store").Readable<{
            "data-pane-group": string;
            "data-direction": import("../internal/types").Direction;
            "data-pane-group-id": string;
        }>;
        paneGroupStyle: import("svelte/store").Readable<string>;
        layout: import("svelte/store").Writable<number[]>;
    };
    options: import("../internal/utils/index.js").ToWritableStores<{
        autoSaveId: string | null;
        direction: import("../internal/types").Direction;
        id: string | null | undefined;
        keyboardResizeBy: number | null;
        onLayout: import("../internal/paneforge.js").PaneGroupOnLayout | null;
        storage: import("../internal/utils/index.js").PaneGroupStorage;
    }>;
};
