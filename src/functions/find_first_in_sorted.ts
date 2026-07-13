/** Tradução de correct_python_programs/find_first_in_sorted.py do QuixBugs. */
export function find_first_in_sorted(arr: number[], x: number): number {
    let lo = 0;
    let hi = arr.length;

    while (lo < hi) {
        const mid = Math.floor((lo + hi) / 2);
        if (x === arr[mid] && (mid === 0 || x !== arr[mid - 1])) return mid;
        if (x <= arr[mid]) hi = mid;
        else lo = mid + 1;
    }
    return -1;
}
