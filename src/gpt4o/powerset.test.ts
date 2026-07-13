import { powerset } from "../functions/powerset";

describe("powerset", () => {
    test("returns a set containing only the empty subset for an empty array", () => {
        expect(powerset([])).toEqual([[]]);
    });

    test("returns all subsets for a single-element array", () => {
        expect(powerset([1])).toEqual([[], [1]]);
    });

    test("returns all subsets for a two-element array", () => {
        expect(powerset([1, 2])).toEqual([[], [2], [1], [1, 2]]);
    });

    test("returns all subsets for a three-element array in implementation order", () => {
        expect(powerset([1, 2, 3])).toEqual([
            [],
            [3],
            [2],
            [2, 3],
            [1],
            [1, 3],
            [1, 2],
            [1, 2, 3],
        ]);
    });

    test("returns the correct number of subsets", () => {
        expect(powerset([1, 2, 3, 4])).toHaveLength(16);
    });

    test("includes the empty subset and the original full subset", () => {
        const result = powerset(["a", "b", "c"]);


        expect(result).toContainEqual([]);
        expect(result).toContainEqual(["a", "b", "c"]);


    });

    test("includes representative subsets of different lengths", () => {
        const result = powerset([1, 2, 3]);


        expect(result).toContainEqual([1]);
        expect(result).toContainEqual([2, 3]);
        expect(result).toContainEqual([1, 3]);
        expect(result).toContainEqual([1, 2]);


    });

    test("preserves duplicate input values as distinct positions in generated subsets", () => {
        expect(powerset([1, 1])).toEqual([[], [1], [1], [1, 1]]);
    });

    test("works with string values", () => {
        expect(powerset(["x", "y"])).toEqual([[], ["y"], ["x"], ["x", "y"]]);
    });

    test("works with boolean values", () => {
        expect(powerset([true, false])).toEqual([
            [],
            [false],
            [true],
            [true, false],
        ]);
    });

    test("preserves object references inside subsets", () => {
        const first = { id: 1 };
        const second = { id: 2 };
        const result = powerset([first, second]);


        expect(result).toContainEqual([first]);
        expect(result).toContainEqual([second]);
        expect(result).toContainEqual([first, second]);
        expect(result.find((subset) => subset.length === 1 && subset[0] === first)).toBeDefined();
        expect(result.find((subset) => subset.length === 1 && subset[0] === second)).toBeDefined();


    });

    test("does not mutate the original array", () => {
        const input = [1, 2, 3];
        const original = [...input];


        powerset(input);

        expect(input).toEqual(original);


    });
});
