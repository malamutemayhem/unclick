// Canonical error shape for all tool responses.
// Replaces the ad-hoc { error: string } pattern scattered across 100+ tools
// with a structured envelope that agents and retry logic can act on.

export type ErrorCode =
  | "AUTH_INVALID"
  | "AUTH_EXPIRED"
  | "AUTH_MISSING"
  | "RATE_LIMITED"
  | "NOT_FOUND"
  | "VALIDATION"
  | "TIMEOUT"
  | "NETWORK"
  | "UPSTREAM"
  | "PERMISSION"
  | "UNKNOWN";

export interface NormalizedError {
  code: ErrorCode;
  message: string;
  retriable: boolean;
  retryAfterMs?: number;
  upstream?: {
    status?: number;
    body?: string;
  };
}

export function normalizeError(err: unknown): NormalizedError {
  if (isNormalizedError(err)) return err;

  if (err instanceof Response || isResponseLike(err)) {
    return fromHttpStatus(err as ResponseLike);
  }

  if (err instanceof Error) {
    return fromError(err);
  }

  if (typeof err === "string") {
    return { code: "UNKNOWN", message: err, retriable: false };
  }

  if (typeof err === "object" && err !== null && "error" in err) {
    const msg = String((err as Record<string, unknown>).error);
    return { code: "UNKNOWN", message: msg, retriable: false };
  }

  return { code: "UNKNOWN", message: String(err), retriable: false };
}

function fromHttpStatus(res: ResponseLike): NormalizedError {
  const status = res.status;
  const body = typeof res.body === "string" ? res.body : undefined;

  if (status === 401) {
    return { code: "AUTH_INVALID", message: "Authentication failed", retriable: false, upstream: { status, body } };
  }
  if (status === 403) {
    return { code: "PERMISSION", message: "Insufficient permissions", retriable: false, upstream: { status, body } };
  }
  if (status === 404) {
    return { code: "NOT_FOUND", message: "Resource not found", retriable: false, upstream: { status, body } };
  }
  if (status === 429) {
    const retryAfter = typeof res.headers?.get === "function"
      ? res.headers.get("retry-after")
      : undefined;
    const retryAfterMs = retryAfter ? parseRetryAfter(retryAfter) : undefined;
    return { code: "RATE_LIMITED", message: "Rate limit exceeded", retriable: true, retryAfterMs, upstream: { status, body } };
  }
  if (status >= 500) {
    return { code: "UPSTREAM", message: `Upstream error (${status})`, retriable: true, upstream: { status, body } };
  }
  return { code: "UNKNOWN", message: `HTTP ${status}`, retriable: false, upstream: { status, body } };
}

const NETWORK_PATTERNS = [
  "ECONNRESET", "ECONNREFUSED", "ENOTFOUND", "ETIMEDOUT",
  "socket hang up", "fetch failed", "network",
];

const TIMEOUT_PATTERNS = ["timeout", "aborted", "AbortError", "ETIMEDOUT"];

function fromError(err: Error): NormalizedError {
  const msg = err.message.toLowerCase();

  if (TIMEOUT_PATTERNS.some((p) => msg.includes(p.toLowerCase()) || err.name === p)) {
    return { code: "TIMEOUT", message: err.message, retriable: true };
  }
  if (NETWORK_PATTERNS.some((p) => msg.includes(p.toLowerCase()))) {
    return { code: "NETWORK", message: err.message, retriable: true };
  }
  if (msg.includes("unauthorized") || msg.includes("invalid api key") || msg.includes("invalid token")) {
    return { code: "AUTH_INVALID", message: err.message, retriable: false };
  }
  if (msg.includes("expired")) {
    return { code: "AUTH_EXPIRED", message: err.message, retriable: false };
  }

  return { code: "UNKNOWN", message: err.message, retriable: false };
}

function parseRetryAfter(value: string): number | undefined {
  const seconds = Number(value);
  if (Number.isFinite(seconds) && seconds > 0) return seconds * 1000;
  const date = Date.parse(value);
  if (!Number.isNaN(date)) return Math.max(0, date - Date.now());
  return undefined;
}

export function isNormalizedError(val: unknown): val is NormalizedError {
  if (typeof val !== "object" || val === null) return false;
  const obj = val as Record<string, unknown>;
  return typeof obj.code === "string" && typeof obj.message === "string" && typeof obj.retriable === "boolean";
}

interface ResponseLike {
  status: number;
  body?: unknown;
  headers?: { get(name: string): string | null };
}

function isResponseLike(val: unknown): val is ResponseLike {
  if (typeof val !== "object" || val === null) return false;
  return typeof (val as Record<string, unknown>).status === "number";
}

export function errorSummary(err: NormalizedError): string {
  const parts = [err.code, err.message];
  if (err.retriable) parts.push("(retriable)");
  if (err.retryAfterMs) parts.push(`retry in ${Math.ceil(err.retryAfterMs / 1000)}s`);
  return parts.join(" - ");
}
