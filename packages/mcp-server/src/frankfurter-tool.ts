// Exchange Rates API (Frankfurter) - currency exchange rates.
// No API key required - completely free and open. Based on ECB data.
// Base URL: https://api.frankfurter.app/

import { stampMeta } from "./connector-meta.js";

const BASE = "https://api.frankfurter.app";
const TIMEOUT_MS = Number(process.env.FRANKFURTER_TIMEOUT_MS) || 10000;

async function fxFetch<T>(path: string): Promise<T> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  let res: Response;
  try {
    res = await fetch(`${BASE}${path}`, {
      headers: { "User-Agent": "UnClickMCP/1.0 (https://unclick.io)" },
      signal: controller.signal,
    });
  } catch (err) {
    if (err instanceof Error && err.name === "AbortError") {
      throw new Error(`Frankfurter request timed out after ${TIMEOUT_MS}ms.`);
    }
    throw new Error(`Frankfurter network error: ${err instanceof Error ? err.message : String(err)}`);
  } finally {
    clearTimeout(timer);
  }
  if (res.status === 429) {
    const retryAfter = res.headers.get("Retry-After");
    throw new Error(`Frankfurter rate limit reached (HTTP 429)${retryAfter ? `, retry after ${retryAfter}s` : ""}.`);
  }
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`Frankfurter HTTP ${res.status}${body ? `: ${body.slice(0, 200)}` : ""}`);
  }
  return res.json() as Promise<T>;
}

const META = { source: "frankfurter.app (ECB data)" };

export async function frankfurterLatest(args: Record<string, unknown>): Promise<unknown> {
  const from = String(args.from ?? "EUR").toUpperCase();
  const to = args.to ? String(args.to).toUpperCase() : "";
  try {
    let path = `/latest?from=${encodeURIComponent(from)}`;
    if (to) path += `&to=${encodeURIComponent(to)}`;
    const data = await fxFetch(path);
    return stampMeta(data, { ...META, fetched_at: new Date().toISOString(), next_steps: ["Use frankfurter_convert for a specific amount.", "Use frankfurter_currencies to list supported currencies."] });
  } catch (err) {
    return { error: err instanceof Error ? err.message : String(err) };
  }
}

export async function frankfurterConvert(args: Record<string, unknown>): Promise<unknown> {
  const amount = Number(args.amount ?? 0);
  const from = String(args.from ?? "").toUpperCase();
  const to = String(args.to ?? "").toUpperCase();
  if (!amount || !from || !to) return { error: "amount, from, and to are required (e.g. amount=100, from=USD, to=EUR)." };
  try {
    const data = await fxFetch(`/latest?amount=${amount}&from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}`);
    return stampMeta(data, { ...META, fetched_at: new Date().toISOString(), next_steps: ["Use frankfurter_historical for past rates."] });
  } catch (err) {
    return { error: err instanceof Error ? err.message : String(err) };
  }
}

export async function frankfurterHistorical(args: Record<string, unknown>): Promise<unknown> {
  const date = String(args.date ?? "");
  const from = String(args.from ?? "EUR").toUpperCase();
  const to = args.to ? String(args.to).toUpperCase() : "";
  if (!date) return { error: "date is required (YYYY-MM-DD format)." };
  try {
    let path = `/${encodeURIComponent(date)}?from=${encodeURIComponent(from)}`;
    if (to) path += `&to=${encodeURIComponent(to)}`;
    const data = await fxFetch(path);
    return stampMeta(data, { ...META, fetched_at: new Date().toISOString(), next_steps: ["Use frankfurter_latest for current rates."] });
  } catch (err) {
    return { error: err instanceof Error ? err.message : String(err) };
  }
}

export async function frankfurterCurrencies(_args: Record<string, unknown>): Promise<unknown> {
  try {
    const data = await fxFetch("/currencies");
    return stampMeta(data, { ...META, fetched_at: new Date().toISOString(), next_steps: ["Use frankfurter_latest with a currency code to see rates."] });
  } catch (err) {
    return { error: err instanceof Error ? err.message : String(err) };
  }
}
