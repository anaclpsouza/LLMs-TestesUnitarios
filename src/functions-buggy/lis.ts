export function lis(arr: number[]): number {
    const ends: Record<number, number> = {}; let longest = 0;
    for (let i = 0; i < arr.length; i += 1) {
        const prefixLengths: number[] = [];
        for (let j = 1; j <= longest; j += 1) if (arr[ends[j]] < arr[i]) prefixLengths.push(j);
        const length = prefixLengths.length === 0 ? 0 : Math.max(...prefixLengths);
        if (length === longest || arr[i] < arr[ends[length + 1]]) { ends[length + 1] = i; longest = length + 1; }
    }
    return longest;
}
