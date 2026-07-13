import { quicksort } from "../functions/quicksort";

describe("quicksort", () => {
    test("retorna array vazio quando entrada é vazia", () => {
        expect(quicksort([])).toEqual([]);
    });

    test("retorna o mesmo array para um único elemento", () => {
        expect(quicksort([5])).toEqual([5]);
    });

    test("ordena array de dois elementos já ordenados", () => {
        expect(quicksort([1, 2])).toEqual([1, 2]);
    });

    test("ordena array de dois elementos fora de ordem", () => {
        expect(quicksort([2, 1])).toEqual([1, 2]);
    });

    test("ordena array já ordenado", () => {
        expect(quicksort([1, 2, 3, 4, 5])).toEqual([1, 2, 3, 4, 5]);
    });

    test("ordena array em ordem decrescente", () => {
        expect(quicksort([5, 4, 3, 2, 1])).toEqual([1, 2, 3, 4, 5]);
    });

    test("ordena array com elementos duplicados", () => {
        expect(quicksort([3, 1, 2, 3, 1])).toEqual([1, 1, 2, 3, 3]);
    });

    test("ordena array com todos os elementos iguais", () => {
        expect(quicksort([4, 4, 4, 4])).toEqual([4, 4, 4, 4]);
    });

    test("ordena array com números negativos", () => {
        expect(quicksort([-3, -1, -2, 0, 2, 1])).toEqual([-3, -2, -1, 0, 1, 2]);
    });

    test("ordena array com números negativos e positivos misturados", () => {
        expect(quicksort([5, -3, 2, -8, 0, 7])).toEqual([-8, -3, 0, 2, 5, 7]);
    });

    test("ordena array grande com valores aleatórios", () => {
        expect(quicksort([9, 3, 7, 1, 8, 2, 5, 4, 6, 0])).toEqual([
            0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
        ]);
    });

    test("ordena array com pivô repetido múltiplas vezes", () => {
        expect(quicksort([2, 2, 2, 1, 3, 2])).toEqual([1, 2, 2, 2, 2, 3]);
    });

    test("ordena array onde o pivô inicial é o menor elemento", () => {
        expect(quicksort([1, 5, 3, 4, 2])).toEqual([1, 2, 3, 4, 5]);
    });

    test("ordena array onde o pivô inicial é o maior elemento", () => {
        expect(quicksort([5, 1, 3, 4, 2])).toEqual([1, 2, 3, 4, 5]);
    });

    test("não modifica o array original (imutabilidade)", () => {
        const original = [3, 1, 2];
        const result = quicksort(original);
        expect(original).toEqual([3, 1, 2]);
        expect(result).toEqual([1, 2, 3]);
    });
});