import { reverse_string } from '../funcoes';

describe('reverse_string', () => {
  describe('Caminho Feliz (Fluxos Positivos)', () => {
    it('deve inverter corretamente uma palavra simples', () => {
      expect(reverse_string('hello')).toBe('olleh');
    });

    it('deve inverter corretamente uma palavra com letras maiúsculas e minúsculas mantendo o case', () => {
      expect(reverse_string('TypeScript')).toBe('tpircSepyT');
    });

    it('deve inverter corretamente uma frase com espaços', () => {
      expect(reverse_string('jest tests')).toBe('stset tsej');
    });

    it('deve manter caracteres especiais e números na ordem inversa correta', () => {
      expect(reverse_string('123!@#')).toBe('#@!321');
    });
  });

  describe('Casos de Borda e Limites (Edge Cases)', () => {
    it('deve retornar uma string vazia quando receber uma string vazia (caso base)', () => {
      expect(reverse_string('')).toBe('');
    });

    it('deve retornar o próprio caractere quando receber uma string de comprimento 1', () => {
      expect(reverse_string('a')).toBe('a');
    });

    it('deve inverter corretamente strings contendo caracteres com múltiplos espaços em branco', () => {
      expect(reverse_string('   ')).toBe('   ');
    });

    it('deve tratar corretamente caracteres unicode e emojis', () => {
      // Nota: Emojis compostos podem sofrer quebra de surrógados na inversão simples por índice, 
      // o teste garante o comportamento matemático exato da função fornecida.
      expect(reverse_string('😊👍')).toBe('👍😊');
    });
  });

  describe('Fluxos Negativos e Limites de Pilha', () => {
    it('deve suportar uma string razoavelmente longa sem estourar o limite de recursão padrão', () => {
      const longString = 'a'.repeat(500);
      expect(reverse_string(longString)).toBe('a'.repeat(500));
    });
  });
});