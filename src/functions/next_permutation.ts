/** Tradução de correct_python_programs/next_permutation.py do QuixBugs. */
export function next_permutation(perm: number[]): number[] | undefined {
    for (let i = perm.length - 2; i >= 0; i -= 1) {
        if (perm[i] < perm[i + 1]) {
            for (let j = perm.length - 1; j > i; j -= 1) {
                if (perm[i] < perm[j]) {
                    const nextPerm = [...perm];
                    [nextPerm[i], nextPerm[j]] = [perm[j], perm[i]];
                    nextPerm.splice(i + 1, nextPerm.length, ...nextPerm.slice(i + 1).reverse());
                    return nextPerm;
                }
            }
        }
    }
    return undefined;
}
