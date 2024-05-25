import { SvelteComponent } from "svelte";
import type { PaneGroupProps } from "./types.js";
declare const __propDef: {
    props: PaneGroupProps;
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
    };
};
type PaneGroupProps_ = typeof __propDef.props;
export { PaneGroupProps_ as PaneGroupProps };
export type PaneGroupEvents = typeof __propDef.events;
export type PaneGroupSlots = typeof __propDef.slots;
export default class PaneGroup extends SvelteComponent<PaneGroupProps_, PaneGroupEvents, PaneGroupSlots> {
}
