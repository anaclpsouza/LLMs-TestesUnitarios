import { shortest_path_step } from '../funcoes';

describe('shortest_path_step', () => {
  describe('Caminho Feliz (Fluxos Positivos)', () => {
    it('deve retornar o caminho direto de um nó para ele mesmo', () => {
      const graph = {
        A: ['B']
      };
      expect(shortest_path_step(graph, 'A', 'A')).toEqual(['A']);
    });

    it('deve encontrar o caminho mais curto com um único salto', () => {
      const graph = {
        A: ['B', 'C'],
        B: ['D'],
        C: ['D']
      };
      expect(shortest_path_step(graph, 'A', 'B')).toEqual(['A', 'B']);
    });

    it('deve encontrar o caminho mais curto com múltiplos saltos em um grafo acíclico', () => {
      const graph = {
        A: ['B'],
        B: ['C'],
        C: ['D'],
        D: []
      };
      expect(shortest_path_step(graph, 'A', 'D')).toEqual(['A', 'B', 'C', 'D']);
    });

    it('deve priorizar o caminho com menos arestas (BFS) quando múltiplos caminhos existirem', () => {
      const graph = {
        A: ['B', 'C'],
        B: ['D'],
        C: ['E'],
        E: ['D']
      };
      // Caminho por B tem 2 arestas (A->B->D). Caminho por C tem 3 arestas (A->C->E->D).
      expect(shortest_path_step(graph, 'A', 'D')).toEqual(['A', 'B', 'D']);
    });
  });

  describe('Casos de Borda e Limites (Edge Cases)', () => {
    it('deve retornar um array vazio se o destino for inalcançável', () => {
      const graph = {
        A: ['B'],
        B: [],
        C: ['D'],
        D: []
      };
      expect(shortest_path_step(graph, 'A', 'C')).toEqual([]);
    });

    it('deve lidar corretamente com nós que possuem listas de adjacência vazias', () => {
      const graph = {
        A: []
      };
      expect(shortest_path_step(graph, 'A', 'B')).toEqual([]);
    });

    it('deve lidar defensivamente quando o nó atual não existir no objeto do grafo (fallback para array vazio)', () => {
      const graph = {};
      expect(shortest_path_step(graph, 'A', 'B')).toEqual([]);
    });

    it('deve funcionar corretamente com strings vazias como identificadores de nós', () => {
      const graph = {
        '': ['B'],
        B: ['']
      };
      expect(shortest_path_step(graph, '', 'B')).toEqual(['', 'B']);
      expect(shortest_path_step(graph, 'B', '')).toEqual(['B', '']);
    });
  });

  describe('Fluxos de Controle e Ramos Internos (Branch Coverage)', () => {
    it('deve evitar loops infinitos em grafos com ciclos e retornar o caminho correto', () => {
      const graph = {
        A: ['B'],
        B: ['C', 'A'], // Ciclo de volta para A
        C: ['D'],
        D: []
      };
      expect(shortest_path_step(graph, 'A', 'D')).toEqual(['A', 'B', 'C', 'D']);
    });

    it('deve ignorar processamento repetido de vizinhos se o nó já foi visitado por outro caminho mais longo', () => {
      const graph = {
        A: ['B', 'C'],
        B: ['D'],
        C: ['B'], // C aponta para B, mas B já terá sido visitado/processado antes por ser nível 1
        D: []
      };
      expect(shortest_path_step(graph, 'A', 'D')).toEqual(['A', 'B', 'D']);
    });

    it('deve esvaziar completamente a fila e retornar vazio se o grafo for desconexo', () => {
      const graph = {
        A: ['B'],
        B: []
      };
      expect(shortest_path_step(graph, 'A', 'Z')).toEqual([]);
    });
  });
});