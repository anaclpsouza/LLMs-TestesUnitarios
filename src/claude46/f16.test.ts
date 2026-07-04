import { describe, expect, test } from '@jest/globals';
import { quicksort } from '../funcoes';

describe('quicksort', () => {
  describe('Caminho Feliz (Fluxos Positivos)', () => {
    test('deve ordenar array de inteiros positivos desordenados', () => {
      expect(quicksort([3, 1, 4, 1, 5, 9, 2, 6])).toEqual([1, 1, 2, 3, 4, 5, 6, 9]);
    });

    test('deve ordenar array em ordem decrescente para crescente', () => {
      expect(quicksort([5, 4, 3, 2, 1])).toEqual([1, 2, 3, 4, 5]);
    });

    test('deve retornar o mesmo array já ordenado', () => {
      expect(quicksort([1, 2, 3, 4, 5])).toEqual([1, 2, 3, 4, 5]);
    });

    test('deve ordenar array de dois elementos fora de ordem', () => {
      expect(quicksort([2, 1])).toEqual([1, 2]);
    });

    test('deve retornar array de dois elementos já ordenados', () => {
      expect(quicksort([1, 2])).toEqual([1, 2]);
    });

    test('deve ordenar array com números negativos', () => {
      expect(quicksort([-3, -1, -4, -2, -5])).toEqual([-5, -4, -3, -2, -1]);
    });

    test('deve ordenar array com mistura de negativos e positivos', () => {
      expect(quicksort([-3, 5, -1, 0, 3, -2])).toEqual([-3, -2, -1, 0, 3, 5]);
    });

    test('deve ordenar array com zeros e positivos', () => {
      expect(quicksort([3, 0, 1, 0, 2])).toEqual([0, 0, 1, 2, 3]);
    });

    test('deve ordenar array com números decimais', () => {
      expect(quicksort([3.5, 1.1, 2.9, 0.5])).toEqual([0.5, 1.1, 2.9, 3.5]);
    });

    test('deve ordenar array com valores repetidos', () => {
      expect(quicksort([3, 1, 2, 1, 3])).toEqual([1, 1, 2, 3, 3]);
    });

    test('deve ordenar array com todos os elementos iguais', () => {
      expect(quicksort([7, 7, 7, 7])).toEqual([7, 7, 7, 7]);
    });

    test('deve ordenar array com Number.MAX_SAFE_INTEGER e Number.MIN_SAFE_INTEGER', () => {
      expect(
        quicksort([Number.MAX_SAFE_INTEGER, 0, Number.MIN_SAFE_INTEGER])
      ).toEqual([Number.MIN_SAFE_INTEGER, 0, Number.MAX_SAFE_INTEGER]);
    });

    test('deve ordenar array com Infinity e -Infinity', () => {
      expect(quicksort([Infinity, 0, -Infinity, 5])).toEqual([
        -Infinity, 0, 5, Infinity,
      ]);
    });

    test('deve ordenar array com negativos e zero', () => {
      expect(quicksort([-5, 0, -1, -3])).toEqual([-5, -3, -1, 0]);
    });

    test('deve ordenar array com três elementos em ordem aleatória', () => {
      expect(quicksort([3, 1, 2])).toEqual([1, 2, 3]);
    });

    test('deve ordenar array onde apenas o primeiro elemento está fora de lugar', () => {
      expect(quicksort([5, 1, 2, 3, 4])).toEqual([1, 2, 3, 4, 5]);
    });

    test('deve ordenar array onde apenas o último elemento está fora de lugar', () => {
      expect(quicksort([1, 2, 3, 4, 0])).toEqual([0, 1, 2, 3, 4]);
    });

    test('deve ordenar array longo de 100 elementos', () => {
      const arr = Array.from({ length: 100 }, (_, i) => 100 - i);
      const expected = Array.from({ length: 100 }, (_, i) => i + 1);
      expect(quicksort(arr)).toEqual(expected);
    });

    test('deve ordenar array alternando positivos e negativos', () => {
      expect(quicksort([1, -1, 2, -2, 3, -3])).toEqual([-3, -2, -1, 1, 2, 3]);
    });
  });

  describe('Fluxos Negativos', () => {
    test('deve retornar array vazio para array vazio (caso base)', () => {
      expect(quicksort([])).toEqual([]);
    });

    test('deve retornar o mesmo array para array de um único elemento positivo', () => {
      expect(quicksort([42])).toEqual([42]);
    });

    test('deve retornar o mesmo array para array de um único elemento negativo', () => {
      expect(quicksort([-7])).toEqual([-7]);
    });

    test('deve retornar o mesmo array para array de um único zero', () => {
      expect(quicksort([0])).toEqual([0]);
    });

    test('deve retornar array correto para array com todos os zeros', () => {
      expect(quicksort([0, 0, 0])).toEqual([0, 0, 0]);
    });
  });

  describe('Casos de Borda (Edge Cases)', () => {
    test('deve retornar novo array e não modificar o original', () => {
      const input = [3, 1, 2];
      const original = [...input];
      quicksort(input);
      expect(input).toEqual(original);
    });

    test('resultado deve ter o mesmo comprimento do array de entrada', () => {
      const input = [5, 3, 8, 1, 9, 2];
      expect(quicksort(input)).toHaveLength(input.length);
    });

    test('resultado deve conter exatamente os mesmos elementos do array de entrada', () => {
      const input = [4, 2, 7, 1, 9, 3];
      const sorted = quicksort(input);
      expect(sorted.sort((a, b) => a - b)).toEqual([...input].sort((a, b) => a - b));
    });

    test('propriedade: elemento no índice 0 deve ser o menor após ordenação', () => {
      const arr = [8, 3, 7, 1, 5];
      const result = quicksort(arr);
      expect(result[0]).toBe(Math.min(...result));
    });

    test('propriedade: elemento no último índice deve ser o maior após ordenação', () => {
      const arr = [8, 3, 7, 1, 5];
      const result = quicksort(arr);
      expect(result[result.length - 1]).toBe(Math.max(...result));
    });

    test('propriedade: cada elemento deve ser menor ou igual ao próximo', () => {
      const arr = [9, 4, 6, 2, 8, 1, 7, 3, 5];
      const result = quicksort(arr);
      for (let i = 0; i < result.length - 1; i++) {
        expect(result[i]).toBeLessThanOrEqual(result[i + 1]);
      }
    });

    test('deve ordenar array de dois zeros', () => {
      expect(quicksort([0, 0])).toEqual([0, 0]);
    });

    test('deve ordenar array de dois elementos negativos iguais', () => {
      expect(quicksort([-5, -5])).toEqual([-5, -5]);
    });

    test('deve ordenar array de dois elementos negativos diferentes', () => {
      expect(quicksort([-1, -5])).toEqual([-5, -1]);
    });

    test('deve ordenar array com Number.MAX_SAFE_INTEGER duplicado', () => {
      expect(
        quicksort([Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER])
      ).toEqual([Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER]);
    });

    test('deve ordenar array com Number.MIN_SAFE_INTEGER duplicado', () => {
      expect(
        quicksort([Number.MIN_SAFE_INTEGER, Number.MIN_SAFE_INTEGER])
      ).toEqual([Number.MIN_SAFE_INTEGER, Number.MIN_SAFE_INTEGER]);
    });

    test('deve ordenar array com elemento único repetido muitas vezes', () => {
      expect(quicksort([5, 5, 5, 5, 5])).toEqual([5, 5, 5, 5, 5]);
    });

    test('deve ordenar dois blocos ordenados intercalados', () => {
      expect(quicksort([3, 4, 5, 1, 2])).toEqual([1, 2, 3, 4, 5]);
    });

    test('deve ordenar array com tamanho par de elementos', () => {
      expect(quicksort([4, 2, 6, 8])).toEqual([2, 4, 6, 8]);
    });

    test('deve ordenar array com tamanho ímpar de elementos', () => {
      expect(quicksort([4, 2, 6, 8, 1])).toEqual([1, 2, 4, 6, 8]);
    });

    test('resultado de quicksort deve ser idêntico ao sort nativo para dados aleatórios', () => {
      const arr = [38, 27, 43, 3, 9, 82, 10];
      const native = [...arr].sort((a, b) => a - b);
      expect(quicksort(arr)).toEqual(native);
    });

    test('deve lidar corretamente com pivot sendo o menor elemento', () => {
      expect(quicksort([1, 5, 4, 3, 2])).toEqual([1, 2, 3, 4, 5]);
    });

    test('deve lidar corretamente com pivot sendo o maior elemento', () => {
      expect(quicksort([5, 4, 3, 2, 1])).toEqual([1, 2, 3, 4, 5]);
    });

    test('deve lidar com NaN no array sem lançar erro (comportamento definido pelo JS)', () => {
      const result = quicksort([3, NaN, 1]);
      expect(result).toHaveLength(3);
    });

    test('deve lidar com Infinity como único elemento', () => {
      expect(quicksort([Infinity])).toEqual([Infinity]);
    });

    test('deve lidar com -Infinity como único elemento', () => {
      expect(quicksort([-Infinity])).toEqual([-Infinity]);
    });
  });
});