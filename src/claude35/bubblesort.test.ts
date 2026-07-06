import { describe, expect, test } from '@jest/globals';
import { bubblesort } from '../funcoes';

describe('bubblesort', () => {
  describe('Caminho Feliz (Fluxos Positivos)', () => {
    test('deve ordenar array de inteiros positivos desordenados', () => {
      expect(bubblesort([5, 3, 1, 4, 2])).toEqual([1, 2, 3, 4, 5]);
    });

    test('deve ordenar array em ordem decrescente para crescente', () => {
      expect(bubblesort([5, 4, 3, 2, 1])).toEqual([1, 2, 3, 4, 5]);
    });

    test('deve retornar o mesmo array já ordenado sem alterações', () => {
      expect(bubblesort([1, 2, 3, 4, 5])).toEqual([1, 2, 3, 4, 5]);
    });

    test('deve ordenar array com dois elementos fora de ordem', () => {
      expect(bubblesort([2, 1])).toEqual([1, 2]);
    });

    test('deve retornar array de dois elementos já ordenados', () => {
      expect(bubblesort([1, 2])).toEqual([1, 2]);
    });

    test('deve ordenar array com números negativos', () => {
      expect(bubblesort([-3, -1, -4, -2, -5])).toEqual([-5, -4, -3, -2, -1]);
    });

    test('deve ordenar array com mistura de negativos e positivos', () => {
      expect(bubblesort([-3, 5, -1, 0, 3, -2])).toEqual([-3, -2, -1, 0, 3, 5]);
    });

    test('deve ordenar array com zeros e positivos', () => {
      expect(bubblesort([3, 0, 1, 0, 2])).toEqual([0, 0, 1, 2, 3]);
    });

    test('deve ordenar array com números decimais', () => {
      expect(bubblesort([3.5, 1.1, 2.9, 0.5])).toEqual([0.5, 1.1, 2.9, 3.5]);
    });

    test('deve ordenar array com valores repetidos', () => {
      expect(bubblesort([3, 1, 2, 1, 3])).toEqual([1, 1, 2, 3, 3]);
    });

    test('deve ordenar array com todos os elementos iguais', () => {
      expect(bubblesort([7, 7, 7, 7])).toEqual([7, 7, 7, 7]);
    });

    test('deve ordenar array com Number.MAX_SAFE_INTEGER e Number.MIN_SAFE_INTEGER', () => {
      expect(
        bubblesort([Number.MAX_SAFE_INTEGER, 0, Number.MIN_SAFE_INTEGER])
      ).toEqual([Number.MIN_SAFE_INTEGER, 0, Number.MAX_SAFE_INTEGER]);
    });

    test('deve ordenar array longo corretamente', () => {
      const arr = Array.from({ length: 100 }, (_, i) => 100 - i);
      const expected = Array.from({ length: 100 }, (_, i) => i + 1);
      expect(bubblesort(arr)).toEqual(expected);
    });

    test('deve ordenar array com Infinity e -Infinity', () => {
      expect(bubblesort([Infinity, 0, -Infinity, 5])).toEqual([
        -Infinity, 0, 5, Infinity,
      ]);
    });

    test('deve ordenar array com valores negativos e zero', () => {
      expect(bubblesort([-5, 0, -1, -3])).toEqual([-5, -3, -1, 0]);
    });

    test('deve ordenar array com três elementos em ordem aleatória', () => {
      expect(bubblesort([3, 1, 2])).toEqual([1, 2, 3]);
    });

    test('deve ordenar array onde apenas o primeiro elemento está fora de lugar', () => {
      expect(bubblesort([5, 1, 2, 3, 4])).toEqual([1, 2, 3, 4, 5]);
    });

    test('deve ordenar array onde apenas o último elemento está fora de lugar', () => {
      expect(bubblesort([1, 2, 3, 4, 0])).toEqual([0, 1, 2, 3, 4]);
    });
  });

  describe('Casos de Borda (Edge Cases)', () => {
    test('deve retornar array vazio para array vazio', () => {
      expect(bubblesort([])).toEqual([]);
    });

    test('deve retornar o mesmo array para array de um único elemento', () => {
      expect(bubblesort([42])).toEqual([42]);
    });

    test('deve retornar o mesmo array para array de um único elemento negativo', () => {
      expect(bubblesort([-7])).toEqual([-7]);
    });

    test('deve retornar o mesmo array para array de um único zero', () => {
      expect(bubblesort([0])).toEqual([0]);
    });

    test('deve ordenar array com todos os zeros', () => {
      expect(bubblesort([0, 0, 0])).toEqual([0, 0, 0]);
    });

    test('deve lidar corretamente com NaN no array (comportamento definido pelo JS)', () => {
      const result = bubblesort([3, NaN, 1]);
      expect(result).toHaveLength(3);
      expect(result).toContain(1);
      expect(result).toContain(3);
    });

    test('deve ordenar array de dois zeros', () => {
      expect(bubblesort([0, 0])).toEqual([0, 0]);
    });

    test('deve ordenar array de dois elementos negativos', () => {
      expect(bubblesort([-1, -5])).toEqual([-5, -1]);
    });

    test('deve ordenar array com Number.MAX_SAFE_INTEGER duplicado', () => {
      expect(
        bubblesort([Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER])
      ).toEqual([Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER]);
    });

    test('deve ordenar array com Number.MIN_SAFE_INTEGER duplicado', () => {
      expect(
        bubblesort([Number.MIN_SAFE_INTEGER, Number.MIN_SAFE_INTEGER])
      ).toEqual([Number.MIN_SAFE_INTEGER, Number.MIN_SAFE_INTEGER]);
    });

    test('array retornado deve ter o mesmo comprimento do array de entrada', () => {
      const input = [5, 3, 8, 1, 9, 2];
      expect(bubblesort(input)).toHaveLength(6);
    });

    test('deve modificar o array original (ordenação in-place)', () => {
      const input = [3, 1, 2];
      const result = bubblesort(input);
      expect(result).toBe(input);
    });

    test('resultado deve conter exatamente os mesmos elementos da entrada', () => {
      const input = [4, 2, 7, 1, 9, 3];
      const sorted = bubblesort([...input]);
      const sortedInput = [...input].sort((a, b) => a - b);
      expect(sorted).toEqual(sortedInput);
    });

    test('deve ordenar array com alternância de positivos e negativos', () => {
      expect(bubblesort([1, -1, 2, -2, 3, -3])).toEqual([-3, -2, -1, 1, 2, 3]);
    });

    test('deve ordenar corretamente array com elemento único repetido muitas vezes', () => {
      expect(bubblesort([5, 5, 5, 5, 5])).toEqual([5, 5, 5, 5, 5]);
    });

    test('deve ordenar array com dois blocos já ordenados internamente mas trocados entre si', () => {
      expect(bubblesort([3, 4, 5, 1, 2])).toEqual([1, 2, 3, 4, 5]);
    });

    test('propriedade: elemento no índice 0 deve ser o menor após ordenação', () => {
      const arr = [8, 3, 7, 1, 5];
      const result = bubblesort(arr);
      expect(result[0]).toBe(Math.min(...result));
    });

    test('propriedade: elemento no último índice deve ser o maior após ordenação', () => {
      const arr = [8, 3, 7, 1, 5];
      const result = bubblesort([...arr]);
      expect(result[result.length - 1]).toBe(Math.max(...result));
    });

    test('propriedade: cada elemento deve ser menor ou igual ao próximo após ordenação', () => {
      const arr = [9, 4, 6, 2, 8, 1, 7, 3, 5];
      const result = bubblesort(arr);
      for (let i = 0; i < result.length - 1; i++) {
        expect(result[i]).toBeLessThanOrEqual(result[i + 1]);
      }
    });
  });
});