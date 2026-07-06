import { factorial } from '../funcoes';

describe('factorial', () => {
  describe('Caminho Feliz (Fluxos Positivos)', () => {
    it('deve retornar 1 para o fatorial de 1', () => {
      expect(factorial(1)).toBe(1);
    });

    it('deve retornar 2 para o fatorial de 2', () => {
      expect(factorial(2)).toBe(2);
    });

    it('deve retornar 6 para o fatorial de 3', () => {
      expect(factorial(3)).toBe(6);
    });

    it('deve retornar 120 para o fatorial de 5', () => {
      expect(factorial(5)).toBe(120);
    });

    it('deve calcular corretamente o fatorial de um número maior como 10', () => {
      expect(factorial(10)).toBe(3628800);
    });
  });

  describe('Casos de Borda e Limites (Edge Cases)', () => {
    it('deve retornar 1 para o fatorial de 0 (caso base)', () => {
      expect(factorial(0)).toBe(1);
    });

    it('deve lidar com o limite superior seguro antes de estourar a precisão inteira (fatorial de 15)', () => {
      expect(factorial(15)).toBe(1307674368000);
    });
  });

  describe('Fluxos Negativos e Comportamentos Inesperados', () => {
    it('deve estourar a pilha de chamadas (RangeError) para números negativos devido à recursão infinita', () => {
      expect(() => factorial(-1)).toThrow(RangeError);
    });
  });
});