import { flatten } from '../funcoes';

describe('flatten', () => {
  describe('Caminho Feliz (Fluxos Positivos)', () => {
    it('deve manter um array plano inalterado', () => {
      const input = [1, 2, 3, 4];
      expect(flatten(input)).toEqual([1, 2, 3, 4]);
    });

    it('deve achatar um array com um nível de aninhamento', () => {
      const input = [1, [2, 3], 4, [5]];
      expect(flatten(input)).toEqual([1, 2, 3, 4, 5]);
    });

    it('deve achatar um array com múltiplos níveis de aninhamento profundo', () => {
      const input = [1, [2, [3, [4, [5]]]]];
      expect(flatten(input)).toEqual([1, 2, 3, 4, 5]);
    });

    it('deve funcionar corretamente com arrays de strings e tipos mistos planos', () => {
      const input = ['a', ['b', 'c'], 1, [true, [false]]];
      expect(flatten(input)).toEqual(['a', 'b', 'c', 1, true, false]);
    });
  });

  describe('Casos de Borda e Limites (Edge Cases)', () => {
    it('deve retornar um array vazio quando receber um array vazio', () => {
      expect(flatten([])).toEqual([]);
    });

    it('deve lidar corretamente com arrays contendo apenas arrays vazios em múltiplos níveis', () => {
      const input = [[], [[]], [[[]]]];
      expect(flatten(input)).toEqual([]);
    });

    it('deve preservar valores falsy como nulo, undefined, zero e strings vazias sem achatá-los ou removê-los', () => {
      const input = [0, [null, undefined], '', [false]];
      expect(flatten(input)).toEqual([0, null, undefined, '', false]);
    });

    it('deve tratar elementos que são objetos complexos ou referências sem modificá-los', () => {
      const obj = { key: 'value' };
      const input = [[obj], obj];
      expect(flatten(input)).toEqual([obj, obj]);
    });

    it('deve funcionar com arrays extremamente longos e planos', () => {
      const input = Array(1000).fill(7);
      expect(flatten(input)).toEqual(Array(1000).fill(7));
    });
  });

  describe('Fluxos Alternativos e Variações', () => {
    it('deve achatar arrays onde todos os elementos são arrays', () => {
      const input = [[1, 2], [3, 4], [5, 6]];
      expect(flatten(input)).toEqual([1, 2, 3, 4, 5, 6]);
    });

    it('deve respeitar a ordem original dos elementos ao achatar de forma recursiva', () => {
      const input = [[1], 2, [3, [4]], 5];
      const result = flatten(input);
      expect(result).toEqual([1, 2, 3, 4, 5]);
      expect(result[0]).toBe(1);
      expect(result[4]).toBe(5);
    });
  });
});