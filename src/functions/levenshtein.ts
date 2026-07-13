/** Tradução de correct_python_programs/levenshtein.py do QuixBugs. */
export function levenshtein(source: string, target: string): number {
    if (source === "" || target === "") return source.length || target.length;
    if (source[0] === target[0]) return levenshtein(source.slice(1), target.slice(1));
    return 1 + Math.min(
        levenshtein(source, target.slice(1)),
        levenshtein(source.slice(1), target.slice(1)),
        levenshtein(source.slice(1), target),
    );
}
