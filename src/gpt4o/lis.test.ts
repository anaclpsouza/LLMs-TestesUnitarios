import { lis } from "../functions/lis";

describe("lis", () => {
    test("returns 0 for an empty array", () => {
        expect(lis([])).toBe(0);
    });

    test("returns 1 for a single-element array", () => {
        expect(lis([5])).toBe(1);
    });

    test("returns the array length for a strictly increasing array", () => {
        expect(lis([1, 2, 3, 4, 5])).toBe(5);
    });

    test("returns 1 for a strictly decreasing array", () => {
        expect(lis([5, 4, 3, 2, 1])).toBe(1);
    });

    test("returns 1 when all elements are equal", () => {
        expect(lis([7, 7, 7, 7])).toBe(1);
    });

    test("does not count equal adjacent values as increasing", () => {
        expect(lis([1, 2, 2, 3])).toBe(3);
        expect(lis([1, 1, 2, 2, 3, 3])).toBe(3);
    });

    test("computes LIS length for mixed unsorted arrays", () => {
        expect(lis([3, 10, 2, 1, 20])).toBe(3);
        expect(lis([10, 22, 9, 33, 21, 50, 41, 60])).toBe(5);
    });

    test("handles arrays where smaller values replace existing subsequence ends", () => {
        expect(lis([2, 5, 3, 7, 11, 8, 10, 13, 6])).toBe(6);
    });

    test("handles negative numbers", () => {
        expect(lis([-5, -1, -3, 0, 2])).toBe(4);
        expect(lis([-1, -2, -3, -4])).toBe(1);
    });

    test("handles a mixture of negative, zero, and positive numbers", () => {
        expect(lis([-2, 0, -1, 3, 2, 4])).toBe(4);
    });

    test("handles arrays where the LIS starts after the first element", () => {
        expect(lis([9, 1, 2, 3, 4])).toBe(4);
    });

    test("handles arrays where the LIS ends before the last element", () => {
        expect(lis([1, 2, 3, 4, 0])).toBe(4);
    });

    test("handles alternating high and low values", () => {
        expect(lis([1, 5, 2, 6, 3, 7, 4, 8])).toBe(5);
    });

    test("handles a standard larger example", () => {
        expect(lis([0, 8, 4, 12, 2, 10, 6, 14, 1, 9, 5, 13, 3, 11, 7, 15])).toBe(6);
    });

    test("does not mutate the original array", () => {
        const input = [3, 1, 2, 5, 4];
        const original = [...input];

        lis(input);

        expect(input).toEqual(original);

    });
});
