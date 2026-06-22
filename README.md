# Estudo Empírico: Avaliação de LLMs na Geração Automatizada de Testes Unitários

Este repositório contém o projeto prático e o estudo empírico desenvolvido para a disciplina de **Engenharia de Software III** do curso de Bacharelado em Sistemas de Informação no **Instituto Federal de Educação, Ciência e Tecnologia do Sudeste de Minas Gerais (IF Sudeste MG) – Campus Manhuaçu**.

## 🎯 Objetivo do Estudo
O objetivo deste trabalho é avaliar de forma quantitativa e qualitativa a capacidade de três Modelos de Linguagem de Grande Porte (LLMs) comerciais modernos na geração automatizada de suítes de testes unitários funcionais. A análise é centrada em três métricas principais:
1. **Compilabilidade (Functional Correctness):** Se o código de teste roda sem erros sintáticos de primeira.
2. **Cobertura de Código (Code Coverage):** Percentual de linhas e ramos (*branches*) cobertos pelo framework Jest.
3. **Análise de Casos de Borda (Edge Cases):** Capacidade de identificar entradas nulas, vazias, limites numéricos e exceções.
---

## 📊 Amostra e Metodologia
A base de dados do experimento é composta por **20 algoritmos clássicos**, traduzidos para **TypeScript**, extraídos diretamente do benchmark acadêmico oficial **QuixBugs**. 

Os algoritmos estão divididos em três grupos de acordo com sua **Complexidade Ciclomática**:
* **Baixa Complexidade:** `factorial`, `fibonacci`, `reverse_string`, `max_sublist_sum`, `flatten`, `is_palindrome`.
* **Média Complexidade:** `gcd`, `binary_search`, `bubblesort`, `find_in_sorted`, `shortest_path_lengths`, `pascal`, `next_permutation`.
* **Alta Complexidade:** `levenshtein`, `lis`, `quicksort`, `mergesort`, `knapsack`, `shortest_path_step`, `topological_sort`.

### 🤖 LLMs Avaliadas
Para diferenciar o estudo de literaturas passadas e trazer dados atualizados para o estado da prática, foram utilizadas as versões mais recentes das ferramentas de IA:
1. **OpenAI:** `GPT-4o`
2. **Anthropic:** `Claude 3.5 Sonnet`
3. **Google:** `Gemini 1.5 Pro`
---

## 📂 Estrutura de Pastas do Repositório


```
├── src/
│   ├── funcoes.ts               # Os 20 algoritmos traduzidos do QuixBugs
│   ├── gpt4o/                   # Suítes de testes geradas pelo GPT-4o
│   ├── claude35/                # Suítes de testes geradas pelo Claude 3.5 Sonnet
│   └── gemini15/                # Suítes de testes geradas pelo Gemini 1.5 Pro
├── jest.config.js               # Configuração do Jest e mapeamento de Coverage
├── package.json                 # Gerenciador de dependências e scripts do Node.js
├── tsconfig.json                # Configurações estritas do compilador TypeScript
└── README.md

```

---

## 🛠️ Como Executar e Testar (Ambiente Windows)

Certifique-se de ter o **Node.js LTS** instalado em sua máquina.

1. **Clone o repositório:**
```powershell
git clone https://github.com/anaclpsouza/LLMs-TestesUnitarios.git
cd PROJETO-FINAL-ESWIII
```

2. **Instale as dependências de desenvolvimento:**
```powershell
npm install
```

3. **Execute a suíte de testes automatizada e o relatório de cobertura:**
```powershell
npm test
```


Ao rodar este comando, o Jest executará todos os arquivos `.test.ts` das três IAs simultaneamente e exibirá uma tabela detalhada no terminal com o percentual exato de cobertura de linhas e ramos de cada uma, além de detalhar falhas sintáticas ou de asserção.

---

## 🔗 Referências e Links Originais

* **Repositório Base do Benchmark:** [QuixBugs GitHub Repository](https://github.com/jkoppel/QuixBugs)
* **Estudo de Referência:** Monografia *"Um estudo sobre a aplicação de LLMs no teste de software"* (UFERSA, 2025).

---

**Desenvolvido por:** Ana Clara Pereira de Souza

**Orientador / Professor:** Filipe Fernandes Phd

**Instituição:** IF Sudeste MG – Campus Manhuaçu
