export function next_palindrome(digitList: number[]): number[] {
    let highMid = Math.floor(digitList.length / 2); let lowMid = Math.floor((digitList.length - 1) / 2);
    while (highMid < digitList.length && lowMid >= 0) {
        if (digitList[highMid] === 9) { digitList[highMid] = 0; digitList[lowMid] = 0; highMid += 1; lowMid -= 1; }
        else { digitList[highMid] += 1; if (lowMid !== highMid) digitList[lowMid] += 1; return digitList; }
    }
    return [1, ...Array<number>(digitList.length).fill(0), 1];
}
