import { mergesort } from "../functions/mergesort";

describe("mergesort", () => {
    it("should return an empty array when given an empty array", () => {
        expect(mergesort([])).toEqual([]);
    });

    it("should return the same array when given a single element array", () => {
        expect(mergesort([42])).toEqual([42]);
    });

    it("should correctly sort an unsorted array of numbers", () => {
        expect(mergesort([5, 3, 8, 1, 2])).toEqual([1, 2, 3, 5, 8]);
    });

    it("should return the same values for an already sorted array", () => {
        expect(mergesort([1, 2, 3, 4, 5])).toEqual([1, 2, 3, 4, 5]);
    });

    it("should correctly sort a reverse-sorted array", () => {
        expect(mergesort([5, 4, 3, 2, 1])).toEqual([1, 2, 3, 4, 5]);
    });

    it("should correctly handle arrays with duplicate values and maintain stability", () => {
        expect(mergesort([4, 2, 4, 3, 1, 2])).toEqual([1, 2, 2, 3, 4, 4]);
    });

    it("should correctly handle arrays with negative numbers and zero", () => {
        expect(mergesort([-3, 10, 0, -8, 5])).toEqual([-8, -3, 0, 5, 10]);
    });

    it("should handle even-length arrays", () => {
        expect(mergesort([10, 20, -5, 0])).toEqual([-5, 0, 10, 20]);
    });

    it("should handle odd-length arrays", () => {
        expect(mergesort([9, 1, 7])).toEqual([1, 7, 9]);
    });
});