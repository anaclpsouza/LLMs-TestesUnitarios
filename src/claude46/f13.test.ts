import { describe, expect, test } from '@jest/globals';
import { next_permutation } from '../funcoes';

describe('next_permutation', () => {
  describe('Caminho Feliz (Fluxos Positivos)', () => {
    test('deve retornar [1, 3, 2] para [1, 2, 3]', () => {
      expect(next_permutation([1, 2, 3])).toEqual([1, 3, 2]);
    });

    test('deve retornar [2, 1, 3] para [1, 3, 2]', () => {
      expect(next_permutation([1, 3, 2])).toEqual([2, 1, 3]);
    });

    test('deve retornar [2, 3, 1] para [2, 1, 3]', () => {
      expect(next_permutation([2, 1, 3])).toEqual([2, 3, 1]);
    });

    test('deve retornar [3, 1, 2] para [2, 3, 1]', () => {
      expect(next_permutation([2, 3, 1])).toEqual([3, 1, 2]);
    });

    test('deve retornar [3, 2, 1] para [3, 1, 2]', () => {
      expect(next_permutation([3, 1, 2])).toEqual([3, 2, 1]);
    });

    test('deve retornar [] para [3, 2, 1] (última permutação)', () => {
      expect(next_permutation([3, 2, 1])).toEqual([]);
    });

    test('deve retornar [2, 1] para [1, 2]', () => {
      expect(next_permutation([1, 2])).toEqual([2, 1]);
    });

    test('deve retornar [] para [2, 1] (última permutação de 2 elementos)', () => {
      expect(next_permutation([2, 1])).toEqual([]);
    });

    test('deve retornar [1, 2, 4, 3] para [1, 2, 3, 4]', () => {
      expect(next_permutation([1, 2, 3, 4])).toEqual([1, 2, 4, 3]);
    });

    test('deve retornar [1, 3, 2, 4] para [1, 2, 4, 3]', () => {
      expect(next_permutation([1, 2, 4, 3])).toEqual([1, 3, 2, 4]);
    });

    test('deve retornar [1, 4, 2, 3] para [1, 3, 4, 2]', () => {
      expect(next_permutation([1, 3, 4, 2])).toEqual([1, 4, 2, 3]);
    });

    test('deve retornar [2, 1, 3, 4] para [1, 4, 3, 2]', () => {
      expect(next_permutation([1, 4, 3, 2])).toEqual([2, 1, 3, 4]);
    });

    test('deve retornar [] para [4, 3, 2, 1] (última permutação de 4 elementos)', () => {
      expect(next_permutation([4, 3, 2, 1])).toEqual([]);
    });

    test('deve retornar [1, 2, 3, 5, 4] para [1, 2, 3, 4, 5]', () => {
      expect(next_permutation([1, 2, 3, 4, 5])).toEqual([1, 2, 3, 5, 4]);
    });

    test('deve retornar [] para [5, 4, 3, 2, 1] (última permutação de 5 elementos)', () => {
      expect(next_permutation([5, 4, 3, 2, 1])).toEqual([]);
    });

    test('deve gerar todas as 6 permutações de [1,2,3] em sequência', () => {
      const permutations = [
        [1, 2, 3],
        [1, 3, 2],
        [2, 1, 3],
        [2, 3, 1],
        [3, 1, 2],
        [3, 2, 1],
      ];
      for (let i = 0; i < permutations.length - 1; i++) {
        expect(next_permutation(permutations[i])).toEqual(permutations[i + 1]);
      }
      expect(next_permutation(permutations[5])).toEqual([]);
    });

    test('deve lidar com números negativos: próxima de [-3, -2, -1]', () => {
      expect(next_permutation([-3, -2, -1])).toEqual([-3, -1, -2]);
    });

    test('deve lidar com mix de negativos e positivos: [0, -1, 1]', () => {
      expect(next_permutation([-1, 0, 1])).toEqual([-1, 1, 0]);
    });

    test('deve lidar com números grandes: [1, 2, Number.MAX_SAFE_INTEGER]', () => {
      expect(next_permutation([1, 2, Number.MAX_SAFE_INTEGER])).toEqual([
        1,
        Number.MAX_SAFE_INTEGER,
        2,
      ]);
    });
  });

  describe('Fluxos Negativos — Retorno de Array Vazio', () => {
    test('deve retornar [] para array já na última permutação decrescente', () => {
      expect(next_permutation([3, 2, 1])).toEqual([]);
    });

    test('deve retornar [] para array de um único elemento', () => {
      expect(next_permutation([1])).toEqual([]);
    });

    test('deve retornar [] para array de dois elementos em ordem decrescente', () => {
      expect(next_permutation([5, 1])).toEqual([]);
    });

    test('deve retornar [] para array completamente decrescente de 5 elementos', () => {
      expect(next_permutation([10, 8, 6, 4, 2])).toEqual([]);
    });

    test('deve retornar [] para array vazio', () => {
      expect(next_permutation([])).toEqual([]);
    });

    test('deve retornar [] para array com todos os elementos iguais', () => {
      expect(next_permutation([2, 2, 2])).toEqual([]);
    });

    test('deve retornar [] para array de dois elementos iguais', () => {
      expect(next_permutation([5, 5])).toEqual([]);
    });
  });

  describe('Casos de Borda (Edge Cases)', () => {
    test('deve retornar [] para array vazio', () => {
      expect(next_permutation([])).toEqual([]);
    });

    test('deve retornar [] para array de um único elemento positivo', () => {
      expect(next_permutation([42])).toEqual([]);
    });

    test('deve retornar [] para array de um único elemento negativo', () => {
      expect(next_permutation([-1])).toEqual([]);
    });

    test('deve retornar [] para array de um único zero', () => {
      expect(next_permutation([0])).toEqual([]);
    });

    test('deve lidar corretamente com zeros no array: [0, 1, 2]', () => {
      expect(next_permutation([0, 1, 2])).toEqual([0, 2, 1]);
    });

    test('deve lidar com zeros: [2, 1, 0] retorna []', () => {
      expect(next_permutation([2, 1, 0])).toEqual([]);
    });

    test('deve lidar com elementos duplicados: [1, 1, 2]', () => {
      expect(next_permutation([1, 1, 2])).toEqual([1, 2, 1]);
    });

    test('deve lidar com elementos duplicados: [1, 2, 1]', () => {
      expect(next_permutation([1, 2, 1])).toEqual([2, 1, 1]);
    });

    test('deve lidar com elementos duplicados: [2, 1, 1] retorna []', () => {
      expect(next_permutation([2, 1, 1])).toEqual([]);
    });

    test('deve lidar com elementos duplicados parciais: [1, 2, 2, 3]', () => {
      expect(next_permutation([1, 2, 2, 3])).toEqual([1, 2, 3, 2]);
    });

    test('deve lidar com elementos duplicados parciais: [3, 2, 2, 1] retorna []', () => {
      expect(next_permutation([3, 2, 2, 1])).toEqual([]);
    });

    test('não deve mutar o array original', () => {
      const input = [1, 2, 3];
      const original = [...input];
      next_permutation(input);
      expect(input).toEqual(original);
    });

    test('resultado deve ter o mesmo comprimento que o array de entrada quando não vazio', () => {
      const input = [1, 2, 3];
      const result = next_permutation(input);
      if (result.length > 0) {
        expect(result).toHaveLength(input.length);
      }
    });

    test('resultado deve conter os mesmos elementos do input quando não vazio', () => {
      const input = [1, 2, 3];
      const result = next_permutation(input);
      if (result.length > 0) {
        expect(result.sort()).toEqual([...input].sort());
      }
    });

    test('deve lidar com Number.MAX_SAFE_INTEGER como único elemento', () => {
      expect(next_permutation([Number.MAX_SAFE_INTEGER])).toEqual([]);
    });

    test('deve lidar com Number.MIN_SAFE_INTEGER como único elemento', () => {
      expect(next_permutation([Number.MIN_SAFE_INTEGER])).toEqual([]);
    });

    test('deve lidar com mix de Number.MIN_SAFE_INTEGER e Number.MAX_SAFE_INTEGER', () => {
      expect(
        next_permutation([Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER])
      ).toEqual([Number.MAX_SAFE_INTEGER, Number.MIN_SAFE_INTEGER]);
    });

    test('deve lidar com array de 6 elementos e retornar próxima permutação corretamente', () => {
      expect(next_permutation([1, 2, 3, 4, 5, 6])).toEqual([1, 2, 3, 4, 6, 5]);
    });

    test('deve selecionar o menor sucessor possível na troca', () => {
      expect(next_permutation([1, 3, 5, 4, 2])).toEqual([1, 4, 2, 3, 5]);
    });

    test('deve reverter o sufixo corretamente após a troca', () => {
      expect(next_permutation([2, 4, 3, 1])).toEqual([3, 1, 2, 4]);
    });
  });
});