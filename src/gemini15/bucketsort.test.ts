import { bucketsort } from "../functions/bucketsort";

describe("bucketsort", () => {
    it("should return an empty array when given an empty array", () => {
        expect(bucketsort([], 5)).toEqual([]);
    });

    it("should return an array of zeros when all bucket values are 0", () => {
        expect(bucketsort([0, 0, 0], 3)).toEqual([0, 0, 0]);
    });

    it("should correctly sort an unsorted array within valid range", () => {
        expect(bucketsort([3, 1, 4, 1, 5, 9, 2, 6, 5], 10)).toEqual([1, 1, 2, 3, 4, 5, 5, 6, 9]);
    });

    it("should return the same array when already sorted", () => {
        expect(bucketsort([0, 1, 2, 3, 4], 5)).toEqual([0, 1, 2, 3, 4]);
    });

    it("should handle single element arrays", () => {
        expect(bucketsort([2], 5)).toEqual([2]);
    });

    it("should handle arrays where all elements are identical", () => {
        expect(bucketsort([4, 4, 4, 4], 5)).toEqual([4, 4, 4, 4]);
    });

    it("should handle elements at the maximum boundary k - 1", () => {
        expect(bucketsort([4, 0, 2], 5)).toEqual([0, 2, 4]);
    });

    it("should work with k = 1 when array only contains zeros", () => {
        expect(bucketsort([0, 0], 1)).toEqual([0, 0]);
    });

    it("should return an empty array when k > 0 and input array is empty", () => {
        expect(bucketsort([], 10)).toEqual([]);
    });
});