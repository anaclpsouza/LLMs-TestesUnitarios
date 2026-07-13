import { flatten } from "../functions/flatten";

describe("flatten", () => {
    test("yields nothing for an empty array", () => {
        expect([...flatten([])]).toEqual([]);
    });

    test("yields the same values for an array without nested arrays", () => {
        expect([...flatten([1, 2, 3])]).toEqual([1, 2, 3]);
    });

    test("flattens a single nested array", () => {
        expect([...flatten([[1, 2, 3]])]).toEqual([1, 2, 3]);
    });

    test("flattens nested arrays mixed with top-level values", () => {
        expect([...flatten([1, [2, 3], 4])]).toEqual([1, 2, 3, 4]);
    });

    test("flattens deeply nested arrays", () => {
        expect([...flatten([1, [2, [3, [4, [5]]]]])]).toEqual([1, 2, 3, 4, 5]);
    });

    test("preserves the order of values while flattening", () => {
        expect([...flatten([[1, 2], 3, [[4], 5], 6])]).toEqual([1, 2, 3, 4, 5, 6]);
    });

    test("skips empty nested arrays", () => {
        expect([...flatten([[], [1, [], [2, []]], [], 3])]).toEqual([1, 2, 3]);
    });

    test("handles arrays containing different primitive value types", () => {
        expect([...flatten([1, ["a", true], null, [undefined, false]])]).toEqual([
            1,
            "a",
            true,
            null,
            undefined,
            false,
        ]);
    });

    test("preserves object references", () => {
        const objectValue = { id: 1 };
        const arrayValue = [objectValue];


        expect([...flatten([arrayValue])]).toEqual([objectValue]);
        expect([...flatten([arrayValue])][0]).toBe(objectValue);


    });

    test("treats non-array iterable values as values, not as nested arrays", () => {
        const setValue = new Set([1, 2]);
        const stringValue = "abc";


        expect([...flatten([setValue, [stringValue]])]).toEqual([setValue, stringValue]);


    });

    test("allows partial iteration because the function returns a generator", () => {
        const generator = flatten([1, [2, 3]]);


        expect(generator.next()).toEqual({ value: 1, done: false });
        expect(generator.next()).toEqual({ value: 2, done: false });
        expect(generator.next()).toEqual({ value: 3, done: false });
        expect(generator.next()).toEqual({ value: undefined, done: true });


    });

    test("does not mutate the original nested array", () => {
        const input = [1, [2, [3]], 4];
        const original = [1, [2, [3]], 4];


        [...flatten(input)];

        expect(input).toEqual(original);


    });
});
