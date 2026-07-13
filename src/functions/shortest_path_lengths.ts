/** Chave textual usada em TypeScript para representar o par ordenado da versão Python. */
export const edgeKey = (from: number, to: number): string => `${from},${to}`;

export type EdgeLengths = ReadonlyMap<string, number>;

/** Tradução de correct_python_programs/shortest_path_lengths.py do QuixBugs. */
export function shortest_path_lengths(n: number, lengthByEdge: EdgeLengths): Map<string, number> {
    const lengthByPath = new Map<string, number>();
    for (let i = 0; i < n; i += 1) lengthByPath.set(edgeKey(i, i), 0);
    for (const [edge, length] of lengthByEdge) lengthByPath.set(edge, length);

    const getLength = (i: number, j: number): number =>
        lengthByPath.get(edgeKey(i, j)) ?? Number.POSITIVE_INFINITY;

    for (let k = 0; k < n; k += 1) {
        for (let i = 0; i < n; i += 1) {
            for (let j = 0; j < n; j += 1) {
                lengthByPath.set(
                    edgeKey(i, j),
                    Math.min(getLength(i, j), getLength(i, k) + getLength(k, j)),
                );
            }
        }
    }
    return lengthByPath;
}
