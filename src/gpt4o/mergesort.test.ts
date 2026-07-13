import { mergesort } from "../functions/mergesort";

describe("mergesort", () => {
    test("returns the same empty array for an empty input", () => {
        const input: number[] = [];

        expect(mergesort(input)).toBe(input);
        expect(mergesort(input)).toEqual([]);

    });

    test("returns the same single-element array for a single-element input", () => {
        const input = [5];

        expect(mergesort(input)).toBe(input);
        expect(mergesort(input)).toEqual([5]);

    });

    test("sorts an already sorted array", () => {
        expect(mergesort([1, 2, 3, 4, 5])).toEqual([1, 2, 3, 4, 5]);
    });

    test("sorts a reverse ordered array", () => {
        expect(mergesort([5, 4, 3, 2, 1])).toEqual([1, 2, 3, 4, 5]);
    });

    test("sorts an unsorted array with an even number of elements", () => {
        expect(mergesort([4, 1, 3, 2])).toEqual([1, 2, 3, 4]);
    });

    test("sorts an unsorted array with an odd number of elements", () => {
        expect(mergesort([3, 1, 4, 5, 2])).toEqual([1, 2, 3, 4, 5]);
    });

    test("sorts arrays with duplicate values", () => {
        expect(mergesort([4, 2, 2, 3, 1, 4])).toEqual([1, 2, 2, 3, 4, 4]);
    });

    test("sorts arrays where all values are equal", () => {
        expect(mergesort([7, 7, 7, 7])).toEqual([7, 7, 7, 7]);
    });

    test("sorts arrays containing negative numbers", () => {
        expect(mergesort([-1, -5, 3, 0, -2])).toEqual([-5, -2, -1, 0, 3]);
    });

    test("sorts arrays containing zero and positive numbers", () => {
        expect(mergesort([0, 3, 1, 0, 2])).toEqual([0, 0, 1, 2, 3]);
    });

    test("sorts arrays containing negative, zero, and positive numbers", () => {
        expect(mergesort([10, -1, 0, 5, -10, 3])).toEqual([
            -10, -1, 0, 3, 5, 10,
        ]);
    });

    test("handles values remaining on the left side after merge comparisons", () => {
        expect(mergesort([1, 4, 5, 2, 3])).toEqual([1, 2, 3, 4, 5]);
    });

    test("handles values remaining on the right side after merge comparisons", () => {
        expect(mergesort([2, 3, 1, 4, 5])).toEqual([1, 2, 3, 4, 5]);
    });

    test("does not mutate arrays with more than one element", () => {
        const input = [4, 1, 3, 2];
        const original = [...input];

        const result = mergesort(input);

        expect(input).toEqual(original);
        expect(result).toEqual([1, 2, 3, 4]);
        expect(result).not.toBe(input);

    });
});
