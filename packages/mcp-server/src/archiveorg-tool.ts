// Internet Archive (archive.org) - search the Wayback Machine and collections.
// No API key required - completely free and open.
// Base URL: https://archive.org/

import { stampMeta } from "./connector-meta.js";

const TIMEOUT_MS = Number(process.env.ARCHIVEORG_TIMEOUT_MS) || 15000;

const META = { source: "archive.org" };

export async function archiveSearch(args: Record<string, unknown>): Promise<unknown> {
  const query = String(args.query ?? "");
  if (!query) return { error: "query is required." };
  const rows = Math.min(Number(args.limit ?? 10), 20);
  const page = Number(args.page ?? 1);
  const mediatype = args.mediatype ? String(args.mediatype) : "";
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    let q = query;
    if (mediatype) q += ` AND mediatype:${mediatype}`;
    const url = `https://archive.org/advancedsearch.php?q=${encodeURIComponent(q)}&fl[]=identifier&fl[]=title&fl[]=description&fl[]=mediatype&fl[]=date&rows=${rows}&page=${page}&output=json`;
    let res: Response;
    try {
      res = await fetch(url, {
        headers: { "User-Agent": "UnClickMCP/1.0 (https://unclick.io)" },
        signal: controller.signal,
      });
    } catch (err) {
      if (err instanceof Error && err.name === "AbortError") {
        throw new Error(`Archive.org request timed out after ${TIMEOUT_MS}ms.`);
      }
      throw new Error(`Archive.org network error: ${err instanceof Error ? err.message : String(err)}`);
    }
    if (res.status === 429) {
      const retryAfter = res.headers.get("Retry-After");
      throw new Error(`Archive.org rate limit reached (HTTP 429)${retryAfter ? `, retry after ${retryAfter}s` : ""}.`);
    }
    if (!res.ok) {
      const body = await res.text().catch(() => "");
      throw new Error(`Archive.org HTTP ${res.status}${body ? `: ${body.slice(0, 200)}` : ""}`);
    }
    const data = await res.json();
    return stampMeta(data, { ...META, fetched_at: new Date().toISOString(), next_steps: ["Use archive_metadata with an identifier for item details.", "Filter by mediatype: texts, audio, movies, software, image, collection."] });
  } catch (err) {
    return { error: err instanceof Error ? err.message : String(err) };
  } finally {
    clearTimeout(timer);
  }
}

export async function archiveMetadata(args: Record<string, unknown>): Promise<unknown> {
  const id = String(args.identifier ?? args.id ?? "");
  if (!id) return { error: "identifier is required (get it from archive_search)." };
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    let res: Response;
    try {
      res = await fetch(`https://archive.org/metadata/${encodeURIComponent(id)}`, {
        headers: { "User-Agent": "UnClickMCP/1.0 (https://unclick.io)" },
        signal: controller.signal,
      });
    } catch (err) {
      if (err instanceof Error && err.name === "AbortError") {
        throw new Error(`Archive.org request timed out after ${TIMEOUT_MS}ms.`);
      }
      throw new Error(`Archive.org network error: ${err instanceof Error ? err.message : String(err)}`);
    }
    if (res.status === 429) {
      const retryAfter = res.headers.get("Retry-After");
      throw new Error(`Archive.org rate limit reached (HTTP 429)${retryAfter ? `, retry after ${retryAfter}s` : ""}.`);
    }
    if (!res.ok) {
      const body = await res.text().catch(() => "");
      throw new Error(`Archive.org HTTP ${res.status}${body ? `: ${body.slice(0, 200)}` : ""}`);
    }
    const data = await res.json() as Record<string, unknown>;
    const meta = data.metadata ?? {};
    const filesArr = Array.isArray(data.files) ? data.files : [];
    const files = filesArr.slice(0, 10);
    return stampMeta({ metadata: meta, files_preview: files, file_count: filesArr.length }, { ...META, fetched_at: new Date().toISOString(), next_steps: ["Use archive_search to find more items."] });
  } catch (err) {
    return { error: err instanceof Error ? err.message : String(err) };
  } finally {
    clearTimeout(timer);
  }
}
