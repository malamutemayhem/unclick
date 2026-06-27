export interface RetryConfig {
  maxAttempts: number;
  baseDelayMs: number;
  maxDelayMs?: number;
  backoffFactor?: number;
  jitter?: boolean;
}

export class RetryState {
  private attempt = 0;
  private config: Required<RetryConfig>;

  constructor(config: RetryConfig) {
    this.config = {
      maxAttempts: config.maxAttempts,
      baseDelayMs: config.baseDelayMs,
      maxDelayMs: config.maxDelayMs ?? 30000,
      backoffFactor: config.backoffFactor ?? 2,
      jitter: config.jitter ?? true,
    };
  }

  get currentAttempt(): number { return this.attempt; }
  get remainingAttempts(): number { return Math.max(0, this.config.maxAttempts - this.attempt); }
  get exhausted(): boolean { return this.attempt >= this.config.maxAttempts; }

  nextDelay(): number {
    const delay = Math.min(
      this.config.baseDelayMs * Math.pow(this.config.backoffFactor, this.attempt),
      this.config.maxDelayMs,
    );
    if (this.config.jitter) {
      return delay * (0.5 + Math.random() * 0.5);
    }
    return delay;
  }

  record(): void {
    this.attempt++;
  }

  reset(): void {
    this.attempt = 0;
  }

  async wait(): Promise<void> {
    const delay = this.nextDelay();
    this.record();
    await new Promise((resolve) => setTimeout(resolve, delay));
  }
}

export function shouldRetry(error: unknown, retryOn?: Array<new (...args: any[]) => Error>): boolean {
  if (!retryOn || retryOn.length === 0) return true;
  return retryOn.some((ErrorClass: new (...args: any[]) => Error) => error instanceof ErrorClass);
}
