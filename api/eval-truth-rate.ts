// GET /api/eval-truth-rate
//
// The live connector: reads recent Boardroom (Fishbowl) jobs + comments from
// Supabase, runs each through the eval live adapter + scoreTrace, and returns
// the truth-rate dashboard (verified vs false-green vs stale) plus the job ids
// that need action. This is the surface that turns the whole eval pipeline into
// a real, observable number.
//
// Auth: accepts EITHER the CRON_SECRET bearer (for the scheduled run) OR a
// Supabase admin session JWT (for the admin dashboard), mirroring
// api/benchmarks.ts. Read-only; uses the service-role key only to query, never
// to mutate.

import type { VercelRequest, VercelResponse } from "@vercel/node";
import { createClient } from "@supabase/supabase-js";
import { scoreLiveJobs } from "./lib/eval/live-score.js";
import { rowsToAdapterInputs, type RawTodoRow, type RawCommentRow } from "./lib/eval/improvement-fetch.js";

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

/** Cron token OR an admin Supabase session both authorize this read-only view. */
async function isAuthorized(req: VercelRequest, supabaseUrl: string, serviceRoleKey: string): Promise<boolean> {
  const token = bearerFrom(req);
  if (!token) return false;

  // Path 1: the scheduled cron secret.
  if (process.env.CRON_SECRET && token === process.env.CRON_SECRET) return true;

  // Path 2: an admin Supabase session JWT (not an UnClick API key).
  if (token.startsWith("uc_") || token.startsWith("agt_")) return false;
  try {
    const scoped = createClient(supabaseUrl, serviceRoleKey, {
      auth: { persistSession: false, autoRefreshToken: false },
      global: { headers: { Authorization: `Bearer ${token}` } },
    });
    const { data, error } = await scoped.auth.getUser(token);
    if (error || !data?.user?.email) return false;
    return adminEmails().includes(data.user.email.toLowerCase());
  } catch {
    return false;
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") return res.status(204).end();

  const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !supabaseKey) {
    return res.status(500).json({ error: "Database service unavailable" });
  }

  if (!(await isAuthorized(req, supabaseUrl, supabaseKey))) {
    return res.status(403).json({ error: "Admin access required" });
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  // Look back over recent jobs; bound the window so this stays cheap.
  const lookbackDays = Math.min(Number(req.query.days ?? 14) || 14, 90);
  const cutoff = new Date(Date.now() - lookbackDays * 24 * 60 * 60 * 1000).toISOString();

  const { data: todos, error: todosError } = await supabase
    .from("mc_fishbowl_todos")
    .select(
      "id, status, created_by_agent_id, assigned_to_agent_id, completed_at, updated_at",
    )
    .gte("updated_at", cutoff)
    .order("updated_at", { ascending: false })
    .limit(500);

  if (todosError) {
    console.error("[eval-truth-rate] todos fetch error:", todosError.message);
    return res.status(500).json({ error: todosError.message });
  }

  const todoRows = (todos ?? []) as RawTodoRow[];
  if (todoRows.length === 0) {
    return res.status(200).json({ window_days: lookbackDays, summary: null, note: "no jobs in window" });
  }

  const todoIds = todoRows.map((t) => t.id);
  const { data: comments, error: commentsError } = await supabase
    .from("mc_fishbowl_comments")
    .select("target_id, author_agent_id, text")
    .in("target_id", todoIds)
    .limit(5000);

  if (commentsError) {
    console.error("[eval-truth-rate] comments fetch error:", commentsError.message);
    return res.status(500).json({ error: commentsError.message });
  }

  const inputs = rowsToAdapterInputs(todoRows, (comments ?? []) as RawCommentRow[], Date.now());
  const report = scoreLiveJobs(inputs);

  return res.status(200).json({
    window_days: lookbackDays,
    summary: report.summary,
    false_green_job_ids: report.falseGreenJobIds,
    stale_job_ids: report.staleJobIds,
  });
}
