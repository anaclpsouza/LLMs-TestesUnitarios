/** Tradução do gerador correct_python_programs/flatten.py do QuixBugs. */
export function* flatten(arr: unknown[]): Generator<unknown> {
    for (const x of arr) {
        if (Array.isArray(x)) yield* flatten(x);
        else yield x;
    }
}
