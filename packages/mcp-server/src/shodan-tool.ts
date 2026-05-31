// Shodan internet-connected device search engine.
// Docs: https://developer.shodan.io/api
// Auth: SHODAN_API_KEY (key query param)
// Base: https://api.shodan.io/

import { requireCredential } from "./connector-setup.js";
import { type NotConnectedResult } from "./connection-help.js";

const SHODAN_BASE = "https://api.shodan.io";

// Resolves the API key from args/env via the connector registry, or returns a
// guided not-connected card (returned, never thrown, so a setup gap is not
// mistaken for a connector fault).
function requireKey(args: Record<string, unknown>): string | NotConnectedResult {
  return requireCredential("shodan", args);
}

const SHODAN_TIMEOUT_MS = Number(process.env.SHODAN_TIMEOUT_MS) || 15000;

async function shodanGet(
  apiKey: string,
  path: string,
  params?: Record<string, string>
): Promise<Record<string, unknown>> {
  const qs = new URLSearchParams({ key: apiKey, ...(params ?? {}) });
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), SHODAN_TIMEOUT_MS);
  let res: Response;
  try {
    res = await fetch(`${SHODAN_BASE}${path}?${qs}`, { signal: controller.signal });
  } catch (err) {
    if (err instanceof Error && err.name === "AbortError") {
      throw new Error(`Shodan request timed out after ${SHODAN_TIMEOUT_MS}ms.`);
    }
    throw new Error(`Shodan network error: ${err instanceof Error ? err.message : String(err)}`);
  } finally {
    clearTimeout(timer);
  }
  if (res.status === 401) throw new Error("Invalid Shodan API key.");
  if (res.status === 404) throw new Error("Shodan: resource not found.");
  if (res.status === 429) throw new Error("Shodan rate limit exceeded.");
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    // Shodan returns errors as JSON with an "error" field
    try {
      const json = JSON.parse(body) as Record<string, unknown>;
      if (json.error) throw new Error(`Shodan error: ${json.error}`);
    } catch { /* not JSON */ }
    throw new Error(`Shodan HTTP ${res.status}: ${body || res.statusText}`);
  }
  return res.json() as Promise<Record<string, unknown>>;
}

// search_shodan
export async function searchShodan(args: Record<string, unknown>): Promise<unknown> {
  try {
    const apiKey = requireKey(args);
    if (typeof apiKey !== "string") return apiKey;
    const query = String(args.query ?? "").trim();
    if (!query) return { error: "query is required (e.g. 'port:22 country:US', 'product:nginx')." };
    const params: Record<string, string> = { query };
    if (args.page) params.page = String(args.page);
    if (args.facets) params.facets = String(args.facets);
    if (args.minify !== undefined) params.minify = String(args.minify);
    const data = await shodanGet(apiKey, "/shodan/host/search", params);
    const matches = (data.matches as Array<Record<string, unknown>>) ?? [];
    return {
      total: data.total,
      count: matches.length,
      facets: data.facets,
      matches: matches.map((m) => ({
        ip_str: m.ip_str,
        port: m.port,
        transport: m.transport,
        hostnames: m.hostnames,
        org: m.org,
        isp: m.isp,
        country_name: m.country_name,
        country_code: m.country_code,
        product: m.product,
        version: m.version,
        os: m.os,
        timestamp: m.timestamp,
        data: typeof m.data === "string" ? m.data.slice(0, 300) : null,
      })),
    };
  } catch (err) {
    return { error: err instanceof Error ? err.message : String(err) };
  }
}

// get_host_info
export async function getHostInfo(args: Record<string, unknown>): Promise<unknown> {
  try {
    const apiKey = requireKey(args);
    if (typeof apiKey !== "string") return apiKey;
    const ip = String(args.ip ?? "").trim();
    if (!ip) return { error: "ip is required." };
    const params: Record<string, string> = {};
    if (args.history) params.history = "true";
    if (args.minify) params.minify = "true";
    const data = await shodanGet(apiKey, `/shodan/host/${ip}`, params);
    const ports = data.ports as number[] | undefined;
    const services = (data.data as Array<Record<string, unknown>>) ?? [];
    return {
      ip: data.ip_str,
      hostnames: data.hostnames,
      org: data.org,
      isp: data.isp,
      asn: data.asn,
      country_name: data.country_name,
      country_code: data.country_code,
      city: data.city,
      region_code: data.region_code,
      os: data.os,
      ports,
      last_update: data.last_update,
      services: services.map((s) => ({
        port: s.port,
        transport: s.transport,
        product: s.product,
        version: s.version,
        banner: typeof s.data === "string" ? s.data.slice(0, 200) : null,
        timestamp: s.timestamp,
      })),
    };
  } catch (err) {
    return { error: err instanceof Error ? err.message : String(err) };
  }
}

// get_shodan_stats
export async function getShodanStats(args: Record<string, unknown>): Promise<unknown> {
  try {
    const apiKey = requireKey(args);
    if (typeof apiKey !== "string") return apiKey;
    const query = String(args.query ?? "").trim();
    if (!query) return { error: "query is required." };
    const params: Record<string, string> = { query };
    if (args.facets) params.facets = String(args.facets);
    else params.facets = "country,org,port,product";
    const data = await shodanGet(apiKey, "/shodan/host/count", params);
    return {
      total: data.total,
      facets: data.facets,
    };
  } catch (err) {
    return { error: err instanceof Error ? err.message : String(err) };
  }
}
