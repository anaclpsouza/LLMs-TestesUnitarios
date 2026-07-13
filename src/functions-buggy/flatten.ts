export function* flatten(arr: unknown[]): Generator<unknown> {
    for (const x of arr) {
        if (Array.isArray(x)) yield* flatten(x);
        else yield flatten(x as unknown[]);
    }
}
