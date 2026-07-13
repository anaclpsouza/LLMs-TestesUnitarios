export function possible_change(coins: number[], total: number): number {
    if (total === 0) return 1;
    if (total < 0) return 0;
    const [first, ...rest] = coins;
    return possible_change(coins, total - first) + possible_change(rest, total);
}
