import { pascal } from '../funcoes';

describe('pascal', () => {
  describe('Caminho Feliz (Fluxos Positivos)', () => {
    it('deve gerar o Triângulo de Pascal correto com 1 linha', () => {
      expect(pascal(1)).toEqual([[1]]);
    });

    it('deve gerar o Triângulo de Pascal correto com 2 linhas', () => {
      expect(pascal(2)).toEqual([[1], [1, 1]]);
    });

    it('deve gerar o Triângulo de Pascal correto com 3 linhas', () => {
      expect(pascal(3)).toEqual([[1], [1, 1], [1, 2, 1]]);
    });

    it('deve gerar o Triângulo de Pascal correto com 5 linhas', () => {
      const expected = [
        [1],
        [1, 1],
        [1, 2, 1],
        [1, 3, 3, 1],
        [1, 4, 6, 4, 1]
      ];
      expect(pascal(5)).toEqual(expected);
    });
  });

  describe('Casos de Borda e Limites (Edge Cases)', () => {
    it('deve retornar a estrutura inicial de 1 linha quando "n" for igual a 0', () => {
      // Conforme a lógica do código, o loop 'for (let r = 1; r < 0; r++)' não executa.
      expect(pascal(0)).toEqual([[1]]);
    });

    it('deve retornar a estrutura inicial de 1 linha quando "n" for um número negativo', () => {
      // Conforme a lógica do código, o loop 'for (let r = 1; r < -5; r++)' não executa.
      expect(pascal(-5)).toEqual([[1]]);
    });

    it('deve lidar corretamente com um valor de linhas intermediariamente alto', () => {
      const result = pascal(10);
      expect(result.length).toBe(10);
      // A última linha de pascal(10) deve ter 10 elementos e o valor central correto
      expect(result[9]).toEqual([1, 9, 36, 84, 126, 126, 84, 36, 9, 1]);
    });
  });

  describe('Cobertura de Ramos de Fluxo Interno (Branch Coverage)', () => {
    it('deve cobrir as condições de contorno de coluna (upleft e upright zerados nas extremidades)', () => {
      const result = pascal(4);
      // Verificando a terceira linha ([1, 3, 3, 1]) para atestar os limites de 'c > 0' e 'c < r'
      const row3 = result[3];
      expect(row3[0]).toBe(1); // c = 0 -> upleft = 0, upright = rows[2][0] (1)
      expect(row3[1]).toBe(3); // c = 1 -> upleft = rows[2][0] (1), upright = rows[2][1] (2)
      expect(row3[3]).toBe(1); // c = 3 -> upleft = rows[2][2] (1), upright = 0
    });
  });
});