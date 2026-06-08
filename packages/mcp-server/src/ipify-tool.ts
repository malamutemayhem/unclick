// ipify - Simple public IP address API.
// No API key required - completely free and open.
// Base URL: https://api.ipify.org

import { stampMeta } from "./connector-meta.js";

const TIMEOUT_MS = Number(process.env.IPIFY_TIMEOUT_MS) || 10000;

export async function ipifyGetIp(args: Record<string, unknown>): Promise<unknown> {
  const v6 = args.ipv6 === true;
  const base = v6 ? "https://api6.ipify.org" : "https://api.ipify.org";
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    let res: Response;
    try {
      res = await fetch(`${base}?format=json`, {
        headers: { "User-Agent": "UnClickMCP/1.0 (https://unclick.io)" },
        signal: controller.signal,
      });
    } catch (err) {
      if (err instanceof Error && err.name === "AbortError") {
        throw new Error(`ipify request timed out after ${TIMEOUT_MS}ms.`);
      }
      throw new Error(`ipify network error: ${err instanceof Error ? err.message : String(err)}`);
    }
    if (res.status === 429) {
      const retryAfter = res.headers.get("Retry-After");
      throw new Error(`ipify rate limit reached (HTTP 429)${retryAfter ? `, retry after ${retryAfter}s` : ""}.`);
    }
    if (!res.ok) {
      const body = await res.text().catch(() => "");
      throw new Error(`ipify HTTP ${res.status}${body ? `: ${body.slice(0, 200)}` : ""}`);
    }
    const data = await res.json();
    return stampMeta(data, { source: "ipify.org", fetched_at: new Date().toISOString(), next_steps: ["Use ip_lookup for detailed geo info about an IP."] });
  } catch (err) {
    return { error: err instanceof Error ? err.message : String(err) };
  } finally {
    clearTimeout(timer);
  }
}
