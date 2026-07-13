/** Tradução de correct_python_programs/bucketsort.py do QuixBugs. */
export function bucketsort(arr: number[], k: number): number[] {
    const counts = Array<number>(k).fill(0);
    for (const x of arr) counts[x] += 1;

    const sortedArr: number[] = [];
    for (let i = 0; i < counts.length; i += 1) {
        sortedArr.push(...Array<number>(counts[i]).fill(i));
    }
    return sortedArr;
}
