import { describe, expect, test } from '@jest/globals';
import { shortest_path_step } from '../funcoes';

describe('shortest_path_step', () => {
  const simpleGraph = {
    A: ['B', 'C'],
    B: ['A', 'D', 'E'],
    C: ['A', 'F'],
    D: ['B'],
    E: ['B', 'F'],
    F: ['C', 'E'],
  };

  const linearGraph = {
    A: ['B'],
    B: ['C'],
    C: ['D'],
    D: [],
  };

  const cycleGraph = {
    A: ['B'],
    B: ['C'],
    C: ['A'],
  };

  const disconnectedGraph = {
    A: ['B'],
    B: ['A'],
    C: ['D'],
    D: ['C'],
  };

  describe('Caminho Feliz (Fluxos Positivos)', () => {
    test('deve retornar [start] quando start === target', () => {
      expect(shortest_path_step(simpleGraph, 'A', 'A')).toEqual(['A']);
    });

    test('deve retornar caminho direto entre vizinhos imediatos A -> B', () => {
      expect(shortest_path_step(simpleGraph, 'A', 'B')).toEqual(['A', 'B']);
    });

    test('deve retornar caminho direto entre vizinhos imediatos A -> C', () => {
      expect(shortest_path_step(simpleGraph, 'A', 'C')).toEqual(['A', 'C']);
    });

    test('deve retornar caminho de dois saltos A -> D', () => {
      expect(shortest_path_step(simpleGraph, 'A', 'D')).toEqual(['A', 'B', 'D']);
    });

    test('deve retornar caminho de dois saltos A -> E', () => {
      expect(shortest_path_step(simpleGraph, 'A', 'E')).toEqual(['A', 'B', 'E']);
    });

    test('deve retornar caminho de dois saltos A -> F', () => {
      expect(shortest_path_step(simpleGraph, 'A', 'F')).toEqual(['A', 'C', 'F']);
    });

    test('deve retornar caminho completo em grafo linear A -> D', () => {
      expect(shortest_path_step(linearGraph, 'A', 'D')).toEqual(['A', 'B', 'C', 'D']);
    });

    test('deve retornar caminho parcial em grafo linear A -> C', () => {
      expect(shortest_path_step(linearGraph, 'A', 'C')).toEqual(['A', 'B', 'C']);
    });

    test('deve retornar caminho mínimo em grafo linear A -> B', () => {
      expect(shortest_path_step(linearGraph, 'A', 'B')).toEqual(['A', 'B']);
    });

    test('deve navegar corretamente em grafo com ciclo A -> C', () => {
      expect(shortest_path_step(cycleGraph, 'A', 'C')).toEqual(['A', 'B', 'C']);
    });

    test('deve navegar corretamente em grafo com ciclo B -> A', () => {
      expect(shortest_path_step(cycleGraph, 'B', 'A')).toEqual(['B', 'C', 'A']);
    });

    test('deve retornar [B] quando start === target em nó com vizinhos', () => {
      expect(shortest_path_step(simpleGraph, 'B', 'B')).toEqual(['B']);
    });

    test('deve retornar caminho de três saltos D -> F', () => {
      const result = shortest_path_step(simpleGraph, 'D', 'F');
      expect(result[0]).toBe('D');
      expect(result[result.length - 1]).toBe('F');
      expect(result.length).toBeLessThanOrEqual(4);
    });

    test('deve encontrar caminho em grafo estrela hub-and-spoke', () => {
      const starGraph = {
        hub: ['A', 'B', 'C', 'D'],
        A: ['hub'],
        B: ['hub'],
        C: ['hub'],
        D: ['hub'],
      };
      expect(shortest_path_step(starGraph, 'A', 'D')).toEqual(['A', 'hub', 'D']);
    });

    test('deve retornar caminho direto em grafo totalmente conectado', () => {
      const fullGraph = {
        A: ['B', 'C', 'D'],
        B: ['A', 'C', 'D'],
        C: ['A', 'B', 'D'],
        D: ['A', 'B', 'C'],
      };
      expect(shortest_path_step(fullGraph, 'A', 'D')).toEqual(['A', 'D']);
    });

    test('deve retornar caminho correto com múltiplos caminhos de mesmo comprimento', () => {
      const multiPathGraph = {
        A: ['B', 'C'],
        B: ['D'],
        C: ['D'],
        D: [],
      };
      const result = shortest_path_step(multiPathGraph, 'A', 'D');
      expect(result[0]).toBe('A');
      expect(result[result.length - 1]).toBe('D');
      expect(result).toHaveLength(3);
    });

    test('deve encontrar caminho usando nós com identificadores numéricos como string', () => {
      const numGraph: any = {
        '1': ['2', '3'],
        '2': ['4'],
        '3': ['4'],
        '4': [],
      };
      const result = shortest_path_step(numGraph, '1', '4');
      expect(result[0]).toBe('1');
      expect(result[result.length - 1]).toBe('4');
      expect(result).toHaveLength(3);
    });

    test('deve retornar caminho correto em grafo com identificadores de string longa', () => {
      const namedGraph: any = {
        start: ['middle'],
        middle: ['end'],
        end: [],
      };
      expect(shortest_path_step(namedGraph, 'start', 'end')).toEqual(['start', 'middle', 'end']);
    });
  });

  describe('Fluxos Negativos — Caminho Não Encontrado', () => {
    test('deve retornar [] quando target não existe no grafo', () => {
      expect(shortest_path_step(simpleGraph, 'A', 'Z')).toEqual([]);
    });

    test('deve retornar [] quando start não existe no grafo', () => {
      expect(shortest_path_step(simpleGraph, 'X', 'A')).toEqual([]);
    });

    test('deve retornar [] quando start e target não existem no grafo', () => {
      expect(shortest_path_step(simpleGraph, 'X', 'Z')).toEqual([]);
    });

    test('deve retornar [] para grafo vazio', () => {
      expect(shortest_path_step({}, 'A', 'B')).toEqual([]);
    });

    test('deve retornar [] quando nós estão em componentes desconectados A -> C', () => {
      expect(shortest_path_step(disconnectedGraph, 'A', 'C')).toEqual([]);
    });

    test('deve retornar [] quando nós estão em componentes desconectados A -> D', () => {
      expect(shortest_path_step(disconnectedGraph, 'A', 'D')).toEqual([]);
    });

    test('deve retornar [] quando aresta é unidirecional e direção está errada', () => {
      const directedGraph = {
        A: ['B'],
        B: ['C'],
        C: [],
      };
      expect(shortest_path_step(directedGraph, 'C', 'A')).toEqual([]);
    });

    test('deve retornar [] em grafo linear tentando caminhar para trás', () => {
      expect(shortest_path_step(linearGraph, 'C', 'A')).toEqual([]);
    });

    test('deve retornar [] para nós completamente isolados sem arestas', () => {
      const isolatedGraph = { A: [], B: [], C: [] };
      expect(shortest_path_step(isolatedGraph, 'A', 'C')).toEqual([]);
    });

    test('deve retornar [] quando ciclo existe mas target está fora do ciclo', () => {
      const graphWithCycle: any = {
        A: ['B'],
        B: ['A'],
        C: [],
      };
      expect(shortest_path_step(graphWithCycle, 'A', 'C')).toEqual([]);
    });
  });

  describe('Casos de Borda (Edge Cases)', () => {
    test('deve retornar [A] para start === target em grafo vazio de nós', () => {
      expect(shortest_path_step({}, 'A', 'A')).toEqual(['A']);
    });

    test('deve retornar [A] para start === target em nó isolado sem arestas', () => {
      expect(shortest_path_step({ A: [] }, 'A', 'A')).toEqual(['A']);
    });

    test('deve retornar caminho de comprimento 1 para start === target', () => {
      expect(shortest_path_step(simpleGraph, 'D', 'D')).toHaveLength(1);
    });

    test('caminho retornado deve sempre iniciar com start', () => {
      const result = shortest_path_step(simpleGraph, 'B', 'F');
      if (result.length > 0) {
        expect(result[0]).toBe('B');
      }
    });

    test('caminho retornado deve sempre terminar com target', () => {
      const result = shortest_path_step(simpleGraph, 'B', 'F');
      if (result.length > 0) {
        expect(result[result.length - 1]).toBe('F');
      }
    });

    test('cada nó intermediário deve ser vizinho do anterior no grafo', () => {
      const result = shortest_path_step(simpleGraph, 'A', 'F');
      for (let i = 0; i < result.length - 1; i++) {
        expect(simpleGraph[result[i]]).toContain(result[i + 1]);
      }
    });

    test('não deve conter nós duplicados no caminho retornado', () => {
      const result = shortest_path_step(simpleGraph, 'A', 'F');
      const unique = new Set(result);
      expect(unique.size).toBe(result.length);
    });

    test('deve evitar loops infinitos em grafo com ciclo sem target atingível', () => {
      const result = shortest_path_step(cycleGraph, 'A', 'Z');
      expect(result).toEqual([]);
    });

    test('deve lidar com self-loop no grafo sem travar', () => {
      const selfLoopGraph = {
        A: ['A', 'B'],
        B: ['C'],
        C: [],
      };
      expect(shortest_path_step(selfLoopGraph, 'A', 'C')).toEqual(['A', 'B', 'C']);
    });

    test('deve lidar com nó sem lista de vizinhos definida (undefined key)', () => {
      const sparseGraph: any = { A: ['B'], B: ['C'] };
      expect(shortest_path_step(sparseGraph, 'A', 'C')).toEqual(['A', 'B', 'C']);
    });

    test('deve retornar caminho mínimo em grafo com múltiplos caminhos de comprimentos diferentes', () => {
      const multiLenGraph = {
        A: ['B', 'C'],
        B: ['D'],
        C: ['D'],
        D: ['E'],
        E: [],
      };
      const result = shortest_path_step(multiLenGraph, 'A', 'E');
      expect(result).toHaveLength(4);
      expect(result[0]).toBe('A');
      expect(result[result.length - 1]).toBe('E');
    });

    test('deve garantir que BFS encontra o caminho mais curto e não o mais longo', () => {
      const shortLongGraph = {
        A: ['B', 'C'],
        B: ['D'],
        C: ['X', 'Y'],
        X: ['Y'],
        Y: ['D'],
        D: [],
      };
      const result = shortest_path_step(shortLongGraph, 'A', 'D');
      expect(result).toHaveLength(3);
      expect(result).toEqual(['A', 'B', 'D']);
    });

    test('deve lidar com grafo denso retornando sempre caminho de tamanho 2 para vizinhos diretos', () => {
      const denseGraph: any = {};
      const nodes = ['A', 'B', 'C', 'D', 'E'];
      nodes.forEach((n) => {
        denseGraph[n] = nodes.filter((x) => x !== n);
      });
      expect(shortest_path_step(denseGraph, 'A', 'E')).toEqual(['A', 'E']);
    });

    test('deve retornar [] para grafo com nós mas start aponta para lista vazia e target é diferente', () => {
      const deadEndGraph = { A: [], B: ['A'] };
      expect(shortest_path_step(deadEndGraph, 'A', 'B')).toEqual([]);
    });

    test('deve lidar com caminho de volta em grafo bidirecional com múltiplos nós', () => {
      const bidirectionalGraph = {
        A: ['B'],
        B: ['A', 'C'],
        C: ['B', 'D'],
        D: ['C'],
      };
      expect(shortest_path_step(bidirectionalGraph, 'D', 'A')).toEqual(['D', 'C', 'B', 'A']);
    });

    test('resultado não deve incluir target antes de chegar nele', () => {
      const result = shortest_path_step(simpleGraph, 'A', 'E');
      const targetIdx = result.indexOf('E');
      expect(targetIdx).toBe(result.length - 1);
    });
  });
});