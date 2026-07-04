import { levenshtein } from '../funcoes';

describe('levenshtein', () => {
  describe('Caminho Feliz (Fluxos Positivos)', () => {
    it('deve retornar 0 para strings idênticas', () => {
      expect(levenshtein('casa', 'casa')).toBe(0);
    });

    it('deve calcular corretamente a distância para uma substituição simples', () => {
      expect(levenshtein('casa', 'gasa')).toBe(1);
    });

    it('deve calcular corretamente a distância para uma inserção simples', () => {
      expect(levenshtein('cas', 'casa')).toBe(1);
    });

    it('deve calcular corretamente a distância para uma remoção simples', () => {
      expect(levenshtein('casa', 'cas')).toBe(1);
    });

    it('deve resolver distâncias com múltiplas operações mistas', () => {
      // abajur -> azul:
      // b->z (sub), a->u (sub), j->l (sub), r->removido => total 4
      // Porém, o menor caminho matemático pode ser diferente. Vamos avaliar "kitten" e "sitting" (clássico: 3)
      expect(levenshtein('kitten', 'sitting')).toBe(3);
    });

    it('deve avançar corretamente recursão quando os primeiros caracteres coincidem', () => {
      expect(levenshtein('banana', 'bandana')).toBe(1);
    });
  });

  describe('Casos de Borda e Limites (Edge Cases)', () => {
    it('deve retornar 0 quando ambas as strings forem vazias', () => {
      expect(levenshtein('', '')).toBe(0);
    });

    it('deve retornar o comprimento da segunda string se a primeira for vazia', () => {
      expect(levenshtein('', 'teste')).toBe(5);
    });

    it('deve retornar o comprimento da primeira string se a segunda for vazia', () => {
      expect(levenshtein('framework', '')).toBe(9);
    });

    it('deve ser sensível a maiúsculas e minúsculas (case-sensitive)', () => {
      expect(levenshtein('Jest', 'jest')).toBe(1);
    });

    it('deve processar corretamente strings contendo caracteres especiais e espaços', () => {
      expect(levenshtein('a b', 'a  b')).toBe(1);
      expect(levenshtein('!!!', '!?!')).toBe(1);
    });
  });

  describe('Cobertura de Ramos e Fluxos Alternativos (Branch Coverage)', () => {
    it('deve acionar o ramo de substituição/inserção/deleção escolhendo o menor valor via Math.min', () => {
      // Teste específico para forçar caminhos diferentes na árvore de decisão do Math.min
      expect(levenshtein('abc', 'ac')).toBe(1); // Deleção de 'b'
      expect(levenshtein('ac', 'abc')).toBe(1); // Inserção de 'b'
    });

    it('deve calcular a distância correta para strings complementares totalmente diferentes', () => {
      expect(levenshtein('abc', 'def')).toBe(3);
    });
  });
});