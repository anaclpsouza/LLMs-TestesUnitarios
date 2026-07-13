/// <reference types="node" />

import { execFile } from "child_process";
import { promisify } from "util";
import fs from "fs";
import path from "path";

const execFileAsync = promisify(execFile);
const TIMEOUT_MS = Number(process.env.EXPERIMENT_TIMEOUT_MS ?? 30_000);
const ROOT = process.cwd();
const OUTPUT_ROOT = path.join(ROOT, "resultados", "runs");
const COMPILED_ROOT = path.join(ROOT, "resultados", "resultados-compilados");
const JEST_BIN = path.join(ROOT, "node_modules", "jest", "bin", "jest.js");

const ALL_MODELS = [
    { name: "GPT-4o", slug: "gpt4o", dir: "src/gpt4o" },
    { name: "Gemini 1.5 Pro", slug: "gemini15", dir: "src/gemini15" },
    { name: "Claude 3.5 Sonnet", slug: "claude35", dir: "src/claude35" },
];

const ALL_ALGORITHMS = [
    "bitcount", "bucketsort", "find_first_in_sorted", "find_in_sorted", "flatten",
    "gcd", "get_factors", "is_valid_parenthesization", "knapsack", "levenshtein",
    "lis", "max_sublist_sum", "mergesort", "next_palindrome", "next_permutation",
    "pascal", "possible_change", "powerset", "quicksort", "shortest_path_lengths",
];

const requestedModels = new Set((process.env.EXPERIMENT_MODELS ?? "").split(",").map(v => v.trim()).filter(Boolean));
const requestedAlgorithms = new Set((process.env.EXPERIMENT_ALGORITHMS ?? "").split(",").map(v => v.trim()).filter(Boolean));
const MODELS = ALL_MODELS.filter(model => requestedModels.size === 0 || requestedModels.has(model.slug));
const ALGORITHMS = ALL_ALGORITHMS.filter(algorithm => requestedAlgorithms.size === 0 || requestedAlgorithms.has(algorithm));

type Status = "OK" | "ASSERTION_FAILURE" | "COMPILE_ERROR" | "IMPORT_ERROR" |
    "RUNTIME_ERROR" | "NO_TESTS" | "TIMEOUT" | "INFRA_ERROR";

interface TestCounts { passed: number; failed: number; total: number }
interface Coverage { statements: number | null; branches: number | null; functions: number | null; lines: number | null }

function resetOutputs(): void {
    fs.rmSync(OUTPUT_ROOT, { recursive: true, force: true });
    fs.rmSync(COMPILED_ROOT, { recursive: true, force: true });
    fs.mkdirSync(OUTPUT_ROOT, { recursive: true });
    fs.mkdirSync(COMPILED_ROOT, { recursive: true });
}

function findTestFile(modelDir: string, algorithm: string): string | null {
    const dir = path.join(ROOT, modelDir);
    if (!fs.existsSync(dir)) return null;
    const file = `${algorithm}.test.ts`;
    return fs.existsSync(path.join(dir, file)) ? path.join(modelDir, file) : null;
}

function parseCounts(jsonFile: string): TestCounts {
    if (!fs.existsSync(jsonFile)) return { passed: 0, failed: 0, total: 0 };
    try {
        const data = JSON.parse(fs.readFileSync(jsonFile, "utf8"));
        return { passed: data.numPassedTests ?? 0, failed: data.numFailedTests ?? 0, total: data.numTotalTests ?? 0 };
    } catch { return { passed: 0, failed: 0, total: 0 }; }
}

function percent(covered: number, total: number): number | null {
    return total === 0 ? null : Number(((covered / total) * 100).toFixed(2));
}

function parseCoverage(file: string): Coverage {
    if (!fs.existsSync(file)) return { statements: null, branches: null, functions: null, lines: null };
    const raw = JSON.parse(fs.readFileSync(file, "utf8"));
    let st = 0, sc = 0, bt = 0, bc = 0, ft = 0, fc = 0;
    const lineHits = new Map<number, number>();
    for (const data of Object.values(raw) as any[]) {
        for (const [id, count] of Object.entries(data.s ?? {}) as Array<[string, number]>) {
            st += 1; if (count > 0) sc += 1;
            const line = data.statementMap[id].start.line;
            lineHits.set(line, Math.max(lineHits.get(line) ?? 0, count));
        }
        for (const counts of Object.values(data.b ?? {}) as number[][]) for (const count of counts) { bt += 1; if (count > 0) bc += 1; }
        for (const count of Object.values(data.f ?? {}) as number[]) { ft += 1; if (count > 0) fc += 1; }
    }
    return {
        statements: percent(sc, st), branches: percent(bc, bt), functions: percent(fc, ft),
        lines: percent([...lineHits.values()].filter(v => v > 0).length, lineHits.size),
    };
}

function classify(text: string, counts: TestCounts, timedOut: boolean): Status {
    if (timedOut) return "TIMEOUT";
    if (/Cannot find module|Could not locate module|ModuleNotFoundError/i.test(text)) return "IMPORT_ERROR";
    if (/TS\d{4}:|SyntaxError|TypeScript.*error/i.test(text)) return "COMPILE_ERROR";
    if (/No tests found|Your test suite must contain at least one test/i.test(text) || counts.total === 0) return "NO_TESTS";
    if (counts.failed > 0) {
        if (/expect\(|Expected:|Received:|AssertionError|to(Equal|Be|Throw|Contain|Match)/i.test(text)) return "ASSERTION_FAILURE";
        return "RUNTIME_ERROR";
    }
    return counts.total > 0 ? "OK" : "INFRA_ERROR";
}

async function runJest(testFile: string, algorithm: string, runDir: string, variant: "correct" | "buggy", coverage: boolean) {
    fs.rmSync(runDir, { recursive: true, force: true });
    fs.mkdirSync(runDir, { recursive: true });
    const jsonFile = path.join(runDir, "jest.json");
    const coverageDir = path.join(runDir, "coverage");
    const env = {
        ...process.env,
        QUIXBUGS_ALGORITHM: algorithm,
        QUIXBUGS_VARIANT: variant,
        QUIXBUGS_COVERAGE: coverage ? "1" : "0",
        QUIXBUGS_COVERAGE_DIR: coverageDir,
    };
    let text = ""; let timedOut = false;
    try {
        const result = await execFileAsync(process.execPath, [JEST_BIN, testFile, "--runInBand", "--json", "--outputFile", jsonFile], {
            cwd: ROOT, env, timeout: TIMEOUT_MS, maxBuffer: 20 * 1024 * 1024,
        });
        text = `${result.stdout}\n${result.stderr}`;
    } catch (error: any) {
        text = `${error.stdout ?? ""}\n${error.stderr ?? ""}\n${error.message ?? ""}`;
        timedOut = error.killed === true || error.signal === "SIGTERM" || /timed out/i.test(error.message ?? "");
    }
    fs.writeFileSync(path.join(runDir, "run.log"), text, "utf8");
    const counts = parseCounts(jsonFile);
    return {
        status: classify(text, counts, timedOut), ...counts,
        coverage: coverage ? parseCoverage(path.join(coverageDir, "coverage-final.json")) : undefined,
    };
}

function csvCell(value: unknown): string {
    if (value === null || value === undefined) return "";
    const text = String(value);
    return /[",\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
}

async function main(): Promise<void> {
    resetOutputs();
    const results: any[] = [];
    for (const model of MODELS) for (const algorithm of ALGORITHMS) {
        const testFile = findTestFile(model.dir, algorithm);
        if (testFile === null) {
            results.push({ model: model.name, modelSlug: model.slug, algorithm, testFile: null, status: "NO_TESTS", bugStatus: null, detectedKnownBug: null, passed: 0, failed: 0, total: 0, statements: null, branches: null, functions: null, lines: null });
            continue;
        }
        const base = path.join(OUTPUT_ROOT, model.slug, algorithm);
        const correct = await runJest(testFile, algorithm, path.join(base, "correct"), "correct", true);
        let buggy: Awaited<ReturnType<typeof runJest>> | null = null;
        if (correct.status === "OK") buggy = await runJest(testFile, algorithm, path.join(base, "buggy"), "buggy", false);
        results.push({
            model: model.name, modelSlug: model.slug, algorithm,
            testFile: testFile.replace(/\\/g, "/"), status: correct.status,
            bugStatus: buggy?.status ?? null,
            detectedKnownBug: buggy
                ? (["ASSERTION_FAILURE", "RUNTIME_ERROR", "TIMEOUT"] as Status[]).includes(buggy.status)
                    ? true
                    : buggy.status === "OK" ? false : null
                : null,
            passed: correct.passed, failed: correct.failed, total: correct.total,
            statements: correct.coverage?.statements ?? null, branches: correct.coverage?.branches ?? null,
            functions: correct.coverage?.functions ?? null, lines: correct.coverage?.lines ?? null,
        });
        process.stdout.write(`\r${model.slug} ${algorithm}: ${correct.status}             `);
    }
    process.stdout.write("\n");
    fs.writeFileSync(path.join(COMPILED_ROOT, "resultados.json"), JSON.stringify(results, null, 2));
    const headers = ["Modelo", "ModeloSlug", "Algoritmo", "Arquivo", "Status", "StatusBug", "DetectouBug", "Total", "Passou", "Falhou", "Statements", "Branches", "Functions", "Lines"];
    const rows = results.map(r => [r.model, r.modelSlug, r.algorithm, r.testFile, r.status, r.bugStatus, r.detectedKnownBug, r.total, r.passed, r.failed, r.statements, r.branches, r.functions, r.lines].map(csvCell).join(","));
    fs.writeFileSync(path.join(COMPILED_ROOT, "resultados.csv"), [headers.join(","), ...rows].join("\n"));
    console.log(`Resultados gravados: ${results.length} execuções planejadas/encontradas.`);
}

main().catch(error => { console.error(error); process.exitCode = 1; });
