# Protocolo experimental

## Unidade experimental

Uma unidade é a combinação `modelo × algoritmo`. Cada geração deve ocorrer em contexto limpo, com o mesmo prompt e sem correção manual. O delineamento possui 60 unidades planejadas.

## Rastreabilidade

| Objetivo | Pergunta | Métrica | Artefato |
|---|---|---|---|
| Executabilidade | A suíte executa sem correção? | status categórico e contagens Jest | `resultados.csv`, logs |
| Qualidade | A suíte cobre a função e detecta o defeito conhecido? | quatro coberturas e `DetectouBug` | coverage JSON, execução buggy |
| Complexidade | Os resultados variam com complexidade? | complexidade McCabe e grupo | `complexidade.csv` |
| Falhas | Que problemas ocorrem? | categoria de status e evidência | logs individuais |

## Geração

Os itens abaixo definem o procedimento recomendado para uma nova replicação. Na execução arquivada, foram preservados o prompt e os arquivos de teste extraídos, mas não as respostas brutas, datas, parâmetros de amostragem ou snapshots exatos dos modelos. O arquivo `artifacts/generation-metadata.csv` registra apenas o esquema esperado e não possui linhas de dados.

1. Registre fornecedor, nome/snapshot exato do modelo, data/hora, parâmetros e algoritmo.
2. Calcule e registre o SHA-256 de `artifacts/prompt/prompt.txt` depois de substituir o marcador pelo código da função.
3. Preserve a resposta bruta, mesmo se vazia ou inválida.
4. Extraia o código sem corrigi-lo e salve como `<algoritmo>.test.ts` na pasta do modelo.
5. Confirme que a suíte importa diretamente de `../functions/<algoritmo>`; o caminho legado `../funcoes` não deve ser usado.

## Execução e estados

A suíte é primeiro executada sobre a versão correta. Somente uma suíte com estado `OK` é executada sobre a versão defeituosa. O defeito é considerado detectado quando essa segunda execução resulta em falha de asserção, erro de execução causado pelo defeito ou timeout causado pelo defeito. Erros de compilação, importação e infraestrutura na segunda execução geram valor ausente, não detecção.

Cada execução recebe um diretório novo. O coletor remove o diretório antes de iniciar e só lê o `coverage-final.json` criado ali. Portanto, uma execução nunca herda cobertura anterior.

## Complexidade

`scripts/medirComplexidade.ts` usa a AST da versão instalada do compilador TypeScript. A regra é McCabe: 1 mais `if`, laços, `case`, `catch`, operador ternário e operadores lógicos de curto-circuito. Antes da nova análise, foram fixados limites relativos adequados às pequenas funções do corpus: baixa (1–2), média (3–4) e alta (≥5). Eles produzem grupos de 5, 7 e 8 programas, respectivamente. Ferramenta, versão e regra são gravadas em cada linha.

## Dados ausentes e estatística

Cobertura inexistente é `null`. Zero é um valor observado e não é filtrado. O resumo inclui `n`, média, mediana, desvio-padrão amostral, quartis, IQR, mínimo, máximo e intervalo de 95% aproximado. A análise deve considerar que existe somente uma observação por combinação de modelo e algoritmo.
