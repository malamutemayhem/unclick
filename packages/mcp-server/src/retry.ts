export interface RetryOptions {
  maxAttempts?: number;
  delayMs?: number;
  backoff?: "fixed" | "linear" | "exponential";
  maxDelayMs?: number;
  shouldRetry?: (error: unknown, attempt: number) => boolean;
}

export async function retry<T>(fn: () => Promise<T>, options?: RetryOptions): Promise<T> {
  const maxAttempts = options?.maxAttempts ?? 3;
  const baseDelay = options?.delayMs ?? 1000;
  const backoff = options?.backoff ?? "exponential";
  const maxDelay = options?.maxDelayMs ?? 30000;
  const shouldRetry = options?.shouldRetry ?? (() => true);

  let lastError: unknown;
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await fn();
    } catch (err) {
      lastError = err;
      if (attempt === maxAttempts || !shouldRetry(err, attempt)) {
        throw lastError;
      }
      const delay = Math.min(computeDelay(baseDelay, attempt, backoff), maxDelay);
      await sleep(delay);
    }
  }
  throw lastError;
}

function computeDelay(base: number, attempt: number, backoff: string): number {
  switch (backoff) {
    case "linear": return base * attempt;
    case "exponential": return base * Math.pow(2, attempt - 1);
    default: return base;
  }
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export class CircuitBreaker {
  private failures = 0;
  private lastFailure = 0;
  private state: "closed" | "open" | "half-open" = "closed";
  private readonly threshold: number;
  private readonly resetMs: number;

  constructor(options?: { threshold?: number; resetMs?: number }) {
    this.threshold = options?.threshold ?? 5;
    this.resetMs = options?.resetMs ?? 30000;
  }

  async call<T>(fn: () => Promise<T>): Promise<T> {
    if (this.state === "open") {
      if (Date.now() - this.lastFailure >= this.resetMs) {
        this.state = "half-open";
      } else {
        throw new Error("Circuit breaker is open");
      }
    }
    try {
      const result = await fn();
      this.onSuccess();
      return result;
    } catch (err) {
      this.onFailure();
      throw err;
    }
  }

  private onSuccess(): void {
    this.failures = 0;
    this.state = "closed";
  }

  private onFailure(): void {
    this.failures++;
    this.lastFailure = Date.now();
    if (this.failures >= this.threshold) {
      this.state = "open";
    }
  }

  get currentState(): "closed" | "open" | "half-open" {
    return this.state;
  }

  reset(): void {
    this.failures = 0;
    this.lastFailure = 0;
    this.state = "closed";
  }
}
