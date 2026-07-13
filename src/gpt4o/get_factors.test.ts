import { get_factors } from "../functions/get_factors";

describe("get_factors", () => {
    test("returns an empty array for 1", () => {
        expect(get_factors(1)).toEqual([]);
    });

    test("returns the number itself for prime numbers", () => {
        expect(get_factors(2)).toEqual([2]);
        expect(get_factors(3)).toEqual([3]);
        expect(get_factors(5)).toEqual([5]);
        expect(get_factors(13)).toEqual([13]);
        expect(get_factors(97)).toEqual([97]);
    });

    test("returns repeated factors for powers of a prime", () => {
        expect(get_factors(4)).toEqual([2, 2]);
        expect(get_factors(8)).toEqual([2, 2, 2]);
        expect(get_factors(16)).toEqual([2, 2, 2, 2]);
        expect(get_factors(27)).toEqual([3, 3, 3]);
    });

    test("returns factors for composite numbers with different prime factors", () => {
        expect(get_factors(6)).toEqual([2, 3]);
        expect(get_factors(10)).toEqual([2, 5]);
        expect(get_factors(12)).toEqual([2, 2, 3]);
        expect(get_factors(18)).toEqual([2, 3, 3]);
        expect(get_factors(30)).toEqual([2, 3, 5]);
    });

    test("handles perfect squares", () => {
        expect(get_factors(9)).toEqual([3, 3]);
        expect(get_factors(25)).toEqual([5, 5]);
        expect(get_factors(49)).toEqual([7, 7]);
        expect(get_factors(121)).toEqual([11, 11]);
    });

    test("handles composite numbers whose smallest factor is not 2", () => {
        expect(get_factors(15)).toEqual([3, 5]);
        expect(get_factors(21)).toEqual([3, 7]);
        expect(get_factors(35)).toEqual([5, 7]);
        expect(get_factors(77)).toEqual([7, 11]);
    });

    test("handles larger composite numbers", () => {
        expect(get_factors(84)).toEqual([2, 2, 3, 7]);
        expect(get_factors(360)).toEqual([2, 2, 2, 3, 3, 5]);
        expect(get_factors(1024)).toEqual([
            2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
        ]);
    });

    test("returns factors whose product equals the original number", () => {
        const input = 2310;
        const factors = get_factors(input);


        expect(factors).toEqual([2, 3, 5, 7, 11]);
        expect(factors.reduce((product, factor) => product * factor, 1)).toBe(input);

    });
});
