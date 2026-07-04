import { describe, expect, test } from '@jest/globals';
import { flatten } from '../funcoes';

describe('flatten', () => {
    describe('Caminho Feliz (Fluxos Positivos)', () => {
        test('deve achatar array com um único nível de aninhamento', () => {
            expect(flatten([[1, 2], [3, 4]])).toEqual([1, 2, 3, 4]);
        });

        test('deve achatar array com dois níveis de aninhamento', () => {
            expect(flatten([[1, [2, 3]], [4]])).toEqual([1, 2, 3, 4]);
        });

        test('deve achatar array com múltiplos níveis de aninhamento profundo', () => {
            expect(flatten([1, [2, [3, [4, [5]]]]])).toEqual([1, 2, 3, 4, 5]);
        });

        test('deve retornar o mesmo array quando não há aninhamento', () => {
            expect(flatten([1, 2, 3, 4, 5])).toEqual([1, 2, 3, 4, 5]);
        });

        test('deve achatar array com strings', () => {
            expect(flatten([['a', 'b'], ['c', 'd']])).toEqual(['a', 'b', 'c', 'd']);
        });

        test('deve achatar array com tipos mistos', () => {
            expect(flatten([1, 'two', [3, 'four'], [true, null]])).toEqual([1, 'two', 3, 'four', true, null]);
        });

        test('deve achatar array com booleanos', () => {
            expect(flatten([[true, false], [true]])).toEqual([true, false, true]);
        });

        test('deve achatar array com objetos', () => {
            const obj1 = { a: 1 };
            const obj2 = { b: 2 };
            expect(flatten([[obj1], [obj2]])).toEqual([obj1, obj2]);
        });

        test('deve achatar array com null e undefined entre elementos', () => {
            expect(flatten([null, [undefined, 1], [null]])).toEqual([null, undefined, 1, null]);
        });

        test('deve achatar array com números negativos', () => {
            expect(flatten([[-1, -2], [-3, [-4, -5]]])).toEqual([-1, -2, -3, -4, -5]);
        });

        test('deve achatar array com números decimais', () => {
            expect(flatten([[1.1, 2.2], [3.3]])).toEqual([1.1, 2.2, 3.3]);
        });

        test('deve achatar array com aninhamento assimétrico', () => {
            expect(flatten([1, [2, [3]], 4, [5]])).toEqual([1, 2, 3, 4, 5]);
        });

        test('deve achatar array com elementos duplicados', () => {
            expect(flatten([[1, 1], [2, 2], [1]])).toEqual([1, 1, 2, 2, 1]);
        });

        test('deve preservar a ordem dos elementos após achatamento', () => {
            expect(flatten([[3, 1], [4, 1], [5, 9]])).toEqual([3, 1, 4, 1, 5, 9]);
        });

        test('deve achatar array com NaN', () => {
            const result = flatten([[NaN], [NaN]]);
            expect(result).toHaveLength(2);
            result.forEach((val) => expect(val).toBeNaN());
        });

        test('deve achatar array com Infinity e -Infinity', () => {
            expect(flatten([[Infinity, -Infinity], [0]])).toEqual([Infinity, -Infinity, 0]);
        });

        test('deve achatar array com Number.MAX_SAFE_INTEGER e Number.MIN_SAFE_INTEGER', () => {
            expect(flatten([[Number.MAX_SAFE_INTEGER], [Number.MIN_SAFE_INTEGER]])).toEqual([
                Number.MAX_SAFE_INTEGER,
                Number.MIN_SAFE_INTEGER,
            ]);
        });
    });

    describe('Fluxos Negativos', () => {
        test('deve retornar array vazio para array vazio', () => {
            expect(flatten([])).toEqual([]);
        });

        test('deve retornar array vazio para array de arrays vazios', () => {
            expect(flatten([[], [], []])).toEqual([]);
        });

        test('deve retornar array vazio para array profundamente aninhado de arrays vazios', () => {
            expect(flatten([[[]], [[], [[]]]])).toEqual([]);
        });

        test('deve lidar com null como elemento direto sem lançar erro', () => {
            expect(flatten([null, null])).toEqual([null, null]);
        });

        test('deve lidar com undefined como elemento direto sem lançar erro', () => {
            expect(flatten([undefined, undefined])).toEqual([undefined, undefined]);
        });

        test('deve lançar erro ao receber null como argumento', () => {
            expect(() => flatten(null as unknown as any[])).toThrow();
        });

        test('deve lançar erro ao receber undefined como argumento', () => {
            expect(() => flatten(undefined as unknown as any[])).toThrow();
        });

        test('deve lançar erro ao receber string como argumento', () => {
            expect(() => flatten('string' as unknown as any[])).toThrow();
        });

        test('deve lançar erro ao receber número como argumento', () => {
            expect(() => flatten(42 as unknown as any[])).toThrow();
        });
    });

    describe('Casos de Borda (Edge Cases)', () => {
        test('deve achatar array com único elemento não aninhado', () => {
            expect(flatten([42])).toEqual([42]);
        });

        test('deve achatar array com único subarray unitário', () => {
            expect(flatten([[42]])).toEqual([42]);
        });

        test('deve achatar array com aninhamento de nível único muito largo', () => {
            const inner = Array.from({ length: 1000 }, (_, i) => i);
            expect(flatten([inner])).toEqual(inner);
        });

        test('deve achatar array com muitos subarrays de um elemento', () => {
            const arr = Array.from({ length: 1000 }, (_, i) => [i]);
            const expected = Array.from({ length: 1000 }, (_, i) => i);
            expect(flatten(arr)).toEqual(expected);
        });

        test('deve achatar array com função como elemento', () => {
            const fn = () => 42;
            expect(flatten([[fn], [fn]])).toEqual([fn, fn]);
        });

        test('deve achatar array com símbolo como elemento', () => {
            const sym = Symbol('test');
            expect(flatten([[sym]])).toEqual([sym]);
        });

        test('deve achatar array contendo string vazia', () => {
            expect(flatten([['', 'a'], ['']])).toEqual(['', 'a', '']);
        });

        test('deve achatar corretamente array com zeros', () => {
            expect(flatten([[0, 0], [0]])).toEqual([0, 0, 0]);
        });

        test('deve achatar corretamente array com false e 0 (valores falsy)', () => {
            expect(flatten([[false, 0], [null, undefined, '']])).toEqual([false, 0, null, undefined, '']);
        });

        test('resultado deve ser sempre um array plano independente da profundidade', () => {
            const nested = [1, [2, [3, [4, [5, [6, [7, [8, [9, [10]]]]]]]]]];
            const result = flatten(nested);
            result.forEach((item) => expect(Array.isArray(item)).toBe(false));
        });

        test('deve preservar referência de objetos após achatamento', () => {
            const obj = { id: 1 };
            const result = flatten([[obj]]);
            expect(result[0]).toBe(obj);
        });

        test('resultado achatado deve ter comprimento igual à soma dos elementos originais', () => {
            const arr = [[1, 2, 3], [4, 5], [6]];
            expect(flatten(arr)).toHaveLength(6);
        });

        test('deve achatar array misto com aninhamentos em posições alternadas', () => {
            expect(flatten([1, [2], 3, [4], 5, [6]])).toEqual([1, 2, 3, 4, 5, 6]);
        });
    });
});