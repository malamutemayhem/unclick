// AbuseIPDB IP reputation database.
// Docs: https://docs.abuseipdb.com/
// Auth: ABUSEIPDB_API_KEY (Key header)
// Base: https://api.abuseipdb.com/api/v2/

import { requireCredential } from "./connector-setup.js";
import { type NotConnectedResult } from "./connection-help.js";
import { stampMeta } from "./connector-meta.js";

const ABUSEIPDB_BASE = "https://api.abuseipdb.com/api/v2";

function getApiKey(args: Record<string, unknown>): string | NotConnectedResult {
  return requireCredential("abuseipdb", args);
}

async function abuseGet(
  apiKey: string,
  path: string,
  params: Record<string, string>
): Promise<Record<string, unknown>> {
  const qs = new URLSearchParams(params);
  const ABUSEIPDB_TIMEOUT_MS = Number(process.env.ABUSEIPDB_TIMEOUT_MS) || 15000;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), ABUSEIPDB_TIMEOUT_MS);
  let res: Response;
  try {
    res = await fetch(`${ABUSEIPDB_BASE}${path}?${qs}`, {
      headers: {
        Key: apiKey,
        Accept: "application/json",
      },
      signal: controller.signal,
    });
  } catch (err) {
    if (err instanceof Error && err.name === "AbortError") {
      throw new Error(`AbuseIPDB request timed out after ${ABUSEIPDB_TIMEOUT_MS}ms.`);
    }
    throw new Error(`AbuseIPDB network error: ${err instanceof Error ? err.message : String(err)}`);
  } finally {
    clearTimeout(timer);
  }
  if (res.status === 401) throw new Error("Invalid AbuseIPDB API key.");
  if (res.status === 429) throw new Error("AbuseIPDB rate limit exceeded. Upgrade your plan or wait.");
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`AbuseIPDB HTTP ${res.status}: ${body || res.statusText}`);
  }
  return res.json() as Promise<Record<string, unknown>>;
}

async function abusePost(
  apiKey: string,
  path: string,
  params: Record<string, string>
): Promise<Record<string, unknown>> {
  const body = new URLSearchParams(params);
  const ABUSEIPDB_TIMEOUT_MS = Number(process.env.ABUSEIPDB_TIMEOUT_MS) || 15000;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), ABUSEIPDB_TIMEOUT_MS);
  let res: Response;
  try {
    res = await fetch(`${ABUSEIPDB_BASE}${path}`, {
      method: "POST",
      headers: {
        Key: apiKey,
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: body.toString(),
      signal: controller.signal,
    });
  } catch (err) {
    if (err instanceof Error && err.name === "AbortError") {
      throw new Error(`AbuseIPDB request timed out after ${ABUSEIPDB_TIMEOUT_MS}ms.`);
    }
    throw new Error(`AbuseIPDB network error: ${err instanceof Error ? err.message : String(err)}`);
  } finally {
    clearTimeout(timer);
  }
  if (res.status === 401) throw new Error("Invalid AbuseIPDB API key.");
  if (res.status === 429) throw new Error("AbuseIPDB rate limit exceeded.");
  if (!res.ok) {
    const body2 = await res.text().catch(() => "");
    throw new Error(`AbuseIPDB HTTP ${res.status}: ${body2 || res.statusText}`);
  }
  return res.json() as Promise<Record<string, unknown>>;
}

// check_ip_abuse
export async function checkIpAbuse(args: Record<string, unknown>): Promise<unknown> {
  try {
    const apiKey = getApiKey(args);
    if (typeof apiKey !== "string") return apiKey;
    const ip = String(args.ip ?? "").trim();
    if (!ip) return { error: "ip is required." };
    const params: Record<string, string> = { ipAddress: ip };
    if (args.maxAgeInDays ?? args.max_age_in_days) params.maxAgeInDays = String(args.maxAgeInDays ?? args.max_age_in_days);
    if (args.verbose) params.verbose = "true";
    const json = await abuseGet(apiKey, "/check", params);
    const d = json.data as Record<string, unknown> | undefined;
    return stampMeta({
      ip_address: d?.ipAddress,
      is_public: d?.isPublic,
      abuse_confidence_score: d?.abuseConfidenceScore,
      country_code: d?.countryCode,
      usage_type: d?.usageType,
      isp: d?.isp,
      domain: d?.domain,
      is_tor: d?.isTor,
      total_reports: d?.totalReports,
      num_distinct_users: d?.numDistinctUsers,
      last_reported_at: d?.lastReportedAt,
      reports: d?.reports ?? [],
    }, {
      source: "AbuseIPDB",
      fetched_at: new Date().toISOString(),
      next_steps: ["Use abuseipdb_blacklist for the worst offenders, or abuseipdb_report_ip to report abuse."],
    });
  } catch (err) {
    return { error: err instanceof Error ? err.message : String(err) };
  }
}

// report_ip_abuse
export async function reportIpAbuse(args: Record<string, unknown>): Promise<unknown> {
  try {
    const apiKey = getApiKey(args);
    if (typeof apiKey !== "string") return apiKey;
    const ip = String(args.ip ?? "").trim();
    const categories = String(args.categories ?? "").trim();
    if (!ip) return { error: "ip is required." };
    if (!categories) return { error: "categories is required (comma-separated category IDs, e.g. 18,22)." };
    const params: Record<string, string> = { ip, categories };
    if (args.comment) params.comment = String(args.comment);
    const json = await abusePost(apiKey, "/report", params);
    const d = json.data as Record<string, unknown> | undefined;
    return {
      ip_address: d?.ipAddress,
      abuse_confidence_score: d?.abuseConfidenceScore,
    };
  } catch (err) {
    return { error: err instanceof Error ? err.message : String(err) };
  }
}

// get_blacklist_abuseipdb
export async function getBlacklistAbuseipdb(args: Record<string, unknown>): Promise<unknown> {
  try {
    const apiKey = getApiKey(args);
    if (typeof apiKey !== "string") return apiKey;
    const params: Record<string, string> = {};
    if (args.confidenceMinimum ?? args.confidence_minimum) params.confidenceMinimum = String(args.confidenceMinimum ?? args.confidence_minimum);
    if (args.limit) params.limit = String(args.limit);
    const json = await abuseGet(apiKey, "/blacklist", params);
    const data = json.data as Array<Record<string, unknown>> | undefined;
    return {
      count: data?.length ?? 0,
      generated_at: json.meta ? (json.meta as Record<string, unknown>).generatedAt : null,
      blacklist: data ?? [],
    };
  } catch (err) {
    return { error: err instanceof Error ? err.message : String(err) };
  }
}
