/** Tradução de correct_python_programs/mergesort.py do QuixBugs. */
export function mergesort(arr: number[]): number[] {
    function merge(left: number[], right: number[]): number[] {
        const result: number[] = [];
        let i = 0;
        let j = 0;
        while (i < left.length && j < right.length) {
            if (left[i] <= right[j]) result.push(left[i++]);
            else result.push(right[j++]);
        }
        return result.concat(i < left.length ? left.slice(i) : right.slice(j));
    }
    if (arr.length <= 1) return arr;
    const middle = Math.floor(arr.length / 2);
    return merge(mergesort(arr.slice(0, middle)), mergesort(arr.slice(middle)));
}
