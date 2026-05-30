// OMDB (Open Movie Database) API integration for the UnClick MCP server.
// Uses the OMDB REST API via fetch - no external dependencies.
// Requires OMDB_API_KEY environment variable.

const OMDB_BASE = "http://www.omdbapi.com/";

// ─── API helper ───────────────────────────────────────────────────────────────

function requireApiKey(): string {
  const key = process.env.OMDB_API_KEY?.trim() ?? "";
  if (!key) throw new Error("OMDB_API_KEY environment variable is not set.");
  return key;
}

async function omdbCall(params: Record<string, string | number | undefined>): Promise<unknown> {
  const apiKey = requireApiKey();
  const url = new URL(OMDB_BASE);
  url.searchParams.set("apikey", apiKey);

  for (const [k, v] of Object.entries(params)) {
    if (v !== undefined && v !== "") {
      url.searchParams.set(k, String(v));
    }
  }

  const response = await fetch(url.toString());
  if (!response.ok) {
    throw new Error(`HTTP ${response.status} from OMDB API`);
  }

  const data = (await response.json()) as Record<string, unknown>;

  if (data.Response === "False") {
    throw new Error(`OMDB API error: ${data.Error ?? "Unknown error"}`);
  }

  return data;
}

// ─── Tools ────────────────────────────────────────────────────────────────────

export async function omdbSearch(args: Record<string, unknown>): Promise<unknown> {
  const s = String(args.s ?? "").trim();
  if (!s) throw new Error("s (search query) is required.");
  const params: Record<string, string | number | undefined> = { s };
  if (args.type) params.type = String(args.type);
  if (args.y) params.y = String(args.y);
  if (args.page) params.page = Number(args.page);
  return omdbCall(params);
}

export async function omdbGetByTitle(args: Record<string, unknown>): Promise<unknown> {
  const t = String(args.t ?? "").trim();
  if (!t) throw new Error("t (title) is required.");
  const params: Record<string, string | number | undefined> = { t };
  if (args.type) params.type = String(args.type);
  if (args.y) params.y = String(args.y);
  return omdbCall(params);
}

export async function omdbGetById(args: Record<string, unknown>): Promise<unknown> {
  const i = String(args.i ?? "").trim();
  if (!i) throw new Error("i (IMDb ID) is required.");
  return omdbCall({ i });
}
