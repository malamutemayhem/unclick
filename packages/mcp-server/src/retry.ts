export interface RetryOptions {
  maxAttempts?: number;
  initialDelay?: number;
  maxDelay?: number;
  backoffFactor?: number;
  jitter?: boolean;
  retryIf?: (error: unknown) => boolean;
  onRetry?: (error: unknown, attempt: number) => void;
}

const DEFAULTS: Required<Omit<RetryOptions, "retryIf" | "onRetry">> = {
  maxAttempts: 3,
  initialDelay: 1000,
  maxDelay: 30000,
  backoffFactor: 2,
  jitter: true,
};

export async function retry<T>(fn: () => Promise<T>, options: RetryOptions = {}): Promise<T> {
  const opts = { ...DEFAULTS, ...options };
  let lastError: unknown;

  for (let attempt = 1; attempt <= opts.maxAttempts; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      if (opts.retryIf && !opts.retryIf(error)) throw error;
      if (attempt === opts.maxAttempts) throw error;

      if (opts.onRetry) opts.onRetry(error, attempt);

      let delay = opts.initialDelay * Math.pow(opts.backoffFactor, attempt - 1);
      delay = Math.min(delay, opts.maxDelay);
      if (opts.jitter) {
        delay = delay * (0.5 + Math.random() * 0.5);
      }
      await sleep(delay);
    }
  }

  throw lastError;
}

export async function retryWithTimeout<T>(
  fn: () => Promise<T>,
  timeout: number,
  options: RetryOptions = {}
): Promise<T> {
  return Promise.race([
    retry(fn, options),
    new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error("Retry timeout exceeded")), timeout)
    ),
  ]);
}

export function withRetry<T>(fn: () => Promise<T>, options: RetryOptions = {}): () => Promise<T> {
  return () => retry(fn, options);
}

export class CircuitBreaker {
  private failures = 0;
  private lastFailure = 0;
  private _state: "closed" | "open" | "half-open" = "closed";

  constructor(
    private threshold: number = 5,
    private resetTimeout: number = 60000,
  ) {}

  get state(): "closed" | "open" | "half-open" {
    if (this._state === "open" && Date.now() - this.lastFailure >= this.resetTimeout) {
      this._state = "half-open";
    }
    return this._state;
  }

  async execute<T>(fn: () => Promise<T>): Promise<T> {
    if (this.state === "open") {
      throw new Error("Circuit breaker is open");
    }

    try {
      const result = await fn();
      this.onSuccess();
      return result;
    } catch (error) {
      this.onFailure();
      throw error;
    }
  }

  private onSuccess(): void {
    this.failures = 0;
    this._state = "closed";
  }

  private onFailure(): void {
    this.failures++;
    this.lastFailure = Date.now();
    if (this.failures >= this.threshold) {
      this._state = "open";
    }
  }

  reset(): void {
    this.failures = 0;
    this._state = "closed";
  }
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
