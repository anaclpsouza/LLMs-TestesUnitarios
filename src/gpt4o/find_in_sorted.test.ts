import { describe, expect, test } from '@jest/globals';
import { find_in_sorted } from '../funcoes';

describe('find_in_sorted', () => {
  describe('Casos positivos', () => {
    test('deve encontrar um elemento localizado no meio do array', () => {
      expect(find_in_sorted([1, 2, 3, 4, 5], 3)).toBe(2);
    });

    test('deve encontrar o primeiro elemento', () => {
      expect(find_in_sorted([10, 20, 30, 40], 10)).toBe(0);
    });

    test('deve encontrar o último elemento', () => {
      expect(find_in_sorted([10, 20, 30, 40], 40)).toBe(3);
    });

    test('deve encontrar um elemento em um array de tamanho 1', () => {
      expect(find_in_sorted([7], 7)).toBe(0);
    });

    test('deve encontrar números negativos', () => {
      expect(find_in_sorted([-10, -5, -2, 0, 8], -2)).toBe(2);
    });

    test('deve encontrar números decimais', () => {
      expect(find_in_sorted([1.1, 2.2, 3.3, 4.4], 2.2)).toBe(1);
    });

    test('deve encontrar Number.MAX_SAFE_INTEGER', () => {
      expect(
        find_in_sorted(
          [1, 10, Number.MAX_SAFE_INTEGER],
          Number.MAX_SAFE_INTEGER
        )
      ).toBe(2);
    });

    test('deve encontrar Number.MIN_SAFE_INTEGER', () => {
      expect(
        find_in_sorted(
          [Number.MIN_SAFE_INTEGER, -1, 0, 1],
          Number.MIN_SAFE_INTEGER
        )
      ).toBe(0);
    });
  });

  describe('Casos negativos', () => {
    test('deve retornar -1 quando o elemento não existir', () => {
      expect(find_in_sorted([1, 2, 3, 4, 5], 6)).toBe(-1);
    });

    test('deve retornar -1 para array vazio', () => {
      expect(find_in_sorted([], 10)).toBe(-1);
    });

    test('deve retornar -1 para array com um único elemento diferente', () => {
      expect(find_in_sorted([5], 10)).toBe(-1);
    });

    test('deve retornar -1 quando o valor for menor que todos os elementos', () => {
      expect(find_in_sorted([10, 20, 30], 5)).toBe(-1);
    });

    test('deve retornar -1 quando o valor for maior que todos os elementos', () => {
      expect(find_in_sorted([10, 20, 30], 40)).toBe(-1);
    });
  });

  describe('Casos de borda', () => {
    test('deve retornar um índice válido quando houver elementos duplicados', () => {
      const arr = [1, 2, 2, 2, 3];
      const index = find_in_sorted(arr, 2);

      expect(index).toBeGreaterThanOrEqual(1);
      expect(index).toBeLessThanOrEqual(3);
      expect(arr[index]).toBe(2);
    });

    test('deve localizar corretamente em um array de dois elementos', () => {
      expect(find_in_sorted([5, 10], 10)).toBe(1);
    });

    test('deve retornar -1 ao procurar NaN', () => {
      expect(find_in_sorted([1, 2, 3], Number.NaN)).toBe(-1);
    });

    test('deve retornar -1 quando o array contiver NaN', () => {
      expect(find_in_sorted([1, Number.NaN, 3], 3)).toBe(-1);
    });

    test('deve encontrar Infinity', () => {
      expect(
        find_in_sorted(
          [1, 2, Number.POSITIVE_INFINITY],
          Number.POSITIVE_INFINITY
        )
      ).toBe(2);
    });
  });

  describe('Entradas inválidas ou não tratadas explicitamente', () => {
    test('deve lançar TypeError quando o array for null', () => {
      expect(() =>
        find_in_sorted(null as unknown as number[], 1)
      ).toThrow(TypeError);
    });

    test('deve lançar TypeError quando o array for undefined', () => {
      expect(() =>
        find_in_sorted(undefined as unknown as number[], 1)
      ).toThrow(TypeError);
    });

    test('deve lançar TypeError quando o array for um objeto', () => {
      expect(() =>
        find_in_sorted({} as unknown as number[], 1)
      ).toThrow(TypeError);
    });

    test('deve lançar TypeError quando o array for um número', () => {
      expect(() =>
        find_in_sorted(123 as unknown as number[], 1)
      ).toThrow(TypeError);
    });

    test('deve funcionar com string em tempo de execução conforme acesso indexado', () => {
      expect(
        find_in_sorted(
          '12345' as unknown as number[],
          51 as unknown as number
        )
      ).toBe(4);
    });
  });
});