/** Tradução de correct_python_programs/quicksort.py do QuixBugs. */
export function quicksort(arr: number[]): number[] {
    if (arr.length === 0) return [];
    const pivot = arr[0];
    const lesser = quicksort(arr.slice(1).filter(x => x < pivot));
    const greater = quicksort(arr.slice(1).filter(x => x >= pivot));
    return [...lesser, pivot, ...greater];
}
