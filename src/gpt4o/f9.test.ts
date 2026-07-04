import { describe, expect, test } from '@jest/globals';
import { bubblesort } from '../funcoes';

describe('bubblesort', () => {
  describe('Casos positivos', () => {
    test('deve ordenar um array já desordenado', () => {
      expect(bubblesort([5, 3, 8, 1, 2])).toEqual([1, 2, 3, 5, 8]);
    });

    test('deve manter um array já ordenado', () => {
      expect(bubblesort([1, 2, 3, 4, 5])).toEqual([1, 2, 3, 4, 5]);
    });

    test('deve ordenar um array em ordem decrescente', () => {
      expect(bubblesort([5, 4, 3, 2, 1])).toEqual([1, 2, 3, 4, 5]);
    });

    test('deve ordenar um array com números negativos', () => {
      expect(bubblesort([-3, 5, -1, 0, -2])).toEqual([-3, -2, -1, 0, 5]);
    });

    test('deve ordenar um array com números decimais', () => {
      expect(bubblesort([3.5, 1.2, 2.8, -0.5])).toEqual([-0.5, 1.2, 2.8, 3.5]);
    });

    test('deve ordenar um array contendo valores duplicados', () => {
      expect(bubblesort([4, 2, 4, 1, 2, 3])).toEqual([1, 2, 2, 3, 4, 4]);
    });

    test('deve ordenar corretamente valores extremos', () => {
      expect(
        bubblesort([
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
  });

  describe('Casos de borda', () => {
    test('deve retornar um array vazio', () => {
      expect(bubblesort([])).toEqual([]);
    });

    test('deve retornar o mesmo array para um único elemento', () => {
      expect(bubblesort([42])).toEqual([42]);
    });

    test('deve retornar corretamente um array contendo apenas elementos iguais', () => {
      expect(bubblesort([7, 7, 7, 7])).toEqual([7, 7, 7, 7]);
    });

    test('deve ordenar corretamente um array com dois elementos invertidos', () => {
      expect(bubblesort([2, 1])).toEqual([1, 2]);
    });

    test('deve modificar o próprio array (ordenação in-place)', () => {
      const arr = [3, 2, 1];
      const retorno = bubblesort(arr);

      expect(retorno).toBe(arr);
      expect(arr).toEqual([1, 2, 3]);
    });

    test('deve preservar NaN conforme comportamento do operador ">"', () => {
      const resultado = bubblesort([2, Number.NaN, 1]);

      expect(resultado).toHaveLength(3);
      expect(resultado[0]).toBe(2);
      expect(resultado[1]).toBeNaN();
      expect(resultado[2]).toBe(1);
    });

    test('deve ordenar corretamente valores Infinity e -Infinity', () => {
      expect(
        bubblesort([
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
  });

  describe('Entradas inválidas ou não tratadas explicitamente', () => {
    test('deve lançar TypeError quando o array for null', () => {
      expect(() => bubblesort(null as unknown as number[])).toThrow(TypeError);
    });

    test('deve lançar TypeError quando o array for undefined', () => {
      expect(() => bubblesort(undefined as unknown as number[])).toThrow(TypeError);
    });

    test('deve lançar TypeError quando um objeto for passado', () => {
      expect(() => bubblesort({} as unknown as number[])).toThrow(TypeError);
    });

    test('deve lançar TypeError quando um número for passado', () => {
      expect(() => bubblesort(123 as unknown as number[])).toThrow(TypeError);
    });

    test('deve ordenar uma string em tempo de execução conforme semântica do JavaScript', () => {
      expect(() => bubblesort('321' as unknown as number[])).toThrow(TypeError);
    });
  });
});