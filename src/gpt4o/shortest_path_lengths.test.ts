import { edgeKey, shortest_path_lengths, type EdgeLengths } from "../functions/shortest_path_lengths";

describe("edgeKey", () => {
    test("creates a comma-separated key from two vertex numbers", () => {
        expect(edgeKey(0, 0)).toBe("0,0");
        expect(edgeKey(1, 2)).toBe("1,2");
        expect(edgeKey(10, 20)).toBe("10,20");
    });
});

describe("shortest_path_lengths", () => {
    test("returns an empty map when the graph has no vertices", () => {
        const result = shortest_path_lengths(0, new Map());


        expect(result).toEqual(new Map());


    });

    test("returns only the zero self-distance for a single vertex with no edges", () => {
        const result = shortest_path_lengths(1, new Map());


        expect(result.get(edgeKey(0, 0))).toBe(0);
        expect(result.size).toBe(1);


    });

    test("sets diagonal distances to zero for graphs with multiple vertices and no edges", () => {
        const result = shortest_path_lengths(3, new Map());


        expect(result.get(edgeKey(0, 0))).toBe(0);
        expect(result.get(edgeKey(1, 1))).toBe(0);
        expect(result.get(edgeKey(2, 2))).toBe(0);
        expect(result.get(edgeKey(0, 1))).toBe(Number.POSITIVE_INFINITY);
        expect(result.get(edgeKey(1, 2))).toBe(Number.POSITIVE_INFINITY);
        expect(result.get(edgeKey(2, 0))).toBe(Number.POSITIVE_INFINITY);


    });

    test("preserves direct edge lengths when they are already shortest", () => {
        const edges: EdgeLengths = new Map([
            [edgeKey(0, 1), 4],
            [edgeKey(1, 2), 5],
            [edgeKey(0, 2), 8],
        ]);


        const result = shortest_path_lengths(3, edges);

        expect(result.get(edgeKey(0, 1))).toBe(4);
        expect(result.get(edgeKey(1, 2))).toBe(5);
        expect(result.get(edgeKey(0, 2))).toBe(8);


    });

    test("computes a shorter indirect path through an intermediate vertex", () => {
        const edges: EdgeLengths = new Map([
            [edgeKey(0, 1), 2],
            [edgeKey(1, 2), 3],
            [edgeKey(0, 2), 10],
        ]);


        const result = shortest_path_lengths(3, edges);

        expect(result.get(edgeKey(0, 2))).toBe(5);


    });

    test("computes paths requiring multiple intermediate vertices", () => {
        const edges: EdgeLengths = new Map([
            [edgeKey(0, 1), 1],
            [edgeKey(1, 2), 2],
            [edgeKey(2, 3), 3],
            [edgeKey(0, 3), 20],
        ]);


        const result = shortest_path_lengths(4, edges);

        expect(result.get(edgeKey(0, 2))).toBe(3);
        expect(result.get(edgeKey(1, 3))).toBe(5);
        expect(result.get(edgeKey(0, 3))).toBe(6);


    });

    test("keeps unreachable paths as positive infinity", () => {
        const edges: EdgeLengths = new Map([[edgeKey(0, 1), 7]]);


        const result = shortest_path_lengths(3, edges);

        expect(result.get(edgeKey(0, 1))).toBe(7);
        expect(result.get(edgeKey(1, 0))).toBe(Number.POSITIVE_INFINITY);
        expect(result.get(edgeKey(0, 2))).toBe(Number.POSITIVE_INFINITY);
        expect(result.get(edgeKey(2, 0))).toBe(Number.POSITIVE_INFINITY);


    });

    test("handles directed edges independently", () => {
        const edges: EdgeLengths = new Map([
            [edgeKey(0, 1), 3],
            [edgeKey(1, 0), 8],
            [edgeKey(1, 2), 2],
            [edgeKey(2, 0), 1],
        ]);


        const result = shortest_path_lengths(3, edges);

        expect(result.get(edgeKey(0, 1))).toBe(3);
        expect(result.get(edgeKey(1, 0))).toBe(3);
        expect(result.get(edgeKey(0, 2))).toBe(5);
        expect(result.get(edgeKey(2, 1))).toBe(4);


    });

    test("handles negative edge weights when there is no negative cycle", () => {
        const edges: EdgeLengths = new Map([
            [edgeKey(0, 1), 4],
            [edgeKey(0, 2), 5],
            [edgeKey(1, 2), -2],
        ]);


        const result = shortest_path_lengths(3, edges);

        expect(result.get(edgeKey(0, 2))).toBe(2);
        expect(result.get(edgeKey(0, 1))).toBe(4);
        expect(result.get(edgeKey(1, 2))).toBe(-2);


    });

    test("handles zero-weight edges", () => {
        const edges: EdgeLengths = new Map([
            [edgeKey(0, 1), 0],
            [edgeKey(1, 2), 0],
            [edgeKey(0, 2), 5],
        ]);


        const result = shortest_path_lengths(3, edges);

        expect(result.get(edgeKey(0, 1))).toBe(0);
        expect(result.get(edgeKey(1, 2))).toBe(0);
        expect(result.get(edgeKey(0, 2))).toBe(0);


    });

    test("overwrites an explicit self-edge with the shorter zero diagonal path when appropriate", () => {
        const edges: EdgeLengths = new Map([
            [edgeKey(0, 0), 5],
            [edgeKey(0, 1), 2],
        ]);


        const result = shortest_path_lengths(2, edges);

        expect(result.get(edgeKey(0, 0))).toBe(0);
        expect(result.get(edgeKey(1, 1))).toBe(0);


    });

    test("does not mutate the input edge map", () => {
        const edges = new Map([
            [edgeKey(0, 1), 2],
            [edgeKey(1, 2), 3],
            [edgeKey(0, 2), 10],
        ]);
        const original = new Map(edges);


        shortest_path_lengths(3, edges);

        expect(edges).toEqual(original);


    });

    test("returns a new map instead of the input map", () => {
        const edges = new Map([[edgeKey(0, 1), 2]]);


        const result = shortest_path_lengths(2, edges);

        expect(result).not.toBe(edges);
        expect(result.get(edgeKey(0, 1))).toBe(2);


    });

    test("includes every pair of vertices after processing a non-empty graph", () => {
        const result = shortest_path_lengths(3, new Map([[edgeKey(0, 1), 1]]));


        expect(result.size).toBe(9);
        for (let i = 0; i < 3; i += 1) {
            for (let j = 0; j < 3; j += 1) {
                expect(result.has(edgeKey(i, j))).toBe(true);
            }
        }

    });
});
