import { gcd } from "../functions/gcd";

describe("gcd", () => {
    test("returns the first value when the second value is zero", () => {
        expect(gcd(5, 0)).toBe(5);
        expect(gcd(1, 0)).toBe(1);
        expect(gcd(0, 0)).toBe(0);
    });

    test("returns the non-zero value when the first value is zero", () => {
        expect(gcd(0, 5)).toBe(5);
        expect(gcd(0, 12)).toBe(12);
    });

    test("returns the same value when both values are equal", () => {
        expect(gcd(7, 7)).toBe(7);
        expect(gcd(42, 42)).toBe(42);
    });

    test("returns the smaller value when it divides the larger value", () => {
        expect(gcd(12, 4)).toBe(4);
        expect(gcd(4, 12)).toBe(4);
        expect(gcd(100, 25)).toBe(25);
    });

    test("computes the greatest common divisor for typical positive inputs", () => {
        expect(gcd(54, 24)).toBe(6);
        expect(gcd(48, 18)).toBe(6);
        expect(gcd(270, 192)).toBe(6);
    });

    test("returns 1 for coprime positive inputs", () => {
        expect(gcd(17, 13)).toBe(1);
        expect(gcd(35, 64)).toBe(1);
        expect(gcd(101, 10)).toBe(1);
    });

    test("handles inputs where the first value is smaller than the second", () => {
        expect(gcd(18, 48)).toBe(6);
        expect(gcd(21, 84)).toBe(21);
        expect(gcd(14, 49)).toBe(7);
    });

    test("handles consecutive positive integers", () => {
        expect(gcd(8, 9)).toBe(1);
        expect(gcd(99, 100)).toBe(1);
    });

    test("handles larger positive inputs", () => {
        expect(gcd(123456, 7890)).toBe(6);
        expect(gcd(1048576, 32768)).toBe(32768);
    });

    test("handles recursive paths with several remainder steps", () => {
        expect(gcd(1071, 462)).toBe(21);
        expect(gcd(462, 1071)).toBe(21);
    });
});
