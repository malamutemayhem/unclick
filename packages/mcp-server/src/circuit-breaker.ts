export type BreakerState = "closed" | "open" | "half-open";

export interface BreakerOptions {
  failureThreshold: number;
  resetTimeoutMs: number;
  halfOpenMax: number;
}

const DEFAULT_OPTIONS: BreakerOptions = {
  failureThreshold: 5,
  resetTimeoutMs: 30_000,
  halfOpenMax: 1,
};

export class CircuitBreaker {
  private state: BreakerState = "closed";
  private failures = 0;
  private successes = 0;
  private lastFailureAt = 0;
  private halfOpenAttempts = 0;
  private options: BreakerOptions;

  constructor(options: Partial<BreakerOptions> = {}) {
    this.options = { ...DEFAULT_OPTIONS, ...options };
  }

  get currentState(): BreakerState {
    if (this.state === "open" && Date.now() - this.lastFailureAt >= this.options.resetTimeoutMs) {
      this.state = "half-open";
      this.halfOpenAttempts = 0;
    }
    return this.state;
  }

  canExecute(): boolean {
    const s = this.currentState;
    if (s === "closed") return true;
    if (s === "half-open") return this.halfOpenAttempts < this.options.halfOpenMax;
    return false;
  }

  recordSuccess(): void {
    if (this.state === "half-open") {
      this.state = "closed";
      this.failures = 0;
      this.halfOpenAttempts = 0;
    }
    this.successes++;
  }

  recordFailure(): void {
    this.failures++;
    this.lastFailureAt = Date.now();
    if (this.state === "half-open") {
      this.state = "open";
      return;
    }
    if (this.failures >= this.options.failureThreshold) {
      this.state = "open";
    }
  }

  async execute<T>(fn: () => Promise<T>): Promise<T> {
    if (!this.canExecute()) {
      throw new Error("Circuit breaker is open");
    }
    if (this.state === "half-open") this.halfOpenAttempts++;
    try {
      const result = await fn();
      this.recordSuccess();
      return result;
    } catch (err) {
      this.recordFailure();
      throw err;
    }
  }

  reset(): void {
    this.state = "closed";
    this.failures = 0;
    this.successes = 0;
    this.lastFailureAt = 0;
    this.halfOpenAttempts = 0;
  }

  stats(): { state: BreakerState; failures: number; successes: number } {
    return { state: this.currentState, failures: this.failures, successes: this.successes };
  }
}
