import { describe, expect, test } from '@jest/globals';
import { reverse_string } from '../funcoes';

describe('reverse_string', () => {
  describe('Casos positivos', () => {
    test('deve retornar string vazia quando a entrada for vazia', () => {
      expect(reverse_string('')).toBe('');
    });

    test('deve inverter uma string com um único caractere', () => {
      expect(reverse_string('a')).toBe('a');
    });

    test('deve inverter corretamente uma string com dois caracteres', () => {
      expect(reverse_string('ab')).toBe('ba');
    });

    test('deve inverter corretamente uma palavra', () => {
      expect(reverse_string('chat')).toBe('tahc');
    });

    test('deve inverter corretamente uma frase com espaços', () => {
      expect(reverse_string('hello world')).toBe('dlrow olleh');
    });

    test('deve inverter corretamente uma string com números', () => {
      expect(reverse_string('12345')).toBe('54321');
    });

    test('deve inverter corretamente uma string alfanumérica', () => {
      expect(reverse_string('abc123')).toBe('321cba');
    });

    test('deve inverter corretamente uma string com caracteres especiais', () => {
      expect(reverse_string('!@#$%')).toBe('%$#@!');
    });

    test('deve preservar letras acentuadas durante a inversão', () => {
      expect(reverse_string('ação')).toBe('oãça');
    });

    test('deve inverter corretamente uma string contendo emojis BMP', () => {
      expect(reverse_string('☺☹')).toBe('☹☺');
    });
  });

  describe('Casos de borda', () => {
    test('deve retornar o mesmo valor para uma string composta apenas por espaços', () => {
      expect(reverse_string('   ')).toBe('   ');
    });

    test('deve inverter corretamente uma string longa', () => {
      const input = 'abcdefghijklmnopqrstuvwxyz';
      const expected = 'zyxwvutsrqponmlkjihgfedcba';

      expect(reverse_string(input)).toBe(expected);
    });

    test('deve inverter corretamente uma string palíndroma', () => {
      expect(reverse_string('arara')).toBe('arara');
    });
  });

  describe('Entradas inválidas ou não tratadas pela implementação', () => {
    test('deve lançar TypeError quando a entrada for null', () => {
      expect(() => reverse_string(null as unknown as string)).toThrow(TypeError);
    });

    test('deve lançar TypeError quando a entrada for undefined', () => {
      expect(() => reverse_string(undefined as unknown as string)).toThrow(TypeError);
    });

    test('deve lançar TypeError quando um número for passado em tempo de execução', () => {
      expect(() => reverse_string(123 as unknown as string)).toThrow(TypeError);
    });

    test('deve lançar TypeError quando um objeto for passado em tempo de execução', () => {
      expect(() => reverse_string({} as unknown as string)).toThrow(TypeError);
    });

    test('deve lançar TypeError quando um array for passado em tempo de execução', () => {
      expect(() => reverse_string([] as unknown as string)).toThrow(TypeError);
    });
  });
});