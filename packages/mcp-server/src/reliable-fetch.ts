/**
 * reliableFetch: shared resilience and telemetry layer for connector HTTP calls.
 *
 * Today every connector hand-rolls AbortController timeouts and 429 wording,
 * and nothing in the call path retries, backs off, breaks circuits, or records
 * per-tool latency and error rates. This module is the one shared substrate:
 *
 *   - per-attempt timeout (AbortController), with the connector standard's
 *     error wording ("<Service> request timed out after Xms.")
 *   - polite retries with exponential backoff and jitter for transient
 *     failures (network errors, timeouts, 408/429/5xx), honoring Retry-After
 *   - retries only for idempotent requests (GET/HEAD, or opts.idempotent)
 *     so a flaky network can never double-send a write
 *   - a per-tool circuit breaker: after consecutive hard failures the tool
 *     fails fast with a clear cooldown message instead of hammering a dead
 *     upstream
 *   - per-tool in-process telemetry (calls, errors, latency, rate-limit hits,
 *     retries, breaker state), readable via the tool_stats endpoint
 *
 * Contract with connectors: reliableFetch RETURNS every HTTP response,
 * including the final 429/5xx after retries are exhausted, so each connector
 * keeps its own two-lane error mapping and wording. It THROWS only for
 * timeouts, network failures, and an open circuit.
 *
 * Telemetry is per warm process (serverless instance), not durable analytics.
 * That is the useful scope for agents: "this tool failed 4 times in a row in
 * this session, stop calling it for a minute."
 */

const DEFAULT_TIMEOUT_MS = 15000;
const DEFAULT_RETRIES = 2;
const DEFAULT_BASE_DELAY_MS = 300;
const MAX_RETRY_DELAY_MS = 10_000;
const BREAKER_THRESHOLD = 5;
const BREAKER_COOLDOWN_MS = 60_000;

export interface ReliableFetchOptions {
  /** Telemetry key, normally the connector slug (e.g. "abuseipdb"). */
  tool: string;
  /** Human service name for error messages. Defaults to the tool slug. */
  service?: string;
  init?: RequestInit;
  /** Per-attempt timeout. Connectors keep their own env-var defaults. */
  timeoutMs?: number;
  /** Max retries after the first attempt for transient failures. Default 2. */
  retries?: number;
  /** Force retry eligibility for non-GET requests that are safe to repeat. */
  idempotent?: boolean;
  /** Base backoff delay, exposed for tests. Default 300ms. */
  baseDelayMs?: number;
}

export type ToolBreakerState = "closed" | "open" | "half_open";

export interface ToolCallStats {
  tool: string;
  calls: number;
  ok: number;
  errors: number;
  timeouts: number;
  network_errors: number;
  http_5xx: number;
  rate_limited: number;
  retries: number;
  consecutive_failures: number;
  breaker: { state: ToolBreakerState; opened_at: string | null; retry_after_ms: number };
  latency_ms: { count: number; mean: number; min: number; max: number; last: number };
  last_status: number | null;
  last_error: string | null;
  last_call_at: string | null;
}

interface ToolRecord {
  stats: ToolCallStats;
  breakerOpenedAtMs: number | null;
  halfOpenProbeInFlight: boolean;
}

const registry = new Map<string, ToolRecord>();

function breakerEnabled(): boolean {
  return process.env.UNCLICK_RELIABLE_FETCH_BREAKER !== "0";
}

function defaultBaseDelayMs(): number {
  const raw = Number(process.env.UNCLICK_RELIABLE_FETCH_BASE_DELAY_MS);
  return Number.isFinite(raw) && raw >= 0 ? raw : DEFAULT_BASE_DELAY_MS;
}

function record(tool: string): ToolRecord {
  let entry = registry.get(tool);
  if (!entry) {
    entry = {
      stats: {
        tool,
        calls: 0,
        ok: 0,
        errors: 0,
        timeouts: 0,
        network_errors: 0,
        http_5xx: 0,
        rate_limited: 0,
        retries: 0,
        consecutive_failures: 0,
        breaker: { state: "closed", opened_at: null, retry_after_ms: 0 },
        latency_ms: { count: 0, mean: 0, min: 0, max: 0, last: 0 },
        last_status: null,
        last_error: null,
        last_call_at: null,
      },
      breakerOpenedAtMs: null,
      halfOpenProbeInFlight: false,
    };
    registry.set(tool, entry);
  }
  return entry;
}

function noteLatency(stats: ToolCallStats, ms: number): void {
  const lat = stats.latency_ms;
  lat.count += 1;
  lat.mean = lat.mean + (ms - lat.mean) / lat.count;
  lat.min = lat.count === 1 ? ms : Math.min(lat.min, ms);
  lat.max = Math.max(lat.max, ms);
  lat.last = ms;
}

function noteFailure(entry: ToolRecord, kind: "timeout" | "network" | "http_5xx", detail: string): void {
  const s = entry.stats;
  s.errors += 1;
  if (kind === "timeout") s.timeouts += 1;
  if (kind === "network") s.network_errors += 1;
  if (kind === "http_5xx") s.http_5xx += 1;
  s.consecutive_failures += 1;
  s.last_error = detail.slice(0, 300);
  if (breakerEnabled() && s.consecutive_failures >= BREAKER_THRESHOLD && s.breaker.state !== "open") {
    s.breaker.state = "open";
    s.breaker.opened_at = new Date().toISOString();
    entry.breakerOpenedAtMs = Date.now();
  }
}

function noteUpstreamAlive(entry: ToolRecord): void {
  const s = entry.stats;
  s.consecutive_failures = 0;
  s.breaker.state = "closed";
  s.breaker.opened_at = null;
  s.breaker.retry_after_ms = 0;
  entry.breakerOpenedAtMs = null;
  entry.halfOpenProbeInFlight = false;
}

/** Snapshot of per-tool stats for this process, busiest tools first. */
export function getToolStats(): ToolCallStats[] {
  const out: ToolCallStats[] = [];
  for (const entry of registry.values()) {
    refreshBreaker(entry);
    out.push(JSON.parse(JSON.stringify(entry.stats)) as ToolCallStats);
  }
  return out.sort((a, b) => b.calls - a.calls);
}

/** Test hook: clear all per-tool stats and breaker state. */
export function resetToolTelemetry(): void {
  registry.clear();
}

function refreshBreaker(entry: ToolRecord): void {
  const s = entry.stats;
  if (s.breaker.state === "open" && entry.breakerOpenedAtMs !== null) {
    const elapsed = Date.now() - entry.breakerOpenedAtMs;
    if (elapsed >= BREAKER_COOLDOWN_MS) {
      s.breaker.state = "half_open";
      s.breaker.retry_after_ms = 0;
    } else {
      s.breaker.retry_after_ms = BREAKER_COOLDOWN_MS - elapsed;
    }
  }
}

function isIdempotent(init: RequestInit | undefined, override?: boolean): boolean {
  if (override !== undefined) return override;
  const method = (init?.method ?? "GET").toUpperCase();
  return method === "GET" || method === "HEAD";
}

function retryDelayMs(attempt: number, baseDelayMs: number, res?: Response): number {
  if (res) {
    const header = res.headers?.get?.("retry-after");
    if (header) {
      const seconds = Number(header);
      if (Number.isFinite(seconds) && seconds >= 0) {
        return Math.min(seconds * 1000, MAX_RETRY_DELAY_MS);
      }
      const dated = Date.parse(header);
      if (Number.isFinite(dated)) {
        return Math.min(Math.max(dated - Date.now(), 0), MAX_RETRY_DELAY_MS);
      }
    }
  }
  const exponential = baseDelayMs * 2 ** attempt;
  const jitter = Math.floor(Math.random() * 100);
  return Math.min(exponential + jitter, MAX_RETRY_DELAY_MS);
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function isRetryableStatus(status: number): boolean {
  return status === 408 || status === 429 || status === 502 || status === 503 || status === 504;
}

/**
 * Fetch with timeout, polite retries, a per-tool circuit breaker, and
 * telemetry. Returns every HTTP response (the connector keeps its own status
 * mapping and wording); throws only on timeout, network failure, or an open
 * circuit.
 */
export async function reliableFetch(url: string, opts: ReliableFetchOptions): Promise<Response> {
  const entry = record(opts.tool);
  const stats = entry.stats;
  const service = opts.service ?? opts.tool;
  const timeoutMs = opts.timeoutMs ?? DEFAULT_TIMEOUT_MS;
  const baseDelayMs = opts.baseDelayMs ?? defaultBaseDelayMs();
  const canRetry = isIdempotent(opts.init, opts.idempotent);
  const maxRetries = canRetry ? (opts.retries ?? DEFAULT_RETRIES) : 0;

  refreshBreaker(entry);
  if (stats.breaker.state === "open") {
    const retryS = Math.ceil(stats.breaker.retry_after_ms / 1000);
    throw new Error(
      `${service} is temporarily unavailable (circuit open after ${stats.consecutive_failures} consecutive failures). Retry in ~${retryS}s.`
    );
  }
  if (stats.breaker.state === "half_open") {
    if (entry.halfOpenProbeInFlight) {
      throw new Error(
        `${service} is recovering from repeated failures; a probe request is already in flight. Retry shortly.`
      );
    }
    entry.halfOpenProbeInFlight = true;
  }

  stats.calls += 1;
  stats.last_call_at = new Date().toISOString();

  let lastFailure: { kind: "timeout" | "network"; message: string } | null = null;
  let lastResponse: Response | null = null;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    if (attempt > 0) {
      stats.retries += 1;
      await sleep(retryDelayMs(attempt - 1, baseDelayMs, lastResponse ?? undefined));
    }

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);
    const startedAt = Date.now();
    let res: Response;
    try {
      res = await fetch(url, { ...(opts.init ?? {}), signal: controller.signal });
    } catch (err) {
      const isAbort = err instanceof Error && err.name === "AbortError";
      lastFailure = isAbort
        ? { kind: "timeout", message: `${service} request timed out after ${timeoutMs}ms.` }
        : {
            kind: "network",
            message: `${service} network error: ${err instanceof Error ? err.message : String(err)}`,
          };
      lastResponse = null;
      continue;
    } finally {
      clearTimeout(timer);
    }

    noteLatency(stats, Date.now() - startedAt);
    stats.last_status = res.status;
    if (res.status === 429) stats.rate_limited += 1;

    if (isRetryableStatus(res.status) && attempt < maxRetries) {
      lastResponse = res;
      lastFailure = null;
      continue;
    }

    // Final outcome with a real HTTP response. 5xx counts against the
    // breaker (upstream unhealthy); anything else proves the upstream alive.
    if (res.status >= 500) {
      noteFailure(entry, "http_5xx", `HTTP ${res.status}`);
    } else {
      noteUpstreamAlive(entry);
      if (res.ok) {
        stats.ok += 1;
        stats.last_error = null;
      }
    }
    entry.halfOpenProbeInFlight = false;
    return res;
  }

  // Reachable only when the final attempt threw (timeout or network error);
  // a final attempt that produced any HTTP response returned inside the loop.
  entry.halfOpenProbeInFlight = false;
  const failure = lastFailure ?? { kind: "network" as const, message: `${service} network error: unknown` };
  noteFailure(entry, failure.kind, failure.message);
  throw new Error(failure.message);
}
