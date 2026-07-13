import { levenshtein } from "../functions/levenshtein";

describe("levenshtein", () => {
    it("should return 0 when both strings are empty", () => {
        expect(levenshtein("", "")).toBe(0);
    });

    it("should return the length of target when source is empty", () => {
        expect(levenshtein("", "abc")).toBe(3);
    });

    it("should return the length of source when target is empty", () => {
        expect(levenshtein("abc", "")).toBe(3);
    });

    it("should return 0 for identical strings", () => {
        expect(levenshtein("hello", "hello")).toBe(0);
        expect(levenshtein("a", "a")).toBe(0);
    });

    it("should return correct distance for single character insertion, deletion, and substitution", () => {
        expect(levenshtein("cat", "cats")).toBe(1);
        expect(levenshtein("cats", "cat")).toBe(1);
        expect(levenshtein("cat", "bat")).toBe(1);
    });

    it("should return correct distance when characters match at the beginning", () => {
        expect(levenshtein("abc", "abx")).toBe(1);
        expect(levenshtein("testing", "tester")).toBe(3);
    });

    it("should calculate distance for completely different strings", () => {
        expect(levenshtein("abc", "def")).toBe(3);
    });

    it("should handle strings of different lengths with mixed operations", () => {
        expect(levenshtein("kitten", "sitting")).toBe(3);
    });
});