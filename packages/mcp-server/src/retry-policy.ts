export interface RetryOptions {
  maxAttempts: number;
  baseDelayMs?: number;
  maxDelayMs?: number;
  backoffMultiplier?: number;
  jitter?: boolean;
  retryOn?: (error: unknown, attempt: number) => boolean;
  onRetry?: (error: unknown, attempt: number, delayMs: number) => void;
}

export class RetryPolicy {
  private opts: Required<Omit<RetryOptions, "retryOn" | "onRetry">> & Pick<RetryOptions, "retryOn" | "onRetry">;

  constructor(opts: RetryOptions) {
    this.opts = {
      maxAttempts: opts.maxAttempts,
      baseDelayMs: opts.baseDelayMs ?? 1000,
      maxDelayMs: opts.maxDelayMs ?? 30000,
      backoffMultiplier: opts.backoffMultiplier ?? 2,
      jitter: opts.jitter ?? true,
      retryOn: opts.retryOn,
      onRetry: opts.onRetry,
    };
  }

  async execute<T>(fn: (attempt: number) => Promise<T>): Promise<T> {
    let lastError: unknown;
    for (let attempt = 1; attempt <= this.opts.maxAttempts; attempt++) {
      try {
        return await fn(attempt);
      } catch (err) {
        lastError = err;
        if (attempt === this.opts.maxAttempts) break;
        if (this.opts.retryOn && !this.opts.retryOn(err, attempt)) break;
        const delay = this.calculateDelay(attempt);
        if (this.opts.onRetry) this.opts.onRetry(err, attempt, delay);
        await sleep(delay);
      }
    }
    throw lastError;
  }

  calculateDelay(attempt: number): number {
    let delay = this.opts.baseDelayMs * Math.pow(this.opts.backoffMultiplier, attempt - 1);
    delay = Math.min(delay, this.opts.maxDelayMs);
    if (this.opts.jitter) {
      delay = delay * (0.5 + Math.random() * 0.5);
    }
    return Math.round(delay);
  }
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
