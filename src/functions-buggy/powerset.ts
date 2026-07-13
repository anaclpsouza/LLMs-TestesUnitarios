export function powerset<T>(arr: T[]): T[][] {
    if (arr.length === 0) return [[]];
    const [first, ...rest] = arr;
    return powerset(rest).map(subset => [first, ...subset]);
}
