import { possible_change } from "../functions/possible_change";

describe("possible_change", () => {
  test("retorna 1 quando total é 0, independentemente das moedas", () => {
    expect(possible_change([1, 2, 5], 0)).toBe(1);
  });

  test("retorna 1 quando total é 0 e não há moedas", () => {
    expect(possible_change([], 0)).toBe(1);
  });

  test("retorna 0 quando total é negativo", () => {
    expect(possible_change([1, 2, 5], -1)).toBe(0);
  });

  test("retorna 0 quando não há moedas e total é positivo", () => {
    expect(possible_change([], 5)).toBe(0);
  });

  test("calcula corretamente para uma única moeda que divide exatamente o total", () => {
    expect(possible_change([1], 3)).toBe(1);
  });

  test("retorna 0 quando a única moeda não permite formar o total", () => {
    expect(possible_change([5], 3)).toBe(0);
  });

  test("calcula corretamente para moedas padrão de sistema monetário simples", () => {
    expect(possible_change([1, 2, 5], 5)).toBe(4);
  });

  test("calcula corretamente para caso clássico de troco de moedas", () => {
    expect(possible_change([1, 5, 10, 25], 25)).toBe(13);
  });

  test("calcula corretamente quando total é igual ao valor de uma das moedas", () => {
    expect(possible_change([2, 3], 3)).toBe(1);
  });

  test("calcula corretamente com moedas repetidas na lista", () => {
    expect(possible_change([1, 1, 2], 3)).toBe(3);
  });

  test("calcula corretamente para total pequeno com múltiplas moedas", () => {
    expect(possible_change([1, 2, 3], 4)).toBe(4);
  });

  test("retorna 0 quando todas as moedas são maiores que o total", () => {
    expect(possible_change([10, 20, 50], 5)).toBe(0);
  });

  test("calcula corretamente quando há apenas uma moeda igual a 1", () => {
    expect(possible_change([1], 10)).toBe(1);
  });

  test("calcula corretamente para conjunto de moedas com valor 0 incluso", () => {
    expect(possible_change([0, 1], 2)).toBe(1);
  });

  test("calcula corretamente para total maior com moedas variadas", () => {
    expect(possible_change([1, 2, 5, 10], 10)).toBe(10);
  });
});