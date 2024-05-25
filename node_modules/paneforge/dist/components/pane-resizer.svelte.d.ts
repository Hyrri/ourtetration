import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: {
        id?: string | null | undefined;
        style?: string | null | undefined;
    } & {
        disabled?: boolean | undefined;
        onDraggingChange?: import("../internal/types.js").PaneResizeHandleOnDragging | undefined;
        tabIndex?: number | undefined;
        el?: HTMLElement | null | undefined;
    } & import("svelte/elements.js").HTMLAttributes<HTMLDivElement>;
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
    };
};
type PaneResizerProps_ = typeof __propDef.props;
export { PaneResizerProps_ as PaneResizerProps };
export type PaneResizerEvents = typeof __propDef.events;
export type PaneResizerSlots = typeof __propDef.slots;
export default class PaneResizer extends SvelteComponent<PaneResizerProps_, PaneResizerEvents, PaneResizerSlots> {
}
