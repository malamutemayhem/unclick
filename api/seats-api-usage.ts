/**
 * Seats API usage and budget tracking.
 *
 * Routes:
 *   GET  /api/seats-api-usage?action=summary
 *   POST /api/seats-api-usage?action=log_usage
 *   POST /api/seats-api-usage?action=set_budget
 *   POST /api/seats-api-usage?action=delete_budget
 *   POST /api/seats-api-usage?action=check_budget
 */

import type { VercelRequest, VercelResponse } from "@vercel/node";
import { createClient } from "@supabase/supabase-js";
import {
  SEATS_API_PRICING,
  budgetDecision,
  estimateSeatsApiCostUsd,
  normalizeSeatsApiBudgetCap,
  normalizeSeatsApiProvider,
  normalizeSeatsApiUsageRow,
  summarizeSeatsApiUsage,
  type SeatsApiBudgetCap,
  type SeatsApiUsageInput,
} from "../src/lib/seatsApiUsage";

type Db = ReturnType<typeof createClient>;

interface SessionUser {
  id: string;
  email: string | null;
}

interface UsageEventRow {
  id?: string;
  provider_slug?: string | null;
  model?: string | null;
  task_type?: string | null;
  input_tokens?: number | string | null;
  output_tokens?: number | string | null;
  cached_input_tokens?: number | string | null;
  request_count?: number | string | null;
  estimated_cost_usd?: number | string | null;
  created_at?: string | null;
}

interface BudgetCapRow {
  id?: string;
  provider_slug?: string | null;
  monthly_budget_usd?: number | string | null;
  warn_at_percent?: number | string | null;
  throttle_at_percent?: number | string | null;
  updated_at?: string | null;
}

function bearerFrom(req: VercelRequest): string {
  return (req.headers.authorization ?? "").replace(/^Bearer\s+/i, "").trim();
}

async function resolveSessionUser(
  token: string,
  supabaseUrl: string,
  serviceRoleKey: string,
): Promise<SessionUser | null> {
  if (!token) return null;
  if (token.startsWith("uc_") || token.startsWith("agt_")) return null;
  try {
    const scoped = createClient(supabaseUrl, serviceRoleKey, {
      auth: { persistSession: false, autoRefreshToken: false },
      global: { headers: { Authorization: `Bearer ${token}` } },
    });
    const { data, error } = await scoped.auth.getUser(token);
    if (error || !data?.user) return null;
    return { id: data.user.id, email: data.user.email ?? null };
  } catch {
    return null;
  }
}

function bodyObject(body: unknown): Record<string, unknown> {
  if (typeof body === "string") {
    try {
      const parsed = JSON.parse(body) as unknown;
      return parsed && typeof parsed === "object" && !Array.isArray(parsed)
        ? parsed as Record<string, unknown>
        : {};
    } catch {
      return {};
    }
  }
  return body && typeof body === "object" && !Array.isArray(body)
    ? body as Record<string, unknown>
    : {};
}

function stringValue(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function numericValue(value: unknown, fallback = 0): number {
  const numeric = typeof value === "number" ? value : Number(value);
  return Number.isFinite(numeric) && numeric >= 0 ? numeric : fallback;
}

function optionalNumericValue(value: unknown): number | null {
  if (value === null || value === undefined || value === "") return null;
  const numeric = typeof value === "number" ? value : Number(value);
  return Number.isFinite(numeric) && numeric >= 0 ? numeric : null;
}

function currentMonthPeriod(now = new Date()) {
  const periodStart = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1));
  const periodEnd = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() + 1, 1));
  return {
    periodStart: periodStart.toISOString(),
    periodEnd: periodEnd.toISOString(),
  };
}

function periodFromQuery(req: VercelRequest) {
  const defaults = currentMonthPeriod();
  const rawFrom = Array.isArray(req.query.from) ? req.query.from[0] : req.query.from;
  const rawTo = Array.isArray(req.query.to) ? req.query.to[0] : req.query.to;
  const fromDate = rawFrom ? new Date(String(rawFrom)) : null;
  const toDate = rawTo ? new Date(String(rawTo)) : null;
  const periodStart = fromDate && Number.isFinite(fromDate.getTime())
    ? fromDate.toISOString()
    : defaults.periodStart;
  const periodEnd = toDate && Number.isFinite(toDate.getTime())
    ? toDate.toISOString()
    : defaults.periodEnd;
  return { periodStart, periodEnd };
}

function toUsageInput(row: UsageEventRow): SeatsApiUsageInput {
  return {
    provider: String(row.provider_slug ?? ""),
    model: row.model ?? null,
    inputTokens: numericValue(row.input_tokens),
    outputTokens: numericValue(row.output_tokens),
    cachedInputTokens: numericValue(row.cached_input_tokens),
    requestCount: numericValue(row.request_count, 1),
    estimatedCostUsd: numericValue(row.estimated_cost_usd),
  };
}

function toBudgetCap(row: BudgetCapRow): SeatsApiBudgetCap {
  return normalizeSeatsApiBudgetCap({
    provider: String(row.provider_slug ?? ""),
    monthlyBudgetUsd: row.monthly_budget_usd ?? null,
    warnAtPercent: row.warn_at_percent ?? 80,
    throttleAtPercent: row.throttle_at_percent ?? 100,
  });
}

async function buildSummary(db: Db, userId: string, periodStart: string, periodEnd: string) {
  const { data: rows, error: usageError } = await db
    .from("seats_api_usage_events")
    .select("provider_slug, model, input_tokens, output_tokens, cached_input_tokens, request_count, estimated_cost_usd, created_at")
    .eq("user_id", userId)
    .gte("created_at", periodStart)
    .lt("created_at", periodEnd)
    .order("created_at", { ascending: true });
  if (usageError) throw usageError;

  const { data: budgetRows, error: budgetError } = await db
    .from("seats_api_budget_caps")
    .select("provider_slug, monthly_budget_usd, warn_at_percent, throttle_at_percent, updated_at")
    .eq("user_id", userId)
    .order("provider_slug", { ascending: true });
  if (budgetError) throw budgetError;

  const budgets = ((budgetRows ?? []) as BudgetCapRow[]).map(toBudgetCap);
  const summary = summarizeSeatsApiUsage({
    periodStart,
    periodEnd,
    rows: ((rows ?? []) as UsageEventRow[]).map(toUsageInput),
    budgets,
  });

  return { summary, budgets };
}

async function summaryAction(db: Db, req: VercelRequest, res: VercelResponse, userId: string) {
  if (req.method !== "GET") return res.status(405).json({ error: "GET required" });
  const { periodStart, periodEnd } = periodFromQuery(req);
  if (new Date(periodEnd).getTime() <= new Date(periodStart).getTime()) {
    return res.status(400).json({ error: "Period end must be after period start" });
  }

  const { summary } = await buildSummary(db, userId, periodStart, periodEnd);
  return res.status(200).json({ summary, pricing: SEATS_API_PRICING });
}

async function logUsageAction(db: Db, req: VercelRequest, res: VercelResponse, userId: string) {
  if (req.method !== "POST") return res.status(405).json({ error: "POST required" });
  const body = bodyObject(req.body);
  const provider = stringValue(body.provider ?? body.provider_slug);
  if (!provider) return res.status(400).json({ error: "provider is required" });

  const metadata = body.metadata && typeof body.metadata === "object" && !Array.isArray(body.metadata)
    ? body.metadata as Record<string, unknown>
    : {};
  const usage = normalizeSeatsApiUsageRow({
    provider,
    model: stringValue(body.model) || null,
    inputTokens: numericValue(body.input_tokens ?? body.inputTokens),
    outputTokens: numericValue(body.output_tokens ?? body.outputTokens),
    cachedInputTokens: numericValue(body.cached_input_tokens ?? body.cachedInputTokens),
    requestCount: numericValue(body.request_count ?? body.requestCount, 1),
    estimatedCostUsd: optionalNumericValue(body.estimated_cost_usd ?? body.estimatedCostUsd),
  });

  const { data, error } = await db
    .from("seats_api_usage_events")
    .insert({
      user_id: userId,
      provider_slug: usage.provider,
      model: usage.model,
      task_type: stringValue(body.task_type ?? body.taskType) || null,
      input_tokens: usage.inputTokens,
      output_tokens: usage.outputTokens,
      cached_input_tokens: usage.cachedInputTokens,
      request_count: usage.requestCount,
      estimated_cost_usd: usage.estimatedCostUsd,
      metadata,
    })
    .select("id, provider_slug, model, task_type, input_tokens, output_tokens, cached_input_tokens, request_count, estimated_cost_usd, created_at")
    .single();
  if (error) throw error;

  return res.status(200).json({ event: data, usage });
}

async function setBudgetAction(db: Db, req: VercelRequest, res: VercelResponse, userId: string) {
  if (req.method !== "POST") return res.status(405).json({ error: "POST required" });
  const body = bodyObject(req.body);
  const provider = stringValue(body.provider ?? body.provider_slug);
  if (!provider) return res.status(400).json({ error: "provider is required" });

  const budget = normalizeSeatsApiBudgetCap({
    provider,
    monthlyBudgetUsd: body.monthly_budget_usd ?? body.monthlyBudgetUsd ?? null,
    warnAtPercent: body.warn_at_percent ?? body.warnAtPercent ?? 80,
    throttleAtPercent: body.throttle_at_percent ?? body.throttleAtPercent ?? 100,
  });

  if (!budget.monthlyBudgetUsd || budget.monthlyBudgetUsd <= 0) {
    return res.status(400).json({ error: "monthly_budget_usd must be greater than 0" });
  }

  const { data, error } = await db
    .from("seats_api_budget_caps")
    .upsert({
      user_id: userId,
      provider_slug: budget.provider,
      monthly_budget_usd: budget.monthlyBudgetUsd,
      warn_at_percent: budget.warnAtPercent,
      throttle_at_percent: budget.throttleAtPercent,
      updated_at: new Date().toISOString(),
    }, { onConflict: "user_id,provider_slug" })
    .select("id, provider_slug, monthly_budget_usd, warn_at_percent, throttle_at_percent, updated_at")
    .single();
  if (error) throw error;

  return res.status(200).json({ budget: data });
}

async function deleteBudgetAction(db: Db, req: VercelRequest, res: VercelResponse, userId: string) {
  if (req.method !== "POST") return res.status(405).json({ error: "POST required" });
  const body = bodyObject(req.body);
  const provider = normalizeSeatsApiProvider(stringValue(body.provider ?? body.provider_slug));
  if (!provider) return res.status(400).json({ error: "provider is required" });

  const { error } = await db
    .from("seats_api_budget_caps")
    .delete()
    .eq("user_id", userId)
    .eq("provider_slug", provider);
  if (error) throw error;

  return res.status(200).json({ ok: true });
}

async function checkBudgetAction(db: Db, req: VercelRequest, res: VercelResponse, userId: string) {
  if (req.method !== "POST") return res.status(405).json({ error: "POST required" });
  const body = bodyObject(req.body);
  const provider = normalizeSeatsApiProvider(stringValue(body.provider ?? body.provider_slug));
  if (!provider) return res.status(400).json({ error: "provider is required" });

  const period = currentMonthPeriod();
  const { summary, budgets } = await buildSummary(db, userId, period.periodStart, period.periodEnd);
  const providerSummary = summary.providers.find((row) => row.provider === provider);
  const budget = budgets.find((row) => row.provider === provider) ?? null;
  const projectedCostUsd = optionalNumericValue(body.projected_cost_usd ?? body.projectedCostUsd)
    ?? estimateSeatsApiCostUsd({
      provider,
      model: stringValue(body.model) || null,
      inputTokens: numericValue(body.input_tokens ?? body.inputTokens),
      outputTokens: numericValue(body.output_tokens ?? body.outputTokens),
      cachedInputTokens: numericValue(body.cached_input_tokens ?? body.cachedInputTokens),
    });

  return res.status(200).json({
    provider,
    currentCostUsd: providerSummary?.estimatedCostUsd ?? 0,
    projectedCostUsd,
    decision: budgetDecision(providerSummary?.estimatedCostUsd ?? 0, budget, projectedCostUsd),
    budget,
  });
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") return res.status(204).end();

  const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL || "";
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";
  if (!supabaseUrl || !serviceRoleKey) {
    return res.status(500).json({ error: "Database service unavailable" });
  }

  const caller = await resolveSessionUser(bearerFrom(req), supabaseUrl, serviceRoleKey);
  if (!caller) return res.status(401).json({ error: "Unauthorized" });

  const db = createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const action = String(req.query.action ?? "");

  try {
    if (action === "summary") return await summaryAction(db, req, res, caller.id);
    if (action === "log_usage") return await logUsageAction(db, req, res, caller.id);
    if (action === "set_budget") return await setBudgetAction(db, req, res, caller.id);
    if (action === "delete_budget") return await deleteBudgetAction(db, req, res, caller.id);
    if (action === "check_budget") return await checkBudgetAction(db, req, res, caller.id);
    return res.status(400).json({ error: `Unknown action: ${action}` });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Internal error";
    console.error(`Seats API usage error (${action}):`, message);
    return res.status(500).json({ error: message });
  }
}
