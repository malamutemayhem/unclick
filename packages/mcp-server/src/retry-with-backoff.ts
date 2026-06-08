export interface BackoffOptions {
  maxRetries: number;
  initialDelay: number;
  maxDelay?: number;
  factor?: number;
  jitter?: boolean;
  retryIf?: (error: any) => boolean;
  onRetry?: (error: any, attempt: number) => void;
}

export async function retryWithBackoff<T>(
  fn: () => Promise<T>,
  options: BackoffOptions
): Promise<T> {
  const { maxRetries, initialDelay, maxDelay = Infinity, factor = 2, jitter = false, retryIf, onRetry } = options;

  let lastError: any;
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (err) {
      lastError = err;
      if (attempt === maxRetries) break;
      if (retryIf && !retryIf(err)) break;
      if (onRetry) onRetry(err, attempt + 1);
      let delay = Math.min(initialDelay * factor ** attempt, maxDelay);
      if (jitter) delay = delay * (0.5 + Math.random() * 0.5);
      await sleep(delay);
    }
  }
  throw lastError;
}

export function exponentialDelay(attempt: number, initialDelay: number, factor = 2, maxDelay = Infinity): number {
  return Math.min(initialDelay * factor ** attempt, maxDelay);
}

export function linearDelay(attempt: number, initialDelay: number, increment: number, maxDelay = Infinity): number {
  return Math.min(initialDelay + increment * attempt, maxDelay);
}

export function constantDelay(delay: number): number {
  return delay;
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
