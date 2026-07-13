import { flatten } from "../functions/flatten";

describe("flatten", () => {
  test("retorna vazio para array vazio", () => {
    expect([...flatten([])]).toEqual([]);
  });

  test("achata array plano sem elementos aninhados", () => {
    expect([...flatten([1, 2, 3])]).toEqual([1, 2, 3]);
  });

  test("achata array com um nível de aninhamento", () => {
    expect([...flatten([1, [2, 3], 4])]).toEqual([1, 2, 3, 4]);
  });

  test("achata array com múltiplos níveis de aninhamento", () => {
    expect([...flatten([1, [2, [3, [4, 5]], 6], 7])]).toEqual([
      1, 2, 3, 4, 5, 6, 7,
    ]);
  });

  test("achata array contendo apenas arrays aninhados vazios", () => {
    expect([...flatten([[], [], []])]).toEqual([]);
  });

  test("achata array com arrays vazios misturados a valores", () => {
    expect([...flatten([1, [], 2, [], 3])]).toEqual([1, 2, 3]);
  });

  test("achata array profundamente aninhado com um único elemento", () => {
    expect([...flatten([[[[[42]]]]])]).toEqual([42]);
  });

  test("achata array contendo strings", () => {
    expect([...flatten(["a", ["b", "c"], "d"])]).toEqual(["a", "b", "c", "d"]);
  });

  test("achata array contendo valores mistos de tipos diferentes", () => {
    expect([...flatten([1, "a", [true, [null, undefined]], 2])]).toEqual([
      1,
      "a",
      true,
      null,
      undefined,
      2,
    ]);
  });

  test("achata array contendo objetos sem desmontá-los", () => {
    const obj = { a: 1 };
    expect([...flatten([obj, [1, 2]])]).toEqual([obj, 1, 2]);
  });

  test("achata array com elemento único não-array", () => {
    expect([...flatten([5])]).toEqual([5]);
  });

  test("achata array aninhado com arrays vazios intercalados em profundidade", () => {
    expect([...flatten([1, [[], [2, []], 3]])]).toEqual([1, 2, 3]);
  });

  test("preserva a ordem dos elementos após achatamento", () => {
    expect([...flatten([[3, 2], [1], [0]])]).toEqual([3, 2, 1, 0]);
  });

  test("retorna um iterável que pode ser convertido em array via Array.from", () => {
    expect(Array.from(flatten([1, [2, 3]]))).toEqual([1, 2, 3]);
  });

  test("é iterável manualmente via next()", () => {
    const gen = flatten([1, [2, 3]]);
    expect(gen.next()).toEqual({ value: 1, done: false });
    expect(gen.next()).toEqual({ value: 2, done: false });
    expect(gen.next()).toEqual({ value: 3, done: false });
    expect(gen.next()).toEqual({ value: undefined, done: true });
  });
});