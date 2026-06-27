export interface BackoffOptions {
  baseMs?: number;
  maxMs?: number;
  factor?: number;
  jitter?: boolean;
}

export function exponentialBackoff(attempt: number, opts: BackoffOptions = {}): number {
  const base = opts.baseMs ?? 1000;
  const max = opts.maxMs ?? 30000;
  const factor = opts.factor ?? 2;
  const jitter = opts.jitter ?? true;

  const delay = Math.min(base * Math.pow(factor, attempt), max);
  if (!jitter) return delay;
  return Math.round(delay * (0.5 + Math.random() * 0.5));
}

export function linearBackoff(attempt: number, opts: { stepMs?: number; maxMs?: number } = {}): number {
  const step = opts.stepMs ?? 1000;
  const max = opts.maxMs ?? 30000;
  return Math.min(step * (attempt + 1), max);
}

export function constantBackoff(ms = 1000): number {
  return ms;
}

export type BackoffStrategy = (attempt: number) => number;

export async function retryWithBackoff<T>(
  fn: () => Promise<T>,
  opts: {
    maxAttempts?: number;
    backoff?: BackoffStrategy;
    shouldRetry?: (error: unknown) => boolean;
    onRetry?: (error: unknown, attempt: number, delayMs: number) => void;
  } = {},
): Promise<T> {
  const maxAttempts = opts.maxAttempts ?? 3;
  const backoff = opts.backoff ?? ((a) => exponentialBackoff(a));
  const shouldRetry = opts.shouldRetry ?? (() => true);

  let lastError: unknown;
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    try {
      return await fn();
    } catch (err) {
      lastError = err;
      if (attempt + 1 >= maxAttempts || !shouldRetry(err)) throw err;
      const delay = backoff(attempt);
      opts.onRetry?.(err, attempt, delay);
      await sleep(delay);
    }
  }
  throw lastError;
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
