#!/usr/bin/env node

/**
 * benchmark-record.mjs - post a benchmark run to the UnClick scoreboard.
 *
 * Usage:
 *   node scripts/benchmark-record.mjs <run.json> [--base <url>] [--token <jwt>]
 *
 * - <run.json> is a file in the record_run shape (see docs/benchmarks.md).
 * - --base   defaults to $UNCLICK_BASE_URL or https://unclick.world
 * - --token  defaults to $UNCLICK_ADMIN_TOKEN (a Supabase admin session JWT)
 *
 * This is the bridge for the "report card first" phase: you (or a future
 * automated harness) produce the JSON, this posts it. Same endpoint the UI
 * reads from, so nothing changes when execution is automated later.
 */

import { readFile } from "node:fs/promises";
import process from "node:process";

function parseArgs(argv) {
  const args = { file: null, base: null, token: null };
  const rest = argv.slice(2);
  for (let i = 0; i < rest.length; i++) {
    const a = rest[i];
    if (a === "--base") args.base = rest[++i];
    else if (a === "--token") args.token = rest[++i];
    else if (!a.startsWith("--")) args.file = a;
  }
  return args;
}

async function main() {
  const args = parseArgs(process.argv);
  const base = args.base || process.env.UNCLICK_BASE_URL || "https://unclick.world";
  const token = args.token || process.env.UNCLICK_ADMIN_TOKEN;

  if (!args.file) {
    console.error("Usage: node scripts/benchmark-record.mjs <run.json> [--base <url>] [--token <jwt>]");
    process.exit(1);
  }
  if (!token) {
    console.error("Missing admin token. Pass --token or set UNCLICK_ADMIN_TOKEN.");
    process.exit(1);
  }

  let payload;
  try {
    payload = JSON.parse(await readFile(args.file, "utf8"));
  } catch (err) {
    console.error(`Could not read or parse ${args.file}: ${err.message}`);
    process.exit(1);
  }

  if (!payload.source) payload.source = "script";

  const url = `${base.replace(/\/$/, "")}/api/benchmarks?action=record_run`;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify(payload),
  });

  const body = await res.json().catch(() => ({}));
  if (!res.ok) {
    console.error(`Failed (${res.status}): ${body.error ?? "unknown error"}`);
    process.exit(1);
  }

  const runId = body.run?.id ?? "(unknown)";
  console.log(`Recorded run ${runId} (${payload.results?.length ?? 0} contestants).`);
  console.log(`View it at ${base.replace(/\/$/, "")}/admin/benchmarks`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
