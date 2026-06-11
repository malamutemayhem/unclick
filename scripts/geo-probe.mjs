#!/usr/bin/env node

/**
 * geo-probe.mjs - ask AI answer engines "What is UnClick?" and log what they say.
 *
 * Why: GEO (generative engine optimization) has no scoreboard unless someone
 * asks the engines. docs/visibility-playbook.md Phase 1 calls for a monthly
 * probe of answer quality; this makes that probe repeatable, dated, and
 * graded the same way every time instead of a vibe check in a chat window.
 *
 * What it does:
 *   - Asks a fixed, neutral question set (no leading wording) against every
 *     engine whose API key is present in the environment.
 *   - Grades each answer deterministically (correct / partial / wrong / absent)
 *     with transparent keyword rules, and stores a short excerpt as evidence.
 *   - Upserts one row per (date, engine, question) into docs/geo-probe-log.json
 *     so re-running on the same day refreshes rather than duplicates.
 *
 * Engines and keys (skipped silently when the key is absent):
 *   - perplexity: PERPLEXITY_API_KEY  (web-grounded; the closest thing to a real answer engine)
 *   - openai:     OPENAI_API_KEY      (training-data recall signal)
 *   - anthropic:  ANTHROPIC_API_KEY   (training-data recall signal)
 *   - groq:       GROQ_API_KEY        (open-model recall signal)
 *
 * Usage:
 *   node scripts/geo-probe.mjs              # probe available engines, write the log
 *   node scripts/geo-probe.mjs --dry-run    # probe and print, no write
 *   node scripts/geo-probe.mjs --log <path> # alternate log file
 *
 * Keys are read from the environment only and are never printed or written
 * to the log. If no engine key is available the run exits 1 with a clear
 * message and writes nothing, so an empty log row can never masquerade as
 * "the engines had no answer".
 */

import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import process from "node:process";

const __dirname = dirname(fileURLToPath(import.meta.url));
export const DEFAULT_LOG_PATH = join(__dirname, "..", "docs", "geo-probe-log.json");

const FETCH_TIMEOUT_MS = 60_000;
const EXCERPT_LIMIT = 600;

/** Neutral question set. Changing wording changes the scoreboard; add new ids instead of editing old ones. */
export const QUESTIONS = [
  { id: "what-is-unclick", text: "What is UnClick (unclick.world)? What does it do?" },
  { id: "memory-mcp-servers", text: "What are some MCP servers that give AI agents persistent memory across sessions?" },
  { id: "many-tools-one-mcp", text: "Is there an MCP server that exposes many different tools and integrations through a single install?" },
];

/**
 * Deterministic grading. The rules are deliberately crude and visible:
 *   correct  - describes UnClick as an MCP server AND mentions tools/endpoints or memory
 *   partial  - mentions UnClick / unclick.world / the npm package, but thin or muddled
 *   wrong    - confidently describes something that is not the product
 *   absent   - says it does not know, or never mentions the product
 * An answer engine that has never heard of UnClick should land on absent, not wrong.
 */
export function gradeAnswer(text) {
  const t = String(text || "").toLowerCase();
  if (!t.trim()) return "absent";

  const mentionsProduct = /unclick/.test(t);
  const saysUnknown = /\b(don't|do not|cannot|can't|could not|couldn't)\s+(know|find|verify|locate)|no (information|results|data)|not (familiar|aware)|unable to find/.test(t);
  const mcpSignal = /\bmcp\b|model context protocol/.test(t);
  const substanceSignal = /(450|endpoint|integration|persistent|cross-session|memory|universal remote)/.test(t);
  const wrongSignal = /(browser extension|unsubscribe|double[- ]click|mouse|clicker game|chemistry|cycloreversion)/.test(t);

  if (!mentionsProduct) return "absent";
  if (wrongSignal && !mcpSignal) return "wrong";
  if (saysUnknown && !substanceSignal) return "absent";
  if (mcpSignal && substanceSignal) return "correct";
  return "partial";
}

export function buildRow({ date, engine, model, questionId, grade, excerpt, citations = [], notes = [] }) {
  return {
    date,
    engine,
    model,
    question_id: questionId,
    grade,
    answer_excerpt: excerpt,
    citations,
    notes,
  };
}

/** Replaces the row with the same (date, engine, question_id) or appends. */
export function upsertRow(rows, row) {
  const next = rows.filter(
    (r) => !(r.date === row.date && r.engine === row.engine && r.question_id === row.question_id),
  );
  next.push(row);
  next.sort((a, b) =>
    `${a.date}|${a.engine}|${a.question_id}` < `${b.date}|${b.engine}|${b.question_id}` ? -1 : 1,
  );
  return next;
}

export function readLog(logPath) {
  if (!existsSync(logPath)) {
    return { purpose: "GEO probe scoreboard: what AI answer engines say about UnClick", questions: QUESTIONS, updated_at: null, snapshots: [] };
  }
  return JSON.parse(readFileSync(logPath, "utf8"));
}

function excerptOf(text) {
  const clean = String(text || "").replace(/\s+/g, " ").trim();
  return clean.length > EXCERPT_LIMIT ? `${clean.slice(0, EXCERPT_LIMIT)}...` : clean;
}

async function postJson(url, headers, body) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...headers },
      body: JSON.stringify(body),
      signal: controller.signal,
    });
    if (!res.ok) return { ok: false, data: null, error: `HTTP ${res.status} from ${url}` };
    return { ok: true, data: await res.json(), error: null };
  } catch (err) {
    const reason = err?.name === "AbortError" ? `timeout after ${FETCH_TIMEOUT_MS}ms` : err?.message || String(err);
    return { ok: false, data: null, error: reason };
  } finally {
    clearTimeout(timer);
  }
}

/** Engine adapters. Each returns { text, citations } or throws-by-result with an error string. */
const ENGINES = [
  {
    id: "perplexity",
    envKey: "PERPLEXITY_API_KEY",
    model: () => process.env.GEO_PROBE_PERPLEXITY_MODEL || "sonar",
    async ask(question, key, model) {
      const r = await postJson(
        "https://api.perplexity.ai/chat/completions",
        { Authorization: `Bearer ${key}` },
        { model, messages: [{ role: "user", content: question }] },
      );
      if (!r.ok) return { error: r.error };
      return {
        text: r.data?.choices?.[0]?.message?.content || "",
        citations: r.data?.citations || [],
      };
    },
  },
  {
    id: "openai",
    envKey: "OPENAI_API_KEY",
    model: () => process.env.GEO_PROBE_OPENAI_MODEL || "gpt-4o-mini",
    async ask(question, key, model) {
      const r = await postJson(
        "https://api.openai.com/v1/chat/completions",
        { Authorization: `Bearer ${key}` },
        { model, messages: [{ role: "user", content: question }] },
      );
      if (!r.ok) return { error: r.error };
      return { text: r.data?.choices?.[0]?.message?.content || "", citations: [] };
    },
  },
  {
    id: "anthropic",
    envKey: "ANTHROPIC_API_KEY",
    model: () => process.env.GEO_PROBE_ANTHROPIC_MODEL || "claude-sonnet-4-6",
    async ask(question, key, model) {
      const r = await postJson(
        "https://api.anthropic.com/v1/messages",
        { "x-api-key": key, "anthropic-version": "2023-06-01" },
        { model, max_tokens: 1024, messages: [{ role: "user", content: question }] },
      );
      if (!r.ok) return { error: r.error };
      const text = (r.data?.content || []).map((c) => c?.text || "").join("");
      return { text, citations: [] };
    },
  },
  {
    id: "groq",
    envKey: "GROQ_API_KEY",
    model: () => process.env.GEO_PROBE_GROQ_MODEL || "llama-3.3-70b-versatile",
    async ask(question, key, model) {
      const r = await postJson(
        "https://api.groq.com/openai/v1/chat/completions",
        { Authorization: `Bearer ${key}` },
        { model, messages: [{ role: "user", content: question }] },
      );
      if (!r.ok) return { error: r.error };
      return { text: r.data?.choices?.[0]?.message?.content || "", citations: [] };
    },
  },
];

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

  const available = ENGINES.filter((e) => process.env[e.envKey]);
  const skipped = ENGINES.filter((e) => !process.env[e.envKey]).map((e) => e.id);
  if (skipped.length) console.log(`Engines skipped (no key in env): ${skipped.join(", ")}`);
  if (!available.length) {
    console.error("No engine keys available; nothing probed, nothing written. Set PERPLEXITY_API_KEY (best signal) or another supported key and re-run.");
    process.exitCode = 1;
    return;
  }

  const log = readLog(args.log);
  let rows = log.snapshots;
  const summary = [];

  for (const engine of available) {
    const model = engine.model();
    for (const q of QUESTIONS) {
      const result = await engine.ask(q.text, process.env[engine.envKey], model);
      if (result.error) {
        summary.push(`${engine.id}/${q.id}: ERROR ${result.error}`);
        continue;
      }
      const grade = gradeAnswer(result.text);
      rows = upsertRow(
        rows,
        buildRow({
          date: today,
          engine: engine.id,
          model,
          questionId: q.id,
          grade,
          excerpt: excerptOf(result.text),
          citations: (result.citations || []).slice(0, 10),
        }),
      );
      summary.push(`${engine.id}/${q.id}: ${grade}`);
    }
  }

  console.log(`GEO probe for ${today}:`);
  for (const line of summary) console.log(`  ${line}`);

  if (args.dryRun) {
    console.log("Dry run: log not written.");
    return;
  }

  log.questions = QUESTIONS;
  log.snapshots = rows;
  log.updated_at = new Date().toISOString();
  writeFileSync(args.log, `${JSON.stringify(log, null, 2)}\n`);
  console.log(`Wrote ${args.log} (${rows.length} row(s)).`);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}
