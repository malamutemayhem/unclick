// GitHub Emoji API - list all GitHub emojis with their image URLs.
// No API key required - completely free and open.
// Base URL: https://api.github.com/emojis

import { stampMeta } from "./connector-meta.js";

const TIMEOUT_MS = Number(process.env.GITHUB_EMOJI_TIMEOUT_MS) || 10000;

export async function githubEmojis(_args: Record<string, unknown>): Promise<unknown> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    let res: Response;
    try {
      res = await fetch("https://api.github.com/emojis", {
        headers: { "User-Agent": "UnClickMCP/1.0 (https://unclick.io)", Accept: "application/json" },
        signal: controller.signal,
      });
    } catch (err) {
      if (err instanceof Error && err.name === "AbortError") {
        throw new Error(`GitHub Emoji API request timed out after ${TIMEOUT_MS}ms.`);
      }
      throw new Error(`GitHub Emoji API network error: ${err instanceof Error ? err.message : String(err)}`);
    }
    if (res.status === 429) {
      const retryAfter = res.headers.get("Retry-After");
      throw new Error(`GitHub Emoji API rate limit reached (HTTP 429)${retryAfter ? `, retry after ${retryAfter}s` : ""}.`);
    }
    if (!res.ok) {
      const body = await res.text().catch(() => "");
      throw new Error(`GitHub Emoji API HTTP ${res.status}${body ? `: ${body.slice(0, 200)}` : ""}`);
    }
    const data = await res.json() as Record<string, string>;
    const names = Object.keys(data);
    return stampMeta({ count: names.length, sample: names.slice(0, 30), emojis: data }, { source: "api.github.com/emojis", fetched_at: new Date().toISOString(), next_steps: ["Each emoji name maps to its image URL on GitHub."] });
  } catch (err) {
    return { error: err instanceof Error ? err.message : String(err) };
  } finally {
    clearTimeout(timer);
  }
}
