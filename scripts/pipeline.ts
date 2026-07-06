/// <reference types="node" />

import { exec, spawn }  from "child_process";
import { promisify }    from "util";

const execAsync = promisify(exec);

// ─── Cores ANSI ───────────────────────────────────────────────────────────────

const A = {
    reset:  "\x1b[0m",
    bold:   "\x1b[1m",
    dim:    "\x1b[2m",
    green:  "\x1b[32m",
    red:    "\x1b[31m",
    cyan:   "\x1b[36m",
    clear:  "\x1b[K"
};

// ─── Passo 1: herda stdio para mostrar a barra de progresso ao vivo ───────────

function runInherit(script: string): Promise<void> {
    return new Promise((resolve, reject) => {
        const child = spawn("npx", ["ts-node", `scripts/${script}`], {
            stdio:  "inherit",
            shell:  true,
            cwd:    process.cwd()
        });
        child.on("close", code => {
            if (code === 0) resolve();
            else reject(new Error(`${script} encerrou com código ${code}`));
        });
        child.on("error", reject);
    });
}

// ─── Passos 2–5: spinner com elapsed time ─────────────────────────────────────

const FRAMES = ["⠋","⠙","⠹","⠸","⠼","⠴","⠦","⠧","⠇","⠏"];

async function runWithSpinner(script: string, label: string): Promise<void> {
    let frame = 0;
    const t0  = Date.now();

    const spin = setInterval(() => {
        const s = ((Date.now() - t0) / 1000).toFixed(1);
        process.stdout.write(
            `\r  ${A.cyan}${FRAMES[frame++ % FRAMES.length]}${A.reset}  ${label}  ${A.dim}${s}s${A.reset}${A.clear}`
        );
    }, 80);

    try {
        const { stdout, stderr } = await execAsync(
            `npx ts-node scripts/${script}`,
            { maxBuffer: 1024 * 1024 * 50, cwd: process.cwd() }
        );

        clearInterval(spin);
        const elapsed = ((Date.now() - t0) / 1000).toFixed(1);
        process.stdout.write(
            `\r  ${A.green}✔${A.reset}  ${A.bold}${label}${A.reset}  ${A.dim}${elapsed}s${A.reset}${A.clear}\n`
        );

        // Imprime stdout caso contenha mensagens úteis (✔ linhas dos scripts)
        if (stdout.trim()) {
            stdout.trim().split("\n").forEach(l =>
                console.log(`     ${A.dim}${l.trim()}${A.reset}`)
            );
        }
        if (stderr.trim()) process.stderr.write(stderr);

    } catch (err: any) {
        clearInterval(spin);
        const out = (err.stdout || "") + (err.stderr || "");
        process.stdout.write(
            `\r  ${A.red}✗${A.reset}  ${A.bold}${label}${A.reset}${A.clear}\n`
        );
        if (out) process.stderr.write(out);
        throw new Error(`Falha em ${script} (exit code ${err.code ?? "?"})`);
    }
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
    const inicio = Date.now();
    const eq     = "═".repeat(62);

    console.log(`\n${A.bold}${eq}${A.reset}`);
    console.log(`${A.bold}  PIPELINE — LLMs × Testes Unitários${A.reset}`);
    console.log(`${A.dim}  ${new Date().toLocaleString("pt-BR")}${A.reset}`);
    console.log(`${A.bold}${eq}${A.reset}\n`);

    // Passo 1: barra de progresso ao vivo (stdio herdado do processo filho)
    console.log(`${A.bold}  1/5 — Executando testes (60 execuções)${A.reset}`);
    await runInherit("coletarResultados.ts");

    console.log();

    // Passos 2–5: spinner por etapa
    await runWithSpinner("gerarEstatisticas.ts", "2/5 — Estatísticas descritivas  ");
    await runWithSpinner("gerarTabelaLatex.ts",  "3/5 — Tabelas LaTeX             ");
    await runWithSpinner("gerarGraficos.ts",     "4/5 — Gráficos SVG              ");
    await runWithSpinner("gerarRelatorio.ts",    "5/5 — Relatório Markdown        ");

    const min = ((Date.now() - inicio) / 60000).toFixed(1);

    console.log(`\n${A.bold}${eq}${A.reset}`);
    console.log(`${A.green}${A.bold}  ✅ Pipeline concluído em ${min} min${A.reset}`);
    console.log(`${A.bold}${eq}${A.reset}`);
    console.log(`\n${A.dim}Arquivos gerados em resultados/${A.reset}`);
    console.log(`${A.dim}  json/                  ← JSONs do Jest (60 arquivos)${A.reset}`);
    console.log(`${A.dim}  coverage/              ← Cobertura individual (60 arquivos)${A.reset}`);
    console.log(`${A.dim}  logs/                  ← Logs individuais (60 arquivos)${A.reset}`);
    console.log(`${A.dim}  resultados-compilados/ ← resultados.json + resultados.csv${A.reset}`);
    console.log(`${A.dim}  estatisticas/          ← estatisticas.json + estatisticas.md${A.reset}`);
    console.log(`${A.dim}  latex/                 ← tabelas.tex + fragmentos individuais${A.reset}`);
    console.log(`${A.dim}  graficos/              ← 5 SVGs (heatmap, taxa-sucesso, testes, cobertura, algoritmos)${A.reset}`);
    console.log(`${A.dim}  relatorio.md           ← Relatório completo em Markdown${A.reset}`);
}

main().catch(err => {
    console.error(`\n${A.red}❌ Erro no pipeline:${A.reset}`, err.message);
    process.exit(1);
});
