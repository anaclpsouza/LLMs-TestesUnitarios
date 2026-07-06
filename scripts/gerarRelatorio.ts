/// <reference types="node" />

import fs from "fs";

// ─── Tipos ───────────────────────────────────────────────────────────────────

interface Resultado {
    modelo:     string;
    algoritmo:  string;
    status:     string;
    passed:     number | string;
    failed:     number | string;
    total:      number | string;
    statements: string;
    branches:   string;
    functions:  string;
    lines:      string;
    tempo:      string;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function emoji(status: string): string {
    if (status === "OK")      return "✅";
    if (status === "FAIL")    return "❌";
    if (status === "TIMEOUT") return "⏱️";
    return "❓";
}

function fmtPct(v: string | undefined): string {
    if (!v || v === "") return "—";
    const n = parseFloat(v);
    return isNaN(n) ? "—" : `${n.toFixed(2)}%`;
}

// ─── Main ─────────────────────────────────────────────────────────────────────

function main() {

    const dados: Resultado[] = JSON.parse(
        fs.readFileSync("resultados/resultados-compilados/resultados.json", "utf8")
    );

    let stats: any = {};
    try {
        stats = JSON.parse(fs.readFileSync("resultados/estatisticas/estatisticas.json", "utf8"));
    } catch { /* stats opcionais */ }

    const modelos    = [...new Set(dados.map(r => r.modelo))];
    const algoritmos = [...new Set(dados.map(r => r.algoritmo))];
    const dataAtual  = new Date().toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" });

    const md: string[] = [];

    // ─── Cabeçalho ────────────────────────────────────────────────────────────
    md.push(`# Relatório de Experimento — LLMs e Testes Unitários`);
    md.push(``);
    md.push(`> **Gerado automaticamente em:** ${dataAtual}  `);
    md.push(`> **Modelos testados:** ${modelos.join(", ")}  `);
    md.push(`> **Algoritmos:** ${algoritmos.length}  `);
    md.push(`> **Total de execuções:** ${dados.length}`);

    // ─── Resumo executivo ────────────────────────────────────────────────────
    md.push(`\n---\n\n## 1. Resumo Executivo`);
    md.push(``);
    md.push(`| Modelo | Algoritmos OK | Algoritmos FAIL | Taxa de Sucesso | Testes Passados | Testes Falhos |`);
    md.push(`|--------|:---:|:---:|:---:|:---:|:---:|`);
    for (const m of modelos) {
        const s = stats.porModelo?.[m];
        if (s) md.push(`| **${m}** | ${s.algoritmos.ok} | ${s.algoritmos.fail} | ${s.taxaSucesso}% | ${s.testes.passed} | ${s.testes.failed} |`);
    }

    // ─── Gráficos ────────────────────────────────────────────────────────────
    md.push(`\n---\n\n## 2. Gráficos`);

    md.push(`\n### 2.1 Heatmap — Status por Algoritmo × Modelo\n`);
    md.push(`![Heatmap de resultados](graficos/heatmap.svg)\n`);

    md.push(`\n### 2.2 Taxa de Sucesso por Modelo\n`);
    md.push(`![Taxa de sucesso](graficos/taxa-sucesso.svg)\n`);

    md.push(`\n### 2.3 Testes Passados × Falhos por Modelo\n`);
    md.push(`![Testes passados e falhos](graficos/testes.svg)\n`);

    md.push(`\n### 2.4 Cobertura Média por Modelo\n`);
    md.push(`![Cobertura de código](graficos/cobertura.svg)\n`);

    md.push(`\n### 2.5 Sucesso por Algoritmo\n`);
    md.push(`![Sucesso por algoritmo](graficos/algoritmos.svg)\n`);

    // ─── Resultados detalhados por modelo ────────────────────────────────────
    md.push(`\n---\n\n## 3. Resultados Detalhados por Modelo`);

    for (const m of modelos) {
        md.push(`\n### ${m}`);
        md.push(``);
        md.push(`| Algoritmo | Status | Total | Passou | Falhou | Stmt% | Branch% | Func% | Lines% | Tempo (s) |`);
        md.push(`|-----------|:------:|:-----:|:------:|:------:|:-----:|:-------:|:-----:|:------:|:---------:|`);

        for (const r of dados.filter(d => d.modelo === m)) {
            md.push(`| \`${r.algoritmo}\` | ${emoji(r.status)} ${r.status} | ${r.total} | ${r.passed} | ${r.failed} | ${fmtPct(r.statements)} | ${fmtPct(r.branches)} | ${fmtPct(r.functions)} | ${fmtPct(r.lines)} | ${r.tempo} |`);
        }
    }

    // ─── Análise por algoritmo ────────────────────────────────────────────────
    md.push(`\n---\n\n## 4. Análise por Algoritmo`);
    md.push(``);
    md.push(`| Algoritmo | ${modelos.join(" | ")} | Modelos OK |`);
    md.push(`|-----------|${"---|".repeat(modelos.length + 1)}`);

    for (const algo of algoritmos) {
        const s       = stats.porAlgoritmo?.[algo];
        const cells   = modelos.map(m => {
            const r = dados.find(d => d.algoritmo === algo && d.modelo === m);
            return r ? `${emoji(r.status)} ${r.status}` : "❓";
        });
        md.push(`| \`${algo}\` | ${cells.join(" | ")} | **${s?.ok ?? "?"}/${modelos.length}** |`);
    }

    // ─── Algoritmos extremos ─────────────────────────────────────────────────
    const allFail = algoritmos.filter(a =>
        modelos.every(m => {
            const r = dados.find(d => d.algoritmo === a && d.modelo === m);
            return r && r.status !== "OK";
        })
    );
    const allOk = algoritmos.filter(a =>
        modelos.every(m => {
            const r = dados.find(d => d.algoritmo === a && d.modelo === m);
            return r && r.status === "OK";
        })
    );

    if (allFail.length > 0 || allOk.length > 0) {
        md.push(`\n---\n\n## 5. Algoritmos Notáveis`);
        if (allOk.length > 0) {
            md.push(`\n### ✅ Passaram em todos os modelos`);
            md.push(allOk.map(a => `- \`${a}\``).join("\n"));
        }
        if (allFail.length > 0) {
            md.push(`\n### ❌ Falharam em todos os modelos`);
            md.push(allFail.map(a => `- \`${a}\``).join("\n"));
        }
    }

    // ─── Estatísticas descritivas ────────────────────────────────────────────
    md.push(`\n---\n\n## 6. Estatísticas Descritivas`);

    for (const m of modelos) {
        const s = stats.porModelo?.[m];
        if (!s) continue;

        md.push(`\n### ${m}\n`);
        md.push(`**Tempo de execução (s):** média ${s.tempo.media} | mediana ${s.tempo.mediana} | desvio-padrão ${s.tempo.desvio} | total ${s.tempo.total} | min ${s.tempo.min} | max ${s.tempo.max}\n`);
        md.push(`| Cobertura | Média | Mediana | Desvio-padrão | Min | Max |`);
        md.push(`|-----------|:-----:|:-------:|:-------------:|:---:|:---:|`);
        const cov: Record<string, any> = s.coverage;
        for (const [met, ns] of Object.entries(cov)) {
            md.push(`| ${met.charAt(0).toUpperCase() + met.slice(1)} | ${ns.media}% | ${ns.mediana}% | ${ns.desvio} | ${ns.min}% | ${ns.max}% |`);
        }
    }

    // ─── Rodapé ──────────────────────────────────────────────────────────────
    md.push(`\n---`);
    md.push(`\n*Relatório gerado automaticamente pelo pipeline de experimento.*`);
    md.push(`\n**Arquivos relacionados:**`);
    md.push(`- \`resultados-compilados/resultados.json\` — dados completos`);
    md.push(`- \`resultados-compilados/resultados.csv\` — planilha`);
    md.push(`- \`estatisticas/estatisticas.json\` — estatísticas descritivas`);
    md.push(`- \`latex/\` — tabelas para LaTeX`);
    md.push(`- \`graficos/\` — gráficos SVG`);
    md.push(`- \`json/\` — JSONs individuais do Jest (60 arquivos)`);
    md.push(`- \`coverage/\` — cobertura individual (60 arquivos)`);
    md.push(`- \`logs/\` — logs individuais de cada execução`);

    fs.writeFileSync("resultados/relatorio.md", md.join("\n"), "utf8");
    console.log("✔ resultados/relatorio.md");
}

main();
