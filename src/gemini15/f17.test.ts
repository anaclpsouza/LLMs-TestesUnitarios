import { mergesort } from '../funcoes';

describe('mergesort', () => {
  describe('Caminho Feliz (Fluxos Positivos)', () => {
    it('deve ordenar corretamente um array desordenado de números positivos', () => {
      const input = [4, 2, 1, 3, 5];
      expect(mergesort(input)).toEqual([1, 2, 3, 4, 5]);
    });

    it('deve manter intacto um array que já está ordenado', () => {
      const input = [10, 20, 30, 40];
      expect(mergesort(input)).toEqual([10, 20, 30, 40]);
    });

    it('deve ordenar um array que está em ordem totalmente inversa', () => {
      const input = [9, 8, 7, 6, 5];
      expect(mergesort(input)).toEqual([5, 6, 7, 8, 9]);
    });

    it('deve ordenar corretamente mantendo a estabilidade com múltiplos elementos repetidos', () => {
      const input = [2, 1, 2, 3, 1];
      expect(mergesort(input)).toEqual([1, 1, 2, 2, 3]);
    });
  });

  describe('Casos de Borda e Limites (Edge Cases)', () => {
    it('deve retornar um array vazio quando receber um array vazio (caso base de parada)', () => {
      expect(mergesort([])).toEqual([]);
    });

    it('deve retornar o próprio array se ele possuir apenas um elemento (caso base de parada)', () => {
      expect(mergesort([7])).toEqual([7]);
    });

    it('deve ordenar corretamente arrays contendo números negativos', () => {
      const input = [-10, 5, -2, 0, -1, 3];
      expect(mergesort(input)).toEqual([-10, -2, -1, 0, 3, 5]);
    });

    it('deve ordenar corretamente um array composto apenas por elementos idênticos', () => {
      const input = [5, 5, 5, 5];
      expect(mergesort(input)).toEqual([5, 5, 5, 5]);
    });

    it('deve lidar de forma precisa com limites numéricos máximos e mínimos do JavaScript', () => {
      const input = [Number.MAX_SAFE_INTEGER, -500, Number.MIN_SAFE_INTEGER, 0];
      expect(mergesort(input)).toEqual([Number.MIN_SAFE_INTEGER, -500, 0, Number.MAX_SAFE_INTEGER]);
    });
  });

  describe('Garantia de Imutabilidade e Cobertura de Ramos (Branch Coverage)', () => {
    it('deve garantir que o algoritmo seja puro e não modifique a referência do array original', () => {
      const input = [3, 1, 2];
      const result = mergesort(input);
      expect(result).toEqual([1, 2, 3]);
      expect(input).toEqual([3, 1, 2]);
      expect(result).not.toBe(input);
    });

    it('deve cobrir o ramo em que o array da esquerda (left) se esgota primeiro no laço while do merge', () => {
      // Esquerda: [1, 5], Direita: [2, 3, 4] -> 1 entra, depois 2, 3, 4 entram da direita. Sobra [5] na esquerda.
      const input = [1, 5, 2, 3, 4];
      expect(mergesort(input)).toEqual([1, 2, 3, 4, 5]);
    });

    it('deve cobrir o ramo em que o array da direita (right) se esgota primeiro no laço while do merge', () => {
      // Esquerda: [2, 3, 4], Direita: [1, 5] -> 1 entra da direita, depois 2, 3, 4 da esquerda. Sobra [5] na direita.
      const input = [2, 3, 4, 1, 5];
      expect(mergesort(input)).toEqual([1, 2, 3, 4, 5]);
    });

    it('deve garantir a correta ordenação e cobertura da condição de igualdade estável (left[i] <= right[j])', () => {
      const input = [2, 2];
      expect(mergesort(input)).toEqual([2, 2]);
    });
  });
});