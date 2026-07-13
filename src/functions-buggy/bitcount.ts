export function bitcount(n: number): number {
    let value = BigInt(n);
    let count = 0;
    while (value !== 0n) { value ^= value - 1n; count += 1; }
    return count;
}
