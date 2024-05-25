export function assert(
// eslint-disable-next-line @typescript-eslint/no-explicit-any
expectedCondition, message = "Assertion failed!") {
    if (!expectedCondition) {
        // eslint-disable-next-line no-console
        console.error(message);
        throw Error(message);
    }
}
