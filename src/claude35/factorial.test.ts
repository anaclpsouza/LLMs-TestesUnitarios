import { describe, expect, test } from '@jest/globals';
import { factorial } from '../funcoes';

describe('factorial', () => {
  describe('Caminho Feliz (Fluxos Positivos)', () => {
    test('deve retornar 1 para n = 0 (caso base)', () => {
      expect(factorial(0)).toBe(1);
    });

    test('deve retornar 1 para n = 1', () => {
      expect(factorial(1)).toBe(1);
    });

    test('deve retornar 2 para n = 2', () => {
      expect(factorial(2)).toBe(2);
    });

    test('deve retornar 6 para n = 3', () => {
      expect(factorial(3)).toBe(6);
    });

    test('deve retornar 24 para n = 4', () => {
      expect(factorial(4)).toBe(24);
    });

    test('deve retornar 120 para n = 5', () => {
      expect(factorial(5)).toBe(120);
    });

    test('deve retornar 720 para n = 6', () => {
      expect(factorial(6)).toBe(720);
    });

    test('deve retornar 5040 para n = 7', () => {
      expect(factorial(7)).toBe(5040);
    });

    test('deve retornar 40320 para n = 8', () => {
      expect(factorial(8)).toBe(40320);
    });

    test('deve retornar 362880 para n = 9', () => {
      expect(factorial(9)).toBe(362880);
    });

    test('deve retornar 3628800 para n = 10', () => {
      expect(factorial(10)).toBe(3628800);
    });
  });

  describe('Casos de Borda (Edge Cases)', () => {
    test('deve retornar Infinity para n = Infinity', () => {
      expect(factorial(Infinity)).toBe(Infinity);
    });

    test('deve retornar NaN para n = NaN', () => {
      expect(factorial(NaN)).toBeNaN();
    });

    test('deve entrar em recursão infinita / stack overflow para número negativo (-1)', () => {
      expect(() => factorial(-1)).toThrow(RangeError);
    });

    test('deve entrar em recursão infinita / stack overflow para número negativo (-5)', () => {
      expect(() => factorial(-5)).toThrow(RangeError);
    });

    test('deve lidar com n = Number.MAX_SAFE_INTEGER retornando Infinity', () => {
      expect(factorial(Number.MAX_SAFE_INTEGER)).toBe(Infinity);
    });

    test('deve retornar Infinity para valores grandes como n = 171', () => {
      expect(factorial(171)).toBe(Infinity);
    });

    test('deve retornar valor finito para n = 170 (limite superior finito)', () => {
      expect(isFinite(factorial(170))).toBe(true);
    });

    test('deve lidar corretamente com n = 0.5 (número não inteiro)', () => {
      expect(factorial(0.5)).toBeCloseTo(0.5 * factorial(-0.5));
    });

    test('resultado de factorial(n) deve ser sempre maior ou igual a 1 para n >= 0 inteiro', () => {
      [0, 1, 2, 3, 4, 5].forEach((n) => {
        expect(factorial(n)).toBeGreaterThanOrEqual(1);
      });
    });

    test('resultado deve ser crescente: factorial(n+1) > factorial(n) para n >= 1', () => {
      for (let n = 1; n <= 10; n++) {
        expect(factorial(n + 1)).toBeGreaterThan(factorial(n));
      }
    });

    test('propriedade: factorial(n) === n * factorial(n-1) para n >= 1', () => {
      for (let n = 1; n <= 10; n++) {
        expect(factorial(n)).toBe(n * factorial(n - 1));
      }
    });
  });
});