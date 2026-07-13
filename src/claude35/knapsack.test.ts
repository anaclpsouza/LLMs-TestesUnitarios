import { knapsack } from "../functions/knapsack";

describe("knapsack", () => {
  test("retorna 0 quando não há itens", () => {
    expect(knapsack(10, [])).toBe(0);
  });

  test("retorna 0 quando a capacidade é 0", () => {
    expect(knapsack(0, [[2, 3], [3, 4]])).toBe(0);
  });

  test("retorna 0 quando capacidade é 0 e não há itens", () => {
    expect(knapsack(0, [])).toBe(0);
  });

  test("inclui um único item quando cabe na capacidade", () => {
    expect(knapsack(5, [[3, 10]])).toBe(10);
  });

  test("não inclui item quando seu peso excede a capacidade", () => {
    expect(knapsack(2, [[3, 10]])).toBe(0);
  });

  test("inclui item exatamente do tamanho da capacidade", () => {
    expect(knapsack(5, [[5, 20]])).toBe(20);
  });

  test("escolhe o melhor entre dois itens quando apenas um cabe", () => {
    expect(knapsack(4, [[5, 10], [4, 8]])).toBe(8);
  });

  test("combina múltiplos itens para maximizar valor dentro da capacidade", () => {
    expect(
      knapsack(50, [
        [10, 60],
        [20, 100],
        [30, 120],
      ])
    ).toBe(220);
  });

  test("caso clássico de mochila 0/1 com solução conhecida", () => {
    expect(
      knapsack(
        10,
        [
          [1, 1],
          [3, 4],
          [4, 5],
          [5, 7],
        ]
      )
    ).toBe(9);
  });

  test("lida com itens de valor zero", () => {
    expect(knapsack(10, [[5, 0], [3, 0]])).toBe(0);
  });

  test("lida com item de peso zero, sempre incluído", () => {
    expect(knapsack(5, [[0, 10], [3, 4]])).toBe(14);
  });

  test("lida com múltiplos itens de peso zero", () => {
    expect(knapsack(5, [[0, 5], [0, 3], [2, 4]])).toBe(12);
  });

  test("seleciona subconjunto ótimo entre itens de mesmo peso", () => {
    expect(
      knapsack(6, [
        [2, 3],
        [2, 5],
        [2, 4],
      ])
    ).toBe(12);
  });

  test("lida com capacidade grande e único item pequeno", () => {
    expect(knapsack(100, [[1, 5]])).toBe(5);
  });

  test("não excede a capacidade mesmo com itens de alto valor", () => {
    expect(
      knapsack(1, [
        [2, 100],
        [3, 150],
      ])
    ).toBe(0);
  });

  test("lida com muitos itens pequenos preenchendo a capacidade exatamente", () => {
    expect(
      knapsack(5, [
        [1, 1],
        [1, 1],
        [1, 1],
        [1, 1],
        [1, 1],
      ])
    ).toBe(5);
  });
});