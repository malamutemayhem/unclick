// Amber Electric AU integration.
// Real-time electricity spot prices and renewables percentage.
// Docs: https://app.amber.com.au/developers/
// Auth: Bearer token via AMBER_API_KEY env var.
// Base URL: https://api.amber.com.au/v1/

import { requireCredential } from "./connector-setup.js";
import { type NotConnectedResult } from "./connection-help.js";

const AMBER_BASE = "https://api.amber.com.au/v1";
const AMBER_TIMEOUT_MS = Number(process.env.AMBER_TIMEOUT_MS) || 10000;

function getApiKey(args: Record<string, unknown>): string | NotConnectedResult {
  return requireCredential("amber", args);
}

async function amberGet(apiKey: string, path: string, params?: Record<string, string>): Promise<unknown> {
  const qs = params ? "?" + new URLSearchParams(params).toString() : "";
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), AMBER_TIMEOUT_MS);
  let res: Response;
  try {
    res = await fetch(`${AMBER_BASE}${path}${qs}`, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        Accept: "application/json",
      },
      signal: controller.signal,
    });
  } catch (err) {
    if (err instanceof Error && err.name === "AbortError") {
      throw new Error(`Amber API request timed out after ${AMBER_TIMEOUT_MS}ms.`);
    }
    throw new Error(`Amber API network error: ${err instanceof Error ? err.message : String(err)}`);
  } finally {
    clearTimeout(timer);
  }
  if (res.status === 401) throw new Error("Invalid Amber API key.");
  if (res.status === 404) throw new Error("Resource not found.");
  if (res.status === 429) {
    const retryAfter = res.headers.get("Retry-After");
    throw new Error(`Amber API rate limit exceeded (HTTP 429)${retryAfter ? `, retry after ${retryAfter}s` : ""}.`);
  }
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`Amber API HTTP ${res.status}${body ? `: ${body.slice(0, 200)}` : ""}`);
  }
  return res.json() as Promise<unknown>;
}

// ─── Smart layer (memory defaults + source/freshness/next-step meta) ───────────
// Mirrors the L5 reference pattern in ptv-tool.ts (addPtvMeta): a missing site_id
// is filled from the AMBER_HOME_SITE_ID memory default, every response is stamped
// with where it came from and how fresh it is, and the agent is handed its next
// useful call.

const AMBER_SOURCE = "Amber Electric API v1";

function collectDefaults(args: Record<string, unknown>): string[] {
  return Array.isArray(args.__unclick_memory_defaults)
    ? args.__unclick_memory_defaults.filter((v): v is string => typeof v === "string")
    : [];
}

// Resolve site_id from the call args or the AMBER_HOME_SITE_ID memory default,
// recording which default (if any) filled it so the response can disclose it.
function resolveSiteId(args: Record<string, unknown>, defaultsUsed: string[]): string {
  const fromArg = String(args.site_id ?? "").trim();
  if (fromArg) return fromArg;
  const fromMemory = String(process.env.AMBER_HOME_SITE_ID ?? "").trim();
  if (fromMemory) {
    defaultsUsed.push("AMBER_HOME_SITE_ID");
    return fromMemory;
  }
  return "";
}

const AMBER_NEXT_STEPS: Record<string, string[]> = {
  get_amber_sites: ["Use a returned site id with get_amber_current_price, or set AMBER_HOME_SITE_ID to skip passing it."],
  get_amber_current_price: ["Use get_amber_forecast to see upcoming prices for the same site."],
  get_amber_forecast: ["Use get_amber_current_price for the live spot price of the same site."],
};

function addAmberMeta(
  result: Record<string, unknown>,
  tool: keyof typeof AMBER_NEXT_STEPS,
  defaultsUsed: string[],
): Record<string, unknown> {
  return {
    ...result,
    unclick_meta: {
      source: AMBER_SOURCE,
      fetched_at: new Date().toISOString(),
      defaults_used: defaultsUsed,
      next_steps: AMBER_NEXT_STEPS[tool] ?? [],
    },
  };
}

export async function getAmberSites(args: Record<string, unknown>): Promise<unknown> {
  try {
    const apiKey = getApiKey(args);
    if (typeof apiKey !== "string") return apiKey;
    const sites = await amberGet(apiKey, "/sites") as Array<Record<string, unknown>>;
    return addAmberMeta({
      count: sites.length,
      sites: sites.map((s) => ({
        id: s["id"],
        nmi: s["nmi"],
        status: s["status"],
        network: s["network"],
        loss_factor: s["lossFactor"],
        channels: s["channels"],
      })),
    }, "get_amber_sites", []);
  } catch (err) {
    return { error: err instanceof Error ? err.message : String(err) };
  }
}

// ─── get_amber_current_price ─────────────────────────────────────────────────

export async function getAmberCurrentPrice(args: Record<string, unknown>): Promise<unknown> {
  try {
    const apiKey = getApiKey(args);
    if (typeof apiKey !== "string") return apiKey;
    const defaultsUsed = collectDefaults(args);
    const siteId = resolveSiteId(args, defaultsUsed);
    if (!siteId) return { error: "site_id is required. Call get_amber_sites to find yours, or set AMBER_HOME_SITE_ID." };

    const prices = await amberGet(apiKey, `/sites/${siteId}/prices/current`) as Array<Record<string, unknown>>;

    return addAmberMeta({
      site_id: siteId,
      prices: prices.map((p) => ({
        type: p["channelType"],
        start_time: p["startTime"],
        end_time: p["endTime"],
        duration_minutes: p["duration"],
        spot_per_kwh: p["spotPerKwh"],
        per_kwh: p["perKwh"],
        renewables_pct: p["renewables"],
        spike_status: p["spikeStatus"],
        descriptor: p["descriptor"],
        estimate: p["estimate"] ?? false,
      })),
    }, "get_amber_current_price", defaultsUsed);
  } catch (err) {
    return { error: err instanceof Error ? err.message : String(err) };
  }
}

// ─── get_amber_forecast ───────────────────────────────────────────────────────

export async function getAmberForecast(args: Record<string, unknown>): Promise<unknown> {
  try {
    const apiKey = getApiKey(args);
    if (typeof apiKey !== "string") return apiKey;
    const defaultsUsed = collectDefaults(args);
    const siteId = resolveSiteId(args, defaultsUsed);
    if (!siteId) return { error: "site_id is required. Call get_amber_sites to find yours, or set AMBER_HOME_SITE_ID." };

    const next = Math.min(48, Math.max(1, Number(args.next ?? 12)));
    const prices = await amberGet(apiKey, `/sites/${siteId}/prices`, {
      next: String(next),
      resolution: "30",
    }) as Array<Record<string, unknown>>;

    return addAmberMeta({
      site_id: siteId,
      intervals_requested: next,
      forecast: prices.map((p) => ({
        type: p["channelType"],
        start_time: p["startTime"],
        end_time: p["endTime"],
        spot_per_kwh: p["spotPerKwh"],
        per_kwh: p["perKwh"],
        renewables_pct: p["renewables"],
        spike_status: p["spikeStatus"],
        descriptor: p["descriptor"],
        estimate: p["estimate"] ?? false,
      })),
    }, "get_amber_forecast", defaultsUsed);
  } catch (err) {
    return { error: err instanceof Error ? err.message : String(err) };
  }
}
