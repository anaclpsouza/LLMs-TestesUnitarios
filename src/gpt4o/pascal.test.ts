import { pascal } from "../functions/pascal";

describe("pascal", () => {
    test("returns the initial row when n is zero according to the implemented behavior", () => {
        expect(pascal(0)).toEqual([[1]]);
    });

    test("returns the initial row when n is one", () => {
        expect(pascal(1)).toEqual([[1]]);
    });

    test("returns two rows when n is two", () => {
        expect(pascal(2)).toEqual([[1], [1, 1]]);
    });

    test("returns three rows when n is three", () => {
        expect(pascal(3)).toEqual([[1], [1, 1], [1, 2, 1]]);
    });

    test("returns the first five rows of Pascal's triangle", () => {
        expect(pascal(5)).toEqual([
            [1],
            [1, 1],
            [1, 2, 1],
            [1, 3, 3, 1],
            [1, 4, 6, 4, 1],
        ]);
    });

    test("returns the first six rows of Pascal's triangle", () => {
        expect(pascal(6)).toEqual([
            [1],
            [1, 1],
            [1, 2, 1],
            [1, 3, 3, 1],
            [1, 4, 6, 4, 1],
            [1, 5, 10, 10, 5, 1],
        ]);
    });

    test("each generated row has the expected length", () => {
        const rows = pascal(7);


        rows.forEach((row, index) => {
            expect(row).toHaveLength(index + 1);
        });


    });

    test("each generated row starts and ends with one", () => {
        const rows = pascal(8);


        rows.forEach((row) => {
            expect(row[0]).toBe(1);
            expect(row[row.length - 1]).toBe(1);
        });


    });

    test("computes interior values from the two values above them", () => {
        const rows = pascal(8);


        for (let r = 1; r < rows.length; r += 1) {
            for (let c = 1; c < rows[r].length - 1; c += 1) {
                expect(rows[r][c]).toBe(rows[r - 1][c - 1] + rows[r - 1][c]);
            }
        }


    });

    test("generates symmetric rows", () => {
        const rows = pascal(8);


        rows.forEach((row) => {
            expect(row).toEqual([...row].reverse());
        });


    });

    test("row sums are powers of two", () => {
        const rows = pascal(8);


        rows.forEach((row, index) => {
            const sum = row.reduce((total, value) => total + value, 0);
            expect(sum).toBe(2 ** index);
        });


    });

    test("handles a larger valid n", () => {
        const rows = pascal(10);

        expect(rows).toHaveLength(10);
        expect(rows[9]).toEqual([1, 9, 36, 84, 126, 126, 84, 36, 9, 1]);

    });
});
