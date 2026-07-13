import {
    bitcount, bucketsort, edgeKey, find_first_in_sorted, find_in_sorted, flatten,
    gcd, get_factors, is_valid_parenthesization, knapsack, levenshtein, lis,
    max_sublist_sum, mergesort, next_palindrome, next_permutation, pascal,
    possible_change, powerset, quicksort, shortest_path_lengths,
} from "../funcoes";

describe("traduções das versões corretas do QuixBugs", () => {
    test("bitcount", () => expect([bitcount(0), bitcount(127), bitcount(128)]).toEqual([0, 7, 1]));
    test("bucketsort", () => expect(bucketsort([5, 1, 3, 5, 0], 6)).toEqual([0, 1, 3, 5, 5]));
    test("find_first_in_sorted", () => expect(find_first_in_sorted([3, 4, 5, 5, 5, 6], 5)).toBe(2));
    test("find_in_sorted", () => {
        const arr = [3, 4, 5, 5, 5, 6];
        const index = find_in_sorted(arr, 5);
        expect(arr[index]).toBe(5);
        expect(find_in_sorted(arr, 7)).toBe(-1);
    });
    test("flatten", () => expect(Array.from(flatten([[1, [], [2, 3]], [[4]], 5]))).toEqual([1, 2, 3, 4, 5]));
    test("gcd", () => expect(gcd(35, 21)).toBe(7));
    test("get_factors", () => expect(get_factors(100)).toEqual([2, 2, 5, 5]));
    test("is_valid_parenthesization", () => {
        expect(is_valid_parenthesization("((()()))()")).toBe(true);
        expect(is_valid_parenthesization(")()(")).toBe(false);
    });
    test("knapsack", () => expect(knapsack(100, [[60, 10], [50, 8], [20, 4], [20, 4], [8, 3], [3, 2]])).toBe(19));
    test("levenshtein", () => expect(levenshtein("electron", "neutron")).toBe(3));
    test("lis", () => expect(lis([4, 1, 5, 3, 7, 6, 2])).toBe(3));
    test("max_sublist_sum", () => expect(max_sublist_sum([4, -5, 2, 1, -1, 3])).toBe(5));
    test("mergesort", () => expect(mergesort([3, 1, 2, 1])).toEqual([1, 1, 2, 3]));
    test("next_palindrome", () => expect(next_palindrome([1, 4, 9, 4, 1])).toEqual([1, 5, 0, 5, 1]));
    test("next_permutation", () => expect(next_permutation([3, 2, 4, 1])).toEqual([3, 4, 1, 2]));
    test("pascal", () => expect(pascal(5)).toEqual([[1], [1, 1], [1, 2, 1], [1, 3, 3, 1], [1, 4, 6, 4, 1]]));
    test("possible_change", () => expect(possible_change([1, 5, 10, 25], 11)).toBe(4));
    test("powerset", () => expect(powerset(["a", "b", "c"])).toEqual([[], ["c"], ["b"], ["b", "c"], ["a"], ["a", "c"], ["a", "b"], ["a", "b", "c"]]));
    test("quicksort", () => expect(quicksort([3, 1, 2, 1])).toEqual([1, 1, 2, 3]));
    test("shortest_path_lengths", () => {
        const edges = new Map([[edgeKey(0, 1), 5], [edgeKey(1, 2), 2], [edgeKey(0, 2), 10]]);
        const paths = shortest_path_lengths(3, edges);
        expect(paths.get(edgeKey(0, 2))).toBe(7);
        expect(paths.get(edgeKey(2, 0))).toBe(Number.POSITIVE_INFINITY);
    });
});
