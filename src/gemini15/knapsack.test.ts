import { knapsack } from "../functions/knapsack";

describe("knapsack", () => {
    it("should return 0 when capacity is 0", () => {
        const items: Array<[number, number]> = [[2, 3], [3, 4]];
        expect(knapsack(0, items)).toBe(0);
    });

    it("should return 0 when items array is empty", () => {
        expect(knapsack(10, [])).toBe(0);
    });

    it("should return 0 when capacity is 0 and items array is empty", () => {
        expect(knapsack(0, [])).toBe(0);
    });

    it("should skip items that exceed the capacity", () => {
        const items: Array<[number, number]> = [[5, 10], [6, 20]];
        expect(knapsack(3, items)).toBe(0);
    });

    it("should include item when weight equals capacity", () => {
        const items: Array<[number, number]> = [[5, 10]];
        expect(knapsack(5, items)).toBe(10);
    });

    it("should select optimal combination of items without exceeding capacity", () => {
        const items: Array<[number, number]> = [
            [1, 6],
            [2, 10],
            [3, 12],
        ];
        expect(knapsack(5, items)).toEqual(22);
    });

    it("should choose item with higher value when weights are equal", () => {
        const items: Array<[number, number]> = [
            [3, 10],
            [3, 20],
        ];
        expect(knapsack(3, items)).toBe(20);
    });

    it("should correctly handle items with weight or value equal to 0", () => {
        const items: Array<[number, number]> = [
            [0, 5],
            [2, 0],
            [2, 10],
        ];
        expect(knapsack(2, items)).toBe(15);
    });

    it("should correctly evaluate branch where taking item is better than skipping", () => {
        const items: Array<[number, number]> = [
            [2, 3],
            [3, 4],
            [4, 5],
            [5, 6],
        ];
        expect(knapsack(5, items)).toBe(7);
    });

    it("should correctly evaluate branch where skipping item is better than taking", () => {
        const items: Array<[number, number]> = [
            [3, 10],
            [5, 4],
        ];
        expect(knapsack(5, items)).toBe(10);
    });
});