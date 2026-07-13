import { powerset } from "../functions/powerset";

describe("powerset", () => {
    it("should return an array containing an empty array when given an empty array", () => {
        expect(powerset([])).toEqual([[]]);
    });

    it("should return the powerset for a single element array", () => {
        expect(powerset([1])).toEqual([[], [1]]);
    });

    it("should return all subsets in expected order for a multi-element array of numbers", () => {
        expect(powerset([1, 2])).toEqual([[], [2], [1], [1, 2]]);
    });

    it("should return correct number of subsets (2^n) and correct elements for 3 items", () => {
        const result = powerset(["a", "b", "c"]);
        expect(result.length).toBe(8);
        expect(result).toEqual([
            [],
            ["c"],
            ["b"],
            ["b", "c"],
            ["a"],
            ["a", "c"],
            ["a", "b"],
            ["a", "b", "c"],
        ]);
    });

    it("should handle arrays with duplicate values correctly according to the algorithm logic", () => {
        expect(powerset([1, 1])).toEqual([[], [1], [1], [1, 1]]);
    });

    it("should preserve element references when operating on arrays of objects", () => {
        const obj1 = { id: 1 };
        const obj2 = { id: 2 };
        expect(powerset([obj1, obj2])).toEqual([
            [],
            [obj2],
            [obj1],
            [obj1, obj2],
        ]);
    });
});