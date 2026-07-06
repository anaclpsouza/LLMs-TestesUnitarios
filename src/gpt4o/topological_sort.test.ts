import { describe, expect, test } from '@jest/globals';
import { topological_sort } from '../funcoes';

describe('topological_sort', () => {
  describe('Casos positivos', () => {
    test('deve retornar um único nó quando não houver arestas', () => {
      expect(topological_sort(['A'], [])).toEqual(['A']);
    });

    test('deve ordenar corretamente uma cadeia linear', () => {
      expect(
        topological_sort(
          ['A', 'B', 'C', 'D'],
          [
            ['A', 'B'],
            ['B', 'C'],
            ['C', 'D'],
          ]
        )
      ).toEqual(['A', 'B', 'C', 'D']);
    });

    test('deve ordenar corretamente um DAG com múltiplas dependências', () => {
      const result = topological_sort(
        ['A', 'B', 'C', 'D'],
        [
          ['A', 'C'],
          ['B', 'C'],
          ['C', 'D'],
        ]
      );

      expect(result).toHaveLength(4);
      expect(result.indexOf('A')).toBeLessThan(result.indexOf('C'));
      expect(result.indexOf('B')).toBeLessThan(result.indexOf('C'));
      expect(result.indexOf('C')).toBeLessThan(result.indexOf('D'));
    });

    test('deve preservar a ordem inicial entre nós independentes', () => {
      expect(topological_sort(['A', 'B', 'C'], [])).toEqual([
        'A',
        'B',
        'C',
      ]);
    });

    test('deve funcionar com múltiplos componentes desconectados', () => {
      const result = topological_sort(
        ['A', 'B', 'C', 'D'],
        [
          ['A', 'B'],
          ['C', 'D'],
        ]
      );

      expect(result).toHaveLength(4);
      expect(result.indexOf('A')).toBeLessThan(result.indexOf('B'));
      expect(result.indexOf('C')).toBeLessThan(result.indexOf('D'));
    });
  });

  describe('Casos de borda', () => {
    test('deve retornar array vazio para lista de nós vazia', () => {
      expect(topological_sort([], [])).toEqual([]);
    });

    test('deve retornar array vazio quando existir ciclo simples', () => {
      expect(
        topological_sort(
          ['A', 'B'],
          [
            ['A', 'B'],
            ['B', 'A'],
          ]
        )
      ).toEqual([]);
    });

    test('deve retornar array vazio quando existir ciclo maior', () => {
      expect(
        topological_sort(
          ['A', 'B', 'C'],
          [
            ['A', 'B'],
            ['B', 'C'],
            ['C', 'A'],
          ]
        )
      ).toEqual([]);
    });

    test('deve lidar com arestas duplicadas', () => {
      expect(
        topological_sort(
          ['A', 'B'],
          [
            ['A', 'B'],
            ['A', 'B'],
          ]
        )
      ).toEqual(['A', 'B']);
    });

    test('deve retornar array vazio quando uma aresta formar um auto-ciclo', () => {
      expect(
        topological_sort(
          ['A'],
          [['A', 'A']]
        )
      ).toEqual([]);
    });

    test('deve ignorar corretamente nós sem dependências', () => {
      const result = topological_sort(
        ['A', 'B', 'C'],
        [['A', 'B']]
      );

      expect(result).toHaveLength(3);
      expect(result.indexOf('A')).toBeLessThan(result.indexOf('B'));
    });
  });

  describe('Entradas inválidas ou não tratadas explicitamente', () => {
    test('deve lançar TypeError quando nodes for null', () => {
      expect(() =>
        topological_sort(null as unknown as string[], [])
      ).toThrow(TypeError);
    });

    test('deve lançar TypeError quando edges for null', () => {
      expect(() =>
        topological_sort(['A'], null as unknown as [string, string][])
      ).toThrow(TypeError);
    });

    test('deve lançar TypeError quando nodes for undefined', () => {
      expect(() =>
        topological_sort(undefined as unknown as string[], [])
      ).toThrow(TypeError);
    });

    test('deve lançar TypeError quando edges for undefined', () => {
      expect(() =>
        topological_sort(['A'], undefined as unknown as [string, string][])
      ).toThrow(TypeError);
    });

    test('deve lançar TypeError quando uma aresta não for iterável', () => {
      expect(() =>
        topological_sort(
          ['A', 'B'],
          [123 as unknown as [string, string]]
        )
      ).toThrow(TypeError);
    });

    test('deve lançar TypeError quando nodes não for um array', () => {
      expect(() =>
        topological_sort({} as unknown as string[], [])
      ).toThrow(TypeError);
    });

    test('deve lançar TypeError quando edges não for um array', () => {
      expect(() =>
        topological_sort(['A'], {} as unknown as [string, string][])
      ).toThrow(TypeError);
    });
  });
});