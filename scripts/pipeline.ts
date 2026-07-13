/// <reference types="node" />

import { spawn } from "child_process";
import path from "path";

const scripts = ["medirComplexidade.ts", "coletarResultados.ts", "gerarEstatisticas.ts"];

function run(script: string): Promise<void> {
    return new Promise((resolve, reject) => {
        const tsNode = path.join(process.cwd(), "node_modules", "ts-node", "dist", "bin.js");
        const child = spawn(process.execPath, [tsNode, `scripts/${script}`], { cwd: process.cwd(), stdio: "inherit", shell: false });
        child.on("close", code => code === 0 ? resolve() : reject(new Error(`${script} encerrou com código ${code}`)));
        child.on("error", reject);
    });
}

async function main(): Promise<void> {
    for (const script of scripts) {
        console.log(`\n=== ${script} ===`);
        await run(script);
    }
    console.log("\nPipeline experimental concluído.");
}

main().catch(error => { console.error(error); process.exitCode = 1; });
