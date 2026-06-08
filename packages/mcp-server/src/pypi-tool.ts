import { stampMeta } from "./connector-meta.js";

const UA = "UnClick-MCP/1.0";
const BASE = "https://pypi.org/pypi";
const TIMEOUT_MS = 10_000;

async function fetchJson(url: string): Promise<unknown> {
  const ac = new AbortController();
  const timer = setTimeout(() => ac.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(url, { headers: { "User-Agent": UA }, signal: ac.signal });
    clearTimeout(timer);
    if (res.status === 429) return { error: "Rate limit exceeded. Try again in a minute." };
    if (!res.ok) return { error: `HTTP ${res.status}: ${await res.text()}` };
    return await res.json();
  } catch (e: unknown) {
    clearTimeout(timer);
    if (e instanceof Error && e.name === "AbortError") return { error: "Request timed out." };
    return { error: String(e) };
  }
}

export async function pypiGetPackage(args: Record<string, unknown>) {
  const name = String(args.name || "");
  if (!name) return { error: "name is required (Python package name)." };
  const data = await fetchJson(`${BASE}/${encodeURIComponent(name)}/json`);
  if (data && typeof data === "object" && "error" in data) return data;
  return stampMeta(data as Record<string, unknown>, { source: "pypi.org", fetched_at: new Date().toISOString(), next_steps: ["Returns package metadata: version, description, author, license, and download URLs.", "The info.requires_dist field lists dependencies."] });
}

export async function pypiGetVersion(args: Record<string, unknown>) {
  const name = String(args.name || "");
  const version = String(args.version || "");
  if (!name || !version) return { error: "name and version are required." };
  const data = await fetchJson(`${BASE}/${encodeURIComponent(name)}/${encodeURIComponent(version)}/json`);
  if (data && typeof data === "object" && "error" in data) return data;
  return stampMeta(data as Record<string, unknown>, { source: "pypi.org", fetched_at: new Date().toISOString(), next_steps: ["Returns metadata for a specific version of a Python package.", "Use pypi_get_package to get the latest version info."] });
}
