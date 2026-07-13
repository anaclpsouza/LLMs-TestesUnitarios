import { bitcount } from "../functions/bitcount";

describe("bitcount", () => {
    it("should return 0 when input is 0", () => {
        expect(bitcount(0)).toBe(0);
    });

    it("should return 1 for powers of two", () => {
        expect(bitcount(1)).toBe(1);
        expect(bitcount(2)).toBe(1);
        expect(bitcount(4)).toBe(1);
        expect(bitcount(16)).toBe(1);
        expect(bitcount(1024)).toBe(1);
    });

    it("should correctly count set bits for consecutive bit patterns", () => {
        expect(bitcount(3)).toBe(2);
        expect(bitcount(7)).toBe(3);
        expect(bitcount(15)).toBe(4);
        expect(bitcount(255)).toBe(8);
    });

    it("should correctly count set bits for sparse and alternating bit patterns", () => {
        expect(bitcount(0b10101010)).toBe(4);
        expect(bitcount(0b11001100)).toBe(4);
        expect(bitcount(0b1000000000000001)).toBe(2);
    });

    it("should handle large safe integers correctly", () => {
        expect(bitcount(Number.MAX_SAFE_INTEGER)).toBe(53);
    });
});