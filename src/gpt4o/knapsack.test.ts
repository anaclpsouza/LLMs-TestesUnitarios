import { describe, expect, test } from '@jest/globals';
import { knapsack } from '../funcoes';

describe('knapsack', () => {
  describe('Casos positivos', () => {
    test('deve retornar 0 quando não houver itens', () => {
      expect(knapsack(10, [])).toBe(0);
    });

    test('deve selecionar um único item que cabe na mochila', () => {
      expect(knapsack(5, [[5, 10]])).toBe(10);
    });

    test('não deve selecionar um item que excede a capacidade', () => {
      expect(knapsack(4, [[5, 10]])).toBe(0);
    });

    test('deve escolher a melhor combinação de itens', () => {
      const items: [number, number][] = [
        [1, 1],
        [3, 4],
        [4, 5],
        [5, 7],
      ];

      expect(knapsack(7, items)).toBe(9);
    });

    test('deve preferir a combinação de maior valor e não o item de maior valor individual', () => {
      const items: [number, number][] = [
        [2, 3],
        [3, 4],
        [4, 5],
      ];

      expect(knapsack(5, items)).toBe(7);
    });

    test('deve funcionar com pesos e valores decimais representáveis', () => {
      const items: [number, number][] = [
        [1, 1.5],
        [2, 3.5],
      ];

      expect(knapsack(3, items)).toBe(5);
    });

    test('deve funcionar com itens de peso zero e valor positivo', () => {
      const items: [number, number][] = [
        [0, 5],
        [2, 10],
      ];

      expect(knapsack(2, items)).toBe(15);
    });
  });

  describe('Casos de borda', () => {
    test('deve retornar 0 para capacidade igual a zero', () => {
      expect(knapsack(0, [
        [1, 10],
        [2, 20],
      ])).toBe(0);
    });

    test('deve retornar 0 para capacidade negativa', () => {
      expect(knapsack(-1, [
        [1, 10],
      ])).toBe(0);
    });

    test('deve ignorar itens mais pesados que a capacidade', () => {
      const items: [number, number][] = [
        [100, 1000],
        [2, 5],
      ];

      expect(knapsack(2, items)).toBe(5);
    });

    test('deve lidar corretamente com Number.MAX_SAFE_INTEGER como valor', () => {
      const items: [number, number][] = [
        [1, Number.MAX_SAFE_INTEGER],
      ];

      expect(knapsack(1, items)).toBe(Number.MAX_SAFE_INTEGER);
    });

    test('deve manter 0 quando todos os valores forem negativos', () => {
      const items: [number, number][] = [
        [1, -10],
        [2, -20],
      ];

      expect(knapsack(2, items)).toBe(0);
    });

    test('deve retornar Infinity quando um item possuir valor infinito', () => {
      const items: [number, number][] = [
        [1, Number.POSITIVE_INFINITY],
      ];

      expect(knapsack(1, items)).toBe(Infinity);
    });
  });

  describe('Entradas inválidas ou não tratadas explicitamente', () => {
    test('deve lançar TypeError quando items for null', () => {
      expect(() =>
        knapsack(1, null as unknown as [number, number][])
      ).toThrow(TypeError);
    });

    test('deve lançar TypeError quando items for undefined', () => {
      expect(() =>
        knapsack(1, undefined as unknown as [number, number][])
      ).toThrow(TypeError);
    });

    test('deve lançar TypeError quando items for um objeto', () => {
      expect(() =>
        knapsack(1, {} as unknown as [number, number][])
      ).toThrow(TypeError);
    });

    test('deve lançar TypeError quando um item não for iterável', () => {
      expect(() =>
        knapsack(1, [1 as unknown as [number, number]])
      ).toThrow(TypeError);
    });

    test('deve lançar RangeError quando a capacidade for NaN', () => {
      expect(() =>
        knapsack(Number.NaN, [])
      ).toThrow(RangeError);
    });

    test('deve lançar RangeError quando a capacidade for Infinity', () => {
      expect(() =>
        knapsack(Number.POSITIVE_INFINITY, [])
      ).toThrow(RangeError);
    });

    test('deve lançar TypeError quando a capacidade for undefined', () => {
      expect(() =>
        knapsack(undefined as unknown as number, [])
      ).toThrow(TypeError);
    });
  });
});