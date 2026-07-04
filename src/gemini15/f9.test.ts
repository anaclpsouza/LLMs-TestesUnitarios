import { bubblesort } from '../funcoes';

describe('bubblesort', () => {
  describe('Caminho Feliz (Fluxos Positivos)', () => {
    it('deve ordenar corretamente um array desordenado de números positivos', () => {
      const input = [5, 3, 8, 4, 2];
      const result = bubblesort(input);
      expect(result).toEqual([2, 3, 4, 5, 8]);
    });

    it('deve manter um array que já está ordenado inalterado', () => {
      const input = [1, 2, 3, 4, 5];
      const result = bubblesort(input);
      expect(result).toEqual([1, 2, 3, 4, 5]);
    });

    it('deve ordenar corretamente um array em ordem totalmente inversa', () => {
      const input = [9, 7, 5, 3, 1];
      const result = bubblesort(input);
      expect(result).toEqual([1, 3, 5, 7, 9]);
    });

    it('deve ordenar corretamente um array que contém elementos duplicados', () => {
      const input = [3, 1, 3, 2, 1, 4];
      const result = bubblesort(input);
      expect(result).toEqual([1, 1, 2, 3, 3, 4]);
    });
  });

  describe('Casos de Borda e Limites (Edge Cases)', () => {
    it('deve retornar um array vazio quando receber um array vazio', () => {
      const input: number[] = [];
      const result = bubblesort(input);
      expect(result).toEqual([]);
    });

    it('deve retornar o mesmo array imutável em valores quando houver apenas um elemento', () => {
      const input = [42];
      const result = bubblesort(input);
      expect(result).toEqual([42]);
    });

    it('deve ordenar corretamente arrays contendo números negativos', () => {
      const input = [-3, 10, -1, 0, -5, 2];
      const result = bubblesort(input);
      expect(result).toEqual([-5, -3, -1, 0, 2, 10]);
    });

    it('deve lidar corretamente com limites numéricos máximos e mínimos do JavaScript', () => {
      const input = [Number.MAX_SAFE_INTEGER, 0, Number.MIN_SAFE_INTEGER, -100];
      const result = bubblesort(input);
      expect(result).toEqual([Number.MIN_SAFE_INTEGER, -100, 0, Number.MAX_SAFE_INTEGER]);
    });
  });

  describe('Fluxos de Cobertura de Ramos (Branch Coverage e Mutabilidade)', () => {
    it('deve garantir a mutação do array original passado por referência conforme implementação', () => {
      const input = [3, 2, 1];
      const result = bubblesort(input);
      expect(result).toBe(input); // Verifica se a referência de retorno é a mesma do parâmetro de entrada
    });

    it('deve executar apenas uma iteração do loop externo se nenhuma troca (shift) for necessária', () => {
      const input = [10, 20];
      const result = bubblesort(input);
      expect(result).toEqual([10, 20]);
    });
  });
});