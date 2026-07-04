import { describe, expect, test } from '@jest/globals';
import { factorial } from '../funcoes';

describe('factorial', () => {
  describe('Casos positivos', () => {
    test('deve retornar 1 para 0 (caso base)', () => {
      expect(factorial(0)).toBe(1);
    });

    test('deve calcular corretamente o fatorial de 1', () => {
      expect(factorial(1)).toBe(1);
    });

    test('deve calcular corretamente o fatorial de 2', () => {
      expect(factorial(2)).toBe(2);
    });

    test('deve calcular corretamente o fatorial de 3', () => {
      expect(factorial(3)).toBe(6);
    });

    test('deve calcular corretamente o fatorial de 5', () => {
      expect(factorial(5)).toBe(120);
    });

    test('deve calcular corretamente o fatorial de 10', () => {
      expect(factorial(10)).toBe(3628800);
    });
  });

  describe('Casos de borda', () => {
    test('deve calcular corretamente o fatorial de um número maior dentro do limite seguro', () => {
      expect(factorial(12)).toBe(479001600);
    });

    test('deve retornar Infinity para valores que excedem o limite numérico da recursão/representação', () => {
      expect(factorial(171)).toBe(Infinity);
    });
  });

  describe('Entradas inválidas ou não tratadas pela implementação', () => {
    test('deve lançar RangeError para números negativos devido à recursão infinita', () => {
      expect(() => factorial(-1)).toThrow(RangeError);
    });

    test('deve lançar RangeError para números negativos maiores em módulo', () => {
      expect(() => factorial(-10)).toThrow(RangeError);
    });

    test('deve lançar RangeError para números decimais positivos, pois nunca atinge o caso base', () => {
      expect(() => factorial(2.5)).toThrow(RangeError);
    });

    test('deve lançar RangeError para NaN', () => {
      expect(() => factorial(Number.NaN)).toThrow(RangeError);
    });

    test('deve lançar RangeError para Infinity', () => {
      expect(() => factorial(Number.POSITIVE_INFINITY)).toThrow(RangeError);
    });

    test('deve lançar RangeError para -Infinity', () => {
      expect(() => factorial(Number.NEGATIVE_INFINITY)).toThrow(RangeError);
    });

    test('deve lançar erro quando undefined é passado em tempo de execução', () => {
      expect(() => factorial(undefined as unknown as number)).toThrow(RangeError);
    });

    test('deve lançar erro quando null é passado em tempo de execução', () => {
      expect(() => factorial(null as unknown as number)).toThrow(RangeError);
    });
  });
});