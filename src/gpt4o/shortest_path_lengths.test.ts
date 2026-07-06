import { describe, expect, test } from '@jest/globals';
import { shortest_path_lengths } from '../funcoes';

describe('shortest_path_lengths', () => {
  describe('Casos positivos', () => {
    test('deve retornar a mesma matriz para um único vértice', () => {
      const matrix = [[0]];

      expect(shortest_path_lengths(1, matrix)).toEqual([[0]]);
    });

    test('deve calcular corretamente os menores caminhos para um grafo simples', () => {
      const INF = Number.POSITIVE_INFINITY;

      const matrix = [
        [0, 3, INF],
        [INF, 0, 1],
        [2, INF, 0],
      ];

      const expected = [
        [0, 3, 4],
        [3, 0, 1],
        [2, 5, 0],
      ];

      expect(shortest_path_lengths(3, matrix)).toEqual(expected);
    });

    test('deve encontrar caminhos indiretos menores que os diretos', () => {
      const INF = Number.POSITIVE_INFINITY;

      const matrix = [
        [0, 10, 3],
        [INF, 0, INF],
        [INF, 4, 0],
      ];

      const expected = [
        [0, 7, 3],
        [INF, 0, INF],
        [INF, 4, 0],
      ];

      expect(shortest_path_lengths(3, matrix)).toEqual(expected);
    });

    test('deve preservar uma matriz já otimizada', () => {
      const matrix = [
        [0, 2, 5],
        [2, 0, 3],
        [5, 3, 0],
      ];

      const expected = [
        [0, 2, 5],
        [2, 0, 3],
        [5, 3, 0],
      ];

      expect(shortest_path_lengths(3, matrix)).toEqual(expected);
    });
  });

  describe('Casos de borda', () => {
    test('deve retornar uma matriz vazia quando n = 0', () => {
      expect(shortest_path_lengths(0, [])).toEqual([]);
    });

    test('deve modificar a matriz original (in-place)', () => {
      const INF = Number.POSITIVE_INFINITY;

      const matrix = [
        [0, 5, INF],
        [INF, 0, 2],
        [1, INF, 0],
      ];

      const retorno = shortest_path_lengths(3, matrix);

      expect(retorno).toBe(matrix);
      expect(matrix).toEqual([
        [0, 5, 7],
        [3, 0, 2],
        [1, 6, 0],
      ]);
    });

    test('deve manter Infinity quando não existir caminho', () => {
      const INF = Number.POSITIVE_INFINITY;

      const matrix = [
        [0, INF],
        [INF, 0],
      ];

      expect(shortest_path_lengths(2, matrix)).toEqual([
        [0, INF],
        [INF, 0],
      ]);
    });

    test('deve lidar corretamente com pesos negativos sem ciclo negativo', () => {
      const INF = Number.POSITIVE_INFINITY;

      const matrix = [
        [0, 4, INF],
        [INF, 0, -2],
        [5, INF, 0],
      ];

      expect(shortest_path_lengths(3, matrix)).toEqual([
        [0, 4, 2],
        [3, 0, -2],
        [5, 9, 0],
      ]);
    });
  });

  describe('Entradas inválidas ou não tratadas explicitamente', () => {
    test('deve lançar TypeError quando matrix for null', () => {
      expect(() =>
        shortest_path_lengths(1, null as unknown as number[][])
      ).toThrow(TypeError);
    });

    test('deve lançar TypeError quando matrix for undefined', () => {
      expect(() =>
        shortest_path_lengths(1, undefined as unknown as number[][])
      ).toThrow(TypeError);
    });

    test('deve lançar TypeError quando matrix for um objeto', () => {
      expect(() =>
        shortest_path_lengths(1, {} as unknown as number[][])
      ).toThrow(TypeError);
    });

    test('deve lançar TypeError quando uma linha da matriz for undefined', () => {
      expect(() =>
        shortest_path_lengths(2, [
          [0, 1],
          undefined as unknown as number[],
        ])
      ).toThrow(TypeError);
    });

    test('deve lançar TypeError quando uma linha da matriz for null', () => {
      expect(() =>
        shortest_path_lengths(2, [
          [0, 1],
          null as unknown as number[],
        ])
      ).toThrow(TypeError);
    });

    test('deve lançar TypeError quando n for undefined', () => {
      expect(() =>
        shortest_path_lengths(
          undefined as unknown as number,
          [[0]]
        )
      ).toThrow(TypeError);
    });

    test('deve retornar a matriz inalterada quando n for negativo', () => {
      const matrix = [
        [0, 1],
        [1, 0],
      ];

      expect(shortest_path_lengths(-1, matrix)).toEqual([
        [0, 1],
        [1, 0],
      ]);
    });

    test('deve retornar a matriz inalterada quando n for NaN', () => {
      const matrix = [
        [0, 1],
        [1, 0],
      ];

      expect(shortest_path_lengths(Number.NaN, matrix)).toEqual([
        [0, 1],
        [1, 0],
      ]);
    });
  });
}
);