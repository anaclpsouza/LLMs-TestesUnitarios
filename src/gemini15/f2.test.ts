import { fibonacci } from '../funcoes';

describe('fibonacci', () => {
  describe('Caminho Feliz (Fluxos Positivos)', () => {
    it('deve retornar 1 para a posição 2', () => {
      expect(fibonacci(2)).toBe(1);
    });

    it('deve retornar 2 para a posição 3', () => {
      expect(fibonacci(3)).toBe(2);
    });

    it('deve retornar 3 para a posição 4', () => {
      expect(fibonacci(4)).toBe(3);
    });

    it('deve retornar 5 para a posição 5', () => {
      expect(fibonacci(5)).toBe(5);
    });

    it('deve calcular corretamente um valor maior da sequência como a posição 10', () => {
      expect(fibonacci(10)).toBe(55);
    });
  });

  describe('Casos de Borda e Limites (Edge Cases)', () => {
    it('deve retornar 0 para a posição 0 (caso base inicial)', () => {
      expect(fibonacci(0)).toBe(0);
    });

    it('deve retornar 1 para a posição 1 (caso base secundário)', () => {
      expect(fibonacci(1)).toBe(1);
    });

    it('deve lidar com o limite superior de computação aceitável antes de lentidão extrema', () => {
      expect(fibonacci(15)).toBe(610);
    });
  });

  describe('Fluxos Negativos e Comportamentos Inesperados', () => {
    it('deve estourar a pilha de chamadas (RangeError) para números negativos devido à recursão infinita', () => {
      expect(() => fibonacci(-1)).toThrow(RangeError);
    });
  });
});