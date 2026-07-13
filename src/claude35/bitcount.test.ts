import { bitcount } from "../functions/bitcount";

describe("bitcount", () => {
  test("retorna 0 para n = 0", () => {
    expect(bitcount(0)).toBe(0);
  });

  test("retorna 1 para n = 1", () => {
    expect(bitcount(1)).toBe(1);
  });

  test("retorna 1 para potência de 2 (n = 2)", () => {
    expect(bitcount(2)).toBe(1);
  });

  test("retorna 2 para n = 3 (0b11)", () => {
    expect(bitcount(3)).toBe(2);
  });

  test("retorna 1 para n = 4 (0b100)", () => {
    expect(bitcount(4)).toBe(1);
  });

  test("retorna 2 para n = 5 (0b101)", () => {
    expect(bitcount(5)).toBe(2);
  });

  test("retorna 4 para n = 15 (0b1111)", () => {
    expect(bitcount(15)).toBe(4);
  });

  test("retorna 1 para n = 16 (0b10000)", () => {
    expect(bitcount(16)).toBe(1);
  });

  test("retorna 8 para n = 255 (0b11111111)", () => {
    expect(bitcount(255)).toBe(8);
  });

  test("retorna 1 para n = 1024 (potência de 2 maior)", () => {
    expect(bitcount(1024)).toBe(1);
  });

  test("calcula corretamente para número grande (n = 1023)", () => {
    expect(bitcount(1023)).toBe(10);
  });

  test("calcula corretamente para número grande arbitrário", () => {
    expect(bitcount(123456789)).toBe(16);
  });

  test("calcula corretamente para Number.MAX_SAFE_INTEGER", () => {
    expect(bitcount(Number.MAX_SAFE_INTEGER)).toBe(53);
  });

  test("retorna 0 para n negativo igual a 0 negativo (n = -0)", () => {
    expect(bitcount(-0)).toBe(0);
  });

  test("calcula corretamente para números com padrões de bits alternados", () => {
    expect(bitcount(0b10101010)).toBe(4);
  });

  test("calcula corretamente para números com todos os bits em um byte", () => {
    expect(bitcount(0xff)).toBe(8);
  });

  test("calcula corretamente para número com um único bit alto (n = 32)", () => {
    expect(bitcount(32)).toBe(1);
  });

  test("calcula corretamente para número com múltiplos bits (n = 100)", () => {
    expect(bitcount(100)).toBe(3);
  });
});