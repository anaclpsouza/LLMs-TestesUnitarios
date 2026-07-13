import { is_valid_parenthesization } from "../functions/is_valid_parenthesization";

describe("is_valid_parenthesization", () => {
    it("should return true for an empty string", () => {
        expect(is_valid_parenthesization("")).toBe(true);
    });

    it("should return true for simple valid parenthesization", () => {
        expect(is_valid_parenthesization("()")).toBe(true);
    });

    it("should return true for nested valid parenthesization", () => {
        expect(is_valid_parenthesization("(())")).toBe(true);
        expect(is_valid_parenthesization("((()))")).toBe(true);
    });

    it("should return true for sequential valid parenthesization", () => {
        expect(is_valid_parenthesization("()()()")).toBe(true);
        expect(is_valid_parenthesization("(())()")).toBe(true);
    });

    it("should return false when a closing parenthesis occurs before an opening one", () => {
        expect(is_valid_parenthesization(")")).toBe(false);
        expect(is_valid_parenthesization(")(")).toBe(false);
        expect(is_valid_parenthesization("())(()")).toBe(false);
    });

    it("should return false when there are unclosed opening parentheses", () => {
        expect(is_valid_parenthesization("(")).toBe(false);
        expect(is_valid_parenthesization("((()")).toBe(false);
        expect(is_valid_parenthesization("(()()")).toBe(false);
    });

    it("should return false when there are extra closing parentheses at the end", () => {
        expect(is_valid_parenthesization("())")).toBe(false);
        expect(is_valid_parenthesization("(()))")).toBe(false);
    });
});