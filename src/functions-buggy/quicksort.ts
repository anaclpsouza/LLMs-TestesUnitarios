export function quicksort(arr: number[]): number[] {
    if (arr.length === 0) return [];
    const pivot = arr[0];
    return [...quicksort(arr.slice(1).filter(x => x < pivot)), pivot, ...quicksort(arr.slice(1).filter(x => x > pivot))];
}
