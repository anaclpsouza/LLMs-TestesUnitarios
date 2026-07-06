import { describe, expect, test } from '@jest/globals';
import { binary_search } from '../funcoes';

describe('binary_search', () => {
  describe('Caminho Feliz (Fluxos Positivos)', () => {
    test('deve encontrar elemento no meio do array', () => {
      expect(binary_search([1, 3, 5, 7, 9], 5)).toBe(2);
    });

    test('deve encontrar elemento no início do array', () => {
      expect(binary_search([1, 3, 5, 7, 9], 1)).toBe(0);
    });

    test('deve encontrar elemento no final do array', () => {
      expect(binary_search([1, 3, 5, 7, 9], 9)).toBe(4);
    });

    test('deve encontrar elemento em array de dois elementos — primeiro', () => {
      expect(binary_search([2, 8], 2)).toBe(0);
    });

    test('deve encontrar elemento em array de dois elementos — segundo', () => {
      expect(binary_search([2, 8], 8)).toBe(1);
    });

    test('deve encontrar elemento em array de um único elemento', () => {
      expect(binary_search([42], 42)).toBe(0);
    });

    test('deve encontrar elemento em array grande ordenado', () => {
      const arr = Array.from({ length: 1000 }, (_, i) => i * 2);
      expect(binary_search(arr, 500)).toBe(250);
    });

    test('deve encontrar elemento no índice 0 em array grande', () => {
      const arr = Array.from({ length: 1000 }, (_, i) => i);
      expect(binary_search(arr, 0)).toBe(0);
    });

    test('deve encontrar elemento no último índice em array grande', () => {
      const arr = Array.from({ length: 1000 }, (_, i) => i);
      expect(binary_search(arr, 999)).toBe(999);
    });

    test('deve encontrar elemento com valores negativos no array', () => {
      expect(binary_search([-10, -5, 0, 5, 10], -5)).toBe(1);
    });

    test('deve encontrar elemento zero em array com negativos e positivos', () => {
      expect(binary_search([-10, -5, 0, 5, 10], 0)).toBe(2);
    });

    test('deve encontrar elemento com Number.MAX_SAFE_INTEGER', () => {
      expect(binary_search([1, 100, Number.MAX_SAFE_INTEGER], Number.MAX_SAFE_INTEGER)).toBe(2);
    });

    test('deve encontrar elemento com Number.MIN_SAFE_INTEGER', () => {
      expect(binary_search([Number.MIN_SAFE_INTEGER, 0, 1], Number.MIN_SAFE_INTEGER)).toBe(0);
    });

    test('deve encontrar elemento em array com apenas números negativos', () => {
      expect(binary_search([-50, -30, -20, -10, -1], -20)).toBe(2);
    });

    test('deve encontrar elemento em array com números decimais', () => {
      expect(binary_search([1.1, 2.2, 3.3, 4.4, 5.5], 3.3)).toBe(2);
    });

    test('deve retornar índice correto quando há apenas dois elementos e busca o último', () => {
      expect(binary_search([10, 20], 20)).toBe(1);
    });
  });

  describe('Fluxos Negativos — Elemento Não Encontrado', () => {
    test('deve retornar -1 para elemento ausente em array populado', () => {
      expect(binary_search([1, 3, 5, 7, 9], 4)).toBe(-1);
    });

    test('deve retornar -1 para elemento menor que todos os elementos', () => {
      expect(binary_search([10, 20, 30, 40, 50], 5)).toBe(-1);
    });

    test('deve retornar -1 para elemento maior que todos os elementos', () => {
      expect(binary_search([10, 20, 30, 40, 50], 100)).toBe(-1);
    });

    test('deve retornar -1 para elemento ausente em array vazio', () => {
      expect(binary_search([], 5)).toBe(-1);
    });

    test('deve retornar -1 para elemento ausente em array de um único elemento', () => {
      expect(binary_search([42], 7)).toBe(-1);
    });

    test('deve retornar -1 para elemento ausente entre dois elementos', () => {
      expect(binary_search([1, 3], 2)).toBe(-1);
    });

    test('deve retornar -1 para elemento ausente em array de negativos', () => {
      expect(binary_search([-50, -30, -10], -20)).toBe(-1);
    });

    test('deve retornar -1 para busca de 0 em array sem zero', () => {
      expect(binary_search([1, 2, 3, 4, 5], 0)).toBe(-1);
    });

    test('deve retornar -1 para busca de valor negativo em array positivo', () => {
      expect(binary_search([1, 2, 3, 4, 5], -1)).toBe(-1);
    });

    test('deve retornar -1 para busca de valor positivo em array negativo', () => {
      expect(binary_search([-5, -4, -3, -2, -1], 1)).toBe(-1);
    });

    test('deve retornar -1 para NaN como elemento buscado', () => {
      expect(binary_search([1, 2, 3], NaN)).toBe(-1);
    });

    test('deve retornar -1 para Infinity ausente no array', () => {
      expect(binary_search([1, 2, 3], Infinity)).toBe(-1);
    });

    test('deve retornar -1 para -Infinity ausente no array', () => {
      expect(binary_search([1, 2, 3], -Infinity)).toBe(-1);
    });

    test('deve retornar -1 para Number.MAX_SAFE_INTEGER ausente no array', () => {
      expect(binary_search([1, 2, 3], Number.MAX_SAFE_INTEGER)).toBe(-1);
    });

    test('deve retornar -1 para Number.MIN_SAFE_INTEGER ausente no array', () => {
      expect(binary_search([1, 2, 3], Number.MIN_SAFE_INTEGER)).toBe(-1);
    });
  });

  describe('Casos de Borda (Edge Cases)', () => {
    test('deve retornar -1 para array vazio', () => {
      expect(binary_search([], 1)).toBe(-1);
    });

    test('deve funcionar corretamente com array de um elemento encontrado', () => {
      expect(binary_search([7], 7)).toBe(0);
    });

    test('deve funcionar corretamente com array de um elemento não encontrado', () => {
      expect(binary_search([7], 8)).toBe(-1);
    });

    test('deve encontrar Infinity quando presente no array', () => {
      expect(binary_search([1, 100, Infinity], Infinity)).toBe(2);
    });

    test('deve encontrar -Infinity quando presente no array', () => {
      expect(binary_search([-Infinity, 0, 1], -Infinity)).toBe(0);
    });

    test('deve lidar com array de dois elementos iguais — encontrado no índice esperado', () => {
      expect(binary_search([5, 5], 5)).toBeGreaterThanOrEqual(0);
    });

    test('deve retornar índice válido para array de 3 elementos, busca no meio', () => {
      expect(binary_search([1, 2, 3], 2)).toBe(1);
    });

    test('deve retornar -1 para array de tamanho par com elemento ausente entre dois centrais', () => {
      expect(binary_search([1, 3, 5, 7], 4)).toBe(-1);
    });

    test('resultado deve ser sempre um número inteiro', () => {
      const result = binary_search([1, 2, 3, 4, 5], 3);
      expect(Number.isInteger(result)).toBe(true);
    });

    test('resultado deve ser -1 ou um índice válido do array', () => {
      const arr = [10, 20, 30, 40, 50];
      const result = binary_search(arr, 30);
      expect(result === -1 || (result >= 0 && result < arr.length)).toBe(true);
    });

    test('índice retornado deve corresponder ao elemento buscado no array', () => {
      const arr = [2, 4, 6, 8, 10, 12, 14];
      const x = 8;
      const idx = binary_search(arr, x);
      expect(idx).toBeGreaterThanOrEqual(0);
      expect(arr[idx]).toBe(x);
    });

    test('deve funcionar corretamente com array de tamanho par — elemento no final', () => {
      expect(binary_search([1, 2, 3, 4], 4)).toBe(3);
    });

    test('deve funcionar corretamente com array de tamanho par — elemento no início', () => {
      expect(binary_search([1, 2, 3, 4], 1)).toBe(0);
    });

    test('deve funcionar corretamente com array de tamanho ímpar — elemento no início', () => {
      expect(binary_search([1, 2, 3, 4, 5], 1)).toBe(0);
    });

    test('deve funcionar corretamente com array de tamanho ímpar — elemento no final', () => {
      expect(binary_search([1, 2, 3, 4, 5], 5)).toBe(4);
    });

    test('deve funcionar para array com 1000 elementos na busca do elemento central', () => {
      const arr = Array.from({ length: 1000 }, (_, i) => i + 1);
      expect(binary_search(arr, 500)).toBe(499);
    });

    test('deve retornar -1 para busca em array de 1000 elementos com valor ausente', () => {
      const arr = Array.from({ length: 1000 }, (_, i) => i * 2);
      expect(binary_search(arr, 999)).toBe(-1);
    });

    test('todos os elementos de array pequeno devem ser encontrados nos índices corretos', () => {
      const arr = [5, 10, 15, 20, 25];
      arr.forEach((val, idx) => {
        expect(binary_search(arr, val)).toBe(idx);
      });
    });
  });
});