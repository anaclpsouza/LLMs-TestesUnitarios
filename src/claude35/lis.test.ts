import { lis } from "../functions/lis";

describe("lis", () => {
  test("retorna 0 para array vazio", () => {
    expect(lis([])).toBe(0);
  });

  test("retorna 1 para array de um único elemento", () => {
    expect(lis([5])).toBe(1);
  });

  test("retorna o comprimento total para array estritamente crescente", () => {
    expect(lis([1, 2, 3, 4, 5])).toBe(5);
  });

  test("retorna 1 para array estritamente decrescente", () => {
    expect(lis([5, 4, 3, 2, 1])).toBe(1);
  });

  test("calcula corretamente para array com subsequência crescente clássica", () => {
    expect(lis([10, 9, 2, 5, 3, 7, 101, 18])).toBe(4);
  });

  test("retorna 1 quando todos os elementos são iguais", () => {
    expect(lis([7, 7, 7, 7, 7])).toBe(1);
  });

  test("calcula corretamente para array com elementos repetidos e crescentes", () => {
    expect(lis([1, 3, 3, 5, 5, 7])).toBe(4);
  });

  test("calcula corretamente para array com padrão em zigue-zague", () => {
    expect(lis([1, 5, 2, 6, 3, 7])).toBe(4);
  });

  test("calcula corretamente para array com números negativos", () => {
    expect(lis([-1, -2, -3, 0, 1, 2])).toBe(4);
  });

  test("calcula corretamente para array com dois elementos crescentes", () => {
    expect(lis([1, 2])).toBe(2);
  });

  test("calcula corretamente para array com dois elementos decrescentes", () => {
    expect(lis([2, 1])).toBe(1);
  });

  test("calcula corretamente para array com dois elementos iguais", () => {
    expect(lis([3, 3])).toBe(1);
  });

  test("calcula corretamente para array maior com múltiplas subsequências possíveis", () => {
    expect(lis([0, 8, 4, 12, 2, 10, 6, 14, 1, 9, 5, 13, 3, 11, 7, 15])).toBe(6);
  });

  test("calcula corretamente para array com um único pico", () => {
    expect(lis([1, 2, 3, 2, 1])).toBe(3);
  });

  test("calcula corretamente para array com valores mistos incluindo zero", () => {
    expect(lis([3, 0, 6, 1, 5, 8, 9, 4])).toBe(5);
  });
});