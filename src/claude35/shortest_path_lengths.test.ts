import { shortest_path_lengths, edgeKey } from "../functions/shortest_path_lengths";

describe("shortest_path_lengths", () => {
    test("retorna distância 0 de cada nó para si mesmo quando não há arestas", () => {
        const result = shortest_path_lengths(3, new Map());
        expect(result.get(edgeKey(0, 0))).toBe(0);
        expect(result.get(edgeKey(1, 1))).toBe(0);
        expect(result.get(edgeKey(2, 2))).toBe(0);
    });

    test("retorna infinito para pares sem caminho quando não há arestas", () => {
        const result = shortest_path_lengths(3, new Map());
        expect(result.get(edgeKey(0, 1))).toBeUndefined();
    });

    test("calcula distância direta para uma única aresta", () => {
        const edges = new Map([[edgeKey(0, 1), 5]]);
        const result = shortest_path_lengths(2, edges);
        expect(result.get(edgeKey(0, 1))).toBe(5);
    });

    test("calcula caminho mais curto através de nó intermediário", () => {
        const edges = new Map([
            [edgeKey(0, 1), 1],
            [edgeKey(1, 2), 2],
        ]);
        const result = shortest_path_lengths(3, edges);
        expect(result.get(edgeKey(0, 2))).toBe(3);
    });

    test("escolhe o caminho mais curto entre múltiplas rotas possíveis", () => {
        const edges = new Map([
            [edgeKey(0, 1), 10],
            [edgeKey(0, 2), 1],
            [edgeKey(2, 1), 1],
        ]);
        const result = shortest_path_lengths(3, edges);
        expect(result.get(edgeKey(0, 1))).toBe(2);
    });

    test("mantém distância direta quando é menor que caminho indireto", () => {
        const edges = new Map([
            [edgeKey(0, 1), 1],
            [edgeKey(0, 2), 10],
            [edgeKey(1, 2), 1],
        ]);
        const result = shortest_path_lengths(3, edges);
        expect(result.get(edgeKey(0, 2))).toBe(2);
    });

    test("calcula corretamente para grafo com quatro nós e múltiplos caminhos", () => {
        const edges = new Map([
            [edgeKey(0, 1), 3],
            [edgeKey(1, 2), 1],
            [edgeKey(2, 3), 1],
            [edgeKey(0, 3), 100],
        ]);
        const result = shortest_path_lengths(4, edges);
        expect(result.get(edgeKey(0, 3))).toBe(5);
    });

    test("distância entre nós desconectados permanece indefinida", () => {
        const edges = new Map([[edgeKey(0, 1), 1]]);
        const result = shortest_path_lengths(3, edges);
        expect(result.get(edgeKey(0, 2))).toBeUndefined();
        expect(result.get(edgeKey(2, 0))).toBeUndefined();
    });

    test("lida com n = 0 retornando mapa vazio", () => {
        const result = shortest_path_lengths(0, new Map());
        expect(result.size).toBe(0);
    });

    test("lida com n = 1 retornando apenas a distância do nó para si mesmo", () => {
        const result = shortest_path_lengths(1, new Map());
        expect(result.get(edgeKey(0, 0))).toBe(0);
        expect(result.size).toBe(1);
    });

    test("respeita direção das arestas em grafo direcionado", () => {
        const edges = new Map([[edgeKey(0, 1), 5]]);
        const result = shortest_path_lengths(2, edges);
        expect(result.get(edgeKey(0, 1))).toBe(5);
        expect(result.get(edgeKey(1, 0))).toBeUndefined();
    });

    test("calcula corretamente grafo completo com pesos variados", () => {
        const edges = new Map([
            [edgeKey(0, 1), 4],
            [edgeKey(0, 2), 8],
            [edgeKey(1, 2), 2],
            [edgeKey(2, 3), 1],
            [edgeKey(1, 3), 9],
        ]);
        const result = shortest_path_lengths(4, edges);
        expect(result.get(edgeKey(0, 3))).toBe(7);
        expect(result.get(edgeKey(0, 2))).toBe(6);
        expect(result.get(edgeKey(1, 3))).toBe(3);
    });

    test("aresta com peso 0 é tratada corretamente", () => {
        const edges = new Map([[edgeKey(0, 1), 0]]);
        const result = shortest_path_lengths(2, edges);
        expect(result.get(edgeKey(0, 1))).toBe(0);
    });

    test("caminho mais curto pode passar por múltiplos nós intermediários", () => {
        const edges = new Map([
            [edgeKey(0, 1), 1],
            [edgeKey(1, 2), 1],
            [edgeKey(2, 3), 1],
            [edgeKey(3, 4), 1],
        ]);
        const result = shortest_path_lengths(5, edges);
        expect(result.get(edgeKey(0, 4))).toBe(4);
    });
});