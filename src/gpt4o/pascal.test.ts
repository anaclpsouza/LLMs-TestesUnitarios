import { describe, expect, test } from '@jest/globals';
import { pascal } from '../funcoes';

describe('pascal', () => {
  describe('Casos positivos', () => {
    test('deve gerar corretamente uma linha do triângulo de Pascal', () => {
      expect(pascal(1)).toEqual([[1]]);
    });

    test('deve gerar corretamente duas linhas', () => {
      expect(pascal(2)).toEqual([
        [1],
        [1, 1],
      ]);
    });

    test('deve gerar corretamente cinco linhas', () => {
      expect(pascal(5)).toEqual([
        [1],
        [1, 1],
        [1, 2, 1],
        [1, 3, 3, 1],
        [1, 4, 6, 4, 1],
      ]);
    });

    test('deve gerar corretamente seis linhas', () => {
      expect(pascal(6)).toEqual([
        [1],
        [1, 1],
        [1, 2, 1],
        [1, 3, 3, 1],
        [1, 4, 6, 4, 1],
        [1, 5, 10, 10, 5, 1],
      ]);
    });

    test('cada linha deve começar e terminar com 1', () => {
      const rows = pascal(8);

      for (const row of rows) {
        expect(row[0]).toBe(1);
        expect(row[row.length - 1]).toBe(1);
      }
    });
  });

  describe('Casos de borda', () => {
    test('deve retornar apenas a primeira linha quando n = 0', () => {
      expect(pascal(0)).toEqual([[1]]);
    });

    test('deve retornar apenas a primeira linha quando n for negativo', () => {
      expect(pascal(-5)).toEqual([[1]]);
    });

    test('deve retornar apenas a primeira linha quando n = NaN', () => {
      expect(pascal(Number.NaN)).toEqual([[1]]);
    });

    test('deve retornar apenas a primeira linha quando n = Infinity', () => {
      expect(() => pascal(Number.POSITIVE_INFINITY)).toThrow(RangeError);
    });

    test('cada linha deve possuir r + 1 elementos', () => {
      const rows = pascal(7);

      rows.forEach((row, index) => {
        expect(row).toHaveLength(index + 1);
      });
    });

    test('cada linha deve ser simétrica', () => {
      const rows = pascal(8);

      for (const row of rows) {
        expect(row).toEqual([...row].reverse());
      }
    });

    test('a soma da linha r deve ser 2^r', () => {
      const rows = pascal(7);

      rows.forEach((row, index) => {
        const sum = row.reduce((acc, value) => acc + value, 0);
        expect(sum).toBe(2 ** index);
      });
    });
  });

  describe('Entradas inválidas ou não tratadas explicitamente', () => {
    test('deve lançar TypeError quando n for undefined', () => {
      expect(() => pascal(undefined as unknown as number)).toThrow(TypeError);
    });

    test('deve lançar TypeError quando n for null', () => {
      expect(() => pascal(null as unknown as number)).toThrow(TypeError);
    });

    test('deve lançar TypeError quando n for um objeto', () => {
      expect(() => pascal({} as unknown as number)).toThrow(TypeError);
    });

    test('deve lançar TypeError quando n for um array', () => {
      expect(() => pascal([] as unknown as number)).toThrow(TypeError);
    });

    test('deve lançar TypeError quando n for uma string', () => {
      expect(() => pascal('5' as unknown as number)).toThrow(TypeError);
    });
  });
});