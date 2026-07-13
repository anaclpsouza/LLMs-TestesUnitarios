import { knapsack } from "../functions/knapsack";

describe("knapsack", () => {
    test("returns 0 when there are no items", () => {
        expect(knapsack(0, [])).toBe(0);
        expect(knapsack(5, [])).toBe(0);
    });

    test("returns 0 when capacity is zero", () => {
        expect(knapsack(0, [[1, 10]])).toBe(0);
        expect(
            knapsack(0, [
                [1, 10],
                [2, 20],
                [3, 30],
            ]),
        ).toBe(0);
    });

    test("returns 0 when all items are heavier than the capacity", () => {
        expect(
            knapsack(3, [
                [4, 10],
                [5, 20],
                [6, 30],
            ]),
        ).toBe(0);
    });

    test("selects a single item that fits exactly", () => {
        expect(knapsack(5, [[5, 10]])).toBe(10);
    });

    test("does not select a single item that exceeds capacity", () => {
        expect(knapsack(4, [[5, 10]])).toBe(0);
    });

    test("selects the best single item when only one can fit", () => {
        expect(
            knapsack(5, [
                [5, 10],
                [4, 40],
                [6, 100],
            ]),
        ).toBe(40);
    });

    test("selects multiple items when their combined value is optimal", () => {
        expect(
            knapsack(5, [
                [2, 3],
                [3, 4],
                [4, 5],
            ]),
        ).toBe(7);
    });

    test("chooses the higher-value combination instead of the highest individual value", () => {
        expect(
            knapsack(7, [
                [6, 13],
                [4, 8],
                [3, 6],
                [2, 4],
            ]),
        ).toBe(14);
    });

    test("handles items with the same weight and different values", () => {
        expect(
            knapsack(3, [
                [2, 5],
                [2, 8],
                [3, 7],
            ]),
        ).toBe(8);
    });

    test("handles items with the same value and different weights", () => {
        expect(
            knapsack(5, [
                [5, 10],
                [3, 10],
                [2, 6],
            ]),
        ).toBe(16);
    });

    test("does not reuse the same item more than once", () => {
        expect(knapsack(4, [[2, 10]])).toBe(10);
    });

    test("handles zero-value items", () => {
        expect(
            knapsack(5, [
                [1, 0],
                [2, 4],
                [3, 5],
            ]),
        ).toBe(9);
    });

    test("handles zero-weight items within the implemented loop contract", () => {
        expect(
            knapsack(3, [
                [0, 5],
                [2, 10],
            ]),
        ).toBe(15);
    });

    test("handles a standard larger example", () => {
        expect(
            knapsack(50, [
                [10, 60],
                [20, 100],
                [30, 120],
            ]),
        ).toBe(220);
    });

    test("does not mutate the items array", () => {
        const items: Array<[number, number]> = [
            [2, 3],
            [3, 4],
            [4, 5],
        ];
        const original = items.map((item) => [...item]);

        knapsack(5, items);

        expect(items).toEqual(original);

    });
});
