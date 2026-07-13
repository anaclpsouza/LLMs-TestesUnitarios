import { possible_change } from "../functions/possible_change";

describe("possible_change", () => {
    test("returns 1 when total is zero", () => {
        expect(possible_change([], 0)).toBe(1);
        expect(possible_change([1, 2, 5], 0)).toBe(1);
    });

    test("returns 0 when total is negative", () => {
        expect(possible_change([1, 2, 5], -1)).toBe(0);
        expect(possible_change([], -5)).toBe(0);
    });

    test("returns 0 when there are no coins and total is positive", () => {
        expect(possible_change([], 1)).toBe(0);
        expect(possible_change([], 10)).toBe(0);
    });

    test("returns 1 when a single coin denomination can make the total exactly", () => {
        expect(possible_change([1], 1)).toBe(1);
        expect(possible_change([1], 5)).toBe(1);
        expect(possible_change([5], 10)).toBe(1);
    });

    test("returns 0 when a single coin denomination cannot make the total", () => {
        expect(possible_change([2], 1)).toBe(0);
        expect(possible_change([5], 3)).toBe(0);
        expect(possible_change([4], 10)).toBe(0);
    });

    test("counts ways to make change with two denominations", () => {
        expect(possible_change([1, 2], 1)).toBe(1);
        expect(possible_change([1, 2], 2)).toBe(2);
        expect(possible_change([1, 2], 4)).toBe(3);
    });

    test("counts ways to make change with common coin denominations", () => {
        expect(possible_change([1, 2, 5], 5)).toBe(4);
        expect(possible_change([1, 2, 5], 10)).toBe(10);
    });

    test("counts combinations without considering order", () => {
        expect(possible_change([1, 3, 4], 4)).toBe(3);
        expect(possible_change([1, 3, 4], 5)).toBe(3);
    });

    test("handles coin denominations larger than the total", () => {
        expect(possible_change([5, 10], 3)).toBe(0);
        expect(possible_change([1, 5, 10], 3)).toBe(1);
    });

    test("handles cases where the first coin is larger than the total", () => {
        expect(possible_change([5, 1], 3)).toBe(1);
        expect(possible_change([10, 2, 5], 7)).toBe(1);
    });

    test("handles totals requiring repeated use of the same coin", () => {
        expect(possible_change([2, 3], 6)).toBe(2);
        expect(possible_change([3, 5], 15)).toBe(2);
    });

    test("handles larger valid examples", () => {
        expect(possible_change([1, 2, 3], 4)).toBe(4);
        expect(possible_change([1, 5, 10, 25], 10)).toBe(4);
    });

    test("does not mutate the coins array", () => {
        const coins = [1, 2, 5];
        const original = [...coins];

        possible_change(coins, 5);

        expect(coins).toEqual(original);

    });
});
