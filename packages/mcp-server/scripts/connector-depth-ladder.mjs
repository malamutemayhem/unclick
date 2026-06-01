// connector-depth-ladder.mjs
// Grades every UnClick connector on the Connector Depth Ladder: the visible
// quality system that turns thin wrappers into a graded climb.
//
//   L1 Wrapper      callable endpoint, nothing more
//   L2 Reliable     timeout + rate-limit/retry handling, clean errors, a test
//   L3 Memory-aware fills args from UnClick memory defaults (the PTV pattern)
//   L4 Proactive    can emit signals / wake instead of only answering on demand
//   L5 Agentic      stamps source/freshness and hands the agent its next step
//
// Usage:  node scripts/connector-depth-ladder.mjs            (writes docs/connector-depth-ladder.{md,json})
//         node scripts/connector-depth-ladder.mjs --stdout   (prints the distribution + top rows)
//         node scripts/connector-depth-ladder.mjs --check    (exit 1 if the committed docs are stale)
//
// Heuristic, regex-based, like scripts/audit-integrations.mjs. A marker passing
// means "the deliberate pattern is present", not "it is perfect". Depth (the
// ladder) and hardening (reliability) are reported as separate axes so a
// connector that climbed in capability but skipped hardening is visible, not
// hidden.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SRC = path.resolve(__dirname, "../src");
const REPO = path.resolve(__dirname, "../../..");
const OUT_MD = path.resolve(REPO, "docs/connector-depth-ladder.md");
const OUT_JSON = path.resolve(REPO, "docs/connector-depth-ladder.json");

// ─── Classification (mirrors audit-integrations.mjs) ───────────────────────────
// Only third-party integrations are part of the connector program; internal
// products, infra and local utilities are counted separately.

const INTERNAL_PRODUCTS = new Set([
  "testpass", "legalpass", "uxpass", "seopass", "compliancepass", "flowpass",
  "copypass", "sloppass", "qc", "csuite", "crews", "igniteonly", "nudgeonly",
  "pushonly", "fidelitycopy", "commonsensepass",
]);
const INFRA = new Set(["keychain", "vault"]);
const LOCAL_UTILITY = new Set([
  "calculator", "color", "datetime", "numbers", "random", "text",
  "unit-converter", "converter", "web", "local",
]);

export function classify(base) {
  if (INTERNAL_PRODUCTS.has(base)) return "internal-product";
  if (INFRA.has(base)) return "infra";
  if (LOCAL_UTILITY.has(base)) return "local-utility";
  return "integration";
}

// ─── L2 cap (intentional, not unfinished) ──────────────────────────────────────
// Some connectors legitimately top out at L2. The L5 markers (source/freshness +
// a next-step handoff) describe a *data read* you hand back to the agent, so they
// do not apply to a few archetypes:
//   - "write/send"  performs an outbound action (send a message/email/push). The
//                   result is a delivery receipt, not retrieved data; there is no
//                   freshness to stamp and no downstream tool to hand off to.
//   - "generation"  returns model-generated content (LLM chat). Provenance is the
//                   model + params already in the response, not a fetched source.
//   - "action-multiplexer" routes many read *and* write actions through a single
//                   tool's switch. There is no one result surface to stamp;
//                   per-branch stamping is possible but deferred as low-value
//                   against the cost of unwrapping the dispatcher.
// Listing them here keeps the ladder honest: these read as "L2 by design", not
// "L2, not yet upgraded". Revisit a row only if its shape changes (e.g. a
// dispatcher is split into discrete read tools).
export const L2_CAPPED_BY_DESIGN = {
  // write/send: a receipt, not data
  line: "write/send", postmark: "write/send", pushover: "write/send",
  resend: "write/send", sendgrid: "write/send", telegram: "write/send",
  whatsapp: "write/send",
  // generation: model output, not a fetched source
  perplexity: "generation",
  // action-multiplexers: one tool, many read+write actions
  airtable: "action-multiplexer", bluesky: "action-multiplexer",
  clickup: "action-multiplexer", clockify: "action-multiplexer",
  discord: "action-multiplexer", email: "action-multiplexer",
  feedly: "action-multiplexer", github: "action-multiplexer",
  gitlab: "action-multiplexer", instapaper: "action-multiplexer",
  linear: "action-multiplexer", mastodon: "action-multiplexer",
  monica: "action-multiplexer", notion: "action-multiplexer",
  paypal: "action-multiplexer", postman: "action-multiplexer",
  quickbooks: "action-multiplexer", raindrop: "action-multiplexer",
  readwise: "action-multiplexer", sentry: "action-multiplexer",
  shopify: "action-multiplexer", slack: "action-multiplexer",
  splitwise: "action-multiplexer", square: "action-multiplexer",
  stripe: "action-multiplexer", trello: "action-multiplexer",
  woocommerce: "action-multiplexer", xero: "action-multiplexer",
};

export const CAP_REASON_LABELS = {
  "write/send": "write/send tool, no data to stamp",
  "generation": "model output, not a fetched source",
  "action-multiplexer": "one tool multiplexes many read+write actions",
};

export function capReason(base) {
  return L2_CAPPED_BY_DESIGN[base] ?? null;
}

// ─── Signal detection ──────────────────────────────────────────────────────────
// Source-derived booleans only. hasTest is supplied separately (it comes from
// the test-file listing, not the module body).

export function detectSignals(source) {
  const throws = (source.match(/throw new Error/g) || []).length;
  const returnsErrObj = (source.match(/return\s*\{\s*error:/g) || []).length;
  // Informative error handling: throws for transport/upstream and/or returns
  // { error } for validation (the two-lane reference pattern). Both is fine; the
  // real anti-pattern (bare `HTTP ${status}`) is the separate bareStatusErrors signal.
  const errorStyleClean = throws > 0 || returnsErrObj > 0;

  return {
    // reliability axis
    hasTimeout: /AbortController|AbortSignal|signal:\s|setTimeout/.test(source),
    handles429: /\b429\b/.test(source) || /rate.?limit/i.test(source),
    hasRetry: /retr(y|ies)|backoff|maxAttempts/i.test(source),
    readsErrorBody: /response\.text\(\)|\.json\(\)[\s\S]{0,80}(error|message)/.test(source),
    bareStatusErrors: (source.match(/`HTTP\s*\$\{/g) || []).length,
    errorStyleClean,
    // depth axis (deliberate UnClick value-add markers)
    memoryAware: /__unclick_memory_defaults|defaults_used/.test(source),
    proactive: /emitSignal\(|\bwakeSignal\b|scheduledCheck|proactiveCheck/.test(source),
    agentic: /next_steps?\s*:/.test(source),
    sourceStamped: /(fetched_at|retrieved_at|as_of)\s*:/.test(source) && /source\s*:/.test(source),
  };
}

// Reliability bundle: the L2 bar. Conservative on purpose.
export function isHardened(signals, hasTest) {
  return Boolean(
    signals.hasTimeout &&
    (signals.handles429 || signals.hasRetry) &&
    hasTest &&
    signals.errorStyleClean &&
    signals.bareStatusErrors === 0,
  );
}

// Highest capability reached. Depth markers and hardening are separate axes, so
// a memory-aware/agentic connector is scored on its capability even if it is
// not yet hardened; the `hardened` flag carries that gap.
export function assignLevel(signals, hardened) {
  let level = 1;
  if (hardened) level = 2;
  if (signals.memoryAware) level = Math.max(level, 3);
  if (signals.proactive) level = Math.max(level, 4);
  if (signals.agentic) level = Math.max(level, 5);
  return level;
}

export const LEVEL_NAMES = {
  1: "Wrapper",
  2: "Reliable",
  3: "Memory-aware",
  4: "Proactive",
  5: "Agentic",
};

export function levelName(n) {
  return LEVEL_NAMES[n] || "Wrapper";
}

// ─── Build ───────────────────────────────────────────────────────────────────

function loadTestFiles() {
  const testFiles = new Set();
  for (const f of fs.readdirSync(SRC)) {
    if (f.endsWith(".test.ts")) testFiles.add(f.replace(/\.test\.ts$/, ""));
  }
  const testsDir = path.join(SRC, "__tests__");
  if (fs.existsSync(testsDir)) {
    for (const f of fs.readdirSync(testsDir)) {
      if (f.endsWith(".test.ts")) {
        testFiles.add(f.replace(/\.test\.ts$/, "").replace(/-tool.*$/, "-tool"));
      }
    }
  }
  return testFiles;
}

export function buildLadder() {
  const testFiles = loadTestFiles();
  const rows = [];
  for (const f of fs.readdirSync(SRC)) {
    if (!f.endsWith("-tool.ts") || f.endsWith(".test.ts")) continue;
    const base = f.replace(/-tool\.ts$/, "");
    const source = fs.readFileSync(path.join(SRC, f), "utf8");
    const signals = detectSignals(source);
    const hasTest = testFiles.has(`${base}-tool`) || testFiles.has(base);
    const hardened = isHardened(signals, hasTest);
    const level = assignLevel(signals, hardened);
    const kind = classify(base);
    rows.push({
      base,
      kind,
      level,
      levelName: levelName(level),
      hardened,
      hasTest,
      signals,
      capReason: kind === "integration" && level === 2 ? capReason(base) : null,
    });
  }
  // deterministic: highest level first, then alphabetical
  rows.sort((a, b) => (b.level - a.level) || a.base.localeCompare(b.base));
  return rows;
}

// ─── Render ────────────────────────────────────────────────────────────────────

function gaps(r) {
  const g = [];
  if (!r.hardened) g.push("not-hardened");
  if (!r.signals.hasTimeout) g.push("no-timeout");
  if (!r.signals.handles429 && !r.signals.hasRetry) g.push("no-rate-limit");
  if (!r.hasTest) g.push("no-test");
  if (r.signals.bareStatusErrors > 0) g.push(`${r.signals.bareStatusErrors}x-bare-error`);
  if (!r.signals.memoryAware) g.push("no-memory");
  if (!r.signals.sourceStamped) g.push("no-source-stamp");
  return g.join(", ");
}

function tick(b) {
  return b ? "Yes" : "-";
}

export function render(rows) {
  const integrations = rows.filter((r) => r.kind === "integration");
  const dist = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  for (const r of integrations) dist[r.level]++;
  const n = integrations.length;
  const pct = (c) => (n ? Math.round((c / n) * 100) : 0);

  let md = `# Connector depth ladder\n\n`;
  md += `_Generated by \`scripts/connector-depth-ladder.mjs\`. Heuristic, regex-based, like the integration audit. Re-run after upgrading a connector._\n\n`;
  md += `The ladder is how a thin wrapper becomes a real product. Each rung is a deliberate capability; **hardening (reliability) is a separate axis**, so a connector that climbed in capability but skipped hardening shows up here instead of hiding.\n\n`;
  md += `Graded against the house standard in [\`docs/connector-standard.md\`](./connector-standard.md), which defines the target for each rung.\n\n`;
  md += `| Level | Name | What it means |\n`;
  md += `|:-----:|------|---------------|\n`;
  md += `| L1 | Wrapper | A callable endpoint, nothing more. |\n`;
  md += `| L2 | Reliable | Request timeout, rate-limit or retry handling, informative error handling, and a test. |\n`;
  md += `| L3 | Memory-aware | Fills missing args from UnClick memory defaults (the PTV pattern). |\n`;
  md += `| L4 | Proactive | Can emit a signal or wake, not only answer on demand. |\n`;
  md += `| L5 | Agentic | Stamps source and freshness on the result and hands the agent its next step. |\n\n`;

  md += `## Distribution (${n} external connectors)\n\n`;
  md += `| Level | Name | Connectors | Share |\n`;
  md += `|:-----:|------|-----------:|------:|\n`;
  for (const lvl of [5, 4, 3, 2, 1]) {
    md += `| L${lvl} | ${levelName(lvl)} | ${dist[lvl]} | ${pct(dist[lvl])}% |\n`;
  }
  const hardenedCount = integrations.filter((r) => r.hardened).length;
  md += `\n**Hardened (reliability bar met): ${hardenedCount} of ${n} (${pct(hardenedCount)}%).** Depth and hardening are independent: a connector can be agentic yet not hardened.\n\n`;

  // L2, split into "capped by design" vs genuine upgrade candidates.
  const l2 = integrations.filter((r) => r.level === 2);
  const capped = l2.filter((r) => r.capReason);
  const upgradeable = l2.filter((r) => !r.capReason);
  if (capped.length) {
    const byReason = {};
    for (const r of capped) (byReason[r.capReason] ??= []).push(r.base);
    md += `### Capped at L2 by design (${capped.length})\n\n`;
    md += `The L5 markers (source + freshness, then a next-step handoff) describe a **data read** the agent consumes. These connectors are not reads, so L2 is their ceiling, not a gap. They are excluded from the "L5 reachable" denominator.\n\n`;
    for (const reason of ["action-multiplexer", "write/send", "generation"]) {
      const list = byReason[reason];
      if (!list) continue;
      md += `- **${reason}** (${CAP_REASON_LABELS[reason]}): ${list.sort().map((b) => `\`${b}\``).join(", ")}\n`;
    }
    md += `\n`;
    const reachable = n - capped.length;
    const atL5 = dist[5];
    md += `**L5-reachable connectors at L5: ${atL5} of ${reachable} (${reachable ? Math.round((atL5 / reachable) * 100) : 0}%).** `;
    md += `The remaining ${upgradeable.length} L2 ${upgradeable.length === 1 ? "row is a" : "rows are"} genuine upgrade ${upgradeable.length === 1 ? "candidate" : "candidates"}${upgradeable.length ? `: ${upgradeable.map((r) => `\`${r.base}\``).join(", ")}` : ""}.\n\n`;
  }

  const depthNotHardened = integrations.filter((r) => r.level >= 3 && !r.hardened);
  if (depthNotHardened.length) {
    md += `### Climbed in depth but not yet hardened\n\n`;
    md += `These reached L3+ capability but have not met the L2 reliability bar. Hardening them is the highest-leverage next pass.\n\n`;
    for (const r of depthNotHardened) {
      md += `- \`${r.base}\` (L${r.level} ${r.levelName}): ${gaps(r)}\n`;
    }
    md += `\n`;
  }

  md += `## Per-connector, highest rung first\n\n`;
  md += `| Level | Connector | Hardened | Memory | Proactive | Agentic | Source-stamp | Gaps |\n`;
  md += `|:-----:|-----------|:--------:|:------:|:---------:|:-------:|:------------:|------|\n`;
  for (const r of integrations) {
    const gapCell = r.capReason ? `L2 by design (${r.capReason})` : gaps(r);
    md += `| L${r.level} ${r.levelName} | \`${r.base}\` | ${tick(r.hardened)} | ${tick(r.signals.memoryAware)} | ${tick(r.signals.proactive)} | ${tick(r.signals.agentic)} | ${tick(r.signals.sourceStamped)} | ${gapCell} |\n`;
  }

  const others = {
    "internal-product": rows.filter((r) => r.kind === "internal-product").length,
    infra: rows.filter((r) => r.kind === "infra").length,
    "local-utility": rows.filter((r) => r.kind === "local-utility").length,
  };
  md += `\nAlso present (graded separately, not part of the connector program): `;
  md += `${others["internal-product"]} internal products, ${others.infra} infra, ${others["local-utility"]} local utilities.\n`;

  md += `\n## How to climb\n\n`;
  md += `1. **L1 to L2:** add a request timeout, handle 429/rate-limits, pick one error style, add a test. The integration audit lists these gaps per connector.\n`;
  md += `2. **L2 to L3:** read defaults from memory so the agent can ask "next train" without repeating its home stop. See \`ptv-tool.ts\` (\`__unclick_memory_defaults\`).\n`;
  md += `3. **L3 to L4:** emit a signal when something the user cares about changes (a disruption, a price spike) instead of waiting to be asked.\n`;
  md += `4. **L4 to L5:** stamp every response with its source and freshness, and return a \`next_steps\` hint that points at the next useful tool.\n`;

  md += `\n## Methodology\n\n`;
  md += `Regex markers over each \`*-tool.ts\` source plus the colocated test listing. Depth markers are the deliberate UnClick patterns (\`__unclick_memory_defaults\`/\`defaults_used\` for memory, a \`next_steps\` key for agentic, \`source\`+\`fetched_at\` for stamping). A marker passing means the pattern is present, not that it is correct. Confirm by reading the module before acting.\n`;

  return md;
}

function renderJson(rows) {
  const integrations = rows.filter((r) => r.kind === "integration");
  const payload = integrations.map((r) => ({
    connector: r.base,
    level: r.level,
    levelName: r.levelName,
    hardened: r.hardened,
    cappedByDesign: Boolean(r.capReason),
    capReason: r.capReason,
    signals: r.signals,
  }));
  return JSON.stringify(payload, null, 2) + "\n";
}

// ─── Main ──────────────────────────────────────────────────────────────────────

function main() {
  const rows = buildLadder();
  const md = render(rows);
  const json = renderJson(rows);
  const integrations = rows.filter((r) => r.kind === "integration");
  const dist = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  for (const r of integrations) dist[r.level]++;

  if (process.argv.includes("--check")) {
    const curMd = fs.existsSync(OUT_MD) ? fs.readFileSync(OUT_MD, "utf8") : "";
    const curJson = fs.existsSync(OUT_JSON) ? fs.readFileSync(OUT_JSON, "utf8") : "";
    if (curMd.trim() !== md.trim() || curJson.trim() !== json.trim()) {
      console.error("connector-depth-ladder is stale. Run: node scripts/connector-depth-ladder.mjs");
      process.exit(1);
    }
    console.log(`depth ladder up to date (${integrations.length} connectors: L5:${dist[5]} L4:${dist[4]} L3:${dist[3]} L2:${dist[2]} L1:${dist[1]}).`);
    return;
  }

  if (process.argv.includes("--stdout")) {
    console.log(`${integrations.length} connectors | L5:${dist[5]} L4:${dist[4]} L3:${dist[3]} L2:${dist[2]} L1:${dist[1]}`);
    for (const r of integrations.filter((x) => x.level >= 2).slice(0, 25)) {
      console.log(`L${r.level} ${r.levelName.padEnd(13)} ${r.base.padEnd(16)} ${gaps(r)}`);
    }
    return;
  }

  fs.mkdirSync(path.dirname(OUT_MD), { recursive: true });
  fs.writeFileSync(OUT_MD, md);
  fs.writeFileSync(OUT_JSON, json);
  console.log(`Wrote ${path.relative(REPO, OUT_MD)} and ${path.relative(REPO, OUT_JSON)}`);
  console.log(`${integrations.length} connectors graded. L5:${dist[5]} L4:${dist[4]} L3:${dist[3]} L2:${dist[2]} L1:${dist[1]}`);
}

if (path.resolve(process.argv[1] ?? "") === fileURLToPath(import.meta.url)) main();
