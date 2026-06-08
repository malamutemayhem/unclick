// Retry with exponential backoff for connector calls.
// OpenClaw retries 3 times with 1s/2s/4s delays. Our connectors currently
// have zero retry logic - a single transient 500 or network blip kills the
// whole call. This module gives connectors a simple way to retry without
// each one building its own loop.

export interface RetryOptions {
  /** Max number of retries (not counting the first attempt). Default: 3. */
  maxRetries?: number;
  /** Initial delay in ms before first retry. Default: 1000. */
  initialDelayMs?: number;
  /** Multiplier for each successive delay. Default: 2 (doubling). */
  backoffMultiplier?: number;
  /** Max delay cap in ms. Default: 10000. */
  maxDelayMs?: number;
  /** Which errors should trigger a retry. Default: transient errors only. */
  shouldRetry?: (error: unknown, attempt: number) => boolean;
}

export type RetryResult<T> =
  | { ok: true; data: T; attempts: number }
  | { ok: false; error: unknown; attempts: number };

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function isTransientError(error: unknown): boolean {
  if (error instanceof Error) {
    const msg = error.message.toLowerCase();
    if (msg.includes("econnreset") || msg.includes("econnrefused")) return true;
    if (msg.includes("socket hang up") || msg.includes("network")) return true;
    if (msg.includes("timeout") || msg.includes("timed out")) return true;
    if (error.name === "AbortError") return true;
  }
  return false;
}

function isRetryableStatus(error: unknown): boolean {
  if (error && typeof error === "object" && "status" in error) {
    const status = (error as { status: number }).status;
    return status === 429 || status === 502 || status === 503 || status === 504;
  }
  return false;
}

const defaultShouldRetry = (error: unknown): boolean =>
  isTransientError(error) || isRetryableStatus(error);

export async function withRetry<T>(
  fn: () => Promise<T>,
  opts: RetryOptions = {},
): Promise<RetryResult<T>> {
  const maxRetries = opts.maxRetries ?? 3;
  const initialDelay = opts.initialDelayMs ?? 1000;
  const multiplier = opts.backoffMultiplier ?? 2;
  const maxDelay = opts.maxDelayMs ?? 10_000;
  const shouldRetry = opts.shouldRetry ?? defaultShouldRetry;

  let lastError: unknown;
  let delay = initialDelay;

  for (let attempt = 1; attempt <= maxRetries + 1; attempt++) {
    try {
      const result = await fn();
      return { ok: true, data: result, attempts: attempt };
    } catch (err) {
      lastError = err;
      if (attempt > maxRetries || !shouldRetry(err, attempt)) {
        return { ok: false, error: err, attempts: attempt };
      }
      await sleep(Math.min(delay, maxDelay));
      delay *= multiplier;
    }
  }

  return { ok: false, error: lastError, attempts: maxRetries + 1 };
}

// Convenience: retry and either return the value or throw the last error.
export async function retryOrThrow<T>(
  fn: () => Promise<T>,
  opts: RetryOptions = {},
): Promise<T> {
  const result = await withRetry(fn, opts);
  if (result.ok) return result.data;
  throw result.error;
}
