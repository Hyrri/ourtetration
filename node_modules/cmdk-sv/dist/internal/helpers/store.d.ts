/// <reference types="svelte" />
import { type Writable, type Stores, type StoresValues, type Readable } from 'svelte/store';
/**
 * Given an object of properties, returns an object of writable stores
 * with the same properties and values.
 */
export declare function toWritableStores<T extends Record<string, unknown>>(properties: T): {
    [K in keyof T]: Writable<T[K]>;
};
/**
 * A utility function that creates an effect from a set of stores and a function.
 * The effect is automatically cleaned up when the component is destroyed.
 *
 * @template S - The type of the stores object
 * @param stores - The stores object to derive from
 * @param fn - The function to run when the stores change
 * @returns A function that can be used to unsubscribe the effect
 */
export declare function effect<S extends Stores>(stores: S, fn: (values: StoresValues<S>) => (() => void) | void): () => void;
/**
 * A utility function that creates a derived store that automatically
 * unsubscribes from its dependencies.
 *
 * @template S - The type of the stores object
 * @template T - The type of the derived store
 * @param stores - The stores object to derive from
 * @param fn - The function to derive the store from
 * @returns A derived store that automatically unsubscribes from its dependencies
 */
export declare function derivedWithUnsubscribe<S extends Stores, T>(stores: S, fn: (values: StoresValues<S>, onUnsubscribe: (cb: () => void) => void) => T): Readable<T>;
