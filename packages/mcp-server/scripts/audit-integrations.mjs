// audit-integrations.mjs
// Conformance grader for UnClick integration modules.
//
// Scans every *-tool.ts in src/, grades each against the integration
// standard (credential handling, error style, resilience, tests, schema
// completeness, name sync), and emits a worst-first scorecard.
//
// Usage:  node scripts/audit-integrations.mjs            (writes docs/integration-audit.md)
//         node scripts/audit-integrations.mjs --stdout   (prints summary table only)
//
// Heuristic, regex-based. It is a triage tool to prioritise remediation,
// not a substitute for reading the module. Checks are intentionally
// conservative: a pass means "the pattern is present", not "it is correct".

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SRC = path.resolve(__dirname, "../src");
const REPO = path.resolve(__dirname, "../../..");
const OUT = path.resolve(REPO, "docs/integration-audit.md");

// ─── Classification ──────────────────────────────────────────────────────────
// Internal UnClick products and infra are graded separately from external
// third-party integrations, which are the focus of the remediation program.

const INTERNAL_PRODUCTS = new Set([
  "testpass", "legalpass", "uipass", "uxpass", "seopass", "compliancepass", "flowpass",
  "copypass", "sloppass", "qc", "csuite", "crews", "igniteonly", "nudgeonly",
  "pushonly", "fidelitycopy", "commonsensepass",
]);
const INFRA = new Set(["keychain", "vault"]);
const LOCAL_UTILITY = new Set([
  "calculator", "color", "datetime", "numbers", "random", "text",
  "unit-converter", "converter", "web", "local",
]);

function classify(base) {
  if (INTERNAL_PRODUCTS.has(base)) return "internal-product";
  if (INFRA.has(base)) return "infra";
  if (LOCAL_UTILITY.has(base)) return "local-utility";
  return "integration";
}

// ─── Load tool-wiring per-module blocks ────────────────────────────────────────
// ADDITIONAL_TOOLS is split by `// ── <file>.ts ──` comment headers.

function loadWiringBlocks() {
  const wiring = fs.readFileSync(path.join(SRC, "tool-wiring.ts"), "utf8");
  const start = wiring.indexOf("export const ADDITIONAL_TOOLS");
  const end = wiring.indexOf("export const ADDITIONAL_HANDLERS");
  const body = wiring.slice(start, end > 0 ? end : undefined);

  const blocks = {};
  const headerRe = /\/\/ ──\s*([a-zA-Z0-9_-]+\.ts)\s*─/g;
  const headers = [...body.matchAll(headerRe)];
  for (let i = 0; i < headers.length; i++) {
    const file = headers[i][1].replace(/\.ts$/, "");
    const from = headers[i].index;
    const to = i + 1 < headers.length ? headers[i + 1].index : body.length;
    const chunk = body.slice(from, to);
    const names = [...chunk.matchAll(/^\s*name:\s*"([^"]+)"/gm)].map((m) => m[1]);
    // crude param + description tallies (heuristic schema-completeness signal)
    const props = [...chunk.matchAll(/\{\s*type:\s*"/g)].length;
    const describedProps = [...chunk.matchAll(/description:\s*"/g)].length;
    blocks[file] = { toolNames: names, toolCount: names.length, props, describedProps };
  }
  return blocks;
}

function loadWebsiteTools() {
  try {
    const t = fs.readFileSync(path.join(REPO, "src/pages/Tools.tsx"), "utf8");
    return new Set([...t.matchAll(/"([a-z][a-z0-9_]+)"/g)].map((m) => m[1]));
  } catch {
    return new Set();
  }
}

// ─── Per-module checks ─────────────────────────────────────────────────────────

function analyseModule(base, source, wiring, testFiles) {
  const c = {};

  // credential source (tightened: only count credential-bearing env vars and
  // explicit secret-shaped args, not generic args.key/args.token used for sorting)
  const usesEnv = /process\.env\.[A-Z0-9_]*(KEY|TOKEN|SECRET|PASS|AUTH|CLIENT_ID|DSN)/.test(source);
  const usesArgsKey = /args\.(secret_key|api_key|apiKey|access_token|accessToken|client_secret|bearer_token)\b/.test(source);
  c.credentialSource = !usesEnv && !usesArgsKey ? "none/keyless"
    : usesEnv && usesArgsKey ? "MIXED"
    : usesEnv ? "env" : "args";

  // error style
  const throws = (source.match(/throw new Error/g) || []).length;
  const returnsErrObj = (source.match(/return\s*\{\s*error:/g) || []).length;
  c.errorStyle = throws && returnsErrObj ? "MIXED"
    : returnsErrObj ? "return-object"
    : throws ? "throw" : "none";

  // resilience signals
  c.handlesNetworkError = /catch\s*\([^)]*\)\s*\{[^}]*(Network error|fetch failed|err)/i.test(source)
    || /try\s*\{[\s\S]{0,400}fetch\(/.test(source);
  c.handles429 = /\b429\b/.test(source) || /rate.?limit/i.test(source);
  c.hasTimeout = /AbortController|AbortSignal|signal:\s|setTimeout/.test(source);
  c.hasRetry = /retr(y|ies)|backoff|maxAttempts/i.test(source);
  c.readsErrorBody = /response\.text\(\)|\.json\(\)[\s\S]{0,80}(error|message)/.test(source);

  // bare status-only errors (the genius anti-pattern)
  c.bareStatusErrors = (source.match(/`HTTP\s*\$\{/g) || []).length;

  // shared client adoption (the migration target, expected 0 today)
  c.usesSharedClient = /from\s+"\.\/http-client|httpClient\(|sharedFetch\(/.test(source);

  // tests
  c.hasTest = testFiles.has(`${base}-tool`) || testFiles.has(base);

  // wiring / schema
  const w = wiring[`${base}-tool`] || wiring[base] || { toolCount: 0, props: 0, describedProps: 0, toolNames: [] };
  c.toolCount = w.toolCount;
  c.schemaDescCoverage = w.props ? Math.round((w.describedProps / w.props) * 100) : 100;
  c.toolNames = w.toolNames;

  return c;
}

// ─── Scoring ───────────────────────────────────────────────────────────────────
// 0-100 readiness. Weighted toward the things that bite agents at runtime.

function score(c, website) {
  let s = 0;
  // resilience (40)
  if (c.handlesNetworkError) s += 10;
  if (c.handles429) s += 10;
  if (c.hasTimeout) s += 10;
  if (c.readsErrorBody && c.bareStatusErrors === 0) s += 10;
  // consistency (25)
  if (c.credentialSource !== "MIXED" && c.credentialSource !== "none/keyless") s += 10;
  else if (c.credentialSource === "none/keyless") s += 10; // keyless is fine
  if (c.errorStyle !== "MIXED" && c.errorStyle !== "none") s += 15;
  // tests (20)
  if (c.hasTest) s += 20;
  // schema completeness (15)
  s += Math.round((c.schemaDescCoverage / 100) * 15);
  return Math.min(100, s);
}

function grade(s) {
  return s >= 85 ? "A" : s >= 70 ? "B" : s >= 55 ? "C" : s >= 40 ? "D" : "F";
}

// ─── Run ─────────────────────────────────────────────────────────────────────

const wiring = loadWiringBlocks();
const website = loadWebsiteTools();

const testFiles = new Set();
for (const f of fs.readdirSync(SRC)) {
  if (f.endsWith(".test.ts")) testFiles.add(f.replace(/\.test\.ts$/, ""));
}
const testsDir = path.join(SRC, "__tests__");
if (fs.existsSync(testsDir)) {
  for (const f of fs.readdirSync(testsDir)) {
    if (f.endsWith(".test.ts")) testFiles.add(f.replace(/\.test\.ts$/, "").replace(/-tool.*$/, "-tool"));
  }
}

const rows = [];
for (const f of fs.readdirSync(SRC)) {
  if (!f.endsWith("-tool.ts") || f.endsWith(".test.ts")) continue;
  const base = f.replace(/-tool\.ts$/, "");
  const kind = classify(base);
  const source = fs.readFileSync(path.join(SRC, f), "utf8");
  const checks = analyseModule(base, source, wiring, testFiles);
  const s = score(checks, website);
  rows.push({ base, kind, loc: source.split("\n").length, s, grade: grade(s), ...checks });
}

const integrations = rows.filter((r) => r.kind === "integration").sort((a, b) => a.s - b.s);

// ─── Emit markdown scorecard ───────────────────────────────────────────────────

function flagSummary(r) {
  const flags = [];
  if (!r.hasTest) flags.push("no-test");
  if (r.credentialSource === "MIXED") flags.push("mixed-creds");
  if (r.errorStyle === "MIXED") flags.push("mixed-errors");
  if (r.bareStatusErrors > 0) flags.push(`${r.bareStatusErrors}x-bare-error`);
  if (!r.handles429) flags.push("no-429");
  if (!r.hasTimeout) flags.push("no-timeout");
  if (!r.usesSharedClient) flags.push("no-shared-client");
  if (r.schemaDescCoverage < 80) flags.push(`schema-${r.schemaDescCoverage}%`);
  return flags.join(", ");
}

const dist = { A: 0, B: 0, C: 0, D: 0, F: 0 };
for (const r of integrations) dist[r.grade]++;

let md = `# Integration audit scorecard\n\n`;
md += `_Generated by \`scripts/audit-integrations.mjs\`. Heuristic triage, worst-first._\n\n`;
md += `**${integrations.length} external integrations graded.** `;
md += `Grade distribution: A:${dist.A} B:${dist.B} C:${dist.C} D:${dist.D} F:${dist.F}\n\n`;
md += `Also present (graded separately, not in this program): `;
md += `${rows.filter((r) => r.kind === "internal-product").length} internal products, `;
md += `${rows.filter((r) => r.kind === "infra").length} infra, `;
md += `${rows.filter((r) => r.kind === "local-utility").length} local utilities.\n\n`;

md += `## Readiness, worst first\n\n`;
md += `| Score | Grade | Integration | Tools | Creds | Errors | 429 | Timeout | Test | Schema% | Top gaps |\n`;
md += `|------:|:-----:|-------------|------:|:-----:|:------:|:---:|:-------:|:----:|--------:|----------|\n`;
for (const r of integrations) {
  md += `| ${r.s} | ${r.grade} | \`${r.base}\` | ${r.toolCount} | ${r.credentialSource} | ${r.errorStyle} | ${r.handles429 ? "✓" : "✗"} | ${r.hasTimeout ? "✓" : "✗"} | ${r.hasTest ? "✓" : "✗"} | ${r.schemaDescCoverage} | ${flagSummary(r)} |\n`;
}

md += `\n## Systemic findings (count across ${integrations.length} integrations)\n\n`;
const pct = (n) => `${n} (${Math.round((n / integrations.length) * 100)}%)`;
md += `- No colocated test: ${pct(integrations.filter((r) => !r.hasTest).length)}\n`;
md += `- Not on shared HTTP client: ${pct(integrations.filter((r) => !r.usesSharedClient).length)}\n`;
md += `- No 429/rate-limit handling: ${pct(integrations.filter((r) => !r.handles429).length)}\n`;
md += `- No request timeout: ${pct(integrations.filter((r) => !r.hasTimeout).length)}\n`;
md += `- No retry/backoff: ${pct(integrations.filter((r) => !r.hasRetry).length)}\n`;
md += `- Bare status-only error messages: ${pct(integrations.filter((r) => r.bareStatusErrors > 0).length)}\n`;
md += `- Mixed credential source (env+args): ${pct(integrations.filter((r) => r.credentialSource === "MIXED").length)}\n`;
md += `- Error style throw vs return-object split: env=${integrations.filter((r) => r.errorStyle === "throw").length} obj=${integrations.filter((r) => r.errorStyle === "return-object").length} mixed=${integrations.filter((r) => r.errorStyle === "MIXED").length}\n`;
md += `- Credential source: env=${integrations.filter((r) => r.credentialSource === "env").length} args=${integrations.filter((r) => r.credentialSource === "args").length} keyless=${integrations.filter((r) => r.credentialSource === "none/keyless").length}\n`;

md += `\n## Methodology\n\n`;
md += `Regex heuristics over module source + the per-module \`ADDITIONAL_TOOLS\` block in \`tool-wiring.ts\`. `;
md += `A check passing means the pattern is present, not that it is correct. Score weights: resilience 40, consistency 25, tests 20, schema 15. `;
md += `Use this to prioritise; confirm by reading the module before remediating.\n`;

if (process.argv.includes("--stdout")) {
  console.log(`${integrations.length} integrations | A:${dist.A} B:${dist.B} C:${dist.C} D:${dist.D} F:${dist.F}`);
  for (const r of integrations.slice(0, 20)) {
    console.log(`${String(r.s).padStart(3)} ${r.grade}  ${r.base.padEnd(18)} ${flagSummary(r)}`);
  }
} else {
  fs.mkdirSync(path.dirname(OUT), { recursive: true });
  fs.writeFileSync(OUT, md);
  console.log(`Wrote ${OUT}`);
  console.log(`${integrations.length} integrations graded. A:${dist.A} B:${dist.B} C:${dist.C} D:${dist.D} F:${dist.F}`);
}
