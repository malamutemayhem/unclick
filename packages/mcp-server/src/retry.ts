export type BackoffStrategy = "exponential" | "linear" | "constant";

export interface RetryOptions {
  maxAttempts: number;
  baseDelayMs?: number;
  maxDelayMs?: number;
  backoff?: BackoffStrategy;
  retryOn?: (error: unknown) => boolean;
}

function computeDelay(attempt: number, options: Required<RetryOptions>): number {
  let delay: number;
  switch (options.backoff) {
    case "exponential":
      delay = options.baseDelayMs * Math.pow(2, attempt);
      break;
    case "linear":
      delay = options.baseDelayMs * (attempt + 1);
      break;
    case "constant":
    default:
      delay = options.baseDelayMs;
      break;
  }
  return Math.min(delay, options.maxDelayMs);
}

export async function retry<T>(fn: () => Promise<T>, options: RetryOptions): Promise<T> {
  const opts: Required<RetryOptions> = {
    baseDelayMs: 1000,
    maxDelayMs: 30000,
    backoff: "exponential",
    retryOn: () => true,
    ...options,
  };

  let lastError: unknown;
  for (let attempt = 0; attempt < opts.maxAttempts; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      if (attempt >= opts.maxAttempts - 1) break;
      if (!opts.retryOn(error)) break;
      const delay = computeDelay(attempt, opts);
      await new Promise((r) => setTimeout(r, delay));
    }
  }
  throw lastError;
}

export function withRetry<T>(fn: () => Promise<T>, options: RetryOptions): () => Promise<T> {
  return () => retry(fn, options);
}
