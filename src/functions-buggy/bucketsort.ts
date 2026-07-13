export function bucketsort(arr: number[], k: number): number[] {
    const counts = Array<number>(k).fill(0);
    for (const x of arr) counts[x] += 1;
    const sortedArr: number[] = [];
    for (let i = 0; i < arr.length; i += 1) sortedArr.push(...Array<number>(arr[i]).fill(i));
    return sortedArr;
}
