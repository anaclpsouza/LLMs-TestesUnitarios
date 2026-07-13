# LLMs e geração de testes unitários sobre o QuixBugs

Este repositório contém um trabalho acadêmico institucional desenvolvido para a disciplina de **Engenharia de Software III** do **Instituto Federal de Educação, Ciência e Tecnologia do Sudeste de Minas Gerais (IF Sudeste MG)**.

O estudo investiga a geração automatizada de testes unitários por modelos de linguagem para programas do benchmark [QuixBugs](https://github.com/jkoppel/QuixBugs). O corpus experimental reúne 20 programas traduzidos de Python para TypeScript a partir do commit `4257f44b0ff1181dedaedee6a447e133219fcebf` do benchmark.

## Objetivo do experimento

O experimento compara suítes geradas por GPT-4o, Gemini 1.5 Pro e Claude 3.5 Sonnet. Para cada combinação de modelo e algoritmo, o pipeline verifica:

- se a suíte compila e executa sem correção manual;
- quantos testes passam ou falham contra a implementação correta;
- a cobertura da função-alvo;
- se a mesma suíte detecta o defeito conhecido do QuixBugs;
- como os resultados se relacionam com a complexidade ciclomática dos programas.

O delineamento possui uma geração para cada combinação de modelo e algoritmo, totalizando `3 modelos × 20 algoritmos = 60 suítes`.

## Corpus experimental

As implementações corretas estão em `src/functions/`, uma por arquivo. As implementações com o defeito original do QuixBugs estão em `src/functions-buggy/` e são utilizadas para avaliar a capacidade de detecção do defeito conhecido.

Os 20 programas selecionados são:

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

O mapeamento entre os arquivos Python oficiais e as traduções TypeScript está em `artifacts/corpus-manifest.csv`. A licença MIT do QuixBugs está preservada em `docs/QUIXBUGS-LICENSE.txt`.

## Requisitos e instalação

Para replicar o experimento, é necessário ter Node.js e npm instalados. As versões exatas das dependências JavaScript ficam registradas em `package-lock.json`.

Instale as dependências com:

```powershell
git clone https://github.com/anaclpsouza/LLMs-TestesUnitarios.git
cd LLMs-TestesUnitarios
npm install
```

Antes de executar as suítes geradas, valide as traduções do corpus:

```powershell
npm run validar-traducao
```

Esse comando executa os testes de referência sobre as 20 implementações corretas. As implementações defeituosas são utilizadas posteriormente pelo pipeline para medir a detecção do defeito conhecido.

### Particularidades das traduções

- `flatten` retorna um gerador; use `Array.from(flatten(valor))` para materializar o resultado;
- `next_permutation` retorna `undefined` quando não existe uma próxima permutação;
- `shortest_path_lengths` representa pares ordenados em um `Map<string, number>` e exporta `edgeKey(origem, destino)` para construir as chaves.

## Protocolo de geração das suítes

O prompt utilizado está em `artifacts/prompt/prompt.txt`. Para cada função:

1. substitua `NOME_DO_ALGORITMO` pelo nome do arquivo, sem a extensão `.ts`;
2. substitua o marcador de código pelo conteúdo integral de `src/functions/<algoritmo>.ts`;
3. utilize um contexto limpo e o mesmo prompt para todos os modelos;
4. não forneça implementações de outros algoritmos;
5. preserve a resposta bruta antes de extrair o arquivo TypeScript;
6. não corrija manualmente o código gerado;
7. registre os metadados disponíveis em `artifacts/generation-metadata.csv`.

Cada suíte deve ser salva como `<algoritmo>.test.ts` na pasta do respectivo modelo:

| Modelo do estudo | Pasta |
|---|---|
| GPT-4o | `src/gpt4o/` |
| Gemini 1.5 Pro | `src/gemini15/` |
| Claude 3.5 Sonnet | `src/claude35/` |

Exemplo de caminho:

```text
src/gpt4o/gcd.test.ts
```

A suíte deve importar diretamente a função-alvo:

```ts
import { gcd } from "../functions/gcd";
```

Para `shortest_path_lengths`, quando necessário:

```ts
import { edgeKey, shortest_path_lengths } from "../functions/shortest_path_lengths";
```

Uma resposta integral pode ser preservada em `artifacts/raw-responses/<modelo>/<algoritmo>.txt`. Não devem ser combinados snapshots diferentes sob o mesmo nome de modelo.

## Execução e replicabilidade

O experimento completo é executado com:

```powershell
npm run experimento
```

O pipeline realiza, nesta ordem:

1. medição da complexidade ciclomática das 20 funções;
2. verificação das 60 combinações de modelo e algoritmo;
3. execução de cada suíte contra a implementação correta;
4. coleta de cobertura exclusivamente sobre a função-alvo;
5. execução das suítes válidas contra a implementação defeituosa correspondente;
6. classificação dos resultados e da detecção do defeito conhecido;
7. consolidação dos dados em JSON e CSV;
8. cálculo das estatísticas descritivas;
9. geração das tabelas Markdown e LaTeX;
10. geração dos gráficos SVG.

Também é possível executar cada etapa separadamente:

| Comando | Finalidade |
|---|---|
| `npm run validar-traducao` | valida as traduções com os testes de referência |
| `npm run complexidade` | mede a complexidade ciclomática |
| `npm run testes` | executa e consolida as suítes geradas |
| `npm run estatisticas` | calcula as estatísticas descritivas |
| `npm run tabelas` | gera as tabelas Markdown e LaTeX |
| `npm run graficos` | gera os gráficos SVG |

Para uma execução diagnóstica restrita, informe os identificadores separados por vírgula:

```powershell
$env:EXPERIMENT_MODELS="gpt4o"
$env:EXPERIMENT_ALGORITHMS="gcd"
npm run testes
```

Os identificadores de modelo aceitos são `gpt4o`, `gemini15` e `claude35`.

### Classificação das execuções

O coletor utiliza os seguintes estados:

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

Cobertura indisponível é registrada como `null`. Uma cobertura observada de `0%` é mantida como valor válido e incluída nas estatísticas. Os diretórios temporários de cobertura são recriados para cada execução, impedindo o reaproveitamento de dados entre suítes.

## Estrutura do projeto

```text
.
├── artifacts/
│   ├── corpus-manifest.csv          # origem e correspondência das 20 funções
│   ├── generation-metadata.csv      # metadados das gerações das LLMs
│   ├── prompt/
│   │   └── prompt.txt               # prompt padronizado do experimento
├── docs/
│   ├── protocolo.md                 # protocolo, estados e tratamento dos dados
│   └── QUIXBUGS-LICENSE.txt         # licença do benchmark QuixBugs
├── scripts/
│   ├── coletarResultados.ts         # execução, cobertura e consolidação das suítes
│   ├── gerarEstatisticas.ts         # estatísticas descritivas
│   ├── gerarGraficos.ts             # gráficos SVG
│   ├── gerarTabelas.ts              # tabelas Markdown e LaTeX
│   ├── medirComplexidade.ts          # medição da complexidade ciclomática
│   └── pipeline.ts                  # orquestra todas as etapas experimentais
├── src/
│   ├── functions/                   # 20 traduções corretas, uma por módulo
│   │   └── <algoritmo>.ts
│   ├── functions-buggy/             # 20 traduções com o defeito do QuixBugs
│   │   └── <algoritmo>.ts
│   ├── reference/
│   │   └── quixbugs-reference.test.ts # validação independente das traduções
│   ├── gpt4o/                       # 20 suítes geradas pelo GPT-4o
│   │   ├── <algoritmo>.test.ts
│   │   └── README.md
│   ├── gemini15/                    # 20 suítes geradas pelo Gemini 1.5 Pro
│   │   ├── <algoritmo>.test.ts
│   │   └── README.md
│   ├── claude35/                    # 20 suítes geradas pelo Claude 3.5 Sonnet
│   │   ├── <algoritmo>.test.ts
│   │   └── README.md
│   ├── funcoes.ts                   # agregador das implementações corretas
│   └── funcoes.buggy.ts             # agregador das implementações defeituosas
├── resultados/
│   ├── complexidade/
│   │   ├── complexidade.csv
│   │   └── complexidade.json
│   ├── estatisticas/
│   │   └── estatisticas.json
│   ├── graficos/                    # cinco visualizações em SVG
│   │   ├── cobertura.svg
│   │   ├── deteccao-defeitos.svg
│   │   ├── heatmap.svg
│   │   ├── status-modelos.svg
│   │   └── taxa-sucesso.svg
│   ├── latex/                       # tabelas prontas para inclusão no relatório
│   │   ├── tabela-cobertura.tex
│   │   ├── tabela-resultados.tex
│   │   ├── tabela-resumo.tex
│   │   └── tabelas.tex
│   ├── resultados-compilados/
│   │   ├── resultados.csv
│   │   └── resultados.json
│   ├── runs/
│   │   └── <modelo>/<algoritmo>/
│   │       ├── correct/             # execução contra a função correta
│   │       │   ├── jest.json
│   │       │   ├── run.log
│   │       │   └── coverage/coverage-final.json
│   │       └── buggy/               # execução contra a função defeituosa
│   │           ├── jest.json
│   │           └── run.log
│   └── tabelas/
│       └── resumo-modelos.md
├── .gitignore                       # exclusões de dependências e temporários
├── jest.config.js                   # configuração-base do Jest
├── package.json                     # comandos e dependências do projeto
├── package-lock.json                # versões exatas das dependências
├── tsconfig.json                    # configuração do TypeScript
└── README.md                        # documentação principal
```

Os arquivos em `resultados/` constituem evidências experimentais e permanecem versionados, com exceção das coberturas temporárias ignoradas pelo Git. As definições completas das unidades experimentais, métricas, estados e regras de análise estão em `docs/protocolo.md`.
