// Shared HTTP client for connectors.
// Eliminates the per-connector reimplementation of timeout, abort, error
// classification, and retry-after extraction. Inspired by the observation
// that every *-tool.ts file copies the same AbortController + try/catch +
// status-switch boilerplate. Drop-in replacement for hand-rolled helpers.

export interface ConnectorFetchOptions {
  /** Base URL for the API (no trailing slash). */
  baseUrl: string;
  /** HTTP method. */
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  /** URL path appended to baseUrl (include leading slash). */
  path: string;
  /** Query parameters (GET) or form body fields (POST form). */
  params?: Record<string, string | number | boolean | undefined>;
  /** Headers merged with defaults. */
  headers?: Record<string, string>;
  /** JSON body (mutually exclusive with params-as-form). */
  json?: unknown;
  /** Override timeout in ms (default: per-connector env or 15 000). */
  timeoutMs?: number;
  /** Connector name for timeout env lookup and error messages. */
  connectorName: string;
  /** Send params as x-www-form-urlencoded body on POST (default: false). */
  formEncoded?: boolean;
}

export interface ConnectorFetchSuccess {
  ok: true;
  status: number;
  data: unknown;
  headers: Headers;
}

export interface ConnectorFetchError {
  ok: false;
  error: string;
  status?: number;
  retry_after?: number;
}

export type ConnectorFetchResult = ConnectorFetchSuccess | ConnectorFetchError;

function envTimeout(connectorName: string, fallback: number): number {
  const envKey = `${connectorName.toUpperCase().replace(/-/g, "_")}_TIMEOUT_MS`;
  const val = process.env[envKey];
  return val ? Number(val) || fallback : fallback;
}

export async function connectorFetch(
  opts: ConnectorFetchOptions,
): Promise<ConnectorFetchResult> {
  const method = opts.method ?? "GET";
  const timeoutMs = opts.timeoutMs ?? envTimeout(opts.connectorName, 15_000);
  const url = new URL(`${opts.baseUrl}${opts.path}`);
  const label = opts.connectorName;

  let body: string | undefined;
  const headers: Record<string, string> = { ...opts.headers };

  if (opts.json !== undefined) {
    headers["Content-Type"] ??= "application/json";
    body = JSON.stringify(opts.json);
  } else if (opts.params) {
    if (method === "GET" || method === "DELETE") {
      for (const [k, v] of Object.entries(opts.params)) {
        if (v !== undefined) url.searchParams.set(k, String(v));
      }
    } else if (opts.formEncoded !== false) {
      headers["Content-Type"] ??= "application/x-www-form-urlencoded";
      const form = new URLSearchParams();
      for (const [k, v] of Object.entries(opts.params)) {
        if (v !== undefined) form.set(k, String(v));
      }
      body = form.toString();
    }
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  let response: Response;
  try {
    response = await fetch(url.toString(), {
      method,
      headers,
      body,
      signal: controller.signal,
    });
  } catch (err) {
    if (err instanceof Error && err.name === "AbortError") {
      return { ok: false, error: `${label} request timed out after ${timeoutMs}ms.` };
    }
    return {
      ok: false,
      error: `${label} network error: ${err instanceof Error ? err.message : String(err)}`,
    };
  } finally {
    clearTimeout(timer);
  }

  if (response.status === 429) {
    const retryAfter = response.headers.get("Retry-After");
    return {
      ok: false,
      error: `${label} rate limit reached.`,
      status: 429,
      retry_after: retryAfter ? Number(retryAfter) : 5,
    };
  }

  if (response.status === 401 || response.status === 403) {
    return {
      ok: false,
      error: `${label} auth failed (HTTP ${response.status}).`,
      status: response.status,
    };
  }

  let data: unknown;
  try {
    const ct = response.headers.get("Content-Type") ?? "";
    data = ct.includes("application/json") || ct === ""
      ? await response.json()
      : await response.text();
  } catch {
    return {
      ok: false,
      error: `${label} non-parseable response (HTTP ${response.status}).`,
      status: response.status,
    };
  }

  if (!response.ok) {
    const d = data as Record<string, unknown> | undefined;
    const msg =
      (d && typeof d === "object"
        ? (d["error"] as Record<string, unknown>)?.["message"] ??
          d["message"] ??
          d["error"]
        : undefined) ?? `${label} API error`;
    return {
      ok: false,
      error: String(msg),
      status: response.status,
    };
  }

  return { ok: true, status: response.status, data, headers: response.headers };
}

// Convenience: unwrap a success or return the error object directly.
// Matches the existing connector pattern where handlers return { error: "..." }.
export function unwrapOrError(result: ConnectorFetchResult): unknown {
  if (result.ok) return result.data;
  const out: Record<string, unknown> = { error: result.error };
  if (result.status) out.status = result.status;
  if (result.retry_after) out.retry_after = result.retry_after;
  return out;
}
