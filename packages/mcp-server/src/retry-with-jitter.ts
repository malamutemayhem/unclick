export interface RetryOptions {
  maxRetries?: number;
  baseDelay?: number;
  maxDelay?: number;
  jitter?: "full" | "equal" | "none";
  shouldRetry?: (error: any) => boolean;
  onRetry?: (attempt: number, error: any, delay: number) => void;
}

export async function retryWithJitter<T>(
  fn: () => Promise<T>,
  options: RetryOptions = {}
): Promise<T> {
  const {
    maxRetries = 3,
    baseDelay = 1000,
    maxDelay = 30000,
    jitter = "full",
    shouldRetry = () => true,
    onRetry,
  } = options;

  let lastError: any;
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (err) {
      lastError = err;
      if (attempt >= maxRetries || !shouldRetry(err)) throw err;

      const exponential = Math.min(baseDelay * Math.pow(2, attempt), maxDelay);
      const delay = computeJitter(exponential, jitter);

      onRetry?.(attempt + 1, err, delay);
      await sleep(delay);
    }
  }
  throw lastError;
}

function computeJitter(delay: number, mode: "full" | "equal" | "none"): number {
  if (mode === "none") return delay;
  if (mode === "full") return Math.random() * delay;
  return delay / 2 + Math.random() * (delay / 2);
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function computeDelay(
  attempt: number,
  baseDelay: number,
  maxDelay: number,
  jitter: "full" | "equal" | "none" = "full"
): number {
  const exponential = Math.min(baseDelay * Math.pow(2, attempt), maxDelay);
  return computeJitter(exponential, jitter);
}
