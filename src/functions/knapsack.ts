/** Tradução de correct_python_programs/knapsack.py do QuixBugs. */
export function knapsack(capacity: number, items: Array<[number, number]>): number {
    const memo: number[][] = Array.from(
        { length: items.length + 1 },
        () => Array<number>(capacity + 1).fill(0),
    );
    for (let i = 1; i <= items.length; i += 1) {
        const [weight, value] = items[i - 1];
        for (let j = 1; j <= capacity; j += 1) {
            memo[i][j] = memo[i - 1][j];
            if (weight <= j) {
                memo[i][j] = Math.max(memo[i][j], value + memo[i - 1][j - weight]);
            }
        }
    }
    return memo[items.length][capacity];
}
