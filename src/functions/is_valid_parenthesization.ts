/** Tradução de correct_python_programs/is_valid_parenthesization.py do QuixBugs. */
export function is_valid_parenthesization(parens: string): boolean {
    let depth = 0;
    for (const paren of parens) {
        if (paren === "(") depth += 1;
        else {
            depth -= 1;
            if (depth < 0) return false;
        }
    }
    return depth === 0;
}
