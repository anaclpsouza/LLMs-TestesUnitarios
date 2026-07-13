import { bucketsort } from "../functions/bucketsort";

describe("bucketsort", () => {
    test("returns an empty array when sorting an empty array", () => {
        expect(bucketsort([], 0)).toEqual([]);
        expect(bucketsort([], 5)).toEqual([]);
    });

    test("sorts an array with a single element", () => {
        expect(bucketsort([0], 1)).toEqual([0]);
        expect(bucketsort([3], 4)).toEqual([3]);
    });

    test("sorts an already sorted array", () => {
        expect(bucketsort([0, 1, 2, 3, 4], 5)).toEqual([0, 1, 2, 3, 4]);
    });

    test("sorts a reverse ordered array", () => {
        expect(bucketsort([4, 3, 2, 1, 0], 5)).toEqual([0, 1, 2, 3, 4]);
    });

    test("sorts an unsorted array with repeated values", () => {
        expect(bucketsort([3, 1, 2, 1, 0, 3, 2], 4)).toEqual([
            0, 1, 1, 2, 2, 3, 3,
        ]);
    });

    test("sorts an array where all values are equal", () => {
        expect(bucketsort([2, 2, 2, 2], 3)).toEqual([2, 2, 2, 2]);
    });

    test("handles arrays containing only the minimum bucket value", () => {
        expect(bucketsort([0, 0, 0], 4)).toEqual([0, 0, 0]);
    });

    test("handles arrays containing only the maximum valid bucket value", () => {
        expect(bucketsort([4, 4, 4], 5)).toEqual([4, 4, 4]);
    });

    test("handles missing bucket values between present values", () => {
        expect(bucketsort([5, 0, 3, 5, 0], 6)).toEqual([0, 0, 3, 5, 5]);
    });

    test("sorts a larger valid input with many duplicates", () => {
        expect(bucketsort([6, 1, 4, 6, 2, 0, 1, 5, 4, 3, 2, 6], 7)).toEqual([
            0, 1, 1, 2, 2, 3, 4, 4, 5, 6, 6, 6,
        ]);
    });

    test("does not mutate the original array", () => {
        const input = [3, 0, 2, 1, 2];
        const original = [...input];
        bucketsort(input, 4);
        expect(input).toEqual(original);

    });
});
