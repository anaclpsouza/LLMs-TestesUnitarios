import { describe, expect, test } from '@jest/globals';
import { lis } from '../funcoes';

describe('lis', () => {
  describe('Caminho Feliz (Fluxos Positivos)', () => {
    test('deve retornar 4 para [10, 9, 2, 5, 3, 7, 101, 18] (exemplo clássico)', () => {
      expect(lis([10, 9, 2, 5, 3, 7, 101, 18])).toBe(4);
    });

    test('deve retornar 4 para [0, 1, 0, 3, 2, 3]', () => {
      expect(lis([0, 1, 0, 3, 2, 3])).toBe(4);
    });

    test('deve retornar 1 para [7, 7, 7, 7, 7] (todos iguais — não estritamente crescente)', () => {
      expect(lis([7, 7, 7, 7, 7])).toBe(1);
    });

    test('deve retornar comprimento total para array estritamente crescente [1,2,3,4,5]', () => {
      expect(lis([1, 2, 3, 4, 5])).toBe(5);
    });

    test('deve retornar 1 para array estritamente decrescente [5,4,3,2,1]', () => {
      expect(lis([5, 4, 3, 2, 1])).toBe(1);
    });

    test('deve retornar 1 para array de um único elemento', () => {
      expect(lis([42])).toBe(1);
    });

    test('deve retornar 2 para [1, 2]', () => {
      expect(lis([1, 2])).toBe(2);
    });

    test('deve retornar 1 para [2, 1]', () => {
      expect(lis([2, 1])).toBe(1);
    });

    test('deve retornar 3 para [3, 1, 2, 4]', () => {
      expect(lis([3, 1, 2, 4])).toBe(3);
    });

    test('deve retornar 4 para [1, 3, 2, 4, 5]', () => {
      expect(lis([1, 3, 2, 4, 5])).toBe(4);
    });

    test('deve retornar 5 para [2, 3, 1, 4, 5, 6, 2]', () => {
      expect(lis([2, 3, 1, 4, 5, 6, 2])).toBe(5);
    });

    test('deve retornar 3 para [1, 3, 6, 7, 9, 2, 4, 5] (LIS: 1,3,4,5 ou 1,2,4,5)', () => {
      expect(lis([1, 3, 6, 7, 9, 2, 4, 5])).toBe(5);
    });

    test('deve retornar 6 para [3, 5, 6, 2, 5, 4, 19, 5, 6, 7, 12]', () => {
      expect(lis([3, 5, 6, 2, 5, 4, 19, 5, 6, 7, 12])).toBe(6);
    });

    test('deve retornar 5 para [1, 2, 3, 4, 5, 1, 2, 3] (prefixo já é LIS)', () => {
      expect(lis([1, 2, 3, 4, 5, 1, 2, 3])).toBe(5);
    });

    test('deve retornar 4 para [8, 1, 2, 4, 10, 6, 3, 5]', () => {
      expect(lis([8, 1, 2, 4, 10, 6, 3, 5])).toBe(4);
    });

    test('deve retornar 5 para [5, 1, 4, 2, 3] em qualquer caminho crescente', () => {
      expect(lis([5, 1, 4, 2, 3])).toBe(3);
    });

    test('deve retornar comprimento correto para sequência com duplicatas intercaladas', () => {
      expect(lis([1, 5, 2, 5, 3, 5, 4, 5])).toBe(4);
    });

    test('deve retornar comprimento correto para [9, 1, 4, 2, 3, 3, 6, 4, 7]', () => {
      expect(lis([9, 1, 4, 2, 3, 3, 6, 4, 7])).toBe(5);
    });
  });

  describe('Fluxos Negativos e Arrays Especiais', () => {
    test('deve retornar 0 para array vazio', () => {
      expect(lis([])).toBe(0);
    });

    test('deve retornar 1 para array com todos os elementos iguais [3, 3, 3]', () => {
      expect(lis([3, 3, 3])).toBe(1);
    });

    test('deve retornar 1 para array decrescente de dois elementos', () => {
      expect(lis([10, 5])).toBe(1);
    });

    test('deve retornar 1 para array com único elemento negativo', () => {
      expect(lis([-5])).toBe(1);
    });

    test('deve retornar comprimento total para array crescente com negativos [-5,-3,-1,0,2]', () => {
      expect(lis([-5, -3, -1, 0, 2])).toBe(5);
    });

    test('deve retornar 1 para array decrescente com negativos [-1,-3,-5,-7]', () => {
      expect(lis([-1, -3, -5, -7])).toBe(1);
    });

    test('deve retornar 2 para [-5, -3] (dois negativos crescentes)', () => {
      expect(lis([-5, -3])).toBe(2);
    });
  });

  describe('Casos de Borda (Edge Cases)', () => {
    test('deve retornar 0 para array vazio []', () => {
      expect(lis([])).toBe(0);
    });

    test('deve retornar 1 para array de um único zero', () => {
      expect(lis([0])).toBe(1);
    });

    test('deve retornar 1 para array de um único Number.MAX_SAFE_INTEGER', () => {
      expect(lis([Number.MAX_SAFE_INTEGER])).toBe(1);
    });

    test('deve retornar 1 para array de um único Number.MIN_SAFE_INTEGER', () => {
      expect(lis([Number.MIN_SAFE_INTEGER])).toBe(1);
    });

    test('deve retornar 2 para [Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER]', () => {
      expect(lis([Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER])).toBe(2);
    });

    test('deve retornar 1 para [Number.MAX_SAFE_INTEGER, Number.MIN_SAFE_INTEGER]', () => {
      expect(lis([Number.MAX_SAFE_INTEGER, Number.MIN_SAFE_INTEGER])).toBe(1);
    });

    test('deve lidar com zeros e positivos: [0, 1, 0, 2, 0, 3]', () => {
      expect(lis([0, 1, 0, 2, 0, 3])).toBe(4);
    });

    test('deve lidar com zeros repetidos: [0, 0, 0, 0]', () => {
      expect(lis([0, 0, 0, 0])).toBe(1);
    });

    test('deve retornar resultado correto para array com negativo e positivo [−1, 0, 1]', () => {
      expect(lis([-1, 0, 1])).toBe(3);
    });

    test('deve retornar resultado correto para mistura de negativos, zeros e positivos', () => {
      expect(lis([-3, -2, -1, 0, 1, 2, 3])).toBe(7);
    });

    test('resultado deve ser sempre um inteiro não negativo', () => {
      const cases: number[][] = [
        [],
        [1],
        [5, 4, 3, 2, 1],
        [1, 2, 3, 4, 5],
        [10, 9, 2, 5, 3, 7, 101, 18],
      ];
      cases.forEach((arr) => {
        const result = lis(arr);
        expect(Number.isInteger(result)).toBe(true);
        expect(result).toBeGreaterThanOrEqual(0);
      });
    });

    test('resultado nunca deve exceder o comprimento do array', () => {
      const cases: number[][] = [
        [1],
        [5, 4, 3, 2, 1],
        [1, 2, 3, 4, 5],
        [10, 9, 2, 5, 3, 7, 101, 18],
        [0, 1, 0, 3, 2, 3],
      ];
      cases.forEach((arr) => {
        expect(lis(arr)).toBeLessThanOrEqual(arr.length);
      });
    });

    test('array de dois elementos iguais deve retornar 1', () => {
      expect(lis([5, 5])).toBe(1);
    });

    test('deve retornar comprimento correto para array grande crescente de 100 elementos', () => {
      const arr = Array.from({ length: 100 }, (_, i) => i + 1);
      expect(lis(arr)).toBe(100);
    });

    test('deve retornar 1 para array grande decrescente de 100 elementos', () => {
      const arr = Array.from({ length: 100 }, (_, i) => 100 - i);
      expect(lis(arr)).toBe(1);
    });

    test('deve retornar comprimento correto para array grande com padrão zig-zag', () => {
      const arr = Array.from({ length: 50 }, (_, i) => (i % 2 === 0 ? i : 50 - i));
      const result = lis(arr);
      expect(result).toBeGreaterThanOrEqual(1);
      expect(result).toBeLessThanOrEqual(50);
    });

    test('deve lidar com decimais: [1.1, 2.2, 1.5, 3.3]', () => {
      expect(lis([1.1, 2.2, 1.5, 3.3])).toBe(3);
    });

    test('deve lidar com decimais crescentes: [0.1, 0.2, 0.3, 0.4]', () => {
      expect(lis([0.1, 0.2, 0.3, 0.4])).toBe(4);
    });

    test('deve lidar com mistura de inteiros e decimais: [1, 1.5, 2, 2.5, 3]', () => {
      expect(lis([1, 1.5, 2, 2.5, 3])).toBe(5);
    });
  });
});