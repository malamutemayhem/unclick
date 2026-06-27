// file-size-guard.mjs
// A ratchet that keeps large source files from getting larger - and stops new
// giant files from being born.
//
// Why a ratchet and not a hard cap: UnClick already has files well past any
// sane line limit (tool-wiring.ts ~16k, api/memory-admin.ts ~11k). A hard cap
// would turn CI red on day one. Instead we record every current offender's
// size in a committed baseline. From then on the guard fails only when:
//   1. a baselined file grows LARGER than its recorded size (it must shrink or
//      hold - never grow), or
//   2. a NEW file crosses the threshold without being in the baseline.
// A file that drops below the threshold, or shrinks, is welcome - run
// `--update` to bank the win and tighten the ratchet.
//
// Generated artifacts (`*.generated.*`), lockfiles, and non-source files are
// exempt: nobody hand-edits them, so their size is not a maintainability cost.
//
// Usage:
//   node scripts/file-size-guard.mjs            check against the baseline (CI mode)
//   node scripts/file-size-guard.mjs --check    same as above (explicit)
//   node scripts/file-size-guard.mjs --update   rewrite the baseline from current sizes
//   node scripts/file-size-guard.mjs --list     print every file over the threshold
//
// Heuristic and deliberately simple: line count over tracked source files.
// The point is a trend rail, not a precise complexity metric.

import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO = path.resolve(__dirname, "..");
const BASELINE = path.join(__dirname, "file-size-baseline.json");

// Files at or above this many lines are "large" and must be tracked.
export const THRESHOLD = 1000;

// Extensions we treat as hand-maintained source.
const SOURCE_EXTENSIONS = new Set([
  ".ts", ".tsx", ".mts", ".cts",
  ".js", ".jsx", ".mjs", ".cjs",
]);

// Path fragments that mark a file as generated / vendored / not hand-edited.
// Matched against the repo-relative POSIX path.
const EXEMPT_PATTERNS = [
  /\.generated\./, // codegen output (brainmap, catalog, tool-index, ...)
  /(^|\/)node_modules\//,
  /(^|\/)dist\//,
  /(^|\/)build\//,
  /\.d\.ts$/, // type declaration bundles
];

function isExempt(relPath) {
  return EXEMPT_PATTERNS.some((re) => re.test(relPath));
}

function isSource(relPath) {
  return SOURCE_EXTENSIONS.has(path.extname(relPath).toLowerCase());
}

// Tracked files only, so we never wander into ignored or local-only paths.
function listTrackedFiles() {
  const out = execFileSync("git", ["ls-files"], { cwd: REPO, encoding: "utf8" });
  return out.split("\n").map((s) => s.trim()).filter(Boolean);
}

function countLines(relPath) {
  const content = fs.readFileSync(path.join(REPO, relPath), "utf8");
  if (content.length === 0) return 0;
  // Count newlines; add 1 when the file does not end in a trailing newline so
  // a final unterminated line still counts.
  let lines = 0;
  for (let i = 0; i < content.length; i++) {
    if (content.charCodeAt(i) === 10) lines++;
  }
  if (content.charCodeAt(content.length - 1) !== 10) lines++;
  return lines;
}

// Returns a sorted { relPath: lineCount } map of every source file at/over the
// threshold, generated/vendored files excluded.
export function collectOversized() {
  const result = {};
  for (const relPath of listTrackedFiles()) {
    if (!isSource(relPath) || isExempt(relPath)) continue;
    // Skip files that are tracked but absent on disk (e.g. staged deletions),
    // so the guard never crashes mid-rename.
    if (!fs.existsSync(path.join(REPO, relPath))) continue;
    const lines = countLines(relPath);
    if (lines >= THRESHOLD) result[relPath] = lines;
  }
  return Object.fromEntries(
    Object.entries(result).sort((a, b) => b[1] - a[1]),
  );
}

function readBaseline() {
  if (!fs.existsSync(BASELINE)) return null;
  return JSON.parse(fs.readFileSync(BASELINE, "utf8"));
}

function writeBaseline(map) {
  const payload = {
    _comment:
      "Ratchet baseline for scripts/file-size-guard.mjs. Files at/over " +
      `${THRESHOLD} lines. A file may shrink (run --update to bank it) but ` +
      "must never grow past its recorded size, and new oversized files must " +
      "be added here deliberately. Lower numbers are the goal.",
    threshold: THRESHOLD,
    files: map,
  };
  fs.writeFileSync(BASELINE, JSON.stringify(payload, null, 2) + "\n");
}

// Compare current sizes to the baseline. Returns { grew, appeared, shrank }.
export function diffAgainstBaseline(current, baseline) {
  const base = baseline?.files ?? {};
  const grew = [];
  const appeared = [];
  const shrank = [];
  for (const [file, lines] of Object.entries(current)) {
    if (!(file in base)) {
      appeared.push({ file, lines });
    } else if (lines > base[file]) {
      grew.push({ file, lines, was: base[file] });
    } else if (lines < base[file]) {
      shrank.push({ file, lines, was: base[file] });
    }
  }
  return { grew, appeared, shrank };
}

function main() {
  const args = process.argv.slice(2);
  const mode = args.includes("--update")
    ? "update"
    : args.includes("--list")
      ? "list"
      : "check";

  const current = collectOversized();

  if (mode === "list") {
    const rows = Object.entries(current);
    console.log(`Files at/over ${THRESHOLD} lines (${rows.length}):`);
    for (const [file, lines] of rows) console.log(`  ${String(lines).padStart(6)}  ${file}`);
    return;
  }

  if (mode === "update") {
    writeBaseline(current);
    console.log(`Wrote ${BASELINE} with ${Object.keys(current).length} entries.`);
    return;
  }

  // check mode
  const baseline = readBaseline();
  if (!baseline) {
    console.error(
      `No baseline found at ${path.relative(REPO, BASELINE)}.\n` +
        "Run: node scripts/file-size-guard.mjs --update",
    );
    process.exit(1);
  }

  const { grew, appeared, shrank } = diffAgainstBaseline(current, baseline);

  if (shrank.length > 0) {
    console.log("Files that shrank since the baseline (run --update to bank these):");
    for (const { file, lines, was } of shrank) {
      console.log(`  ${file}: ${was} -> ${lines} (-${was - lines})`);
    }
  }

  if (grew.length === 0 && appeared.length === 0) {
    console.log(`file-size-guard: OK. ${Object.keys(current).length} large files, none grew.`);
    return;
  }

  const lines = ["file-size-guard FAILED.", ""];
  if (grew.length > 0) {
    lines.push("These files grew past their recorded size (they must shrink, not grow):");
    for (const { file, lines: n, was } of grew) lines.push(`  ${file}: ${was} -> ${n} (+${n - was})`);
    lines.push("");
  }
  if (appeared.length > 0) {
    lines.push(`New files crossed the ${THRESHOLD}-line threshold:`);
    for (const { file, lines: n } of appeared) lines.push(`  ${file}: ${n} lines`);
    lines.push("");
    lines.push("Split the file, or - if the size is genuinely justified - record it");
    lines.push("deliberately with: node scripts/file-size-guard.mjs --update");
  }
  console.error(lines.join("\n"));
  process.exit(1);
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main();
}
