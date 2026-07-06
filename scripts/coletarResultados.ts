/// <reference types="node" />

import { exec } from "child_process";
import { promisify } from "util";
import fs from "fs";
import path from "path";

const execAsync = promisify(exec);

const TIMEOUT = 30000;

// Garante que os diretórios de saída existam
fs.mkdirSync("resultados/json",                  { recursive: true });
fs.mkdirSync("resultados/coverage",              { recursive: true });
fs.mkdirSync("resultados/logs",                  { recursive: true });
fs.mkdirSync("resultados/resultados-compilados", { recursive: true });

const modelos = [
    {
        nome: "GPT-4o",
        pasta: "src/gpt4o"
    },
    {
        nome: "Gemini",
        pasta: "src/gemini15"
    },
    {
        nome: "Claude",
        pasta: "src/claude35"
    }
];

const algoritmos = [
"factorial",
"fibonacci",
"reverse_string",
"max_sublist_sum",
"flatten",
"is_palindrome",
"gcd",
"binary_search",
"bubblesort",
"find_in_sorted",
"shortest_path_lengths",
"pascal",
"next_permutation",
"levenshtein",
"lis",
"quicksort",
"mergesort",
"knapsack",
"shortest_path_step",
"topological_sort"
];

const resultados: any[] = [];

/** Lê passed/failed/total direto do JSON gerado pelo Jest (--json) */
function parseTestsFromJson(jsonPath: string): { passed: number; failed: number; total: number } {

    try {

        const raw = JSON.parse(fs.readFileSync(jsonPath, "utf8"));

        const passed = raw.numPassedTests  ?? 0;
        const failed = raw.numFailedTests  ?? 0;

        return { passed, failed, total: passed + failed };

    } catch {

        return { passed: 0, failed: 0, total: 0 };

    }
}

/** Lê as métricas de cobertura do coverage-final.json gerado pelo Jest */
function parseCoverageFromFile(coveragePath: string) {

    try {

        const raw = JSON.parse(fs.readFileSync(coveragePath, "utf8"));

        // coverage-final.json: { "<file>": { s, b, f, fnMap, ... } }
        // Calculamos a média ponderada dos contadores para cada métrica
        let stmtTotal = 0, stmtCovered = 0;
        let branchTotal = 0, branchCovered = 0;
        let fnTotal = 0, fnCovered = 0;
        let lineTotal = 0, lineCovered = 0;

        for (const fileData of Object.values(raw) as any[]) {

            const s  = Object.values(fileData.s  ?? {}) as number[];
            const b  = (Object.values(fileData.b  ?? {}) as number[][]).flat();
            const f  = Object.values(fileData.f  ?? {}) as number[];
            const lm = fileData.statementMap ?? {};

            stmtTotal    += s.length;    stmtCovered    += s.filter(v => v > 0).length;
            branchTotal  += b.length;    branchCovered  += b.filter(v => v > 0).length;
            fnTotal      += f.length;    fnCovered      += f.filter(v => v > 0).length;

            // linhas únicas cobertas
            const allLines = new Set(Object.values(lm).flatMap((loc: any) =>
                Array.from({ length: loc.end.line - loc.start.line + 1 },
                    (_, i) => loc.start.line + i)
            ));
            lineTotal   += allLines.size;
            lineCovered += [...allLines].filter(ln => {
                // uma linha é coberta se algum statement nela foi executado
                return Object.entries(fileData.s ?? {}).some(([id, cnt]) => {
                    const loc = lm[id];
                    return loc && ln >= loc.start.line && ln <= loc.end.line && (cnt as number) > 0;
                });
            }).length;
        }

        const pct = (covered: number, total: number) =>
            total === 0 ? "" : ((covered / total) * 100).toFixed(2);

        return {
            statements: pct(stmtCovered,   stmtTotal),
            branches:   pct(branchCovered, branchTotal),
            functions:  pct(fnCovered,     fnTotal),
            lines:      pct(lineCovered,   lineTotal)
        };

    } catch {

        return { statements: "", branches: "", functions: "", lines: "" };

    }
}

function parseTime(text: string) {

    const m = text.match(/Time:\s*([\d.]+)/);

    return m ? m[1] : "";
}

async function executar() {

    for (const modelo of modelos) {

        console.log(modelo.nome);

        // Slug do modelo para nomes de arquivo (ex: "GPT-4o" -> "gpt")
        const modeloSlug = modelo.nome.toLowerCase().replace(/[^a-z0-9]/g, "").replace("4o", "") || modelo.nome.toLowerCase();

        for (const algoritmo of algoritmos) {

            console.log("  ", algoritmo);

            const teste      = `${modelo.pasta}/${algoritmo}.test.ts`;
            const jsonOut    = `resultados/json/${modeloSlug}-${algoritmo}.json`;
            const coverageSrc = `coverage/coverage-final.json`;
            const coverageDst = `resultados/coverage/${modeloSlug}-${algoritmo}.json`;

            const cmd = [
                `npx jest "${teste}"`,
                `--coverage`,
                `--json`,
                `--outputFile "${jsonOut}"`
            ].join(" ");

            try {

                const { stdout, stderr } = await execAsync(cmd, {
                    timeout: TIMEOUT,
                    maxBuffer: 1024 * 1024 * 20
                });

                const texto = stdout + stderr;

                // Salva log individual
                fs.writeFileSync(`resultados/logs/${modeloSlug}-${algoritmo}.log`, texto, "utf8");

                const tests = parseTestsFromJson(jsonOut);

                // Copia coverage-final.json para resultados/coverage/
                if (fs.existsSync(coverageSrc)) {
                    fs.copyFileSync(coverageSrc, coverageDst);
                }

                const cov = parseCoverageFromFile(coverageDst);

                resultados.push({
                    modelo:    modelo.nome,
                    algoritmo,
                    status:    "OK",
                    ...tests,
                    ...cov,
                    tempo:     parseTime(texto)
                });

            } catch (err: any) {

                if (err.killed || err.signal === "SIGTERM") {

                    fs.writeFileSync(`resultados/logs/${modeloSlug}-${algoritmo}.log`, `TIMEOUT após ${TIMEOUT / 1000}s\n`, "utf8");

                    resultados.push({
                        modelo:     modelo.nome,
                        algoritmo,
                        status:     "TIMEOUT",
                        passed:     "",
                        failed:     "",
                        total:      "",
                        statements: "",
                        branches:   "",
                        functions:  "",
                        lines:      "",
                        tempo:      `>${TIMEOUT / 1000}s`
                    });

                } else {

                    const texto = (err.stdout || "") + (err.stderr || "");

                    // Salva log individual mesmo em caso de falha
                    fs.writeFileSync(`resultados/logs/${modeloSlug}-${algoritmo}.log`, texto, "utf8");

                    // Mesmo em caso de falha, tenta ler o JSON e o coverage
                    const tests = parseTestsFromJson(jsonOut);

                    if (fs.existsSync(coverageSrc)) {
                        fs.copyFileSync(coverageSrc, coverageDst);
                    }

                    const cov = parseCoverageFromFile(coverageDst);

                    resultados.push({
                        modelo:    modelo.nome,
                        algoritmo,
                        status:    "FAIL",
                        ...tests,
                        ...cov,
                        tempo:     parseTime(texto)
                    });

                }

            }

        }

    }

    fs.writeFileSync(
        "resultados/resultados-compilados/resultados.json",
        JSON.stringify(resultados, null, 4)
    );

    const csv = [
        "Modelo,Algoritmo,Status,Total,Passou,Falhou,Statements,Branches,Functions,Lines,Tempo"
    ];

    for (const r of resultados) {
        csv.push([
            r.modelo, r.algoritmo, r.status, r.total,
            r.passed, r.failed, r.statements, r.branches,
            r.functions, r.lines, r.tempo
        ].join(","));
    }

    fs.writeFileSync(
        "resultados/resultados-compilados/resultados.csv",
        csv.join("\n")
    );

    console.log("Testes concluídos.");
    console.log(`  resultados/resultados-compilados/resultados.json (${resultados.length} entradas)`);
    console.log(`  resultados/resultados-compilados/resultados.csv`);
    console.log(`  resultados/json/           (${resultados.length} JSONs do Jest)`);
    console.log(`  resultados/coverage/        (${resultados.length} arquivos de coverage)`);
    console.log(`  resultados/logs/            (${resultados.length} logs individuais)`);

}

executar();