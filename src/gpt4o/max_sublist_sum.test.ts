import { max_sublist_sum } from "../functions/max_sublist_sum";

describe("max_sublist_sum", () => {
    test("returns 0 for an empty array", () => {
        expect(max_sublist_sum([])).toBe(0);
    });

    test("returns 0 for an array with only negative numbers", () => {
        expect(max_sublist_sum([-1, -2, -3, -4])).toBe(0);
    });

    test("returns 0 for an array with only zeros", () => {
        expect(max_sublist_sum([0, 0, 0])).toBe(0);
    });

    test("returns the value for a single positive number", () => {
        expect(max_sublist_sum([5])).toBe(5);
    });

    test("returns 0 for a single negative number", () => {
        expect(max_sublist_sum([-5])).toBe(0);
    });

    test("returns the sum of the whole array when all numbers are positive", () => {
        expect(max_sublist_sum([1, 2, 3, 4])).toBe(10);
    });

    test("computes the maximum sublist sum for mixed positive and negative numbers", () => {
        expect(max_sublist_sum([1, -2, 3, 4, -1, 2, -5])).toBe(8);
        expect(max_sublist_sum([4, -1, 2, 1, -5, 4])).toBe(6);
    });

    test("resets the running sum after it becomes negative", () => {
        expect(max_sublist_sum([-5, 1, 2, 3])).toBe(6);
        expect(max_sublist_sum([2, -10, 5, 6])).toBe(11);
    });

    test("handles the best sublist at the beginning of the array", () => {
        expect(max_sublist_sum([5, 4, -20, 1, 2])).toBe(9);
    });

    test("handles the best sublist at the end of the array", () => {
        expect(max_sublist_sum([-3, -2, 4, 5])).toBe(9);
    });

    test("handles the best sublist in the middle of the array", () => {
        expect(max_sublist_sum([-2, 3, 5, -1, -10])).toBe(8);
    });

    test("handles zeros mixed with positive and negative numbers", () => {
        expect(max_sublist_sum([0, -1, 0, 3, 0, -2, 4, 0])).toBe(5);
    });

    test("handles larger values", () => {
        expect(max_sublist_sum([100, -50, 200, -10, 20])).toBe(260);
    });

    test("does not mutate the original array", () => {
        const input = [1, -2, 3, 4, -1];
        const original = [...input];
        max_sublist_sum(input);

        expect(input).toEqual(original);

    });
});
