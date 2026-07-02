// Evil Insult Generator - random insults.
// No API key required - completely free and open.
// Base URL: https://evilinsult.com/generate_insult.php

import { stampMeta } from "./connector-meta.js";

const TIMEOUT_MS = Number(process.env.EVILINSULT_TIMEOUT_MS) || 10000;

export async function evilInsultRandom(args: Record<string, unknown>): Promise<unknown> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  const lang = String(args.lang ?? "en");
  try {
    let res: Response;
    try {
      res = await fetch(`https://evilinsult.com/generate_insult.php?lang=${encodeURIComponent(lang)}&type=json`, {
        headers: { "User-Agent": "UnClickMCP/1.0 (https://unclick.io)" },
        signal: controller.signal,
      });
    } catch (err) {
      if (err instanceof Error && err.name === "AbortError") {
        throw new Error(`Evil Insult API request timed out after ${TIMEOUT_MS}ms.`);
      }
      throw new Error(`Evil Insult API network error: ${err instanceof Error ? err.message : String(err)}`);
    }
    if (res.status === 429) {
      const retryAfter = res.headers.get("Retry-After");
      throw new Error(`Evil Insult API rate limit reached (HTTP 429)${retryAfter ? `, retry after ${retryAfter}s` : ""}.`);
    }
    if (!res.ok) {
      const body = await res.text().catch(() => "");
      throw new Error(`Evil Insult API HTTP ${res.status}${body ? `: ${body.slice(0, 200)}` : ""}`);
    }
    const data = await res.json();
    return stampMeta(data, { source: "evilinsult.com", fetched_at: new Date().toISOString(), next_steps: ["Call again for another insult.", "Use lang param for different languages: en, es, de, etc."] });
  } catch (err) {
    return { error: err instanceof Error ? err.message : String(err) };
  } finally {
    clearTimeout(timer);
  }
}
