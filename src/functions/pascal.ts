/** Tradução de correct_python_programs/pascal.py do QuixBugs. */
export function pascal(n: number): number[][] {
    const rows: number[][] = [[1]];
    for (let r = 1; r < n; r += 1) {
        const row: number[] = [];
        for (let c = 0; c < r + 1; c += 1) {
            const upleft = c > 0 ? rows[r - 1][c - 1] : 0;
            const upright = c < r ? rows[r - 1][c] : 0;
            row.push(upleft + upright);
        }
        rows.push(row);
    }
    return rows;
}
