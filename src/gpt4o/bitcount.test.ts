import { bitcount } from "../functions/bitcount";

describe("bitcount", () => {
    test("returns 0 for zero", () => {
        expect(bitcount(0)).toBe(0);
    });

    test("returns 1 for powers of two", () => {
        expect(bitcount(1)).toBe(1);
        expect(bitcount(2)).toBe(1);
        expect(bitcount(4)).toBe(1);
        expect(bitcount(8)).toBe(1);
        expect(bitcount(1024)).toBe(1);
    });

    test("counts set bits for positive integers with multiple bits set", () => {
        expect(bitcount(3)).toBe(2);
        expect(bitcount(5)).toBe(2);
        expect(bitcount(6)).toBe(2);
        expect(bitcount(7)).toBe(3);
        expect(bitcount(15)).toBe(4);
        expect(bitcount(31)).toBe(5);
    });

    test("counts set bits for mixed binary patterns", () => {
        expect(bitcount(10)).toBe(2);
        expect(bitcount(42)).toBe(3);
        expect(bitcount(85)).toBe(4);
        expect(bitcount(170)).toBe(4);
        expect(bitcount(255)).toBe(8);
    });

    test("counts set bits for larger safe integers", () => {
        expect(bitcount(1023)).toBe(10);
        expect(bitcount(4095)).toBe(12);
        expect(bitcount(65535)).toBe(16);
        expect(bitcount(1048575)).toBe(20);
    });

    test("counts set bits when only high-order bits are set", () => {
        expect(bitcount(2 ** 20)).toBe(1);
        expect(bitcount(2 ** 20 + 1)).toBe(2);
        expect(bitcount(2 ** 30 + 2 ** 15 + 1)).toBe(3);
    });

    test("handles Number.MAX_SAFE_INTEGER", () => {
        expect(bitcount(Number.MAX_SAFE_INTEGER)).toBe(53);
    });
});
