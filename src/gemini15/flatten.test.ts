import { flatten } from "../functions/flatten";

describe("flatten", () => {
    it("should yield nothing when input array is empty", () => {
        const result = Array.from(flatten([]));
        expect(result).toEqual([]);
    });

    it("should yield all elements unchanged for a flat array", () => {
        const input = [1, "two", true, null, undefined];
        const result = Array.from(flatten(input));
        expect(result).toEqual([1, "two", true, null, undefined]);
    });

    it("should flatten nested arrays of depth 1", () => {
        const input = [1, [2, 3], 4, [5]];
        const result = Array.from(flatten(input));
        expect(result).toEqual([1, 2, 3, 4, 5]);
    });

    it("should flatten deeply nested arrays", () => {
        const input = [1, [2, [3, [4, [5]]]]];
        const result = Array.from(flatten(input));
        expect(result).toEqual([1, 2, 3, 4, 5]);
    });

    it("should handle empty sub-arrays correctly", () => {
        const input = [[], 1, [[], 2], []];
        const result = Array.from(flatten(input));
        expect(result).toEqual([1, 2]);
    });

    it("should preserve non-array objects and other data types", () => {
        const obj = { key: "value" };
        const func = () => { };
        const input = [obj, [func, [Symbol("sym")]]];
        const result = Array.from(flatten(input));
        expect(result).toEqual([obj, func, result[2]]);
    });

    it("should work as an iterable in a for...of loop", () => {
        const input = [1, [2, 3]];
        const collected: unknown[] = [];
        for (const item of flatten(input)) {
            collected.push(item);
        }
        expect(collected).toEqual([1, 2, 3]);
    });
});