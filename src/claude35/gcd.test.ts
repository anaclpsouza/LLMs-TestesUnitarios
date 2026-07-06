import { describe, expect, test } from '@jest/globals';
import { gcd } from '../funcoes';

describe('gcd', () => {
  describe('Caminho Feliz (Fluxos Positivos)', () => {
    test('deve retornar 1 para gcd(1, 1)', () => {
      expect(gcd(1, 1)).toBe(1);
    });

    test('deve retornar 1 para gcd(1, 5)', () => {
      expect(gcd(1, 5)).toBe(1);
    });

    test('deve retornar 1 para gcd(5, 1)', () => {
      expect(gcd(5, 1)).toBe(1);
    });

    test('deve retornar 2 para gcd(2, 4)', () => {
      expect(gcd(2, 4)).toBe(2);
    });

    test('deve retornar 2 para gcd(4, 2)', () => {
      expect(gcd(4, 2)).toBe(2);
    });

    test('deve retornar 6 para gcd(12, 18)', () => {
      expect(gcd(12, 18)).toBe(6);
    });

    test('deve retornar 6 para gcd(18, 12)', () => {
      expect(gcd(18, 12)).toBe(6);
    });

    test('deve retornar 5 para gcd(10, 15)', () => {
      expect(gcd(10, 15)).toBe(5);
    });

    test('deve retornar 7 para gcd(14, 21)', () => {
      expect(gcd(14, 21)).toBe(7);
    });

    test('deve retornar 12 para gcd(12, 12) (números iguais)', () => {
      expect(gcd(12, 12)).toBe(12);
    });

    test('deve retornar 100 para gcd(100, 200)', () => {
      expect(gcd(100, 200)).toBe(100);
    });

    test('deve retornar 1 para gcd(13, 17) (números primos entre si)', () => {
      expect(gcd(13, 17)).toBe(1);
    });

    test('deve retornar 1 para gcd(17, 13)', () => {
      expect(gcd(17, 13)).toBe(1);
    });

    test('deve retornar 4 para gcd(8, 12)', () => {
      expect(gcd(8, 12)).toBe(4);
    });

    test('deve retornar 3 para gcd(9, 6)', () => {
      expect(gcd(9, 6)).toBe(3);
    });

    test('deve retornar 21 para gcd(252, 105)', () => {
      expect(gcd(252, 105)).toBe(21);
    });

    test('deve retornar 1 para gcd(2, 3) (primos consecutivos)', () => {
      expect(gcd(2, 3)).toBe(1);
    });

    test('deve retornar 2 para gcd(2, 100)', () => {
      expect(gcd(2, 100)).toBe(2);
    });

    test('deve retornar corretamente para números grandes: gcd(123456, 789012)', () => {
      expect(gcd(123456, 789012)).toBe(12);
    });

    test('propriedade comutativa: gcd(a, b) === gcd(b, a)', () => {
      const pairs = [[12, 18], [35, 49], [100, 75], [17, 31], [252, 105]];
      pairs.forEach(([a, b]) => {
        expect(gcd(a, b)).toBe(gcd(b, a));
      });
    });

    test('propriedade: gcd(a, a) === a para qualquer a positivo', () => {
      [1, 2, 5, 10, 100].forEach((n) => {
        expect(gcd(n, n)).toBe(n);
      });
    });

    test('propriedade: resultado divide ambos os argumentos exatamente', () => {
      const pairs = [[12, 18], [35, 49], [100, 75], [252, 105]];
      pairs.forEach(([a, b]) => {
        const result = gcd(a, b);
        expect(a % result).toBe(0);
        expect(b % result).toBe(0);
      });
    });
  });

  describe('Caso Base — b === 0', () => {
    test('deve retornar a para gcd(a, 0): gcd(5, 0) === 5', () => {
      expect(gcd(5, 0)).toBe(5);
    });

    test('deve retornar a para gcd(a, 0): gcd(1, 0) === 1', () => {
      expect(gcd(1, 0)).toBe(1);
    });

    test('deve retornar a para gcd(a, 0): gcd(100, 0) === 100', () => {
      expect(gcd(100, 0)).toBe(100);
    });

    test('deve retornar 0 para gcd(0, 0)', () => {
      expect(gcd(0, 0)).toBe(0);
    });

    test('deve retornar b para gcd(0, b): gcd(0, 5) === 5', () => {
      expect(gcd(0, 5)).toBe(5);
    });

    test('deve retornar b para gcd(0, b): gcd(0, 100) === 100', () => {
      expect(gcd(0, 100)).toBe(100);
    });
  });

  describe('Casos de Borda (Edge Cases)', () => {
    test('deve lidar com Number.MAX_SAFE_INTEGER e 1: gcd(MAX, 1) === 1', () => {
      expect(gcd(Number.MAX_SAFE_INTEGER, 1)).toBe(1);
    });

    test('deve lidar com Number.MAX_SAFE_INTEGER e si mesmo', () => {
      expect(gcd(Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER)).toBe(Number.MAX_SAFE_INTEGER);
    });

    test('deve retornar valor negativo para gcd(-5, 0) (retorna a diretamente)', () => {
      expect(gcd(-5, 0)).toBe(-5);
    });

    test('deve lidar com gcd(-12, 8): resultado pode ser negativo pelo algoritmo', () => {
      const result = gcd(-12, 8);
      expect(Math.abs(result)).toBe(4);
    });

    test('deve lidar com gcd(12, -8): resultado pode ser negativo pelo algoritmo', () => {
      const result = gcd(12, -8);
      expect(Math.abs(result)).toBe(4);
    });

    test('deve lidar com gcd(-12, -18): resultado consistente com Euclidiano', () => {
      const result = gcd(-12, -18);
      expect(Math.abs(result)).toBe(6);
    });

    test('deve lidar com gcd(0, -5): retorna -5 pela recursão', () => {
      expect(gcd(0, -5)).toBe(-5);
    });

    test('deve retornar NaN para gcd(NaN, 5)', () => {
      expect(gcd(NaN, 5)).toBeNaN();
    });

    test('deve retornar NaN para gcd(5, NaN)', () => {
      expect(gcd(5, NaN)).toBeNaN();
    });

    test('deve retornar NaN para gcd(NaN, NaN)', () => {
      expect(gcd(NaN, NaN)).toBeNaN();
    });

    test('deve lidar com gcd(Infinity, 1) sem travar', () => {
      const result = gcd(Infinity, 1);
      expect(typeof result).toBe('number');
    });

    test('deve lidar com gcd(1.5, 0.5) retornando valor numérico (floats)', () => {
      const result = gcd(1.5, 0.5);
      expect(typeof result).toBe('number');
    });

    test('deve retornar 1 para dois primos distintos gcd(7, 11)', () => {
      expect(gcd(7, 11)).toBe(1);
    });

    test('deve retornar 1 para dois primos distintos gcd(97, 89)', () => {
      expect(gcd(97, 89)).toBe(1);
    });

    test('deve retornar o próprio número para gcd(n, 0) quando n é primo', () => {
      [2, 3, 5, 7, 11, 13].forEach((prime) => {
        expect(gcd(prime, 0)).toBe(prime);
      });
    });

    test('deve retornar 1 para gcd entre quaisquer dois primos distintos', () => {
      const primes = [2, 3, 5, 7, 11, 13];
      for (let i = 0; i < primes.length; i++) {
        for (let j = i + 1; j < primes.length; j++) {
          expect(gcd(primes[i], primes[j])).toBe(1);
        }
      }
    });

    test('deve lidar com gcd(2, Number.MAX_SAFE_INTEGER) retornando 1 (MAX é ímpar)', () => {
      expect(gcd(2, Number.MAX_SAFE_INTEGER)).toBe(1);
    });
  });
});