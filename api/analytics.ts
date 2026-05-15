import type { VercelRequest, VercelResponse } from "@vercel/node";

type Primitive = string | number | boolean | null;
type RawProperties = Record<string, unknown>;

const ANALYTICS_TABLE = "native_analytics_events";
const MAX_EVENT_LENGTH = 80;
const MAX_STRING_LENGTH = 500;
const MAX_PROPERTY_COUNT = 25;
const EVENT_NAME_PATTERN = /^[a-zA-Z0-9_$][a-zA-Z0-9_.$:/-]{0,79}$/;
const SENSITIVE_PROPERTY_PATTERN = /(api[_-]?key|authorization|cookie|password|secret|token)/i;

export interface NativeAnalyticsRow {
  event: string;
  path: string | null;
  title: string | null;
  properties: Record<string, Primitive>;
  anonymous_id: string | null;
  referrer: string | null;
  user_agent: string | null;
  source: "browser";
}

export interface NativeAnalyticsBuildResult {
  ok: boolean;
  status: number;
  row?: NativeAnalyticsRow;
  error?: string;
}

function parseBody(input: unknown): RawProperties {
  if (typeof input === "string") {
    try {
      const parsed = JSON.parse(input);
      return parsed && typeof parsed === "object" && !Array.isArray(parsed) ? (parsed as RawProperties) : {};
    } catch {
      return {};
    }
  }

  return input && typeof input === "object" && !Array.isArray(input) ? (input as RawProperties) : {};
}

function readHeader(req: Pick<VercelRequest, "headers">, name: string): string | null {
  const value = req.headers[name.toLowerCase()] ?? req.headers[name];
  if (Array.isArray(value)) return value[0] ?? null;
  return typeof value === "string" ? value : null;
}

function textField(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  if (!trimmed) return null;
  return trimmed.slice(0, MAX_STRING_LENGTH);
}

function isPrimitive(value: unknown): value is Primitive {
  return value === null || typeof value === "string" || typeof value === "number" || typeof value === "boolean";
}

function sanitizeProperties(value: unknown): Record<string, Primitive> {
  if (!value || typeof value !== "object" || Array.isArray(value)) return {};

  const clean: Record<string, Primitive> = {};
  for (const [rawKey, rawValue] of Object.entries(value as RawProperties)) {
    const key = rawKey.trim().slice(0, MAX_EVENT_LENGTH);
    if (!key || SENSITIVE_PROPERTY_PATTERN.test(key)) continue;
    if (!isPrimitive(rawValue)) continue;

    clean[key] = typeof rawValue === "string" ? rawValue.slice(0, MAX_STRING_LENGTH) : rawValue;
    if (Object.keys(clean).length >= MAX_PROPERTY_COUNT) break;
  }

  return clean;
}

export function buildNativeAnalyticsRow(req: Pick<VercelRequest, "body" | "headers">): NativeAnalyticsBuildResult {
  const body = parseBody(req.body);
  const event = textField(body.event);

  if (!event || event.length > MAX_EVENT_LENGTH || !EVENT_NAME_PATTERN.test(event)) {
    return {
      ok: false,
      status: 400,
      error: "event is required and must use analytics-safe characters.",
    };
  }

  return {
    ok: true,
    status: 202,
    row: {
      event,
      path: textField(body.path),
      title: textField(body.title),
      properties: sanitizeProperties(body.properties),
      anonymous_id: textField(body.anonymous_id ?? body.anonymousId),
      referrer: textField(body.referrer),
      user_agent: textField(body.user_agent ?? body.userAgent) ?? textField(readHeader(req, "user-agent")),
      source: "browser",
    },
  };
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Access-Control-Allow-Origin", "https://unclick.world");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed." });

  const result = buildNativeAnalyticsRow(req);
  if (!result.ok || !result.row) {
    return res.status(result.status).json({ error: result.error ?? "Invalid analytics event." });
  }

  const supabaseUrl = process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    return res.status(202).json({
      accepted: true,
      persisted: false,
      reason: "storage_not_configured",
    });
  }

  const response = await fetch(`${supabaseUrl}/rest/v1/${ANALYTICS_TABLE}`, {
    method: "POST",
    headers: {
      apikey: serviceRoleKey,
      Authorization: `Bearer ${serviceRoleKey}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify(result.row),
  });

  if (!response.ok) {
    const errorText = await response.text().catch(() => "");
    console.error("native analytics insert failed", response.status, errorText);
    return res.status(202).json({
      accepted: true,
      persisted: false,
      reason: "storage_error",
      status: response.status,
    });
  }

  return res.status(201).json({
    accepted: true,
    persisted: true,
  });
}
