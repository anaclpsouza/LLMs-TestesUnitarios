export const edgeKey = (from: number, to: number): string => `${from},${to}`;
export function shortest_path_lengths(n: number, lengthByEdge: ReadonlyMap<string, number>): Map<string, number> {
    const paths = new Map<string, number>();
    for (let i = 0; i < n; i += 1) paths.set(edgeKey(i, i), 0);
    for (const [edge, length] of lengthByEdge) paths.set(edge, length);
    const get = (i: number, j: number) => paths.get(edgeKey(i, j)) ?? Number.POSITIVE_INFINITY;
    for (let k = 0; k < n; k += 1) for (let i = 0; i < n; i += 1) for (let j = 0; j < n; j += 1) paths.set(edgeKey(i, j), Math.min(get(i, j), get(i, k) + get(j, k)));
    return paths;
}
