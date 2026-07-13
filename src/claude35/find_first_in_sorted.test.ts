import { find_first_in_sorted } from "../functions/find_first_in_sorted";

describe("find_first_in_sorted", () => {
  test("retorna -1 para array vazio", () => {
    expect(find_first_in_sorted([], 5)).toBe(-1);
  });

  test("encontra elemento único que existe no array", () => {
    expect(find_first_in_sorted([5], 5)).toBe(0);
  });

  test("retorna -1 quando elemento único não corresponde ao valor buscado", () => {
    expect(find_first_in_sorted([5], 3)).toBe(-1);
  });

  test("encontra a primeira ocorrência em array sem duplicatas", () => {
    expect(find_first_in_sorted([1, 2, 3, 4, 5], 3)).toBe(2);
  });

  test("encontra a primeira ocorrência de um valor duplicado no início", () => {
    expect(find_first_in_sorted([1, 1, 1, 2, 3], 1)).toBe(0);
  });

  test("encontra a primeira ocorrência de um valor duplicado no meio", () => {
    expect(find_first_in_sorted([1, 2, 2, 2, 3], 2)).toBe(1);
  });

  test("encontra a primeira ocorrência de um valor duplicado no final", () => {
    expect(find_first_in_sorted([1, 2, 3, 4, 4, 4], 4)).toBe(3);
  });

  test("encontra a primeira ocorrência quando todos os elementos são iguais", () => {
    expect(find_first_in_sorted([7, 7, 7, 7, 7], 7)).toBe(0);
  });

  test("retorna -1 quando o valor buscado não está presente no array", () => {
    expect(find_first_in_sorted([1, 2, 3, 4, 5], 6)).toBe(-1);
  });

  test("retorna -1 quando o valor buscado é menor que todos os elementos", () => {
    expect(find_first_in_sorted([2, 4, 6, 8], 0)).toBe(-1);
  });

  test("retorna -1 quando o valor buscado é maior que todos os elementos", () => {
    expect(find_first_in_sorted([2, 4, 6, 8], 10)).toBe(-1);
  });

  test("encontra o primeiro elemento do array", () => {
    expect(find_first_in_sorted([1, 3, 5, 7, 9], 1)).toBe(0);
  });

  test("encontra o último elemento do array", () => {
    expect(find_first_in_sorted([1, 3, 5, 7, 9], 9)).toBe(4);
  });

  test("retorna -1 para valor buscado entre dois elementos existentes", () => {
    expect(find_first_in_sorted([1, 3, 5, 7, 9], 4)).toBe(-1);
  });

  test("encontra a primeira ocorrência em array grande com múltiplas duplicatas", () => {
    expect(
      find_first_in_sorted([1, 2, 2, 2, 2, 3, 3, 4, 5, 5, 5, 6], 5)
    ).toBe(8);
  });

  test("lida com array de dois elementos iguais", () => {
    expect(find_first_in_sorted([4, 4], 4)).toBe(0);
  });

  test("lida com array de dois elementos distintos buscando o segundo", () => {
    expect(find_first_in_sorted([2, 4], 4)).toBe(1);
  });

  test("lida com números negativos no array", () => {
    expect(find_first_in_sorted([-5, -3, -1, 0, 2], -3)).toBe(1);
  });

  test("encontra a primeira ocorrência com números negativos duplicados", () => {
    expect(find_first_in_sorted([-4, -4, -4, -2, -1], -4)).toBe(0);
  });
});