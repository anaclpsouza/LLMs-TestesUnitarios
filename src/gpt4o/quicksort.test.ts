import { describe, expect, test } from '@jest/globals';
import { quicksort } from '../funcoes';

describe('quicksort', () => {
  describe('Casos positivos', () => {
    test('deve retornar um array vazio quando a entrada for vazia', () => {
      expect(quicksort([])).toEqual([]);
    });

    test('deve ordenar um array com um único elemento', () => {
      expect(quicksort([42])).toEqual([42]);
    });

    test('deve ordenar um array já ordenado', () => {
      expect(quicksort([1, 2, 3, 4, 5])).toEqual([1, 2, 3, 4, 5]);
    });

    test('deve ordenar um array em ordem decrescente', () => {
      expect(quicksort([5, 4, 3, 2, 1])).toEqual([1, 2, 3, 4, 5]);
    });

    test('deve ordenar um array com valores aleatórios', () => {
      expect(quicksort([3, 1, 4, 1, 5, 9, 2, 6])).toEqual([1, 1, 2, 3, 4, 5, 6, 9]);
    });

    test('deve ordenar números negativos e positivos', () => {
      expect(quicksort([-5, 3, -1, 0, 2])).toEqual([-5, -1, 0, 2, 3]);
    });

    test('deve ordenar números decimais', () => {
      expect(quicksort([3.5, 1.2, -0.5, 2.8])).toEqual([-0.5, 1.2, 2.8, 3.5]);
    });

    test('deve manter elementos duplicados', () => {
      expect(quicksort([4, 2, 4, 1, 2, 3])).toEqual([1, 2, 2, 3, 4, 4]);
    });
  });

  describe('Casos de borda', () => {
    test('deve retornar um novo array, sem modificar o original', () => {
      const original = [3, 2, 1];
      const copia = [...original];

      const resultado = quicksort(original);

      expect(resultado).toEqual([1, 2, 3]);
      expect(original).toEqual(copia);
      expect(resultado).not.toBe(original);
    });

    test('deve ordenar corretamente Number.MAX_SAFE_INTEGER e Number.MIN_SAFE_INTEGER', () => {
      expect(
        quicksort([
          Number.MAX_SAFE_INTEGER,
          0,
          Number.MIN_SAFE_INTEGER,
          -1,
          1,
        ])
      ).toEqual([
        Number.MIN_SAFE_INTEGER,
        -1,
        0,
        1,
        Number.MAX_SAFE_INTEGER,
      ]);
    });

    test('deve ordenar corretamente valores Infinity e -Infinity', () => {
      expect(
        quicksort([
          Number.POSITIVE_INFINITY,
          5,
          Number.NEGATIVE_INFINITY,
          0,
        ])
      ).toEqual([
        Number.NEGATIVE_INFINITY,
        0,
        5,
        Number.POSITIVE_INFINITY,
      ]);
    });

    test('deve preservar NaN conforme comportamento das comparações do JavaScript', () => {
      const resultado = quicksort([2, Number.NaN, 1]);

      expect(resultado).toHaveLength(3);
      expect(resultado[0]).toBe(1);
      expect(resultado[1]).toBe(2);
      expect(resultado[2]).toBeNaN();
    });
  });

  describe('Entradas inválidas ou não tratadas explicitamente', () => {
    test('deve lançar TypeError quando o array for null', () => {
      expect(() => quicksort(null as unknown as number[])).toThrow(TypeError);
    });

    test('deve lançar TypeError quando o array for undefined', () => {
      expect(() => quicksort(undefined as unknown as number[])).toThrow(TypeError);
    });

    test('deve lançar TypeError quando o argumento for um objeto', () => {
      expect(() => quicksort({} as unknown as number[])).toThrow(TypeError);
    });

    test('deve lançar TypeError quando o argumento for um número', () => {
      expect(() => quicksort(123 as unknown as number[])).toThrow(TypeError);
    });

    test('deve lançar TypeError quando o argumento for uma string', () => {
      expect(() => quicksort('123' as unknown as number[])).toThrow(TypeError);
    });
  });
});