// Agify / Genderize / Nationalize APIs - name analysis.
// No API key required for basic usage (rate-limited to 100/day without key).
// Base URLs: https://api.agify.io, https://api.genderize.io, https://api.nationalize.io

import { stampMeta } from "./connector-meta.js";

const TIMEOUT_MS = Number(process.env.AGIFY_TIMEOUT_MS) || 10000;

async function nameFetch<T>(url: string): Promise<T> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  let res: Response;
  try {
    res = await fetch(url, {
      headers: { "User-Agent": "UnClickMCP/1.0 (https://unclick.io)" },
      signal: controller.signal,
    });
  } catch (err) {
    if (err instanceof Error && err.name === "AbortError") {
      throw new Error(`Name API request timed out after ${TIMEOUT_MS}ms.`);
    }
    throw new Error(`Name API network error: ${err instanceof Error ? err.message : String(err)}`);
  } finally {
    clearTimeout(timer);
  }
  if (res.status === 429) {
    const retryAfter = res.headers.get("Retry-After");
    throw new Error(`Name API rate limit reached (HTTP 429)${retryAfter ? `, retry after ${retryAfter}s` : ""}.`);
  }
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`Name API HTTP ${res.status}${body ? `: ${body.slice(0, 200)}` : ""}`);
  }
  return res.json() as Promise<T>;
}

export async function agifyAge(args: Record<string, unknown>): Promise<unknown> {
  const name = String(args.name ?? "");
  if (!name) return { error: "name is required." };
  const country = args.country_id ? `&country_id=${encodeURIComponent(String(args.country_id))}` : "";
  try {
    const data = await nameFetch(`https://api.agify.io?name=${encodeURIComponent(name)}${country}`);
    return stampMeta(data, { source: "agify.io", fetched_at: new Date().toISOString(), next_steps: ["Use genderize_name to predict gender.", "Use nationalize_name to predict nationality."] });
  } catch (err) {
    return { error: err instanceof Error ? err.message : String(err) };
  }
}

export async function genderizeName(args: Record<string, unknown>): Promise<unknown> {
  const name = String(args.name ?? "");
  if (!name) return { error: "name is required." };
  const country = args.country_id ? `&country_id=${encodeURIComponent(String(args.country_id))}` : "";
  try {
    const data = await nameFetch(`https://api.genderize.io?name=${encodeURIComponent(name)}${country}`);
    return stampMeta(data, { source: "genderize.io", fetched_at: new Date().toISOString(), next_steps: ["Use agify_age to predict age.", "Use nationalize_name to predict nationality."] });
  } catch (err) {
    return { error: err instanceof Error ? err.message : String(err) };
  }
}

export async function nationalizeName(args: Record<string, unknown>): Promise<unknown> {
  const name = String(args.name ?? "");
  if (!name) return { error: "name is required." };
  try {
    const data = await nameFetch(`https://api.nationalize.io?name=${encodeURIComponent(name)}`);
    return stampMeta(data, { source: "nationalize.io", fetched_at: new Date().toISOString(), next_steps: ["Use agify_age to predict age.", "Use genderize_name to predict gender."] });
  } catch (err) {
    return { error: err instanceof Error ? err.message : String(err) };
  }
}
