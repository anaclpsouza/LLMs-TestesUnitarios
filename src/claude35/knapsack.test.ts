import { describe, expect, test } from '@jest/globals';
import { knapsack } from '../funcoes';

describe('knapsack', () => {
  describe('Caminho Feliz (Fluxos Positivos)', () => {
    test('deve retornar valor ótimo para exemplo clássico com 4 itens', () => {
      const items: [number, number][] = [[2, 6], [2, 10], [3, 12]];
      expect(knapsack(5, items)).toBe(22);
    });

    test('deve retornar valor ótimo para mochila com capacidade exata de um item', () => {
      const items: [number, number][] = [[3, 10], [5, 20], [7, 30]];
      expect(knapsack(5, items)).toBe(20);
    });

    test('deve retornar valor ótimo combinando múltiplos itens', () => {
      const items: [number, number][] = [[1, 1], [2, 6], [3, 10], [5, 16]];
      expect(knapsack(7, items)).toBe(22);
    });

    test('deve retornar valor ótimo para capacidade que permite todos os itens', () => {
      const items: [number, number][] = [[1, 5], [2, 10], [3, 15]];
      expect(knapsack(6, items)).toBe(30);
    });

    test('deve retornar valor ótimo para mochila com único item que cabe exatamente', () => {
      const items: [number, number][] = [[5, 100]];
      expect(knapsack(5, items)).toBe(100);
    });

    test('deve retornar valor ótimo escolhendo item mais valioso dentre alternativas', () => {
      const items: [number, number][] = [[3, 5], [3, 10], [3, 8]];
      expect(knapsack(3, items)).toBe(10);
    });

    test('deve retornar valor ótimo para mochila com capacidade 10 e múltiplos itens', () => {
      const items: [number, number][] = [[2, 3], [3, 4], [4, 5], [5, 6]];
      expect(knapsack(10, items)).toBe(13);
    });

    test('deve retornar valor ótimo ignorando itens mais pesados que a capacidade', () => {
      const items: [number, number][] = [[10, 100], [1, 5], [2, 10]];
      expect(knapsack(3, items)).toBe(15);
    });

    test('deve retornar valor ótimo para mochila de capacidade 1 com itens de peso 1', () => {
      const items: [number, number][] = [[1, 5], [1, 10], [1, 3]];
      expect(knapsack(1, items)).toBe(10);
    });

    test('deve retornar valor correto para itens com mesmo peso mas valores diferentes', () => {
      const items: [number, number][] = [[2, 1], [2, 5], [2, 3]];
      expect(knapsack(4, items)).toBe(8);
    });

    test('deve retornar valor correto para itens com mesmo valor mas pesos diferentes', () => {
      const items: [number, number][] = [[1, 10], [3, 10], [5, 10]];
      expect(knapsack(5, items)).toBe(50);
    });

    test('deve resolver instância clássica 0/1 de referência', () => {
      const items: [number, number][] = [
        [2, 6],
        [2, 10],
        [3, 12],
        [1, 4],
      ];
      expect(knapsack(6, items)).toBe(32);
    });

    test('deve retornar valor ótimo para grande capacidade e muitos itens', () => {
      const items: [number, number][] = [
        [1, 2], [3, 5], [4, 8], [5, 9], [7, 10],
      ];
      expect(knapsack(15, items)).toBe(30);
    });

    test('deve retornar valor ótimo quando todos os itens cabem na mochila', () => {
      const items: [number, number][] = [[1, 10], [2, 20], [3, 30]];
      expect(knapsack(100, items)).toBe(60);
    });
  });

  describe('Fluxos Negativos', () => {
    test('deve retornar 0 para array de itens vazio', () => {
      expect(knapsack(10, [])).toBe(0);
    });

    test('deve retornar 0 para capacidade 0 com itens disponíveis', () => {
      const items: [number, number][] = [[2, 10], [3, 15]];
      expect(knapsack(0, items)).toBe(0);
    });

    test('deve retornar 0 para capacidade 0 e array vazio', () => {
      expect(knapsack(0, [])).toBe(0);
    });

    test('deve retornar 0 quando nenhum item cabe na mochila', () => {
      const items: [number, number][] = [[5, 100], [10, 200]];
      expect(knapsack(3, items)).toBe(0);
    });

    test('deve retornar 0 quando capacidade é menor que o menor peso', () => {
      const items: [number, number][] = [[4, 50], [6, 80]];
      expect(knapsack(3, items)).toBe(0);
    });

    test('deve retornar 0 quando todos os itens têm peso maior que a capacidade', () => {
      const items: [number, number][] = [[10, 1], [20, 2], [30, 3]];
      expect(knapsack(5, items)).toBe(0);
    });
  });

  describe('Casos de Borda (Edge Cases)', () => {
    test('deve retornar 0 para capacidade 0 e lista vazia', () => {
      expect(knapsack(0, [])).toBe(0);
    });

    test('deve retornar 0 para lista vazia com qualquer capacidade', () => {
      expect(knapsack(100, [])).toBe(0);
    });

    test('deve retornar valor correto para único item que cabe exatamente', () => {
      const items: [number, number][] = [[7, 42]];
      expect(knapsack(7, items)).toBe(42);
    });

    test('deve retornar 0 para único item que não cabe', () => {
      const items: [number, number][] = [[10, 42]];
      expect(knapsack(9, items)).toBe(0);
    });

    test('deve retornar valor correto para item de peso 1 e capacidade 1', () => {
      const items: [number, number][] = [[1, 999]];
      expect(knapsack(1, items)).toBe(999);
    });

    test('deve retornar valor correto para capacidade igual ao peso total de todos os itens', () => {
      const items: [number, number][] = [[2, 5], [3, 10], [5, 20]];
      expect(knapsack(10, items)).toBe(35);
    });

    test('deve retornar valor correto para item com valor 0', () => {
      const items: [number, number][] = [[2, 0], [3, 10]];
      expect(knapsack(5, items)).toBe(10);
    });

    test('deve retornar valor correto para todos os itens com valor 0', () => {
      const items: [number, number][] = [[1, 0], [2, 0], [3, 0]];
      expect(knapsack(5, items)).toBe(0);
    });

    test('deve retornar valor correto com item de peso 1 repetível até capacidade', () => {
      const items: [number, number][] = [[1, 10]];
      expect(knapsack(5, items)).toBe(10);
    });

    test('deve retornar valor máximo com Number.MAX_SAFE_INTEGER como valor de item', () => {
      const items: [number, number][] = [[1, Number.MAX_SAFE_INTEGER]];
      expect(knapsack(1, items)).toBe(Number.MAX_SAFE_INTEGER);
    });

    test('deve lidar com múltiplos itens de peso 1 e capacidade total', () => {
      const items: [number, number][] = [[1, 5], [1, 8], [1, 3], [1, 10]];
      expect(knapsack(2, items)).toBe(18);
    });

    test('resultado deve ser sempre não negativo', () => {
      const cases: [number, [number, number][]][] = [
        [0, []],
        [0, [[1, 10]]],
        [5, []],
        [5, [[10, 100]]],
        [5, [[1, 5], [2, 10]]],
      ];
      cases.forEach(([capacity, items]) => {
        expect(knapsack(capacity, items)).toBeGreaterThanOrEqual(0);
      });
    });

    test('resultado deve ser sempre inteiro para itens com valores inteiros', () => {
      const items: [number, number][] = [[2, 6], [3, 10], [4, 12]];
      const result = knapsack(7, items);
      expect(Number.isInteger(result)).toBe(true);
    });

    test('resultado nunca deve exceder a soma de todos os valores disponíveis', () => {
      const items: [number, number][] = [[1, 5], [2, 10], [3, 15]];
      const totalValue = items.reduce((sum, [, v]) => sum + v, 0);
      expect(knapsack(10, items)).toBeLessThanOrEqual(totalValue);
    });

    test('deve ser determinístico: mesma entrada produz mesmo resultado', () => {
      const items: [number, number][] = [[2, 6], [2, 10], [3, 12]];
      const result1 = knapsack(5, items);
      const result2 = knapsack(5, items);
      expect(result1).toBe(result2);
    });

    test('deve lidar com mochila de capacidade 1 e um item de peso 1', () => {
      const items: [number, number][] = [[1, 7]];
      expect(knapsack(1, items)).toBe(7);
    });

    test('deve lidar com lista de um item e capacidade menor que o peso do item', () => {
      const items: [number, number][] = [[5, 50]];
      expect(knapsack(4, items)).toBe(0);
    });

    test('deve lidar com grande quantidade de itens', () => {
      const items: [number, number][] = Array.from(
        { length: 100 },
        (_, i) => [i + 1, (i + 1) * 2] as [number, number]
      );
      const result = knapsack(50, items);
      expect(result).toBeGreaterThan(0);
      expect(Number.isInteger(result)).toBe(true);
    });
  });
});