import { topological_sort } from '../funcoes';

describe('topological_sort', () => {
  describe('Caminho Feliz (Fluxos Positivos)', () => {
    it('deve retornar a ordenação topológica correta para um grafo acíclico direcionado (DAG) simples', () => {
      const nodes = ['A', 'B', 'C'];
      const edges: [string, string][] = [
        ['A', 'B'],
        ['B', 'C']
      ];
      expect(topological_sort(nodes, edges)).toEqual(['A', 'B', 'C']);
    });

    it('deve ordenar corretamente um grafo com ramificações múltiplas e independentes', () => {
      const nodes = ['vestir_meias', 'vestir_sapatos', 'vestir_calca'];
      const edges: [string, string][] = [
        ['vestir_meias', 'vestir_sapatos'],
        ['vestir_calca', 'vestir_sapatos']
      ];
      const result = topological_sort(nodes, edges);
      
      expect(result.indexOf('vestir_meias')).toBeLessThan(result.indexOf('vestir_sapatos'));
      expect(result.indexOf('vestir_calca')).toBeLessThan(result.indexOf('vestir_sapatos'));
      expect(result.length).toBe(3);
    });

    it('deve processar corretamente nós desconexos/independentes', () => {
      const nodes = ['A', 'B', 'C'];
      const edges: [string, string][] = [];
      const result = topological_sort(nodes, edges);
      
      expect(result).toEqual(expect.arrayContaining(['A', 'B', 'C']));
      expect(result.length).toBe(3);
    });
  });

  describe('Casos de Borda e Limites (Edge Cases)', () => {
    it('deve retornar um array vazio se a lista de nós estiver vazia', () => {
      expect(topological_sort([], [])).toEqual([]);
    });

    it('deve funcionar para um grafo com apenas um nó e nenhuma aresta', () => {
      expect(topological_sort(['A'], [])).toEqual(['A']);
    });

    it('deve aceitar strings vazias como identificadores válidos de nós', () => {
      const nodes = ['', 'B'];
      const edges: [string, string][] = [['', 'B']];
      expect(topological_sort(nodes, edges)).toEqual(['', 'B']);
    });
  });

  describe('Fluxos Negativos e Detecção de Ciclos', () => {
    it('deve retornar um array vazio se houver um ciclo direto entre dois nós', () => {
      const nodes = ['A', 'B'];
      const edges: [string, string][] = [
        ['A', 'B'],
        ['B', 'A']
      ];
      expect(topological_sort(nodes, edges)).toEqual([]);
    });

    it('deve retornar um array vazio se houver um ciclo indireto complexo (auto-referência ou circuito longo)', () => {
      const nodes = ['A', 'B', 'C'];
      const edges: [string, string][] = [
        ['A', 'B'],
        ['B', 'C'],
        ['C', 'A']
      ];
      expect(topological_sort(nodes, edges)).toEqual([]);
    });

    it('deve retornar um array vazio se houver um nó com um loop para si mesmo (self-loop)', () => {
      const nodes = ['A', 'B'];
      const edges: [string, string][] = [
        ['A', 'A'],
        ['A', 'B']
      ];
      expect(topological_sort(nodes, edges)).toEqual([]);
    });
  });

  describe('Cobertura de Ramos de Fluxo Interno (Branch Coverage)', () => {
    it('deve garantir que o decremento do grau de entrada (in_degree) ignore arestas cuja origem não seja o nó atual da fila', () => {
      const nodes = ['A', 'B', 'C', 'D'];
      const edges: [string, string][] = [
        ['A', 'B'],
        ['C', 'D']
      ];
      // Esse cenário força a validação da condicional interna 'if (src === u)' para garantir cobertura total dos loops aninhados.
      const result = topological_sort(nodes, edges);
      expect(result.length).toBe(4);
      expect(result.indexOf('A')).toBeLessThan(result.indexOf('B'));
      expect(result.indexOf('C')).toBeLessThan(result.indexOf('D'));
    });
  });
});