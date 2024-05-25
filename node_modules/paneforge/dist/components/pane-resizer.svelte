<script>import {
  getResizeHandleElementIndex,
  getResizeHandleElementsForGroup
} from "../internal/paneforge.js";
import { generateId, getCursorStyle, styleToString } from "../internal/utils/index.js";
import { onMount } from "svelte";
import { getCtx } from "./ctx.js";
import { resizeHandleAction } from "./pane-resizer.js";
export let disabled = false;
export let onDraggingChange = void 0;
export let tabIndex = 0;
export let el = null;
export let idFromProps = void 0;
export { idFromProps as id };
export let styleFromProps = void 0;
export { styleFromProps as style };
const {
  methods: { registerResizeHandle, startDragging, stopDragging },
  states: { direction, dragState, groupId }
} = getCtx("PaneResizer");
const resizeHandleId = generateId(idFromProps);
$:
  isDragging = $dragState?.dragHandleId === resizeHandleId;
let isFocused = false;
let resizeHandler = null;
function stopDraggingAndBlur() {
  const element = el;
  if (!element)
    return;
  element.blur();
  stopDragging();
  onDraggingChange?.(false);
}
onMount(() => {
  if (disabled) {
    resizeHandler = null;
  } else {
    resizeHandler = registerResizeHandle(resizeHandleId);
  }
});
$:
  if (disabled) {
    resizeHandler = null;
  } else {
    resizeHandler = registerResizeHandle(resizeHandleId);
  }
function handleKeydown(event) {
  if (disabled || !resizeHandler || event.defaultPrevented)
    return;
  const resizeKeys = ["ArrowDown", "ArrowLeft", "ArrowRight", "ArrowUp", "End", "Home"];
  if (resizeKeys.includes(event.key)) {
    event.preventDefault();
    resizeHandler(event);
    return;
  }
  if (event.key !== "F6")
    return;
  event.preventDefault();
  const handles = getResizeHandleElementsForGroup($groupId);
  const index = getResizeHandleElementIndex($groupId, resizeHandleId);
  if (index === null)
    return;
  const nextIndex = event.shiftKey ? index > 0 ? index - 1 : handles.length - 1 : index + 1 < handles.length ? index + 1 : 0;
  const nextHandle = handles[nextIndex];
  nextHandle.focus();
}
$:
  style = styleToString({
    cursor: getCursorStyle($direction),
    "touch-action": "none",
    "user-select": "none",
    "-webkit-user-select": "none",
    "-webkit-touch-callout": "none"
  }) + styleFromProps;
$:
  attrs = {
    "data-direction": $direction,
    "data-pane-group-id": $groupId,
    "data-active": isDragging ? "pointer" : isFocused ? "keyboard" : void 0,
    "data-enabled": !disabled,
    "data-pane-resizer-id": resizeHandleId,
    "data-pane-resizer": ""
  };
</script>

<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<!-- eslint-disable-next-line svelte/valid-compile -->
<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
<div
	bind:this={el}
	role="separator"
	{style}
	use:resizeHandleAction={{
		disabled,
		resizeHandler,
		stopDragging,
		isDragging,
		onDragging: onDraggingChange,
	}}
	on:keydown={handleKeydown}
	on:blur={() => (isFocused = false)}
	on:focus={() => (isFocused = true)}
	on:mousedown={(e) => {
		e.preventDefault();
		startDragging(resizeHandleId, e);
		onDraggingChange?.(true);
	}}
	on:mouseup={stopDraggingAndBlur}
	on:touchcancel={stopDraggingAndBlur}
	on:touchend={stopDraggingAndBlur}
	on:touchstart={(e) => {
		e.preventDefault();
		startDragging(resizeHandleId, e);
		onDraggingChange?.(true);
	}}
	tabindex={tabIndex}
	{...attrs}
	{...$$restProps}
>
	<slot />
</div>
