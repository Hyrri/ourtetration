import { onDestroy } from "svelte";
/**
 * Safely calls `onDestroy` and catches any errors that occur.
 */
export function safeOnDestroy(fn) {
    try {
        onDestroy(fn);
    }
    catch {
        return fn();
    }
}
