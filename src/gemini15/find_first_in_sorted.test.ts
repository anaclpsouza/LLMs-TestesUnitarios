import { find_first_in_sorted } from "../functions/find_first_in_sorted";

describe("find_first_in_sorted", () => {
    it("should return -1 when the array is empty", () => {
        expect(find_first_in_sorted([], 5)).toBe(-1);
    });

    it("should return -1 when target is not present in the array", () => {
        expect(find_first_in_sorted([1, 3, 5, 7, 9], 4)).toBe(-1);
        expect(find_first_in_sorted([1, 3, 5, 7, 9], 0)).toBe(-1);
        expect(find_first_in_sorted([1, 3, 5, 7, 9], 10)).toBe(-1);
    });

    it("should find an element in a single-element array", () => {
        expect(find_first_in_sorted([5], 5)).toBe(0);
        expect(find_first_in_sorted([5], 3)).toBe(-1);
    });

    it("should find the first element at index 0", () => {
        expect(find_first_in_sorted([10, 20, 30, 40], 10)).toBe(0);
    });

    it("should find the element in the middle or at the end of the array", () => {
        expect(find_first_in_sorted([10, 20, 30, 40], 20)).toBe(1);
        expect(find_first_in_sorted([10, 20, 30, 40], 30)).toBe(2);
        expect(find_first_in_sorted([10, 20, 30, 40], 40)).toBe(3);
    });

    it("should return the index of the first occurrence when duplicates exist", () => {
        expect(find_first_in_sorted([2, 4, 4, 4, 6, 8], 4)).toBe(1);
        expect(find_first_in_sorted([4, 4, 4, 4, 4], 4)).toBe(0);
        expect(find_first_in_sorted([1, 2, 3, 3, 3], 3)).toBe(2);
    });

    it("should correctly handle negative numbers and zero", () => {
        expect(find_first_in_sorted([-10, -5, -5, 0, 5], -5)).toBe(1);
        expect(find_first_in_sorted([-10, -5, -5, 0, 5], 0)).toBe(3);
    });
});