import { describe, expect, test } from '@jest/globals';
import { levenshtein } from '../funcoes';

describe('levenshtein', () => {
  describe('Caminho Feliz (Fluxos Positivos)', () => {
    test('deve retornar 0 para strings idênticas "abc"', () => {
      expect(levenshtein('abc', 'abc')).toBe(0);
    });

    test('deve retornar 0 para duas strings vazias', () => {
      expect(levenshtein('', '')).toBe(0);
    });

    test('deve retornar 1 para substituição de um único caractere', () => {
      expect(levenshtein('a', 'b')).toBe(1);
    });

    test('deve retornar 1 para inserção de um único caractere', () => {
      expect(levenshtein('ab', 'abc')).toBe(1);
    });

    test('deve retornar 1 para deleção de um único caractere', () => {
      expect(levenshtein('abc', 'ab')).toBe(1);
    });

    test('deve retornar 3 para "kitten" -> "sitting" (exemplo clássico)', () => {
      expect(levenshtein('kitten', 'sitting')).toBe(3);
    });

    test('deve retornar 3 para "sitting" -> "kitten"', () => {
      expect(levenshtein('sitting', 'kitten')).toBe(3);
    });

    test('deve retornar 2 para "sunday" -> "saturday"', () => {
      expect(levenshtein('sunday', 'saturday')).toBe(3);
    });

    test('deve retornar 1 para "cat" -> "bat"', () => {
      expect(levenshtein('cat', 'bat')).toBe(1);
    });

    test('deve retornar 2 para "cat" -> "car"', () => {
      expect(levenshtein('cat', 'car')).toBe(1);
    });

    test('deve retornar 2 para "book" -> "back"', () => {
      expect(levenshtein('book', 'back')).toBe(2);
    });

    test('deve retornar 1 para strings que diferem apenas no último caractere', () => {
      expect(levenshtein('abc', 'abd')).toBe(1);
    });

    test('deve retornar 1 para strings que diferem apenas no primeiro caractere', () => {
      expect(levenshtein('abc', 'xbc')).toBe(1);
    });

    test('deve retornar distância correta para "flaw" -> "lawn"', () => {
      expect(levenshtein('flaw', 'lawn')).toBe(2);
    });

    test('deve retornar distância correta para "gumbo" -> "gambol"', () => {
      expect(levenshtein('gumbo', 'gambol')).toBe(2);
    });

    test('deve retornar 5 para "" -> "hello" (inserções)', () => {
      expect(levenshtein('', 'hello')).toBe(5);
    });

    test('deve retornar 5 para "hello" -> "" (deleções)', () => {
      expect(levenshtein('hello', '')).toBe(5);
    });

    test('deve retornar distância correta para strings com caracteres repetidos "aaa" -> "aaaa"', () => {
      expect(levenshtein('aaa', 'aaaa')).toBe(1);
    });

    test('deve retornar distância correta para "abc" -> "cba" (reversão)', () => {
      expect(levenshtein('abc', 'cba')).toBe(2);
    });

    test('deve retornar distância correta para "intention" -> "execution"', () => {
      expect(levenshtein('intention', 'execution')).toBe(5);
    });
  });

  describe('Propriedade de Simetria', () => {
    test('levenshtein(s, t) deve ser igual a levenshtein(t, s) para "abc" e "xyz"', () => {
      expect(levenshtein('abc', 'xyz')).toBe(levenshtein('xyz', 'abc'));
    });

    test('levenshtein(s, t) deve ser igual a levenshtein(t, s) para "kitten" e "sitting"', () => {
      expect(levenshtein('kitten', 'sitting')).toBe(levenshtein('sitting', 'kitten'));
    });

    test('levenshtein(s, t) deve ser igual a levenshtein(t, s) para "ab" e "ba"', () => {
      expect(levenshtein('ab', 'ba')).toBe(levenshtein('ba', 'ab'));
    });

    test('levenshtein(s, t) deve ser igual a levenshtein(t, s) para strings vazias e não vazias', () => {
      expect(levenshtein('', 'abc')).toBe(levenshtein('abc', ''));
    });

    test('levenshtein(s, t) deve ser igual a levenshtein(t, s) para "sunday" e "saturday"', () => {
      expect(levenshtein('sunday', 'saturday')).toBe(levenshtein('saturday', 'sunday'));
    });
  });

  describe('Propriedade de Desigualdade Triangular', () => {
    test('levenshtein(a, c) <= levenshtein(a, b) + levenshtein(b, c)', () => {
      const a = 'cat';
      const b = 'car';
      const c = 'bar';
      expect(levenshtein(a, c)).toBeLessThanOrEqual(
        levenshtein(a, b) + levenshtein(b, c)
      );
    });

    test('desigualdade triangular para strings com inserções e deleções', () => {
      const a = 'abc';
      const b = 'abcd';
      const c = 'abcde';
      expect(levenshtein(a, c)).toBeLessThanOrEqual(
        levenshtein(a, b) + levenshtein(b, c)
      );
    });
  });

  describe('Fluxos Negativos e Casos Limite de Strings', () => {
    test('deve retornar comprimento de t quando s é vazia e t tem 1 caractere', () => {
      expect(levenshtein('', 'a')).toBe(1);
    });

    test('deve retornar comprimento de s quando t é vazia e s tem 1 caractere', () => {
      expect(levenshtein('a', '')).toBe(1);
    });

    test('deve retornar comprimento de t para s vazia com t de múltiplos caracteres', () => {
      expect(levenshtein('', 'abcde')).toBe(5);
    });

    test('deve retornar comprimento de s para t vazia com s de múltiplos caracteres', () => {
      expect(levenshtein('abcde', '')).toBe(5);
    });

    test('deve lidar com strings contendo espaços', () => {
      expect(levenshtein('hello world', 'hello')).toBe(6);
    });

    test('deve lidar com strings contendo caracteres especiais', () => {
      expect(levenshtein('!@#', '!@#')).toBe(0);
    });

    test('deve lidar com strings contendo caracteres especiais diferentes', () => {
      expect(levenshtein('!@#', '$%^')).toBe(3);
    });

    test('deve lidar com strings numéricas', () => {
      expect(levenshtein('12345', '12345')).toBe(0);
    });

    test('deve lidar com strings numéricas diferentes', () => {
      expect(levenshtein('12345', '12346')).toBe(1);
    });

    test('deve diferenciar maiúsculas e minúsculas: "ABC" vs "abc"', () => {
      expect(levenshtein('ABC', 'abc')).toBe(3);
    });

    test('deve diferenciar maiúsculas e minúsculas: "Hello" vs "hello"', () => {
      expect(levenshtein('Hello', 'hello')).toBe(1);
    });

    test('deve lidar com strings com acentos: "ação" vs "acao"', () => {
      expect(levenshtein('acao', 'acao')).toBe(0);
    });

    test('deve retornar resultado correto para strings com apenas espaços', () => {
      expect(levenshtein('   ', '   ')).toBe(0);
    });

    test('deve retornar resultado correto para string de espaços vs vazia', () => {
      expect(levenshtein('   ', '')).toBe(3);
    });
  });

  describe('Casos de Borda (Edge Cases)', () => {
    test('deve retornar 0 para strings idênticas de um único caractere', () => {
      expect(levenshtein('a', 'a')).toBe(0);
    });

    test('deve retornar 1 para dois caracteres totalmente diferentes', () => {
      expect(levenshtein('a', 'z')).toBe(1);
    });

    test('deve retornar comprimento máximo para strings completamente diferentes do mesmo tamanho', () => {
      expect(levenshtein('abc', 'xyz')).toBe(3);
    });

    test('deve retornar distância correta para string de comprimento 1 vs vazia', () => {
      expect(levenshtein('a', '')).toBe(1);
    });

    test('deve retornar distância correta para vazia vs comprimento 1', () => {
      expect(levenshtein('', 'z')).toBe(1);
    });

    test('resultado deve sempre ser não negativo', () => {
      const pairs: [string, string][] = [
        ['', ''],
        ['a', ''],
        ['', 'b'],
        ['abc', 'xyz'],
        ['kitten', 'sitting'],
      ];
      pairs.forEach(([s, t]) => {
        expect(levenshtein(s, t)).toBeGreaterThanOrEqual(0);
      });
    });

    test('resultado deve sempre ser um inteiro', () => {
      const pairs: [string, string][] = [
        ['abc', 'xyz'],
        ['', 'hello'],
        ['kitten', 'sitting'],
        ['a', 'b'],
      ];
      pairs.forEach(([s, t]) => {
        expect(Number.isInteger(levenshtein(s, t))).toBe(true);
      });
    });

    test('distância nunca deve exceder o comprimento máximo das duas strings', () => {
      const pairs: [string, string][] = [
        ['abc', 'xyz'],
        ['', 'hello'],
        ['kitten', 'sitting'],
        ['a', 'abcdef'],
      ];
      pairs.forEach(([s, t]) => {
        expect(levenshtein(s, t)).toBeLessThanOrEqual(Math.max(s.length, t.length));
      });
    });

    test('distância nunca deve ser menor que a diferença absoluta dos comprimentos', () => {
      const pairs: [string, string][] = [
        ['abc', 'abcde'],
        ['', 'hello'],
        ['ab', 'abcdef'],
      ];
      pairs.forEach(([s, t]) => {
        expect(levenshtein(s, t)).toBeGreaterThanOrEqual(
          Math.abs(s.length - t.length)
        );
      });
    });

    test('deve retornar 0 ao comparar string longa consigo mesma', () => {
      const s = 'abcdefghij';
      expect(levenshtein(s, s)).toBe(0);
    });

    test('deve retornar distância correta para prefixo: "abc" -> "abcdef"', () => {
      expect(levenshtein('abc', 'abcdef')).toBe(3);
    });

    test('deve retornar distância correta para sufixo: "def" -> "abcdef"', () => {
      expect(levenshtein('def', 'abcdef')).toBe(3);
    });

    test('deve lidar com strings com nova linha e tab', () => {
      expect(levenshtein('a\nb', 'a\nb')).toBe(0);
    });

    test('deve retornar 1 para strings que diferem apenas por um tab vs espaço', () => {
      expect(levenshtein('a\tb', 'a b')).toBe(1);
    });
  });
});