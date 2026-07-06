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

interface NumStats {
    media:   number;
    mediana: number;
    desvio:  number;
    min:     number;
    max:     number;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function numStats(vals: number[]): NumStats {
    if (vals.length === 0) return { media: 0, mediana: 0, desvio: 0, min: 0, max: 0 };

    const sorted = [...vals].sort((a, b) => a - b);
    const n      = vals.length;
    const media  = vals.reduce((a, b) => a + b, 0) / n;
    const mediana = n % 2 === 0
        ? (sorted[n / 2 - 1] + sorted[n / 2]) / 2
        : sorted[Math.floor(n / 2)];
    const desvio = Math.sqrt(vals.reduce((acc, v) => acc + (v - media) ** 2, 0) / n);

    return {
        media:   +media.toFixed(2),
        mediana: +mediana.toFixed(2),
        desvio:  +desvio.toFixed(2),
        min:     +sorted[0].toFixed(2),
        max:     +sorted[n - 1].toFixed(2)
    };
}

function pctVals(grupo: Resultado[], field: keyof Resultado): number[] {
    return grupo.map(r => parseFloat(r[field] as string)).filter(v => !isNaN(v) && v > 0);
}

// ─── Main ─────────────────────────────────────────────────────────────────────

function main() {

    fs.mkdirSync("resultados/estatisticas", { recursive: true });

    const dados: Resultado[] = JSON.parse(
        fs.readFileSync("resultados/resultados-compilados/resultados.json", "utf8")
    );

    const modelos    = [...new Set(dados.map(r => r.modelo))];
    const algoritmos = [...new Set(dados.map(r => r.algoritmo))];

    // ── Por modelo ────────────────────────────────────────────────────────────
    const porModelo: Record<string, any> = {};

    for (const modelo of modelos) {
        const g = dados.filter(r => r.modelo === modelo);

        const ok      = g.filter(r => r.status === "OK").length;
        const fail    = g.filter(r => r.status === "FAIL").length;
        const timeout = g.filter(r => r.status === "TIMEOUT").length;

        const passed = g.reduce((acc, r) => acc + (Number(r.passed) || 0), 0);
        const failed = g.reduce((acc, r) => acc + (Number(r.failed) || 0), 0);
        const total  = passed + failed;

        const tempoVals = g.map(r => parseFloat(r.tempo)).filter(v => !isNaN(v));

        porModelo[modelo] = {
            algoritmos:  { ok, fail, timeout, total: g.length },
            taxaSucesso: +(ok / g.length * 100).toFixed(1),
            testes: {
                passed,
                failed,
                total,
                taxaPassagem: total > 0 ? +(passed / total * 100).toFixed(1) : 0
            },
            coverage: {
                statements: numStats(pctVals(g, "statements")),
                branches:   numStats(pctVals(g, "branches")),
                functions:  numStats(pctVals(g, "functions")),
                lines:      numStats(pctVals(g, "lines"))
            },
            tempo: {
                ...numStats(tempoVals),
                total: +tempoVals.reduce((a, b) => a + b, 0).toFixed(2)
            }
        };
    }

    // ── Por algoritmo ─────────────────────────────────────────────────────────
    const porAlgoritmo: Record<string, any> = {};

    for (const algoritmo of algoritmos) {
        const g  = dados.filter(r => r.algoritmo === algoritmo);
        const ok = g.filter(r => r.status === "OK").length;

        porAlgoritmo[algoritmo] = {
            ok,
            fail:        g.filter(r => r.status === "FAIL").length,
            timeout:     g.filter(r => r.status === "TIMEOUT").length,
            taxaSucesso: +(ok / g.length * 100).toFixed(1),
            porModelo:   Object.fromEntries(g.map(r => [r.modelo, r.status]))
        };
    }

    // ── Global ────────────────────────────────────────────────────────────────
    const globalOk      = dados.filter(r => r.status === "OK").length;
    const globalFail    = dados.filter(r => r.status === "FAIL").length;
    const globalTimeout = dados.filter(r => r.status === "TIMEOUT").length;
    const globalPassed  = dados.reduce((acc, r) => acc + (Number(r.passed) || 0), 0);
    const globalFailed  = dados.reduce((acc, r) => acc + (Number(r.failed) || 0), 0);

    const stats = {
        geradoEm: new Date().toISOString(),
        global: {
            totalExecucoes: dados.length,
            ok:             globalOk,
            fail:           globalFail,
            timeout:        globalTimeout,
            taxaSucesso:    +(globalOk / dados.length * 100).toFixed(1),
            totalTestes:    globalPassed + globalFailed,
            totalPassados:  globalPassed,
            totalFalhos:    globalFailed
        },
        porModelo,
        porAlgoritmo
    };

    fs.writeFileSync(
        "resultados/estatisticas/estatisticas.json",
        JSON.stringify(stats, null, 2),
        "utf8"
    );

    // ── Markdown ──────────────────────────────────────────────────────────────
    const md: string[] = [];

    md.push(`# Estatísticas Descritivas`);
    md.push(`\n> Gerado em: ${new Date().toLocaleString("pt-BR")}`);

    md.push(`\n## Resumo Global\n`);
    md.push(`| Métrica | Valor |`);
    md.push(`|---|---|`);
    md.push(`| Total de execuções | ${dados.length} |`);
    md.push(`| Algoritmos OK | ${globalOk} (${stats.global.taxaSucesso}%) |`);
    md.push(`| Algoritmos FAIL | ${globalFail} |`);
    md.push(`| Algoritmos TIMEOUT | ${globalTimeout} |`);
    md.push(`| Total de testes executados | ${globalPassed + globalFailed} |`);
    md.push(`| Testes passados | ${globalPassed} |`);
    md.push(`| Testes falhos | ${globalFailed} |`);

    md.push(`\n## Por Modelo\n`);
    md.push(`| Modelo | OK | FAIL | Taxa Sucesso | Testes Passou | Testes Falhou | Stmt% médio | Branch% médio |`);
    md.push(`|---|:---:|:---:|:---:|:---:|:---:|:---:|:---:|`);
    for (const [modelo, s] of Object.entries(porModelo)) {
        md.push(`| **${modelo}** | ${s.algoritmos.ok} | ${s.algoritmos.fail} | ${s.taxaSucesso}% | ${s.testes.passed} | ${s.testes.failed} | ${s.coverage.statements.media}% | ${s.coverage.branches.media}% |`);
    }

    md.push(`\n## Por Algoritmo\n`);
    md.push(`| Algoritmo | OK | FAIL | Taxa Sucesso | ${modelos.join(" | ")} |`);
    md.push(`|---|:---:|:---:|:---:|${"---|".repeat(modelos.length)}`);
    for (const [algo, s] of Object.entries(porAlgoritmo)) {
        const statuses = modelos.map(m => s.porModelo[m] || "---");
        md.push(`| \`${algo}\` | ${s.ok} | ${s.fail} | ${s.taxaSucesso}% | ${statuses.join(" | ")} |`);
    }

    md.push(`\n## Estatísticas de Cobertura por Modelo`);
    for (const [modelo, s] of Object.entries(porModelo)) {
        md.push(`\n### ${modelo}\n`);
        md.push(`**Tempo (s):** média ${s.tempo.media} | mediana ${s.tempo.mediana} | desvio ${s.tempo.desvio} | total ${s.tempo.total} | min ${s.tempo.min} | max ${s.tempo.max}\n`);
        md.push(`| Métrica | Média | Mediana | Desvio | Min | Max |`);
        md.push(`|---|:---:|:---:|:---:|:---:|:---:|`);
        const cov = s.coverage as Record<string, NumStats>;
        for (const [m, ns] of Object.entries(cov)) {
            md.push(`| ${m.charAt(0).toUpperCase() + m.slice(1)} | ${ns.media}% | ${ns.mediana}% | ${ns.desvio} | ${ns.min}% | ${ns.max}% |`);
        }
    }

    fs.writeFileSync("resultados/estatisticas/estatisticas.md", md.join("\n"), "utf8");

    console.log("✔ resultados/estatisticas/estatisticas.json");
    console.log("✔ resultados/estatisticas/estatisticas.md");
}

main();
