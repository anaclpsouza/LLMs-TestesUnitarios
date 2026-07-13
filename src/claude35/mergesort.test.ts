import { mergesort } from "../functions/mergesort";

describe("mergesort", () => {
  test("retorna array vazio quando entrada é vazia", () => {
    expect(mergesort([])).toEqual([]);
  });

  test("retorna o mesmo array para um único elemento", () => {
    expect(mergesort([5])).toEqual([5]);
  });

  test("ordena array de dois elementos já ordenados", () => {
    expect(mergesort([1, 2])).toEqual([1, 2]);
  });

  test("ordena array de dois elementos fora de ordem", () => {
    expect(mergesort([2, 1])).toEqual([1, 2]);
  });

  test("ordena array já ordenado", () => {
    expect(mergesort([1, 2, 3, 4, 5])).toEqual([1, 2, 3, 4, 5]);
  });

  test("ordena array em ordem decrescente", () => {
    expect(mergesort([5, 4, 3, 2, 1])).toEqual([1, 2, 3, 4, 5]);
  });

  test("ordena array com elementos duplicados", () => {
    expect(mergesort([3, 1, 2, 3, 1])).toEqual([1, 1, 2, 3, 3]);
  });

  test("ordena array com todos os elementos iguais", () => {
    expect(mergesort([4, 4, 4, 4])).toEqual([4, 4, 4, 4]);
  });

  test("ordena array com números negativos", () => {
    expect(mergesort([-3, -1, -2, 0, 2, 1])).toEqual([-3, -2, -1, 0, 1, 2]);
  });

  test("ordena array com números negativos e positivos misturados", () => {
    expect(mergesort([5, -3, 2, -8, 0, 7])).toEqual([-8, -3, 0, 2, 5, 7]);
  });

  test("ordena array grande com valores aleatórios", () => {
    expect(mergesort([9, 3, 7, 1, 8, 2, 5, 4, 6, 0])).toEqual([
      0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
    ]);
  });

  test("ordena array com número ímpar de elementos", () => {
    expect(mergesort([7, 2, 9, 1, 5])).toEqual([1, 2, 5, 7, 9]);
  });

  test("ordena array com número par de elementos", () => {
    expect(mergesort([8, 3, 6, 1])).toEqual([1, 3, 6, 8]);
  });

  test("mantém estabilidade lógica de valores duplicados extremos", () => {
    expect(mergesort([1, 1, 1, 0, 0, 2, 2])).toEqual([0, 0, 1, 1, 1, 2, 2]);
  });

  test("não modifica o array original (imutabilidade)", () => {
    const original = [3, 1, 2];
    const result = mergesort(original);
    expect(original).toEqual([3, 1, 2]);
    expect(result).toEqual([1, 2, 3]);
  });
});