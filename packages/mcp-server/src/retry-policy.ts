export interface RetryOptions {
  maxAttempts: number;
  baseDelayMs?: number;
  maxDelayMs?: number;
  backoffFactor?: number;
  retryIf?: (error: Error) => boolean;
  onRetry?: (error: Error, attempt: number) => void;
}

export async function retry<T>(fn: () => Promise<T>, options: RetryOptions): Promise<T> {
  const {
    maxAttempts,
    baseDelayMs = 1000,
    maxDelayMs = 30000,
    backoffFactor = 2,
    retryIf,
    onRetry,
  } = options;

  let lastError: Error | undefined;
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await fn();
    } catch (e) {
      lastError = e instanceof Error ? e : new Error(String(e));
      if (attempt === maxAttempts) break;
      if (retryIf && !retryIf(lastError)) break;
      if (onRetry) onRetry(lastError, attempt);
      const delay = Math.min(baseDelayMs * backoffFactor ** (attempt - 1), maxDelayMs);
      await sleep(delay);
    }
  }
  throw lastError;
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
