import { describe, expect, test } from '@jest/globals';
import { max_sublist_sum } from '../funcoes';

describe('max_sublist_sum', () => {
  describe('Casos positivos', () => {
    test('deve retornar 0 para array vazio', () => {
      expect(max_sublist_sum([])).toBe(0);
    });

    test('deve retornar o próprio valor para array com um único número positivo', () => {
      expect(max_sublist_sum([5])).toBe(5);
    });

    test('deve calcular corretamente a soma máxima para valores positivos consecutivos', () => {
      expect(max_sublist_sum([1, 2, 3, 4])).toBe(10);
    });

    test('deve calcular corretamente o exemplo clássico do algoritmo de Kadane', () => {
      expect(max_sublist_sum([-2, 1, -3, 4, -1, 2, 1, -5, 4])).toBe(6);
    });

    test('deve encontrar a melhor sublista no meio do array', () => {
      expect(max_sublist_sum([1, -2, 5, -1, 3])).toBe(7);
    });

    test('deve encontrar a melhor sublista no final do array', () => {
      expect(max_sublist_sum([-10, -5, 2, 4, 6])).toBe(12);
    });

    test('deve encontrar a melhor sublista no início do array', () => {
      expect(max_sublist_sum([10, 5, -20, 1, 2])).toBe(15);
    });

    test('deve acumular corretamente quando há zeros misturados', () => {
      expect(max_sublist_sum([0, 1, 2, 0, 3])).toBe(6);
    });
  });

  describe('Casos de borda', () => {
    test('deve retornar 0 quando todos os elementos forem negativos', () => {
      expect(max_sublist_sum([-1, -2, -3, -4])).toBe(0);
    });

    test('deve retornar 0 para array contendo apenas zero', () => {
      expect(max_sublist_sum([0])).toBe(0);
    });

    test('deve retornar 0 para array contendo apenas zeros', () => {
      expect(max_sublist_sum([0, 0, 0, 0])).toBe(0);
    });

    test('deve retornar o maior valor quando houver apenas um número positivo entre negativos', () => {
      expect(max_sublist_sum([-10, -5, 8, -20])).toBe(8);
    });

    test('deve reiniciar a soma acumulada quando ela se tornar negativa', () => {
      expect(max_sublist_sum([5, -10, 8])).toBe(8);
    });

    test('deve lidar corretamente com números decimais', () => {
      expect(max_sublist_sum([1.5, -0.5, 2.5, -1])).toBe(3.5);
    });

    test('deve lidar corretamente com Number.MAX_SAFE_INTEGER', () => {
      expect(
        max_sublist_sum([
          Number.MAX_SAFE_INTEGER,
          -1,
          1,
        ])
      ).toBe(Number.MAX_SAFE_INTEGER);
    });

    test('deve lidar corretamente com Number.MIN_SAFE_INTEGER', () => {
      expect(
        max_sublist_sum([
          Number.MIN_SAFE_INTEGER,
          10,
          20,
        ])
      ).toBe(30);
    });
  });

  describe('Entradas inválidas ou não tratadas explicitamente pela implementação', () => {
    test('deve lançar TypeError quando arr for null', () => {
      expect(() => max_sublist_sum(null as unknown as number[])).toThrow(TypeError);
    });

    test('deve lançar TypeError quando arr for undefined', () => {
      expect(() => max_sublist_sum(undefined as unknown as number[])).toThrow(TypeError);
    });

    test('deve lançar TypeError quando um objeto for passado', () => {
      expect(() => max_sublist_sum({} as unknown as number[])).toThrow(TypeError);
    });

    test('deve processar string em tempo de execução conforme comportamento do for...of', () => {
      expect(max_sublist_sum('123' as unknown as number[])).toBe(123);
    });

    test('deve retornar NaN quando o array contiver NaN', () => {
      expect(max_sublist_sum([1, Number.NaN, 3])).toBeNaN();
    });

    test('deve retornar Infinity quando a soma máxima resultar em Infinity', () => {
      expect(max_sublist_sum([1, Number.POSITIVE_INFINITY, 2])).toBe(Infinity);
    });

    test('deve retornar 0 quando contiver apenas -Infinity', () => {
      expect(max_sublist_sum([Number.NEGATIVE_INFINITY])).toBe(0);
    });
  });
});