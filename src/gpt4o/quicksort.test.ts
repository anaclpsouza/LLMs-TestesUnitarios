import { quicksort } from "../functions/quicksort";

describe("quicksort", () => {
    test("returns an empty array for an empty input", () => {
        expect(quicksort([])).toEqual([]);
    });

    test("returns a single-element array unchanged", () => {
        expect(quicksort([5])).toEqual([5]);
    });

    test("sorts an already sorted array", () => {
        expect(quicksort([1, 2, 3, 4, 5])).toEqual([1, 2, 3, 4, 5]);
    });

    test("sorts a reverse ordered array", () => {
        expect(quicksort([5, 4, 3, 2, 1])).toEqual([1, 2, 3, 4, 5]);
    });

    test("sorts an unsorted array with an even number of elements", () => {
        expect(quicksort([4, 1, 3, 2])).toEqual([1, 2, 3, 4]);
    });

    test("sorts an unsorted array with an odd number of elements", () => {
        expect(quicksort([3, 1, 4, 5, 2])).toEqual([1, 2, 3, 4, 5]);
    });

    test("sorts arrays with duplicate values", () => {
        expect(quicksort([4, 2, 2, 3, 1, 4])).toEqual([1, 2, 2, 3, 4, 4]);
    });

    test("sorts arrays where all values are equal", () => {
        expect(quicksort([7, 7, 7, 7])).toEqual([7, 7, 7, 7]);
    });

    test("sorts arrays containing negative numbers", () => {
        expect(quicksort([-1, -5, 3, 0, -2])).toEqual([-5, -2, -1, 0, 3]);
    });

    test("sorts arrays containing zero and positive numbers", () => {
        expect(quicksort([0, 3, 1, 0, 2])).toEqual([0, 0, 1, 2, 3]);
    });

    test("sorts arrays containing negative, zero, and positive numbers", () => {
        expect(quicksort([10, -1, 0, 5, -10, 3])).toEqual([
            -10, -1, 0, 3, 5, 10,
        ]);
    });

    test("handles values smaller and greater than the pivot", () => {
        expect(quicksort([5, 3, 7, 2, 6, 4, 8])).toEqual([2, 3, 4, 5, 6, 7, 8]);
    });

    test("places values equal to the pivot in the greater partition", () => {
        expect(quicksort([3, 1, 3, 2, 3])).toEqual([1, 2, 3, 3, 3]);
    });

    test("does not mutate the original array", () => {
        const input = [4, 1, 3, 2];
        const original = [...input];


        const result = quicksort(input);

        expect(input).toEqual(original);
        expect(result).toEqual([1, 2, 3, 4]);
        expect(result).not.toBe(input);


    });
});
