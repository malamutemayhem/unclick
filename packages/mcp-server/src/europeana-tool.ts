import { stampMeta } from "./connector-meta.js";

const BASE = "https://api.europeana.eu/record/v2";
const TIMEOUT = 10_000;

export async function europeanaSearch(args: Record<string, unknown>) {
  const query = String(args.query ?? "").trim();
  if (!query) return { error: "query is required" };
  const rows = Math.min(Number(args.rows) || 10, 100);
  const start = Number(args.start) || 1;
  const url = `${BASE}/search.json?query=${encodeURIComponent(query)}&rows=${rows}&start=${start}&profile=standard`;
  const res = await fetch(url, { signal: AbortSignal.timeout(TIMEOUT) });
  if (!res.ok) throw new Error(`Europeana search ${res.status}`);
  const data = await res.json();
  return stampMeta(data, {
    source: `api.europeana.eu search "${query}"`,
    fetched_at: new Date().toISOString(),
    next_steps: ["browse items array for cultural heritage objects", "use europeanaId for detailed record"],
  });
}

export async function europeanaRecord(args: Record<string, unknown>) {
  const id = String(args.id ?? "").trim();
  if (!id) return { error: "id (Europeana record ID) is required" };
  const path = id.startsWith("/") ? id : `/${id}`;
  const url = `${BASE}${path}.json`;
  const res = await fetch(url, { signal: AbortSignal.timeout(TIMEOUT) });
  if (!res.ok) throw new Error(`Europeana record ${res.status}`);
  const data = await res.json();
  return stampMeta(data, {
    source: `api.europeana.eu record${path}`,
    fetched_at: new Date().toISOString(),
    next_steps: ["check object.proxies for descriptive metadata", "check object.aggregations for media links"],
  });
}
