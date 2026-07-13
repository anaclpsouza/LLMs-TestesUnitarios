import { next_palindrome } from "../functions/next_palindrome";

describe("next_palindrome", () => {
    it("should increment the middle element for odd length arrays when middle is not 9", () => {
        expect(next_palindrome([1, 2, 3])).toEqual([1, 3, 3]);
        expect(next_palindrome([1, 2, 3, 2, 1])).toEqual([1, 2, 4, 2, 1]);
    });

    it("should increment both middle elements for even length arrays when middle elements are not 9", () => {
        expect(next_palindrome([1, 2, 2, 1])).toEqual([1, 3, 3, 1]);
        expect(next_palindrome([2, 4, 4, 2])).toEqual([2, 5, 5, 2]);
    });

    it("should handle propagation when middle element is 9 for odd length arrays", () => {
        expect(next_palindrome([1, 9, 1])).toEqual([2, 0, 2]);
        expect(next_palindrome([1, 2, 9, 2, 1])).toEqual([1, 3, 0, 3, 1]);
    });

    it("should handle propagation when middle elements are 9 for even length arrays", () => {
        expect(next_palindrome([1, 9, 9, 1])).toEqual([2, 0, 0, 2]);
        expect(next_palindrome([1, 2, 9, 9, 2, 1])).toEqual([1, 3, 0, 0, 3, 1]);
    });

    it("should wrap around to [1, ..., 1] when all digits are 9 for odd length arrays", () => {
        expect(next_palindrome([9])).toEqual([1, 1]);
        expect(next_palindrome([9, 9, 9])).toEqual([1, 0, 0, 1]);
    });

    it("should wrap around to [1, ..., 1] when all digits are 9 for even length arrays", () => {
        expect(next_palindrome([9, 9])).toEqual([1, 0, 1]);
        expect(next_palindrome([9, 9, 9, 9])).toEqual([1, 0, 0, 0, 1]);
    });

    it("should handle single non-nine digit array", () => {
        expect(next_palindrome([0])).toEqual([1]);
        expect(next_palindrome([5])).toEqual([6]);
    });

    it("should handle empty array input", () => {
        expect(next_palindrome([])).toEqual([1, 1]);
    });
});