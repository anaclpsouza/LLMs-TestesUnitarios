# LLMs e geração de testes unitários sobre o QuixBugs

Este repositório contém um experimento sobre geração automatizada de testes unitários por modelos de linguagem. O corpus possui 20 programas do [QuixBugs](https://github.com/jkoppel/QuixBugs), traduzidos de Python para TypeScript a partir do commit `4257f44b0ff1181dedaedee6a447e133219fcebf`.

Os resultados da primeira execução foram removidos porque usavam um corpus parcialmente externo ao QuixBugs e uma coleta de cobertura inadequada. Todas as suítes devem ser geradas novamente com o protocolo desta versão.

## Corpus experimental

As implementações corretas estão em `src/functions/`, uma por arquivo. As versões com o defeito original do benchmark estão em `src/functions-buggy/` e são usadas somente pelo pipeline para avaliar a detecção do defeito conhecido.

Os 20 programas são:

```text
bitcount                     bucketsort
find_first_in_sorted         find_in_sorted
flatten                      gcd
get_factors                  is_valid_parenthesization
knapsack                     levenshtein
lis                          max_sublist_sum
mergesort                    next_palindrome
next_permutation             pascal
possible_change              powerset
quicksort                    shortest_path_lengths
```

O mapeamento entre cada arquivo Python oficial e sua tradução está em `artifacts/corpus-manifest.csv`. O aviso da licença MIT do QuixBugs foi preservado em `docs/QUIXBUGS-LICENSE.txt`.

## Validação das traduções

Instale as dependências e execute os 20 testes de referência antes de iniciar as gerações:

```powershell
git clone https://github.com/anaclpsouza/LLMs-TestesUnitarios.git
cd LLMs-TestesUnitarios
npm install
npm run validar-traducao
```

Particularidades herdadas do QuixBugs:

- `flatten` retorna um gerador; use `Array.from(flatten(valor))` para materializar o resultado;
- `next_permutation` retorna `undefined` quando não existe próxima permutação;
- `shortest_path_lengths` representa pares ordenados em um `Map<string, number>` e exporta `edgeKey(origem, destino)` para construir as chaves.

## Prompt e caminho de importação

Use exatamente o modelo disponível em `artifacts/prompt/prompt.txt`. Para cada geração:

1. substitua `NOME_DO_ALGORITMO` pelo nome do arquivo, sem a extensão `.ts`;
2. substitua o marcador final pelo conteúdo integral de `src/functions/<algoritmo>.ts`;
3. inicie uma conversa ou contexto limpo;
4. não forneça implementações de outros algoritmos;
5. preserve a resposta bruta antes de extrair o arquivo TypeScript;
6. não corrija manualmente o código gerado.

A suíte deve importar diretamente o módulo da função:

```ts
import { gcd } from "../functions/gcd";
```

Para `shortest_path_lengths`, quando necessário:

```ts
import { edgeKey, shortest_path_lengths } from "../functions/shortest_path_lengths";
```

Não use mais `../funcoes` nas novas gerações. O agregador `src/funcoes.ts` permanece apenas para compatibilidade interna e para os testes de referência.

## Modelos, repetições e nomes dos arquivos

As pastas dos modelos são:

| Modelo do estudo | Pasta |
|---|---|
| GPT-4o | `src/gpt4o/` |
| Gemini 1.5 Pro | `src/gemini15/` |
| Claude 3.5 Sonnet | `src/claude35/` |

Devem ser realizadas três gerações independentes para cada combinação de modelo e algoritmo. O experimento completo possui `3 modelos × 20 algoritmos × 3 repetições = 180 suítes`.

Use obrigatoriamente os nomes:

```text
<algoritmo>.rep01.test.ts
<algoritmo>.rep02.test.ts
<algoritmo>.rep03.test.ts
```

Exemplo para GPT-4o e `gcd`:

```text
src/gpt4o/gcd.rep01.test.ts
src/gpt4o/gcd.rep02.test.ts
src/gpt4o/gcd.rep03.test.ts
```

O formato antigo `<algoritmo>.test.ts` não é aceito pelo novo coletor. Uma repetição ausente é registrada explicitamente como `NO_TESTS`.

Para cada geração, preencha uma linha de `artifacts/generation-metadata.csv` com modelo/snapshot, data e hora, parâmetros disponíveis, arquivos e hash do prompt. Salve a resposta integral em `artifacts/raw-responses/<modelo>/<algoritmo>.repNN.txt`.

Não misture snapshots diferentes sob o mesmo nome de modelo. Se algum modelo original não estiver disponível, redefina formalmente os modelos do experimento e gere todas as 180 suítes com a nova seleção.

## Execução do experimento

Depois de inserir todas as suítes, execute:

```powershell
npm run experimento
```

O pipeline:

1. mede e registra a complexidade ciclomática de cada função;
2. verifica as 180 combinações planejadas;
3. executa cada suíte contra a versão correta;
4. calcula cobertura exclusivamente sobre `src/functions/<algoritmo>.ts` em um diretório novo por execução;
5. executa as suítes válidas contra a versão defeituosa correspondente;
6. registra se o defeito conhecido foi detectado;
7. consolida resultados e estatísticas descritivas.

Os estados possíveis são:

```text
OK
ASSERTION_FAILURE
COMPILE_ERROR
IMPORT_ERROR
RUNTIME_ERROR
NO_TESTS
TIMEOUT
INFRA_ERROR
```

Cobertura indisponível é registrada como `null`. Uma cobertura observada de 0% é mantida e incluída nas estatísticas.

Para diagnósticos, é possível restringir a execução:

```powershell
$env:EXPERIMENT_MODELS="gpt4o"
$env:EXPERIMENT_ALGORITHMS="gcd"
$env:EXPERIMENT_REPETITIONS="3"
npm run testes
```

## Artefatos produzidos

```text
resultados/
  runs/<modelo>/<algoritmo>/repNN/
    correct/
      jest.json
      run.log
      coverage/coverage-final.json
    buggy/
      jest.json
      run.log
  resultados-compilados/
    resultados.json
    resultados.csv
  complexidade/
    complexidade.csv
    complexidade.json
  estatisticas/
    estatisticas.json
```

Esses artefatos não são ignorados pelo Git porque constituem evidência experimental e devem acompanhar a versão final do estudo.

## Estrutura relevante

```text
artifacts/
  corpus-manifest.csv
  generation-metadata.csv
  prompt/prompt.txt
  raw-responses/
docs/
  protocolo.md
  QUIXBUGS-LICENSE.txt
scripts/
  coletarResultados.ts
  gerarEstatisticas.ts
  medirComplexidade.ts
  pipeline.ts
src/
  functions/
  functions-buggy/
  reference/
  gpt4o/
  gemini15/
  claude35/
```

Consulte `docs/protocolo.md` para as definições das unidades experimentais, estados, rastreabilidade, complexidade e tratamento de dados ausentes.
