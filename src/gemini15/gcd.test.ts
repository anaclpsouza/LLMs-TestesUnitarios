import { gcd } from "../functions/gcd";

describe("gcd", () => {
    it("should return a when b is 0", () => {
        expect(gcd(42, 0)).toBe(42);
        expect(gcd(0, 0)).toBe(0);
    });

    it("should return b when b divides a evenly", () => {
        expect(gcd(12, 4)).toBe(4);
        expect(gcd(100, 10)).toBe(10);
    });

    it("should return 1 when numbers are coprime", () => {
        expect(gcd(17, 13)).toBe(1);
        expect(gcd(8, 9)).toBe(1);
    });

    it("should calculate correct GCD for general positive numbers", () => {
        expect(gcd(48, 18)).toBe(6);
        expect(gcd(54, 24)).toBe(6);
        expect(gcd(101, 103)).toBe(1);
    });

    it("should work regardless of parameter order", () => {
        expect(gcd(18, 48)).toBe(6);
        expect(gcd(4, 12)).toBe(4);
    });

    it("should handle identical numbers", () => {
        expect(gcd(7, 7)).toBe(7);
    });
});