



// GRUPO 1: COMPLEXIDADE CICLOMÁTICA BAIXA

// 1. FATORIAL
export function factorial(n: number): number {
    if (n === 0) return 1;
    return n * factorial(n - 1);
}

// 2. FIBONACCI
export function fibonacci(n: number): number {
    if (n === 0) return 0;
    if (n === 1) return 1;
    return fibonacci(n - 1) + fibonacci(n - 2);
}

// 3. RERVERSE A STRING
export function reverse_string(s: string): string {
    if (s === "") return "";
    return reverse_string(s.slice(1)) + s[0];
}

// 4. MAX SUBLIST SUM
export function max_sublist_sum(arr: number[]): number {
    let max_so_far = 0;
    let max_ending_here = 0;
    for (const x of arr) {
        max_ending_here = Math.max(0, max_ending_here + x);
        max_so_far = Math.max(max_so_far, max_ending_here);
    }
    return max_so_far;
}

// 5. FLATTEN
export function flatten(arr: any[]): any[] {
    let result: any[] = [];
    for (const x of arr) {
        if (Array.isArray(x)) {
            result = result.concat(flatten(x));
        } else {
            result.push(x);
        }
    }
    return result;
}

// 6. IS PALINDROME
export function is_palindrome(s: string): boolean {
    if (s.length <= 1) return true;
    if (s[0] === s[s.length - 1]) {
        return is_palindrome(s.slice(1, -1));
    }
    return false;
}

// GRUPO 2: COMPLEXIDADE CICLOMÁTICA MÉDIA

// 7. GCD (MÁXIMO DIVISOR COMUM)
export function gcd(a: number, b: number): number {
    if (b === 0) return a;
    return gcd(b, a % b);
}

// 8. BINARY SEARCH
export function binary_search(arr: number[], x: number): number {
    let low = 0;
    let high = arr.length - 1;
    while (low <= high) {
        let mid = Math.floor((low + high) / 2);
        if (x < arr[mid]) {
            high = mid - 1;
        } else if (x > arr[mid]) {
            low = mid + 1;
        } else {
            return mid;
        }
    }
    return -1;
}

// 9. BUBBLE SORT
export function bubblesort(arr: number[]): number[] {
    let shifted = true;
    while (shifted) {
        shifted = false;
        for (let i = 0; i < arr.length - 1; i++) {
            if (arr[i] > arr[i + 1]) {
                let temp = arr[i];
                arr[i] = arr[i + 1];
                arr[i + 1] = temp;
                shifted = true;
            }
        }
    }
    return arr;
}

// 10. FIND IN SORTED
export function find_in_sorted(arr: number[], x: number): number {
    return binary_search(arr, x);
}

// 11. SHORTEST PATH LENGTHS (Floyd-Warshall parcial)
export function shortest_path_lengths(n: number, matrix: number[][]): number[][] {
    for (let k = 0; k < n; k++) {
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                matrix[i][j] = Math.min(matrix[i][j], matrix[i][k] + matrix[k][j]);
            }
        }
    }
    return matrix;
}

// 12. PASCAL TRIANGLE
export function pascal(n: number): number[][] {
    let rows: number[][] = [[1]];
    for (let r = 1; r < n; r++) {
        let row: number[] = [];
        for (let c = 0; c < r + 1; c++) {
            let upleft = c > 0 ? rows[r - 1][c - 1] : 0;
            let upright = c < r ? rows[r - 1][c] : 0;
            row.push(upleft + upright);
        }
        rows.push(row);
    }
    return rows;
}

// 13. NEXT PERMUTATION
export function next_permutation(arr: number[]): number[] {
    for (let i = arr.length - 2; i >= 0; i--) {
        if (arr[i] < arr[i + 1]) {
            for (let j = arr.length - 1; j > i; j--) {
                if (arr[j] > arr[i]) {
                    let temp = arr[i];
                    arr[i] = arr[j];
                    arr[j] = temp;
                    let rest = arr.slice(i + 1).reverse();
                    return arr.slice(0, i + 1).concat(rest);
                }
            }
        }
    }
    return [];
}

// GRUPO 3: COMPLEXIDADE CICLOMÁTICA ALTA

// 14. LEVENSHTEIN DISTANCE
export function levenshtein(s: string, t: string): number {
    if (s === t) return 0;
    if (s.length === 0) return t.length;
    if (t.length === 0) return s.length;

    if (s[0] === t[0]) {
        return levenshtein(s.slice(1), t.slice(1));
    } else {
        return 1 + Math.min(
            levenshtein(s, t.slice(1)),
            levenshtein(s.slice(1), t),
            levenshtein(s.slice(1), t.slice(1))
        );
    }
}

// 15. LIS (LONGEST INCREASING SUBSEQUENCE)
export function lis(arr: number[]): number {
    let ends: { [key: number]: number } = {};
    let longest = 0;
    for (let i = 0; i < arr.length; i++) {
        let val = arr[i];
        let length_prefix = 0;
        for (let j = 1; j <= longest; j++) {
            if (arr[ends[j]] < val) {
                length_prefix = j;
            }
        }
        if (length_prefix === longest || val < arr[ends[length_prefix + 1]]) {
            ends[length_prefix + 1] = i;
            longest = Math.max(longest, length_prefix + 1);
        }
    }
    return longest;
}

// 16. QUICKSORT
export function quicksort(arr: number[]): number[] {
    if (arr.length === 0) return [];
    let pivot = arr[0];
    let lesser = arr.slice(1).filter(x => x < pivot);
    let greater = arr.slice(1).filter(x => x >= pivot);
    return quicksort(lesser).concat([pivot], quicksort(greater));
}

// 17. MERGESORT
function merge(left: number[], right: number[]): number[] {
    let result: number[] = [];
    let i = 0, j = 0;
    while (i < left.length && j < right.length) {
        if (left[i] <= right[j]) {
            result.push(left[i]);
            i++;
        } else {
            result.push(right[j]);
            j++;
        }
    }
    return result.concat(left.slice(i)).concat(right.slice(j));
}
export function mergesort(arr: number[]): number[] {
    if (arr.length <= 1) return arr;
    let mid = Math.floor(arr.length / 2);
    let left = mergesort(arr.slice(0, mid));
    let right = mergesort(arr.slice(mid));
    return merge(left, right);
}

// 18. KNAPSACK (PROBLEMA DA MOCHILA)
export function knapsack(capacity: number, items: [number, number][]): number {
    let memo = Array(capacity + 1).fill(0);
    for (const [weight, value] of items) {
        for (let w = capacity; w >= weight; w--) {
            memo[w] = Math.max(memo[w], memo[w - weight] + value);
        }
    }
    return memo[capacity];
}

// 19. SHORTEST PATH STEP (Dijkstra/BFS helper)
export function shortest_path_step(graph: any, start: string, target: string): string[] {
    let queue: [string, string[]][] = [[start, [start]]];
    let visited = new Set<string>();
    while (queue.length > 0) {
        let [node, path] = queue.shift()!;
        if (node === target) return path;
        if (!visited.has(node)) {
            visited.add(node);
            for (const neighbor of graph[node] || []) {
                queue.push([neighbor, path.concat([neighbor])]);
            }
        }
    }
    return [];
}

// 20. TOPOLOGICAL SORT
export function topological_sort(nodes: string[], edges: [string, string][]): string[] {
    let in_degree: { [key: string]: number } = {};
    for (const node of nodes) in_degree[node] = 0;
    for (const [u, v] of edges) in_degree[v]++;

    let queue = nodes.filter(node => in_degree[node] === 0);
    let order: string[] = [];

    while (queue.length > 0) {
        let u = queue.shift()!;
        order.push(u);
        for (const [src, dest] of edges) {
            if (src === u) {
                in_degree[dest]--;
                if (in_degree[dest] === 0) queue.push(dest);
            }
        }
    }
    return order.length === nodes.length ? order : [];
}