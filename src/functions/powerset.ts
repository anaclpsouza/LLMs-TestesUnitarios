/** Tradução de correct_python_programs/powerset.py do QuixBugs. */
export function powerset<T>(arr: T[]): T[][] {
    if (arr.length === 0) return [[]];
    const [first, ...rest] = arr;
    const restSubsets = powerset(rest);
    return restSubsets.concat(restSubsets.map(subset => [first, ...subset]));
}
