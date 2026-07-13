import { find_in_sorted } from "../functions/find_in_sorted";

describe("find_in_sorted", () => {
    it("should return -1 when searching in an empty array", () => {
        expect(find_in_sorted([], 5)).toBe(-1);
    });

    it("should return -1 when target is not found in the array", () => {
        expect(find_in_sorted([1, 3, 5, 7, 9], 4)).toBe(-1);
        expect(find_in_sorted([1, 3, 5, 7, 9], 0)).toBe(-1);
        expect(find_in_sorted([1, 3, 5, 7, 9], 10)).toBe(-1);
    });

    it("should find an element in a single-element array when present", () => {
        expect(find_in_sorted([42], 42)).toBe(0);
    });

    it("should return -1 for a single-element array when target is smaller or larger", () => {
        expect(find_in_sorted([42], 10)).toBe(-1);
        expect(find_in_sorted([42], 50)).toBe(-1);
    });

    it("should find elements at any position in an odd-length sorted array", () => {
        const arr = [10, 20, 30, 40, 50];
        expect(find_in_sorted(arr, 10)).toBe(0);
        expect(find_in_sorted(arr, 20)).toBe(1);
        expect(find_in_sorted(arr, 30)).toBe(2);
        expect(find_in_sorted(arr, 40)).toBe(3);
        expect(find_in_sorted(arr, 50)).toBe(4);
    });

    it("should find elements at any position in an even-length sorted array", () => {
        const arr = [10, 20, 30, 40];
        expect(find_in_sorted(arr, 10)).toBe(0);
        expect(find_in_sorted(arr, 20)).toBe(1);
        expect(find_in_sorted(arr, 30)).toBe(2);
        expect(find_in_sorted(arr, 40)).toBe(3);
    });

    it("should return a valid index when duplicate elements exist", () => {
        const arr = [1, 2, 2, 2, 3];
        const index = find_in_sorted(arr, 2);
        expect(index).toBeGreaterThanOrEqual(1);
        expect(index).toBeLessThanOrEqual(3);
        expect(arr[index]).toBe(2);
    });

    it("should correctly search arrays containing negative numbers and zero", () => {
        const arr = [-50, -20, -5, 0, 15, 30];
        expect(find_in_sorted(arr, -50)).toBe(0);
        expect(find_in_sorted(arr, -20)).toBe(1);
        expect(find_in_sorted(arr, 0)).toBe(3);
        expect(find_in_sorted(arr, 30)).toBe(5);
        expect(find_in_sorted(arr, -10)).toBe(-1);
    });
});