/** Tradução de correct_python_programs/get_factors.py do QuixBugs. */
export function get_factors(n: number): number[] {
    if (n === 1) return [];
    for (let i = 2; i <= Math.floor(Math.sqrt(n)); i += 1) {
        if (n % i === 0) return [i, ...get_factors(n / i)];
    }
    return [n];
}
