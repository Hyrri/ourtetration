import type { PaneResizeHandleOnDragging, ResizeHandler } from "../internal/types.js";
type ResizerActionParams = {
    disabled?: boolean;
    resizeHandler: ResizeHandler | null;
    isDragging?: boolean;
    onDragging?: PaneResizeHandleOnDragging;
    stopDragging: () => void;
};
/**
 * A Svelte action that adds resize handle functionality to an element.
 * This action is used to handle the dragging of a resize handle.
 */
export declare function resizeHandleAction(node: HTMLElement, params: ResizerActionParams): {
    update: (params: ResizerActionParams) => void;
    onDestroy(): void;
};
export {};
