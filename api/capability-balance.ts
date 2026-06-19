/**
 * Capability balance scoreboard.
 *
 * Routes:
 *   GET  /api/capability-balance?action=summary
 *   POST /api/capability-balance?action=log_event
 */

import type { VercelRequest, VercelResponse } from "@vercel/node";
import crypto from "crypto";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import {
  normalizeCapabilityKey,
  summarizeCapabilityBalance,
  type CapabilityBalanceEventInput,
  type CapabilitySignalKind,
} from "../src/lib/capabilityBalance.js";

type Db = SupabaseClient;

interface SessionUser {
  id: string;
  email: string | null;
  apiKeyHash: string | null;
  authKind: "session" | "api_key";
}

interface CapabilityUsageEventRow {
  capability_key?: string | null;
  source?: string | null;
  event_kind?: string | null;
  event_count?: number | string | null;
  success?: boolean | null;
  cost_usd?: number | string | null;
  response_ms?: number | string | null;
  created_at?: string | null;
}

interface MeteringRow {
  platform?: string | null;
  operation?: string | null;
  success?: boolean | null;
  response_ms?: number | string | null;
  created_at?: string | null;
}

interface ConnectionTestRow {
  platform?: string | null;
  success?: boolean | null;
  response_ms?: number | string | null;
  created_at?: string | null;
}

interface AutopilotEventRow {
  event_type?: string | null;
  actor_agent_id?: string | null;
  payload?: unknown;
  created_at?: string | null;
}

interface CrewRunRow {
  status?: string | null;
  created_at?: string | null;
  started_at?: string | null;
  completed_at?: string | null;
}

interface TestPassRunRow {
  status?: string | null;
  cost_usd?: number | string | null;
  tokens_used?: number | string | null;
  started_at?: string | null;
}

interface UxPassRunRow {
  status?: string | null;
  cost_usd?: number | string | null;
  tokens_used?: number | string | null;
  started_at?: string | null;
}

interface SeatsUsageRow {
  provider_slug?: string | null;
  request_count?: number | string | null;
  estimated_cost_usd?: number | string | null;
  created_at?: string | null;
}

interface TodoRow {
  title?: string | null;
  description?: string | null;
  status?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
}

interface NativeAnalyticsRow {
  event?: string | null;
  path?: string | null;
  properties?: unknown;
  created_at?: string | null;
}

interface ConversationLogRow {
  created_at?: string | null;
}

const EVENT_KINDS = new Set<CapabilitySignalKind>(["actual", "expected", "missed", "failure", "cost", "source_gap"]);

function bearerFrom(req: VercelRequest): string {
  return (req.headers.authorization ?? "").replace(/^Bearer\s+/i, "").trim();
}

function sha256hex(input: string): string {
  return crypto.createHash("sha256").update(input).digest("hex");
}

async function resolveApiKeyUser(token: string, supabaseUrl: string, serviceRoleKey: string): Promise<SessionUser | null> {
  const apiKeyHash = sha256hex(token);
  const response = await fetch(
    `${supabaseUrl}/rest/v1/api_keys?key_hash=eq.${encodeURIComponent(apiKeyHash)}&is_active=eq.true&select=user_id,key_hash&limit=1`,
    { headers: { apikey: serviceRoleKey, Authorization: `Bearer ${serviceRoleKey}` } },
  );
  if (!response.ok) return null;
  const rows = await response.json() as Array<{ user_id?: string | null; key_hash?: string | null }>;
  const row = rows[0];
  if (!row?.user_id) return null;
  return {
    id: row.user_id,
    email: null,
    apiKeyHash: row.key_hash ?? apiKeyHash,
    authKind: "api_key",
  };
}

async function resolveSessionUser(token: string, supabaseUrl: string, serviceRoleKey: string): Promise<SessionUser | null> {
  if (!token) return null;
  if (token.startsWith("uc_") || token.startsWith("agt_")) {
    return resolveApiKeyUser(token, supabaseUrl, serviceRoleKey);
  }
  try {
    const scoped = createClient(supabaseUrl, serviceRoleKey, {
      auth: { persistSession: false, autoRefreshToken: false },
      global: { headers: { Authorization: `Bearer ${token}` } },
    });
    const { data, error } = await scoped.auth.getUser(token);
    if (error || !data?.user) return null;
    return { id: data.user.id, email: data.user.email ?? null, apiKeyHash: null, authKind: "session" };
  } catch {
    return null;
  }
}

function isAdminEmail(email: string | null): boolean {
  if (!email) return false;
  return (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((value) => value.trim().toLowerCase())
    .filter(Boolean)
    .includes(email.toLowerCase());
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

function numberValue(value: unknown, fallback = 0): number {
  const numeric = typeof value === "number" ? value : Number(value);
  return Number.isFinite(numeric) && numeric >= 0 ? numeric : fallback;
}

function boolValue(value: unknown): boolean | null {
  return typeof value === "boolean" ? value : null;
}

function errorMessage(value: unknown): string {
  if (value instanceof Error) return value.message;
  if (value && typeof value === "object" && "message" in value) {
    const message = (value as { message?: unknown }).message;
    if (typeof message === "string" && message.trim()) return message;
  }
  return "query failed";
}

function currentDefaultPeriod(now = new Date()) {
  const end = now.toISOString();
  const start = new Date(now.getTime() - 30 * 86_400_000).toISOString();
  return { periodStart: start, periodEnd: end };
}

function periodFromQuery(req: VercelRequest) {
  const defaults = currentDefaultPeriod();
  const rawFrom = Array.isArray(req.query.from) ? req.query.from[0] : req.query.from;
  const rawTo = Array.isArray(req.query.to) ? req.query.to[0] : req.query.to;
  const fromDate = rawFrom ? new Date(String(rawFrom)) : null;
  const toDate = rawTo ? new Date(String(rawTo)) : null;
  const periodStart = fromDate && Number.isFinite(fromDate.getTime()) ? fromDate.toISOString() : defaults.periodStart;
  const periodEnd = toDate && Number.isFinite(toDate.getTime()) ? toDate.toISOString() : defaults.periodEnd;
  return { periodStart, periodEnd };
}

async function safeQuery<T>(
  label: string,
  sourceGaps: string[],
  run: () => unknown,
): Promise<T[]> {
  try {
    const { data, error } = await run() as { data?: unknown; error?: unknown };
    if (error) {
      sourceGaps.push(`${label}: ${errorMessage(error)}`);
      return [];
    }
    return Array.isArray(data) ? data as T[] : [];
  } catch (err) {
    sourceGaps.push(`${label}: ${err instanceof Error ? err.message : "query failed"}`);
    return [];
  }
}

function event(input: CapabilityBalanceEventInput): CapabilityBalanceEventInput {
  return input;
}

async function readCapabilityEvents(
  db: Db,
  periodStart: string,
  periodEnd: string,
  sourceGaps: string[],
): Promise<CapabilityBalanceEventInput[]> {
  const rows = await safeQuery<CapabilityUsageEventRow>("capability_usage_events", sourceGaps, () =>
    db
      .from("capability_usage_events")
      .select("capability_key, source, event_kind, event_count, success, cost_usd, response_ms, created_at")
      .gte("created_at", periodStart)
      .lt("created_at", periodEnd)
      .order("created_at", { ascending: true })
      .limit(5000),
  );

  return rows.map((row) => {
    const kind = EVENT_KINDS.has(row.event_kind as CapabilitySignalKind)
      ? row.event_kind as CapabilitySignalKind
      : "actual";
    return event({
      capability: row.capability_key ?? "",
      source: row.source ?? "capability_usage_events",
      kind,
      count: numberValue(row.event_count, 1),
      success: row.success ?? null,
      costUsd: row.cost_usd ?? null,
      responseMs: row.response_ms ?? null,
      createdAt: row.created_at ?? null,
    });
  });
}

async function readMeteringEvents(
  db: Db,
  periodStart: string,
  periodEnd: string,
  sourceGaps: string[],
): Promise<CapabilityBalanceEventInput[]> {
  const rows = await safeQuery<MeteringRow>("metering_events", sourceGaps, () =>
    db
      .from("metering_events")
      .select("platform, operation, success, response_ms, created_at")
      .gte("created_at", periodStart)
      .lt("created_at", periodEnd)
      .order("created_at", { ascending: true })
      .limit(5000),
  );

  const events: CapabilityBalanceEventInput[] = [];
  for (const row of rows) {
    const platform = normalizeCapabilityKey(row.platform ?? "unknown");
    const kind: CapabilitySignalKind = row.success === false ? "failure" : "actual";
    events.push(
      event({ capability: "connectors", source: "metering_events", kind, success: row.success ?? null, responseMs: row.response_ms, createdAt: row.created_at }),
      event({ capability: "keychain", source: "metering_events", kind, success: row.success ?? null, responseMs: row.response_ms, createdAt: row.created_at }),
    );
    if (platform) {
      events.push(event({
        capability: `connector:${platform}`,
        source: "metering_events",
        kind,
        success: row.success ?? null,
        responseMs: row.response_ms,
        createdAt: row.created_at,
      }));
    }
  }
  return events;
}

async function readConnectionTests(
  db: Db,
  periodStart: string,
  periodEnd: string,
  sourceGaps: string[],
): Promise<CapabilityBalanceEventInput[]> {
  const rows = await safeQuery<ConnectionTestRow>("connection_tests", sourceGaps, () =>
    db
      .from("connection_tests")
      .select("platform, success, response_ms, created_at")
      .gte("created_at", periodStart)
      .lt("created_at", periodEnd)
      .order("created_at", { ascending: true })
      .limit(5000),
  );

  const events: CapabilityBalanceEventInput[] = [];
  for (const row of rows) {
    const platform = normalizeCapabilityKey(row.platform ?? "unknown");
    const kind: CapabilitySignalKind = row.success === false ? "failure" : "actual";
    events.push(
      event({ capability: "keychain", source: "connection_tests", kind, success: row.success ?? null, responseMs: row.response_ms, createdAt: row.created_at }),
      event({ capability: "connectors", source: "connection_tests", kind, success: row.success ?? null, responseMs: row.response_ms, createdAt: row.created_at }),
    );
    if (platform) {
      events.push(event({
        capability: `connector:${platform}`,
        source: "connection_tests",
        kind,
        success: row.success ?? null,
        responseMs: row.response_ms,
        createdAt: row.created_at,
      }));
    }
  }
  return events;
}

async function readAutopilotEvents(
  db: Db,
  periodStart: string,
  periodEnd: string,
  sourceGaps: string[],
): Promise<CapabilityBalanceEventInput[]> {
  const rows = await safeQuery<AutopilotEventRow>("mc_autopilot_events", sourceGaps, () =>
    db
      .from("mc_autopilot_events")
      .select("event_type, actor_agent_id, payload, created_at")
      .gte("created_at", periodStart)
      .lt("created_at", periodEnd)
      .order("created_at", { ascending: true })
      .limit(5000),
  );

  const events: CapabilityBalanceEventInput[] = [];
  for (const row of rows) {
    const eventType = row.event_type ?? "";
    const actor = row.actor_agent_id ?? "";
    const payloadText = JSON.stringify(row.payload ?? {}).toLowerCase();
    events.push(event({ capability: "autopilot", source: "mc_autopilot_events", kind: "actual", createdAt: row.created_at }));
    if (/worker|agent|seat/i.test(actor)) {
      events.push(event({ capability: "workers", source: "mc_autopilot_events", kind: "actual", createdAt: row.created_at }));
    }
    if (/todo|claim|dispatch|ack/.test(eventType)) {
      events.push(event({ capability: "boardroom", source: "mc_autopilot_events", kind: "actual", createdAt: row.created_at }));
    }
    if (payloadText.includes("xpass") || payloadText.includes("uxpass") || payloadText.includes("testpass")) {
      events.push(event({ capability: "xpass", source: "mc_autopilot_events", kind: "actual", createdAt: row.created_at }));
    }
    if (payloadText.includes("xgate") || eventType.includes("lane_")) {
      events.push(event({ capability: "xgate", source: "mc_autopilot_events", kind: "actual", createdAt: row.created_at }));
    }
  }
  return events;
}

async function readCrewRuns(
  db: Db,
  periodStart: string,
  periodEnd: string,
  sourceGaps: string[],
): Promise<CapabilityBalanceEventInput[]> {
  const rows = await safeQuery<CrewRunRow>("mc_crew_runs", sourceGaps, () =>
    db
      .from("mc_crew_runs")
      .select("status, created_at, started_at, completed_at")
      .gte("created_at", periodStart)
      .lt("created_at", periodEnd)
      .order("created_at", { ascending: true })
      .limit(1000),
  );

  return rows.map((row) => event({
    capability: "crews",
    source: "mc_crew_runs",
    kind: row.status === "failed" ? "failure" : "actual",
    success: row.status === "complete" ? true : row.status === "failed" ? false : null,
    createdAt: row.completed_at ?? row.started_at ?? row.created_at ?? null,
  }));
}

async function readPassRuns(
  db: Db,
  periodStart: string,
  periodEnd: string,
  sourceGaps: string[],
): Promise<CapabilityBalanceEventInput[]> {
  const testRows = await safeQuery<TestPassRunRow>("testpass_runs", sourceGaps, () =>
    db
      .from("testpass_runs")
      .select("status, cost_usd, tokens_used, started_at")
      .gte("started_at", periodStart)
      .lt("started_at", periodEnd)
      .order("started_at", { ascending: true })
      .limit(1000),
  );
  const uxRows = await safeQuery<UxPassRunRow>("uxpass_runs", sourceGaps, () =>
    db
      .from("uxpass_runs")
      .select("status, cost_usd, tokens_used, started_at")
      .gte("started_at", periodStart)
      .lt("started_at", periodEnd)
      .order("started_at", { ascending: true })
      .limit(1000),
  );

  const events: CapabilityBalanceEventInput[] = [];
  for (const row of testRows) {
    const kind: CapabilitySignalKind = row.status === "failed" || row.status === "budget_exceeded" ? "failure" : "actual";
    events.push(
      event({ capability: "testpass", source: "testpass_runs", kind, success: row.status === "complete" ? true : row.status === "failed" ? false : null, costUsd: row.cost_usd, createdAt: row.started_at }),
      event({ capability: "xpass", source: "testpass_runs", kind, success: row.status === "complete" ? true : row.status === "failed" ? false : null, costUsd: row.cost_usd, createdAt: row.started_at }),
    );
  }
  for (const row of uxRows) {
    const kind: CapabilitySignalKind = row.status === "failed" || row.status === "budget_exceeded" ? "failure" : "actual";
    events.push(
      event({ capability: "uxpass", source: "uxpass_runs", kind, success: row.status === "complete" ? true : row.status === "failed" ? false : null, costUsd: row.cost_usd, createdAt: row.started_at }),
      event({ capability: "xpass", source: "uxpass_runs", kind, success: row.status === "complete" ? true : row.status === "failed" ? false : null, costUsd: row.cost_usd, createdAt: row.started_at }),
    );
  }
  return events;
}

async function readSeatsUsage(
  db: Db,
  periodStart: string,
  periodEnd: string,
  sourceGaps: string[],
): Promise<CapabilityBalanceEventInput[]> {
  const rows = await safeQuery<SeatsUsageRow>("seats_api_usage_events", sourceGaps, () =>
    db
      .from("seats_api_usage_events")
      .select("provider_slug, request_count, estimated_cost_usd, created_at")
      .gte("created_at", periodStart)
      .lt("created_at", periodEnd)
      .order("created_at", { ascending: true })
      .limit(5000),
  );

  return rows.map((row) => event({
    capability: "seats-api",
    source: "seats_api_usage_events",
    kind: "actual",
    count: numberValue(row.request_count, 1),
    costUsd: row.estimated_cost_usd,
    createdAt: row.created_at,
  }));
}

async function readBoardroomExpectedUses(
  db: Db,
  periodStart: string,
  periodEnd: string,
  sourceGaps: string[],
): Promise<CapabilityBalanceEventInput[]> {
  const rows = await safeQuery<TodoRow>("mc_fishbowl_todos", sourceGaps, () =>
    db
      .from("mc_fishbowl_todos")
      .select("title, description, status, created_at, updated_at")
      .gte("created_at", periodStart)
      .lt("created_at", periodEnd)
      .order("created_at", { ascending: true })
      .limit(1000),
  );

  const events: CapabilityBalanceEventInput[] = [];
  for (const row of rows) {
    const text = `${row.title ?? ""}\n${row.description ?? ""}`.toLowerCase();
    const createdAt = row.updated_at ?? row.created_at ?? null;
    events.push(event({ capability: "boardroom", source: "mc_fishbowl_todos", kind: "actual", createdAt }));
    addExpectedFromText(events, text, createdAt);
  }
  return events;
}

function addExpectedFromText(events: CapabilityBalanceEventInput[], text: string, createdAt: string | null): void {
  const pairs: Array<[RegExp, string]> = [
    [/(copyroom|copy room|copy machine|exact-copy|exact copy|source fidelity|fidelity drift)/i, "copyroom"],
    [/(copypass|copy pass)/i, "copypass"],
    [/(fidelitypass|fidelity pass|fidelitycopy)/i, "fidelitypass"],
    [/(uxpass|ui review|ux review|visual audit|screenshot|accessibility|a11y)/i, "uxpass"],
    [/(testpass|test pass|smoke test|qa sweep|regression)/i, "testpass"],
    [/(xpass|pass verdict|proof gate)/i, "xpass"],
    [/(xgate|scopegate|shipgate|commandgate|spendgate)/i, "xgate"],
    [/(keychain|passport|api key|oauth|connector|connection|nango)/i, "keychain"],
    [/(worker|seat|agent lane|heartbeat)/i, "workers"],
  ];

  for (const [pattern, capability] of pairs) {
    if (pattern.test(text)) {
      events.push(event({ capability, source: "boardroom_expected_use", kind: "expected", createdAt }));
    }
  }
  if (/(copyroom_missing|fidelity_drift_risk|should have used|missed use|missing receipt)/i.test(text)) {
    events.push(event({ capability: "copyroom", source: "boardroom_expected_use", kind: "missed", createdAt }));
  }
}

async function readNativeAnalytics(
  db: Db,
  periodStart: string,
  periodEnd: string,
  sourceGaps: string[],
): Promise<CapabilityBalanceEventInput[]> {
  const rows = await safeQuery<NativeAnalyticsRow>("native_analytics_events", sourceGaps, () =>
    db
      .from("native_analytics_events")
      .select("event, path, properties, created_at")
      .gte("created_at", periodStart)
      .lt("created_at", periodEnd)
      .order("created_at", { ascending: true })
      .limit(5000),
  );

  const events: CapabilityBalanceEventInput[] = [];
  for (const row of rows) {
    events.push(event({ capability: "analytics", source: "native_analytics_events", kind: "actual", createdAt: row.created_at }));
    const path = row.path ?? "";
    for (const capability of capabilitiesFromPath(path)) {
      events.push(event({ capability, source: "native_analytics_events", kind: "actual", createdAt: row.created_at }));
    }
  }
  return events;
}

async function readConversationLog(
  db: Db,
  periodStart: string,
  periodEnd: string,
  sourceGaps: string[],
): Promise<CapabilityBalanceEventInput[]> {
  const rows = await safeQuery<ConversationLogRow>("mc_conversation_log", sourceGaps, () =>
    db
      .from("mc_conversation_log")
      .select("created_at")
      .gte("created_at", periodStart)
      .lt("created_at", periodEnd)
      .order("created_at", { ascending: true })
      .limit(5000),
  );

  return rows.map((row) => event({
    capability: "orchestrator",
    source: "mc_conversation_log",
    kind: "actual",
    createdAt: row.created_at ?? null,
  }));
}

function capabilitiesFromPath(path: string): string[] {
  const lower = path.toLowerCase();
  const capabilities = new Set<string>();
  if (lower.includes("analytics")) capabilities.add("analytics");
  if (lower.includes("copypass") || lower.includes("copyroom")) capabilities.add("copyroom");
  if (lower.includes("testpass")) capabilities.add("testpass");
  if (lower.includes("uxpass") || lower.includes("uipass")) capabilities.add("uxpass");
  if (lower.includes("xpass") || lower.includes("/checks")) capabilities.add("xpass");
  if (lower.includes("xgate")) capabilities.add("xgate");
  if (lower.includes("keychain") || lower.includes("apps")) capabilities.add("keychain");
  if (lower.includes("agents") || lower.includes("workers")) capabilities.add("workers");
  if (lower.includes("autopilot")) capabilities.add("autopilot");
  if (lower.includes("boardroom") || lower.includes("jobs")) capabilities.add("boardroom");
  if (lower.includes("crews")) capabilities.add("crews");
  return [...capabilities];
}

async function summaryAction(db: Db, req: VercelRequest, res: VercelResponse) {
  if (req.method !== "GET") return res.status(405).json({ error: "GET required" });
  const { periodStart, periodEnd } = periodFromQuery(req);
  if (new Date(periodEnd).getTime() <= new Date(periodStart).getTime()) {
    return res.status(400).json({ error: "Period end must be after period start" });
  }

  const sourceGaps: string[] = [];
  const batches = await Promise.all([
    readCapabilityEvents(db, periodStart, periodEnd, sourceGaps),
    readMeteringEvents(db, periodStart, periodEnd, sourceGaps),
    readConnectionTests(db, periodStart, periodEnd, sourceGaps),
    readAutopilotEvents(db, periodStart, periodEnd, sourceGaps),
    readCrewRuns(db, periodStart, periodEnd, sourceGaps),
    readPassRuns(db, periodStart, periodEnd, sourceGaps),
    readSeatsUsage(db, periodStart, periodEnd, sourceGaps),
    readBoardroomExpectedUses(db, periodStart, periodEnd, sourceGaps),
    readNativeAnalytics(db, periodStart, periodEnd, sourceGaps),
    readConversationLog(db, periodStart, periodEnd, sourceGaps),
  ]);

  return res.status(200).json({
    summary: summarizeCapabilityBalance({
      periodStart,
      periodEnd,
      events: batches.flat(),
      sourceGaps: [...new Set(sourceGaps)].sort(),
    }),
  });
}

async function logEventAction(
  db: Db,
  req: VercelRequest,
  res: VercelResponse,
  user: SessionUser,
) {
  if (req.method !== "POST") return res.status(405).json({ error: "POST required" });
  const body = bodyObject(req.body);
  const capability = normalizeCapabilityKey(stringValue(body.capability ?? body.capability_key));
  const source = stringValue(body.source) || "manual";
  const eventKind = stringValue(body.kind ?? body.event_kind) as CapabilitySignalKind;
  const kind = EVENT_KINDS.has(eventKind) ? eventKind : "actual";
  if (!capability) return res.status(400).json({ error: "capability is required" });

  let apiKeyHash = user.apiKeyHash;
  if (!apiKeyHash) {
    const { data: keyRow } = await db
      .from("api_keys")
      .select("key_hash")
      .eq("user_id", user.id)
      .maybeSingle();
    apiKeyHash = (keyRow as { key_hash?: string } | null)?.key_hash ?? null;
  }

  const { data, error } = await db
    .from("capability_usage_events")
    .insert({
      user_id: user.id,
      api_key_hash: apiKeyHash,
      capability_key: capability,
      source,
      event_kind: kind,
      event_count: Math.max(1, Math.round(numberValue(body.count ?? body.event_count, 1))),
      success: boolValue(body.success),
      cost_usd: numberValue(body.cost_usd ?? body.costUsd),
      response_ms: body.response_ms === undefined && body.responseMs === undefined
        ? null
        : Math.round(numberValue(body.response_ms ?? body.responseMs)),
      ref_kind: stringValue(body.ref_kind ?? body.refKind) || null,
      ref_id: stringValue(body.ref_id ?? body.refId) || null,
      metadata: body.metadata && typeof body.metadata === "object" && !Array.isArray(body.metadata)
        ? body.metadata
        : {},
    })
    .select("id, capability_key, source, event_kind, event_count, success, cost_usd, response_ms, created_at")
    .single();
  if (error) throw error;

  return res.status(200).json({ event: data });
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

  const user = await resolveSessionUser(bearerFrom(req), supabaseUrl, serviceRoleKey);
  if (!user) return res.status(401).json({ error: "Unauthorized" });

  const db = createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  const action = String(req.query.action ?? "");

  try {
    if (action === "summary") {
      if (!isAdminEmail(user.email)) return res.status(403).json({ error: "Admin access required" });
      return await summaryAction(db, req, res);
    }
    if (action === "log_event") return await logEventAction(db, req, res, user);
    return res.status(400).json({ error: `Unknown action: ${action}` });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Internal error";
    console.error(`Capability balance error (${action}):`, message);
    return res.status(500).json({ error: message });
  }
}
