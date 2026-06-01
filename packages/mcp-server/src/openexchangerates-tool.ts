// Open Exchange Rates integration for the UnClick MCP server.
// Uses the Open Exchange Rates REST API via fetch - no external dependencies.
// Users must register at openexchangerates.org to get a free App ID.

import { requireCredential } from "./connector-setup.js";
import { type NotConnectedResult } from "./connection-help.js";
import { stampMeta } from "./connector-meta.js";

const OXR_BASE = "https://openexchangerates.org/api";

// --- API helper ---

function requireAppId(args: Record<string, unknown>): string | NotConnectedResult {
  return requireCredential("openexchangerates", args);
}

async function oxrFetch(app_id: string,
  path: string, params: Record<string, string> = {}): Promise<unknown> {
  const url = new URL(`${OXR_BASE}${path}`);
  url.searchParams.set("app_id", app_id);
  for (const [k, v] of Object.entries(params)) url.searchParams.set(k, v);

  const OPENEXCHANGERATES_TIMEOUT_MS = Number(process.env.OPENEXCHANGERATES_TIMEOUT_MS) || 15000;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), OPENEXCHANGERATES_TIMEOUT_MS);
  let response: Response;
  try {
    response = await fetch(url.toString(), { signal: controller.signal });
  } catch (err) {
    if (err instanceof Error && err.name === "AbortError") {
      throw new Error(`Open Exchange Rates request timed out after ${OPENEXCHANGERATES_TIMEOUT_MS}ms.`);
    }
    throw new Error(`Open Exchange Rates network error: ${err instanceof Error ? err.message : String(err)}`);
  } finally {
    clearTimeout(timer);
  }

  if (response.status === 429) {
    throw new Error("Open Exchange Rates rate limit reached (HTTP 429). Check your plan's request limit.");
  }
  if (!response.ok) {
    const text = await response.text().catch(() => "");
    throw new Error(`Open Exchange Rates API error (HTTP ${response.status})${text ? `: ${text}` : ""}`);
  }

  const data = await response.json() as Record<string, unknown>;

  if (data.error) {
    throw new Error(`Open Exchange Rates error: ${data.description ?? data.message ?? "Unknown error"}`);
  }

  return data;
}

// --- Operations ---

export async function forexLatest(args: Record<string, unknown>): Promise<unknown> {
  const app_id = requireAppId(args);
  if (typeof app_id !== "string") return app_id;
  const params: Record<string, string> = {};
  const base = String(args.base ?? "").trim().toUpperCase();
  const symbols = String(args.symbols ?? "").trim().toUpperCase();

  // Note: changing base currency requires a paid plan
  if (base) params.base = base;
  if (symbols) params.symbols = symbols;

  const data = await oxrFetch(app_id, "/latest.json", params) as Record<string, unknown>;

  return stampMeta({
    base: data.base,
    timestamp: data.timestamp,
    date: new Date(Number(data.timestamp) * 1000).toISOString().split("T")[0],
    rates: data.rates,
  }, {
    source: "Open Exchange Rates",
    fetched_at: new Date().toISOString(),
    next_steps: ["Use forex_convert to convert an amount, or forex_historical for a past date."],
  });
}

export async function forexHistorical(args: Record<string, unknown>): Promise<unknown> {
  const app_id = requireAppId(args);
  if (typeof app_id !== "string") return app_id;
  const date = String(args.date ?? "").trim();
  if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    throw new Error("date is required in YYYY-MM-DD format.");
  }

  const params: Record<string, string> = {};
  const base = String(args.base ?? "").trim().toUpperCase();
  const symbols = String(args.symbols ?? "").trim().toUpperCase();

  if (base) params.base = base;
  if (symbols) params.symbols = symbols;

  const data = await oxrFetch(app_id, `/historical/${date}.json`, params) as Record<string, unknown>;

  return {
    base: data.base,
    date: data.date ?? date,
    timestamp: data.timestamp,
    rates: data.rates,
  };
}

export async function forexCurrencies(args: Record<string, unknown>): Promise<unknown> {
  const app_id = requireAppId(args);
  if (typeof app_id !== "string") return app_id;
  const data = await oxrFetch(app_id, "/currencies.json");
  const currencies = data as Record<string, string>;

  return {
    count: Object.keys(currencies).length,
    currencies,
  };
}

export async function forexConvert(args: Record<string, unknown>): Promise<unknown> {
  const app_id = requireAppId(args);
  if (typeof app_id !== "string") return app_id;
  const value = Number(args.value);
  if (!value || isNaN(value)) throw new Error("value is required and must be a number.");
  const from = String(args.from ?? "").trim().toUpperCase();
  const to = String(args.to ?? "").trim().toUpperCase();
  if (!from) throw new Error("from currency is required.");
  if (!to) throw new Error("to currency is required.");

  const params: Record<string, string> = {};
  const date = String(args.date ?? "").trim();
  if (date) params.date = date;

  const data = await oxrFetch(app_id, `/convert/${value}/${from}/${to}`, params) as Record<string, unknown>;

  const meta = data.meta as Record<string, unknown> | undefined;
  const response = data.response as Record<string, unknown> | undefined;

  return {
    from,
    to,
    value,
    result: response?.value ?? data.response,
    rate: meta?.rate ?? null,
    timestamp: meta?.timestamp ?? null,
  };
}
