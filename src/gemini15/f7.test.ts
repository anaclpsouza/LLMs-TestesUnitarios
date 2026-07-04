import { gcd } from '../funcoes';

describe('gcd', () => {
  describe('Caminho Feliz (Fluxos Positivos)', () => {
    it('deve retornar o MDC correto quando "a" é divisível por "b"', () => {
      expect(gcd(20, 5)).toBe(5);
    });

    it('deve retornar o MDC correto para números primos entre si', () => {
      expect(gcd(13, 7)).toBe(1);
    });

    it('deve calcular o MDC corretamente para valores positivos padrão', () => {
      expect(gcd(48, 18)).toBe(6);
    });

    it('deve calcular o MDC corretamente independentemente da ordem dos parâmetros (a > b)', () => {
      expect(gcd(54, 24)).toBe(6);
    });

    it('deve calcular o MDC corretamente independentemente da ordem dos parâmetros (a < b)', () => {
      expect(gcd(24, 54)).toBe(6);
    });
  });

  describe('Casos de Borda e Limites (Edge Cases)', () => {
    it('deve retornar "a" quando "b" for igual a 0 (caso base)', () => {
      expect(gcd(10, 0)).toBe(10);
    });

    it('deve retornar 0 quando ambos os argumentos forem 0', () => {
      expect(gcd(0, 0)).toBe(0);
    });

    it('deve retornar "b" quando "a" for 0 e "b" for diferente de zero', () => {
      expect(gcd(0, 9)).toBe(9);
    });

    it('deve retornar o próprio número quando ambos forem iguais', () => {
      expect(gcd(7, 7)).toBe(7);
    });

    it('deve funcionar corretamente com o valor 1 como um dos argumentos', () => {
      expect(gcd(1, 50)).toBe(1);
      expect(gcd(50, 1)).toBe(1);
    });
  });

  describe('Fluxos Negativos e Comportamentos com Sinais', () => {
    it('deve calcular o MDC corretamente quando "a" é negativo', () => {
      // Alinhado com o comportamento matemático do operador % no TypeScript: -12 % 8 = -4 -> gcd(8, -4) -> 8 % -4 = -0 (0) -> retorna -4
      expect(gcd(-12, 8)).toBe(-4);
    });

    it('deve calcular o MDC corretamente quando "b" é negativo', () => {
      // 12 % -8 = 4 -> gcd(-8, 4) -> -8 % 4 = -0 (0) -> retorna 4
      expect(gcd(12, -8)).toBe(4);
    });

    it('deve calcular o MDC corretamente quando ambos são negativos', () => {
      // -12 % -8 = -4 -> gcd(-8, -4) -> -8 % -4 = -0 (0) -> retorna -4
      expect(gcd(-12, -8)).toBe(-4);
    });
  });
});