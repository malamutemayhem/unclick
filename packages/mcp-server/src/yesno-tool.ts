// YesNo.wtf - random yes/no answers with GIFs.
// No API key required - completely free and open.
// Base URL: https://yesno.wtf/api

import { stampMeta } from "./connector-meta.js";

const TIMEOUT_MS = Number(process.env.YESNO_TIMEOUT_MS) || 10000;

export async function yesNoRandom(args: Record<string, unknown>): Promise<unknown> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const force = args.force ? `?force=${encodeURIComponent(String(args.force))}` : "";
    let res: Response;
    try {
      res = await fetch(`https://yesno.wtf/api${force}`, {
        headers: { "User-Agent": "UnClickMCP/1.0 (https://unclick.io)" },
        signal: controller.signal,
      });
    } catch (err) {
      if (err instanceof Error && err.name === "AbortError") {
        throw new Error(`YesNo API request timed out after ${TIMEOUT_MS}ms.`);
      }
      throw new Error(`YesNo API network error: ${err instanceof Error ? err.message : String(err)}`);
    }
    if (res.status === 429) {
      const retryAfter = res.headers.get("Retry-After");
      throw new Error(`YesNo API rate limit reached (HTTP 429)${retryAfter ? `, retry after ${retryAfter}s` : ""}.`);
    }
    if (!res.ok) {
      const body = await res.text().catch(() => "");
      throw new Error(`YesNo API HTTP ${res.status}${body ? `: ${body.slice(0, 200)}` : ""}`);
    }
    const data = await res.json();
    return stampMeta(data, { source: "yesno.wtf", fetched_at: new Date().toISOString(), next_steps: ["Call again for another random answer.", "Use force='yes' or force='no' to get a specific answer."] });
  } catch (err) {
    return { error: err instanceof Error ? err.message : String(err) };
  } finally {
    clearTimeout(timer);
  }
}
