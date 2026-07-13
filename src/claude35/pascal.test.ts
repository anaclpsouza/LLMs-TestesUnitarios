import { pascal } from "../functions/pascal";

describe("pascal", () => {
    test("retorna apenas a primeira linha quando n = 1", () => {
        expect(pascal(1)).toEqual([[1]]);
    });

    test("calcula corretamente para n = 2", () => {
        expect(pascal(2)).toEqual([[1], [1, 1]]);
    });

    test("calcula corretamente para n = 3", () => {
        expect(pascal(3)).toEqual([[1], [1, 1], [1, 2, 1]]);
    });

    test("calcula corretamente para n = 4", () => {
        expect(pascal(4)).toEqual([
            [1],
            [1, 1],
            [1, 2, 1],
            [1, 3, 3, 1],
        ]);
    });

    test("calcula corretamente para n = 5", () => {
        expect(pascal(5)).toEqual([
            [1],
            [1, 1],
            [1, 2, 1],
            [1, 3, 3, 1],
            [1, 4, 6, 4, 1],
        ]);
    });

    test("calcula corretamente para n = 6", () => {
        expect(pascal(6)).toEqual([
            [1],
            [1, 1],
            [1, 2, 1],
            [1, 3, 3, 1],
            [1, 4, 6, 4, 1],
            [1, 5, 10, 10, 5, 1],
        ]);
    });

    test("cada linha tem o número correto de elementos (r + 1)", () => {
        const result = pascal(7);
        result.forEach((row, index) => {
            expect(row.length).toBe(index + 1);
        });
    });

    test("cada linha começa e termina com 1", () => {
        const result = pascal(6);
        result.forEach((row) => {
            expect(row[0]).toBe(1);
            expect(row[row.length - 1]).toBe(1);
        });
    });

    test("retorna o número correto de linhas para n = 10", () => {
        expect(pascal(10)).toHaveLength(10);
    });

    test("cada elemento interno é a soma dos dois elementos acima na linha anterior", () => {
        const result = pascal(6);
        for (let r = 2; r < result.length; r += 1) {
            for (let c = 1; c < r; c += 1) {
                expect(result[r][c]).toBe(result[r - 1][c - 1] + result[r - 1][c]);
            }
        }
    });
});