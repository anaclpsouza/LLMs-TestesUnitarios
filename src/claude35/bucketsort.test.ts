import { bucketsort } from "../functions/bucketsort";

describe("bucketsort", () => {
  test("ordena um array de números dentro do intervalo [0, k)", () => {
    expect(bucketsort([3, 1, 2, 0, 2, 1], 4)).toEqual([0, 1, 1, 2, 2, 3]);
  });

  test("retorna array vazio quando arr é vazio", () => {
    expect(bucketsort([], 5)).toEqual([]);
  });

  test("retorna array vazio quando k é 0 e arr é vazio", () => {
    expect(bucketsort([], 0)).toEqual([]);
  });

  test("ordena array já ordenado", () => {
    expect(bucketsort([0, 1, 2, 3], 4)).toEqual([0, 1, 2, 3]);
  });

  test("ordena array em ordem decrescente", () => {
    expect(bucketsort([4, 3, 2, 1, 0], 5)).toEqual([0, 1, 2, 3, 4]);
  });

  test("lida com elementos repetidos", () => {
    expect(bucketsort([2, 2, 2, 2], 3)).toEqual([2, 2, 2, 2]);
  });

  test("lida com um único elemento", () => {
    expect(bucketsort([0], 1)).toEqual([0]);
  });

  test("lida com todos os elementos iguais a 0", () => {
    expect(bucketsort([0, 0, 0], 1)).toEqual([0, 0, 0]);
  });

  test("lida com todos os elementos iguais ao valor máximo (k - 1)", () => {
    expect(bucketsort([4, 4, 4], 5)).toEqual([4, 4, 4]);
  });

  test("lida com k maior que os valores presentes em arr", () => {
    expect(bucketsort([1, 3], 10)).toEqual([1, 3]);
  });

  test("lida com array contendo apenas um valor distinto repetido várias vezes", () => {
    expect(bucketsort([2, 2, 1, 1, 0, 0], 3)).toEqual([0, 0, 1, 1, 2, 2]);
  });

  test("ordena array maior com valores variados", () => {
    expect(bucketsort([5, 3, 8, 1, 9, 2, 7, 4, 6, 0], 10)).toEqual([
      0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
    ]);
  });

  test("preserva a contagem correta de cada valor distinto", () => {
    const result = bucketsort([1, 1, 2, 0, 2, 1, 0], 3);
    expect(result).toEqual([0, 0, 1, 1, 1, 2, 2]);
  });
});