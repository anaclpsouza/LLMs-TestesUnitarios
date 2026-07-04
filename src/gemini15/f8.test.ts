import { binary_search } from '../funcoes';

describe('binary_search', () => {
  describe('Caminho Feliz (Fluxos Positivos)', () => {
    it('deve encontrar um elemento presente exatamente no meio do array', () => {
      expect(binary_search([10, 20, 30, 40, 50], 30)).toBe(2);
    });

    it('deve encontrar um elemento presente na primeira metade do array', () => {
      expect(binary_search([10, 20, 30, 40, 50], 20)).toBe(1);
    });

    it('deve encontrar um elemento presente na segunda metade do array', () => {
      expect(binary_search([10, 20, 30, 40, 50], 40)).toBe(3);
    });

    it('deve encontrar o primeiro elemento do array', () => {
      expect(binary_search([10, 20, 30, 40, 50], 10)).toBe(0);
    });

    it('deve encontrar o último elemento do array', () => {
      expect(binary_search([10, 20, 30, 40, 50], 50)).toBe(4);
    });

    it('deve funcionar corretamente com um array de comprimento par', () => {
      const arr = [1, 3, 5, 7, 9, 11];
      expect(binary_search(arr, 3)).toBe(1);
      expect(binary_search(arr, 9)).toBe(4);
    });
  });

  describe('Casos de Borda e Limites (Edge Cases)', () => {
    it('deve retornar -1 se o array estiver vazio', () => {
      expect(binary_search([], 5)).toBe(-1);
    });

    it('deve funcionar corretamente em um array com apenas um elemento correspondente', () => {
      expect(binary_search([42], 42)).toBe(0);
    });

    it('deve retornar -1 em um array com apenas um elemento não correspondente', () => {
      expect(binary_search([42], 7)).toBe(-1);
    });

    it('deve lidar corretamente com arrays contendo números negativos', () => {
      const arr = [-50, -30, -10, 0, 5, 15];
      expect(binary_search(arr, -30)).toBe(1);
      expect(binary_search(arr, 0)).toBe(3);
    });

    it('deve lidar com limites numéricos máximos e mínimos do JavaScript', () => {
      const arr = [Number.MIN_SAFE_INTEGER, -100, 0, Number.MAX_SAFE_INTEGER];
      expect(binary_search(arr, Number.MIN_SAFE_INTEGER)).toBe(0);
      expect(binary_search(arr, Number.MAX_SAFE_INTEGER)).toBe(3);
    });
  });

  describe('Fluxos Negativos (Elementos Não Encontrados e Ramos)', () => {
    it('deve retornar -1 para um elemento menor do que o menor valor do array', () => {
      expect(binary_search([10, 20, 30, 40, 50], 5)).toBe(-1);
    });

    it('deve retornar -1 para um elemento maior do que o maior valor do array', () => {
      expect(binary_search([10, 20, 30, 40, 50], 60)).toBe(-1);
    });

    it('deve retornar -1 para um elemento intermediário que não está presente no array', () => {
      expect(binary_search([10, 20, 30, 40, 50], 25)).toBe(-1);
    });

    it('deve retornar o índice de um dos elementos duplicados quando houver repetição (comportamento matemático inerente)', () => {
      const arr = [10, 20, 20, 20, 30];
      const res = binary_search(arr, 20);
      // mid inicial: (0 + 4)/2 = 2. arr[2] === 20 -> retorna 2.
      expect(res).toBe(2);
    });
  });
});