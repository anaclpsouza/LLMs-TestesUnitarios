import { describe, expect, test } from '@jest/globals';
import { lis } from '../funcoes';

describe('lis', () => {
  describe('Casos positivos', () => {
    test('deve retornar 0 para um array vazio', () => {
      expect(lis([])).toBe(0);
    });

    test('deve retornar 1 para um array com um único elemento', () => {
      expect(lis([42])).toBe(1);
    });

    test('deve retornar o tamanho do array para sequência estritamente crescente', () => {
      expect(lis([1, 2, 3, 4, 5])).toBe(5);
    });

    test('deve retornar 1 para sequência estritamente decrescente', () => {
      expect(lis([5, 4, 3, 2, 1])).toBe(1);
    });

    test('deve calcular corretamente um caso clássico de LIS', () => {
      expect(lis([10, 22, 9, 33, 21, 50, 41, 60])).toBe(5);
    });

    test('deve calcular corretamente outro exemplo conhecido', () => {
      expect(lis([3, 10, 2, 1, 20])).toBe(3);
    });

    test('deve calcular corretamente para sequência mista', () => {
      expect(lis([0, 8, 4, 12, 2])).toBe(3);
    });

    test('deve calcular corretamente para números negativos', () => {
      expect(lis([-5, -4, -3, -10, -2, -1])).toBe(5);
    });

    test('deve calcular corretamente para números decimais', () => {
      expect(lis([1.1, 2.2, 1.5, 3.3])).toBe(3);
    });
  });

  describe('Casos de borda', () => {
    test('deve considerar elementos duplicados como não crescentes', () => {
      expect(lis([1, 1, 1, 1])).toBe(1);
    });

    test('deve lidar corretamente com duplicados intercalados', () => {
      expect(lis([1, 2, 2, 3])).toBe(3);
    });

    test('deve lidar corretamente com Number.MAX_SAFE_INTEGER', () => {
      expect(
        lis([1, Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER - 1])
      ).toBe(2);
    });

    test('deve lidar corretamente com Number.MIN_SAFE_INTEGER', () => {
      expect(
        lis([Number.MIN_SAFE_INTEGER, -10, -5, 0])
      ).toBe(4);
    });

    test('deve retornar 1 quando todos os elementos forem iguais', () => {
      expect(lis([7, 7, 7, 7, 7])).toBe(1);
    });

    test('deve retornar 0 quando o array contiver apenas NaN', () => {
      expect(lis([Number.NaN])).toBe(0);
    });

    test('deve lidar corretamente com Infinity', () => {
      expect(lis([1, 2, Number.POSITIVE_INFINITY])).toBe(3);
    });
  });

  describe('Entradas inválidas ou não tratadas explicitamente', () => {
    test('deve lançar TypeError quando o array for null', () => {
      expect(() => lis(null as unknown as number[])).toThrow(TypeError);
    });

    test('deve lançar TypeError quando o array for undefined', () => {
      expect(() => lis(undefined as unknown as number[])).toThrow(TypeError);
    });

    test('deve lançar TypeError quando o argumento for um objeto', () => {
      expect(() => lis({} as unknown as number[])).toThrow(TypeError);
    });

    test('deve lançar TypeError quando o argumento for um número', () => {
      expect(() => lis(123 as unknown as number[])).toThrow(TypeError);
    });

    test('deve lançar TypeError quando o argumento for uma string', () => {
      expect(() => lis('123' as unknown as number[])).toThrow(TypeError);
    });
  });
});