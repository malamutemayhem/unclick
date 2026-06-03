// GET /api/eval-inspection
//
// The server-side session-start inspection. Reads recent Boardroom jobs, scores
// them by proof, advances the recurring-friction streak (persisted so "recurs N
// times" is real across sessions), and returns the inspection report plus any
// proposed improvement job. This is the surface the load_memory bookend can call
// so inspection fires on every session.
//
// Safety: read-only by default. It only WRITES the streak counters (bookkeeping)
// and, ONLY when EVAL_INSPECTION_POST_JOBS=1, inserts a proposed improvement job
// into the Boardroom for the Autopilot Improver lane. That insert is off by
// default so turning on board-posting is a deliberate, owner-made change.
//
// Auth: CRON_SECRET bearer OR an admin Supabase session, like api/eval-truth-rate.ts.

import type { VercelRequest, VercelResponse } from "@vercel/node";
import { createClient } from "@supabase/supabase-js";
import { scoreLiveJobs } from "./lib/eval/live-score.js";
import { rowsToAdapterInputs, type RawTodoRow, type RawCommentRow } from "./lib/eval/improvement-fetch.js";
import { buildSessionInspection } from "./lib/eval/session-inspection.js";
import {
  frictionKeyFor,
  advanceStreaks,
  proposalToTodoRow,
  type InspectionStreakRow,
} from "./lib/eval/inspection-store.js";

const SCOPE = "global";
const INSPECTOR_AGENT = "session-inspector";

function bearerFrom(req: VercelRequest): string | null {
  const header = req.headers.authorization;
  if (!header || typeof header !== "string") return null;
  const match = header.match(/^Bearer\s+(.+)$/i);
  return match ? match[1] : null;
}

function adminEmails(): string[] {
  return (process.env.ADMIN_EMAILS ?? "").split(",").map((s) => s.trim().toLowerCase()).filter(Boolean);
}

async function isAuthorized(req: VercelRequest, supabaseUrl: string, serviceRoleKey: string): Promise<boolean> {
  const token = bearerFrom(req);
  if (!token) return false;
  if (process.env.CRON_SECRET && token === process.env.CRON_SECRET) return true;
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
  if (!supabaseUrl || !supabaseKey) return res.status(500).json({ error: "Database service unavailable" });

  if (!(await isAuthorized(req, supabaseUrl, supabaseKey))) {
    return res.status(403).json({ error: "Admin access required" });
  }

  const supabase = createClient(supabaseUrl, supabaseKey);
  const lookbackDays = Math.min(Number(req.query.days ?? 14) || 14, 90);
  const cutoff = new Date(Date.now() - lookbackDays * 24 * 60 * 60 * 1000).toISOString();

  const { data: todos, error: todosError } = await supabase
    .from("mc_fishbowl_todos")
    .select("id, status, created_by_agent_id, assigned_to_agent_id, completed_at, updated_at")
    .gte("updated_at", cutoff)
    .order("updated_at", { ascending: false })
    .limit(500);
  if (todosError) return res.status(500).json({ error: todosError.message });

  const todoRows = (todos ?? []) as RawTodoRow[];
  let report = { summary: null as ReturnType<typeof scoreLiveJobs>["summary"] | null, falseGreenJobIds: [] as string[], staleJobIds: [] as string[] };

  if (todoRows.length > 0) {
    const todoIds = todoRows.map((t) => t.id);
    const { data: comments } = await supabase
      .from("mc_fishbowl_comments")
      .select("target_id, author_agent_id, text")
      .in("target_id", todoIds)
      .limit(5000);
    const inputs = rowsToAdapterInputs(todoRows, (comments ?? []) as RawCommentRow[], Date.now());
    const scored = scoreLiveJobs(inputs);
    report = { summary: scored.summary, falseGreenJobIds: scored.falseGreenJobIds, staleJobIds: scored.staleJobIds };
  }

  // Load prior streaks so "recurring" is real across sessions.
  const { data: streakRows } = await supabase
    .from("mc_eval_inspection_streaks")
    .select("friction_key, streak")
    .eq("api_key_hash", SCOPE);
  const prior = (streakRows ?? []) as InspectionStreakRow[];

  // First pass: status only, to know which friction key is active.
  const probe = buildSessionInspection({
    truthSummary: report.summary,
    falseGreenJobIds: report.falseGreenJobIds,
    staleJobIds: report.staleJobIds,
  });
  const fakeGreenHigh = probe.notes.some((n) => n.toLowerCase().includes("fake-green rate"));
  const staleHigh = probe.notes.some((n) => n.toLowerCase().includes("stale job"));
  const activeKey = frictionKeyFor(probe.status, fakeGreenHigh, staleHigh);

  const streakUpdate = advanceStreaks(prior, activeKey);

  // Persist the advanced streaks (bookkeeping only).
  const now = new Date().toISOString();
  await supabase.from("mc_eval_inspection_streaks").upsert(
    streakUpdate.toPersist.map((r) => ({ api_key_hash: SCOPE, friction_key: r.friction_key, streak: r.streak, last_seen_at: now, updated_at: now })),
    { onConflict: "api_key_hash,friction_key" },
  );

  // Second pass: now with the real recurring streak, to decide on a proposal.
  const inspection = buildSessionInspection({
    truthSummary: report.summary,
    falseGreenJobIds: report.falseGreenJobIds,
    staleJobIds: report.staleJobIds,
    recurringFrictionStreak: Math.max(0, streakUpdate.streak - 1),
  });

  // Optional, off by default: post the proposed improvement job to the board.
  let postedJob: { id: string } | null = null;
  const postEnabled = process.env.EVAL_INSPECTION_POST_JOBS === "1";
  if (postEnabled && inspection.improvementJob) {
    const row = proposalToTodoRow(inspection.improvementJob, SCOPE, INSPECTOR_AGENT);
    const { data: inserted, error: insertError } = await supabase
      .from("mc_fishbowl_todos")
      .insert(row)
      .select("id")
      .single();
    if (insertError) console.error("[eval-inspection] job insert error:", insertError.message);
    else postedJob = inserted as { id: string };
  }

  return res.status(200).json({
    window_days: lookbackDays,
    inspection,
    streak: { friction_key: streakUpdate.frictionKey, value: streakUpdate.streak },
    posting_enabled: postEnabled,
    posted_job: postedJob,
  });
}
