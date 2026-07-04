import { shortest_path_lengths } from '../funcoes';

describe('shortest_path_lengths', () => {
  describe('Caminho Feliz (Fluxos Positivos)', () => {
    it('deve calcular corretamente as menores distâncias em um grafo padrão de 3 vértices (Floyd-Warshall)', () => {
      // Grafo com 3 vértices onde o caminho de 0 para 2 fica mais curto passando por 1
      // 0 -> 1 (custo 2), 1 -> 2 (custo 3), 0 -> 2 (custo inicial 10)
      const n = 3;
      const matrix = [
        [0, 2, 10],
        [Infinity, 0, 3],
        [Infinity, Infinity, 0]
      ];

      const expected = [
        [0, 2, 5], // 0 -> 2 passa a ser 2 + 3 = 5
        [Infinity, 0, 3],
        [Infinity, Infinity, 0]
      ];

      expect(shortest_path_lengths(n, matrix)).toEqual(expected);
    });

    it('deve manter a matriz inalterada se todos os caminhos diretos já forem os mais curtos', () => {
      const n = 2;
      const matrix = [
        [0, 5],
        [5, 0]
      ];

      const expected = [
        [0, 5],
        [5, 0]
      ];

      expect(shortest_path_lengths(n, matrix)).toEqual(expected);
    });
  });

  describe('Casos de Borda e Limites (Edge Cases)', () => {
    it('deve lidar corretamente com um grafo vazio (n = 0)', () => {
      const matrix: number[][] = [];
      expect(shortest_path_lengths(0, matrix)).toEqual([]);
    });

    it('deve lidar com grafo de um único vértice (n = 1)', () => {
      const matrix = [[0]];
      expect(shortest_path_lengths(1, matrix)).toEqual([[0]]);
    });

    it('deve tratar corretamente caminhos desconectados representados por Infinity', () => {
      const n = 3;
      const matrix = [
        [0, Infinity, Infinity],
        [Infinity, 0, Infinity],
        [Infinity, Infinity, 0]
      ];

      const expected = [
        [0, Infinity, Infinity],
        [Infinity, 0, Infinity],
        [Infinity, Infinity, 0]
      ];

      expect(shortest_path_lengths(n, matrix)).toEqual(expected);
    });

    it('deve processar corretamente uma matriz com valores máximos seguros e não quebrar', () => {
      const n = 2;
      const matrix = [
        [0, Number.MAX_SAFE_INTEGER],
        [Number.MAX_SAFE_INTEGER, 0]
      ];
      
      const expected = [
        [0, Number.MAX_SAFE_INTEGER],
        [Number.MAX_SAFE_INTEGER, 0]
      ];

      expect(shortest_path_lengths(n, matrix)).toEqual(expected);
    });
  });

  describe('Fluxos Negativos e Comportamentos Matemáticos Peculiares', () => {
    it('deve lidar com pesos negativos nas arestas sem entrar em loop infinito', () => {
      const n = 3;
      const matrix = [
        [0, 4, Infinity],
        [Infinity, 0, -2],
        [Infinity, Infinity, 0]
      ];

      const expected = [
        [0, 4, 2], // 0 -> 1 (4) + 1 -> 2 (-2) = 2
        [Infinity, 0, -2],
        [Infinity, Infinity, 0]
      ];

      expect(shortest_path_lengths(n, matrix)).toEqual(expected);
    });

    it('deve reduzir a diagonal principal se houver um ciclo negativo', () => {
      // Ciclo negativo entre o vértice 0 e 1: 0 -> 1 (1) e 1 -> 0 (-2). Total do ciclo = -1
      const n = 2;
      const matrix = [
        [0, 1],
        [-2, 0]
      ];

      const result = shortest_path_lengths(n, matrix);
      
      // O algoritmo atualiza a diagonal refletindo que andar no ciclo diminui o custo
      expect(result[0][0]).toBeLessThan(0);
      expect(result[1][1]).toBeLessThan(0);
    });
  });

  describe('Garantia de Mutabilidade', () => {
    it('deve modificar e retornar a mesma referência da matriz original fornecida', () => {
      const n = 2;
      const matrix = [
        [0, 1],
        [1, 0]
      ];

      const result = shortest_path_lengths(n, matrix);
      expect(result).toBe(matrix);
    });
  });
});