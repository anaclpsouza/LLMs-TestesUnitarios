import { describe, expect, test } from '@jest/globals';
import { levenshtein } from '../funcoes';

describe('levenshtein', () => {
  describe('Casos positivos', () => {
    test('deve retornar 0 para strings idênticas', () => {
      expect(levenshtein('abc', 'abc')).toBe(0);
    });

    test('deve retornar 0 para duas strings vazias', () => {
      expect(levenshtein('', '')).toBe(0);
    });

    test('deve calcular corretamente uma inserção', () => {
      expect(levenshtein('abc', 'abdc')).toBe(1);
    });

    test('deve calcular corretamente uma remoção', () => {
      expect(levenshtein('abcd', 'acd')).toBe(1);
    });

    test('deve calcular corretamente uma substituição', () => {
      expect(levenshtein('cat', 'cut')).toBe(1);
    });

    test('deve calcular corretamente múltiplas operações', () => {
      expect(levenshtein('kitten', 'sitting')).toBe(3);
    });

    test('deve calcular corretamente outro exemplo conhecido', () => {
      expect(levenshtein('flaw', 'lawn')).toBe(2);
    });

    test('deve calcular corretamente quando apenas o último caractere difere', () => {
      expect(levenshtein('abcd', 'abce')).toBe(1);
    });

    test('deve calcular corretamente para números representados como strings', () => {
      expect(levenshtein('12345', '12395')).toBe(1);
    });
  });

  describe('Casos de borda', () => {
    test('deve retornar o tamanho da segunda string quando a primeira for vazia', () => {
      expect(levenshtein('', 'teste')).toBe(5);
    });

    test('deve retornar o tamanho da primeira string quando a segunda for vazia', () => {
      expect(levenshtein('teste', '')).toBe(5);
    });

    test('deve considerar espaços como caracteres válidos', () => {
      expect(levenshtein('a b', 'ab')).toBe(1);
    });

    test('deve considerar diferença entre maiúsculas e minúsculas', () => {
      expect(levenshtein('Casa', 'casa')).toBe(1);
    });

    test('deve lidar corretamente com caracteres especiais', () => {
      expect(levenshtein('!@#', '!$#')).toBe(1);
    });

    test('deve lidar corretamente com caracteres acentuados', () => {
      expect(levenshtein('ação', 'acão')).toBe(1);
    });

    test('deve ser simétrica', () => {
      const a = 'kitten';
      const b = 'sitting';

      expect(levenshtein(a, b)).toBe(levenshtein(b, a));
    });

    test('deve retornar a distância igual ao tamanho para strings completamente diferentes de mesmo tamanho', () => {
      expect(levenshtein('aaaa', 'bbbb')).toBe(4);
    });
  });

  describe('Entradas inválidas ou não tratadas explicitamente', () => {
    test('deve lançar TypeError quando a primeira string for null', () => {
      expect(() =>
        levenshtein(null as unknown as string, 'abc')
      ).toThrow(TypeError);
    });

    test('deve lançar TypeError quando a segunda string for null', () => {
      expect(() =>
        levenshtein('abc', null as unknown as string)
      ).toThrow(TypeError);
    });

    test('deve lançar TypeError quando a primeira string for undefined', () => {
      expect(() =>
        levenshtein(undefined as unknown as string, 'abc')
      ).toThrow(TypeError);
    });

    test('deve lançar TypeError quando a segunda string for undefined', () => {
      expect(() =>
        levenshtein('abc', undefined as unknown as string)
      ).toThrow(TypeError);
    });

    test('deve lançar TypeError quando a primeira entrada for um número', () => {
      expect(() =>
        levenshtein(123 as unknown as string, '123')
      ).toThrow(TypeError);
    });

    test('deve lançar TypeError quando a segunda entrada for um objeto', () => {
      expect(() =>
        levenshtein('abc', {} as unknown as string)
      ).toThrow(TypeError);
    });
  });
});