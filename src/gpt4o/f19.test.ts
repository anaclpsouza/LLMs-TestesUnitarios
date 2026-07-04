import { describe, expect, test } from '@jest/globals';
import { shortest_path_step } from '../funcoes';

describe('shortest_path_step', () => {
  describe('Casos positivos', () => {
    test('deve retornar o caminho quando início e destino forem o mesmo nó', () => {
      const graph = {
        A: ['B'],
        B: [],
      };

      expect(shortest_path_step(graph, 'A', 'A')).toEqual(['A']);
    });

    test('deve encontrar o caminho direto entre dois nós', () => {
      const graph = {
        A: ['B'],
        B: [],
      };

      expect(shortest_path_step(graph, 'A', 'B')).toEqual(['A', 'B']);
    });

    test('deve encontrar o menor caminho em um grafo simples', () => {
      const graph = {
        A: ['B', 'C'],
        B: ['D'],
        C: ['E'],
        D: ['F'],
        E: ['F'],
        F: [],
      };

      expect(shortest_path_step(graph, 'A', 'F')).toEqual([
        'A',
        'B',
        'D',
        'F',
      ]);
    });

    test('deve escolher o caminho mais curto quando houver múltiplas alternativas', () => {
      const graph = {
        A: ['B', 'D'],
        B: ['C'],
        C: ['E'],
        D: ['E'],
        E: [],
      };

      expect(shortest_path_step(graph, 'A', 'E')).toEqual([
        'A',
        'D',
        'E',
      ]);
    });

    test('deve funcionar em grafos com ciclos', () => {
      const graph = {
        A: ['B'],
        B: ['C'],
        C: ['A', 'D'],
        D: [],
      };

      expect(shortest_path_step(graph, 'A', 'D')).toEqual([
        'A',
        'B',
        'C',
        'D',
      ]);
    });

    test('deve funcionar quando um nó possuir vários vizinhos', () => {
      const graph = {
        A: ['B', 'C', 'D'],
        B: [],
        C: ['E'],
        D: [],
        E: [],
      };

      expect(shortest_path_step(graph, 'A', 'E')).toEqual([
        'A',
        'C',
        'E',
      ]);
    });
  });

  describe('Casos de borda', () => {
    test('deve retornar um array vazio quando o destino não for alcançável', () => {
      const graph = {
        A: ['B'],
        B: [],
        C: [],
      };

      expect(shortest_path_step(graph, 'A', 'C')).toEqual([]);
    });

    test('deve retornar um array vazio para um grafo vazio', () => {
      expect(shortest_path_step({}, 'A', 'B')).toEqual([]);
    });

    test('deve retornar um array vazio quando o nó inicial não existir', () => {
      const graph = {
        A: ['B'],
        B: [],
      };

      expect(shortest_path_step(graph, 'X', 'B')).toEqual([]);
    });

    test('deve retornar um array vazio quando o nó destino não existir', () => {
      const graph = {
        A: ['B'],
        B: [],
      };

      expect(shortest_path_step(graph, 'A', 'X')).toEqual([]);
    });

    test('deve tratar nós sem lista de vizinhos', () => {
      const graph = {
        A: undefined,
      };

      expect(shortest_path_step(graph, 'A', 'B')).toEqual([]);
    });

    test('deve tratar listas de vizinhos vazias', () => {
      const graph = {
        A: [],
      };

      expect(shortest_path_step(graph, 'A', 'B')).toEqual([]);
    });
  });

  describe('Entradas inválidas ou não tratadas explicitamente', () => {
    test('deve lançar TypeError quando o grafo for null', () => {
      expect(() =>
        shortest_path_step(null as unknown as any, 'A', 'B')
      ).toThrow(TypeError);
    });

    test('deve lançar TypeError quando o grafo for undefined', () => {
      expect(() =>
        shortest_path_step(undefined as unknown as any, 'A', 'B')
      ).toThrow(TypeError);
    });

    test('deve lançar TypeError quando o grafo for um número', () => {
      expect(() =>
        shortest_path_step(123 as unknown as any, 'A', 'B')
      ).toThrow(TypeError);
    });

    test('deve lançar TypeError quando o valor de um nó não for iterável', () => {
      const graph = {
        A: 123,
      };

      expect(() =>
        shortest_path_step(graph, 'A', 'B')
      ).toThrow(TypeError);
    });

    test('deve lançar TypeError quando start for undefined', () => {
      const graph = {
        A: ['B'],
        B: [],
      };

      expect(() =>
        shortest_path_step(graph, undefined as unknown as string, 'B')
      ).toThrow(TypeError);
    });

    test('deve lançar TypeError quando target for undefined', () => {
      const graph = {
        A: ['B'],
        B: [],
      };

      expect(() =>
        shortest_path_step(graph, 'A', undefined as unknown as string)
      ).toThrow(TypeError);
    });
  });
});