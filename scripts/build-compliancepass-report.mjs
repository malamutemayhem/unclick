#!/usr/bin/env node

import fs from "node:fs/promises";
import path from "node:path";
import {
  renderCompliancePassHtml,
  renderCompliancePassMarkdown,
  runCompliancePass,
} from "../packages/compliancepass/dist/index.js";

const args = process.argv.slice(2);

function argValue(name, fallback) {
  const index = args.indexOf(name);
  return index >= 0 && args[index + 1] ? args[index + 1] : fallback;
}

const repoPath = path.resolve(argValue("--repo", process.cwd()));
const outputPath = argValue("--output", "public/enterprise/latest.json");
const markdownOutputPath = argValue("--markdown-output", siblingOutputPath(outputPath, ".md"));
const htmlOutputPath = argValue("--html-output", siblingOutputPath(outputPath, ".html"));
const targetName = argValue("--target", "UnClick");
const generatedAt = new Date().toISOString();

const draftReport = await runCompliancePass({
  repoPath,
  targetName,
  generatedAt,
});

await fs.mkdir(path.dirname(outputPath), { recursive: true });
await fs.writeFile(outputPath, `${JSON.stringify(draftReport, null, 2)}\n`);
await fs.writeFile(markdownOutputPath, renderCompliancePassMarkdown(draftReport));
await fs.writeFile(htmlOutputPath, renderCompliancePassHtml(draftReport));

const report = await runCompliancePass({
  repoPath,
  targetName,
  generatedAt,
});

await fs.writeFile(outputPath, `${JSON.stringify(report, null, 2)}\n`);
await fs.writeFile(markdownOutputPath, renderCompliancePassMarkdown(report));
await fs.writeFile(htmlOutputPath, renderCompliancePassHtml(report));

console.log(`Wrote CompliancePass report to ${outputPath}`);
console.log(`Wrote CompliancePass Markdown report to ${markdownOutputPath}`);
console.log(`Wrote CompliancePass HTML report to ${htmlOutputPath}`);
console.log(JSON.stringify({
  product: report.product,
  score: report.readiness_score.value,
  band: report.readiness_band,
  checks_total: report.summary.checks_total,
  gaps: report.gaps.length,
}, null, 2));

function siblingOutputPath(sourcePath, extension) {
  const parsed = path.parse(sourcePath);
  const basename = parsed.ext ? parsed.name : parsed.base;
  return path.join(parsed.dir, `${basename}${extension}`);
}
