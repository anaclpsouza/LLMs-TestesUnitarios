import { describe, expect, test } from '@jest/globals';
import { topological_sort } from '../funcoes';

describe('topological_sort', () => {
  describe('Caminho Feliz (Fluxos Positivos)', () => {
    test('deve ordenar grafo linear simples A -> B -> C', () => {
      expect(
        topological_sort(['A', 'B', 'C'], [['A', 'B'], ['B', 'C']])
      ).toEqual(['A', 'B', 'C']);
    });

    test('deve ordenar grafo com duas arestas independentes saindo de A', () => {
      const result = topological_sort(['A', 'B', 'C'], [['A', 'B'], ['A', 'C']]);
      expect(result[0]).toBe('A');
      expect(result).toContain('B');
      expect(result).toContain('C');
      expect(result).toHaveLength(3);
    });

    test('deve retornar ordem válida para DAG clássico de 4 nós', () => {
      const nodes = ['A', 'B', 'C', 'D'];
      const edges: [string, string][] = [['A', 'B'], ['A', 'C'], ['B', 'D'], ['C', 'D']];
      const result = topological_sort(nodes, edges);
      expect(result[0]).toBe('A');
      expect(result[result.length - 1]).toBe('D');
      expect(result).toHaveLength(4);
    });

    test('deve retornar todos os nós em alguma ordem válida', () => {
      const nodes = ['A', 'B', 'C', 'D', 'E'];
      const edges: [string, string][] = [
        ['A', 'B'], ['A', 'C'], ['B', 'D'], ['C', 'D'], ['D', 'E'],
      ];
      const result = topological_sort(nodes, edges);
      expect(result).toHaveLength(5);
      expect(result[0]).toBe('A');
      expect(result[result.length - 1]).toBe('E');
    });

    test('deve respeitar precedência: cada aresta u->v deve ter u antes de v', () => {
      const nodes = ['A', 'B', 'C', 'D'];
      const edges: [string, string][] = [['A', 'C'], ['B', 'C'], ['C', 'D']];
      const result = topological_sort(nodes, edges);
      expect(result).toHaveLength(4);
      edges.forEach(([u, v]) => {
        expect(result.indexOf(u)).toBeLessThan(result.indexOf(v));
      });
    });

    test('deve retornar ordem correta para grafo com múltiplas fontes', () => {
      const nodes = ['A', 'B', 'C'];
      const edges: [string, string][] = [['A', 'C'], ['B', 'C']];
      const result = topological_sort(nodes, edges);
      expect(result[result.length - 1]).toBe('C');
      expect(result).toContain('A');
      expect(result).toContain('B');
    });

    test('deve ordenar corretamente grafo de dependências de tarefas', () => {
      const nodes = ['wash', 'dry', 'fold', 'wear'];
      const edges: [string, string][] = [
        ['wash', 'dry'], ['dry', 'fold'], ['fold', 'wear'],
      ];
      const result = topological_sort(nodes, edges);
      expect(result).toEqual(['wash', 'dry', 'fold', 'wear']);
    });

    test('deve preservar a ordem topológica em DAG com múltiplos caminhos', () => {
      const nodes = ['1', '2', '3', '4', '5', '6'];
      const edges: [string, string][] = [
        ['6', '1'], ['6', '2'], ['5', '1'], ['5', '2'], ['3', '4'], ['2', '3'],
      ];
      const result = topological_sort(nodes, edges);
      expect(result).toHaveLength(6);
      edges.forEach(([u, v]) => {
        expect(result.indexOf(u)).toBeLessThan(result.indexOf(v));
      });
    });

    test('deve retornar ordem com nó único sem arestas', () => {
      expect(topological_sort(['A'], [])).toEqual(['A']);
    });

    test('deve ordenar grafo de 2 nós com uma aresta', () => {
      expect(topological_sort(['A', 'B'], [['A', 'B']])).toEqual(['A', 'B']);
    });

    test('deve conter todos os nós no resultado', () => {
      const nodes = ['A', 'B', 'C', 'D', 'E'];
      const edges: [string, string][] = [['A', 'B'], ['B', 'C'], ['C', 'D'], ['D', 'E']];
      const result = topological_sort(nodes, edges);
      nodes.forEach((n) => expect(result).toContain(n));
    });
  });

  describe('Casos Sem Arestas (Grafos Sem Dependências)', () => {
    test('deve retornar todos os nós em alguma ordem para grafo sem arestas', () => {
      const result = topological_sort(['A', 'B', 'C'], []);
      expect(result).toHaveLength(3);
      expect(result).toContain('A');
      expect(result).toContain('B');
      expect(result).toContain('C');
    });

    test('deve retornar os nós na ordem original quando não há dependências', () => {
      const result = topological_sort(['X', 'Y', 'Z'], []);
      expect(result).toEqual(['X', 'Y', 'Z']);
    });

    test('deve retornar nó único sem arestas', () => {
      expect(topological_sort(['solo'], [])).toEqual(['solo']);
    });
  });

  describe('Fluxos Negativos — Grafo com Ciclo', () => {
    test('deve retornar [] para ciclo simples A -> B -> A', () => {
      expect(
        topological_sort(['A', 'B'], [['A', 'B'], ['B', 'A']])
      ).toEqual([]);
    });

    test('deve retornar [] para ciclo de três nós A -> B -> C -> A', () => {
      expect(
        topological_sort(['A', 'B', 'C'], [['A', 'B'], ['B', 'C'], ['C', 'A']])
      ).toEqual([]);
    });

    test('deve retornar [] para ciclo de um nó (self-loop) A -> A', () => {
      expect(topological_sort(['A'], [['A', 'A']])).toEqual([]);
    });

    test('deve retornar [] para grafo com ciclo parcial e nós fora do ciclo', () => {
      const nodes = ['A', 'B', 'C', 'D'];
      const edges: [string, string][] = [['A', 'B'], ['B', 'C'], ['C', 'B'], ['C', 'D']];
      expect(topological_sort(nodes, edges)).toEqual([]);
    });

    test('deve retornar [] para ciclo de 4 nós', () => {
      const nodes = ['A', 'B', 'C', 'D'];
      const edges: [string, string][] = [
        ['A', 'B'], ['B', 'C'], ['C', 'D'], ['D', 'A'],
      ];
      expect(topological_sort(nodes, edges)).toEqual([]);
    });

    test('deve retornar [] para ciclo embutido em grafo maior', () => {
      const nodes = ['A', 'B', 'C', 'D', 'E'];
      const edges: [string, string][] = [
        ['A', 'B'], ['B', 'C'], ['C', 'B'], ['B', 'D'], ['D', 'E'],
      ];
      expect(topological_sort(nodes, edges)).toEqual([]);
    });
  });

  describe('Casos de Borda (Edge Cases)', () => {
    test('deve retornar [] para lista de nós vazia e lista de arestas vazia', () => {
      expect(topological_sort([], [])).toEqual([]);
    });

    test('deve retornar [] para lista de nós vazia com arestas fornecidas', () => {
      expect(topological_sort([], [['A', 'B']])).toEqual([]);
    });

    test('resultado deve conter cada nó exatamente uma vez', () => {
      const nodes = ['A', 'B', 'C', 'D'];
      const edges: [string, string][] = [['A', 'B'], ['A', 'C'], ['B', 'D'], ['C', 'D']];
      const result = topological_sort(nodes, edges);
      const unique = new Set(result);
      expect(unique.size).toBe(result.length);
    });

    test('resultado deve ter comprimento igual ao número de nós em DAG válido', () => {
      const nodes = ['A', 'B', 'C'];
      const edges: [string, string][] = [['A', 'B'], ['B', 'C']];
      expect(topological_sort(nodes, edges)).toHaveLength(3);
    });

    test('deve respeitar precedência para todas as arestas no resultado', () => {
      const nodes = ['A', 'B', 'C', 'D', 'E'];
      const edges: [string, string][] = [
        ['A', 'B'], ['A', 'C'], ['B', 'D'], ['C', 'D'], ['D', 'E'],
      ];
      const result = topological_sort(nodes, edges);
      edges.forEach(([u, v]) => {
        expect(result.indexOf(u)).toBeLessThan(result.indexOf(v));
      });
    });

    test('deve lidar com nós com strings mais longas como identificadores', () => {
      const nodes = ['start', 'middle', 'end'];
      const edges: [string, string][] = [['start', 'middle'], ['middle', 'end']];
      expect(topological_sort(nodes, edges)).toEqual(['start', 'middle', 'end']);
    });

    test('deve lidar com nós identificados por números como strings', () => {
      const nodes = ['1', '2', '3', '4'];
      const edges: [string, string][] = [['1', '2'], ['2', '3'], ['3', '4']];
      expect(topological_sort(nodes, edges)).toEqual(['1', '2', '3', '4']);
    });

    test('deve lidar com arestas redundantes paralelas sem ciclo', () => {
      const nodes = ['A', 'B', 'C'];
      const edges: [string, string][] = [['A', 'B'], ['A', 'C'], ['A', 'C']];
      const result = topological_sort(nodes, edges);
      expect(result[0]).toBe('A');
      expect(result).toContain('B');
      expect(result).toContain('C');
    });

    test('deve retornar [] para dois nós com ciclo mútuo', () => {
      expect(topological_sort(['X', 'Y'], [['X', 'Y'], ['Y', 'X']])).toEqual([]);
    });

    test('deve lidar com grafo diamante A->B, A->C, B->D, C->D', () => {
      const nodes = ['A', 'B', 'C', 'D'];
      const edges: [string, string][] = [['A', 'B'], ['A', 'C'], ['B', 'D'], ['C', 'D']];
      const result = topological_sort(nodes, edges);
      expect(result.indexOf('A')).toBeLessThan(result.indexOf('B'));
      expect(result.indexOf('A')).toBeLessThan(result.indexOf('C'));
      expect(result.indexOf('B')).toBeLessThan(result.indexOf('D'));
      expect(result.indexOf('C')).toBeLessThan(result.indexOf('D'));
    });

    test('deve lidar com muitos nós sem arestas (todos são fontes)', () => {
      const nodes = Array.from({ length: 20 }, (_, i) => `N${i}`);
      const result = topological_sort(nodes, []);
      expect(result).toHaveLength(20);
      nodes.forEach((n) => expect(result).toContain(n));
    });

    test('deve lidar com grafo de cadeia longa de 10 nós', () => {
      const nodes = Array.from({ length: 10 }, (_, i) => `N${i}`);
      const edges: [string, string][] = nodes.slice(0, -1).map(
        (n, i) => [n, `N${i + 1}`] as [string, string]
      );
      const result = topological_sort(nodes, edges);
      expect(result).toEqual(nodes);
    });

    test('nenhum elemento do resultado deve aparecer antes de seus predecessores', () => {
      const nodes = ['compile', 'link', 'test', 'deploy'];
      const edges: [string, string][] = [
        ['compile', 'link'],
        ['link', 'test'],
        ['test', 'deploy'],
      ];
      const result = topological_sort(nodes, edges);
      expect(result.indexOf('compile')).toBeLessThan(result.indexOf('link'));
      expect(result.indexOf('link')).toBeLessThan(result.indexOf('test'));
      expect(result.indexOf('test')).toBeLessThan(result.indexOf('deploy'));
    });
  });
});