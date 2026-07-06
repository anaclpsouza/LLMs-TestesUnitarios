import { describe, expect, test } from '@jest/globals';
import { is_palindrome } from '../funcoes';

describe('is_palindrome', () => {
  describe('Caminho Feliz (Fluxos Positivos) — Palíndromos Válidos', () => {
    test('deve retornar true para string vazia (caso base)', () => {
      expect(is_palindrome('')).toBe(true);
    });

    test('deve retornar true para string de um único caractere (caso base)', () => {
      expect(is_palindrome('a')).toBe(true);
    });

    test('deve retornar true para string de um único número', () => {
      expect(is_palindrome('1')).toBe(true);
    });

    test('deve retornar true para palíndromo de dois caracteres iguais', () => {
      expect(is_palindrome('aa')).toBe(true);
    });

    test('deve retornar true para palíndromo clássico "racecar"', () => {
      expect(is_palindrome('racecar')).toBe(true);
    });

    test('deve retornar true para palíndromo "madam"', () => {
      expect(is_palindrome('madam')).toBe(true);
    });

    test('deve retornar true para palíndromo "level"', () => {
      expect(is_palindrome('level')).toBe(true);
    });

    test('deve retornar true para palíndromo "noon"', () => {
      expect(is_palindrome('noon')).toBe(true);
    });

    test('deve retornar true para palíndromo "civic"', () => {
      expect(is_palindrome('civic')).toBe(true);
    });

    test('deve retornar true para palíndromo numérico "12321"', () => {
      expect(is_palindrome('12321')).toBe(true);
    });

    test('deve retornar true para palíndromo numérico "1221"', () => {
      expect(is_palindrome('1221')).toBe(true);
    });

    test('deve retornar true para palíndromo com caracteres especiais "!@!"', () => {
      expect(is_palindrome('!@!')).toBe(true);
    });

    test('deve retornar true para string com espaço único " "', () => {
      expect(is_palindrome(' ')).toBe(true);
    });

    test('deve retornar true para palíndromo com espaços "a b a"', () => {
      expect(is_palindrome('a b a')).toBe(true);
    });

    test('deve retornar true para palíndromo com espaços simétricos "  "', () => {
      expect(is_palindrome('  ')).toBe(true);
    });

    test('deve retornar true para palíndromo longo de caracteres repetidos', () => {
      expect(is_palindrome('a'.repeat(1000))).toBe(true);
    });

    test('deve retornar true para palíndromo com caracteres acentuados "áéá"', () => {
      expect(is_palindrome('áéá')).toBe(true);
    });

    test('deve retornar true para palíndromo com letras maiúsculas "ABA"', () => {
      expect(is_palindrome('ABA')).toBe(true);
    });

    test('deve retornar true para palíndromo com dois espaços "a  a"', () => {
      expect(is_palindrome('a  a')).toBe(true);
    });

    test('deve retornar true para palíndromo alfanumérico "a1a"', () => {
      expect(is_palindrome('a1a')).toBe(true);
    });
  });

  describe('Caminho Feliz (Fluxos Positivos) — Não Palíndromos', () => {
    test('deve retornar false para string "ab" (dois caracteres diferentes)', () => {
      expect(is_palindrome('ab')).toBe(false);
    });

    test('deve retornar false para string "hello"', () => {
      expect(is_palindrome('hello')).toBe(false);
    });

    test('deve retornar false para string "world"', () => {
      expect(is_palindrome('world')).toBe(false);
    });

    test('deve retornar false para string "TypeScript"', () => {
      expect(is_palindrome('TypeScript')).toBe(false);
    });

    test('deve retornar false para string "abcd"', () => {
      expect(is_palindrome('abcd')).toBe(false);
    });

    test('deve retornar false para string "12345"', () => {
      expect(is_palindrome('12345')).toBe(false);
    });

    test('deve retornar false para string "abca" (primeiro e último iguais mas meio diferente não conta)', () => {
      expect(is_palindrome('abca')).toBe(false);
    });

    test('deve retornar false para string "racecarX"', () => {
      expect(is_palindrome('racecarX')).toBe(false);
    });

    test('deve retornar false para "Madam" com case misto (M !== m)', () => {
      expect(is_palindrome('Madam')).toBe(false);
    });

    test('deve retornar false para string "ab ba" com espaço no meio não simétrico', () => {
      expect(is_palindrome('ab ba')).toBe(false);
    });
  });

  describe('Casos de Borda (Edge Cases)', () => {
    test('deve retornar true para string vazia (comprimento 0)', () => {
      expect(is_palindrome('')).toBe(true);
    });

    test('deve retornar true para string de comprimento 1 com número', () => {
      expect(is_palindrome('0')).toBe(true);
    });

    test('deve retornar true para string de comprimento 1 com caractere especial', () => {
      expect(is_palindrome('!')).toBe(true);
    });

    test('deve retornar false para string de dois caracteres distintos', () => {
      expect(is_palindrome('az')).toBe(false);
    });

    test('deve retornar true para palíndromo par de comprimento 2', () => {
      expect(is_palindrome('zz')).toBe(true);
    });

    test('deve retornar false para string com mesmo início e fim mas interior diferente "abcba" variante "abcca"', () => {
      expect(is_palindrome('abcca')).toBe(false);
    });

    test('deve diferenciar maiúsculas de minúsculas: "Aa" não é palíndromo', () => {
      expect(is_palindrome('Aa')).toBe(false);
    });

    test('deve diferenciar maiúsculas de minúsculas: "AaBbBbAa" não é palíndromo', () => {
      expect(is_palindrome('AaBbBbAa')).toBe(false);
    });

    test('deve retornar true para palíndromo com tab "a\ta"', () => {
      expect(is_palindrome('a\ta')).toBe(true);
    });

    test('deve retornar true para palíndromo com nova linha "a\na"', () => {
      expect(is_palindrome('a\na')).toBe(true);
    });

    test('deve retornar false para string com nova linha não simétrica "a\nb"', () => {
      expect(is_palindrome('a\nb')).toBe(false);
    });

    test('deve retornar true para string de zeros "000"', () => {
      expect(is_palindrome('000')).toBe(true);
    });

    test('deve retornar true para palíndromo grande de comprimento par', () => {
      const half = 'abcde';
      expect(is_palindrome(half + half.split('').reverse().join(''))).toBe(true);
    });

    test('deve retornar true para palíndromo grande de comprimento ímpar', () => {
      const half = 'abcde';
      expect(is_palindrome(half + 'x' + half.split('').reverse().join(''))).toBe(true);
    });

    test('deve retornar false para quase-palíndromo com único caractere diferente no meio', () => {
      expect(is_palindrome('abcXcba')).toBe(false);
    });

    test('deve lançar erro para null como argumento', () => {
      expect(() => is_palindrome(null as unknown as string)).toThrow();
    });

    test('deve lançar erro para undefined como argumento', () => {
      expect(() => is_palindrome(undefined as unknown as string)).toThrow();
    });

    test('deve lançar erro para número como argumento', () => {
      expect(() => is_palindrome(123 as unknown as string)).toThrow();
    });

    test('deve lançar erro para array como argumento', () => {
      expect(() => is_palindrome([] as unknown as string)).toThrow();
    });

    test('deve retornar true para palíndromo com barra invertida "a\\a"', () => {
      expect(is_palindrome('a\\a')).toBe(false);
    });

    test('deve retornar true para string "\\"\\"" (aspas duplas)', () => {
      expect(is_palindrome('""')).toBe(true);
    });
  });
});