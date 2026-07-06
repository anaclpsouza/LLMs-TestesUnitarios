import { max_sublist_sum } from '../funcoes';

describe('max_sublist_sum', () => {
  describe('Caminho Feliz (Fluxos Positivos)', () => {
    it('deve retornar a soma máxima para um array misto padrão', () => {
      expect(max_sublist_sum([-2, 1, -3, 4, -1, 2, 1, -5, 4])).toBe(6); // Sublista: [4, -1, 2, 1]
    });

    it('deve retornar a soma de todos os elementos quando todos forem positivos', () => {
      expect(max_sublist_sum([1, 2, 3, 4])).toBe(10);
    });

    it('deve calcular corretamente quando a sublista máxima está no início', () => {
      expect(max_sublist_sum([10, 20, -50, 5, 5])).toBe(30);
    });

    it('deve calcular corretamente quando a sublista máxima está no fim', () => {
      expect(max_sublist_sum([-10, -5, 20, 30])).toBe(50);
    });
  });

  describe('Casos de Borda e Limites (Edge Cases)', () => {
    it('deve retornar 0 quando o array estiver vazio', () => {
      expect(max_sublist_sum([])).toBe(0);
    });

    it('deve retornar 0 quando todos os números forem negativos', () => {
      // O algoritmo inicializa max_so_far e max_ending_here com 0, retornando 0 para arrays puramente negativos
      expect(max_sublist_sum([-1, -2, -3, -4])).toBe(0);
    });

    it('deve retornar o próprio número se houver apenas um elemento positivo', () => {
      expect(max_sublist_sum([5])).toBe(5);
    });

    it('deve retornar 0 se houver apenas um elemento e ele for negativo', () => {
      expect(max_sublist_sum([-5])).toBe(0);
    });

    it('deve retornar 0 se o array contiver apenas zeros', () => {
      expect(max_sublist_sum([0, 0, 0, 0])).toBe(0);
    });

    it('deve lidar corretamente com números grandes evitando overflow inadequado', () => {
      expect(max_sublist_sum([Number.MAX_SAFE_INTEGER, -10, 10])).toBe(Number.MAX_SAFE_INTEGER);
    });
  });

  describe('Fluxos Alternativos e Variações', () => {
    it('deve reiniciar o acumulador adequadamente após sequências negativas anularem a soma', () => {
      expect(max_sublist_sum([1, 2, -10, 4, 5])).toBe(9); // Reinicia e pega [4, 5]
    });

    it('deve manter a sublista maior mesmo se houverem elementos positivos menores isolados depois', () => {
      expect(max_sublist_sum([10, 10, -5, 1])).toBe(20);
    });
  });
});