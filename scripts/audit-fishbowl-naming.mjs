#!/usr/bin/env node
// scripts/audit-fishbowl-naming.mjs
//
// Boardroom / Fishbowl / Popcorn compatibility map audit + ratchet gate.
//
// Closes UnClick todo "Architecture QC: Boardroom/Fishbowl compatibility map v1"
// (child of 87fb888e). Ratchet mode added per
// docs/path-a-boardroom-rename-migration.md so legacy naming can only shrink.
//
// Modes:
//   (default)            informational report grouped by layer; exits 0.
//   --json               machine-readable report; exits 0.
//   --check              compare per-file legacy counts against the committed
//                        baseline (scripts/boardroom-naming-baseline.json).
//                        Exits 1 when counts grew (new legacy references are
//                        banned) OR when counts shrank without a baseline
//                        update (run --update-baseline to lock in progress).
//   --update-baseline    rewrite the baseline from the current tree.
//
// Counting is a case-insensitive substring scan of each file's path + body, so
// compound identifiers (FishbowlProfile), wire names (fishbowl_list_todos), and
// table names (mc_fishbowl_todos) are all counted. The older word-boundary
// regex missed those. Pure stdlib.

import { promises as fs } from "node:fs";
import * as path from "node:path";

const LEGACY_NEEDLES = ["fishbowl", "popcorn"];

const PATTERNS = {
  fishbowl: /fishbowl/i,
  popcorn: /popcorn/i,
  // Boardroom is current canonical, but it sometimes appears alongside legacy names
  // for context. We track it separately so the compat map can show "X file
  // uses both names interchangeably, prefer Boardroom".
  boardroom: /boardroom/i,
};

export const BASELINE_REL_PATH = "scripts/boardroom-naming-baseline.json";

const SKIP_DIRS = new Set(["node_modules", ".git", "dist", "build", ".next", ".turbo", ".cache", "coverage", ".vercel"]);
// Dot-directories are skipped except these: workflows and agent/skill prompts
// are exactly the places where legacy naming sneaks back in.
const ALLOWED_DOT_DIRS = new Set([".github", ".claude"]);
// Derived artifacts are excluded from the ratchet: their legacy references are
// echoes of tracked source files (which ARE counted), and the brainmap
// auto-update cron rewrites them on main outside any PR, which would strand
// the baseline. Freshness of these files is policed by brainmap:check instead.
const GENERATED_FILE_RE = /(^|\/)UnClick-brainmap\.generated\.(json|md)$/;
const TEXT_EXTENSIONS = new Set([".ts", ".tsx", ".js", ".mjs", ".cjs", ".jsx", ".md", ".mdx", ".json", ".yml", ".yaml", ".sql"]);
const MAX_FILE_BYTES = 2_000_000;

function getArg(name, fallback) {
  const prefix = `--${name}=`;
  const found = process.argv.find((a) => a === `--${name}` || a.startsWith(prefix));
  if (!found) return fallback;
  if (found === `--${name}`) {
    const idx = process.argv.indexOf(found);
    return process.argv[idx + 1] ?? fallback;
  }
  return found.slice(prefix.length);
}

export function classifyLayer(rel) {
  const p = rel.replace(/\\/g, "/").toLowerCase();
  if (/\.test\.|\.spec\./.test(p) || p.startsWith("tests/")) return "tests";
  if (p.startsWith("api/")) return "api";
  if (p.startsWith("src/lib/") || p.startsWith("lib/")) return "lib";
  if (p.startsWith("src/pages/") || p.startsWith("src/components/") || p.startsWith("src/")) return "ui";
  if (p.startsWith("docs/") || p.endsWith(".md")) return "docs";
  if (p.startsWith("scripts/")) return "scripts";
  return "other";
}

/** Case-insensitive substring occurrence count of every legacy needle. */
export function countLegacyOccurrences(text) {
  const lower = text.toLowerCase();
  let count = 0;
  for (const needle of LEGACY_NEEDLES) {
    let idx = 0;
    while ((idx = lower.indexOf(needle, idx)) !== -1) {
      count += 1;
      idx += needle.length;
    }
  }
  return count;
}

function shouldScan(file) {
  const ext = path.extname(file).toLowerCase();
  return TEXT_EXTENSIONS.has(ext);
}

async function* walk(dir, root, depth = 0) {
  if (depth > 20) return;
  let entries;
  try {
    entries = await fs.readdir(dir, { withFileTypes: true });
  } catch {
    return;
  }
  for (const e of entries) {
    if (e.name.startsWith(".") && !ALLOWED_DOT_DIRS.has(e.name)) continue;
    const full = path.join(dir, e.name);
    if (e.isDirectory()) {
      if (SKIP_DIRS.has(e.name)) continue;
      yield* walk(full, root, depth + 1);
    } else if (e.isFile() && shouldScan(full)) {
      const rel = path.relative(root, full).replace(/\\/g, "/");
      // The baseline is a list of legacy-named paths; scanning it would make
      // the count self-referential.
      if (rel === BASELINE_REL_PATH) continue;
      if (GENERATED_FILE_RE.test(rel)) continue;
      yield { full, rel };
    }
  }
}

export async function auditNaming(root) {
  const matches = []; // { file, layer, hits, legacy_occurrences, coexists_with_boardroom }
  let filesScanned = 0;

  for await (const { full, rel } of walk(root, root)) {
    let stat;
    try { stat = await fs.stat(full); } catch { continue; }
    if (stat.size > MAX_FILE_BYTES) continue;
    let body;
    try { body = await fs.readFile(full, "utf8"); } catch { continue; }
    filesScanned += 1;

    const counts = { fishbowl: 0, popcorn: 0, boardroom: 0 };
    const lines = body.split(/\r?\n/);
    for (const line of lines) {
      for (const [k, re] of Object.entries(PATTERNS)) {
        if (re.test(line)) counts[k] += 1;
      }
    }
    // A file's legacy footprint includes its own path, so legacy-named files
    // with clean contents still show up (and still count in the ratchet).
    const legacyOccurrences = countLegacyOccurrences(rel) + countLegacyOccurrences(body);
    if (legacyOccurrences === 0) continue;
    matches.push({
      file: rel,
      layer: classifyLayer(rel),
      hits: counts,
      legacy_occurrences: legacyOccurrences,
      coexists_with_boardroom: counts.boardroom > 0,
    });
  }

  // Group by layer.
  const byLayer = {};
  for (const m of matches) {
    if (!byLayer[m.layer]) byLayer[m.layer] = [];
    byLayer[m.layer].push(m);
  }
  for (const layer of Object.keys(byLayer)) {
    byLayer[layer].sort((a, b) => a.file.localeCompare(b.file));
  }

  // Summary
  const summary = {
    files_with_fishbowl: matches.filter((m) => m.hits.fishbowl > 0).length,
    files_with_popcorn: matches.filter((m) => m.hits.popcorn > 0).length,
    files_with_both_legacy: matches.filter((m) => m.hits.fishbowl > 0 && m.hits.popcorn > 0).length,
    files_with_legacy_and_boardroom: matches.filter((m) => m.coexists_with_boardroom).length,
    total_legacy_occurrences: matches.reduce((n, m) => n + m.legacy_occurrences, 0),
  };

  return {
    root,
    filesScanned,
    summary,
    by_layer: byLayer,
    matches,
  };
}

/** Per-file occurrence map used by the ratchet baseline. */
export function buildBaselineCounts(report) {
  const counts = {};
  for (const m of [...report.matches].sort((a, b) => a.file.localeCompare(b.file))) {
    counts[m.file] = m.legacy_occurrences;
  }
  return counts;
}

/**
 * Compare the current tree against the committed baseline.
 * Any difference fails the gate: increases mean new legacy references were
 * introduced (banned); decreases mean progress that must be locked in with
 * --update-baseline so the baseline only ever ratchets down.
 */
export function compareToBaseline(currentCounts, baselineCounts) {
  const newFiles = [];
  const increased = [];
  const decreased = [];
  const removed = [];
  for (const [file, count] of Object.entries(currentCounts)) {
    const base = baselineCounts[file];
    if (base === undefined) newFiles.push({ file, count });
    else if (count > base) increased.push({ file, base, count });
    else if (count < base) decreased.push({ file, base, count });
  }
  for (const file of Object.keys(baselineCounts)) {
    if (!(file in currentCounts)) removed.push(file);
  }
  const clean =
    newFiles.length === 0 && increased.length === 0 && decreased.length === 0 && removed.length === 0;
  return { clean, newFiles, increased, decreased, removed };
}

export function renderText(report) {
  const lines = [];
  lines.push(`Scanned ${report.filesScanned} files under ${report.root}`);
  lines.push("Summary:");
  lines.push(`  files containing "fishbowl": ${report.summary.files_with_fishbowl}`);
  lines.push(`  files containing "popcorn":  ${report.summary.files_with_popcorn}`);
  lines.push(`  files containing both legacy names: ${report.summary.files_with_both_legacy}`);
  lines.push(`  files containing legacy AND "boardroom": ${report.summary.files_with_legacy_and_boardroom}`);
  if (typeof report.summary.total_legacy_occurrences === "number") {
    lines.push(`  total legacy occurrences (path + content): ${report.summary.total_legacy_occurrences}`);
  }
  lines.push("");

  if (Object.keys(report.by_layer).length === 0) {
    lines.push("✔ No legacy Fishbowl/Popcorn references found.");
    return lines.join("\n");
  }

  const layerOrder = ["api", "lib", "ui", "scripts", "tests", "docs", "other"];
  for (const layer of layerOrder) {
    const items = report.by_layer[layer];
    if (!items || items.length === 0) continue;
    lines.push(`[${layer}] (${items.length} file${items.length === 1 ? "" : "s"})`);
    for (const m of items) {
      const tags = [];
      if (m.hits.fishbowl > 0) tags.push(`fishbowl×${m.hits.fishbowl}`);
      if (m.hits.popcorn > 0) tags.push(`popcorn×${m.hits.popcorn}`);
      if (tags.length === 0) tags.push("legacy name in path only");
      if (m.coexists_with_boardroom) tags.push("alongside boardroom");
      lines.push(`  ${m.file}  (${tags.join(", ")})`);
    }
    lines.push("");
  }

  lines.push("Next step: refer matches to docs/fishbowl-compat-map.md for canonical naming + migration order.");
  return lines.join("\n");
}

async function readBaseline(root) {
  const baselinePath = path.join(root, BASELINE_REL_PATH);
  const raw = await fs.readFile(baselinePath, "utf8");
  const parsed = JSON.parse(raw);
  if (!parsed || typeof parsed !== "object" || typeof parsed.files !== "object") {
    throw new Error(`Malformed baseline at ${BASELINE_REL_PATH}: expected { files: { <path>: <count> } }`);
  }
  return parsed.files;
}

async function writeBaseline(root, report) {
  const counts = buildBaselineCounts(report);
  const payload = {
    $comment:
      "Boardroom naming ratchet baseline. Per-file count of legacy 'fishbowl'/'popcorn' occurrences (path + content, case-insensitive substring). CI fails when any count grows (new legacy references are banned) or when it shrinks without this file being regenerated. Regenerate with: npm run boardroom:baseline. Policy: docs/fishbowl-compat-map.md.",
    total_legacy_occurrences: Object.values(counts).reduce((a, b) => a + b, 0),
    file_count: Object.keys(counts).length,
    files: counts,
  };
  const baselinePath = path.join(root, BASELINE_REL_PATH);
  await fs.writeFile(baselinePath, `${JSON.stringify(payload, null, 2)}\n`, "utf8");
  return payload;
}

function renderCheckFailure(diff) {
  const lines = [];
  if (diff.newFiles.length > 0 || diff.increased.length > 0) {
    lines.push("✘ New legacy 'Fishbowl/Popcorn' references detected. The canonical name is Boardroom.");
    lines.push("  Do not add new Fishbowl references; see docs/fishbowl-compat-map.md.");
    for (const f of diff.newFiles) {
      lines.push(`  NEW   ${f.file}  (${f.count} occurrence${f.count === 1 ? "" : "s"})`);
    }
    for (const f of diff.increased) {
      lines.push(`  GREW  ${f.file}  (${f.base} -> ${f.count})`);
    }
    lines.push("  If a reference is genuinely unavoidable (live contract, generated file, legacy");
    lines.push("  rename in flight), update the baseline deliberately: npm run boardroom:baseline");
    lines.push("  and justify the bump in your PR body.");
  }
  if (diff.decreased.length > 0 || diff.removed.length > 0) {
    lines.push("✔ Legacy references went DOWN (nice) but the baseline is now stale.");
    for (const f of diff.decreased) {
      lines.push(`  SHRANK  ${f.file}  (${f.base} -> ${f.count})`);
    }
    for (const file of diff.removed) {
      lines.push(`  GONE    ${file}`);
    }
    lines.push("  Lock in the progress: npm run boardroom:baseline (commit the diff).");
  }
  return lines.join("\n");
}

async function main() {
  const root = path.resolve(getArg("root", process.cwd()));
  try { await fs.access(root); } catch {
    console.error(`Root path does not exist: ${root}`);
    process.exit(2);
  }
  const report = await auditNaming(root);

  if (process.argv.includes("--update-baseline")) {
    const payload = await writeBaseline(root, report);
    console.log(
      `Baseline updated: ${payload.file_count} files, ${payload.total_legacy_occurrences} legacy occurrences -> ${BASELINE_REL_PATH}`,
    );
    process.exit(0);
  }

  if (process.argv.includes("--check")) {
    let baselineCounts;
    try {
      baselineCounts = await readBaseline(root);
    } catch (err) {
      console.error(`Could not read ${BASELINE_REL_PATH}: ${err.message}`);
      console.error("Generate it with: npm run boardroom:baseline");
      process.exit(1);
    }
    const diff = compareToBaseline(buildBaselineCounts(report), baselineCounts);
    if (diff.clean) {
      console.log(
        `✔ Boardroom naming ratchet clean: ${report.matches.length} legacy-touching files, ` +
          `${report.summary.total_legacy_occurrences} occurrences (none new).`,
      );
      process.exit(0);
    }
    console.error(renderCheckFailure(diff));
    process.exit(1);
  }

  if (process.argv.includes("--json")) {
    console.log(JSON.stringify(report, null, 2));
  } else {
    console.log(renderText(report));
  }
  process.exit(0);
}

if (process.argv[1] && import.meta.url.endsWith(process.argv[1].replace(/\\/g, "/"))) {
  main();
}
