import { createHash } from "node:crypto";
import type { VercelRequest, VercelResponse } from "@vercel/node";
import { createClient } from "@supabase/supabase-js";
import { loadXGateRegistry } from "./lib/xgate/registry.js";

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST,OPTIONS",
  "Access-Control-Allow-Headers": "Authorization,Content-Type",
};

const ACTION_CLASSES = new Set([
  "filesystem",
  "git",
  "sql",
  "secret",
  "ship",
  "spend",
  "scope",
  "shell",
  "network",
  "send",
]);

const ENVIRONMENTS = new Set(["dev", "staging", "prod"]);
const AUTONOMY_LEVELS = new Set(["interactive", "unattended"]);

type GateVerdict = "allow" | "deny" | "ask" | "rewrite";
type LedgerAuthority = "auto" | "human" | "token" | "kill_switch";

interface XGateActionDescriptor {
  class: string;
  raw: string;
  tool: string;
  parsed?: unknown;
  targetEnv?: string;
  estimatedSpendUsd?: number;
  targetFiles?: string[];
}

interface XGateContext {
  action: XGateActionDescriptor;
  environment: string;
  autonomyLevel: string;
  ownedFiles?: string[];
  tainted?: boolean;
  now: number;
}

interface XGateDecision {
  verdict: GateVerdict;
  results?: unknown[];
  deciding?: unknown;
}

interface XGateRequestMetadata {
  agent_id: string | null;
  session_id: string | null;
  client: string | null;
  model: string | null;
  target: string | null;
  proof_ref: string | null;
  reversal: string | null;
}

interface ParsedXGateCheckBody {
  action: XGateActionDescriptor;
  context: XGateContext;
  metadata: XGateRequestMetadata;
  budget: unknown;
}

type ParseResult = { ok: true; value: ParsedXGateCheckBody } | { ok: false; error: string };

interface XGateCore {
  evaluateGates: (gates: unknown[], ctx: XGateContext) => XGateDecision;
  applyAutonomy: (decision: XGateDecision, ctx: XGateContext, budget: unknown) => unknown;
  applyKillSwitch: (decision: XGateDecision, state: unknown) => unknown;
  buildLedgerEntry: (
    ctx: XGateContext,
    decision: XGateDecision,
    authority: LedgerAuthority,
    opts: Record<string, unknown>,
  ) => Record<string, unknown>;
}

type XGateCoreLoad = { ok: true; core: XGateCore } | { ok: false; missing: Array<{ module: string; reason: string }> };

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function stringOrNull(value: unknown): string | null {
  return typeof value === "string" && value.trim() ? value.trim() : null;
}

function stringArrayOrUndefined(value: unknown): string[] | undefined {
  if (value === undefined) return undefined;
  if (!Array.isArray(value)) return undefined;
  const out = value.filter((item): item is string => typeof item === "string" && item.trim().length > 0);
  return out.length === value.length ? out : undefined;
}

function parseMaybeJsonBody(body: unknown): { ok: true; value: unknown } | { ok: false; error: string } {
  if (typeof body !== "string") return { ok: true, value: body };
  if (!body.trim()) return { ok: true, value: {} };
  try {
    return { ok: true, value: JSON.parse(body) };
  } catch {
    return { ok: false, error: "Invalid JSON body" };
  }
}

function normalizeSetValue(value: unknown, allowed: Set<string>): string | null {
  if (typeof value !== "string") return null;
  const normalized = value.trim().toLowerCase();
  return allowed.has(normalized) ? normalized : null;
}

export function parseXGateCheckBody(body: unknown, fallbackNow = Date.now()): ParseResult {
  const parsedBody = parseMaybeJsonBody(body);
  if (!parsedBody.ok) return parsedBody;
  if (!isRecord(parsedBody.value)) return { ok: false, error: "Body must be an object" };

  const rawAction = parsedBody.value.action;
  if (!isRecord(rawAction)) return { ok: false, error: "action is required" };

  const actionClass = normalizeSetValue(rawAction.class, ACTION_CLASSES);
  if (!actionClass) return { ok: false, error: "action.class is invalid" };
  if (typeof rawAction.raw !== "string") return { ok: false, error: "action.raw must be a string" };
  if (typeof rawAction.tool !== "string" || !rawAction.tool.trim()) {
    return { ok: false, error: "action.tool is required" };
  }

  const targetEnv =
    rawAction.targetEnv === undefined ? undefined : normalizeSetValue(rawAction.targetEnv, ENVIRONMENTS);
  if (rawAction.targetEnv !== undefined && !targetEnv) return { ok: false, error: "action.targetEnv is invalid" };

  const targetFiles = stringArrayOrUndefined(rawAction.targetFiles);
  if (rawAction.targetFiles !== undefined && !targetFiles) {
    return { ok: false, error: "action.targetFiles must be strings" };
  }

  const estimatedSpendUsd = rawAction.estimatedSpendUsd;
  if (
    estimatedSpendUsd !== undefined &&
    (typeof estimatedSpendUsd !== "number" || !Number.isFinite(estimatedSpendUsd))
  ) {
    return { ok: false, error: "action.estimatedSpendUsd must be a finite number" };
  }

  const contextInput = isRecord(parsedBody.value.context) ? parsedBody.value.context : {};
  const environment =
    normalizeSetValue(contextInput.environment, ENVIRONMENTS) ?? targetEnv ?? "dev";
  const autonomyLevel = normalizeSetValue(contextInput.autonomyLevel, AUTONOMY_LEVELS) ?? "interactive";
  const ownedFiles = stringArrayOrUndefined(contextInput.ownedFiles);
  if (contextInput.ownedFiles !== undefined && !ownedFiles) {
    return { ok: false, error: "context.ownedFiles must be strings" };
  }

  const action: XGateActionDescriptor = {
    class: actionClass,
    raw: rawAction.raw,
    tool: rawAction.tool.trim(),
  };
  if (rawAction.parsed !== undefined) action.parsed = rawAction.parsed;
  if (targetEnv) action.targetEnv = targetEnv;
  if (estimatedSpendUsd !== undefined) action.estimatedSpendUsd = estimatedSpendUsd;
  if (targetFiles) action.targetFiles = targetFiles;

  const now = typeof contextInput.now === "number" && Number.isFinite(contextInput.now) ? contextInput.now : fallbackNow;
  const context: XGateContext = {
    action,
    environment,
    autonomyLevel,
    now,
  };
  if (ownedFiles) context.ownedFiles = ownedFiles;
  if (typeof contextInput.tainted === "boolean") context.tainted = contextInput.tainted;

  const metadataInput = isRecord(parsedBody.value.metadata) ? parsedBody.value.metadata : {};
  const metadata: XGateRequestMetadata = {
    agent_id: stringOrNull(metadataInput.agent_id),
    session_id: stringOrNull(metadataInput.session_id),
    client: stringOrNull(metadataInput.client),
    model: stringOrNull(metadataInput.model),
    target: stringOrNull(metadataInput.target),
    proof_ref: stringOrNull(metadataInput.proof_ref),
    reversal: stringOrNull(metadataInput.reversal),
  };

  return {
    ok: true,
    value: {
      action,
      context,
      metadata,
      budget: parsedBody.value.budget ?? {},
    },
  };
}

function bearerFrom(req: VercelRequest): string | null {
  const header = req.headers.authorization;
  if (!header || typeof header !== "string") return null;
  const match = header.match(/^Bearer\s+(.+)$/i);
  return match ? match[1] : null;
}

export function sha256hex(value: string): string {
  return createHash("sha256").update(value).digest("hex");
}

function adminEmails(): string[] {
  return (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);
}

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

type AuthorityResult =
  | { ok: true; authority: LedgerAuthority; apiKeyHash: string; actor: string }
  | { ok: false; status: 401 | 403; error: string };

export async function resolveXGateAuthority(
  req: VercelRequest,
  supabaseUrl: string,
  serviceRoleKey: string,
): Promise<AuthorityResult> {
  const token = bearerFrom(req);
  if (!token) return { ok: false, status: 401, error: "Missing Bearer token" };

  if (process.env.CRON_SECRET && token === process.env.CRON_SECRET) {
    return { ok: true, authority: "token", apiKeyHash: sha256hex(token), actor: "cron" };
  }

  const adminEmail = await resolveAdminEmail(req, supabaseUrl, serviceRoleKey);
  if (!adminEmail) return { ok: false, status: 403, error: "Admin access required" };
  return { ok: true, authority: "human", apiKeyHash: sha256hex(token), actor: adminEmail };
}

async function optionalImport(
  moduleName: string,
  importer: () => Promise<Record<string, unknown>>,
): Promise<{ moduleName: string; mod?: Record<string, unknown>; reason?: string }> {
  try {
    return { moduleName, mod: await importer() };
  } catch (error) {
    return { moduleName, reason: error instanceof Error ? error.message : String(error) };
  }
}

function getFunction(mod: Record<string, unknown> | undefined, name: string): unknown {
  return mod ? mod[name] : undefined;
}

export async function loadXGateCore(): Promise<XGateCoreLoad> {
  const imports = await Promise.all([
    optionalImport("policy-engine", async () => {
      // TODO XGate Part 1 provides the frozen policy engine.
      const path = "./lib/xgate/policy-engine.js";
      return import(/* @vite-ignore */ path);
    }),
    optionalImport("autonomy", async () => {
      // TODO XGate Part 8 provides the autonomy engine.
      const path = "./lib/xgate/autonomy.js";
      return import(/* @vite-ignore */ path);
    }),
    optionalImport("kill-switch", async () => {
      // TODO XGate Part 8 provides the kill switch.
      const path = "./lib/xgate/kill-switch.js";
      return import(/* @vite-ignore */ path);
    }),
    optionalImport("ledger", async () => {
      // TODO XGate Part 1 provides the control ledger builder.
      const path = "./lib/xgate/ledger.js";
      return import(/* @vite-ignore */ path);
    }),
  ]);

  const missing: Array<{ module: string; reason: string }> = [];
  const byName = new Map(imports.map((entry) => [entry.moduleName, entry]));
  for (const entry of imports) {
    if (entry.reason) missing.push({ module: entry.moduleName, reason: entry.reason });
  }

  const evaluateGates = getFunction(byName.get("policy-engine")?.mod, "evaluateGates");
  const applyAutonomy = getFunction(byName.get("autonomy")?.mod, "applyAutonomy");
  const applyKillSwitch = getFunction(byName.get("kill-switch")?.mod, "applyKillSwitch");
  const buildLedgerEntry = getFunction(byName.get("ledger")?.mod, "buildLedgerEntry");

  for (const [module, fn] of [
    ["policy-engine.evaluateGates", evaluateGates],
    ["autonomy.applyAutonomy", applyAutonomy],
    ["kill-switch.applyKillSwitch", applyKillSwitch],
    ["ledger.buildLedgerEntry", buildLedgerEntry],
  ] as const) {
    if (typeof fn !== "function") missing.push({ module, reason: "Missing function export" });
  }

  if (missing.length) return { ok: false, missing };
  return {
    ok: true,
    core: {
      evaluateGates: evaluateGates as XGateCore["evaluateGates"],
      applyAutonomy: applyAutonomy as XGateCore["applyAutonomy"],
      applyKillSwitch: applyKillSwitch as XGateCore["applyKillSwitch"],
      buildLedgerEntry: buildLedgerEntry as XGateCore["buildLedgerEntry"],
    },
  };
}

function isDecision(value: unknown): value is XGateDecision {
  return isRecord(value) && typeof value.verdict === "string";
}

export function coerceDecisionOutcome(value: unknown, fallback: XGateDecision): { decision: XGateDecision; halt: boolean } {
  if (isRecord(value)) {
    if (isDecision(value.decision)) return { decision: value.decision, halt: Boolean(value.halt) };
    if (isDecision(value)) return { decision: value, halt: Boolean(value.halt) };
  }
  return { decision: fallback, halt: false };
}

function decidingRecord(decision: XGateDecision): Record<string, unknown> {
  return isRecord(decision.deciding) ? decision.deciding : {};
}

async function readKillSwitchState(db: ReturnType<typeof createClient>, apiKeyHash: string) {
  const { data, error } = await db
    .from("mc_xgate_killswitch")
    .select("api_key_hash,active,reason,updated_at")
    .eq("api_key_hash", apiKeyHash)
    .maybeSingle();

  if (error) {
    return { ok: false as const, error: error.message };
  }

  return {
    ok: true as const,
    state: data ?? {
      api_key_hash: apiKeyHash,
      active: false,
      reason: null,
      updated_at: null,
    },
  };
}

function setCors(res: VercelResponse) {
  for (const [key, value] of Object.entries(CORS_HEADERS)) res.setHeader(key, value);
}

function json(res: VercelResponse, status: number, body: unknown) {
  setCors(res);
  return res.status(status).json(body);
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  setCors(res);
  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "POST") return json(res, 405, { error: "POST required" });

  const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !serviceRoleKey) return json(res, 500, { error: "Database service unavailable" });

  const authority = await resolveXGateAuthority(req, supabaseUrl, serviceRoleKey);
  if (!authority.ok) return json(res, authority.status, { error: authority.error });

  const parsed = parseXGateCheckBody(req.body);
  if (!parsed.ok) return json(res, 400, { error: parsed.error });

  const coreLoad = await loadXGateCore();
  if (!coreLoad.ok) {
    return json(res, 503, {
      error: "XGate core dependencies are not ready",
      missing: coreLoad.missing,
    });
  }

  const registry = await loadXGateRegistry();
  if (registry.gates.length === 0) {
    return json(res, 503, {
      error: "XGate gate registry has no loaded gates",
      missing: registry.missing,
    });
  }

  const db = createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const killSwitch = await readKillSwitchState(db, authority.apiKeyHash);
  if (!killSwitch.ok) {
    return json(res, 503, { error: "XGate kill switch state unavailable", detail: killSwitch.error });
  }

  const policyDecision = coreLoad.core.evaluateGates(registry.gates, parsed.value.context);
  const autonomyOutcome = coerceDecisionOutcome(
    coreLoad.core.applyAutonomy(policyDecision, parsed.value.context, parsed.value.budget),
    policyDecision,
  );
  const killOutcome = coerceDecisionOutcome(
    coreLoad.core.applyKillSwitch(autonomyOutcome.decision, killSwitch.state),
    autonomyOutcome.decision,
  );
  const finalDecision = killOutcome.decision;
  const deciding = decidingRecord(finalDecision);
  const ledgerAuthority: LedgerAuthority = isRecord(killSwitch.state) && killSwitch.state.active ? "kill_switch" : authority.authority;
  const ledgerEntry = coreLoad.core.buildLedgerEntry(parsed.value.context, finalDecision, ledgerAuthority, {
    ...parsed.value.metadata,
    actor: authority.actor,
    target: parsed.value.metadata.target ?? parsed.value.action.targetEnv ?? parsed.value.context.environment,
  });

  const { error: ledgerError } = await db.from("mc_xgate_ledger").insert(ledgerEntry);
  if (ledgerError) return json(res, 503, { error: "XGate ledger unavailable", detail: ledgerError.message });

  return json(res, 200, {
    verdict: finalDecision.verdict,
    ruleId: typeof deciding.ruleId === "string" ? deciding.ruleId : null,
    gate: typeof deciding.gate === "string" ? deciding.gate : null,
    reason: typeof deciding.reason === "string" ? deciding.reason : null,
    authority: ledgerAuthority,
    halt: autonomyOutcome.halt || killOutcome.halt,
    gatesLoaded: registry.loaded,
    gatesMissing: registry.missing,
  });
}
