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

// ─── Paleta ───────────────────────────────────────────────────────────────────

const C = {
    ok:       "#22c55e",
    fail:     "#ef4444",
    timeout:  "#f97316",
    bg:       "#0f172a",
    bgCard:   "#1e293b",
    bgLight:  "#334155",
    text:     "#f1f5f9",
    muted:    "#94a3b8",
    grid:     "#475569",
    gpt:      "#60a5fa",
    gemini:   "#c084fc",
    claude:   "#fbbf24",
    stmt:     "#818cf8",
    branch:   "#f472b6",
    func:     "#34d399",
    line:     "#fb923c"
};

const MODEL_COLOR: Record<string, string> = {
    "GPT-4o": C.gpt,
    "Gemini": C.gemini,
    "Claude": C.claude
};

function statusColor(s: string): string {
    if (s === "OK")      return C.ok;
    if (s === "FAIL")    return C.fail;
    if (s === "TIMEOUT") return C.timeout;
    return C.bgLight;
}

// ─── Heatmap: Algoritmo × Modelo ─────────────────────────────────────────────

function heatmapSvg(dados: Resultado[]): string {
    const algoritmos = [...new Set(dados.map(r => r.algoritmo))];
    const modelos    = [...new Set(dados.map(r => r.modelo))];

    const cellW = 140, cellH = 32;
    const mL = 210, mT = 90, mR = 20, mB = 50;
    const W  = mL + modelos.length * cellW + mR;
    const H  = mT + algoritmos.length * cellH + mB;

    const s: string[] = [];
    s.push(`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">`);
    s.push(`<rect width="${W}" height="${H}" fill="${C.bg}"/>`);
    s.push(`<text x="${W/2}" y="34" text-anchor="middle" font-size="17" font-weight="bold" fill="${C.text}" font-family="sans-serif">Resultados por Algoritmo × Modelo</text>`);

    // Column headers
    modelos.forEach((m, ci) => {
        const x = mL + ci * cellW + cellW / 2;
        const cor = MODEL_COLOR[m] || C.text;
        s.push(`<text x="${x}" y="${mT - 20}" text-anchor="middle" font-size="14" font-weight="bold" fill="${cor}" font-family="sans-serif">${m}</text>`);
        s.push(`<line x1="${mL + ci * cellW}" y1="${mT}" x2="${mL + ci * cellW}" y2="${mT + algoritmos.length * cellH}" stroke="${C.grid}" stroke-width="1" opacity="0.4"/>`);
    });
    s.push(`<line x1="${mL + modelos.length * cellW}" y1="${mT}" x2="${mL + modelos.length * cellW}" y2="${mT + algoritmos.length * cellH}" stroke="${C.grid}" stroke-width="1" opacity="0.4"/>`);

    // Rows
    algoritmos.forEach((algo, ri) => {
        const y   = mT + ri * cellH;
        const bg  = ri % 2 === 0 ? "#ffffff08" : "#00000000";
        s.push(`<rect x="${mL}" y="${y}" width="${modelos.length * cellW}" height="${cellH}" fill="${bg}"/>`);
        s.push(`<text x="${mL - 10}" y="${y + cellH / 2 + 5}" text-anchor="end" font-size="11" fill="${C.muted}" font-family="monospace,sans-serif">${algo}</text>`);

        modelos.forEach((m, ci) => {
            const r   = dados.find(d => d.algoritmo === algo && d.modelo === m);
            const st  = r?.status || "---";
            const cor = statusColor(st);
            const cx  = mL + ci * cellW;
            s.push(`<rect x="${cx + 5}" y="${y + 4}" width="${cellW - 10}" height="${cellH - 8}" rx="5" fill="${cor}" opacity="0.85"/>`);
            s.push(`<text x="${cx + cellW/2}" y="${y + cellH/2 + 4}" text-anchor="middle" font-size="10" font-weight="bold" fill="white" font-family="sans-serif">${st}</text>`);
        });

        s.push(`<line x1="${mL}" y1="${y + cellH}" x2="${mL + modelos.length * cellW}" y2="${y + cellH}" stroke="${C.grid}" stroke-width="1" opacity="0.15"/>`);
    });

    // Legend
    const ly = H - mB + 18;
    [{ l: "OK", c: C.ok }, { l: "FAIL", c: C.fail }, { l: "TIMEOUT", c: C.timeout }].forEach((item, i) => {
        const lx = mL + i * 110;
        s.push(`<rect x="${lx}" y="${ly - 10}" width="18" height="13" rx="3" fill="${item.c}"/>`);
        s.push(`<text x="${lx + 24}" y="${ly}" font-size="12" fill="${C.muted}" font-family="sans-serif">${item.l}</text>`);
    });

    s.push(`</svg>`);
    return s.join("\n");
}

// ─── Taxa de Sucesso por Modelo (horizontal bars) ─────────────────────────────

function taxaSucessoSvg(dados: Resultado[]): string {
    const modelos = [...new Set(dados.map(r => r.modelo))];
    const W = 660, barH = 56, mL = 120, mT = 78, mR = 60;
    const bW = W - mL - mR;
    const H  = mT + modelos.length * (barH + 24) + 50;

    const s: string[] = [];
    s.push(`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">`);
    s.push(`<rect width="${W}" height="${H}" fill="${C.bg}"/>`);
    s.push(`<text x="${W/2}" y="32" text-anchor="middle" font-size="17" font-weight="bold" fill="${C.text}" font-family="sans-serif">Taxa de Sucesso por Modelo</text>`);
    s.push(`<text x="${W/2}" y="54" text-anchor="middle" font-size="12" fill="${C.muted}" font-family="sans-serif">% de algoritmos com status OK</text>`);

    // Grid lines
    [0, 25, 50, 75, 100].forEach(pct => {
        const x = mL + (pct / 100) * bW;
        s.push(`<line x1="${x}" y1="${mT - 8}" x2="${x}" y2="${H - 30}" stroke="${C.grid}" stroke-width="1" opacity="0.35" stroke-dasharray="5,5"/>`);
        s.push(`<text x="${x}" y="${mT - 12}" text-anchor="middle" font-size="10" fill="${C.muted}" font-family="sans-serif">${pct}%</text>`);
    });

    modelos.forEach((m, i) => {
        const g    = dados.filter(r => r.modelo === m);
        const ok   = g.filter(r => r.status === "OK").length;
        const taxa = ok / g.length;
        const y    = mT + i * (barH + 24);
        const cor  = MODEL_COLOR[m] || C.text;
        const fW   = Math.max(taxa * bW, 3);

        s.push(`<text x="${mL - 10}" y="${y + barH / 2 + 5}" text-anchor="end" font-size="14" font-weight="bold" fill="${cor}" font-family="sans-serif">${m}</text>`);
        s.push(`<rect x="${mL}" y="${y}" width="${bW}" height="${barH}" rx="8" fill="${C.bgLight}" opacity="0.45"/>`);
        s.push(`<rect x="${mL}" y="${y}" width="${fW}" height="${barH}" rx="8" fill="${cor}" opacity="0.9"/>`);

        const lx = taxa > 0.18 ? mL + fW - 10 : mL + fW + 10;
        const anc = taxa > 0.18 ? "end" : "start";
        s.push(`<text x="${lx}" y="${y + barH / 2 + 5}" text-anchor="${anc}" font-size="15" font-weight="bold" fill="white" font-family="sans-serif">${(taxa * 100).toFixed(0)}%  (${ok}/${g.length})</text>`);
    });

    s.push(`</svg>`);
    return s.join("\n");
}

// ─── Testes Passados/Falhos por Modelo (stacked vertical bars) ───────────────

function testesSvg(dados: Resultado[]): string {
    const modelos = [...new Set(dados.map(r => r.modelo))];
    const barW = 110, gap = 50;
    const mL = 70, mT = 70, mB = 80;
    const aH = 300;
    const W  = mL + modelos.length * (barW + gap) + 40;
    const H  = mT + aH + mB;

    const maxTotal = Math.max(...modelos.map(m => {
        const g = dados.filter(r => r.modelo === m);
        return g.reduce((a, r) => a + (Number(r.passed) || 0) + (Number(r.failed) || 0), 0);
    }));

    const s: string[] = [];
    s.push(`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">`);
    s.push(`<rect width="${W}" height="${H}" fill="${C.bg}"/>`);
    s.push(`<text x="${W/2}" y="30" text-anchor="middle" font-size="17" font-weight="bold" fill="${C.text}" font-family="sans-serif">Testes por Modelo</text>`);
    s.push(`<text x="${W/2}" y="52" text-anchor="middle" font-size="12" fill="${C.muted}" font-family="sans-serif">passados (cor do modelo) vs. falhos (vermelho)</text>`);

    // Y-axis grid
    for (let i = 0; i <= 5; i++) {
        const val = Math.round(maxTotal / 5 * i);
        const y   = mT + aH - (val / maxTotal) * aH;
        s.push(`<line x1="${mL}" y1="${y}" x2="${W - 20}" y2="${y}" stroke="${C.grid}" stroke-width="1" opacity="0.3" stroke-dasharray="4,4"/>`);
        s.push(`<text x="${mL - 6}" y="${y + 4}" text-anchor="end" font-size="10" fill="${C.muted}" font-family="sans-serif">${val}</text>`);
    }

    modelos.forEach((m, i) => {
        const g      = dados.filter(r => r.modelo === m);
        const passed = g.reduce((a, r) => a + (Number(r.passed) || 0), 0);
        const failed = g.reduce((a, r) => a + (Number(r.failed) || 0), 0);
        const x      = mL + 20 + i * (barW + gap);
        const cor    = MODEL_COLOR[m] || C.text;

        const pH = (passed / maxTotal) * aH;
        const fH = (failed  / maxTotal) * aH;

        // Failed bar (top)
        if (fH > 0) {
            const fy = mT + aH - pH - fH;
            s.push(`<rect x="${x}" y="${fy}" width="${barW}" height="${fH}" fill="${C.fail}" opacity="0.9"/>`);
            if (fH > 18) s.push(`<text x="${x + barW/2}" y="${fy + fH/2 + 4}" text-anchor="middle" font-size="12" fill="white" font-family="sans-serif">${failed}</text>`);
        }
        // Passed bar (bottom)
        if (pH > 0) {
            const py = mT + aH - pH;
            s.push(`<rect x="${x}" y="${py}" width="${barW}" height="${pH}" fill="${cor}" opacity="0.9"/>`);
            if (pH > 18) s.push(`<text x="${x + barW/2}" y="${py + pH/2 + 4}" text-anchor="middle" font-size="12" fill="white" font-family="sans-serif">${passed}</text>`);
        }

        s.push(`<text x="${x + barW/2}" y="${mT + aH + 22}" text-anchor="middle" font-size="13" font-weight="bold" fill="${cor}" font-family="sans-serif">${m}</text>`);
        s.push(`<text x="${x + barW/2}" y="${mT + aH + 40}" text-anchor="middle" font-size="11" fill="${C.muted}" font-family="sans-serif">${passed + failed} total</text>`);
    });

    s.push(`</svg>`);
    return s.join("\n");
}

// ─── Cobertura Média por Modelo (grouped horizontal bars) ────────────────────

function coberturaSvg(dados: Resultado[]): string {
    const modelos  = [...new Set(dados.map(r => r.modelo))];
    const metricas = [
        { key: "statements" as keyof Resultado, label: "Statements", cor: C.stmt   },
        { key: "branches"   as keyof Resultado, label: "Branches",   cor: C.branch },
        { key: "functions"  as keyof Resultado, label: "Functions",  cor: C.func   },
        { key: "lines"      as keyof Resultado, label: "Lines",      cor: C.line   }
    ];

    const W = 700, barH = 26;
    const mL = 115, mT = 80, mR = 70;
    const bW = W - mL - mR;
    const groupH = metricas.length * (barH + 6);
    const H = mT + modelos.length * (groupH + 28) + 60;

    const s: string[] = [];
    s.push(`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">`);
    s.push(`<rect width="${W}" height="${H}" fill="${C.bg}"/>`);
    s.push(`<text x="${W/2}" y="30" text-anchor="middle" font-size="17" font-weight="bold" fill="${C.text}" font-family="sans-serif">Cobertura Média por Modelo</text>`);
    s.push(`<text x="${W/2}" y="52" text-anchor="middle" font-size="12" fill="${C.muted}" font-family="sans-serif">% médio nos ${[...new Set(dados.map(r => r.algoritmo))].length} algoritmos</text>`);

    [0, 25, 50, 75, 100].forEach(p => {
        const x = mL + (p / 100) * bW;
        s.push(`<line x1="${x}" y1="${mT - 8}" x2="${x}" y2="${H - 50}" stroke="${C.grid}" stroke-width="1" opacity="0.3" stroke-dasharray="4,4"/>`);
        s.push(`<text x="${x}" y="${mT - 12}" text-anchor="middle" font-size="10" fill="${C.muted}" font-family="sans-serif">${p}%</text>`);
    });

    modelos.forEach((m, mi) => {
        const g    = dados.filter(r => r.modelo === m);
        const baseY = mT + mi * (groupH + 28);
        const cor  = MODEL_COLOR[m] || C.text;

        s.push(`<text x="${mL - 10}" y="${baseY + groupH / 2 + 5}" text-anchor="end" font-size="13" font-weight="bold" fill="${cor}" font-family="sans-serif">${m}</text>`);

        metricas.forEach((met, ki) => {
            const y    = baseY + ki * (barH + 6);
            const vals = g.map(r => parseFloat(r[met.key] as string)).filter(v => !isNaN(v) && v > 0);
            const med  = vals.length > 0 ? vals.reduce((a, b) => a + b, 0) / vals.length : 0;
            const fW   = Math.max((med / 100) * bW, 2);

            s.push(`<rect x="${mL}" y="${y}" width="${bW}" height="${barH}" rx="4" fill="${C.bgLight}" opacity="0.4"/>`);
            s.push(`<rect x="${mL}" y="${y}" width="${fW}" height="${barH}" rx="4" fill="${met.cor}" opacity="0.85"/>`);
            s.push(`<text x="${mL - 6}" y="${y + barH/2 + 4}" text-anchor="end" font-size="10" fill="${C.muted}" font-family="sans-serif">${met.label}</text>`);
            s.push(`<text x="${mL + fW + 6}" y="${y + barH/2 + 4}" font-size="11" fill="${C.text}" font-family="sans-serif">${med.toFixed(1)}%</text>`);
        });
    });

    // Legend
    const ly = H - 18;
    metricas.forEach((m, i) => {
        const lx = mL + i * 165;
        s.push(`<rect x="${lx}" y="${ly - 11}" width="16" height="11" rx="2" fill="${m.cor}" opacity="0.9"/>`);
        s.push(`<text x="${lx + 22}" y="${ly}" font-size="11" fill="${C.muted}" font-family="sans-serif">${m.label}</text>`);
    });

    s.push(`</svg>`);
    return s.join("\n");
}

// ─── Sucesso por Algoritmo (vertical bars, count of models passed) ────────────

function algoritmosSuccessSvg(dados: Resultado[]): string {
    const algoritmos = [...new Set(dados.map(r => r.algoritmo))];
    const modelos    = [...new Set(dados.map(r => r.modelo))];

    const barW = 30, gap = 8;
    const mL = 50, mT = 70, mB = 130;
    const aH = 200;
    const W  = mL + algoritmos.length * (barW + gap) + 30;
    const H  = mT + aH + mB;

    const s: string[] = [];
    s.push(`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">`);
    s.push(`<rect width="${W}" height="${H}" fill="${C.bg}"/>`);
    s.push(`<text x="${W/2}" y="28" text-anchor="middle" font-size="17" font-weight="bold" fill="${C.text}" font-family="sans-serif">Sucesso por Algoritmo</text>`);
    s.push(`<text x="${W/2}" y="50" text-anchor="middle" font-size="12" fill="${C.muted}" font-family="sans-serif">quantidade de modelos que passaram (de ${modelos.length})</text>`);

    // Y grid
    for (let v = 0; v <= modelos.length; v++) {
        const y = mT + aH - (v / modelos.length) * aH;
        s.push(`<line x1="${mL}" y1="${y}" x2="${W - 20}" y2="${y}" stroke="${C.grid}" stroke-width="1" opacity="0.3" stroke-dasharray="4,4"/>`);
        s.push(`<text x="${mL - 6}" y="${y + 4}" text-anchor="end" font-size="11" fill="${C.muted}" font-family="sans-serif">${v}</text>`);
    }

    algoritmos.forEach((algo, i) => {
        const g   = dados.filter(r => r.algoritmo === algo);
        const ok  = g.filter(r => r.status === "OK").length;
        const x   = mL + i * (barW + gap);
        const cor = ok === modelos.length ? C.ok : ok === 0 ? C.fail : C.timeout;
        const bH  = (ok / modelos.length) * aH;
        const y   = mT + aH - bH;

        // Background
        s.push(`<rect x="${x}" y="${mT}" width="${barW}" height="${aH}" rx="3" fill="${C.bgLight}" opacity="0.2"/>`);
        // Fill
        if (bH > 0) {
            s.push(`<rect x="${x}" y="${y}" width="${barW}" height="${bH}" rx="3" fill="${cor}" opacity="0.88"/>`);
        }
        // Count label
        const labelY = bH > 22 ? y + bH / 2 + 5 : y - 6;
        s.push(`<text x="${x + barW/2}" y="${labelY}" text-anchor="middle" font-size="11" font-weight="bold" fill="${bH > 22 ? "white" : cor}" font-family="sans-serif">${ok}</text>`);

        // Rotated algorithm label
        const textY = mT + aH + 12;
        s.push(`<text transform="rotate(-55 ${x + barW/2} ${textY})" x="${x + barW/2}" y="${textY}" text-anchor="end" font-size="10" fill="${C.muted}" font-family="monospace,sans-serif">${algo}</text>`);
    });

    // Legend
    const ly = H - 14;
    [{ l: "Todos passaram", c: C.ok }, { l: "Parcial", c: C.timeout }, { l: "Nenhum passou", c: C.fail }].forEach((item, i) => {
        const lx = mL + i * 190;
        s.push(`<rect x="${lx}" y="${ly - 11}" width="16" height="11" rx="2" fill="${item.c}" opacity="0.9"/>`);
        s.push(`<text x="${lx + 22}" y="${ly}" font-size="11" fill="${C.muted}" font-family="sans-serif">${item.l}</text>`);
    });

    s.push(`</svg>`);
    return s.join("\n");
}

// ─── Main ─────────────────────────────────────────────────────────────────────

function main() {
    fs.mkdirSync("resultados/graficos", { recursive: true });

    const dados: Resultado[] = JSON.parse(
        fs.readFileSync("resultados/resultados-compilados/resultados.json", "utf8")
    );

    const charts = [
        { nome: "heatmap",      svg: heatmapSvg(dados)           },
        { nome: "taxa-sucesso", svg: taxaSucessoSvg(dados)        },
        { nome: "testes",       svg: testesSvg(dados)             },
        { nome: "cobertura",    svg: coberturaSvg(dados)          },
        { nome: "algoritmos",   svg: algoritmosSuccessSvg(dados)  }
    ];

    for (const chart of charts) {
        fs.writeFileSync(`resultados/graficos/${chart.nome}.svg`, chart.svg, "utf8");
        console.log(`✔ resultados/graficos/${chart.nome}.svg`);
    }
}

main();
