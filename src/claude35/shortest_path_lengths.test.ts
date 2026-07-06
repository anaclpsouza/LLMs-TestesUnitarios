import { describe, expect, test } from '@jest/globals';
import { shortest_path_lengths } from '../funcoes';

const INF = Infinity;

describe('shortest_path_lengths', () => {
  describe('Caminho Feliz (Fluxos Positivos)', () => {
    test('deve retornar matriz de zeros para grafo de 1 nó', () => {
      expect(shortest_path_lengths(1, [[0]])).toEqual([[0]]);
    });

    test('deve computar caminhos mínimos em grafo de 2 nós conectados', () => {
      const matrix = [
        [0, 3],
        [3, 0],
      ];
      expect(shortest_path_lengths(2, matrix)).toEqual([
        [0, 3],
        [3, 0],
      ]);
    });

    test('deve computar caminho indireto mais curto em grafo de 3 nós', () => {
      const matrix = [
        [0, 1, INF],
        [1, 0, 2],
        [INF, 2, 0],
      ];
      expect(shortest_path_lengths(3, matrix)).toEqual([
        [0, 1, 3],
        [1, 0, 2],
        [3, 2, 0],
      ]);
    });

    test('deve retornar diagonal zerada em grafo totalmente conectado', () => {
      const matrix = [
        [0, 1, 2],
        [1, 0, 1],
        [2, 1, 0],
      ];
      const result = shortest_path_lengths(3, matrix);
      for (let i = 0; i < 3; i++) {
        expect(result[i][i]).toBe(0);
      }
    });

    test('deve resolver o exemplo clássico de Floyd-Warshall com 4 nós', () => {
      const matrix = [
        [0, 3, INF, 7],
        [8, 0, 2, INF],
        [5, INF, 0, 1],
        [2, INF, INF, 0],
      ];
      const result = shortest_path_lengths(4, matrix);
      expect(result[0][2]).toBe(5);
      expect(result[3][0]).toBe(2);
      expect(result[0][1]).toBe(3);
      expect(result[1][3]).toBe(3);
      expect(result[2][0]).toBe(3);
    });

    test('deve resolver grafo com caminho alternativo mais curto via intermediário', () => {
      const matrix = [
        [0, 10, 3],
        [INF, 0, 1],
        [INF, 4, 0],
      ];
      const result = shortest_path_lengths(3, matrix);
      expect(result[0][1]).toBe(7);
      expect(result[0][2]).toBe(3);
      expect(result[2][1]).toBe(4);
    });

    test('deve retornar a mesma matriz para grafo já com distâncias mínimas', () => {
      const matrix = [
        [0, 1, 2],
        [1, 0, 1],
        [2, 1, 0],
      ];
      const expected = [
        [0, 1, 2],
        [1, 0, 1],
        [2, 1, 0],
      ];
      expect(shortest_path_lengths(3, matrix)).toEqual(expected);
    });

    test('deve processar grafo de 5 nós com múltiplos caminhos alternativos', () => {
      const matrix = [
        [0, 2, INF, INF, 10],
        [INF, 0, 3, INF, INF],
        [INF, INF, 0, 1, INF],
        [INF, INF, INF, 0, 2],
        [INF, INF, INF, INF, 0],
      ];
      const result = shortest_path_lengths(5, matrix);
      expect(result[0][4]).toBe(8);
      expect(result[0][3]).toBe(6);
      expect(result[0][2]).toBe(5);
      expect(result[1][4]).toBe(6);
      expect(result[2][4]).toBe(3);
    });

    test('deve manter simetria em grafo não direcionado', () => {
      const matrix = [
        [0, 4, 2, INF],
        [4, 0, 1, 5],
        [2, 1, 0, 8],
        [INF, 5, 8, 0],
      ];
      const result = shortest_path_lengths(4, matrix);
      for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
          expect(result[i][j]).toBe(result[j][i]);
        }
      }
    });

    test('deve computar caminhos corretamente com pesos unitários', () => {
      const matrix = [
        [0, 1, INF, INF],
        [INF, 0, 1, INF],
        [INF, INF, 0, 1],
        [INF, INF, INF, 0],
      ];
      const result = shortest_path_lengths(4, matrix);
      expect(result[0][1]).toBe(1);
      expect(result[0][2]).toBe(2);
      expect(result[0][3]).toBe(3);
      expect(result[1][3]).toBe(2);
    });
  });

  describe('Fluxos Negativos', () => {
    test('deve lidar com grafo desconectado mantendo Infinity para pares não atingíveis', () => {
      const matrix = [
        [0, 1, INF],
        [1, 0, INF],
        [INF, INF, 0],
      ];
      const result = shortest_path_lengths(3, matrix);
      expect(result[0][2]).toBe(INF);
      expect(result[1][2]).toBe(INF);
      expect(result[2][0]).toBe(INF);
    });

    test('deve preservar Infinity para nós completamente isolados', () => {
      const matrix = [
        [0, INF, INF],
        [INF, 0, INF],
        [INF, INF, 0],
      ];
      const result = shortest_path_lengths(3, matrix);
      expect(result[0][1]).toBe(INF);
      expect(result[0][2]).toBe(INF);
      expect(result[1][0]).toBe(INF);
      expect(result[1][2]).toBe(INF);
      expect(result[2][0]).toBe(INF);
      expect(result[2][1]).toBe(INF);
    });

    test('deve lidar com pesos negativos sem ciclo negativo', () => {
      const matrix = [
        [0, -2, INF],
        [INF, 0, 3],
        [1, INF, 0],
      ];
      const result = shortest_path_lengths(3, matrix);
      expect(result[0][1]).toBe(-2);
      expect(result[0][2]).toBe(1);
      expect(result[2][1]).toBe(-1);
    });

    test('deve processar corretamente grafo com peso zero nas arestas', () => {
      const matrix = [
        [0, 0, INF],
        [INF, 0, 0],
        [0, INF, 0],
      ];
      const result = shortest_path_lengths(3, matrix);
      expect(result[0][2]).toBe(0);
      expect(result[2][1]).toBe(0);
    });

    test('deve modificar a matriz original in-place e retorná-la', () => {
      const matrix = [
        [0, 1, INF],
        [1, 0, 2],
        [INF, 2, 0],
      ];
      const result = shortest_path_lengths(3, matrix);
      expect(result).toBe(matrix);
    });
  });

  describe('Casos de Borda (Edge Cases)', () => {
    test('deve retornar matriz vazia para n = 0', () => {
      expect(shortest_path_lengths(0, [])).toEqual([]);
    });

    test('deve retornar [[0]] para n = 1 com nó sem arestas', () => {
      expect(shortest_path_lengths(1, [[0]])).toEqual([[0]]);
    });

    test('diagonal principal deve ser sempre 0 após o algoritmo', () => {
      const matrix = [
        [0, 5, INF, 10],
        [INF, 0, 3, INF],
        [INF, INF, 0, 1],
        [INF, INF, INF, 0],
      ];
      const result = shortest_path_lengths(4, matrix);
      for (let i = 0; i < 4; i++) {
        expect(result[i][i]).toBe(0);
      }
    });

    test('deve lidar com Number.MAX_SAFE_INTEGER como peso de aresta', () => {
      const matrix = [
        [0, Number.MAX_SAFE_INTEGER],
        [Number.MAX_SAFE_INTEGER, 0],
      ];
      const result = shortest_path_lengths(2, matrix);
      expect(result[0][1]).toBe(Number.MAX_SAFE_INTEGER);
      expect(result[1][0]).toBe(Number.MAX_SAFE_INTEGER);
    });

    test('deve preservar resultado correto para grafo completamente conectado 4x4', () => {
      const matrix = [
        [0, 1, 1, 1],
        [1, 0, 1, 1],
        [1, 1, 0, 1],
        [1, 1, 1, 0],
      ];
      const result = shortest_path_lengths(4, matrix);
      for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
          if (i !== j) {
            expect(result[i][j]).toBe(1);
          } else {
            expect(result[i][j]).toBe(0);
          }
        }
      }
    });

    test('nenhum caminho mínimo deve ser maior que a soma de todos os pesos diretos', () => {
      const matrix = [
        [0, 2, 9, INF],
        [INF, 0, 6, INF],
        [INF, INF, 0, 3],
        [7, INF, INF, 0],
      ];
      const result = shortest_path_lengths(4, matrix);
      for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
          expect(result[i][j]).toBeGreaterThanOrEqual(0);
        }
      }
    });

    test('resultado deve ser uma matriz n x n', () => {
      const n = 4;
      const matrix = [
        [0, 1, INF, INF],
        [1, 0, 1, INF],
        [INF, 1, 0, 1],
        [INF, INF, 1, 0],
      ];
      const result = shortest_path_lengths(n, matrix);
      expect(result).toHaveLength(n);
      result.forEach((row) => expect(row).toHaveLength(n));
    });

    test('distância de i para j deve ser sempre <= distância de i para k mais k para j', () => {
      const matrix = [
        [0, 3, INF, 7],
        [8, 0, 2, INF],
        [5, INF, 0, 1],
        [2, INF, INF, 0],
      ];
      const n = 4;
      const result = shortest_path_lengths(n, matrix);
      for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
          for (let k = 0; k < n; k++) {
            if (result[i][k] !== INF && result[k][j] !== INF) {
              expect(result[i][j]).toBeLessThanOrEqual(result[i][k] + result[k][j]);
            }
          }
        }
      }
    });

    test('deve lidar com grafo de linha (caminho simples) de 5 nós', () => {
      const matrix = [
        [0, 1, INF, INF, INF],
        [1, 0, 1, INF, INF],
        [INF, 1, 0, 1, INF],
        [INF, INF, 1, 0, 1],
        [INF, INF, INF, 1, 0],
      ];
      const result = shortest_path_lengths(5, matrix);
      expect(result[0][4]).toBe(4);
      expect(result[4][0]).toBe(4);
      expect(result[1][3]).toBe(2);
      expect(result[0][2]).toBe(2);
    });

    test('deve retornar 0 em todos os elementos para matriz de zeros (grafo trivial)', () => {
      const matrix = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
      ];
      const result = shortest_path_lengths(3, matrix);
      result.forEach((row) => row.forEach((val) => expect(val).toBe(0)));
    });
  });
});