import { isVertical } from "./index.js";
const cache = new WeakMap();
export function set(el, styles, ignoreCache = false) {
    if (!el || !(el instanceof HTMLElement) || !styles)
        return;
    const originalStyles = {};
    Object.entries(styles).forEach(([key, value]) => {
        if (key.startsWith("--")) {
            el.style.setProperty(key, value);
            return;
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        originalStyles[key] = el.style[key];
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        el.style[key] = value;
    });
    if (ignoreCache)
        return;
    cache.set(el, originalStyles);
}
export function reset(el, prop) {
    if (!el || !(el instanceof HTMLElement))
        return;
    const originalStyles = cache.get(el);
    if (!originalStyles) {
        return;
    }
    if (prop) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        el.style[prop] = originalStyles[prop];
    }
    else {
        Object.entries(originalStyles).forEach(([key, value]) => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            el.style[key] = value;
        });
    }
}
export function getTranslate(element, direction) {
    const style = window.getComputedStyle(element);
    const transform = 
    // @ts-expect-error - vendor prefix
    style.transform || style.webkitTransform || style.mozTransform;
    let mat = transform.match(/^matrix3d\((.+)\)$/);
    if (mat) {
        // https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/matrix3d
        return parseFloat(mat[1].split(", ")[isVertical(direction) ? 13 : 12]);
    }
    // https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/matrix
    mat = transform.match(/^matrix\((.+)\)$/);
    return mat ? parseFloat(mat[1].split(", ")[isVertical(direction) ? 5 : 4]) : null;
}
export function styleToString(style) {
    return Object.keys(style).reduce((str, key) => {
        if (style[key] === undefined)
            return str;
        return str + `${key}:${style[key]};`;
    }, "");
}
