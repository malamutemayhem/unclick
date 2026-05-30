// connector-depth-ladder.mjs
// Grades every UnClick connector on a quality ladder, turning "180 thin wrappers"
// into a visible, trackable quality system. Purely additive: reads connector
// source + colocated tests, writes a generated scorecard. No runtime impact.
//
//   L1 Wrapper      calls the API
//   L2 Reliable     + error handling and (resilience or a test)
//   L3 Memory-aware + uses saved/env/arg defaults (remembers context)
//   L4 Proactive    + stamps source/freshness and suggests the next step
//   L5 Agentic      + chains tools / recipes
//
// PTV is the current reference for L4 (source-stamped + memory defaults + next_steps).
//
// Usage:
//   node scripts/connector-depth-ladder.mjs            (write the scorecard)
//   node scripts/connector-depth-ladder.mjs --check    (fail if the committed file is stale)

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SRC = path.resolve(__dirname, "../src");
const REPO = path.resolve(__dirname, "../../..");
const OUT_MD = path.join(REPO, "docs/connector-depth-ladder.generated.md");
const OUT_JSON = path.join(REPO, "docs/connector-depth-ladder.generated.json");

// Internal products / infra / local utilities are not third-party connectors.
const NOT_CONNECTORS = new Set([
  "testpass", "legalpass", "uxpass", "seopass", "compliancepass", "flowpass",
  "copypass", "sloppass", "qc", "csuite", "crews", "igniteonly", "nudgeonly",
  "pushonly", "fidelitycopy", "commonsensepass", "keychain", "vault",
  "calculator", "color", "datetime", "numbers", "random", "text",
  "unit-converter", "converter", "web", "local",
]);

const LEVELS = [
  { level: 1, name: "Wrapper" },
  { level: 2, name: "Reliable" },
  { level: 3, name: "Memory-aware" },
  { level: 4, name: "Proactive" },
  { level: 5, name: "Agentic" },
];

function hasColocatedTest(base) {
  if (fs.existsSync(path.join(SRC, `${base}-tool.test.ts`))) return true;
  const testsDir = path.join(SRC, "__tests__");
  if (!fs.existsSync(testsDir)) return false;
  return fs.readdirSync(testsDir).some((f) => f.startsWith(`${base}-tool`) || f.startsWith(`${base}.`));
}

function gradeConnector(base, src) {
  const callsApi = /\bfetch\(/.test(src);
  const handlesErrors = /catch\s*\(|return\s*\{\s*error\b/.test(src);
  const resilient = /AbortController|AbortSignal|signal:\s|setTimeout|\btimeout\b/i.test(src) || /\b429\b/.test(src) || /rate.?limit/i.test(src);
  const tested = hasColocatedTest(base);
  // memory-aware: pulls defaults from env or args (so it can remember context)
  const memoryAware = (/process\.env\[?["']?[A-Z][A-Z0-9_]+/.test(src) &&
    (/args\[[^\]]+\]\s*\?\?|args\.\w+\s*\?\?/.test(src) || /defaults_used|__unclick_memory|HOME_/.test(src)))
    || /defaults_used|__unclick_memory/.test(src);
  // proactive: stamps source/freshness and suggests next steps
  const proactive = /unclick_meta|fetched_at|next_steps|freshness|attribution/.test(src);
  // agentic: explicit chaining / recipes / orchestration
  const agentic = /\brecipe\b|orchestrat|callTool\(|chain the/i.test(src);

  const signals = { callsApi, handlesErrors, resilient, tested, memoryAware, proactive, agentic };

  let level = callsApi ? 1 : 0;
  if (level >= 1 && handlesErrors && (resilient || tested)) level = 2;
  if (level >= 2 && memoryAware) level = 3;
  if (level >= 3 && proactive) level = 4;
  if (level >= 4 && agentic) level = 5;
  // A connector can be proactive without env defaults (e.g. always-stamped). Give
  // partial credit: stamped-but-not-memory still counts as L2.x, but the ladder is
  // cumulative, so it stays at L2 until it also remembers. That is intentional.
  return { level, signals };
}

function nextStep(signals) {
  if (!signals.callsApi) return "n/a (no API call)";
  if (!(signals.handlesErrors && (signals.resilient || signals.tested))) return "add error handling + a test/timeout -> L2";
  if (!signals.memoryAware) return "add env/memory defaults -> L3";
  if (!signals.proactive) return "stamp source/freshness + next_steps -> L4";
  if (!signals.agentic) return "add chaining/recipes -> L5";
  return "top of ladder";
}

function build() {
  const connectors = [];
  for (const f of fs.readdirSync(SRC)) {
    if (!f.endsWith("-tool.ts") || f.endsWith(".test.ts")) continue;
    const base = f.replace(/-tool\.ts$/, "");
    if (NOT_CONNECTORS.has(base)) continue;
    const src = fs.readFileSync(path.join(SRC, f), "utf8");
    const { level, signals } = gradeConnector(base, src);
    connectors.push({ app: base, level, levelName: LEVELS.find((l) => l.level === level)?.name ?? "Unscored", signals });
  }
  connectors.sort((a, b) => a.level - b.level || a.app.localeCompare(b.app));
  return connectors;
}

function render(connectors) {
  const dist = [0, 0, 0, 0, 0, 0];
  for (const c of connectors) dist[c.level]++;
  const total = connectors.length;

  let md = `# Connector depth ladder\n\n`;
  md += `_Generated by \`scripts/connector-depth-ladder.mjs\`. Heuristic. Lowest level first._\n\n`;
  md += `**${total} connectors graded.** The ladder turns thin wrappers into a visible quality system.\n\n`;
  md += `| Level | Meaning | Count |\n|------:|---------|------:|\n`;
  for (const l of LEVELS) md += `| L${l.level} ${l.name} | ${ladderMeaning(l.level)} | ${dist[l.level]} |\n`;
  md += `\n## Connectors (climb targets first)\n\n`;
  md += `| Level | Connector | Has test | Resilient | Memory | Stamped | Next step to climb |\n`;
  md += `|:-----:|-----------|:--------:|:---------:|:------:|:-------:|--------------------|\n`;
  for (const c of connectors) {
    const s = c.signals;
    md += `| L${c.level} ${c.levelName} | \`${c.app}\` | ${s.tested ? "✓" : "✗"} | ${s.resilient ? "✓" : "✗"} | ${s.memoryAware ? "✓" : "✗"} | ${s.proactive ? "✓" : "✗"} | ${nextStep(s)} |\n`;
  }
  md += `\n## How to climb\n\n`;
  md += `- **L2 Reliable:** structured errors + a timeout/429 path or a colocated test.\n`;
  md += `- **L3 Memory-aware:** read defaults from env/args/memory (e.g. PTV home stop).\n`;
  md += `- **L4 Proactive:** stamp \`source\`/\`fetched_at\` and return \`next_steps\` (see \`ptv-tool.ts\`).\n`;
  md += `- **L5 Agentic:** chain tools into recipes.\n\n`;
  md += `Heuristic, source-pattern based; confirm by reading the connector before relying on a grade.\n`;
  return md;
}

function ladderMeaning(level) {
  return {
    1: "calls the API",
    2: "+ error handling and (resilience or a test)",
    3: "+ remembers context (env/memory defaults)",
    4: "+ source/freshness stamp and next-step hints",
    5: "+ chains tools / recipes",
  }[level];
}

const connectors = build();
const md = render(connectors);
const json = JSON.stringify(connectors, null, 2) + "\n";

if (process.argv.includes("--check")) {
  const cur = fs.existsSync(OUT_MD) ? fs.readFileSync(OUT_MD, "utf8") : "";
  if (cur.trim() !== md.trim()) {
    console.error("connector-depth-ladder is stale. Run: node scripts/connector-depth-ladder.mjs");
    process.exit(1);
  }
  console.log(`depth ladder up to date (${connectors.length} connectors).`);
} else {
  fs.mkdirSync(path.dirname(OUT_MD), { recursive: true });
  fs.writeFileSync(OUT_MD, md);
  fs.writeFileSync(OUT_JSON, json);
  const dist = [0, 0, 0, 0, 0, 0];
  for (const c of connectors) dist[c.level]++;
  console.log(`Wrote depth ladder: ${connectors.length} connectors.`);
  console.log(`L1:${dist[1]} L2:${dist[2]} L3:${dist[3]} L4:${dist[4]} L5:${dist[5]}`);
}
