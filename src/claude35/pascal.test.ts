import { describe, expect, test } from '@jest/globals';
import { pascal } from '../funcoes';

describe('pascal', () => {
  describe('Caminho Feliz (Fluxos Positivos)', () => {
    test('deve retornar apenas [[1]] para n = 1', () => {
      expect(pascal(1)).toEqual([[1]]);
    });

    test('deve retornar 2 linhas corretas para n = 2', () => {
      expect(pascal(2)).toEqual([[1], [1, 1]]);
    });

    test('deve retornar 3 linhas corretas para n = 3', () => {
      expect(pascal(3)).toEqual([[1], [1, 1], [1, 2, 1]]);
    });

    test('deve retornar 4 linhas corretas para n = 4', () => {
      expect(pascal(4)).toEqual([[1], [1, 1], [1, 2, 1], [1, 3, 3, 1]]);
    });

    test('deve retornar 5 linhas corretas para n = 5', () => {
      expect(pascal(5)).toEqual([
        [1],
        [1, 1],
        [1, 2, 1],
        [1, 3, 3, 1],
        [1, 4, 6, 4, 1],
      ]);
    });

    test('deve retornar 6 linhas corretas para n = 6', () => {
      expect(pascal(6)).toEqual([
        [1],
        [1, 1],
        [1, 2, 1],
        [1, 3, 3, 1],
        [1, 4, 6, 4, 1],
        [1, 5, 10, 10, 5, 1],
      ]);
    });

    test('deve retornar 7 linhas corretas para n = 7', () => {
      expect(pascal(7)).toEqual([
        [1],
        [1, 1],
        [1, 2, 1],
        [1, 3, 3, 1],
        [1, 4, 6, 4, 1],
        [1, 5, 10, 10, 5, 1],
        [1, 6, 15, 20, 15, 6, 1],
      ]);
    });

    test('deve retornar 10 linhas para n = 10', () => {
      const result = pascal(10);
      expect(result).toHaveLength(10);
      expect(result[9]).toEqual([1, 9, 36, 84, 126, 126, 84, 36, 9, 1]);
    });
  });

  describe('Propriedades Matemáticas do Triângulo de Pascal', () => {
    test('cada linha deve começar e terminar com 1', () => {
      const result = pascal(8);
      result.forEach((row) => {
        expect(row[0]).toBe(1);
        expect(row[row.length - 1]).toBe(1);
      });
    });

    test('cada linha r deve ter exatamente r + 1 elementos', () => {
      const result = pascal(8);
      result.forEach((row, idx) => {
        expect(row).toHaveLength(idx + 1);
      });
    });

    test('cada elemento interno deve ser a soma dos dois elementos acima', () => {
      const result = pascal(8);
      for (let r = 1; r < result.length; r++) {
        for (let c = 1; c < result[r].length - 1; c++) {
          expect(result[r][c]).toBe(result[r - 1][c - 1] + result[r - 1][c]);
        }
      }
    });

    test('a soma de cada linha deve ser 2^r', () => {
      const result = pascal(10);
      result.forEach((row, r) => {
        const sum = row.reduce((acc, val) => acc + val, 0);
        expect(sum).toBe(Math.pow(2, r));
      });
    });

    test('cada linha deve ser simétrica (palíndromo)', () => {
      const result = pascal(8);
      result.forEach((row) => {
        expect(row).toEqual([...row].reverse());
      });
    });

    test('o elemento central da linha de índice par deve ser o maior da linha', () => {
      const result = pascal(9);
      [2, 4, 6, 8].forEach((r) => {
        const mid = result[r][r / 2];
        result[r].forEach((val) => {
          expect(mid).toBeGreaterThanOrEqual(val);
        });
      });
    });

    test('a segunda coluna de cada linha r >= 1 deve ser igual a r', () => {
      const result = pascal(10);
      for (let r = 1; r < result.length; r++) {
        expect(result[r][1]).toBe(r);
      }
    });

    test('todos os valores devem ser inteiros positivos', () => {
      const result = pascal(10);
      result.forEach((row) => {
        row.forEach((val) => {
          expect(Number.isInteger(val)).toBe(true);
          expect(val).toBeGreaterThan(0);
        });
      });
    });

    test('a segunda linha deve ser sempre [1, 1] para qualquer n >= 2', () => {
      const result = pascal(5);
      expect(result[1]).toEqual([1, 1]);
    });

    test('deve retornar n linhas no total', () => {
      [1, 2, 3, 5, 7, 10].forEach((n) => {
        expect(pascal(n)).toHaveLength(n);
      });
    });
  });

  describe('Casos de Borda (Edge Cases)', () => {
    test('deve retornar array vazio para n = 0', () => {
      expect(pascal(0)).toEqual([]);
    });

    test('deve iniciar sempre com [[1]] como primeira linha', () => {
      [1, 2, 5, 10].forEach((n) => {
        expect(pascal(n)[0]).toEqual([1]);
      });
    });

    test('deve processar n = 15 sem erros e retornar 15 linhas', () => {
      const result = pascal(15);
      expect(result).toHaveLength(15);
      expect(result[14][0]).toBe(1);
      expect(result[14][14]).toBe(1);
    });

    test('deve processar n = 20 e validar a soma da última linha', () => {
      const result = pascal(20);
      const lastRowSum = result[19].reduce((acc, val) => acc + val, 0);
      expect(lastRowSum).toBe(Math.pow(2, 19));
    });

    test('deve retornar resultado correto para n grande (n = 30) sem overflow imediato', () => {
      const result = pascal(30);
      expect(result).toHaveLength(30);
      expect(result[29][0]).toBe(1);
      expect(result[29][29]).toBe(1);
      expect(typeof result[29][14]).toBe('number');
    });

    test('cada linha deve ser um array independente (não referência compartilhada)', () => {
      const result = pascal(5);
      result[1].push(999);
      expect(result[2]).toEqual([1, 2, 1]);
    });

    test('deve retornar [[1]] ao ser chamado com n = 1 múltiplas vezes de forma independente', () => {
      expect(pascal(1)).toEqual([[1]]);
      expect(pascal(1)).toEqual([[1]]);
      expect(pascal(1)).toEqual([[1]]);
    });

    test('deve lidar com n = 2 corretamente validando ramos upleft e upright', () => {
      const result = pascal(2);
      expect(result[1][0]).toBe(1);
      expect(result[1][1]).toBe(1);
    });

    test('deve retornar número correto de elementos totais para n = 5 (1+2+3+4+5 = 15)', () => {
      const result = pascal(5);
      const total = result.reduce((acc, row) => acc + row.length, 0);
      expect(total).toBe(15);
    });

    test('número total de elementos para n linhas deve ser n*(n+1)/2', () => {
      [1, 2, 3, 4, 5, 6, 7, 8].forEach((n) => {
        const result = pascal(n);
        const total = result.reduce((acc, row) => acc + row.length, 0);
        expect(total).toBe((n * (n + 1)) / 2);
      });
    });

    test('deve processar corretamente n negativo retornando somente [[1]] (loop não executa)', () => {
      const result = pascal(-1);
      expect(result).toEqual([[1]]);
    });
  });
});