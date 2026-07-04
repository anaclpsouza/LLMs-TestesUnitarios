import { describe, expect, test } from '@jest/globals';
import { find_in_sorted } from '../funcoes';

describe('find_in_sorted', () => {
  describe('Caminho Feliz (Fluxos Positivos) — Elemento Encontrado', () => {
    test('deve retornar índice 0 para elemento no início do array', () => {
      expect(find_in_sorted([1, 3, 5, 7, 9], 1)).toBe(0);
    });

    test('deve retornar índice central para elemento no meio do array', () => {
      expect(find_in_sorted([1, 3, 5, 7, 9], 5)).toBe(2);
    });

    test('deve retornar último índice para elemento no final do array', () => {
      expect(find_in_sorted([1, 3, 5, 7, 9], 9)).toBe(4);
    });

    test('deve retornar 0 para array de único elemento encontrado', () => {
      expect(find_in_sorted([42], 42)).toBe(0);
    });

    test('deve retornar 0 para busca do primeiro em array de dois elementos', () => {
      expect(find_in_sorted([5, 10], 5)).toBe(0);
    });

    test('deve retornar 1 para busca do segundo em array de dois elementos', () => {
      expect(find_in_sorted([5, 10], 10)).toBe(1);
    });

    test('deve encontrar elemento em array de inteiros consecutivos', () => {
      expect(find_in_sorted([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 7)).toBe(6);
    });

    test('deve encontrar elemento negativo em array com negativos e positivos', () => {
      expect(find_in_sorted([-10, -5, 0, 5, 10], -5)).toBe(1);
    });

    test('deve encontrar zero em array com negativos e positivos', () => {
      expect(find_in_sorted([-10, -5, 0, 5, 10], 0)).toBe(2);
    });

    test('deve encontrar elemento positivo em array com negativos e positivos', () => {
      expect(find_in_sorted([-10, -5, 0, 5, 10], 10)).toBe(4);
    });

    test('deve encontrar elemento em array exclusivamente negativo', () => {
      expect(find_in_sorted([-50, -30, -20, -10, -1], -20)).toBe(2);
    });

    test('deve encontrar o primeiro elemento de array exclusivamente negativo', () => {
      expect(find_in_sorted([-50, -30, -20, -10, -1], -50)).toBe(0);
    });

    test('deve encontrar o último elemento de array exclusivamente negativo', () => {
      expect(find_in_sorted([-50, -30, -20, -10, -1], -1)).toBe(4);
    });

    test('deve encontrar Number.MAX_SAFE_INTEGER no array', () => {
      expect(
        find_in_sorted([1, 100, Number.MAX_SAFE_INTEGER], Number.MAX_SAFE_INTEGER)
      ).toBe(2);
    });

    test('deve encontrar Number.MIN_SAFE_INTEGER no array', () => {
      expect(
        find_in_sorted([Number.MIN_SAFE_INTEGER, 0, 1], Number.MIN_SAFE_INTEGER)
      ).toBe(0);
    });

    test('deve encontrar elemento em array grande de 1000 elementos — início', () => {
      const arr = Array.from({ length: 1000 }, (_, i) => i);
      expect(find_in_sorted(arr, 0)).toBe(0);
    });

    test('deve encontrar elemento em array grande de 1000 elementos — meio', () => {
      const arr = Array.from({ length: 1000 }, (_, i) => i);
      expect(find_in_sorted(arr, 499)).toBe(499);
    });

    test('deve encontrar elemento em array grande de 1000 elementos — fim', () => {
      const arr = Array.from({ length: 1000 }, (_, i) => i);
      expect(find_in_sorted(arr, 999)).toBe(999);
    });

    test('deve encontrar Infinity quando presente no array', () => {
      expect(find_in_sorted([1, 100, Infinity], Infinity)).toBe(2);
    });

    test('deve encontrar -Infinity quando presente no array', () => {
      expect(find_in_sorted([-Infinity, 0, 1], -Infinity)).toBe(0);
    });

    test('índice retornado deve corresponder ao valor buscado no array', () => {
      const arr = [2, 4, 6, 8, 10, 12, 14, 16];
      const x = 10;
      const idx = find_in_sorted(arr, x);
      expect(arr[idx]).toBe(x);
    });

    test('todos os elementos de array pequeno devem ser encontrados em seus índices', () => {
      const arr = [10, 20, 30, 40, 50];
      arr.forEach((val, idx) => {
        expect(find_in_sorted(arr, val)).toBe(idx);
      });
    });
  });

  describe('Fluxos Negativos — Elemento Não Encontrado', () => {
    test('deve retornar -1 para elemento ausente em array populado', () => {
      expect(find_in_sorted([1, 3, 5, 7, 9], 4)).toBe(-1);
    });

    test('deve retornar -1 para elemento menor que todos os elementos', () => {
      expect(find_in_sorted([10, 20, 30, 40, 50], 5)).toBe(-1);
    });

    test('deve retornar -1 para elemento maior que todos os elementos', () => {
      expect(find_in_sorted([10, 20, 30, 40, 50], 100)).toBe(-1);
    });

    test('deve retornar -1 para elemento ausente em array de único elemento', () => {
      expect(find_in_sorted([42], 7)).toBe(-1);
    });

    test('deve retornar -1 para elemento ausente entre dois elementos', () => {
      expect(find_in_sorted([1, 3], 2)).toBe(-1);
    });

    test('deve retornar -1 para busca de 0 em array sem zero', () => {
      expect(find_in_sorted([1, 2, 3, 4, 5], 0)).toBe(-1);
    });

    test('deve retornar -1 para busca de negativo em array exclusivamente positivo', () => {
      expect(find_in_sorted([1, 2, 3, 4, 5], -1)).toBe(-1);
    });

    test('deve retornar -1 para busca de positivo em array exclusivamente negativo', () => {
      expect(find_in_sorted([-5, -4, -3, -2, -1], 1)).toBe(-1);
    });

    test('deve retornar -1 para elemento ausente em array exclusivamente negativo', () => {
      expect(find_in_sorted([-50, -30, -10], -20)).toBe(-1);
    });

    test('deve retornar -1 para NaN como elemento buscado', () => {
      expect(find_in_sorted([1, 2, 3], NaN)).toBe(-1);
    });

    test('deve retornar -1 para Infinity ausente no array', () => {
      expect(find_in_sorted([1, 2, 3], Infinity)).toBe(-1);
    });

    test('deve retornar -1 para -Infinity ausente no array', () => {
      expect(find_in_sorted([1, 2, 3], -Infinity)).toBe(-1);
    });

    test('deve retornar -1 para Number.MAX_SAFE_INTEGER ausente no array', () => {
      expect(find_in_sorted([1, 2, 3], Number.MAX_SAFE_INTEGER)).toBe(-1);
    });

    test('deve retornar -1 para Number.MIN_SAFE_INTEGER ausente no array', () => {
      expect(find_in_sorted([1, 2, 3], Number.MIN_SAFE_INTEGER)).toBe(-1);
    });

    test('deve retornar -1 para elemento faltando por um a mais do último', () => {
      expect(find_in_sorted([1, 2, 3, 4, 5], 6)).toBe(-1);
    });

    test('deve retornar -1 para busca em array grande sem o elemento', () => {
      const arr = Array.from({ length: 1000 }, (_, i) => i * 2);
      expect(find_in_sorted(arr, 999)).toBe(-1);
    });
  });

  describe('Casos de Borda (Edge Cases)', () => {
    test('deve retornar -1 para array vazio', () => {
      expect(find_in_sorted([], 5)).toBe(-1);
    });

    test('deve retornar -1 para array vazio com busca de 0', () => {
      expect(find_in_sorted([], 0)).toBe(-1);
    });

    test('deve retornar -1 para array vazio com busca de negativo', () => {
      expect(find_in_sorted([], -1)).toBe(-1);
    });

    test('resultado deve ser sempre um número inteiro', () => {
      const result = find_in_sorted([1, 2, 3, 4, 5], 3);
      expect(Number.isInteger(result)).toBe(true);
    });

    test('resultado deve ser -1 ou índice válido do array', () => {
      const arr = [10, 20, 30, 40, 50];
      const result = find_in_sorted(arr, 30);
      expect(result === -1 || (result >= 0 && result < arr.length)).toBe(true);
    });

    test('deve retornar -1 ou índice válido para busca não encontrada', () => {
      const arr = [10, 20, 30, 40, 50];
      const result = find_in_sorted(arr, 99);
      expect(result).toBe(-1);
    });

    test('deve encontrar elemento em array de tamanho par — primeiro elemento', () => {
      expect(find_in_sorted([2, 4, 6, 8], 2)).toBe(0);
    });

    test('deve encontrar elemento em array de tamanho par — último elemento', () => {
      expect(find_in_sorted([2, 4, 6, 8], 8)).toBe(3);
    });

    test('deve encontrar elemento em array de tamanho ímpar — primeiro elemento', () => {
      expect(find_in_sorted([1, 3, 5, 7, 9], 1)).toBe(0);
    });

    test('deve encontrar elemento em array de tamanho ímpar — último elemento', () => {
      expect(find_in_sorted([1, 3, 5, 7, 9], 9)).toBe(4);
    });

    test('deve lidar com array onde todos os elementos são iguais — encontrado', () => {
      const result = find_in_sorted([5, 5, 5, 5, 5], 5);
      expect(result).toBeGreaterThanOrEqual(0);
      expect(result).toBeLessThan(5);
    });

    test('deve retornar -1 para array de elementos iguais ao buscar valor diferente', () => {
      expect(find_in_sorted([5, 5, 5, 5, 5], 3)).toBe(-1);
    });

    test('deve lidar com array de floats ordenados — encontrado', () => {
      expect(find_in_sorted([1.1, 2.2, 3.3, 4.4], 3.3)).toBe(2);
    });

    test('deve lidar com array de floats ordenados — não encontrado', () => {
      expect(find_in_sorted([1.1, 2.2, 3.3, 4.4], 2.5)).toBe(-1);
    });

    test('deve retornar índice correto e arr[idx] deve igualar o elemento buscado', () => {
      const arr = [3, 6, 9, 12, 15, 18, 21];
      const x = 12;
      const idx = find_in_sorted(arr, x);
      expect(idx).toBeGreaterThanOrEqual(0);
      expect(arr[idx]).toBe(x);
    });
  });
});