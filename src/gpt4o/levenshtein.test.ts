import { levenshtein } from "../functions/levenshtein";

describe("levenshtein", () => {
    test("returns 0 for two empty strings", () => {
        expect(levenshtein("", "")).toBe(0);
    });

    test("returns the length of the non-empty string when one input is empty", () => {
        expect(levenshtein("", "abc")).toBe(3);
        expect(levenshtein("abc", "")).toBe(3);
    });

    test("returns 0 for equal single-character strings", () => {
        expect(levenshtein("a", "a")).toBe(0);
    });

    test("returns 0 for equal multi-character strings", () => {
        expect(levenshtein("test", "test")).toBe(0);
        expect(levenshtein("abcde", "abcde")).toBe(0);
    });

    test("computes distance for single-character substitution", () => {
        expect(levenshtein("a", "b")).toBe(1);
        expect(levenshtein("cat", "cut")).toBe(1);
    });

    test("computes distance for single-character insertion", () => {
        expect(levenshtein("cat", "cart")).toBe(1);
        expect(levenshtein("abc", "abdc")).toBe(1);
    });

    test("computes distance for single-character deletion", () => {
        expect(levenshtein("cart", "cat")).toBe(1);
        expect(levenshtein("abdc", "abc")).toBe(1);
    });

    test("computes distance when first characters match and recursion advances both strings", () => {
        expect(levenshtein("same", "sale")).toBe(1);
        expect(levenshtein("prefix", "prefox")).toBe(1);
    });

    test("computes distance when first characters differ and all edit branches are reachable", () => {
        expect(levenshtein("abc", "yabc")).toBe(1);
        expect(levenshtein("yabc", "abc")).toBe(1);
        expect(levenshtein("abc", "xbc")).toBe(1);
    });

    test("computes distance for multiple edits", () => {
        expect(levenshtein("kitten", "sitting")).toBe(3);
        expect(levenshtein("flaw", "lawn")).toBe(2);
    });

    test("is symmetric for representative valid inputs", () => {
        expect(levenshtein("gumbo", "gambol")).toBe(2);
        expect(levenshtein("gambol", "gumbo")).toBe(2);
    });

    test("handles strings with repeated characters", () => {
        expect(levenshtein("aaa", "aa")).toBe(1);
        expect(levenshtein("aaaa", "aaab")).toBe(1);
    });

    test("handles completely different strings", () => {
        expect(levenshtein("abc", "xyz")).toBe(3);
    });
});
