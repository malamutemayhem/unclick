import { stampMeta } from "./connector-meta.js";

const BASE = "https://gutendex.com";
const TIMEOUT = 10_000;

export async function gutendexSearch(args: Record<string, unknown>) {
  const query = String(args.query ?? "").trim();
  if (!query) return { error: "query is required" };
  const page = Number(args.page) || 1;
  const url = `${BASE}/books?search=${encodeURIComponent(query)}&page=${page}`;
  const res = await fetch(url, { signal: AbortSignal.timeout(TIMEOUT) });
  if (!res.ok) throw new Error(`Gutendex search ${res.status}`);
  const data = await res.json();
  return stampMeta(data, {
    source: `gutendex.com search "${query}"`,
    fetched_at: new Date().toISOString(),
    next_steps: ["get full book details by id", "access free ebook formats in the results"],
  });
}

export async function gutendexBook(args: Record<string, unknown>) {
  const id = String(args.id ?? "").trim();
  if (!id) return { error: "id is required" };
  const url = `${BASE}/books/${encodeURIComponent(id)}`;
  const res = await fetch(url, { signal: AbortSignal.timeout(TIMEOUT) });
  if (!res.ok) throw new Error(`Gutendex book ${res.status}`);
  const data = await res.json();
  return stampMeta(data, {
    source: `gutendex.com books/${id}`,
    fetched_at: new Date().toISOString(),
    next_steps: ["download ebook from formats URLs", "explore same author works"],
  });
}
