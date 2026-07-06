import { describe, expect, test } from '@jest/globals';
import { gcd } from '../funcoes';

describe('gcd', () => {
  describe('Casos positivos', () => {
    test('deve calcular corretamente o MDC de dois números positivos', () => {
      expect(gcd(48, 18)).toBe(6);
    });

    test('deve calcular corretamente quando os números são coprimos', () => {
      expect(gcd(17, 13)).toBe(1);
    });

    test('deve calcular corretamente quando um número é múltiplo do outro', () => {
      expect(gcd(20, 5)).toBe(5);
    });

    test('deve calcular corretamente para números iguais', () => {
      expect(gcd(7, 7)).toBe(7);
    });

    test('deve calcular corretamente quando a ordem dos parâmetros é invertida', () => {
      expect(gcd(18, 48)).toBe(6);
    });

    test('deve calcular corretamente para números primos grandes', () => {
      expect(gcd(97, 89)).toBe(1);
    });

    test('deve calcular corretamente para números decimais', () => {
      expect(gcd(7.5, 2.5)).toBe(2.5);
    });
  });

  describe('Casos de borda', () => {
    test('deve retornar o primeiro número quando o segundo for zero', () => {
      expect(gcd(10, 0)).toBe(10);
    });

    test('deve retornar o segundo número quando o primeiro for zero', () => {
      expect(gcd(0, 10)).toBe(10);
    });

    test('deve retornar zero quando ambos os números forem zero', () => {
      expect(gcd(0, 0)).toBe(0);
    });

    test('deve lidar corretamente com Number.MAX_SAFE_INTEGER e 1', () => {
      expect(gcd(Number.MAX_SAFE_INTEGER, 1)).toBe(1);
    });

    test('deve lidar corretamente com números negativos', () => {
      expect(gcd(-48, 18)).toBe(6);
    });

    test('deve lidar corretamente quando ambos os números são negativos', () => {
      expect(Math.abs(gcd(-48, -18))).toBe(6);
    });

    test('deve lidar corretamente quando o segundo número é negativo', () => {
      expect(Math.abs(gcd(48, -18))).toBe(6);
    });
  });

  describe('Entradas inválidas ou não tratadas explicitamente', () => {
    test('deve lançar RangeError para NaN como primeiro parâmetro', () => {
      expect(() => gcd(Number.NaN, 5)).toThrow(RangeError);
    });

    test('deve lançar RangeError para NaN como segundo parâmetro', () => {
      expect(() => gcd(5, Number.NaN)).toThrow(RangeError);
    });

    test('deve lançar RangeError para Infinity como primeiro parâmetro', () => {
      expect(() => gcd(Number.POSITIVE_INFINITY, 5)).toThrow(RangeError);
    });

    test('deve lançar RangeError para Infinity como segundo parâmetro', () => {
      expect(() => gcd(5, Number.POSITIVE_INFINITY)).toThrow(RangeError);
    });

    test('deve lançar TypeError quando o primeiro parâmetro for undefined', () => {
      expect(() => gcd(undefined as unknown as number, 5)).toThrow(TypeError);
    });

    test('deve lançar TypeError quando o segundo parâmetro for undefined', () => {
      expect(() => gcd(5, undefined as unknown as number)).toThrow(TypeError);
    });

    test('deve lançar TypeError quando o primeiro parâmetro for null', () => {
      expect(() => gcd(null as unknown as number, 5)).toThrow(TypeError);
    });

    test('deve lançar TypeError quando o segundo parâmetro for null', () => {
      expect(() => gcd(5, null as unknown as number)).toThrow(TypeError);
    });
  });
});