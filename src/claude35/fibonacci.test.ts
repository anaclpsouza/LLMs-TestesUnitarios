import { describe, expect, test } from '@jest/globals';
import { fibonacci } from '../funcoes';

describe('fibonacci', () => {
  describe('Caminho Feliz (Fluxos Positivos)', () => {
    test('deve retornar 0 para n = 0 (primeiro caso base)', () => {
      expect(fibonacci(0)).toBe(0);
    });

    test('deve retornar 1 para n = 1 (segundo caso base)', () => {
      expect(fibonacci(1)).toBe(1);
    });

    test('deve retornar 1 para n = 2', () => {
      expect(fibonacci(2)).toBe(1);
    });

    test('deve retornar 2 para n = 3', () => {
      expect(fibonacci(3)).toBe(2);
    });

    test('deve retornar 3 para n = 4', () => {
      expect(fibonacci(4)).toBe(3);
    });

    test('deve retornar 5 para n = 5', () => {
      expect(fibonacci(5)).toBe(5);
    });

    test('deve retornar 8 para n = 6', () => {
      expect(fibonacci(6)).toBe(8);
    });

    test('deve retornar 13 para n = 7', () => {
      expect(fibonacci(7)).toBe(13);
    });

    test('deve retornar 21 para n = 8', () => {
      expect(fibonacci(8)).toBe(21);
    });

    test('deve retornar 34 para n = 9', () => {
      expect(fibonacci(9)).toBe(34);
    });

    test('deve retornar 55 para n = 10', () => {
      expect(fibonacci(10)).toBe(55);
    });

    test('deve retornar 144 para n = 12', () => {
      expect(fibonacci(12)).toBe(144);
    });

    test('deve retornar 610 para n = 15', () => {
      expect(fibonacci(15)).toBe(610);
    });

    test('deve retornar 6765 para n = 20', () => {
      expect(fibonacci(20)).toBe(6765);
    });
  });

  describe('Propriedades Matemáticas da Sequência', () => {
    test('propriedade: fibonacci(n) === fibonacci(n-1) + fibonacci(n-2) para n >= 2', () => {
      for (let n = 2; n <= 15; n++) {
        expect(fibonacci(n)).toBe(fibonacci(n - 1) + fibonacci(n - 2));
      }
    });

    test('os primeiros 10 termos devem corresponder à sequência clássica', () => {
      const sequenciaEsperada = [0, 1, 1, 2, 3, 5, 8, 13, 21, 34];
      sequenciaEsperada.forEach((valor, indice) => {
        expect(fibonacci(indice)).toBe(valor);
      });
    });

    test('deve ser crescente: fibonacci(n+1) >= fibonacci(n) para n >= 1', () => {
      for (let n = 1; n <= 15; n++) {
        expect(fibonacci(n + 1)).toBeGreaterThanOrEqual(fibonacci(n));
      }
    });

    test('todos os valores para n >= 0 devem ser não negativos', () => {
      for (let n = 0; n <= 10; n++) {
        expect(fibonacci(n)).toBeGreaterThanOrEqual(0);
      }
    });

    test('identidade de Cassini: fibonacci(n-1)*fibonacci(n+1) - fibonacci(n)^2 === (-1)^n', () => {
      for (let n = 1; n <= 10; n++) {
        const cassini =
          fibonacci(n - 1) * fibonacci(n + 1) - fibonacci(n) ** 2;
        const esperado = n % 2 === 0 ? 1 : -1;
        expect(cassini).toBe(esperado);
      }
    });
  });

  describe('Casos de Borda (Edge Cases)', () => {
    test('deve retornar NaN para n = NaN', () => {
      expect(fibonacci(NaN)).toBeNaN();
    });

    test('deve lançar RangeError (stack overflow) para n negativo (-1)', () => {
      expect(() => fibonacci(-1)).toThrow(RangeError);
    });

    test('deve lançar RangeError (stack overflow) para n negativo (-10)', () => {
      expect(() => fibonacci(-10)).toThrow(RangeError);
    });

    test('deve retornar Infinity ou valor impreciso para n muito grande (n = 1500)', () => {
      const resultado = fibonacci(1500);
      expect(typeof resultado).toBe('number');
    });

    test('deve lidar com n = Infinity entrando em recursão infinita / stack overflow', () => {
      expect(() => fibonacci(Infinity)).toThrow(RangeError);
    });

    test('deve lidar com n decimal (n = 1.9) sem garantia de precisão inteira', () => {
      const resultado = fibonacci(1.9);
      expect(typeof resultado).toBe('number');
    });

    test('resultado para n = 0 deve ser estritamente 0 e não falsy genérico', () => {
      expect(fibonacci(0)).toStrictEqual(0);
    });

    test('resultado para n = 1 deve ser estritamente 1', () => {
      expect(fibonacci(1)).toStrictEqual(1);
    });

    test('deve calcular fibonacci(25) corretamente sem perda de precisão', () => {
      expect(fibonacci(25)).toBe(75025);
    });

    test('deve calcular fibonacci(30) corretamente sem perda de precisão', () => {
      expect(fibonacci(30)).toBe(832040);
    });
  });
});