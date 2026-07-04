import { describe, expect, test } from '@jest/globals';
import { next_permutation } from '../funcoes';

describe('next_permutation', () => {
  describe('Casos positivos', () => {
    test('deve retornar a próxima permutação para um array simples', () => {
      expect(next_permutation([1, 2, 3])).toEqual([1, 3, 2]);
    });

    test('deve encontrar a próxima permutação quando a troca ocorre no início', () => {
      expect(next_permutation([1, 3, 2])).toEqual([2, 1, 3]);
    });

    test('deve encontrar a próxima permutação quando a troca ocorre no meio', () => {
      expect(next_permutation([2, 1, 3])).toEqual([2, 3, 1]);
    });

    test('deve funcionar para arrays com dois elementos', () => {
      expect(next_permutation([1, 2])).toEqual([2, 1]);
    });

    test('deve funcionar para números negativos', () => {
      expect(next_permutation([-2, -1, 0])).toEqual([-2, 0, -1]);
    });

    test('deve funcionar com números decimais', () => {
      expect(next_permutation([1.1, 2.2, 3.3])).toEqual([1.1, 3.3, 2.2]);
    });

    test('deve funcionar com elementos duplicados', () => {
      expect(next_permutation([1, 1, 2])).toEqual([1, 2, 1]);
    });

    test('deve funcionar com Number.MAX_SAFE_INTEGER', () => {
      expect(
        next_permutation([1, Number.MAX_SAFE_INTEGER, 2])
      ).toEqual([2, 1, Number.MAX_SAFE_INTEGER]);
    });
  });

  describe('Casos de borda', () => {
    test('deve retornar array vazio quando não existir próxima permutação', () => {
      expect(next_permutation([3, 2, 1])).toEqual([]);
    });

    test('deve retornar array vazio para array com um único elemento', () => {
      expect(next_permutation([1])).toEqual([]);
    });

    test('deve retornar array vazio para array vazio', () => {
      expect(next_permutation([])).toEqual([]);
    });

    test('deve retornar array vazio quando todos os elementos forem iguais', () => {
      expect(next_permutation([5, 5, 5])).toEqual([]);
    });

    test('deve modificar o array original antes de retornar o resultado', () => {
      const arr = [1, 2, 3];

      const result = next_permutation(arr);

      expect(result).toEqual([1, 3, 2]);
      expect(arr).toEqual([1, 3, 2]);
    });

    test('deve preservar Infinity na ordenação', () => {
      expect(
        next_permutation([1, 2, Number.POSITIVE_INFINITY])
      ).toEqual([1, Number.POSITIVE_INFINITY, 2]);
    });
  });

  describe('Entradas inválidas ou não tratadas explicitamente', () => {
    test('deve lançar TypeError quando o array for null', () => {
      expect(() =>
        next_permutation(null as unknown as number[])
      ).toThrow(TypeError);
    });

    test('deve lançar TypeError quando o array for undefined', () => {
      expect(() =>
        next_permutation(undefined as unknown as number[])
      ).toThrow(TypeError);
    });

    test('deve lançar TypeError quando o array for um objeto', () => {
      expect(() =>
        next_permutation({} as unknown as number[])
      ).toThrow(TypeError);
    });

    test('deve lançar TypeError quando o array for um número', () => {
      expect(() =>
        next_permutation(123 as unknown as number[])
      ).toThrow(TypeError);
    });

    test('deve lançar TypeError quando o array for uma string', () => {
      expect(() =>
        next_permutation('123' as unknown as number[])
      ).toThrow(TypeError);
    });

    test('deve lidar com NaN conforme as comparações do JavaScript', () => {
      expect(next_permutation([1, Number.NaN, 2])).toEqual([]);
    });
  });
});