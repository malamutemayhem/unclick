export interface RetryOptions {
  maxAttempts?: number;
  delayMs?: number;
  backoffMultiplier?: number;
  onRetry?: (attempt: number, error: unknown) => void;
}

export async function retryWithFallback<T>(
  primary: () => Promise<T>,
  fallback: () => Promise<T>,
  options: RetryOptions = {},
): Promise<T> {
  const { maxAttempts = 3, delayMs = 100, backoffMultiplier = 2, onRetry } = options;
  let lastError: unknown;
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await primary();
    } catch (err) {
      lastError = err;
      if (onRetry) onRetry(attempt, err);
      if (attempt < maxAttempts) {
        await sleep(delayMs * backoffMultiplier ** (attempt - 1));
      }
    }
  }
  try {
    return await fallback();
  } catch (fallbackError) {
    throw new AggregateError([lastError, fallbackError], "Both primary and fallback failed");
  }
}

export async function retryUntil<T>(
  fn: () => Promise<T>,
  predicate: (result: T) => boolean,
  maxAttempts = 5,
  delayMs = 100,
): Promise<T> {
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    const result = await fn();
    if (predicate(result)) return result;
    if (attempt < maxAttempts) await sleep(delayMs);
  }
  throw new Error(`Predicate not satisfied after ${maxAttempts} attempts`);
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
