import { next_palindrome } from "../functions/next_palindrome";

describe("next_palindrome", () => {
  test("incrementa dígito central para lista de um único dígito sem overflow", () => {
    expect(next_palindrome([1])).toEqual([2]);
  });

  test("retorna overflow para lista de um único dígito igual a 9", () => {
    expect(next_palindrome([9])).toEqual([1, 1]);
  });

  test("incrementa par central para lista de dois dígitos sem overflow", () => {
    expect(next_palindrome([1, 1])).toEqual([2, 2]);
  });

  test("retorna overflow para lista de dois dígitos todos iguais a 9", () => {
    expect(next_palindrome([9, 9])).toEqual([1, 0, 1]);
  });

  test("incrementa dígito central para lista de três dígitos ímpar sem overflow", () => {
    expect(next_palindrome([1, 2, 1])).toEqual([1, 3, 1]);
  });

  test("propaga carry quando dígito central é 9 em lista de três dígitos", () => {
    expect(next_palindrome([1, 9, 1])).toEqual([2, 0, 2]);
  });

  test("retorna overflow para lista de três dígitos todos iguais a 9", () => {
    expect(next_palindrome([9, 9, 9])).toEqual([1, 0, 0, 1]);
  });

  test("incrementa par central para lista de quatro dígitos sem overflow", () => {
    expect(next_palindrome([1, 2, 2, 1])).toEqual([1, 3, 3, 1]);
  });

  test("propaga carry através de múltiplos 9s em lista de quatro dígitos", () => {
    expect(next_palindrome([1, 9, 9, 1])).toEqual([2, 0, 0, 2]);
  });

  test("retorna overflow para lista de quatro dígitos todos iguais a 9", () => {
    expect(next_palindrome([9, 9, 9, 9])).toEqual([1, 0, 0, 0, 1]);
  });

  test("propaga carry parcialmente através de dígitos 9 em lista maior", () => {
    expect(next_palindrome([1, 2, 9, 9, 2, 1])).toEqual([1, 3, 0, 0, 3, 1]);
  });

  test("incrementa sem carry em lista maior com dígitos não-9", () => {
    expect(next_palindrome([1, 2, 3, 3, 2, 1])).toEqual([1, 2, 4, 4, 2, 1]);
  });

  test("lida com carry que se propaga até o primeiro par de dígitos", () => {
    expect(next_palindrome([1, 9, 9, 9, 9, 1])).toEqual([2, 0, 0, 0, 0, 2]);
  });

  test("retorna overflow para lista longa de todos os dígitos iguais a 9", () => {
    expect(next_palindrome([9, 9, 9, 9, 9])).toEqual([1, 0, 0, 0, 0, 1]);
  });

  test("incrementa corretamente lista de cinco dígitos com dígito central não-9", () => {
    expect(next_palindrome([1, 2, 3, 2, 1])).toEqual([1, 2, 4, 2, 1]);
  });

  test("lida com carry que envolve apenas parte da lista longa", () => {
    expect(next_palindrome([2, 3, 4, 9, 4, 3, 2])).toEqual([2, 3, 5, 0, 5, 3, 2]);
  });
});