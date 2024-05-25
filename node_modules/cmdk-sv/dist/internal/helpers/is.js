export const isBrowser = typeof document !== 'undefined';
export function isHTMLElement(element) {
    return element instanceof HTMLElement;
}
export function isHTMLInputElement(element) {
    return element instanceof HTMLInputElement;
}
export function isUndefined(value) {
    return value === undefined;
}
