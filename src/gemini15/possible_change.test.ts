import { possible_change } from "../functions/possible_change";

describe("possible_change", () => {
    it("should return 1 when total is 0", () => {
        expect(possible_change([1, 5, 10], 0)).toBe(1);
        expect(possible_change([], 0)).toBe(1);
    });

    it("should return 0 when total is negative", () => {
        expect(possible_change([1, 2, 5], -1)).toBe(0);
        expect(possible_change([1, 2, 5], -10)).toBe(0);
    });

    it("should return 0 when coins list is empty and total is greater than 0", () => {
        expect(possible_change([], 5)).toBe(0);
        expect(possible_change([], 1)).toBe(0);
    });

    it("should return correct number of ways to make change for a single coin denomination", () => {
        expect(possible_change([1], 4)).toBe(1);
        expect(possible_change([2], 5)).toBe(0);
        expect(possible_change([2], 6)).toBe(1);
    });

    it("should calculate correct number of combinations for multiple coin denominations", () => {
        expect(possible_change([1, 2], 4)).toBe(3); // [1,1,1,1], [1,1,2], [2,2]
        expect(possible_change([1, 2, 5], 5)).toBe(4); // [1,1,1,1,1], [1,1,1,2], [1,2,2], [5]
        expect(possible_change([2, 5, 10], 10)).toBe(4); // [2,2,2,2,2], [2,3-x,5,3-x], [5,5], [10]
    });

    it("should return 0 when total cannot be formed with given coins", () => {
        expect(possible_change([5, 10], 7)).toBe(0);
        expect(possible_change([3, 5], 1)).toBe(0);
    });

    it("should handle large total values requiring recursive branching", () => {
        expect(possible_change([1, 5, 10, 25], 25)).toBe(13);
    });
});