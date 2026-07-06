import { knapsack } from '../funcoes';

describe('knapsack', () => {
  describe('Caminho Feliz (Fluxos Positivos)', () => {
    it('deve retornar o valor máximo possível para uma configuração padrão de itens', () => {
      // Itens: [peso, valor]
      const items: [number, number][] = [
        [1, 6],
        [2, 10],
        [3, 12]
      ];
      const capacity = 5;
      // Melhor combinação: item 2 e item 3 (peso 2 + 3 = 5, valor 10 + 12 = 22)
      expect(knapsack(capacity, items)).toBe(22);
    });

    it('deve selecionar todos os itens se a capacidade for maior ou igual à soma de todos os pesos', () => {
      const items: [number, number][] = [
        [2, 3],
        [3, 4],
        [4, 5]
      ];
      const capacity = 10;
      expect(knapsack(capacity, items)).toBe(12);
    });

    it('deve escolher o item mais valioso quando múltiplos itens individuais cabem mas não juntos', () => {
      const items: [number, number][] = [
        [4, 40],
        [5, 50],
        [2, 20]
      ];
      const capacity = 6;
      // Escolhas possíveis: [4, 40] + [2, 20] = valor 60 (peso 6) ou [5, 50] = valor 50 (peso 5)
      expect(knapsack(capacity, items)).toBe(60);
    });
  });

  describe('Casos de Borda e Limites (Edge Cases)', () => {
    it('deve retornar 0 se a lista de itens estiver vazia', () => {
      expect(knapsack(10, [])).toBe(0);
    });

    it('deve retornar 0 se a capacidade da mochila for 0', () => {
      const items: [number, number][] = [[1, 10], [2, 20]];
      expect(knapsack(0, items)).toBe(0);
    });

    it('deve retornar 0 se todos os itens possuírem peso maior do que a capacidade', () => {
      const items: [number, number][] = [[5, 10], [6, 20]];
      expect(knapsack(3, items)).toBe(0);
    });

    it('deve lidar corretamente com itens que possuem valor 0', () => {
      const items: [number, number][] = [[1, 0], [2, 0]];
      expect(knapsack(5, items)).toBe(0);
    });

    it('deve lidar corretamente com itens que possuem peso 0 (itens gratuitos)', () => {
      const items: [number, number][] = [[0, 15], [2, 10]];
      // O item de peso 0 sempre deve ser adicionado se houver iteração sobre ele
      expect(knapsack(2, items)).toBe(25);
    });

    it('deve lidar com grandes valores inteiros sem estourar o limite numérico', () => {
      const items: [number, number][] = [[1, Number.MAX_SAFE_INTEGER - 100]];
      expect(knapsack(1, items)).toBe(Number.MAX_SAFE_INTEGER - 100);
    });
  });

  describe('Cobertura de Ramos e Fluxos Alternativos (Branch Coverage)', () => {
    it('não deve quebrar ou executar o laço interno se o peso do item for estritamente maior que a capacidade total', () => {
      const items: [number, number][] = [[10, 100]];
      expect(knapsack(5, items)).toBe(0);
    });

    it('deve garantir que o mesmo item não seja usado repetidamente (problema da mochila 0-1 real)', () => {
      const items: [number, number][] = [[2, 10]];
      const capacity = 4;
      // Se fosse a mochila não-limitada (unbounded), o resultado seria 20. Como é 0-1, deve ser 10.
      expect(knapsack(capacity, items)).toBe(10);
    });
  });
});