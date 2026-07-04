import { describe, expect, test } from '@jest/globals';
import { max_sublist_sum } from '../funcoes';

describe('max_sublist_sum', () => {
  describe('Caminho Feliz (Fluxos Positivos)', () => {
    test('deve retornar a soma correta para array com todos os valores positivos', () => {
      expect(max_sublist_sum([1, 2, 3, 4, 5])).toBe(15);
    });

    test('deve retornar a soma do subarray máximo clássico', () => {
      expect(max_sublist_sum([-2, 1, -3, 4, -1, 2, 1, -5, 4])).toBe(6);
    });

    test('deve retornar o único elemento positivo em array majoritariamente negativo', () => {
      expect(max_sublist_sum([-5, -3, 2, -8, -1])).toBe(2);
    });

    test('deve retornar a soma de subarray no meio do array', () => {
      expect(max_sublist_sum([-1, 3, 5, -2, 1])).toBe(8);
    });

    test('deve retornar a soma de subarray no início do array', () => {
      expect(max_sublist_sum([4, 3, -10, 1])).toBe(7);
    });

    test('deve retornar a soma de subarray no final do array', () => {
      expect(max_sublist_sum([-10, 1, 3, 4])).toBe(8);
    });

    test('deve retornar o valor de array com um único elemento positivo', () => {
      expect(max_sublist_sum([7])).toBe(7);
    });

    test('deve retornar 0 para array com um único elemento negativo', () => {
      expect(max_sublist_sum([-7])).toBe(0);
    });

    test('deve retornar a soma total quando todos os elementos são positivos e crescentes', () => {
      expect(max_sublist_sum([10, 20, 30])).toBe(60);
    });

    test('deve retornar corretamente quando há empate entre subarrays', () => {
      expect(max_sublist_sum([3, -1, 3, -1, 3])).toBe(7);
    });

    test('deve retornar corretamente para array com alternância positivo/negativo', () => {
      expect(max_sublist_sum([1, -1, 1, -1, 1])).toBe(1);
    });

    test('deve retornar a soma total de array longo com todos positivos', () => {
      const arr = Array.from({ length: 100 }, (_, i) => i + 1);
      const expected = (100 * 101) / 2;
      expect(max_sublist_sum(arr)).toBe(expected);
    });
  });

  describe('Fluxos Negativos', () => {
    test('deve retornar 0 para array com todos os valores negativos', () => {
      expect(max_sublist_sum([-1, -2, -3, -4, -5])).toBe(0);
    });

    test('deve retornar 0 para array com todos os valores iguais a zero', () => {
      expect(max_sublist_sum([0, 0, 0, 0])).toBe(0);
    });

    test('deve retornar 0 para array com mistura de negativos e zeros', () => {
      expect(max_sublist_sum([-3, 0, -2, 0, -1])).toBe(0);
    });

    test('deve retornar 0 quando soma parcial sempre resulta negativa', () => {
      expect(max_sublist_sum([-100, -200, -300])).toBe(0);
    });
  });

  describe('Casos de Borda (Edge Cases)', () => {
    test('deve retornar 0 para array vazio', () => {
      expect(max_sublist_sum([])).toBe(0);
    });

    test('deve retornar 0 para array com elemento zero único', () => {
      expect(max_sublist_sum([0])).toBe(0);
    });

    test('deve lidar corretamente com Number.MAX_SAFE_INTEGER', () => {
      expect(max_sublist_sum([Number.MAX_SAFE_INTEGER])).toBe(Number.MAX_SAFE_INTEGER);
    });

    test('deve lidar corretamente com Number.MIN_SAFE_INTEGER', () => {
      expect(max_sublist_sum([Number.MIN_SAFE_INTEGER])).toBe(0);
    });

    test('deve lidar com array contendo Number.MAX_SAFE_INTEGER e valores negativos', () => {
      expect(max_sublist_sum([-1, Number.MAX_SAFE_INTEGER, -1])).toBe(Number.MAX_SAFE_INTEGER);
    });

    test('deve retornar 0 para array contendo apenas Number.MIN_SAFE_INTEGER', () => {
      expect(max_sublist_sum([Number.MIN_SAFE_INTEGER, Number.MIN_SAFE_INTEGER])).toBe(0);
    });

    test('deve lidar com valores decimais (float)', () => {
      expect(max_sublist_sum([1.5, 2.5, -1.0, 3.0])).toBeCloseTo(6.0);
    });

    test('deve lidar com array de um único elemento zero', () => {
      expect(max_sublist_sum([0])).toBe(0);
    });

    test('deve lidar com grandes arrays todos negativos retornando 0', () => {
      const arr = Array.from({ length: 1000 }, () => -1);
      expect(max_sublist_sum(arr)).toBe(0);
    });

    test('deve lidar com grandes arrays todos positivos retornando a soma total', () => {
      const arr = Array.from({ length: 1000 }, () => 1);
      expect(max_sublist_sum(arr)).toBe(1000);
    });

    test('deve ignorar zeros à esquerda e à direita e retornar subarray interno', () => {
      expect(max_sublist_sum([0, 0, 3, 5, 0, 0])).toBe(8);
    });

    test('deve retornar corretamente com Infinity positivo no array', () => {
      expect(max_sublist_sum([1, Infinity, 2])).toBe(Infinity);
    });

    test('deve retornar 0 com -Infinity no array e sem positivos', () => {
      expect(max_sublist_sum([-Infinity, -Infinity])).toBe(0);
    });

    test('deve retornar NaN quando array contém NaN junto com positivos', () => {
      expect(max_sublist_sum([1, NaN, 2])).toBeNaN();
    });

    test('deve retornar 0 quando array contém apenas NaN', () => {
      const result = max_sublist_sum([NaN]);
      expect(result === 0 || isNaN(result)).toBe(true);
    });

    test('deve manter resultado correto para array com dois elementos positivos', () => {
      expect(max_sublist_sum([3, 7])).toBe(10);
    });

    test('deve manter resultado correto para array com dois elementos negativos', () => {
      expect(max_sublist_sum([-3, -7])).toBe(0);
    });

    test('deve manter resultado correto para array com positivo seguido de negativo', () => {
      expect(max_sublist_sum([5, -3])).toBe(5);
    });

    test('deve manter resultado correto para array com negativo seguido de positivo', () => {
      expect(max_sublist_sum([-3, 5])).toBe(5);
    });
  });
});