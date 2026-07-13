import { get_factors } from "../functions/get_factors";

describe("get_factors", () => {
  test("retorna array vazio para n = 1", () => {
    expect(get_factors(1)).toEqual([]);
  });

  test("retorna o próprio número para número primo pequeno", () => {
    expect(get_factors(2)).toEqual([2]);
  });

  test("retorna o próprio número para outro número primo pequeno", () => {
    expect(get_factors(7)).toEqual([7]);
  });

  test("fatora número composto simples", () => {
    expect(get_factors(4)).toEqual([2, 2]);
  });

  test("fatora número composto com múltiplos fatores primos", () => {
    expect(get_factors(12)).toEqual([2, 2, 3]);
  });

  test("fatora número composto com fatores primos distintos", () => {
    expect(get_factors(15)).toEqual([3, 5]);
  });

  test("fatora potência de 2", () => {
    expect(get_factors(8)).toEqual([2, 2, 2]);
  });

  test("fatora número primo grande", () => {
    expect(get_factors(97)).toEqual([97]);
  });

  test("fatora número composto grande", () => {
    expect(get_factors(100)).toEqual([2, 2, 5, 5]);
  });

  test("fatora produto de dois primos grandes", () => {
    expect(get_factors(221)).toEqual([13, 17]);
  });

  test("fatora número que é quadrado de um primo", () => {
    expect(get_factors(49)).toEqual([7, 7]);
  });

  test("fatora número composto com fator repetido e fator final grande", () => {
    expect(get_factors(28)).toEqual([2, 2, 7]);
  });

  test("fatora número com múltiplos fatores primos distintos", () => {
    expect(get_factors(30)).toEqual([2, 3, 5]);
  });

  test("fatora número igual a 2 vezes um primo grande", () => {
    expect(get_factors(94)).toEqual([2, 47]);
  });

  test("fatora número composto de três fatores primos distintos", () => {
    expect(get_factors(105)).toEqual([3, 5, 7]);
  });
});