# Estudo Empírico: Avaliação de LLMs na Geração Automatizada de Testes Unitários

Este repositório contém o projeto prático e o estudo empírico desenvolvido para a disciplina de **Engenharia de Software III** do curso de Bacharelado em Sistemas de Informação no **Instituto Federal de Educação, Ciência e Tecnologia do Sudeste de Minas Gerais (IF Sudeste MG) – Campus Manhuaçu**.

---

## 🎯 Objetivo do Estudo

Avaliar de forma quantitativa a capacidade de três LLMs comerciais na geração automatizada de suítes de testes unitários, medindo:

1. **Compilabilidade:** Se o código gerado executa sem erros sintáticos.
2. **Corretude:** Testes passados × falhos por algoritmo.
3. **Cobertura de Código:** Percentual de statements, branches, functions e lines cobertos pelo Jest.

---

## 📊 Amostra e Metodologia

**20 algoritmos clássicos** em TypeScript, extraídos do benchmark **QuixBugs**, agrupados por complexidade ciclomática:

| Complexidade | Algoritmos |
|---|---|
| **Baixa** | `factorial`, `fibonacci`, `reverse_string`, `max_sublist_sum`, `flatten`, `is_palindrome` |
| **Média** | `gcd`, `binary_search`, `bubblesort`, `find_in_sorted`, `shortest_path_lengths`, `pascal`, `next_permutation` |
| **Alta** | `levenshtein`, `lis`, `quicksort`, `mergesort`, `knapsack`, `shortest_path_step`, `topological_sort` |

### 🤖 LLMs Avaliadas

| Provedor | Modelo |
|---|---|
| OpenAI | `GPT-4o` |
| Anthropic | `Claude 3.5 Sonnet` |
| Google | `Gemini 1.5 Pro` |

### 💬 Prompt Base Utilizado

Para garantir justiça na comparação, o mesmo prompt exato foi fornecido em contextos limpos (zero-shot) para todos os modelos:

> Atue como um Engenheiro de Software especialista em testes de software e controle de qualidade. Sua tarefa é escrever a suíte de testes unitários completa para a função em TypeScript fornecida ao final.
> 
> Restrições obrigatórias:
> 1. Utilize o framework Jest e garanta compatibilidade estrita com TypeScript (@jest/globals);
> 2. Utilize importação nomeada da função testada;
> 3. Não utilize mocks, stubs ou spies;
> 4. Busque máxima cobertura de linhas e ramos;
> 5. Inclua testes para casos de borda pertinentes ao algoritmo;
> 6. Retorne exclusivamente o código TypeScript da suíte de testes.

*Após o prompt, era fornecido apenas o código-fonte da função correspondente.*

---

## 📂 Estrutura do Repositório

```
├── src/
│   ├── funcoes.ts                     # Os 20 algoritmos do QuixBugs em TypeScript
│   ├── gpt4o/                         # Testes gerados pelo GPT-4o
│   ├── claude35/                      # Testes gerados pelo Claude 3.5 Sonnet
│   └── gemini15/                      # Testes gerados pelo Gemini 1.5 Pro
│
├── scripts/
│   ├── pipeline.ts                    # Orquestrador principal (chamado por npm run experimento)
│   ├── coletarResultados.ts           # Executa os 60 testes e coleta dados
│   ├── gerarEstatisticas.ts           # Calcula estatísticas descritivas
│   ├── gerarTabelaLatex.ts            # Gera tabelas LaTeX
│   ├── gerarGraficos.ts               # Gera gráficos SVG
│   └── gerarRelatorio.ts              # Gera relatório em Markdown
│
├── resultados/
│   ├── json/                          # JSONs do Jest — um por execução (60 arquivos)
│   ├── coverage/                      # coverage-final.json individual (60 arquivos)
│   ├── logs/                          # Logs stdout+stderr de cada execução (60 arquivos)
│   ├── resultados-compilados/
│   │   ├── resultados.json            # Todos os resultados consolidados
│   │   └── resultados.csv             # Planilha completa
│   ├── estatisticas/
│   │   ├── estatisticas.json          # Estatísticas descritivas (média, mediana, desvio, min, max)
│   │   └── estatisticas.md            # Idem, em Markdown
│   ├── latex/
│   │   ├── tabelas.tex                # Documento LaTeX standalone completo
│   │   ├── tabela-resumo.tex          # Fragmento: resumo por modelo
│   │   ├── tabela-testes.tex          # Fragmento: resultados dos testes
│   │   └── tabela-cobertura.tex       # Fragmento: métricas de cobertura
│   ├── graficos/
│   │   ├── heatmap.svg                # Algoritmo × Modelo (OK / FAIL / TIMEOUT)
│   │   ├── taxa-sucesso.svg           # Taxa de sucesso por modelo
│   │   ├── testes.svg                 # Testes passados × falhos por modelo
│   │   ├── cobertura.svg              # Cobertura média por modelo
│   │   └── algoritmos.svg             # Sucesso por algoritmo
│   └── relatorio.md                   # Relatório completo em Markdown
│
├── jest.config.js
├── package.json
├── tsconfig.json
└── README.md
```

---

## 🛠️ Como Executar

### Pré-requisitos

- **Node.js LTS** instalado

### 1. Clone e instale

```powershell
git clone https://github.com/anaclpsouza/LLMs-TestesUnitarios.git
cd LLMs-TestesUnitarios
npm install
```

### 2. Execute o pipeline completo

```powershell
npm run experimento
```

Este único comando executa **automaticamente** as 5 etapas em sequência:

| Etapa | Ação |
|---|---|
| 1/5 | Executa os 60 testes (20 algoritmos × 3 modelos) com timeout automático |
| 2/5 | Calcula estatísticas descritivas por modelo e por algoritmo |
| 3/5 | Gera tabelas LaTeX prontas para monografia |
| 4/5 | Gera 5 gráficos SVG dos resultados |
| 5/5 | Gera relatório completo em Markdown |

Ao final, todos os artefatos estarão disponíveis na pasta `resultados/`.

### Scripts individuais

```powershell
npm run testes        # Só executa os testes e coleta dados
npm run estatisticas  # Só recalcula as estatísticas
npm run latex         # Só regera as tabelas LaTeX
npm run graficos      # Só regera os gráficos SVG
npm run relatorio     # Só regera o relatório Markdown
```

---

## 📋 Saídas Geradas

### `resultados/resultados-compilados/resultados.json`

Objeto JSON com todos os 60 resultados, incluindo status, testes passados/falhos e métricas de cobertura.

### `resultados/estatisticas/estatisticas.json`

Estatísticas descritivas completas por modelo (média, mediana, desvio-padrão, mínimo e máximo de cobertura e tempo de execução) e por algoritmo (taxa de sucesso entre modelos).

### `resultados/latex/`

Tabelas prontas para inclusão em monografia via `\input{resultados/latex/tabela-resumo.tex}`. Requer os pacotes LaTeX: `booktabs`, `longtable`, `xcolor`, `geometry`.

### `resultados/graficos/`

Cinco gráficos SVG gerados sem dependências externas, incluindo um heatmap colorido (verde = OK, vermelho = FAIL, laranja = TIMEOUT) para visualização rápida dos resultados.

### `resultados/relatorio.md`

Relatório autocontido com resumo executivo, tabelas detalhadas por modelo, análise por algoritmo e estatísticas descritivas — com os gráficos SVG embutidos.

---

## 🔗 Referências

- **Benchmark:** [QuixBugs GitHub Repository](https://github.com/jkoppel/QuixBugs)
- **Estudo de Referência:** *"Um estudo sobre a aplicação de LLMs no teste de software"* (UFERSA, 2025)

---

**Desenvolvido por:** Ana Clara Pereira de Souza

**Professor:** Filipe Fernandes PhD

**Instituição:** IF Sudeste MG – Campus Manhuaçu
