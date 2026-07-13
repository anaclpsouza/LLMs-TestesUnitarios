import { gcd } from "../functions/gcd";

describe("gcd", () => {
  test("retorna a quando b é 0", () => {
    expect(gcd(5, 0)).toBe(5);
  });

  test("retorna 0 quando a e b são ambos 0", () => {
    expect(gcd(0, 0)).toBe(0);
  });

  test("retorna b quando a é 0", () => {
    expect(gcd(0, 5)).toBe(5);
  });

  test("calcula o mdc de dois números primos entre si", () => {
    expect(gcd(7, 13)).toBe(1);
  });

  test("calcula o mdc de dois números onde um divide o outro", () => {
    expect(gcd(10, 5)).toBe(5);
  });

  test("calcula o mdc de dois números iguais", () => {
    expect(gcd(8, 8)).toBe(8);
  });

  test("calcula o mdc de números pequenos", () => {
    expect(gcd(12, 8)).toBe(4);
  });

  test("calcula o mdc quando a é menor que b", () => {
    expect(gcd(4, 12)).toBe(4);
  });

  test("calcula o mdc de números grandes", () => {
    expect(gcd(1071, 462)).toBe(21);
  });

  test("calcula o mdc de dois números consecutivos", () => {
    expect(gcd(17, 18)).toBe(1);
  });

  test("calcula o mdc envolvendo o número 1", () => {
    expect(gcd(1, 100)).toBe(1);
  });

  test("calcula o mdc quando b é 1", () => {
    expect(gcd(100, 1)).toBe(1);
  });

  test("calcula o mdc de números com fatores comuns múltiplos", () => {
    expect(gcd(48, 18)).toBe(6);
  });

  test("calcula o mdc de um número primo e um número composto", () => {
    expect(gcd(13, 26)).toBe(13);
  });

  test("calcula o mdc de dois números primos distintos", () => {
    expect(gcd(17, 19)).toBe(1);
  });
});