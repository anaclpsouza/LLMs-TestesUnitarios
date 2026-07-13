import { next_palindrome } from "../functions/next_palindrome";

describe("next_palindrome", () => {
    test("increments a single non-nine digit", () => {
        expect(next_palindrome([0])).toEqual([1]);
        expect(next_palindrome([5])).toEqual([6]);
        expect(next_palindrome([8])).toEqual([9]);
    });

    test("returns the next palindrome for a single nine digit", () => {
        expect(next_palindrome([9])).toEqual([1, 1]);
    });

    test("increments the middle pair for even-length palindromes without carry", () => {
        expect(next_palindrome([1, 1])).toEqual([2, 2]);
        expect(next_palindrome([1, 2, 2, 1])).toEqual([1, 3, 3, 1]);
        expect(next_palindrome([4, 5, 5, 4])).toEqual([4, 6, 6, 4]);
    });

    test("increments the middle digit for odd-length palindromes without carry", () => {
        expect(next_palindrome([1, 2, 1])).toEqual([1, 3, 1]);
        expect(next_palindrome([3, 4, 5, 4, 3])).toEqual([3, 4, 6, 4, 3]);
    });

    test("propagates carry through central nines in odd-length inputs", () => {
        expect(next_palindrome([1, 9, 1])).toEqual([2, 0, 2]);
        expect(next_palindrome([1, 2, 9, 2, 1])).toEqual([1, 3, 0, 3, 1]);
        expect(next_palindrome([4, 9, 9, 9, 4])).toEqual([5, 0, 0, 0, 5]);
    });

    test("propagates carry through central nines in even-length inputs", () => {
        expect(next_palindrome([1, 9, 9, 1])).toEqual([2, 0, 0, 2]);
        expect(next_palindrome([1, 2, 9, 9, 2, 1])).toEqual([1, 3, 0, 0, 3, 1]);
        expect(next_palindrome([4, 9, 9, 9, 9, 4])).toEqual([5, 0, 0, 0, 0, 5]);
    });

    test("returns a longer palindrome when every processed pair is nine", () => {
        expect(next_palindrome([9, 9])).toEqual([1, 0, 1]);
        expect(next_palindrome([9, 9, 9])).toEqual([1, 0, 0, 1]);
        expect(next_palindrome([9, 9, 9, 9])).toEqual([1, 0, 0, 0, 1]);
    });

    test("handles longer palindromes without changing unaffected outer digits", () => {
        expect(next_palindrome([1, 2, 3, 4, 3, 2, 1])).toEqual([
            1, 2, 3, 5, 3, 2, 1,
        ]);
        expect(next_palindrome([7, 6, 5, 5, 6, 7])).toEqual([
            7, 6, 6, 6, 6, 7,
        ]);
    });

    test("mutates and returns the same input array when no full overflow occurs", () => {
        const input = [1, 2, 1];

        const result = next_palindrome(input);

        expect(result).toBe(input);
        expect(input).toEqual([1, 3, 1]);

    });

    test("returns a new array when full overflow occurs", () => {
        const input = [9, 9, 9];

        const result = next_palindrome(input);

        expect(result).not.toBe(input);
        expect(result).toEqual([1, 0, 0, 1]);

    });
});
