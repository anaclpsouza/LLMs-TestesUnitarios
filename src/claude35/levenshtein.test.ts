import { levenshtein } from "../functions/levenshtein";

describe("levenshtein", () => {
  test("retorna 0 quando ambas as strings são vazias", () => {
    expect(levenshtein("", "")).toBe(0);
  });

  test("retorna o comprimento de target quando source é vazio", () => {
    expect(levenshtein("", "abc")).toBe(3);
  });

  test("retorna o comprimento de source quando target é vazio", () => {
    expect(levenshtein("abc", "")).toBe(3);
  });

  test("retorna 0 para strings idênticas", () => {
    expect(levenshtein("kitten", "kitten")).toBe(0);
  });

  test("calcula distância para strings de um único caractere iguais", () => {
    expect(levenshtein("a", "a")).toBe(0);
  });

  test("calcula distância para strings de um único caractere diferentes", () => {
    expect(levenshtein("a", "b")).toBe(1);
  });

  test("calcula distância clássica entre 'kitten' e 'sitting'", () => {
    expect(levenshtein("kitten", "sitting")).toBe(3);
  });

  test("calcula distância quando uma string é prefixo da outra", () => {
    expect(levenshtein("test", "testing")).toBe(3);
  });

  test("calcula distância para substituição única no meio", () => {
    expect(levenshtein("cat", "cot")).toBe(1);
  });

  test("calcula distância para inserção única", () => {
    expect(levenshtein("cat", "cats")).toBe(1);
  });

  test("calcula distância para remoção única", () => {
    expect(levenshtein("cats", "cat")).toBe(1);
  });

  test("calcula distância para strings completamente diferentes", () => {
    expect(levenshtein("abc", "xyz")).toBe(3);
  });

  test("calcula distância entre 'flaw' e 'lawn'", () => {
    expect(levenshtein("flaw", "lawn")).toBe(2);
  });

  test("calcula distância entre strings com caracteres repetidos", () => {
    expect(levenshtein("aaaa", "aa")).toBe(2);
  });

  test("calcula distância entre strings de mesmo comprimento totalmente distintas", () => {
    expect(levenshtein("abcd", "wxyz")).toBe(4);
  });

  test("calcula distância entre strings anagram-like", () => {
    expect(levenshtein("abc", "bca")).toBe(2);
  });
});