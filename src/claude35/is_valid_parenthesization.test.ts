import { is_valid_parenthesization } from "../functions/is_valid_parenthesization";

describe("is_valid_parenthesization", () => {
  test("retorna true para string vazia", () => {
    expect(is_valid_parenthesization("")).toBe(true);
  });

  test("retorna true para par simples balanceado", () => {
    expect(is_valid_parenthesization("()")).toBe(true);
  });

  test("retorna false para parêntese de abertura único", () => {
    expect(is_valid_parenthesization("(")).toBe(false);
  });

  test("retorna false para parêntese de fechamento único", () => {
    expect(is_valid_parenthesization(")")).toBe(false);
  });

  test("retorna true para parênteses aninhados balanceados", () => {
    expect(is_valid_parenthesization("(())")).toBe(true);
  });

  test("retorna true para parênteses sequenciais balanceados", () => {
    expect(is_valid_parenthesization("()()")).toBe(true);
  });

  test("retorna true para combinação complexa balanceada", () => {
    expect(is_valid_parenthesization("(()())")).toBe(true);
  });

  test("retorna false quando fechamento ocorre antes de abertura correspondente", () => {
    expect(is_valid_parenthesization(")(")).toBe(false);
  });

  test("retorna false para mais aberturas que fechamentos", () => {
    expect(is_valid_parenthesization("((()")).toBe(false);
  });

  test("retorna false para mais fechamentos que aberturas", () => {
    expect(is_valid_parenthesization("()))")).toBe(false);
  });

  test("retorna false quando profundidade fica negativa no meio da string", () => {
    expect(is_valid_parenthesization("())(")).toBe(false);
  });

  test("retorna true para múltiplos níveis de aninhamento balanceados", () => {
    expect(is_valid_parenthesization("((()))")).toBe(true);
  });

  test("retorna false para string com apenas fechamentos", () => {
    expect(is_valid_parenthesization(")))")).toBe(false);
  });

  test("retorna false para string com apenas aberturas", () => {
    expect(is_valid_parenthesization("(((")).toBe(false);
  });

  test("retorna true para sequência longa balanceada complexa", () => {
    expect(is_valid_parenthesization("(()(()))()")).toBe(true);
  });

  test("retorna false para sequência longa desbalanceada", () => {
    expect(is_valid_parenthesization("(()(())))(")).toBe(false);
  });
});