import { pascal } from "../functions/pascal";

describe("pascal", () => {
    it("should return [[1]] when n is 0 or 1", () => {
        expect(pascal(0)).toEqual([[1]]);
        expect(pascal(1)).toEqual([[1]]);
    });

    it("should return [[1]] when n is negative", () => {
        expect(pascal(-1)).toEqual([[1]]);
        expect(pascal(-5)).toEqual([[1]]);
    });

    it("should return 2 rows for n = 2", () => {
        expect(pascal(2)).toEqual([[1], [1, 1]]);
    });

    it("should return 3 rows for n = 3", () => {
        expect(pascal(3)).toEqual([[1], [1, 1], [1, 2, 1]]);
    });

    it("should generate Pascal's triangle correctly for n = 5", () => {
        const expected = [
            [1],
            [1, 1],
            [1, 2, 1],
            [1, 3, 3, 1],
            [1, 4, 6, 4, 1],
        ];
        expect(pascal(5)).toEqual(expected);
    });

    it("should generate Pascal's triangle correctly for n = 6", () => {
        const expected = [
            [1],
            [1, 1],
            [1, 2, 1],
            [1, 3, 3, 1],
            [1, 4, 6, 4, 1],
            [1, 5, 10, 10, 5, 1],
        ];
        expect(pascal(6)).toEqual(expected);
    });
});