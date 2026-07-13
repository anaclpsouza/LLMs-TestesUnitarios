import { lis } from "../functions/lis";

describe("lis", () => {
    it("should return 0 for an empty array", () => {
        expect(lis([])).toBe(0);
    });

    it("should return 1 for a single-element array", () => {
        expect(lis([10])).toBe(1);
    });

    it("should return 1 for an array with strictly decreasing values", () => {
        expect(lis([5, 4, 3, 2, 1])).toBe(1);
    });

    it("should return length of array for strictly increasing values", () => {
        expect(lis([1, 2, 3, 4, 5])).toBe(5);
    });

    it("should return 1 for an array with all identical elements", () => {
        expect(lis([7, 7, 7, 7])).toBe(1);
    });

    it("should calculate length of LIS for unsorted arrays", () => {
        expect(lis([10, 22, 9, 33, 21, 50, 41, 60, 80])).toBe(6);
        expect(lis([0, 8, 4, 12, 2, 10, 6, 14, 1, 9, 5, 13, 3, 11, 7, 15])).toBe(6);
    });

    it("should replace end element of an existing length when smaller value is encountered", () => {
        expect(lis([10, 20, 15, 30])).toBe(3);
    });

    it("should handle arrays with negative numbers and zero", () => {
        expect(lis([-5, -2, -8, 0, 3, -1, 4])).toBe(5);
    });
});