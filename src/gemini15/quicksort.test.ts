import { quicksort } from "../functions/quicksort";

describe("quicksort", () => {
    it("should return an empty array when given an empty array", () => {
        expect(quicksort([])).toEqual([]);
    });

    it("should return the same array when given a single element array", () => {
        expect(quicksort([42])).toEqual([42]);
    });

    it("should sort an unsorted array of numbers in ascending order", () => {
        expect(quicksort([3, 1, 4, 1, 5, 9, 2, 6, 5])).toEqual([1, 1, 2, 3, 4, 5, 5, 6, 9]);
    });

    it("should return the same values when given an already sorted array", () => {
        expect(quicksort([1, 2, 3, 4, 5])).toEqual([1, 2, 3, 4, 5]);
    });

    it("should sort a reverse-sorted array", () => {
        expect(quicksort([5, 4, 3, 2, 1])).toEqual([1, 2, 3, 4, 5]);
    });

    it("should handle arrays with duplicate values", () => {
        expect(quicksort([4, 2, 4, 3, 1, 2])).toEqual([1, 2, 2, 3, 4, 4]);
    });

    it("should handle arrays with negative numbers and zero", () => {
        expect(quicksort([-3, 10, 0, -8, 5])).toEqual([-8, -3, 0, 5, 10]);
    });

    it("should handle two-element arrays in sorted and unsorted order", () => {
        expect(quicksort([2, 1])).toEqual([1, 2]);
        expect(quicksort([1, 2])).toEqual([1, 2]);
    });
});