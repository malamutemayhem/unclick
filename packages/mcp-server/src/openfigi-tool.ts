import { stampMeta } from "./connector-meta.js";

const BASE = "https://api.openfigi.com/v3";
const TIMEOUT = 10_000;

export async function openfigiMapping(args: Record<string, unknown>) {
  const idType = String(args.id_type ?? "TICKER").toUpperCase();
  const idValue = String(args.id_value ?? "").trim();
  if (!idValue) return { error: "id_value is required" };
  const body = [{ idType, idValue }];
  const res = await fetch(`${BASE}/mapping`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(TIMEOUT),
  });
  if (!res.ok) throw new Error(`OpenFIGI mapping ${res.status}`);
  const data = await res.json();
  return stampMeta(data, {
    source: `api.openfigi.com mapping ${idType}=${idValue}`,
    fetched_at: new Date().toISOString(),
    next_steps: ["check data array for FIGI, name, and exchange info", "try id_type: TICKER, ISIN, CUSIP, or SEDOL"],
  });
}

export async function openfigiSearch(args: Record<string, unknown>) {
  const query = String(args.query ?? "").trim();
  if (!query) return { error: "query is required" };
  const res = await fetch(`${BASE}/search`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query }),
    signal: AbortSignal.timeout(TIMEOUT),
  });
  if (!res.ok) throw new Error(`OpenFIGI search ${res.status}`);
  const data = await res.json();
  return stampMeta(data, {
    source: `api.openfigi.com search "${query}"`,
    fetched_at: new Date().toISOString(),
    next_steps: ["browse matching financial instruments", "use FIGI for precise instrument identification"],
  });
}
