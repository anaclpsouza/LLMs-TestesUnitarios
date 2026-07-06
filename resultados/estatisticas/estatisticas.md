# Estatísticas Descritivas

> Gerado em: 05/07/2026, 23:53:03

## Resumo Global

| Métrica | Valor |
|---|---|
| Total de execuções | 60 |
| Algoritmos OK | 30 (50%) |
| Algoritmos FAIL | 29 |
| Algoritmos TIMEOUT | 1 |
| Total de testes executados | 1330 |
| Testes passados | 1271 |
| Testes falhos | 59 |

## Por Modelo

| Modelo | OK | FAIL | Taxa Sucesso | Testes Passou | Testes Falhou | Stmt% médio | Branch% médio |
|---|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| **GPT-4o** | 6 | 14 | 30% | 341 | 33 | 15.46% | 6.16% |
| **Gemini** | 17 | 3 | 85% | 220 | 4 | 15.54% | 6.25% |
| **Claude** | 7 | 12 | 35% | 710 | 22 | 15.59% | 6.04% |

## Por Algoritmo

| Algoritmo | OK | FAIL | Taxa Sucesso | GPT-4o | Gemini | Claude |
|---|:---:|:---:|:---:|---|---|---|
| `factorial` | 2 | 1 | 66.7% | OK | OK | FAIL |
| `fibonacci` | 2 | 0 | 66.7% | OK | OK | TIMEOUT |
| `reverse_string` | 1 | 2 | 33.3% | FAIL | FAIL | OK |
| `max_sublist_sum` | 3 | 0 | 100% | OK | OK | OK |
| `flatten` | 2 | 1 | 66.7% | OK | OK | FAIL |
| `is_palindrome` | 1 | 2 | 33.3% | FAIL | OK | FAIL |
| `gcd` | 1 | 2 | 33.3% | FAIL | OK | FAIL |
| `binary_search` | 1 | 2 | 33.3% | FAIL | OK | FAIL |
| `bubblesort` | 2 | 1 | 66.7% | FAIL | OK | OK |
| `find_in_sorted` | 1 | 2 | 33.3% | FAIL | OK | FAIL |
| `shortest_path_lengths` | 2 | 1 | 66.7% | FAIL | OK | OK |
| `pascal` | 1 | 2 | 33.3% | FAIL | OK | FAIL |
| `next_permutation` | 0 | 3 | 0% | FAIL | FAIL | FAIL |
| `levenshtein` | 3 | 0 | 100% | OK | OK | OK |
| `lis` | 0 | 3 | 0% | FAIL | FAIL | FAIL |
| `quicksort` | 1 | 2 | 33.3% | FAIL | OK | FAIL |
| `mergesort` | 2 | 1 | 66.7% | FAIL | OK | OK |
| `knapsack` | 1 | 2 | 33.3% | FAIL | OK | FAIL |
| `shortest_path_step` | 1 | 2 | 33.3% | FAIL | OK | FAIL |
| `topological_sort` | 3 | 0 | 100% | OK | OK | OK |

## Estatísticas de Cobertura por Modelo

### GPT-4o

**Tempo (s):** média 2.11 | mediana 1.82 | desvio 1.21 | total 40.08 | min 1.65 | max 7.24

| Métrica | Média | Mediana | Desvio | Min | Max |
|---|:---:|:---:|:---:|:---:|:---:|
| Statements | 15.46% | 15.14% | 2.19 | 12.43% | 20% |
| Branches | 6.16% | 6.25% | 2.95 | 3.13% | 12.5% |
| Functions | 5.21% | 4.17% | 2.23 | 4.17% | 12.5% |
| Lines | 14.95% | 14.54% | 2.53 | 11.22% | 18.88% |

### Gemini

**Tempo (s):** média 1.68 | mediana 1.67 | desvio 0.1 | total 33.6 | min 1.54 | max 1.95

| Métrica | Média | Mediana | Desvio | Min | Max |
|---|:---:|:---:|:---:|:---:|:---:|
| Statements | 15.54% | 15.41% | 2.2 | 12.43% | 20% |
| Branches | 6.25% | 6.25% | 2.84 | 3.13% | 12.5% |
| Functions | 5.21% | 4.17% | 2.23 | 4.17% | 12.5% |
| Lines | 15.03% | 15.31% | 2.53 | 11.22% | 18.88% |

### Claude

**Tempo (s):** média 2.37 | mediana 2.04 | desvio 1.19 | total 45.02 | min 1.8 | max 7.3

| Métrica | Média | Mediana | Desvio | Min | Max |
|---|:---:|:---:|:---:|:---:|:---:|
| Statements | 15.59% | 15.41% | 2.25 | 12.43% | 20% |
| Branches | 6.04% | 6.25% | 2.9 | 3.13% | 12.5% |
| Functions | 5.33% | 4.17% | 2.32 | 4.17% | 12.5% |
| Lines | 15.11% | 15.31% | 2.52 | 11.22% | 18.88% |