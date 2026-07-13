import { powerset } from "../functions/powerset";

describe("powerset", () => {
  test("retorna array contendo apenas o array vazio para entrada vazia", () => {
    expect(powerset([])).toEqual([[]]);
  });

  test("calcula o conjunto potência para um único elemento", () => {
    expect(powerset([1])).toEqual([[], [1]]);
  });

  test("calcula o conjunto potência para dois elementos", () => {
    expect(powerset([1, 2])).toEqual([[], [2], [1], [1, 2]]);
  });

  test("calcula o conjunto potência para três elementos", () => {
    expect(powerset([1, 2, 3])).toEqual([
      [],
      [3],
      [2],
      [2, 3],
      [1],
      [1, 3],
      [1, 2],
      [1, 2, 3],
    ]);
  });

  test("retorna o número correto de subconjuntos (2^n) para array de tamanho n", () => {
    expect(powerset([1, 2, 3, 4]).length).toBe(16);
  });

  test("calcula o conjunto potência para array de strings", () => {
    expect(powerset(["a", "b"])).toEqual([[], ["b"], ["a"], ["a", "b"]]);
  });

  test("calcula o conjunto potência para array com elementos duplicados", () => {
    expect(powerset([1, 1])).toEqual([[], [1], [1], [1, 1]]);
  });

  test("inclui o array vazio como o primeiro subconjunto sempre", () => {
    expect(powerset([5, 6, 7])[0]).toEqual([]);
  });

  test("inclui o array completo como o último subconjunto sempre", () => {
    const result = powerset([5, 6, 7]);
    expect(result[result.length - 1]).toEqual([5, 6, 7]);
  });

  test("calcula o conjunto potência para array de quatro elementos numéricos", () => {
    expect(powerset([1, 2, 3, 4])).toEqual([
      [],
      [4],
      [3],
      [3, 4],
      [2],
      [2, 4],
      [2, 3],
      [2, 3, 4],
      [1],
      [1, 4],
      [1, 3],
      [1, 3, 4],
      [1, 2],
      [1, 2, 4],
      [1, 2, 3],
      [1, 2, 3, 4],
    ]);
  });

  test("cada subconjunto retornado tem tamanho entre 0 e o comprimento do array original", () => {
    const arr = [1, 2, 3];
    const result = powerset(arr);
    result.forEach((subset) => {
      expect(subset.length).toBeGreaterThanOrEqual(0);
      expect(subset.length).toBeLessThanOrEqual(arr.length);
    });
  });

  test("todos os subconjuntos retornados são únicos como estruturas (sem duplicação de referência)", () => {
    const result = powerset([1, 2]);
    expect(result).toHaveLength(4);
    expect(new Set(result.map((s) => JSON.stringify(s))).size).toBe(4);
  });
});