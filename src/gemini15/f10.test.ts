import { find_in_sorted } from '../funcoes';
import { binary_search } from '../funcoes';

// Garantindo que a dependência interna de binary_search seja testada indiretamente através de find_in_sorted
describe('find_in_sorted', () => {
  describe('Caminho Feliz (Fluxos Positivos)', () => {
    it('deve encontrar um elemento localizado no centro do array ordenado', () => {
      expect(find_in_sorted([1, 3, 5, 7, 9], 5)).toBe(2);
    });

    it('deve encontrar um elemento na primeira metade do array ordenado', () => {
      expect(find_in_sorted([1, 3, 5, 7, 9], 3)).toBe(1);
    });

    it('deve encontrar um elemento na segunda metade do array ordenado', () => {
      expect(find_in_sorted([1, 3, 5, 7, 9], 7)).toBe(3);
    });

    it('deve encontrar o primeiro elemento do array', () => {
      expect(find_in_sorted([1, 3, 5, 7, 9], 1)).toBe(0);
    });

    it('deve encontrar o último elemento do array', () => {
      expect(find_in_sorted([1, 3, 5, 7, 9], 9)).toBe(4);
    });
  });

  describe('Casos de Borda e Limites (Edge Cases)', () => {
    it('deve retornar -1 quando o array estiver vazio', () => {
      expect(find_in_sorted([], 10)).toBe(-1);
    });

    it('deve retornar 0 quando houver apenas um elemento e ele for correspondente', () => {
      expect(find_in_sorted([100], 100)).toBe(0);
    });

    it('deve retornar -1 quando houver apenas um elemento e ele for divergente', () => {
      expect(find_in_sorted([100], 50)).toBe(-1);
    });

    it('deve funcionar corretamente com arrays contendo números negativos ordenados', () => {
      expect(find_in_sorted([-50, -25, 0, 25, 50], -25)).toBe(1);
    });

    it('deve lidar com limites numéricos máximos e mínimos do JavaScript', () => {
      const arr = [Number.MIN_SAFE_INTEGER, 0, Number.MAX_SAFE_INTEGER];
      expect(find_in_sorted(arr, Number.MIN_SAFE_INTEGER)).toBe(0);
      expect(find_in_sorted(arr, Number.MAX_SAFE_INTEGER)).toBe(2);
    });
  });

  describe('Fluxos Negativos (Elementos Não Encontrados)', () => {
    it('deve retornar -1 para um valor menor que o limite inferior do array', () => {
      expect(find_in_sorted([10, 20, 30], 5)).toBe(-1);
    });

    it('deve retornar -1 para um valor maior que o limite superior do array', () => {
      expect(find_in_sorted([10, 20, 30], 40)).toBe(-1);
    });

    it('deve retornar -1 para um valor intermediário inexistente', () => {
      expect(find_in_sorted([10, 20, 30], 15)).toBe(-1);
    });
  });
});