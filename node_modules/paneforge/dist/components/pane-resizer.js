import { chain } from "../internal/utils/chain.js";
import { addEventListener } from "../internal/utils/event.js";
/**
 * A Svelte action that adds resize handle functionality to an element.
 * This action is used to handle the dragging of a resize handle.
 */
export function resizeHandleAction(node, params) {
    let unsub = () => { };
    function update(params) {
        unsub();
        const { disabled, resizeHandler, isDragging, stopDragging, onDragging = undefined } = params;
        if (disabled || resizeHandler === null || !isDragging)
            return;
        const onMove = (event) => {
            resizeHandler(event);
        };
        const onMouseLeave = (event) => {
            resizeHandler(event);
        };
        const stopDraggingAndBlur = () => {
            node.blur();
            stopDragging();
            if (onDragging) {
                onDragging(false);
            }
        };
        unsub = chain(addEventListener(document.body, "contextmenu", stopDraggingAndBlur), addEventListener(document.body, "mousemove", onMove), addEventListener(document.body, "touchmove", onMove, { passive: false }), addEventListener(document.body, "mouseleave", onMouseLeave), addEventListener(window, "mouseup", stopDraggingAndBlur), addEventListener(window, "touchend", stopDraggingAndBlur));
    }
    update(params);
    return {
        update,
        onDestroy() {
            unsub();
        },
    };
}
