import { describe, expect, test } from '@jest/globals';
import { reverse_string } from '../funcoes';

describe('reverse_string', () => {
  describe('Caminho Feliz (Fluxos Positivos)', () => {
    test('deve inverter uma string simples de letras minúsculas', () => {
      expect(reverse_string('hello')).toBe('olleh');
    });

    test('deve inverter uma string simples de letras maiúsculas', () => {
      expect(reverse_string('WORLD')).toBe('DLROW');
    });

    test('deve inverter uma string com letras maiúsculas e minúsculas mistas', () => {
      expect(reverse_string('HeLLo')).toBe('oLLeH');
    });

    test('deve inverter uma string com espaços', () => {
      expect(reverse_string('hello world')).toBe('dlrow olleh');
    });

    test('deve inverter uma string com números', () => {
      expect(reverse_string('12345')).toBe('54321');
    });

    test('deve inverter uma string alfanumérica', () => {
      expect(reverse_string('abc123')).toBe('321cba');
    });

    test('deve inverter uma string com caracteres especiais', () => {
      expect(reverse_string('!@#$%')).toBe('%$#@!');
    });

    test('deve inverter uma string com pontuação', () => {
      expect(reverse_string('Hello, World!')).toBe('!dlroW ,olleH');
    });

    test('deve inverter uma string com caracteres acentuados', () => {
      expect(reverse_string('ação')).toBe('oãça');
    });

    test('deve inverter uma string com espaços múltiplos', () => {
      expect(reverse_string('a  b')).toBe('b  a');
    });

    test('deve inverter uma frase completa', () => {
      expect(reverse_string('TypeScript is great')).toBe('taerg si tpircSepyT');
    });

    test('deve inverter uma string com tabs e quebras de linha', () => {
      expect(reverse_string('a\tb\nc')).toBe('c\nb\ta');
    });
  });

  describe('Casos de Borda (Edge Cases)', () => {
    test('deve retornar string vazia para string vazia (caso base)', () => {
      expect(reverse_string('')).toBe('');
    });

    test('deve retornar o mesmo caractere para string de um único caractere', () => {
      expect(reverse_string('a')).toBe('a');
    });

    test('deve retornar o mesmo caractere para string de um único número', () => {
      expect(reverse_string('1')).toBe('1');
    });

    test('deve retornar o mesmo caractere especial para string de um único caractere especial', () => {
      expect(reverse_string('!')).toBe('!');
    });

    test('deve manter palíndromo igual após inversão', () => {
      expect(reverse_string('racecar')).toBe('racecar');
    });

    test('deve manter palíndromo de número igual após inversão', () => {
      expect(reverse_string('12321')).toBe('12321');
    });

    test('deve inverter string composta apenas de espaços', () => {
      expect(reverse_string('   ')).toBe('   ');
    });

    test('deve inverter string composta apenas de um espaço', () => {
      expect(reverse_string(' ')).toBe(' ');
    });

    test('deve inverter string com caracteres Unicode (emoji)', () => {
      const result = reverse_string('ab😀cd');
      expect(typeof result).toBe('string');
      expect(result.length).toBe('ab😀cd'.length);
    });

    test('deve inverter string longa sem erro de stack overflow', () => {
      const longString = 'a'.repeat(5000);
      const result = reverse_string(longString);
      expect(result).toBe('a'.repeat(5000));
    });

    test('deve inverter string com caracteres repetidos', () => {
      expect(reverse_string('aaabbb')).toBe('bbbaaa');
    });

    test('deve inverter string apenas com zeros', () => {
      expect(reverse_string('000')).toBe('000');
    });

    test('deve inverter string contendo apenas nova linha', () => {
      expect(reverse_string('\n')).toBe('\n');
    });

    test('deve preservar o tamanho da string após inversão', () => {
      const input = 'TypeScript';
      expect(reverse_string(input).length).toBe(input.length);
    });

    test('inverter duas vezes deve retornar a string original', () => {
      const input = 'double reverse test';
      expect(reverse_string(reverse_string(input))).toBe(input);
    });

    test('inverter duas vezes string vazia deve retornar string vazia', () => {
      expect(reverse_string(reverse_string(''))).toBe('');
    });

    test('deve inverter string com barra invertida', () => {
      expect(reverse_string('a\\b')).toBe('b\\a');
    });

    test('deve inverter string com aspas simples e duplas', () => {
      expect(reverse_string(`a"b'c`)).toBe(`c'b"a`);
    });
  });

  describe('Fluxos Negativos / Comportamento com Tipos Inesperados', () => {
    test('deve lançar erro ou retornar comportamento definido para null coercido como string', () => {
      expect(() => reverse_string(null as unknown as string)).toThrow();
    });

    test('deve lançar erro ou retornar comportamento definido para undefined coercido como string', () => {
      expect(() => reverse_string(undefined as unknown as string)).toThrow();
    });

    test('deve lançar erro ou retornar comportamento definido para número coercido como string', () => {
      expect(() => reverse_string(123 as unknown as string)).toThrow();
    });

    test('deve lançar erro ou retornar comportamento definido para array coercido como string', () => {
      expect(() => reverse_string([] as unknown as string)).toThrow();
    });
  });
});