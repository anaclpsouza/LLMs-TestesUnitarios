import { quicksort } from '../funcoes';

describe('quicksort', () => {
  describe('Caminho Feliz (Fluxos Positivos)', () => {
    it('deve ordenar corretamente um array desordenado de números positivos', () => {
      const input = [5, 3, 8, 4, 2, 1, 7, 6];
      expect(quicksort(input)).toEqual([1, 2, 3, 4, 5, 6, 7, 8]);
    });

    it('deve manter intacto um array que já está ordenado', () => {
      const input = [1, 2, 3, 4, 5];
      expect(quicksort(input)).toEqual([1, 2, 3, 4, 5]);
    });

    it('deve ordenar um array que está em ordem totalmente inversa', () => {
      const input = [5, 4, 3, 2, 1];
      expect(quicksort(input)).toEqual([1, 2, 3, 4, 5]);
    });

    it('deve ordenar corretamente um array com múltiplos elementos repetidos', () => {
      const input = [3, 1, 4, 3, 1, 2, 4];
      expect(quicksort(input)).toEqual([1, 1, 2, 3, 3, 4, 4]);
    });
  });

  describe('Casos de Borda e Limites (Edge Cases)', () => {
    it('deve retornar um array vazio quando receber um array vazio (caso base)', () => {
      expect(quicksort([])).toEqual([]);
    });

    it('deve retornar o próprio array se ele possuir apenas um elemento', () => {
      expect(quicksort([42])).toEqual([42]);
    });

    it('deve ordenar corretamente arrays contendo números negativos', () => {
      const input = [-3, 10, -1, 0, -5, 2];
      expect(quicksort(input)).toEqual([-5, -3, -1, 0, 2, 10]);
    });

    it('deve ordenar corretamente um array composto apenas por elementos idênticos', () => {
      const input = [7, 7, 7, 7];
      expect(quicksort(input)).toEqual([7, 7, 7, 7]);
    });

    it('deve lidar de forma precisa com limites numéricos máximos e mínimos do JavaScript', () => {
      const input = [Number.MAX_SAFE_INTEGER, 0, Number.MIN_SAFE_INTEGER, -9999];
      expect(quicksort(input)).toEqual([Number.MIN_SAFE_INTEGER, -9999, 0, Number.MAX_SAFE_INTEGER]);
    });
  });

  describe('Garantia de Imutabilidade e Ramos Internos', () => {
    it('deve garantir que o array original não seja mutado devido ao uso de fatiamento e filtros puros', () => {
      const input = [3, 1, 2];
      const result = quicksort(input);
      expect(result).toEqual([1, 2, 3]);
      expect(input).toEqual([3, 1, 2]); // O array original deve permanecer na mesma ordem
      expect(result).not.toBe(input);  // Deve ser uma nova referência
    });

    it('deve exercitar corretamente a partição quando todos os elementos subsequentes são estritamente menores que o pivô', () => {
      const input = [10, 5, 3, 2];
      expect(quicksort(input)).toEqual([2, 3, 5, 10]);
    });

    it('deve exercitar corretamente a partição quando todos os elementos subsequentes são maiores ou iguais ao pivô', () => {
      const input = [10, 20, 10, 30];
      expect(quicksort(input)).toEqual([10, 10, 20, 30]);
    });
  });
});