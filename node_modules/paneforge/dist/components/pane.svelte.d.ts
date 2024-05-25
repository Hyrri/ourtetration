import { SvelteComponent } from "svelte";
import type { PaneProps } from "./types.js";
declare const __propDef: {
    props: PaneProps;
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
    };
};
type PaneProps_ = typeof __propDef.props;
export { PaneProps_ as PaneProps };
export type PaneEvents = typeof __propDef.events;
export type PaneSlots = typeof __propDef.slots;
export default class Pane extends SvelteComponent<PaneProps_, PaneEvents, PaneSlots> {
}
