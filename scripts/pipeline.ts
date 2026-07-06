/// <reference types="node" />

import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);

// ─── Runner ───────────────────────────────────────────────────────────────────

async function run(script: string, label: string): Promise<void> {
    const sep = "─".repeat(60);
    console.log(`\n${sep}`);
    console.log(`▶  ${label}`);
    console.log(sep);

    try {
        const { stdout, stderr } = await execAsync(
            `npx ts-node scripts/${script}`,
            { maxBuffer: 1024 * 1024 * 50, cwd: process.cwd() }
        );
        if (stdout) process.stdout.write(stdout);
        if (stderr) process.stderr.write(stderr);
    } catch (err: any) {
        const out = (err.stdout || "") + (err.stderr || "");
        if (out) process.stderr.write(out);
        throw new Error(`Falha em ${script} (exit code ${err.code ?? "?"})`);
    }
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
    const inicio = Date.now();
    const eq = "═".repeat(60);

    console.log(`\n${eq}`);
    console.log(`  PIPELINE — LLMs × Testes Unitários`);
    console.log(`  ${new Date().toLocaleString("pt-BR")}`);
    console.log(eq);

    await run("coletarResultados.ts", "1/5 — Executando testes (60 execuções)");
    await run("gerarEstatisticas.ts", "2/5 — Calculando estatísticas descritivas");
    await run("gerarTabelaLatex.ts",  "3/5 — Gerando tabelas LaTeX");
    await run("gerarGraficos.ts",     "4/5 — Gerando gráficos SVG");
    await run("gerarRelatorio.ts",    "5/5 — Gerando relatório Markdown");

    const min = ((Date.now() - inicio) / 60000).toFixed(1);

    console.log(`\n${eq}`);
    console.log(`  ✅ Pipeline concluído em ${min} min`);
    console.log(eq);
    console.log(`\nArquivos gerados em resultados/`);
    console.log(`  json/                  ← JSONs do Jest (60 arquivos)`);
    console.log(`  coverage/              ← Cobertura individual (60 arquivos)`);
    console.log(`  logs/                  ← Logs individuais (60 arquivos)`);
    console.log(`  resultados-compilados/ ← resultados.json + resultados.csv`);
    console.log(`  estatisticas/          ← estatisticas.json + estatisticas.md`);
    console.log(`  latex/                 ← tabelas.tex + fragmentos individuais`);
    console.log(`  graficos/              ← heatmap, taxa-sucesso, testes, cobertura, algoritmos (.svg)`);
    console.log(`  relatorio.md           ← Relatório completo em Markdown`);
}

main().catch(err => {
    console.error("\n❌ Erro no pipeline:", err.message);
    process.exit(1);
});
