import { stampMeta } from "./connector-meta.js";

const BASE = "https://api.upcitemdb.com/prod/trial";
const TIMEOUT = 10_000;

export async function upcLookup(args: Record<string, unknown>) {
  const upc = String(args.upc ?? "").trim();
  if (!upc) return { error: "upc (barcode number) is required" };
  const url = `${BASE}/lookup?upc=${encodeURIComponent(upc)}`;
  const res = await fetch(url, { signal: AbortSignal.timeout(TIMEOUT) });
  if (!res.ok) throw new Error(`UPCitemdb ${res.status}`);
  const data = await res.json();
  return stampMeta(data, {
    source: `api.upcitemdb.com lookup/${upc}`,
    fetched_at: new Date().toISOString(),
    next_steps: ["check items array for product title, brand, and description", "use offers for pricing data"],
  });
}

export async function upcSearch(args: Record<string, unknown>) {
  const query = String(args.query ?? "").trim();
  if (!query) return { error: "query is required" };
  const url = `${BASE}/search?s=${encodeURIComponent(query)}&type=product`;
  const res = await fetch(url, { signal: AbortSignal.timeout(TIMEOUT) });
  if (!res.ok) throw new Error(`UPCitemdb search ${res.status}`);
  const data = await res.json();
  return stampMeta(data, {
    source: `api.upcitemdb.com search "${query}"`,
    fetched_at: new Date().toISOString(),
    next_steps: ["browse items for matching products", "use ean/upc for barcode lookup"],
  });
}
