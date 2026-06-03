// Open Library API integration for the UnClick MCP server.
// Uses the Open Library REST API via fetch - no external dependencies.
// No authentication required.

import { stampMeta } from "./connector-meta.js";

const OL_BASE = "https://openlibrary.org";
const OPENLIBRARY_TIMEOUT_MS = Number(process.env.OPENLIBRARY_TIMEOUT_MS) || 10000;

// ─── API helper ───────────────────────────────────────────────────────────────

async function olCall(
  path: string,
  params: Record<string, string | number | undefined> = {}
): Promise<unknown> {
  const url = new URL(`${OL_BASE}${path}`);

  for (const [k, v] of Object.entries(params)) {
    if (v !== undefined && v !== "") {
      url.searchParams.set(k, String(v));
    }
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), OPENLIBRARY_TIMEOUT_MS);
  let response: Response;
  try {
    response = await fetch(url.toString(), {
      headers: { Accept: "application/json" },
      signal: controller.signal,
    });
  } catch (err) {
    if (err instanceof Error && err.name === "AbortError") {
      throw new Error(`Open Library API request timed out after ${OPENLIBRARY_TIMEOUT_MS}ms.`);
    }
    throw new Error(`Open Library API network error: ${err instanceof Error ? err.message : String(err)}`);
  } finally {
    clearTimeout(timer);
  }

  if (response.status === 429) {
    const retryAfter = response.headers.get("Retry-After");
    throw new Error(`Open Library API rate limit reached (HTTP 429)${retryAfter ? `, retry after ${retryAfter}s` : ""}.`);
  }
  if (!response.ok) {
    const body = await response.text().catch(() => "");
    throw new Error(`Open Library API HTTP ${response.status}${body ? `: ${body.slice(0, 200)}` : ""}`);
  }

  return response.json();
}

// ─── Tools ────────────────────────────────────────────────────────────────────

export async function openlibrarySearch(args: Record<string, unknown>): Promise<unknown> {
  const params: Record<string, string | number | undefined> = {};
  if (args.q) params.q = String(args.q);
  if (args.title) params.title = String(args.title);
  if (args.author) params.author = String(args.author);
  if (args.isbn) params.isbn = String(args.isbn);
  if (args.limit) params.limit = Number(args.limit);
  const __res = await olCall("/search.json", params) as Record<string, unknown>;
  return stampMeta(__res, {
    source: "Open Library",
    fetched_at: new Date().toISOString(),
    next_steps: ["Use openlibrary_get_book with a work id, or openlibrary_get_author for author detail."],
  });
}

export async function openlibraryGetBook(args: Record<string, unknown>): Promise<unknown> {
  const key = String((args.work_id ?? args.key) ?? "").trim();
  if (!key) throw new Error("key is required (e.g. OL45804W).");
  // Strip leading slash if caller includes it
  const cleanKey = key.replace(/^\//, "");
  return olCall(`/works/${cleanKey}.json`);
}

export async function openlibraryGetEdition(args: Record<string, unknown>): Promise<unknown> {
  const isbn = String(args.isbn ?? "").trim();
  if (!isbn) throw new Error("isbn is required.");
  return olCall(`/isbn/${isbn}.json`);
}

export async function openlibraryGetAuthor(args: Record<string, unknown>): Promise<unknown> {
  const key = String((args.author_id ?? args.key) ?? "").trim();
  if (!key) throw new Error("key is required (e.g. OL23919A).");
  const cleanKey = key.replace(/^\//, "");
  return olCall(`/authors/${cleanKey}.json`);
}

export async function openlibraryAuthorWorks(args: Record<string, unknown>): Promise<unknown> {
  const key = String((args.author_id ?? args.key) ?? "").trim();
  if (!key) throw new Error("key is required (e.g. OL23919A).");
  const cleanKey = key.replace(/^\//, "");
  return olCall(`/authors/${cleanKey}/works.json`);
}

export async function openlibraryTrending(_args: Record<string, unknown>): Promise<unknown> {
  return olCall("/trending/daily.json");
}
