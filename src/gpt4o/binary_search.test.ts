import { describe, expect, test } from '@jest/globals';
import { binary_search } from '../funcoes';

describe('binary_search', () => {
  describe('Casos positivos', () => {
    test('deve encontrar um elemento localizado no meio do array', () => {
      expect(binary_search([1, 2, 3, 4, 5], 3)).toBe(2);
    });

    test('deve encontrar o primeiro elemento', () => {
      expect(binary_search([10, 20, 30, 40], 10)).toBe(0);
    });

    test('deve encontrar o último elemento', () => {
      expect(binary_search([10, 20, 30, 40], 40)).toBe(3);
    });

    test('deve encontrar um elemento em array com apenas um item', () => {
      expect(binary_search([7], 7)).toBe(0);
    });

    test('deve encontrar números negativos', () => {
      expect(binary_search([-10, -5, -2, 0, 8], -5)).toBe(1);
    });

    test('deve encontrar números decimais', () => {
      expect(binary_search([1.1, 2.2, 3.3, 4.4], 3.3)).toBe(2);
    });

    test('deve encontrar Number.MAX_SAFE_INTEGER', () => {
      expect(
        binary_search(
          [1, 100, Number.MAX_SAFE_INTEGER],
          Number.MAX_SAFE_INTEGER
        )
      ).toBe(2);
    });

    test('deve encontrar Number.MIN_SAFE_INTEGER', () => {
      expect(
        binary_search(
          [Number.MIN_SAFE_INTEGER, -1, 0, 1],
          Number.MIN_SAFE_INTEGER
        )
      ).toBe(0);
    });
  });

  describe('Casos negativos', () => {
    test('deve retornar -1 quando o elemento não existir', () => {
      expect(binary_search([1, 2, 3, 4, 5], 6)).toBe(-1);
    });

    test('deve retornar -1 para array vazio', () => {
      expect(binary_search([], 10)).toBe(-1);
    });

    test('deve retornar -1 para array com um único elemento diferente', () => {
      expect(binary_search([5], 10)).toBe(-1);
    });

    test('deve retornar -1 quando o valor procurado for menor que todos os elementos', () => {
      expect(binary_search([10, 20, 30], 5)).toBe(-1);
    });

    test('deve retornar -1 quando o valor procurado for maior que todos os elementos', () => {
      expect(binary_search([10, 20, 30], 40)).toBe(-1);
    });
  });

  describe('Casos de borda', () => {
    test('deve retornar um índice válido para arrays com elementos duplicados', () => {
      const arr = [1, 2, 2, 2, 3];
      const index = binary_search(arr, 2);

      expect(index).toBeGreaterThanOrEqual(1);
      expect(index).toBeLessThanOrEqual(3);
      expect(arr[index]).toBe(2);
    });

    test('deve localizar corretamente o elemento em array de dois elementos', () => {
      expect(binary_search([5, 10], 10)).toBe(1);
    });

    test('deve retornar -1 quando procurar NaN', () => {
      expect(binary_search([1, 2, 3], Number.NaN)).toBe(-1);
    });

    test('deve retornar -1 quando o array contiver NaN', () => {
      expect(binary_search([1, Number.NaN, 3], 3)).toBe(-1);
    });

    test('deve encontrar Infinity', () => {
      expect(binary_search([1, 2, Number.POSITIVE_INFINITY], Number.POSITIVE_INFINITY)).toBe(2);
    });
  });

  describe('Entradas inválidas ou não tratadas explicitamente', () => {
    test('deve lançar TypeError quando o array for null', () => {
      expect(() => binary_search(null as unknown as number[], 1)).toThrow(TypeError);
    });

    test('deve lançar TypeError quando o array for undefined', () => {
      expect(() => binary_search(undefined as unknown as number[], 1)).toThrow(TypeError);
    });

    test('deve lançar TypeError quando o array for um objeto', () => {
      expect(() => binary_search({} as unknown as number[], 1)).toThrow(TypeError);
    });

    test('deve lançar TypeError quando o array for um número', () => {
      expect(() => binary_search(123 as unknown as number[], 1)).toThrow(TypeError);
    });

    test('deve funcionar com string em tempo de execução conforme acesso indexado', () => {
      expect(binary_search('12345' as unknown as number[], 51 as unknown as number)).toBe(4);
    });
  });
});