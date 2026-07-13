import { get_factors } from "../functions/get_factors";

describe("get_factors", () => {
    it("should return an empty array when n is 1", () => {
        expect(get_factors(1)).toEqual([]);
    });

    it("should return an array containing only the number itself when n is a prime number", () => {
        expect(get_factors(2)).toEqual([2]);
        expect(get_factors(3)).toEqual([3]);
        expect(get_factors(7)).toEqual([7]);
        expect(get_factors(13)).toEqual([13]);
    });

    it("should return correct prime factors for composite numbers", () => {
        expect(get_factors(4)).toEqual([2, 2]);
        expect(get_factors(6)).toEqual([2, 3]);
        expect(get_factors(12)).toEqual([2, 2, 3]);
        expect(get_factors(100)).toEqual([2, 2, 5, 5]);
    });

    it("should handle perfect squares", () => {
        expect(get_factors(9)).toEqual([3, 3]);
        expect(get_factors(25)).toEqual([5, 5]);
        expect(get_factors(16)).toEqual([2, 2, 2, 2]);
    });

    it("should handle larger composite numbers", () => {
        expect(get_factors(360)).toEqual([2, 2, 2, 3, 3, 5]);
    });
});