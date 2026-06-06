// Open Library API integration for the UnClick MCP server.
// Uses the Open Library REST API via fetch - no external dependencies.
// No authentication required.

const OL_BASE = "https://openlibrary.org";

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

  const response = await fetch(url.toString(), {
    headers: { Accept: "application/json" },
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status} from Open Library API`);
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
  return olCall("/search.json", params);
}

export async function openlibraryGetBook(args: Record<string, unknown>): Promise<unknown> {
  const key = String(args.key ?? "").trim();
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
  const key = String(args.key ?? "").trim();
  if (!key) throw new Error("key is required (e.g. OL23919A).");
  const cleanKey = key.replace(/^\//, "");
  return olCall(`/authors/${cleanKey}.json`);
}

export async function openlibraryAuthorWorks(args: Record<string, unknown>): Promise<unknown> {
  const key = String(args.key ?? "").trim();
  if (!key) throw new Error("key is required (e.g. OL23919A).");
  const cleanKey = key.replace(/^\//, "");
  return olCall(`/authors/${cleanKey}/works.json`);
}

export async function openlibraryTrending(_args: Record<string, unknown>): Promise<unknown> {
  return olCall("/trending/daily.json");
}
