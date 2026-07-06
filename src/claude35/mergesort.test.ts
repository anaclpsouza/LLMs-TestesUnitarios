import { describe, expect, test } from '@jest/globals';
import { mergesort } from '../funcoes';

describe('mergesort', () => {
  describe('Caminho Feliz (Fluxos Positivos)', () => {
    test('deve ordenar array de inteiros positivos desordenados', () => {
      expect(mergesort([3, 1, 4, 1, 5, 9, 2, 6])).toEqual([1, 1, 2, 3, 4, 5, 6, 9]);
    });

    test('deve ordenar array em ordem estritamente decrescente', () => {
      expect(mergesort([5, 4, 3, 2, 1])).toEqual([1, 2, 3, 4, 5]);
    });

    test('deve retornar o mesmo array já ordenado', () => {
      expect(mergesort([1, 2, 3, 4, 5])).toEqual([1, 2, 3, 4, 5]);
    });

    test('deve ordenar array de dois elementos fora de ordem', () => {
      expect(mergesort([2, 1])).toEqual([1, 2]);
    });

    test('deve retornar array de dois elementos já ordenados', () => {
      expect(mergesort([1, 2])).toEqual([1, 2]);
    });

    test('deve ordenar array com números negativos', () => {
      expect(mergesort([-3, -1, -4, -2, -5])).toEqual([-5, -4, -3, -2, -1]);
    });

    test('deve ordenar array com mistura de negativos e positivos', () => {
      expect(mergesort([-3, 5, -1, 0, 3, -2])).toEqual([-3, -2, -1, 0, 3, 5]);
    });

    test('deve ordenar array com zeros e positivos', () => {
      expect(mergesort([3, 0, 1, 0, 2])).toEqual([0, 0, 1, 2, 3]);
    });

    test('deve ordenar array com números decimais', () => {
      expect(mergesort([3.5, 1.1, 2.9, 0.5])).toEqual([0.5, 1.1, 2.9, 3.5]);
    });

    test('deve ordenar array com valores repetidos', () => {
      expect(mergesort([3, 1, 2, 1, 3])).toEqual([1, 1, 2, 3, 3]);
    });

    test('deve ordenar array com todos os elementos iguais', () => {
      expect(mergesort([7, 7, 7, 7])).toEqual([7, 7, 7, 7]);
    });

    test('deve ordenar array com Number.MAX_SAFE_INTEGER e Number.MIN_SAFE_INTEGER', () => {
      expect(
        mergesort([Number.MAX_SAFE_INTEGER, 0, Number.MIN_SAFE_INTEGER])
      ).toEqual([Number.MIN_SAFE_INTEGER, 0, Number.MAX_SAFE_INTEGER]);
    });

    test('deve ordenar array com Infinity e -Infinity', () => {
      expect(mergesort([Infinity, 0, -Infinity, 5])).toEqual([
        -Infinity, 0, 5, Infinity,
      ]);
    });

    test('deve ordenar array com negativos e zero', () => {
      expect(mergesort([-5, 0, -1, -3])).toEqual([-5, -3, -1, 0]);
    });

    test('deve ordenar array com três elementos em ordem aleatória', () => {
      expect(mergesort([3, 1, 2])).toEqual([1, 2, 3]);
    });

    test('deve ordenar array onde apenas o primeiro elemento está fora de lugar', () => {
      expect(mergesort([5, 1, 2, 3, 4])).toEqual([1, 2, 3, 4, 5]);
    });

    test('deve ordenar array onde apenas o último elemento está fora de lugar', () => {
      expect(mergesort([1, 2, 3, 4, 0])).toEqual([0, 1, 2, 3, 4]);
    });

    test('deve ordenar array com tamanho par', () => {
      expect(mergesort([4, 2, 6, 8])).toEqual([2, 4, 6, 8]);
    });

    test('deve ordenar array com tamanho ímpar', () => {
      expect(mergesort([4, 2, 6, 8, 1])).toEqual([1, 2, 4, 6, 8]);
    });

    test('deve ordenar array longo de 100 elementos', () => {
      const arr = Array.from({ length: 100 }, (_, i) => 100 - i);
      const expected = Array.from({ length: 100 }, (_, i) => i + 1);
      expect(mergesort(arr)).toEqual(expected);
    });

    test('deve ordenar array alternando positivos e negativos', () => {
      expect(mergesort([1, -1, 2, -2, 3, -3])).toEqual([-3, -2, -1, 1, 2, 3]);
    });

    test('deve ordenar dois blocos ordenados intercalados', () => {
      expect(mergesort([3, 4, 5, 1, 2])).toEqual([1, 2, 3, 4, 5]);
    });

    test('resultado deve ser idêntico ao sort nativo para dados aleatórios', () => {
      const arr = [38, 27, 43, 3, 9, 82, 10];
      const native = [...arr].sort((a, b) => a - b);
      expect(mergesort(arr)).toEqual(native);
    });
  });

  describe('Fluxos Negativos', () => {
    test('deve retornar array vazio para array vazio', () => {
      expect(mergesort([])).toEqual([]);
    });

    test('deve retornar o mesmo array para array de um único elemento positivo', () => {
      expect(mergesort([42])).toEqual([42]);
    });

    test('deve retornar o mesmo array para array de um único elemento negativo', () => {
      expect(mergesort([-7])).toEqual([-7]);
    });

    test('deve retornar o mesmo array para array de um único zero', () => {
      expect(mergesort([0])).toEqual([0]);
    });

    test('deve retornar o mesmo array para array de um único Infinity', () => {
      expect(mergesort([Infinity])).toEqual([Infinity]);
    });

    test('deve retornar o mesmo array para array de um único -Infinity', () => {
      expect(mergesort([-Infinity])).toEqual([-Infinity]);
    });
  });

  describe('Casos de Borda (Edge Cases)', () => {
    test('deve retornar array vazio para array vazio []', () => {
      expect(mergesort([])).toEqual([]);
    });

    test('deve retornar array correto para todos os zeros', () => {
      expect(mergesort([0, 0, 0])).toEqual([0, 0, 0]);
    });

    test('deve retornar array correto para dois zeros', () => {
      expect(mergesort([0, 0])).toEqual([0, 0]);
    });

    test('deve retornar array correto para dois elementos negativos iguais', () => {
      expect(mergesort([-5, -5])).toEqual([-5, -5]);
    });

    test('deve retornar array correto para dois elementos negativos diferentes', () => {
      expect(mergesort([-1, -5])).toEqual([-5, -1]);
    });

    test('deve retornar array correto para elemento único repetido muitas vezes', () => {
      expect(mergesort([5, 5, 5, 5, 5])).toEqual([5, 5, 5, 5, 5]);
    });

    test('deve retornar array correto para Number.MAX_SAFE_INTEGER duplicado', () => {
      expect(
        mergesort([Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER])
      ).toEqual([Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER]);
    });

    test('deve retornar array correto para Number.MIN_SAFE_INTEGER duplicado', () => {
      expect(
        mergesort([Number.MIN_SAFE_INTEGER, Number.MIN_SAFE_INTEGER])
      ).toEqual([Number.MIN_SAFE_INTEGER, Number.MIN_SAFE_INTEGER]);
    });

    test('deve retornar array correto com mistura de inteiros e decimais', () => {
      expect(mergesort([1, 1.5, 2, 0.5])).toEqual([0.5, 1, 1.5, 2]);
    });

    test('resultado deve ter o mesmo comprimento do array de entrada', () => {
      const input = [5, 3, 8, 1, 9, 2];
      expect(mergesort(input)).toHaveLength(input.length);
    });

    test('resultado deve conter exatamente os mesmos elementos do array de entrada', () => {
      const input = [4, 2, 7, 1, 9, 3];
      const sorted = mergesort([...input]);
      expect([...sorted].sort((a, b) => a - b)).toEqual(
        [...input].sort((a, b) => a - b)
      );
    });

    test('propriedade: elemento no índice 0 deve ser o menor após ordenação', () => {
      const arr = [8, 3, 7, 1, 5];
      const result = mergesort([...arr]);
      expect(result[0]).toBe(Math.min(...arr));
    });

    test('propriedade: elemento no último índice deve ser o maior após ordenação', () => {
      const arr = [8, 3, 7, 1, 5];
      const result = mergesort([...arr]);
      expect(result[result.length - 1]).toBe(Math.max(...arr));
    });

    test('propriedade: cada elemento deve ser menor ou igual ao próximo', () => {
      const arr = [9, 4, 6, 2, 8, 1, 7, 3, 5];
      const result = mergesort(arr);
      for (let i = 0; i < result.length - 1; i++) {
        expect(result[i]).toBeLessThanOrEqual(result[i + 1]);
      }
    });

    test('deve ser estável: elementos iguais devem manter ordenação relativa', () => {
      const arr = [3, 1, 2, 1, 3, 2];
      const result = mergesort(arr);
      expect(result).toEqual([1, 1, 2, 2, 3, 3]);
    });

    test('não deve modificar o array original', () => {
      const input = [3, 1, 2];
      const original = [...input];
      mergesort(input);
      expect(input).toEqual(original);
    });

    test('deve lidar com NaN no array sem lançar erro', () => {
      const result = mergesort([3, NaN, 1]);
      expect(result).toHaveLength(3);
    });

    test('deve ordenar array grande de 1000 elementos crescente corretamente', () => {
      const arr = Array.from({ length: 1000 }, (_, i) => 1000 - i);
      const result = mergesort(arr);
      for (let i = 0; i < result.length - 1; i++) {
        expect(result[i]).toBeLessThanOrEqual(result[i + 1]);
      }
    });

    test('deve ordenar array grande de 1000 elementos todos iguais', () => {
      const arr = Array.from({ length: 1000 }, () => 42);
      expect(mergesort(arr)).toEqual(arr);
    });

    test('merge interno deve concatenar restos do lado esquerdo corretamente', () => {
      expect(mergesort([1, 3, 5, 2])).toEqual([1, 2, 3, 5]);
    });

    test('merge interno deve concatenar restos do lado direito corretamente', () => {
      expect(mergesort([2, 1, 3, 5])).toEqual([1, 2, 3, 5]);
    });

    test('deve lidar com pivô de divisão em array de comprimento par', () => {
      expect(mergesort([4, 3, 2, 1])).toEqual([1, 2, 3, 4]);
    });

    test('deve lidar com pivô de divisão em array de comprimento ímpar', () => {
      expect(mergesort([5, 4, 3, 2, 1])).toEqual([1, 2, 3, 4, 5]);
    });
  });
});