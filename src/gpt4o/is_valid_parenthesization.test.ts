import { is_valid_parenthesization } from "../functions/is_valid_parenthesization";

describe("is_valid_parenthesization", () => {
    test("returns true for an empty string", () => {
        expect(is_valid_parenthesization("")).toBe(true);
    });

    test("returns true for a single valid pair", () => {
        expect(is_valid_parenthesization("()")).toBe(true);
    });

    test("returns true for multiple adjacent valid pairs", () => {
        expect(is_valid_parenthesization("()()")).toBe(true);
        expect(is_valid_parenthesization("()()()")).toBe(true);
    });

    test("returns true for nested valid pairs", () => {
        expect(is_valid_parenthesization("(())")).toBe(true);
        expect(is_valid_parenthesization("((()))")).toBe(true);
        expect(is_valid_parenthesization("(((())))")).toBe(true);
    });

    test("returns true for mixed nested and adjacent valid pairs", () => {
        expect(is_valid_parenthesization("(()())")).toBe(true);
        expect(is_valid_parenthesization("()(())")).toBe(true);
        expect(is_valid_parenthesization("((())())")).toBe(true);
    });

    test("returns false for a single opening parenthesis", () => {
        expect(is_valid_parenthesization("(")).toBe(false);
    });

    test("returns false for a single closing parenthesis", () => {
        expect(is_valid_parenthesization(")")).toBe(false);
    });

    test("returns false when there are more opening than closing parentheses", () => {
        expect(is_valid_parenthesization("(()")).toBe(false);
        expect(is_valid_parenthesization("((()")).toBe(false);
        expect(is_valid_parenthesization("()((")).toBe(false);
    });

    test("returns false when there are more closing than opening parentheses", () => {
        expect(is_valid_parenthesization("())")).toBe(false);
        expect(is_valid_parenthesization("()))")).toBe(false);
        expect(is_valid_parenthesization("()())")).toBe(false);
    });

    test("returns false when the depth becomes negative before the end", () => {
        expect(is_valid_parenthesization(")(")).toBe(false);
        expect(is_valid_parenthesization("())(")).toBe(false);
        expect(is_valid_parenthesization("())(()")).toBe(false);
    });

    test("handles longer valid parenthesizations", () => {
        expect(is_valid_parenthesization("((())())(()(()))")).toBe(true);
    });

    test("handles longer invalid parenthesizations", () => {
        expect(is_valid_parenthesization("((())())(()(())))(")).toBe(false);
    });
});
