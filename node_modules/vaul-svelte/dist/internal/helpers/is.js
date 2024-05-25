// HTML input types that do not cause the software keyboard to appear.
const nonTextInputTypes = new Set([
    "checkbox",
    "radio",
    "range",
    "color",
    "file",
    "image",
    "button",
    "submit",
    "reset",
]);
export const isBrowser = typeof document !== "undefined";
// eslint-disable-next-line @typescript-eslint/ban-types
export function isFunction(v) {
    return typeof v === "function";
}
export function isInput(target) {
    return ((target instanceof HTMLInputElement && !nonTextInputTypes.has(target.type)) ||
        target instanceof HTMLTextAreaElement ||
        (target instanceof HTMLElement && target.isContentEditable));
}
export function isVertical(direction) {
    if (direction === "top" || direction === "bottom")
        return true;
    return false;
}
export function isBottomOrRight(direction) {
    if (direction === "bottom" || direction === "right")
        return true;
    return false;
}
