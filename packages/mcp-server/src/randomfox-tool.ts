// RandomFox - random fox images.
// No API key required - completely free and open.
// Base URL: https://randomfox.ca/

import { stampMeta } from "./connector-meta.js";

const TIMEOUT_MS = Number(process.env.RANDOMFOX_TIMEOUT_MS) || 10000;

export async function randomFoxImage(_args: Record<string, unknown>): Promise<unknown> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    let res: Response;
    try {
      res = await fetch("https://randomfox.ca/floof/", {
        headers: { "User-Agent": "UnClickMCP/1.0 (https://unclick.io)" },
        signal: controller.signal,
      });
    } catch (err) {
      if (err instanceof Error && err.name === "AbortError") {
        throw new Error(`RandomFox request timed out after ${TIMEOUT_MS}ms.`);
      }
      throw new Error(`RandomFox network error: ${err instanceof Error ? err.message : String(err)}`);
    }
    if (res.status === 429) {
      const retryAfter = res.headers.get("Retry-After");
      throw new Error(`RandomFox rate limit reached (HTTP 429)${retryAfter ? `, retry after ${retryAfter}s` : ""}.`);
    }
    if (!res.ok) {
      const body = await res.text().catch(() => "");
      throw new Error(`RandomFox HTTP ${res.status}${body ? `: ${body.slice(0, 200)}` : ""}`);
    }
    const data = await res.json();
    return stampMeta(data, { source: "randomfox.ca", fetched_at: new Date().toISOString(), next_steps: ["Call again for another random fox image."] });
  } catch (err) {
    return { error: err instanceof Error ? err.message : String(err) };
  } finally {
    clearTimeout(timer);
  }
}
