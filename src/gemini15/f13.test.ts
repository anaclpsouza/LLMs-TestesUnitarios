import { next_permutation } from '../funcoes';

describe('next_permutation', () => {
  describe('Caminho Feliz (Fluxos Positivos)', () => {
    it('deve retornar a próxima permutação lexicográfica padrão de um array simples', () => {
      const input = [1, 2, 3];
      expect(next_permutation(input)).toEqual([1, 3, 2]);
    });

    it('deve avançar corretamente quando o pivô exige troca do primeiro elemento', () => {
      const input = [1, 3, 2];
      expect(next_permutation(input)).toEqual([2, 1, 3]);
    });

    it('deve lidar corretamente com permutações de sub-sufixos maiores', () => {
      const input = [2, 3, 1];
      expect(next_permutation(input)).toEqual([3, 1, 2]);
    });

    it('deve encontrar a próxima permutação em uma sequência com elementos repetidos', () => {
      const input = [1, 1, 5];
      expect(next_permutation(input)).toEqual([1, 5, 1]);
    });

    it('deve avançar corretamente quando há múltiplos elementos repetidos no sufixo decrescente', () => {
      const input = [1, 5, 5];
      expect(next_permutation(input)).toEqual([5, 1, 5]);
    });
  });

  describe('Casos de Borda e Limites (Edge Cases)', () => {
    it('deve retornar um array vazio se o array original estiver vazio', () => {
      expect(next_permutation([])).toEqual([]);
    });

    it('deve retornar um array vazio se o array contiver apenas um elemento', () => {
      expect(next_permutation([1])).toEqual([]);
    });

    it('deve retornar um array vazio se o array já estiver na sua última permutação lexicográfica (totalmente decrescente)', () => {
      const input = [3, 2, 1];
      expect(next_permutation(input)).toEqual([]);
    });

    it('deve retornar um array vazio se todos os elementos do array forem idênticos', () => {
      const input = [2, 2, 2];
      expect(next_permutation(input)).toEqual([]);
    });

    it('deve lidar corretamente com arrays contendo números negativos', () => {
      const input = [-3, -1, -2];
      expect(next_permutation(input)).toEqual([-3, -2, -1]);
    });

    it('deve funcionar com limites numéricos máximos e mínimos do JavaScript', () => {
      const input = [Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER];
      expect(next_permutation(input)).toEqual([Number.MAX_SAFE_INTEGER, Number.MIN_SAFE_INTEGER]);
    });
  });

  describe('Cobertura de Ramos de Fluxo Interno (Branch Coverage)', () => {
    it('deve testar a busca pelo pivô quando arr[i] >= arr[i+1] em grande parte do array', () => {
      // O laço externo passa por i=2 (5>4), i=1 (6>5) até i=0 (2<6), disparando as trocas internas.
      const input = [2, 6, 5, 4];
      expect(next_permutation(input)).toEqual([4, 2, 5, 6]);
    });

    it('deve mutar parcialmente o array original devido às trocas in-place antes de retornar a nova fatia concatenada', () => {
      const input = [1, 2, 4, 3];
      next_permutation(input);
      // Garante que o efeito colateral da mutação do operador 'arr[i] = arr[j]' ocorreu no array original passado por referência
      expect(input[2]).not.toBe(4);
    });
  });
});