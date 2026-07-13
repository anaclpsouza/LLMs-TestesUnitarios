# Tabelas do experimento

Geradas automaticamente a partir de `resultados/resultados-compilados/resultados.json`.

| Modelo | Suítes | OK | Falhas | Executáveis | Defeitos detectados | Taxa de detecção |
| --- | --- | --- | --- | --- | --- | --- |
| GPT-4o | 20 | 19 | 1 | 95.00% | 19/19 | 100.00% |
| Gemini 1.5 Pro | 20 | 17 | 3 | 85.00% | 17/17 | 100.00% |
| Claude 3.5 Sonnet | 20 | 16 | 4 | 80.00% | 16/16 | 100.00% |

## Status por algoritmo

| Algoritmo | GPT-4o | Gemini 1.5 Pro | Claude 3.5 Sonnet |
| --- | --- | --- | --- |
| bitcount | OK | OK | OK |
| bucketsort | OK | OK | OK |
| find_first_in_sorted | OK | OK | OK |
| find_in_sorted | OK | OK | OK |
| flatten | OK | OK | OK |
| gcd | OK | OK | OK |
| get_factors | OK | OK | OK |
| is_valid_parenthesization | OK | OK | OK |
| knapsack | OK | ASSERTION_FAILURE | ASSERTION_FAILURE |
| levenshtein | OK | OK | OK |
| lis | OK | OK | OK |
| max_sublist_sum | OK | OK | ASSERTION_FAILURE |
| mergesort | OK | OK | OK |
| next_palindrome | OK | RUNTIME_ERROR | OK |
| next_permutation | OK | OK | OK |
| pascal | OK | OK | OK |
| possible_change | OK | ASSERTION_FAILURE | ASSERTION_FAILURE |
| powerset | OK | OK | OK |
| quicksort | OK | OK | OK |
| shortest_path_lengths | ASSERTION_FAILURE | OK | ASSERTION_FAILURE |
