import { next_permutation } from "../functions/next_permutation";

describe("next_permutation", () => {
    test("returns undefined for an empty array", () => {
        expect(next_permutation([])).toBeUndefined();
    });

    test("returns undefined for a single-element array", () => {
        expect(next_permutation([1])).toBeUndefined();
    });

    test("returns undefined for a descending permutation", () => {
        expect(next_permutation([3, 2, 1])).toBeUndefined();
    });

    test("returns undefined when all elements are equal", () => {
        expect(next_permutation([2, 2, 2])).toBeUndefined();
    });

    test("computes the next permutation for a two-element ascending array", () => {
        expect(next_permutation([1, 2])).toEqual([2, 1]);
    });

    test("returns undefined for a two-element descending array", () => {
        expect(next_permutation([2, 1])).toBeUndefined();
    });

    test("computes the next permutation for an already ascending permutation", () => {
        expect(next_permutation([1, 2, 3])).toEqual([1, 3, 2]);
    });

    test("computes the next permutation when the pivot is at the first index", () => {
        expect(next_permutation([1, 3, 2])).toEqual([2, 1, 3]);
    });

    test("computes the next permutation when the pivot is in the middle", () => {
        expect(next_permutation([2, 1, 3])).toEqual([2, 3, 1]);
        expect(next_permutation([1, 4, 3, 2])).toEqual([2, 1, 3, 4]);
    });

    test("computes the next permutation when the pivot is near the end", () => {
        expect(next_permutation([1, 2, 4, 3])).toEqual([1, 3, 2, 4]);
        expect(next_permutation([1, 3, 2, 4])).toEqual([1, 3, 4, 2]);
    });

    test("handles permutations with duplicate values", () => {
        expect(next_permutation([1, 1, 2])).toEqual([1, 2, 1]);
        expect(next_permutation([1, 2, 1])).toEqual([2, 1, 1]);
        expect(next_permutation([2, 1, 1])).toBeUndefined();
    });

    test("chooses the rightmost successor greater than the pivot", () => {
        expect(next_permutation([1, 5, 1])).toEqual([5, 1, 1]);
        expect(next_permutation([1, 3, 2, 2])).toEqual([2, 1, 2, 3]);
    });

    test("reverses the suffix after swapping the pivot", () => {
        expect(next_permutation([1, 5, 4, 3, 2])).toEqual([2, 1, 3, 4, 5]);
        expect(next_permutation([2, 4, 3, 1])).toEqual([3, 1, 2, 4]);
    });

    test("handles negative numbers", () => {
        expect(next_permutation([-3, -2, -1])).toEqual([-3, -1, -2]);
        expect(next_permutation([-1, -3, -2])).toEqual([-1, -2, -3]);
    });

    test("does not mutate the original array when a next permutation exists", () => {
        const input = [1, 3, 2];
        const original = [...input];

        const result = next_permutation(input);

        expect(input).toEqual(original);
        expect(result).toEqual([2, 1, 3]);
        expect(result).not.toBe(input);

    });

    test("does not mutate the original array when no next permutation exists", () => {
        const input = [3, 2, 1];
        const original = [...input];

        const result = next_permutation(input);

        expect(input).toEqual(original);
        expect(result).toBeUndefined();

    });
});
