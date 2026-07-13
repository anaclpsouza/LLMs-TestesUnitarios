/// <reference types="node" />

import fs from "fs";

interface Result {
    model: string; algorithm: string; repetition: number; status: string;
    detectedKnownBug: boolean | null;
    statements: number | null; branches: number | null; functions: number | null; lines: number | null;
}

interface Summary {
    n: number; mean: number; median: number; standardDeviation: number;
    q1: number; q3: number; iqr: number; min: number; max: number;
    confidenceInterval95: [number, number];
}

const round = (value: number): number => Number(value.toFixed(2));

function quantile(sorted: number[], p: number): number {
    const index = (sorted.length - 1) * p;
    const lower = Math.floor(index); const upper = Math.ceil(index);
    return sorted[lower] + (sorted[upper] - sorted[lower]) * (index - lower);
}

function summarize(values: number[]): Summary | null {
    if (values.length === 0) return null;
    const sorted = [...values].sort((a, b) => a - b);
    const mean = values.reduce((sum, value) => sum + value, 0) / values.length;
    const variance = values.length > 1
        ? values.reduce((sum, value) => sum + (value - mean) ** 2, 0) / (values.length - 1)
        : 0;
    const sd = Math.sqrt(variance); const margin = 1.96 * sd / Math.sqrt(values.length);
    const q1 = quantile(sorted, 0.25); const q3 = quantile(sorted, 0.75);
    return {
        n: values.length, mean: round(mean), median: round(quantile(sorted, 0.5)),
        standardDeviation: round(sd), q1: round(q1), q3: round(q3), iqr: round(q3 - q1),
        min: round(sorted[0]), max: round(sorted[sorted.length - 1]),
        confidenceInterval95: [round(Math.max(0, mean - margin)), round(Math.min(100, mean + margin))],
    };
}

function coverageValues(rows: Result[], field: "statements" | "branches" | "functions" | "lines"): number[] {
    return rows.map(row => row[field]).filter((value): value is number => typeof value === "number" && !Number.isNaN(value) && value >= 0);
}

function main(): void {
    const rows: Result[] = JSON.parse(fs.readFileSync("resultados/resultados-compilados/resultados.json", "utf8"));
    const statusCategories = ["OK", "ASSERTION_FAILURE", "COMPILE_ERROR", "IMPORT_ERROR", "RUNTIME_ERROR", "NO_TESTS", "TIMEOUT", "INFRA_ERROR"];
    const groupSummary = (group: Result[]) => {
        const statuses = Object.fromEntries(statusCategories.map(status => [status, group.filter(row => row.status === status).length]));
        const validForBug = group.filter(row => row.detectedKnownBug !== null);
        const detected = validForBug.filter(row => row.detectedKnownBug === true).length;
        return {
            n: group.length,
            statuses,
            executableRate: group.length ? round(statuses.OK / group.length * 100) : null,
            knownBugDetection: { detected, n: validForBug.length, rate: validForBug.length ? round(detected / validForBug.length * 100) : null },
            coverage: {
                statements: summarize(coverageValues(group, "statements")),
                branches: summarize(coverageValues(group, "branches")),
                functions: summarize(coverageValues(group, "functions")),
                lines: summarize(coverageValues(group, "lines")),
            },
        };
    };
    const models = [...new Set(rows.map(row => row.model))];
    const algorithms = [...new Set(rows.map(row => row.algorithm))];
    const output = {
        generatedAt: new Date().toISOString(),
        definitions: {
            missingCoverage: "null; nunca convertido em zero",
            zeroCoverage: "incluído nas estatísticas",
            standardDeviation: "amostral (n-1)",
            confidenceInterval95: "aproximação normal da média; análise confirmatória deve usar o plano estatístico do protocolo",
        },
        global: groupSummary(rows),
        byModel: Object.fromEntries(models.map(model => [model, groupSummary(rows.filter(row => row.model === model))])),
        byAlgorithm: Object.fromEntries(algorithms.map(algorithm => [algorithm, groupSummary(rows.filter(row => row.algorithm === algorithm))])),
    };
    fs.mkdirSync("resultados/estatisticas", { recursive: true });
    fs.writeFileSync("resultados/estatisticas/estatisticas.json", JSON.stringify(output, null, 2));
    console.log("✔ resultados/estatisticas/estatisticas.json");
}

main();
