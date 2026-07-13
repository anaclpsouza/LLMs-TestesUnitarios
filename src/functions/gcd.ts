/** Tradução de correct_python_programs/gcd.py do QuixBugs. */
export function gcd(a: number, b: number): number {
    if (b === 0) return a;
    return gcd(b, a % b);
}
