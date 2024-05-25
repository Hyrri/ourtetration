<script>import { generateId } from "../internal/utils/index.js";
import { onMount } from "svelte";
import { getCtx } from "./ctx.js";
export let collapsedSize = void 0;
export let collapsible = void 0;
export let defaultSize = void 0;
export let maxSize = void 0;
export let minSize = void 0;
export let onCollapse = void 0;
export let onExpand = void 0;
export let onResize = void 0;
export let order = void 0;
export let el = void 0;
export let pane = void 0;
let idFromProps = void 0;
export { idFromProps as id };
let styleFromProps = void 0;
export { styleFromProps as style };
const {
  methods: {
    getPaneStyle,
    registerPane,
    unregisterPane,
    collapsePane,
    expandPane,
    getSize,
    isCollapsed,
    isExpanded,
    resizePane
  },
  states: { groupId }
} = getCtx("Pane");
const paneId = generateId(idFromProps);
let paneData;
$:
  paneData = {
    callbacks: {
      onCollapse,
      onExpand,
      onResize
    },
    constraints: {
      collapsedSize,
      collapsible,
      defaultSize,
      maxSize,
      minSize
    },
    id: paneId,
    idIsFromProps: idFromProps !== void 0,
    order
  };
pane = {
  collapse: () => {
    collapsePane(paneData);
  },
  expand: () => expandPane(paneData),
  getSize: () => getSize(paneData),
  isCollapsed: () => isCollapsed(paneData),
  isExpanded: () => isExpanded(paneData),
  resize: (size) => resizePane(paneData, size),
  getId: () => paneId
};
onMount(() => {
  registerPane(paneData);
  return () => {
    unregisterPane(paneData);
  };
});
$:
  style = $getPaneStyle(paneData, defaultSize) + (styleFromProps ?? "");
$:
  attrs = {
    "data-pane": "",
    "data-pane-id": paneId,
    "data-pane-group-id": $groupId
  };
</script>

<div bind:this={el} {style} {...attrs} {...$$restProps}>
	<slot />
</div>
