/// <reference types="node" />

import fs from "fs";
import path from "path";
import ts from "typescript";

const SOURCE_DIR = path.join(process.cwd(), "src", "functions");
const OUTPUT_DIR = path.join(process.cwd(), "resultados", "complexidade");

function cyclomaticComplexity(source: ts.SourceFile): number {
    let complexity = 1;
    function visit(node: ts.Node): void {
        if (ts.isIfStatement(node) || ts.isForStatement(node) || ts.isForInStatement(node) ||
            ts.isForOfStatement(node) || ts.isWhileStatement(node) || ts.isDoStatement(node) ||
            ts.isCaseClause(node) || ts.isCatchClause(node) || ts.isConditionalExpression(node)) complexity += 1;
        if (ts.isBinaryExpression(node) && [ts.SyntaxKind.AmpersandAmpersandToken, ts.SyntaxKind.BarBarToken, ts.SyntaxKind.QuestionQuestionToken].includes(node.operatorToken.kind)) complexity += 1;
        ts.forEachChild(node, visit);
    }
    visit(source);
    return complexity;
}

function group(value: number): string {
    if (value <= 2) return "baixa";
    if (value <= 4) return "media";
    return "alta";
}

function main(): void {
    const rows = fs.readdirSync(SOURCE_DIR).filter(file => file.endsWith(".ts")).sort().map(file => {
        const fullPath = path.join(SOURCE_DIR, file);
        const source = ts.createSourceFile(fullPath, fs.readFileSync(fullPath, "utf8"), ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
        const value = cyclomaticComplexity(source);
        return { algorithm: path.basename(file, ".ts"), file: `src/functions/${file}`, function: path.basename(file, ".ts"), complexity: value, group: group(value), tool: "TypeScript Compiler API", version: ts.version, rule: "McCabe: 1 + if/loops/case/catch/?:/&&/||/??; grupos: baixa 1-2, media 3-4, alta >=5" };
    });
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    const headers = ["algoritmo", "arquivo", "funcao", "complexidade", "grupo", "ferramenta", "versao", "regra"];
    const csv = rows.map(row => [row.algorithm, row.file, row.function, row.complexity, row.group, row.tool, row.version, row.rule].map(value => `"${String(value).replace(/"/g, '""')}"`).join(","));
    fs.writeFileSync(path.join(OUTPUT_DIR, "complexidade.csv"), [headers.join(","), ...csv].join("\n"));
    fs.writeFileSync(path.join(OUTPUT_DIR, "complexidade.json"), JSON.stringify(rows, null, 2));
    console.log("✔ resultados/complexidade/complexidade.csv");
}

main();
