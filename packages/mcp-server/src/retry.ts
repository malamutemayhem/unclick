export interface RetryOptions {
  maxAttempts?: number;
  initialDelayMs?: number;
  maxDelayMs?: number;
  backoffMultiplier?: number;
  shouldRetry?: (error: Error, attempt: number) => boolean;
  onRetry?: (error: Error, attempt: number, delayMs: number) => void;
}

export async function retry<T>(
  fn: () => Promise<T>,
  options?: RetryOptions
): Promise<T> {
  const maxAttempts = options?.maxAttempts ?? 3;
  const initialDelay = options?.initialDelayMs ?? 1000;
  const maxDelay = options?.maxDelayMs ?? 30000;
  const multiplier = options?.backoffMultiplier ?? 2;
  const shouldRetry = options?.shouldRetry ?? (() => true);

  let lastError: Error | undefined;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await fn();
    } catch (e) {
      lastError = e instanceof Error ? e : new Error(String(e));
      if (attempt === maxAttempts || !shouldRetry(lastError, attempt)) {
        throw lastError;
      }
      const delay = Math.min(initialDelay * Math.pow(multiplier, attempt - 1), maxDelay);
      if (options?.onRetry) options.onRetry(lastError, attempt, delay);
      await sleep(delay);
    }
  }

  throw lastError;
}

export async function retryWithTimeout<T>(
  fn: () => Promise<T>,
  timeoutMs: number,
  options?: RetryOptions
): Promise<T> {
  return Promise.race([
    retry(fn, options),
    new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error("Retry timed out")), timeoutMs)
    ),
  ]);
}

export function withRetry<T extends (...args: any[]) => Promise<any>>(
  fn: T,
  options?: RetryOptions
): T {
  return ((...args: any[]) => retry(() => fn(...args), options)) as T;
}

export function isRetryable(error: Error): boolean {
  const msg = error.message.toLowerCase();
  return msg.includes("timeout") ||
    msg.includes("econnreset") ||
    msg.includes("econnrefused") ||
    msg.includes("rate limit") ||
    msg.includes("429") ||
    msg.includes("503") ||
    msg.includes("502");
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
