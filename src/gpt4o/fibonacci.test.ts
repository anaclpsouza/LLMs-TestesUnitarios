import { describe, expect, test } from '@jest/globals';
import { fibonacci } from '../funcoes';

describe('fibonacci', () => {
  describe('Casos positivos', () => {
    test('deve retornar 0 para n = 0', () => {
      expect(fibonacci(0)).toBe(0);
    });

    test('deve retornar 1 para n = 1', () => {
      expect(fibonacci(1)).toBe(1);
    });

    test('deve calcular corretamente fibonacci(2)', () => {
      expect(fibonacci(2)).toBe(1);
    });

    test('deve calcular corretamente fibonacci(3)', () => {
      expect(fibonacci(3)).toBe(2);
    });

    test('deve calcular corretamente fibonacci(5)', () => {
      expect(fibonacci(5)).toBe(5);
    });

    test('deve calcular corretamente fibonacci(10)', () => {
      expect(fibonacci(10)).toBe(55);
    });

    test('deve calcular corretamente fibonacci(20)', () => {
      expect(fibonacci(20)).toBe(6765);
    });
  });

  describe('Casos de borda', () => {
    test('deve calcular corretamente fibonacci(30)', () => {
      expect(fibonacci(30)).toBe(832040);
    });

    test('deve retornar um número finito para um valor alto ainda suportável', () => {
      expect(Number.isFinite(fibonacci(40))).toBe(true);
      expect(fibonacci(40)).toBe(102334155);
    });
  });

  describe('Entradas inválidas ou não tratadas pela implementação', () => {
    test('deve lançar RangeError para números negativos', () => {
      expect(() => fibonacci(-1)).toThrow(RangeError);
    });

    test('deve lançar RangeError para números negativos maiores em módulo', () => {
      expect(() => fibonacci(-100)).toThrow(RangeError);
    });

    test('deve lançar RangeError para números decimais positivos', () => {
      expect(() => fibonacci(2.5)).toThrow(RangeError);
    });

    test('deve lançar RangeError para NaN', () => {
      expect(() => fibonacci(Number.NaN)).toThrow(RangeError);
    });

    test('deve lançar RangeError para Infinity', () => {
      expect(() => fibonacci(Number.POSITIVE_INFINITY)).toThrow(RangeError);
    });

    test('deve lançar RangeError para -Infinity', () => {
      expect(() => fibonacci(Number.NEGATIVE_INFINITY)).toThrow(RangeError);
    });

    test('deve lançar erro quando undefined é passado em tempo de execução', () => {
      expect(() => fibonacci(undefined as unknown as number)).toThrow(RangeError);
    });

    test('deve lançar erro quando null é passado em tempo de execução', () => {
      expect(() => fibonacci(null as unknown as number)).toThrow(RangeError);
    });
  });
});