export function find_in_sorted(arr: number[], x: number): number {
    function binsearch(start: number, end: number): number {
        if (start === end) return -1;
        const mid = start + Math.floor((end - start) / 2);
        if (x < arr[mid]) return binsearch(start, mid);
        if (x > arr[mid]) return binsearch(mid, end);
        return mid;
    }
    return binsearch(0, arr.length);
}
