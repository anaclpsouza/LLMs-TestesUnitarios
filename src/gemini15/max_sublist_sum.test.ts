import { max_sublist_sum } from "../functions/max_sublist_sum";

describe("max_sublist_sum", () => {
    it("should return 0 for an empty array", () => {
        expect(max_sublist_sum([])).toBe(0);
    });

    it("should return 0 when all numbers are negative", () => {
        expect(max_sublist_sum([-1, -2, -3, -5])).toBe(0);
    });

    it("should return 0 when array contains only zero", () => {
        expect(max_sublist_sum([0, 0, 0])).toBe(0);
    });

    it("should return the single positive number for a single-element array", () => {
        expect(max_sublist_sum([5])).toBe(5);
    });

    it("should calculate correct max sum for array with all positive numbers", () => {
        expect(max_sublist_sum([1, 2, 3, 4])).toBe(10);
    });

    it("should calculate correct max sum for mixed positive and negative numbers", () => {
        expect(max_sublist_sum([-2, 1, -3, 4, -1, 2, 1, -5, 4])).toBe(6);
    });

    it("should reset running sum to 0 when encountering a sublist with a negative sum", () => {
        expect(max_sublist_sum([3, -4, 5, 2])).toBe(7);
    });

    it("should handle contiguous sublists at the beginning, middle, or end of array", () => {
        expect(max_sublist_sum([10, -2, -3])).toBe(10);
        expect(max_sublist_sum([-2, 10, -3])).toBe(10);
        expect(max_sublist_sum([-2, -3, 10])).toBe(10);
    });
});