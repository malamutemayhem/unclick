// Affirmation API - positive affirmations.
// No API key required - completely free and open.
// Base URL: https://www.affirmations.dev/

import { stampMeta } from "./connector-meta.js";

const TIMEOUT_MS = Number(process.env.AFFIRMATION_TIMEOUT_MS) || 10000;

async function affirmFetch<T>(url: string): Promise<T> {
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
      throw new Error(`Affirmation API request timed out after ${TIMEOUT_MS}ms.`);
    }
    throw new Error(`Affirmation API network error: ${err instanceof Error ? err.message : String(err)}`);
  } finally {
    clearTimeout(timer);
  }
  if (res.status === 429) {
    const retryAfter = res.headers.get("Retry-After");
    throw new Error(`Affirmation API rate limit reached (HTTP 429)${retryAfter ? `, retry after ${retryAfter}s` : ""}.`);
  }
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`Affirmation API HTTP ${res.status}${body ? `: ${body.slice(0, 200)}` : ""}`);
  }
  return res.json() as Promise<T>;
}

export async function affirmationRandom(_args: Record<string, unknown>): Promise<unknown> {
  try {
    const data = await affirmFetch<{ affirmation: string }>("https://www.affirmations.dev/");
    return stampMeta(data, { source: "affirmations.dev", fetched_at: new Date().toISOString(), next_steps: ["Call again for another affirmation."] });
  } catch (err) {
    return { error: err instanceof Error ? err.message : String(err) };
  }
}
