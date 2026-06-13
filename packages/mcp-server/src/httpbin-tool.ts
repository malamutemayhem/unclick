// httpbin - HTTP request and response testing service.
// No API key required - completely free and open.
// Base URL: https://httpbin.org/

import { stampMeta } from "./connector-meta.js";

const BASE = "https://httpbin.org";
const TIMEOUT_MS = Number(process.env.HTTPBIN_TIMEOUT_MS) || 10000;

async function hbFetch<T>(path: string): Promise<T> {
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
      throw new Error(`httpbin request timed out after ${TIMEOUT_MS}ms.`);
    }
    throw new Error(`httpbin network error: ${err instanceof Error ? err.message : String(err)}`);
  } finally {
    clearTimeout(timer);
  }
  if (res.status === 429) {
    const retryAfter = res.headers.get("Retry-After");
    throw new Error(`httpbin rate limit reached (HTTP 429)${retryAfter ? `, retry after ${retryAfter}s` : ""}.`);
  }
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`httpbin HTTP ${res.status}${body ? `: ${body.slice(0, 200)}` : ""}`);
  }
  return res.json() as Promise<T>;
}

const META = { source: "httpbin.org" };

export async function httpbinGet(_args: Record<string, unknown>): Promise<unknown> {
  try {
    const data = await hbFetch("/get");
    return stampMeta(data, { ...META, fetched_at: new Date().toISOString(), next_steps: ["Use httpbin_headers to inspect request headers.", "Use httpbin_ip to get your public IP."] });
  } catch (err) {
    return { error: err instanceof Error ? err.message : String(err) };
  }
}

export async function httpbinHeaders(_args: Record<string, unknown>): Promise<unknown> {
  try {
    const data = await hbFetch("/headers");
    return stampMeta(data, { ...META, fetched_at: new Date().toISOString(), next_steps: ["Use httpbin_get for full request info.", "Use httpbin_user_agent to check user agent."] });
  } catch (err) {
    return { error: err instanceof Error ? err.message : String(err) };
  }
}

export async function httpbinIp(_args: Record<string, unknown>): Promise<unknown> {
  try {
    const data = await hbFetch("/ip");
    return stampMeta(data, { ...META, fetched_at: new Date().toISOString(), next_steps: ["Use httpbin_headers to see all request headers."] });
  } catch (err) {
    return { error: err instanceof Error ? err.message : String(err) };
  }
}

export async function httpbinUserAgent(_args: Record<string, unknown>): Promise<unknown> {
  try {
    const data = await hbFetch("/user-agent");
    return stampMeta(data, { ...META, fetched_at: new Date().toISOString(), next_steps: ["Use httpbin_get for full request details."] });
  } catch (err) {
    return { error: err instanceof Error ? err.message : String(err) };
  }
}

export async function httpbinUuid(_args: Record<string, unknown>): Promise<unknown> {
  try {
    const data = await hbFetch("/uuid");
    return stampMeta(data, { ...META, fetched_at: new Date().toISOString(), next_steps: ["Call again for another UUID."] });
  } catch (err) {
    return { error: err instanceof Error ? err.message : String(err) };
  }
}
