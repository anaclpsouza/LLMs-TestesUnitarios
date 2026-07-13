import { find_first_in_sorted } from "../functions/find_first_in_sorted";

describe("find_first_in_sorted", () => {
    test("returns -1 for an empty array", () => {
        expect(find_first_in_sorted([], 1)).toBe(-1);
    });

    test("finds the only element in a single-element array", () => {
        expect(find_first_in_sorted([5], 5)).toBe(0);
    });

    test("returns -1 when the value is not in a single-element array", () => {
        expect(find_first_in_sorted([5], 3)).toBe(-1);
    });

    test("finds the first element when it appears once at index 0", () => {
        expect(find_first_in_sorted([1, 2, 3, 4, 5], 1)).toBe(0);
    });

    test("finds an element in the middle when it appears once", () => {
        expect(find_first_in_sorted([1, 2, 3, 4, 5], 3)).toBe(2);
    });

    test("finds the last element when it appears once", () => {
        expect(find_first_in_sorted([1, 2, 3, 4, 5], 5)).toBe(4);
    });

    test("returns the first occurrence when the value appears multiple times at the beginning", () => {
        expect(find_first_in_sorted([1, 1, 1, 2, 3, 4], 1)).toBe(0);
    });

    test("returns the first occurrence when the value appears multiple times in the middle", () => {
        expect(find_first_in_sorted([1, 2, 2, 2, 3, 4, 5], 2)).toBe(1);
    });

    test("returns the first occurrence when the value appears multiple times at the end", () => {
        expect(find_first_in_sorted([1, 2, 3, 4, 5, 5, 5], 5)).toBe(4);
    });

    test("handles an array where all elements are equal to the target", () => {
        expect(find_first_in_sorted([7, 7, 7, 7], 7)).toBe(0);
    });

    test("returns -1 when the target is smaller than all elements", () => {
        expect(find_first_in_sorted([2, 4, 6, 8], 1)).toBe(-1);
    });

    test("returns -1 when the target is greater than all elements", () => {
        expect(find_first_in_sorted([2, 4, 6, 8], 10)).toBe(-1);
    });

    test("returns -1 when the target would be between existing values", () => {
        expect(find_first_in_sorted([1, 3, 5, 7, 9], 6)).toBe(-1);
    });

    test("works with negative numbers", () => {
        expect(find_first_in_sorted([-10, -5, -5, -2, 0, 3], -5)).toBe(1);
    });

    test("works with zero and repeated values around it", () => {
        expect(find_first_in_sorted([-3, -1, 0, 0, 0, 2, 4], 0)).toBe(2);
    });
});
