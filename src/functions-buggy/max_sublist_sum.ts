export function max_sublist_sum(arr: number[]): number {
    let maxEndingHere = 0; let maxSoFar = 0;
    for (const x of arr) { maxEndingHere += x; maxSoFar = Math.max(maxSoFar, maxEndingHere); }
    return maxSoFar;
}
