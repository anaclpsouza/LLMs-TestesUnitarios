import { is_palindrome } from '../funcoes';

describe('is_palindrome', () => {
  describe('Caminho Feliz (Fluxos Positivos)', () => {
    it('deve retornar true para uma palavra palíndroma com número ímpar de caracteres', () => {
      expect(is_palindrome('arara')).toBe(true);
    });

    it('deve retornar true para uma palavra palíndroma com número par de caracteres', () => {
      expect(is_palindrome('anna')).toBe(true);
    });

    it('deve retornar false para uma string comum que não é um palíndromo', () => {
      expect(is_palindrome('typescript')).toBe(false);
    });

    it('deve retornar false quando os caracteres das extremidades são iguais mas o miolo não é palíndromo', () => {
      expect(is_palindrome('abXbaYab')).toBe(false);
    });
  });

  describe('Casos de Borda e Limites (Edge Cases)', () => {
    it('deve retornar true para uma string vazia (caso base de comprimento 0)', () => {
      expect(is_palindrome('')).toBe(true);
    });

    it('deve retornar true para uma string de apenas um caractere (caso base de comprimento 1)', () => {
      expect(is_palindrome('x')).toBe(true);
    });

    it('deve ser sensível a maiúsculas e minúsculas (case-sensitive) conforme a lógica da função', () => {
      expect(is_palindrome('Arara')).toBe(false);
    });

    it('deve considerar espaços em branco no cálculo do palíndromo', () => {
      expect(is_palindrome('socorram me subi no onibus em marrocos')).toBe(false); // Falso sem normalização prévia
      expect(is_palindrome('subi no onibus')).toBe(false);
      expect(is_palindrome('aba aba')).toBe(true);
    });

    it('deve validar corretamente palíndromos numéricos em formato de string', () => {
      expect(is_palindrome('12321')).toBe(true);
      expect(is_palindrome('12341')).toBe(false);
    });

    it('deve lidar corretamente com caracteres especiais e pontuações', () => {
      expect(is_palindrome('!@#@!')).toBe(true);
      expect(is_palindrome('!@#$!')).toBe(false);
    });
  });

  describe('Fluxos de Cobertura de Ramos (Branch Coverage)', () => {
    it('deve retornar false imediatamente quando o primeiro e o último caractere divergirem', () => {
      expect(is_palindrome('xyz')).toBe(false);
    });

    it('deve percorrer toda a recursão e retornar true quando todos os pares internos coincidirem', () => {
      expect(is_palindrome('redivider')).toBe(true);
    });
  });
});