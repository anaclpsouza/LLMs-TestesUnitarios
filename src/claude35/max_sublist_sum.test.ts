import { max_sublist_sum } from "../functions/max_sublist_sum";

describe("max_sublist_sum", () => {
  test("retorna 0 para array vazio", () => {
    expect(max_sublist_sum([])).toBe(0);
  });

  test("retorna o próprio valor para array de um único elemento positivo", () => {
    expect(max_sublist_sum([5])).toBe(5);
  });

  test("retorna 0 para array de um único elemento negativo", () => {
    expect(max_sublist_sum([-5])).toBe(0);
  });

  test("retorna 0 para array de um único elemento igual a zero", () => {
    expect(max_sublist_sum([0])).toBe(0);
  });

  test("retorna a soma total para array com todos os elementos positivos", () => {
    expect(max_sublist_sum([1, 2, 3, 4])).toBe(10);
  });

  test("retorna 0 para array com todos os elementos negativos", () => {
    expect(max_sublist_sum([-1, -2, -3, -4])).toBe(0);
  });

  test("calcula corretamente para array com valores mistos (caso clássico)", () => {
    expect(max_sublist_sum([-2, 1, -3, 4, -1, 2, 1, -5, 4])).toBe(6);
  });

  test("calcula corretamente quando a sublista máxima está no início", () => {
    expect(max_sublist_sum([5, 4, -10, 1, 1])).toBe(9);
  });

  test("calcula corretamente quando a sublista máxima está no final", () => {
    expect(max_sublist_sum([-10, 1, 1, 5, 4])).toBe(10);
  });

  test("calcula corretamente quando a sublista máxima está no meio", () => {
    expect(max_sublist_sum([-5, 3, 4, -1, -10])).toBe(7);
  });

  test("retorna 0 quando array contém apenas zeros", () => {
    expect(max_sublist_sum([0, 0, 0])).toBe(0);
  });

  test("calcula corretamente para array com zeros intercalados com positivos e negativos", () => {
    expect(max_sublist_sum([0, -1, 0, 2, 0, -1, 3, 0])).toBe(5);
  });

  test("calcula corretamente para array com um único valor positivo grande cercado de negativos", () => {
    expect(max_sublist_sum([-1, -2, 100, -3, -4])).toBe(100);
  });

  test("calcula corretamente para array alternando entre positivo e negativo", () => {
    expect(max_sublist_sum([3, -1, 3, -1, 3])).toBe(7);
  });

  test("calcula corretamente para array grande com múltiplas sublistas candidatas", () => {
    expect(max_sublist_sum([2, -1, 2, 3, -9, 5, 6, -1, 2])).toBe(12);
  });
});