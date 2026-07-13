import { find_in_sorted } from "../functions/find_in_sorted";

describe("find_in_sorted", () => {
    test("returns -1 for an empty array", () => {
        expect(find_in_sorted([], 1)).toBe(-1);
    });

    test("finds the only element in a single-element array", () => {
        expect(find_in_sorted([5], 5)).toBe(0);
    });

    test("returns -1 when the value is not in a single-element array", () => {
        expect(find_in_sorted([5], 3)).toBe(-1);
    });

    test("finds the first element in a sorted array", () => {
        expect(find_in_sorted([1, 2, 3, 4, 5], 1)).toBe(0);
    });

    test("finds an element in the middle of a sorted array", () => {
        expect(find_in_sorted([1, 2, 3, 4, 5], 3)).toBe(2);
    });

    test("finds the last element in a sorted array", () => {
        expect(find_in_sorted([1, 2, 3, 4, 5], 5)).toBe(4);
    });

    test("returns -1 when the target is smaller than all elements", () => {
        expect(find_in_sorted([2, 4, 6, 8], 1)).toBe(-1);
    });

    test("returns -1 when the target is greater than all elements", () => {
        expect(find_in_sorted([2, 4, 6, 8], 10)).toBe(-1);
    });

    test("returns -1 when the target would be between existing values", () => {
        expect(find_in_sorted([1, 3, 5, 7, 9], 6)).toBe(-1);
    });

    test("searches correctly in the left half of the array", () => {
        expect(find_in_sorted([1, 2, 3, 4, 5, 6, 7, 8], 2)).toBe(1);
    });

    test("searches correctly in the right half of the array", () => {
        expect(find_in_sorted([1, 2, 3, 4, 5, 6, 7, 8], 7)).toBe(6);
    });

    test("handles arrays with an even number of elements", () => {
        expect(find_in_sorted([10, 20, 30, 40, 50, 60], 40)).toBe(3);
    });

    test("handles arrays with an odd number of elements", () => {
        expect(find_in_sorted([10, 20, 30, 40, 50], 40)).toBe(3);
    });

    test("works with negative numbers", () => {
        expect(find_in_sorted([-10, -5, -2, 0, 3, 8], -5)).toBe(1);
    });

    test("works with zero", () => {
        expect(find_in_sorted([-3, -1, 0, 2, 4], 0)).toBe(2);
    });

    test("returns an index containing the target when duplicate values are present", () => {
        const arr = [1, 2, 2, 2, 3, 4];
        const index = find_in_sorted(arr, 2);


        expect(index).toBeGreaterThanOrEqual(1);
        expect(index).toBeLessThanOrEqual(3);
        expect(arr[index]).toBe(2);


    });

    test("handles an array where all elements are equal to the target", () => {
        const arr = [7, 7, 7, 7];
        const index = find_in_sorted(arr, 7);


        expect(index).toBeGreaterThanOrEqual(0);
        expect(index).toBeLessThan(arr.length);
        expect(arr[index]).toBe(7);


    });

    test("does not mutate the original array", () => {
        const input = [1, 3, 5, 7, 9];
        const original = [...input];


        find_in_sorted(input, 5);

        expect(input).toEqual(original);


    });
});
