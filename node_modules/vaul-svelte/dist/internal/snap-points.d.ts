/// <reference types="svelte" />
import { type Writable } from "svelte/store";
import type { DrawerDirection } from "./types.js";
export declare function handleSnapPoints({ activeSnapPoint, snapPoints, drawerRef, overlayRef, fadeFromIndex, openTime, direction, }: {
    activeSnapPoint: Writable<number | string | null>;
    snapPoints: Writable<(number | string)[] | undefined>;
    fadeFromIndex: Writable<number | undefined>;
    drawerRef: Writable<HTMLDivElement | undefined>;
    overlayRef: Writable<HTMLDivElement | undefined>;
    openTime: Writable<Date | null>;
    direction: Writable<DrawerDirection>;
}): {
    isLastSnapPoint: import("svelte/store").Readable<boolean>;
    shouldFade: import("svelte/store").Readable<boolean>;
    getPercentageDragged: (absDraggedDistance: number, isDraggingDown: boolean) => number | null;
    activeSnapPointIndex: import("svelte/store").Readable<number | null>;
    onRelease: ({ draggedDistance, closeDrawer, velocity, dismissible, }: {
        draggedDistance: number;
        closeDrawer: () => void;
        velocity: number;
        dismissible: boolean;
    }) => void;
    onDrag: ({ draggedDistance }: {
        draggedDistance: number;
    }) => void;
    snapPointsOffset: import("svelte/store").Readable<number[]>;
};
