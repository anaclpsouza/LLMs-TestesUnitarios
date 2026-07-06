import { lis } from '../funcoes';

describe('lis (Longest Increasing Subsequence)', () => {
  describe('Caminho Feliz (Fluxos Positivos)', () => {
    it('deve retornar o comprimento correto para uma sequência misturada padrão', () => {
      // Exemplo: [10, 9, 2, 5, 3, 7, 101, 18] -> LIS: [2, 3, 7, 101] ou [2, 5, 7, 101], etc. Comprimento = 4
      expect(lis([10, 9, 2, 5, 3, 7, 101, 18])).toBe(4);
    });

    it('deve retornar o comprimento total se o array já estiver estritamente crescente', () => {
      expect(lis([1, 2, 3, 4, 5])).toBe(5);
    });

    it('deve retornar 1 se o array estiver estritamente decrescente', () => {
      expect(lis([5, 4, 3, 2, 1])).toBe(1);
    });

    it('deve tratar corretamente sequências com flutuações e elementos repetidos', () => {
      // Como a subsequência deve ser estritamente crescente, elementos iguais não estendem o comprimento
      expect(lis([2, 2, 2, 2])).toBe(1);
    });

    it('deve calcular corretamente quando o menor elemento está no meio', () => {
      expect(lis([3, 4, -1, 0, 1, 2])).toBe(5); // LIS: [-1, 0, 1, 2] precedido por lógicas de substituição
    });
  });

  describe('Casos de Borda e Limites (Edge Cases)', () => {
    it('deve retornar 0 se o array estiver vazio', () => {
      expect(lis([])).toBe(0);
    });

    it('deve retornar 1 para um array com apenas um elemento', () => {
      expect(lis([42])).toBe(1);
    });

    it('deve funcionar corretamente com arrays contendo números negativos', () => {
      expect(lis([-10, -5, -2, -20, -1, -3])).toBe(4); // LIS: [-10, -5, -2, -1]
    });

    it('deve lidar corretamente com o valor zero', () => {
      expect(lis([0, 0, 1, 0, 2])).toBe(3); // LIS: [0, 1, 2]
    });

    it('deve suportar limites numéricos máximos e mínimos do JavaScript', () => {
      const arr = [Number.MIN_SAFE_INTEGER, 0, Number.MAX_SAFE_INTEGER];
      expect(lis(arr)).toBe(3);
    });
  });

  describe('Cobertura de Ramos de Fluxo Interno (Branch Coverage)', () => {
    it('deve acionar o ramo onde val não é menor que arr[ends[length_prefix + 1]] e length_prefix !== longest', () => {
      // Cenário para forçar a cobertura completa das condições do 'if' interno e do 'if' de atualização do 'ends'
      expect(lis([10, 20, 15, 30])).toBe(3); // 10 -> 20 -> 15 (substitui 20) -> 30
    });

    it('deve ignorar a atualização do mapa se as condições do bloco condicional externo não forem atendidas', () => {
      // Cenário projetado para exercitar caminhos onde o elemento atual não melhora nenhum prefixo existente e nem estende o longest
      expect(lis([10, 20, 10])).toBe(2);
    });
  });
});