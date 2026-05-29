/**
 * UnClick Benchmarks - Vercel serverless function.
 *
 * Server-controlled, admin-only. Reads the benchmark scoreboard and records
 * new runs. Browser clients never touch the tables directly; this endpoint
 * uses the service role and gates on ADMIN_EMAILS.
 *
 * Routes (via ?action=):
 *   GET  /api/benchmarks?action=overview      -> active suite + latest run + history
 *   GET  /api/benchmarks?action=run&id=<uuid> -> one run with its results
 *   POST /api/benchmarks?action=record_run    -> insert a run + its results
 *   POST /api/benchmarks?action=delete_run     -> { id } delete a run (e.g. the sample)
 *
 * The record_run payload contract is documented in docs/benchmarks.md.
 */

import type { VercelRequest, VercelResponse } from "@vercel/node";
import { createClient } from "@supabase/supabase-js";

// ── Contestant + category helpers (kept small and self-contained so the ────
// serverless bundle stays simple; the richer display logic lives in
// src/lib/benchmarks.ts and is unit-tested there too).

export const CONTESTANTS = ["codex_raw", "claude_raw", "codex_unclick", "claude_unclick"] as const;
export type Contestant = (typeof CONTESTANTS)[number];

export function deriveEngineParts(contestant: Contestant): {
  engine: "codex" | "claude";
  usesUnclick: boolean;
} {
  return {
    engine: contestant.startsWith("codex") ? "codex" : "claude",
    usesUnclick: contestant.endsWith("unclick"),
  };
}

export interface SuiteCategory {
  key: string;
  weight: number;
}

export interface CategoryScore {
  score: number;
  max: number;
}

/** Turn weighted per-category scores into a 0-100 number. Mirrors src/lib. */
export function computeOverallFromCategories(
  categoryScores: Record<string, CategoryScore>,
  categories: SuiteCategory[],
): number {
  const totalWeight = categories.reduce((s, c) => s + (c.weight || 0), 0);
  if (totalWeight <= 0) return 0;
  let weighted = 0;
  for (const cat of categories) {
    const cs = categoryScores[cat.key];
    if (!cs || !(cs.max > 0)) continue;
    const fraction = Math.max(0, Math.min(1, cs.score / cs.max));
    weighted += fraction * cat.weight;
  }
  return Math.round((weighted / totalWeight) * 100 * 100) / 100;
}

export interface RecordRunInput {
  suite_slug: string;
  run_label: string;
  run_date?: string;
  source?: "manual" | "script" | "auto";
  notes?: string;
  results: Array<{
    contestant: Contestant;
    category_scores: Record<string, CategoryScore>;
    overall_score?: number;
    tasks_total?: number;
    tasks_passed?: number;
    evidence?: Record<string, unknown>;
  }>;
}

type ValidationResult =
  | { ok: true; value: RecordRunInput }
  | { ok: false; error: string };

/** Validate the record_run body. Pure, so it is easy to unit-test. */
export function validateRecordRun(body: unknown): ValidationResult {
  if (!body || typeof body !== "object") return { ok: false, error: "Body must be an object." };
  const b = body as Record<string, unknown>;

  if (typeof b.suite_slug !== "string" || !b.suite_slug.trim()) {
    return { ok: false, error: "suite_slug is required." };
  }
  if (typeof b.run_label !== "string") {
    return { ok: false, error: "run_label must be a string." };
  }
  if (!Array.isArray(b.results) || b.results.length === 0) {
    return { ok: false, error: "results must be a non-empty array." };
  }
  if (b.run_date !== undefined && typeof b.run_date !== "string") {
    return { ok: false, error: "run_date must be a date string (YYYY-MM-DD)." };
  }
  if (b.source !== undefined && !["manual", "script", "auto"].includes(b.source as string)) {
    return { ok: false, error: "source must be manual, script, or auto." };
  }

  const seen = new Set<string>();
  for (const raw of b.results) {
    if (!raw || typeof raw !== "object") return { ok: false, error: "Each result must be an object." };
    const r = raw as Record<string, unknown>;
    if (!CONTESTANTS.includes(r.contestant as Contestant)) {
      return { ok: false, error: `Unknown contestant: ${String(r.contestant)}.` };
    }
    if (seen.has(r.contestant as string)) {
      return { ok: false, error: `Duplicate contestant: ${String(r.contestant)}.` };
    }
    seen.add(r.contestant as string);
    if (!r.category_scores || typeof r.category_scores !== "object") {
      return { ok: false, error: `category_scores is required for ${String(r.contestant)}.` };
    }
    for (const [key, cs] of Object.entries(r.category_scores as Record<string, unknown>)) {
      const c = cs as Record<string, unknown>;
      if (typeof c?.score !== "number" || typeof c?.max !== "number") {
        return { ok: false, error: `category_scores.${key} needs numeric score and max.` };
      }
    }
  }

  return { ok: true, value: b as unknown as RecordRunInput };
}

// ── Auth ───────────────────────────────────────────────────────────────────

function bearerFrom(req: VercelRequest): string | null {
  const header = req.headers.authorization;
  if (!header || typeof header !== "string") return null;
  const match = header.match(/^Bearer\s+(.+)$/i);
  return match ? match[1] : null;
}

function adminEmails(): string[] {
  return (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);
}

/** Verify a Supabase session JWT and return the email, or null. */
async function resolveAdminEmail(
  req: VercelRequest,
  supabaseUrl: string,
  serviceRoleKey: string,
): Promise<string | null> {
  const token = bearerFrom(req);
  if (!token || token.startsWith("uc_") || token.startsWith("agt_")) return null;
  try {
    const scoped = createClient(supabaseUrl, serviceRoleKey, {
      auth: { persistSession: false, autoRefreshToken: false },
      global: { headers: { Authorization: `Bearer ${token}` } },
    });
    const { data, error } = await scoped.auth.getUser(token);
    if (error || !data?.user?.email) return null;
    const email = data.user.email.toLowerCase();
    return adminEmails().includes(email) ? email : null;
  } catch {
    return null;
  }
}

// ── Handler ──────────────────────────────────────────────────────────────────

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") return res.status(204).end();

  const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !serviceRoleKey) {
    return res.status(500).json({ error: "Database service unavailable" });
  }

  const adminEmail = await resolveAdminEmail(req, supabaseUrl, serviceRoleKey);
  if (!adminEmail) return res.status(403).json({ error: "Admin access required" });

  const db = createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const action = String(req.query.action ?? "");

  try {
    if (req.method === "GET" && action === "overview") return await overview(db, res);
    if (req.method === "GET" && action === "run") return await runDetail(db, res, String(req.query.id ?? ""));
    if (req.method === "POST" && action === "record_run") return await recordRun(db, res, req.body, adminEmail);
    if (req.method === "POST" && action === "delete_run") return await deleteRun(db, res, req.body);
    return res.status(400).json({ error: "Unknown action" });
  } catch (err) {
    return res.status(500).json({ error: err instanceof Error ? err.message : "Internal error" });
  }
}

// ── Action implementations ───────────────────────────────────────────────────

type Db = ReturnType<typeof createClient>;

async function overview(db: Db, res: VercelResponse) {
  const { data: suite } = await db
    .from("benchmark_suites")
    .select("*")
    .eq("is_active", true)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (!suite) return res.status(200).json({ suite: null, latest: null, history: [] });

  const { data: runs } = await db
    .from("benchmark_runs")
    .select("*")
    .eq("suite_id", suite.id)
    .order("run_date", { ascending: false })
    .order("created_at", { ascending: false });

  const runList = runs ?? [];
  const runIds = runList.map((r) => r.id);

  const { data: allResults } = runIds.length
    ? await db.from("benchmark_results").select("*").in("run_id", runIds)
    : { data: [] as Record<string, unknown>[] };

  const byRun = new Map<string, Record<string, unknown>[]>();
  for (const r of allResults ?? []) {
    const list = byRun.get(r.run_id as string) ?? [];
    list.push(r);
    byRun.set(r.run_id as string, list);
  }

  const history = runList.map((run) => ({ ...run, results: byRun.get(run.id) ?? [] }));
  const latest = history.find((r) => r.status === "complete") ?? history[0] ?? null;

  return res.status(200).json({ suite, latest, history });
}

async function runDetail(db: Db, res: VercelResponse, id: string) {
  if (!id) return res.status(400).json({ error: "id is required" });
  const { data: run } = await db.from("benchmark_runs").select("*").eq("id", id).maybeSingle();
  if (!run) return res.status(404).json({ error: "Run not found" });
  const { data: results } = await db.from("benchmark_results").select("*").eq("run_id", id);
  return res.status(200).json({ run: { ...run, results: results ?? [] } });
}

async function recordRun(db: Db, res: VercelResponse, body: unknown, adminEmail: string) {
  const validation = validateRecordRun(body);
  if (!validation.ok) return res.status(400).json({ error: validation.error });
  const input = validation.value;

  const { data: suite } = await db
    .from("benchmark_suites")
    .select("id, categories")
    .eq("slug", input.suite_slug)
    .maybeSingle();
  if (!suite) return res.status(404).json({ error: `Suite not found: ${input.suite_slug}` });

  const categories = (suite.categories as SuiteCategory[]) ?? [];

  const { data: run, error: runErr } = await db
    .from("benchmark_runs")
    .insert({
      suite_id: suite.id,
      run_label: input.run_label,
      run_date: input.run_date ?? new Date().toISOString().slice(0, 10),
      status: "complete",
      source: input.source ?? "manual",
      notes: input.notes ?? `Recorded by ${adminEmail}`,
    })
    .select("*")
    .single();
  if (runErr || !run) return res.status(500).json({ error: runErr?.message ?? "Failed to create run" });

  const rows = input.results.map((r) => {
    const { engine, usesUnclick } = deriveEngineParts(r.contestant);
    const overall =
      typeof r.overall_score === "number"
        ? r.overall_score
        : computeOverallFromCategories(r.category_scores, categories);
    return {
      run_id: run.id,
      contestant: r.contestant,
      engine,
      uses_unclick: usesUnclick,
      overall_score: overall,
      tasks_total: r.tasks_total ?? 0,
      tasks_passed: r.tasks_passed ?? 0,
      category_scores: r.category_scores,
      evidence: r.evidence ?? {},
    };
  });

  const { error: resErr } = await db.from("benchmark_results").insert(rows);
  if (resErr) {
    // Roll back the orphan run so a failed record does not litter history.
    await db.from("benchmark_runs").delete().eq("id", run.id);
    return res.status(500).json({ error: resErr.message });
  }

  return res.status(201).json({ run: { ...run, results: rows } });
}

async function deleteRun(db: Db, res: VercelResponse, body: unknown) {
  const id = (body as { id?: string } | null)?.id;
  if (!id) return res.status(400).json({ error: "id is required" });
  const { error } = await db.from("benchmark_runs").delete().eq("id", id);
  if (error) return res.status(500).json({ error: error.message });
  return res.status(200).json({ ok: true });
}
