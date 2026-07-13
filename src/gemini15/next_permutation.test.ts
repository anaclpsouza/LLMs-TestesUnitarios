import { next_permutation } from "../functions/next_permutation";

describe("next_permutation", () => {
    it("should return undefined for an empty array", () => {
        expect(next_permutation([])).toBeUndefined();
    });

    it("should return undefined for a single-element array", () => {
        expect(next_permutation([1])).toBeUndefined();
    });

    it("should return undefined when array is in strictly descending order (last permutation)", () => {
        expect(next_permutation([3, 2, 1])).toBeUndefined();
        expect(next_permutation([5, 4, 3, 2, 1])).toBeUndefined();
    });

    it("should return undefined when all elements are equal", () => {
        expect(next_permutation([2, 2, 2])).toBeUndefined();
    });

    it("should generate the next lexicographical permutation for standard inputs", () => {
        expect(next_permutation([1, 2, 3])).toEqual([1, 3, 2]);
        expect(next_permutation([1, 3, 2])).toEqual([2, 1, 3]);
        expect(next_permutation([2, 1, 3])).toEqual([2, 3, 1]);
        expect(next_permutation([2, 3, 1])).toEqual([3, 1, 2]);
        expect(next_permutation([3, 1, 2])).toEqual([3, 2, 1]);
    });

    it("should handle larger arrays with partial descending suffixes", () => {
        expect(next_permutation([1, 2, 5, 4, 3])).toEqual([1, 3, 2, 4, 5]);
    });

    it("should handle arrays with duplicate values", () => {
        expect(next_permutation([1, 1, 5])).toEqual([1, 5, 1]);
        expect(next_permutation([1, 5, 1])).toEqual([5, 1, 1]);
        expect(next_permutation([2, 3, 1, 3, 3])).toEqual([2, 3, 3, 1, 3]);
    });

    it("should not mutate the original array", () => {
        const input = [1, 2, 3];
        const result = next_permutation(input);
        expect(input).toEqual([1, 2, 3]);
        expect(result).toEqual([1, 3, 2]);
    });
});