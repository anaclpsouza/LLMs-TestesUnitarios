import { next_permutation } from "../functions/next_permutation";

describe("next_permutation", () => {
  test("retorna undefined para array de um único elemento", () => {
    expect(next_permutation([1])).toBeUndefined();
  });

  test("retorna a próxima permutação para array de dois elementos em ordem crescente", () => {
    expect(next_permutation([1, 2])).toEqual([2, 1]);
  });

  test("retorna undefined para array de dois elementos na última permutação", () => {
    expect(next_permutation([2, 1])).toBeUndefined();
  });

  test("retorna a próxima permutação para array de três elementos ordenado", () => {
    expect(next_permutation([1, 2, 3])).toEqual([1, 3, 2]);
  });

  test("retorna undefined para array de três elementos na última permutação (decrescente)", () => {
    expect(next_permutation([3, 2, 1])).toBeUndefined();
  });

  test("calcula corretamente a próxima permutação intermediária", () => {
    expect(next_permutation([1, 3, 2])).toEqual([2, 1, 3]);
  });

  test("calcula corretamente outra permutação intermediária", () => {
    expect(next_permutation([2, 3, 1])).toEqual([3, 1, 2]);
  });

  test("calcula corretamente para array de quatro elementos com troca e reversão de sufixo", () => {
    expect(next_permutation([1, 2, 4, 3])).toEqual([1, 3, 2, 4]);
  });

  test("lida com elementos duplicados corretamente", () => {
    expect(next_permutation([1, 1, 5])).toEqual([1, 5, 1]);
  });

  test("retorna undefined quando todos os elementos são iguais", () => {
    expect(next_permutation([2, 2, 2])).toBeUndefined();
  });

  test("calcula corretamente para array de quatro elementos ordenado crescente", () => {
    expect(next_permutation([1, 2, 3, 4])).toEqual([1, 2, 4, 3]);
  });

  test("retorna undefined para array de quatro elementos na última permutação", () => {
    expect(next_permutation([4, 3, 2, 1])).toBeUndefined();
  });

  test("calcula corretamente quando apenas o último par precisa ser trocado", () => {
    expect(next_permutation([1, 2, 3, 5, 4])).toEqual([1, 2, 4, 3, 5]);
  });

  test("calcula corretamente para permutação com múltiplos elementos decrescentes no final", () => {
    expect(next_permutation([2, 1, 3])).toEqual([2, 3, 1]);
  });

  test("calcula corretamente para array maior com estrutura mista", () => {
    expect(next_permutation([1, 5, 4, 3, 2])).toEqual([2, 1, 3, 4, 5]);
  });
});