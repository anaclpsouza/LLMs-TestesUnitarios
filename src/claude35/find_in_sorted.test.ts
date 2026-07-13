import { find_in_sorted } from "../functions/find_in_sorted";

describe("find_in_sorted", () => {
  test("retorna -1 para array vazio", () => {
    expect(find_in_sorted([], 5)).toBe(-1);
  });

  test("encontra elemento único que existe no array", () => {
    expect(find_in_sorted([5], 5)).toBe(0);
  });

  test("retorna -1 quando elemento único não corresponde ao valor buscado", () => {
    expect(find_in_sorted([5], 3)).toBe(-1);
  });

  test("encontra elemento no início do array", () => {
    expect(find_in_sorted([1, 2, 3, 4, 5], 1)).toBe(0);
  });

  test("encontra elemento no final do array", () => {
    expect(find_in_sorted([1, 2, 3, 4, 5], 5)).toBe(4);
  });

  test("encontra elemento no meio do array", () => {
    expect(find_in_sorted([1, 2, 3, 4, 5], 3)).toBe(2);
  });

  test("retorna -1 quando o valor buscado não está presente no array", () => {
    expect(find_in_sorted([1, 2, 3, 4, 5], 6)).toBe(-1);
  });

  test("retorna -1 quando o valor buscado é menor que todos os elementos", () => {
    expect(find_in_sorted([2, 4, 6, 8], 0)).toBe(-1);
  });

  test("retorna -1 quando o valor buscado é maior que todos os elementos", () => {
    expect(find_in_sorted([2, 4, 6, 8], 10)).toBe(-1);
  });

  test("retorna -1 para valor buscado entre dois elementos existentes", () => {
    expect(find_in_sorted([1, 3, 5, 7, 9], 4)).toBe(-1);
  });

  test("lida com array de dois elementos buscando o primeiro", () => {
    expect(find_in_sorted([2, 4], 2)).toBe(0);
  });

  test("lida com array de dois elementos buscando o segundo", () => {
    expect(find_in_sorted([2, 4], 4)).toBe(1);
  });

  test("lida com array de dois elementos onde valor não existe", () => {
    expect(find_in_sorted([2, 4], 3)).toBe(-1);
  });

  test("encontra elemento em array grande com número par de elementos", () => {
    expect(find_in_sorted([1, 3, 5, 7, 9, 11, 13, 15], 7)).toBe(3);
  });

  test("encontra elemento em array grande com número ímpar de elementos", () => {
    expect(find_in_sorted([1, 3, 5, 7, 9, 11, 13], 13)).toBe(6);
  });

  test("lida com números negativos no array", () => {
    expect(find_in_sorted([-9, -7, -5, -3, -1], -5)).toBe(2);
  });

  test("retorna -1 ao buscar número negativo ausente", () => {
    expect(find_in_sorted([-9, -7, -5, -3, -1], -4)).toBe(-1);
  });

  test("lida com array contendo valores mistos positivos e negativos", () => {
    expect(find_in_sorted([-5, -2, 0, 3, 8], 0)).toBe(2);
  });

  test("encontra o primeiro elemento em array com número par de elementos", () => {
    expect(find_in_sorted([1, 2, 3, 4, 5, 6], 1)).toBe(0);
  });

  test("encontra o último elemento em array com número par de elementos", () => {
    expect(find_in_sorted([1, 2, 3, 4, 5, 6], 6)).toBe(5);
  });
});