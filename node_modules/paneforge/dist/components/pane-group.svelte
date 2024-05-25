<script>import { setCtx } from "./ctx.js";
import {} from "../internal/utils/index.js";
import { defaultStorage } from "../internal/paneforge.js";
export let autoSaveId = null;
export let direction;
export let id = null;
export let keyboardResizeBy = null;
export let onLayoutChange = null;
export let storage = defaultStorage;
export let el = void 0;
export let paneGroup = void 0;
let styleFromProps = void 0;
export { styleFromProps as style };
const {
  states: { paneGroupStyle, paneGroupSelectors, groupId },
  methods: { setLayout, getLayout },
  updateOption
} = setCtx({
  autoSaveId,
  direction,
  id,
  keyboardResizeBy,
  onLayout: onLayoutChange,
  storage
});
$:
  updateOption("autoSaveId", autoSaveId);
$:
  updateOption("direction", direction);
$:
  updateOption("id", id);
$:
  updateOption("keyboardResizeBy", keyboardResizeBy);
$:
  updateOption("onLayout", onLayoutChange);
$:
  updateOption("storage", storage);
paneGroup = {
  getLayout,
  setLayout,
  getId: () => $groupId
};
$:
  style = $paneGroupStyle + (styleFromProps ?? "");
</script>

<div bind:this={el} id={$groupId} {...$paneGroupSelectors} {style} {...$$restProps}>
	<slot />
</div>
