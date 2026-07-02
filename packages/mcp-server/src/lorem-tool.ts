// Bacon Ipsum - meat-themed placeholder text generator.
// No API key required - completely free and open.
// Base URL: https://baconipsum.com/api/

import { stampMeta } from "./connector-meta.js";

const TIMEOUT_MS = Number(process.env.LOREM_TIMEOUT_MS) || 10000;

const META = { source: "baconipsum.com" };

export async function baconIpsum(args: Record<string, unknown>): Promise<unknown> {
  const paras = Math.min(Number(args.paragraphs ?? 3), 10);
  const type = String(args.type ?? "meat-and-filler");
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    let res: Response;
    try {
      res = await fetch(`https://baconipsum.com/api/?type=${encodeURIComponent(type)}&paras=${paras}&format=json`, {
        headers: { "User-Agent": "UnClickMCP/1.0 (https://unclick.io)" },
        signal: controller.signal,
      });
    } catch (err) {
      if (err instanceof Error && err.name === "AbortError") {
        throw new Error(`Bacon Ipsum request timed out after ${TIMEOUT_MS}ms.`);
      }
      throw new Error(`Bacon Ipsum network error: ${err instanceof Error ? err.message : String(err)}`);
    }
    if (res.status === 429) {
      const retryAfter = res.headers.get("Retry-After");
      throw new Error(`Bacon Ipsum rate limit reached (HTTP 429)${retryAfter ? `, retry after ${retryAfter}s` : ""}.`);
    }
    if (!res.ok) {
      const body = await res.text().catch(() => "");
      throw new Error(`Bacon Ipsum HTTP ${res.status}${body ? `: ${body.slice(0, 200)}` : ""}`);
    }
    const data = await res.json();
    return stampMeta({ paragraphs: data }, { ...META, fetched_at: new Date().toISOString(), next_steps: ["Use type='all-meat' for pure meat words, or 'meat-and-filler' for mixed."] });
  } catch (err) {
    return { error: err instanceof Error ? err.message : String(err) };
  } finally {
    clearTimeout(timer);
  }
}
