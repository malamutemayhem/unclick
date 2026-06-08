import { stampMeta } from "./connector-meta.js";

const UA = "UnClick-MCP/1.0";
const BASE = "https://cve.circl.lu/api";
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

export async function circlCveLookup(args: Record<string, unknown>) {
  const cveId = String(args.cve_id || "");
  if (!cveId) return { error: "cve_id is required (e.g. CVE-2024-1234)." };
  const data = await fetchJson(`${BASE}/cve/${encodeURIComponent(cveId)}`);
  if (data && typeof data === "object" && "error" in data) return data;
  return stampMeta(data as Record<string, unknown>, { source: "cve.circl.lu", fetched_at: new Date().toISOString(), next_steps: ["Returns CVE details: summary, CVSS score, references, and affected products.", "Use circl_cve_recent for the latest published vulnerabilities."] });
}

export async function circlCveRecent(_args: Record<string, unknown>) {
  const data = await fetchJson(`${BASE}/last`);
  if (data && typeof data === "object" && "error" in data) return data;
  return stampMeta({ cves: data }, { source: "cve.circl.lu", fetched_at: new Date().toISOString(), next_steps: ["Returns the most recently published CVEs with summary and severity.", "Use circl_cve_lookup with a CVE ID for full details."] });
}
