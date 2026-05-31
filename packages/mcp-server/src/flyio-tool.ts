// Fly.io Machines API integration for the UnClick MCP server.
// Uses the Fly.io Machines REST API via fetch - no external dependencies.
// Users must supply an API token from fly.io (fly auth token).

const FLY_API_BASE = "https://api.machines.dev/v1";

// ── Types ─────────────────────────────────────────────────────────────────────

interface FlyMachineConfig {
  image: string;
  env?: Record<string, string>;
  services?: unknown[];
}

// ── Fetch helper ──────────────────────────────────────────────────────────────

async function flyFetch(
  apiKey: string,
  method: "GET" | "POST" | "DELETE",
  path: string,
  body?: unknown,
  query?: Record<string, string | boolean | undefined>
): Promise<unknown> {
  const url = new URL(`${FLY_API_BASE}${path}`);
  if (query) {
    for (const [k, v] of Object.entries(query)) {
      if (v !== undefined && v !== "") url.searchParams.set(k, String(v));
    }
  }

  const headers: Record<string, string> = {
    Authorization: `Bearer ${apiKey}`,
    Accept: "application/json",
  };
  if (body !== undefined) headers["Content-Type"] = "application/json";

  const FLYIO_TIMEOUT_MS = Number(process.env.FLYIO_TIMEOUT_MS) || 15000;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), FLYIO_TIMEOUT_MS);
  let response: Response;
  try {
    response = await fetch(url.toString(), {
      method,
      headers,
      body: body !== undefined ? JSON.stringify(body) : undefined,
      signal: controller.signal,
    });
  } catch (err) {
    if (err instanceof Error && err.name === "AbortError") {
      return { error: `Fly.io API request timed out after ${FLYIO_TIMEOUT_MS}ms.` };
    }
    return { error: `Network error reaching Fly.io API: ${err instanceof Error ? err.message : String(err)}` };
  } finally {
    clearTimeout(timer);
  }

  // 204 No Content
  if (response.status === 204) return { success: true };

  if (response.status === 429) return { error: "Fly.io API rate limit exceeded. Please wait and retry.", status: 429 };

  const text = await response.text();
  let data: unknown;
  try { data = JSON.parse(text); } catch { data = { raw: text }; }

  if (response.status === 401) return { error: "Fly.io API token is invalid or expired. Check your api_key.", status: 401 };
  if (response.status === 403) return { error: "Fly.io API: insufficient permissions.", status: 403 };
  if (response.status === 404) return { error: "Resource not found. Check the app_name or machine ID.", status: 404 };

  if (!response.ok) {
    const errData = data as Record<string, unknown>;
    const detail = errData?.error ?? errData?.message ?? text;
    return { error: `Fly.io API error ${response.status}: ${detail}`, status: response.status };
  }

  return data;
}

// ── Operations ────────────────────────────────────────────────────────────────

export async function flyListApps(args: Record<string, unknown>): Promise<unknown> {
  const apiKey = String(args.api_key ?? process.env.FLY_API_KEY ?? "").trim();
  if (!apiKey) return { error: "api_key is required. Get one by running 'fly auth token'." };

  try {
    const query: Record<string, string | undefined> = {};
    if (args.org_slug) query.org_slug = String(args.org_slug);

    return flyFetch(apiKey, "GET", "/apps", undefined, query);
  } catch (err) {
    return { error: err instanceof Error ? err.message : String(err) };
  }
}

export async function flyGetApp(args: Record<string, unknown>): Promise<unknown> {
  const apiKey = String(args.api_key ?? process.env.FLY_API_KEY ?? "").trim();
  if (!apiKey) return { error: "api_key is required. Get one by running 'fly auth token'." };
  const appName = String(args.app_name ?? "").trim();
  if (!appName) return { error: "app_name is required." };

  try {
    return flyFetch(apiKey, "GET", `/apps/${encodeURIComponent(appName)}`);
  } catch (err) {
    return { error: err instanceof Error ? err.message : String(err) };
  }
}

export async function flyListMachines(args: Record<string, unknown>): Promise<unknown> {
  const apiKey = String(args.api_key ?? process.env.FLY_API_KEY ?? "").trim();
  if (!apiKey) return { error: "api_key is required. Get one by running 'fly auth token'." };
  const appName = String(args.app_name ?? "").trim();
  if (!appName) return { error: "app_name is required." };

  try {
    const query: Record<string, boolean | undefined> = {};
    if (args.include_deleted !== undefined) query.include_deleted = Boolean(args.include_deleted);

    return flyFetch(apiKey, "GET", `/apps/${encodeURIComponent(appName)}/machines`, undefined, query);
  } catch (err) {
    return { error: err instanceof Error ? err.message : String(err) };
  }
}

export async function flyCreateMachine(args: Record<string, unknown>): Promise<unknown> {
  const apiKey = String(args.api_key ?? process.env.FLY_API_KEY ?? "").trim();
  if (!apiKey) return { error: "api_key is required. Get one by running 'fly auth token'." };
  const appName = String(args.app_name ?? "").trim();
  if (!appName) return { error: "app_name is required." };
  const image = String(args.image ?? "").trim();
  if (!image) return { error: "image is required (Docker image reference, e.g. 'nginx:latest')." };

  try {
    // Parse optional env (accept JSON string or object)
    let env: Record<string, string> | undefined;
    if (args.env !== undefined) {
      if (typeof args.env === "string") {
        try { env = JSON.parse(args.env); }
        catch { return { error: "env must be a JSON object or a valid JSON string representing an object." }; }
      } else if (typeof args.env === "object" && !Array.isArray(args.env)) {
        env = args.env as Record<string, string>;
      } else {
        return { error: "env must be a JSON object mapping environment variable names to string values." };
      }
    }

    const config: FlyMachineConfig = { image };
    if (env) config.env = env;
    if (args.services) config.services = Array.isArray(args.services) ? args.services : [];

    const body: Record<string, unknown> = { config };
    if (args.machine_name) body.name = String(args.machine_name);

    return flyFetch(apiKey, "POST", `/apps/${encodeURIComponent(appName)}/machines`, body);
  } catch (err) {
    return { error: err instanceof Error ? err.message : String(err) };
  }
}

export async function flyListVolumes(args: Record<string, unknown>): Promise<unknown> {
  const apiKey = String(args.api_key ?? process.env.FLY_API_KEY ?? "").trim();
  if (!apiKey) return { error: "api_key is required. Get one by running 'fly auth token'." };
  const appName = String(args.app_name ?? "").trim();
  if (!appName) return { error: "app_name is required." };

  try {
    return flyFetch(apiKey, "GET", `/apps/${encodeURIComponent(appName)}/volumes`);
  } catch (err) {
    return { error: err instanceof Error ? err.message : String(err) };
  }
}
