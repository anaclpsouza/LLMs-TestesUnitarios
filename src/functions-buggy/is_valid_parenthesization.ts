export function is_valid_parenthesization(parens: string): boolean {
    let depth = 0;
    for (const paren of parens) {
        if (paren === "(") depth += 1;
        else { depth -= 1; if (depth < 0) return false; }
    }
    return true;
}
