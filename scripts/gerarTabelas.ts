/// <reference types="node" />

import fs from "fs";
import path from "path";

interface Result {
    model: string;
    algorithm: string;
    status: string;
    detectedKnownBug: boolean | null;
    passed: number;
    failed: number;
    total: number;
    statements: number | null;
    branches: number | null;
    functions: number | null;
    lines: number | null;
}

const inputFile = path.join("resultados", "resultados-compilados", "resultados.json");
const markdownDir = path.join("resultados", "tabelas");
const latexDir = path.join("resultados", "latex");

const latexEscape = (value: string): string => value
    .replace(/\\/g, "\\textbackslash{}")
    .replace(/([&_#$%{}])/g, "\\$1")
    .replace(/~/g, "\\textasciitilde{}")
    .replace(/\^/g, "\\textasciicircum{}");

const percent = (value: number | null): string => value === null ? "--" : `${value.toFixed(2)}%`;
const numeric = (value: number | null): string => value === null ? "--" : value.toFixed(2);
const bugLabel = (value: boolean | null): string => value === null ? "N/A" : value ? "Sim" : "Não";
const markdownCell = (value: string): string => value.replace(/\|/g, "\\|");

function mean(rows: Result[], field: "statements" | "branches" | "functions" | "lines"): number | null {
    const values = rows.map(row => row[field]).filter((value): value is number => typeof value === "number" && value >= 0);
    return values.length === 0 ? null : values.reduce((sum, value) => sum + value, 0) / values.length;
}

function modelSummary(rows: Result[], model: string): string[] {
    const group = rows.filter(row => row.model === model);
    const ok = group.filter(row => row.status === "OK").length;
    const validBug = group.filter(row => row.detectedKnownBug !== null);
    const detected = validBug.filter(row => row.detectedKnownBug === true).length;
    return [
        model,
        String(group.length),
        String(ok),
        String(group.length - ok),
        percent(group.length ? ok / group.length * 100 : null),
        `${detected}/${validBug.length}`,
        percent(validBug.length ? detected / validBug.length * 100 : null),
    ];
}

function latexTable(columns: string, header: string[], body: string[][], caption: string, label: string): string {
    const rows = body.map(row => `${row.map(latexEscape).join(" & ")} \\\\`).join("\n");
    return [
        "\\begin{table}[htbp]",
        "\\centering",
        `\\caption{${latexEscape(caption)}}`,
        `\\label{${label}}`,
        `\\begin{tabular}{${columns}}`,
        "\\toprule",
        `${header.map(latexEscape).join(" & ")} \\\\`,
        "\\midrule",
        rows,
        "\\bottomrule",
        "\\end{tabular}",
        "\\end{table}",
        "",
    ].join("\n");
}

function main(): void {
    if (!fs.existsSync(inputFile)) throw new Error(`Arquivo não encontrado: ${inputFile}`);
    const rows: Result[] = JSON.parse(fs.readFileSync(inputFile, "utf8"));
    if (rows.length === 0) throw new Error("Nenhum resultado disponível para gerar tabelas.");

    fs.rmSync(markdownDir, { recursive: true, force: true });
    fs.rmSync(latexDir, { recursive: true, force: true });
    fs.mkdirSync(markdownDir, { recursive: true });
    fs.mkdirSync(latexDir, { recursive: true });

    const models = [...new Set(rows.map(row => row.model))];
    const algorithms = [...new Set(rows.map(row => row.algorithm))].sort();
    const summaryHeader = ["Modelo", "Suítes", "OK", "Falhas", "Executáveis", "Defeitos detectados", "Taxa de detecção"];
    const summary = models.map(model => modelSummary(rows, model));

    const markdown = [
        "# Tabelas do experimento",
        "",
        "Geradas automaticamente a partir de `resultados/resultados-compilados/resultados.json`.",
        "",
        `| ${summaryHeader.join(" | ")} |`,
        `| ${summaryHeader.map(() => "---").join(" | ")} |`,
        ...summary.map(row => `| ${row.map(markdownCell).join(" | ")} |`),
        "",
        "## Status por algoritmo",
        "",
        `| Algoritmo | ${models.join(" | ")} |`,
        `| --- | ${models.map(() => "---").join(" | ")} |`,
        ...algorithms.map(algorithm => {
            const cells = models.map(model => rows.find(row => row.algorithm === algorithm && row.model === model)?.status ?? "AUSENTE");
            return `| ${algorithm} | ${cells.join(" | ")} |`;
        }),
        "",
    ].join("\n");
    fs.writeFileSync(path.join(markdownDir, "resumo-modelos.md"), markdown);

    const summaryTex = latexTable("lrrrrrr", summaryHeader, summary, "Resumo dos resultados por modelo", "tab:resumo-modelos");
    fs.writeFileSync(path.join(latexDir, "tabela-resumo.tex"), summaryTex);

    const detailHeader = ["Modelo", "Algoritmo", "Status", "Passou", "Falhou", "Total", "Detectou defeito"];
    const detailRows = rows.map(row => [row.model, row.algorithm, row.status, String(row.passed), String(row.failed), String(row.total), bugLabel(row.detectedKnownBug)]);
    const detailTex = [
        "\\begin{longtable}{lllrrrr}",
        "\\caption{Resultados detalhados das suítes geradas}\\label{tab:resultados-detalhados}\\\\",
        "\\toprule",
        `${detailHeader.map(latexEscape).join(" & ")} \\\\`,
        "\\midrule",
        "\\endfirsthead",
        "\\toprule",
        `${detailHeader.map(latexEscape).join(" & ")} \\\\`,
        "\\midrule",
        "\\endhead",
        ...detailRows.map(row => `${row.map(latexEscape).join(" & ")} \\\\`),
        "\\bottomrule",
        "\\end{longtable}",
        "",
    ].join("\n");
    fs.writeFileSync(path.join(latexDir, "tabela-resultados.tex"), detailTex);

    const coverageHeader = ["Modelo", "Statements", "Branches", "Functions", "Lines"];
    const coverageRows = models.map(model => {
        const group = rows.filter(row => row.model === model);
        return [model, numeric(mean(group, "statements")), numeric(mean(group, "branches")), numeric(mean(group, "functions")), numeric(mean(group, "lines"))];
    });
    const coverageTex = latexTable("lrrrr", coverageHeader, coverageRows, "Cobertura média das funções-alvo por modelo (em porcentagem)", "tab:cobertura-modelos");
    fs.writeFileSync(path.join(latexDir, "tabela-cobertura.tex"), coverageTex);

    const standalone = [
        "\\documentclass{article}",
        "\\usepackage[utf8]{inputenc}",
        "\\usepackage[T1]{fontenc}",
        "\\usepackage{booktabs}",
        "\\usepackage{longtable}",
        "\\usepackage[margin=1.5cm]{geometry}",
        "\\begin{document}",
        "\\input{tabela-resumo.tex}",
        "\\input{tabela-cobertura.tex}",
        "\\input{tabela-resultados.tex}",
        "\\end{document}",
        "",
    ].join("\n");
    fs.writeFileSync(path.join(latexDir, "tabelas.tex"), standalone);

    console.log(`✔ ${path.join(markdownDir, "resumo-modelos.md")}`);
    console.log(`✔ ${latexDir} (4 arquivos)`);
}

main();
