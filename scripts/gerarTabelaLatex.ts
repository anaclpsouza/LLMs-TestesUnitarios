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

/** Escapa caracteres especiais do LaTeX */
function esc(s: string | number): string {
    return String(s)
        .replace(/\\/g, "\\textbackslash{}")
        .replace(/&/g,  "\\&")
        .replace(/%/g,  "\\%")
        .replace(/\$/g, "\\$")
        .replace(/#/g,  "\\#")
        .replace(/_/g,  "\\_")
        .replace(/\{/g, "\\{")
        .replace(/\}/g, "\\}")
        .replace(/~/g,  "\\textasciitilde{}")
        .replace(/\^/g, "\\textasciicircum{}");
}

/** Formata nome do algoritmo: "reverse_string" → "reverse\_string" */
const fmtAlg  = (a: string) => esc(a);

/** Formata nome do modelo */
const fmtMod  = (m: string) => esc(m);

/** Formata status com cor */
function fmtStatus(status: string): string {
    if (status === "OK")      return "\\textcolor{green!60!black}{OK}";
    if (status === "FAIL")    return "\\textcolor{red}{FAIL}";
    if (status === "TIMEOUT") return "\\textcolor{orange}{TIMEOUT}";
    return esc(status);
}

/** Formata percentual de cobertura com cor (vermelho < 50, amarelo < 80, verde >= 80) */
function fmtPct(val: string): string {
    if (val === "" || val === undefined) return "---";
    const n = parseFloat(val);
    if (isNaN(n)) return esc(val);
    if (n >= 80) return `\\textcolor{green!60!black}{${n.toFixed(2)}\\%}`;
    if (n >= 50) return `\\textcolor{orange}{${n.toFixed(2)}\\%}`;
    return `\\textcolor{red}{${n.toFixed(2)}\\%}`;
}

// ─── Cabeçalho padrão de documento LaTeX standalone ──────────────────────────

function docHeader(): string {
    return `\\documentclass{article}
\\usepackage[utf8]{inputenc}
\\usepackage[T1]{fontenc}
\\usepackage{booktabs}
\\usepackage{longtable}
\\usepackage{xcolor}
\\usepackage{geometry}
\\geometry{a4paper, landscape, margin=1.5cm}

\\begin{document}

`;
}

function docFooter(): string {
    return `
\\end{document}
`;
}

// ─── Tabela 1: Resultados dos Testes ─────────────────────────────────────────

function gerarTabelaTestes(dados: Resultado[]): string {
    const linhas: string[] = [];

    linhas.push(`% ============================================================`);
    linhas.push(`% Tabela 1 — Resultados dos Testes por Modelo e Algoritmo`);
    linhas.push(`% ============================================================`);
    linhas.push(`\\begin{longtable}{l l c c c c r}`);
    linhas.push(`  \\caption{Resultados dos testes unitários por modelo e algoritmo} \\\\`);
    linhas.push(`  \\toprule`);
    linhas.push(`  \\textbf{Modelo} & \\textbf{Algoritmo} & \\textbf{Status} & \\textbf{Total} & \\textbf{Passou} & \\textbf{Falhou} & \\textbf{Tempo (s)} \\\\`);
    linhas.push(`  \\midrule`);
    linhas.push(`  \\endfirsthead`);
    linhas.push(``);
    linhas.push(`  \\multicolumn{7}{c}{\\tablename\\ \\thetable{} -- continuação} \\\\`);
    linhas.push(`  \\toprule`);
    linhas.push(`  \\textbf{Modelo} & \\textbf{Algoritmo} & \\textbf{Status} & \\textbf{Total} & \\textbf{Passou} & \\textbf{Falhou} & \\textbf{Tempo (s)} \\\\`);
    linhas.push(`  \\midrule`);
    linhas.push(`  \\endhead`);
    linhas.push(``);
    linhas.push(`  \\midrule`);
    linhas.push(`  \\multicolumn{7}{r}{\\small continua na próxima página} \\\\`);
    linhas.push(`  \\endfoot`);
    linhas.push(``);
    linhas.push(`  \\bottomrule`);
    linhas.push(`  \\endlastfoot`);
    linhas.push(``);

    let ultimoModelo = "";

    for (const r of dados) {
        // Linha separadora entre modelos
        if (ultimoModelo !== "" && r.modelo !== ultimoModelo) {
            linhas.push(`  \\midrule`);
        }
        ultimoModelo = r.modelo;

        const cols = [
            fmtMod(r.modelo),
            fmtAlg(r.algoritmo),
            fmtStatus(r.status),
            esc(r.total),
            esc(r.passed),
            esc(r.failed),
            esc(r.tempo)
        ];

        linhas.push(`  ${cols.join(" & ")} \\\\`);
    }

    linhas.push(`\\end{longtable}`);

    return linhas.join("\n");
}

// ─── Tabela 2: Cobertura ─────────────────────────────────────────────────────

function gerarTabelaCobertura(dados: Resultado[]): string {
    const linhas: string[] = [];

    linhas.push(`% ============================================================`);
    linhas.push(`% Tabela 2 — Métricas de Cobertura por Modelo e Algoritmo`);
    linhas.push(`% ============================================================`);
    linhas.push(`\\begin{longtable}{l l c c c c}`);
    linhas.push(`  \\caption{Métricas de cobertura de código por modelo e algoritmo} \\\\`);
    linhas.push(`  \\toprule`);
    linhas.push(`  \\textbf{Modelo} & \\textbf{Algoritmo} & \\textbf{Statements} & \\textbf{Branches} & \\textbf{Functions} & \\textbf{Lines} \\\\`);
    linhas.push(`  \\midrule`);
    linhas.push(`  \\endfirsthead`);
    linhas.push(``);
    linhas.push(`  \\multicolumn{6}{c}{\\tablename\\ \\thetable{} -- continuação} \\\\`);
    linhas.push(`  \\toprule`);
    linhas.push(`  \\textbf{Modelo} & \\textbf{Algoritmo} & \\textbf{Statements} & \\textbf{Branches} & \\textbf{Functions} & \\textbf{Lines} \\\\`);
    linhas.push(`  \\midrule`);
    linhas.push(`  \\endhead`);
    linhas.push(``);
    linhas.push(`  \\midrule`);
    linhas.push(`  \\multicolumn{6}{r}{\\small continua na próxima página} \\\\`);
    linhas.push(`  \\endfoot`);
    linhas.push(``);
    linhas.push(`  \\bottomrule`);
    linhas.push(`  \\endlastfoot`);
    linhas.push(``);

    let ultimoModelo = "";

    for (const r of dados) {
        if (ultimoModelo !== "" && r.modelo !== ultimoModelo) {
            linhas.push(`  \\midrule`);
        }
        ultimoModelo = r.modelo;

        const cols = [
            fmtMod(r.modelo),
            fmtAlg(r.algoritmo),
            fmtPct(r.statements),
            fmtPct(r.branches),
            fmtPct(r.functions),
            fmtPct(r.lines)
        ];

        linhas.push(`  ${cols.join(" & ")} \\\\`);
    }

    linhas.push(`\\end{longtable}`);

    return linhas.join("\n");
}

// ─── Tabela 3: Resumo por Modelo ─────────────────────────────────────────────

function gerarTabelaResumo(dados: Resultado[]): string {
    const modelos = [...new Set(dados.map(r => r.modelo))];

    const linhas: string[] = [];
    linhas.push(`% ============================================================`);
    linhas.push(`% Tabela 3 — Resumo Agregado por Modelo`);
    linhas.push(`% ============================================================`);
    linhas.push(`\\begin{table}[h]`);
    linhas.push(`  \\centering`);
    linhas.push(`  \\caption{Resumo agregado por modelo}`);
    linhas.push(`  \\begin{tabular}{l c c c c c c c}`);
    linhas.push(`    \\toprule`);
    linhas.push(`    \\textbf{Modelo} & \\textbf{Testes OK} & \\textbf{Testes FAIL} & \\textbf{Total Passou} & \\textbf{Total Falhou} & \\textbf{Stmt\\%} & \\textbf{Branch\\%} & \\textbf{Func\\%} \\\\`);
    linhas.push(`    \\midrule`);

    for (const modelo of modelos) {
        const grupo = dados.filter(r => r.modelo === modelo);

        const okCount   = grupo.filter(r => r.status === "OK").length;
        const failCount = grupo.filter(r => r.status === "FAIL" || r.status === "TIMEOUT").length;

        const totalPassed = grupo.reduce((acc, r) => acc + (Number(r.passed) || 0), 0);
        const totalFailed = grupo.reduce((acc, r) => acc + (Number(r.failed) || 0), 0);

        const avgPct = (field: keyof Resultado) => {
            const vals = grupo
                .map(r => parseFloat(r[field] as string))
                .filter(v => !isNaN(v));
            if (vals.length === 0) return "---";
            return (vals.reduce((a, b) => a + b, 0) / vals.length).toFixed(2) + "\\%";
        };

        const cols = [
            fmtMod(modelo),
            String(okCount),
            String(failCount),
            String(totalPassed),
            String(totalFailed),
            avgPct("statements"),
            avgPct("branches"),
            avgPct("functions")
        ];

        linhas.push(`    ${cols.join(" & ")} \\\\`);
    }

    linhas.push(`    \\bottomrule`);
    linhas.push(`  \\end{tabular}`);
    linhas.push(`\\end{table}`);

    return linhas.join("\n");
}

// ─── Main ─────────────────────────────────────────────────────────────────────

function main() {

    fs.mkdirSync("resultados/latex", { recursive: true });

    const dados: Resultado[] = JSON.parse(fs.readFileSync("resultados/resultados-compilados/resultados.json", "utf8"));

    // Gera arquivo com documento standalone completo
    const conteudo = [
        docHeader(),
        gerarTabelaResumo(dados),
        "\n\\bigskip\n",
        gerarTabelaTestes(dados),
        "\n\\newpage\n",
        gerarTabelaCobertura(dados),
        docFooter()
    ].join("\n");

    fs.writeFileSync("resultados/latex/tabelas.tex", conteudo, "utf8");
    console.log("✔ resultados/latex/tabelas.tex");

    // Gera também fragmentos separados (sem \documentclass) para inclusão em monografia
    const fragTestes    = gerarTabelaTestes(dados);
    const fragCobertura = gerarTabelaCobertura(dados);
    const fragResumo    = gerarTabelaResumo(dados);

    fs.writeFileSync("resultados/latex/tabela-testes.tex",    fragTestes,    "utf8");
    fs.writeFileSync("resultados/latex/tabela-cobertura.tex", fragCobertura, "utf8");
    fs.writeFileSync("resultados/latex/tabela-resumo.tex",    fragResumo,    "utf8");

    console.log("✔ resultados/latex/tabela-testes.tex");
    console.log("✔ resultados/latex/tabela-cobertura.tex");
    console.log("✔ resultados/latex/tabela-resumo.tex");
}

main();
