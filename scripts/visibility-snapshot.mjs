#!/usr/bin/env node

/**
 * visibility-snapshot.mjs - record UnClick's public traction numbers over time.
 *
 * Why: the visibility plan (docs/visibility-playbook.md) needs a trend line,
 * not point-in-time anecdotes. "Is it growing?" should have a committed,
 * dated answer that any seat (or an investor deck) can read back.
 *
 * What it records, one row per UTC day (re-running on the same day updates
 * that day's row instead of duplicating it):
 *   - npm: latest published version + downloads in the trailing 30 days
 *   - GitHub: stars, forks, subscribers (watchers), open issues
 *
 * Usage:
 *   node scripts/visibility-snapshot.mjs            # fetch and write docs/visibility-log.json
 *   node scripts/visibility-snapshot.mjs --dry-run  # fetch and print, no write
 *   node scripts/visibility-snapshot.mjs --log <path>  # alternate log file
 *
 * All sources are public, unauthenticated APIs. GITHUB_TOKEN, if present,
 * raises the GitHub rate limit; no other secrets are read. A source that
 * fails records null for its fields plus a note, so a partial snapshot still
 * lands in the log instead of aborting the run.
 */

import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import process from "node:process";

const __dirname = dirname(fileURLToPath(import.meta.url));

export const NPM_PACKAGE = "@unclick/mcp-server";
export const GITHUB_REPO = "malamutemayhem/unclick";
export const DEFAULT_LOG_PATH = join(__dirname, "..", "docs", "visibility-log.json");

const FETCH_TIMEOUT_MS = 10_000;

async function fetchJson(url, headers = {}) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
  try {
    const res = await fetch(url, { headers, signal: controller.signal });
    if (!res.ok) {
      return { ok: false, data: null, error: `HTTP ${res.status} from ${url}` };
    }
    return { ok: true, data: await res.json(), error: null };
  } catch (err) {
    const reason = err?.name === "AbortError" ? `timeout after ${FETCH_TIMEOUT_MS}ms` : err?.message || String(err);
    return { ok: false, data: null, error: `${reason} (${url})` };
  } finally {
    clearTimeout(timer);
  }
}

/** Builds one dated snapshot row. Missing numbers stay null, never 0. */
export function buildRow({ date, npmVersion = null, npmDownloads30d = null, stars = null, forks = null, watchers = null, openIssues = null, notes = [] }) {
  return {
    date,
    npm_version: npmVersion,
    npm_downloads_last_30d: npmDownloads30d,
    github_stars: stars,
    github_forks: forks,
    github_watchers: watchers,
    github_open_issues: openIssues,
    notes,
  };
}

/** Replaces the row with the same date or appends, keeping date order. */
export function upsertByDate(rows, row) {
  const next = rows.filter((r) => r.date !== row.date);
  next.push(row);
  next.sort((a, b) => (a.date < b.date ? -1 : a.date > b.date ? 1 : 0));
  return next;
}

function formatDelta(prev, curr) {
  if (typeof prev !== "number" || typeof curr !== "number") return "";
  const d = curr - prev;
  return d === 0 ? " (no change)" : ` (${d > 0 ? "+" : ""}${d})`;
}

/** Human-readable trend lines between the previous and current row. */
export function trendLines(prev, curr) {
  const fields = [
    ["npm_downloads_last_30d", "npm downloads (30d)"],
    ["github_stars", "GitHub stars"],
    ["github_forks", "GitHub forks"],
    ["github_watchers", "GitHub watchers"],
  ];
  const lines = [];
  for (const [key, label] of fields) {
    const currVal = curr?.[key];
    if (currVal === null || currVal === undefined) {
      lines.push(`${label}: unavailable this run`);
      continue;
    }
    const prevVal = prev?.[key];
    if (prevVal === null || prevVal === undefined) {
      lines.push(`${label}: ${currVal}`);
    } else {
      lines.push(`${label}: ${prevVal} -> ${currVal}${formatDelta(prevVal, currVal)}`);
    }
  }
  if (curr?.npm_version) lines.push(`npm latest version: ${curr.npm_version}`);
  return lines;
}

export function readLog(logPath) {
  if (!existsSync(logPath)) {
    return { package: NPM_PACKAGE, repo: GITHUB_REPO, updated_at: null, snapshots: [] };
  }
  return JSON.parse(readFileSync(logPath, "utf8"));
}

async function collectSnapshot(today) {
  const notes = [];

  const registry = await fetchJson(`https://registry.npmjs.org/${NPM_PACKAGE}`);
  const npmVersion = registry.ok ? registry.data?.["dist-tags"]?.latest ?? null : null;
  if (!registry.ok) notes.push(`npm registry: ${registry.error}`);

  const downloads = await fetchJson(`https://api.npmjs.org/downloads/point/last-month/${NPM_PACKAGE}`);
  const npmDownloads30d = downloads.ok ? downloads.data?.downloads ?? null : null;
  if (!downloads.ok) notes.push(`npm downloads: ${downloads.error}`);

  const ghHeaders = { Accept: "application/vnd.github+json", "User-Agent": "unclick-visibility-snapshot" };
  if (process.env.GITHUB_TOKEN) ghHeaders.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  const gh = await fetchJson(`https://api.github.com/repos/${GITHUB_REPO}`, ghHeaders);
  if (!gh.ok) notes.push(`github: ${gh.error}`);

  return buildRow({
    date: today,
    npmVersion,
    npmDownloads30d,
    stars: gh.ok ? gh.data?.stargazers_count ?? null : null,
    forks: gh.ok ? gh.data?.forks_count ?? null : null,
    watchers: gh.ok ? gh.data?.subscribers_count ?? null : null,
    openIssues: gh.ok ? gh.data?.open_issues_count ?? null : null,
    notes,
  });
}

function parseArgs(argv) {
  const args = { dryRun: false, log: DEFAULT_LOG_PATH };
  const rest = argv.slice(2);
  for (let i = 0; i < rest.length; i++) {
    if (rest[i] === "--dry-run") args.dryRun = true;
    else if (rest[i] === "--log") args.log = rest[++i];
  }
  return args;
}

async function main() {
  const args = parseArgs(process.argv);
  const today = new Date().toISOString().slice(0, 10);

  const row = await collectSnapshot(today);
  const log = readLog(args.log);
  const prev = [...log.snapshots].reverse().find((r) => r.date < row.date) ?? null;

  console.log(`Visibility snapshot for ${today}:`);
  for (const line of trendLines(prev, row)) console.log(`  ${line}`);
  for (const note of row.notes) console.log(`  note: ${note}`);

  if (args.dryRun) {
    console.log("Dry run: log not written.");
    return;
  }

  log.snapshots = upsertByDate(log.snapshots, row);
  log.updated_at = new Date().toISOString();
  writeFileSync(args.log, `${JSON.stringify(log, null, 2)}\n`);
  console.log(`Wrote ${args.log} (${log.snapshots.length} snapshot(s)).`);

  const allFailed = row.npm_downloads_last_30d === null && row.github_stars === null && row.npm_version === null;
  if (allFailed) {
    console.error("Every source failed; row recorded with nulls. Check network access and re-run.");
    process.exitCode = 1;
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}
