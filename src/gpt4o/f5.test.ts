import { describe, expect, test } from '@jest/globals';
import { flatten } from '../funcoes';

describe('flatten', () => {
  describe('Casos positivos', () => {
    test('deve retornar um array vazio quando a entrada for um array vazio', () => {
      expect(flatten([])).toEqual([]);
    });

    test('deve retornar o mesmo array quando ele já estiver plano', () => {
      expect(flatten([1, 2, 3])).toEqual([1, 2, 3]);
    });

    test('deve achatar um único nível de aninhamento', () => {
      expect(flatten([1, [2, 3], 4])).toEqual([1, 2, 3, 4]);
    });

    test('deve achatar múltiplos níveis de aninhamento', () => {
      expect(flatten([1, [2, [3, [4]], 5], 6])).toEqual([1, 2, 3, 4, 5, 6]);
    });

    test('deve preservar a ordem dos elementos', () => {
      expect(flatten([[1], 2, [3, [4]], 5])).toEqual([1, 2, 3, 4, 5]);
    });

    test('deve funcionar com diferentes tipos de dados', () => {
      const obj = { id: 1 };
      const fn = () => 'ok';

      expect(
        flatten([
          1,
          ['texto', true],
          [[null]],
          obj,
          [[[fn]]],
        ])
      ).toEqual([1, 'texto', true, null, obj, fn]);
    });

    test('deve achatar arrays contendo arrays vazios', () => {
      expect(flatten([[], [1], [], [[2]], []])).toEqual([1, 2]);
    });

    test('deve preservar valores undefined e null', () => {
      expect(flatten([undefined, [null, [1]]])).toEqual([
        undefined,
        null,
        1,
      ]);
    });

    test('deve preservar valores booleanos', () => {
      expect(flatten([[true], false, [[true]]])).toEqual([
        true,
        false,
        true,
      ]);
    });
  });

  describe('Casos de borda', () => {
    test('deve retornar um novo array e não reutilizar a referência original', () => {
      const entrada = [1, 2, 3];
      const resultado = flatten(entrada);

      expect(resultado).toEqual(entrada);
      expect(resultado).not.toBe(entrada);
    });

    test('deve lidar corretamente com arrays profundamente aninhados', () => {
      expect(flatten([[[[[[[1]]]]]], 2, [[[3]]]])).toEqual([1, 2, 3]);
    });

    test('deve retornar array vazio quando todos os elementos forem arrays vazios', () => {
      expect(flatten([[], [[]], [[[]]]])).toEqual([]);
    });

    test('deve preservar valores especiais como NaN e Infinity', () => {
      const resultado = flatten([[Number.NaN], Number.POSITIVE_INFINITY]);

      expect(resultado).toHaveLength(2);
      expect(resultado[0]).toBeNaN();
      expect(resultado[1]).toBe(Number.POSITIVE_INFINITY);
    });
  });

  describe('Entradas inválidas ou não tratadas explicitamente', () => {
    test('deve lançar TypeError quando a entrada for null', () => {
      expect(() => flatten(null as unknown as any[])).toThrow(TypeError);
    });

    test('deve lançar TypeError quando a entrada for undefined', () => {
      expect(() => flatten(undefined as unknown as any[])).toThrow(TypeError);
    });

    test('deve lançar TypeError quando a entrada for um objeto', () => {
      expect(() => flatten({} as unknown as any[])).toThrow(TypeError);
    });

    test('deve iterar sobre uma string quando passada em tempo de execução', () => {
      expect(flatten('abc' as unknown as any[])).toEqual(['a', 'b', 'c']);
    });

    test('deve lançar TypeError quando a entrada for um número', () => {
      expect(() => flatten(123 as unknown as any[])).toThrow(TypeError);
    });

    test('deve lançar TypeError quando a entrada for um booleano', () => {
      expect(() => flatten(true as unknown as any[])).toThrow(TypeError);
    });
  });
});