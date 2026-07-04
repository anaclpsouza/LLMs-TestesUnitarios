import { describe, expect, test } from '@jest/globals';
import { is_palindrome } from '../funcoes';

describe('is_palindrome', () => {
  describe('Casos positivos', () => {
    test('deve retornar true para string vazia', () => {
      expect(is_palindrome('')).toBe(true);
    });

    test('deve retornar true para string com um único caractere', () => {
      expect(is_palindrome('a')).toBe(true);
    });

    test('deve retornar true para palíndromo com quantidade par de caracteres', () => {
      expect(is_palindrome('abba')).toBe(true);
    });

    test('deve retornar true para palíndromo com quantidade ímpar de caracteres', () => {
      expect(is_palindrome('radar')).toBe(true);
    });

    test('deve retornar true para outro palíndromo conhecido', () => {
      expect(is_palindrome('arara')).toBe(true);
    });

    test('deve considerar espaços como parte da string', () => {
      expect(is_palindrome('a b a')).toBe(true);
    });

    test('deve considerar caracteres especiais', () => {
      expect(is_palindrome('!@##@!')).toBe(true);
    });

    test('deve considerar números como caracteres válidos', () => {
      expect(is_palindrome('12321')).toBe(true);
    });

    test('deve considerar letras acentuadas corretamente', () => {
      expect(is_palindrome('osso')).toBe(true);
    });
  });

  describe('Casos negativos', () => {
    test('deve retornar false para string que não é palíndromo', () => {
      expect(is_palindrome('chatgpt')).toBe(false);
    });

    test('deve retornar false quando apenas o primeiro e último caracteres diferem', () => {
      expect(is_palindrome('abca')).toBe(false);
    });

    test('deve diferenciar letras maiúsculas e minúsculas', () => {
      expect(is_palindrome('Aa')).toBe(false);
    });

    test('deve considerar espaços na comparação', () => {
      expect(is_palindrome('nurses run')).toBe(false);
    });

    test('deve retornar false para sequência numérica que não é palíndromo', () => {
      expect(is_palindrome('12345')).toBe(false);
    });
  });

  describe('Casos de borda', () => {
    test('deve retornar true para dois caracteres iguais', () => {
      expect(is_palindrome('aa')).toBe(true);
    });

    test('deve retornar false para dois caracteres diferentes', () => {
      expect(is_palindrome('ab')).toBe(false);
    });

    test('deve lidar corretamente com palíndromo longo', () => {
      const texto = 'amanaplanacanalpanamaamanaplanacanalpanama';
      expect(is_palindrome(texto)).toBe(true);
    });

    test('deve retornar true para string composta apenas por espaços', () => {
      expect(is_palindrome('     ')).toBe(true);
    });
  });

  describe('Entradas inválidas ou não tratadas explicitamente', () => {
    test('deve lançar TypeError quando a entrada for null', () => {
      expect(() => is_palindrome(null as unknown as string)).toThrow(TypeError);
    });

    test('deve lançar TypeError quando a entrada for undefined', () => {
      expect(() => is_palindrome(undefined as unknown as string)).toThrow(TypeError);
    });

    test('deve lançar TypeError quando um número for passado em tempo de execução', () => {
      expect(() => is_palindrome(12321 as unknown as string)).toThrow(TypeError);
    });

    test('deve lançar TypeError quando um objeto for passado em tempo de execução', () => {
      expect(() => is_palindrome({} as unknown as string)).toThrow(TypeError);
    });

    test('deve lançar TypeError quando um array for passado em tempo de execução', () => {
      expect(() => is_palindrome([] as unknown as string)).toThrow(TypeError);
    });
  });
});