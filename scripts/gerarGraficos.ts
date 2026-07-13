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
    statements: number | null;
    branches: number | null;
    functions: number | null;
    lines: number | null;
}

const inputFile = path.join("resultados", "resultados-compilados", "resultados.json");
const outputDir = path.join("resultados", "graficos");
const palette = ["#2563eb", "#d97706", "#7c3aed", "#0891b2"];
const statusColors: Record<string, string> = {
    OK: "#15803d", ASSERTION_FAILURE: "#dc2626", COMPILE_ERROR: "#ea580c", IMPORT_ERROR: "#be185d",
    RUNTIME_ERROR: "#7e22ce", NO_TESTS: "#64748b", TIMEOUT: "#ca8a04", INFRA_ERROR: "#78350f", AUSENTE: "#cbd5e1",
};

const xml = (value: string): string => value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const text = (x: number, y: number, value: string, extra = ""): string => `<text x="${x}" y="${y}" ${extra}>${xml(value)}</text>`;
const svg = (width: number, height: number, content: string): string => [
    `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img">`,
    "<style>text{font-family:Arial,sans-serif;fill:#172033} .title{font-size:22px;font-weight:700}.label{font-size:13px}.value{font-size:12px;font-weight:700}.grid{stroke:#d7dee8;stroke-width:1}</style>",
    `<rect width="100%" height="100%" fill="#ffffff"/>${content}</svg>`,
].join("\n");

function write(name: string, content: string): void {
    fs.writeFileSync(path.join(outputDir, name), content);
    console.log(`✔ ${path.join(outputDir, name)}`);
}

function mean(rows: Result[], field: "statements" | "branches" | "functions" | "lines"): number | null {
    const values = rows.map(row => row[field]).filter((value): value is number => typeof value === "number" && value >= 0);
    return values.length ? values.reduce((sum, value) => sum + value, 0) / values.length : null;
}

function barChart(title: string, models: string[], values: number[], labels: string[], max = 100): string {
    const width = 820; const height = 400; const left = 170; const top = 75; const plotWidth = 570; const barHeight = 52; const gap = 26;
    let content = text(32, 38, title, 'class="title"');
    for (let tick = 0; tick <= max; tick += max / 5) {
        const x = left + tick / max * plotWidth;
        content += `<line x1="${x}" y1="${top - 10}" x2="${x}" y2="${height - 48}" class="grid"/>`;
        content += text(x, height - 25, String(Math.round(tick)), 'class="label" text-anchor="middle"');
    }
    models.forEach((model, index) => {
        const y = top + index * (barHeight + gap);
        const barWidth = Math.max(0, Math.min(max, values[index])) / max * plotWidth;
        content += text(left - 12, y + 31, model, 'class="label" text-anchor="end"');
        content += `<rect x="${left}" y="${y}" width="${barWidth}" height="${barHeight}" rx="4" fill="${palette[index % palette.length]}"/>`;
        content += text(left + barWidth + 8, y + 31, labels[index], 'class="value"');
    });
    return svg(width, height, content);
}

function statusChart(rows: Result[], models: string[]): string {
    const statuses = [...new Set(rows.map(row => row.status))];
    const width = 900; const height = 470; const baseY = 365; const chartHeight = 260; const barWidth = 130; const gap = 110; const startX = 165;
    const max = Math.max(...models.map(model => rows.filter(row => row.model === model).length));
    let content = text(28, 38, "Distribuição dos status por modelo", 'class="title"');
    models.forEach((model, modelIndex) => {
        const x = startX + modelIndex * (barWidth + gap); let y = baseY;
        statuses.forEach(status => {
            const count = rows.filter(row => row.model === model && row.status === status).length;
            const h = max ? count / max * chartHeight : 0; y -= h;
            content += `<rect x="${x}" y="${y}" width="${barWidth}" height="${h}" fill="${statusColors[status] ?? "#334155"}"><title>${xml(`${model}: ${status} = ${count}`)}</title></rect>`;
            if (count > 0) content += text(x + barWidth / 2, y + h / 2 + 4, String(count), 'class="value" text-anchor="middle" fill="#fff"');
        });
        content += text(x + barWidth / 2, baseY + 25, model, 'class="label" text-anchor="middle"');
    });
    statuses.forEach((status, index) => {
        const x = 45 + (index % 4) * 210; const y = 415 + Math.floor(index / 4) * 24;
        content += `<rect x="${x}" y="${y - 12}" width="14" height="14" fill="${statusColors[status] ?? "#334155"}"/>`;
        content += text(x + 21, y, status, 'class="label"');
    });
    return svg(width, height, content);
}

function coverageChart(rows: Result[], models: string[]): string {
    const metrics: Array<["statements" | "branches" | "functions" | "lines", string]> = [["statements", "Statements"], ["branches", "Branches"], ["functions", "Functions"], ["lines", "Lines"]];
    const width = 960; const height = 510; const left = 165; const top = 80; const plotWidth = 690; const groupHeight = 82; const barHeight = 17;
    let content = text(28, 38, "Cobertura média das funções-alvo", 'class="title"');
    for (let tick = 0; tick <= 100; tick += 20) {
        const x = left + tick / 100 * plotWidth;
        content += `<line x1="${x}" y1="${top - 10}" x2="${x}" y2="${height - 70}" class="grid"/>`;
        content += text(x, height - 48, `${tick}%`, 'class="label" text-anchor="middle"');
    }
    models.forEach((model, modelIndex) => {
        content += text(left - 15, top + modelIndex * (groupHeight + 25) + 38, model, 'class="label" text-anchor="end"');
        metrics.forEach(([field, label], metricIndex) => {
            const value = mean(rows.filter(row => row.model === model), field);
            const y = top + modelIndex * (groupHeight + 25) + metricIndex * 20;
            const w = (value ?? 0) / 100 * plotWidth;
            content += `<rect x="${left}" y="${y}" width="${w}" height="${barHeight}" rx="2" fill="${palette[metricIndex]}"/>`;
            content += text(left + w + 6, y + 13, value === null ? "N/A" : value.toFixed(2), 'class="value"');
        });
    });
    metrics.forEach(([, label], index) => {
        const x = 190 + index * 165;
        content += `<rect x="${x}" y="${height - 25}" width="14" height="14" fill="${palette[index]}"/>${text(x + 20, height - 13, label, 'class="label"')}`;
    });
    return svg(width, height, content);
}

function heatmap(rows: Result[], models: string[]): string {
    const algorithms = [...new Set(rows.map(row => row.algorithm))].sort();
    const width = 880; const rowHeight = 25; const height = 120 + algorithms.length * rowHeight; const left = 260; const cellWidth = 180; const top = 80;
    let content = text(28, 36, "Status das suítes por algoritmo e modelo", 'class="title"');
    models.forEach((model, index) => content += text(left + index * cellWidth + cellWidth / 2, 66, model, 'class="label" text-anchor="middle"'));
    algorithms.forEach((algorithm, rowIndex) => {
        const y = top + rowIndex * rowHeight;
        content += text(left - 10, y + 17, algorithm, 'class="label" text-anchor="end"');
        models.forEach((model, modelIndex) => {
            const status = rows.find(row => row.algorithm === algorithm && row.model === model)?.status ?? "AUSENTE";
            content += `<rect x="${left + modelIndex * cellWidth}" y="${y}" width="${cellWidth - 3}" height="${rowHeight - 3}" rx="2" fill="${statusColors[status] ?? "#334155"}"><title>${xml(`${algorithm} — ${model}: ${status}`)}</title></rect>`;
            content += text(left + modelIndex * cellWidth + cellWidth / 2, y + 16, status, 'class="value" text-anchor="middle" style="fill:white;font-size:10px"');
        });
    });
    return svg(width, height, content);
}

function main(): void {
    if (!fs.existsSync(inputFile)) throw new Error(`Arquivo não encontrado: ${inputFile}`);
    const rows: Result[] = JSON.parse(fs.readFileSync(inputFile, "utf8"));
    if (rows.length === 0) throw new Error("Nenhum resultado disponível para gerar gráficos.");
    fs.rmSync(outputDir, { recursive: true, force: true });
    fs.mkdirSync(outputDir, { recursive: true });
    const models = [...new Set(rows.map(row => row.model))];

    const okCounts = models.map(model => rows.filter(row => row.model === model && row.status === "OK").length);
    const totals = models.map(model => rows.filter(row => row.model === model).length);
    const successRates = okCounts.map((ok, index) => totals[index] ? ok / totals[index] * 100 : 0);
    write("taxa-sucesso.svg", barChart("Taxa de suítes válidas por modelo", models, successRates, successRates.map((rate, i) => `${rate.toFixed(2)}% (${okCounts[i]}/${totals[i]})`)));

    const bugGroups = models.map(model => rows.filter(row => row.model === model && row.detectedKnownBug !== null));
    const detections = bugGroups.map(group => group.filter(row => row.detectedKnownBug === true).length);
    const detectionRates = detections.map((count, index) => bugGroups[index].length ? count / bugGroups[index].length * 100 : 0);
    write("deteccao-defeitos.svg", barChart("Detecção do defeito conhecido entre suítes válidas", models, detectionRates, detectionRates.map((rate, i) => `${rate.toFixed(2)}% (${detections[i]}/${bugGroups[i].length})`)));
    write("status-modelos.svg", statusChart(rows, models));
    write("cobertura.svg", coverageChart(rows, models));
    write("heatmap.svg", heatmap(rows, models));
}

main();
