import { shortest_path_lengths, edgeKey } from "../functions/shortest_path_lengths";

describe("shortest_path_lengths", () => {
    it("should return correct diagonal distances equal to 0 for n = 0", () => {
        const result = shortest_path_lengths(0, new Map());
        expect(result.size).toBe(0);
    });

    it("should initialize self-loop distances to 0 for a single node (n = 1)", () => {
        const result = shortest_path_lengths(1, new Map());
        expect(result.get(edgeKey(0, 0))).toBe(0);
    });

    it("should set direct edge distances when provided", () => {
        const edges = new Map<string, number>([
            [edgeKey(0, 1), 5],
            [edgeKey(1, 0), 10],
        ]);
        const result = shortest_path_lengths(2, edges);
        expect(result.get(edgeKey(0, 0))).toBe(0);
        expect(result.get(edgeKey(1, 1))).toBe(0);
        expect(result.get(edgeKey(0, 1))).toBe(5);
        expect(result.get(edgeKey(1, 0))).toBe(10);

    });

    it("should compute shortest paths through intermediate nodes (Floyd-Warshall)", () => {
        const edges = new Map<string, number>([
            [edgeKey(0, 1), 3],
            [edgeKey(1, 2), 4],
            [edgeKey(0, 2), 10],
        ]);
        const result = shortest_path_lengths(3, edges);

        expect(result.get(edgeKey(0, 2))).toBe(7);

    });

    it("should retain POSITIVE_INFINITY when no path exists between nodes", () => {
        const edges = new Map<string, number>([
            [edgeKey(0, 1), 2],
        ]);
        const result = shortest_path_lengths(3, edges);

        expect(result.get(edgeKey(1, 0))).toBe(Number.POSITIVE_INFINITY);
        expect(result.get(edgeKey(2, 0))).toBe(Number.POSITIVE_INFINITY);
        expect(result.get(edgeKey(0, 2))).toBe(Number.POSITIVE_INFINITY);

    });

    it("should handle graphs with disconnected nodes", () => {
        const result = shortest_path_lengths(3, new Map());

        expect(result.get(edgeKey(0, 0))).toBe(0);
        expect(result.get(edgeKey(1, 1))).toBe(0);
        expect(result.get(edgeKey(2, 2))).toBe(0);
        expect(result.get(edgeKey(0, 1))).toBe(Number.POSITIVE_INFINITY);
        expect(result.get(edgeKey(1, 2))).toBe(Number.POSITIVE_INFINITY);

    });

    it("should correctly handle graph where direct edge is already the shortest path", () => {
        const edges = new Map<string, number>([
            [edgeKey(0, 1), 2],
            [edgeKey(1, 2), 5],
            [edgeKey(0, 2), 3],
        ]);
        const result = shortest_path_lengths(3, edges);


        expect(result.get(edgeKey(0, 2))).toBe(3);

    });

    it("should handle negative edge weights without negative cycles", () => {
        const edges = new Map<string, number>([
            [edgeKey(0, 1), 5],
            [edgeKey(1, 2), -2],
        ]);
        const result = shortest_path_lengths(3, edges);

        expect(result.get(edgeKey(0, 2))).toBe(3);
    });
});