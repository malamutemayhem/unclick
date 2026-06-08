export type CircuitState = "closed" | "open" | "half-open";

export interface CircuitBreakerOptions {
  failureThreshold: number;
  resetTimeoutMs: number;
  halfOpenMax?: number;
  onStateChange?: (from: CircuitState, to: CircuitState) => void;
}

export class CircuitBreaker {
  private state: CircuitState = "closed";
  private failures = 0;
  private successes = 0;
  private lastFailureTime = 0;
  private options: Required<CircuitBreakerOptions>;

  constructor(options: CircuitBreakerOptions) {
    this.options = {
      failureThreshold: options.failureThreshold,
      resetTimeoutMs: options.resetTimeoutMs,
      halfOpenMax: options.halfOpenMax || 1,
      onStateChange: options.onStateChange || (() => {}),
    };
  }

  get currentState(): CircuitState { return this.state; }
  get failureCount(): number { return this.failures; }

  async execute<T>(fn: () => Promise<T>): Promise<T> {
    if (this.state === "open") {
      if (Date.now() - this.lastFailureTime >= this.options.resetTimeoutMs) {
        this.transition("half-open");
      } else {
        throw new Error("Circuit breaker is open");
      }
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
    if (this.state === "half-open") {
      this.successes++;
      if (this.successes >= this.options.halfOpenMax) {
        this.failures = 0;
        this.successes = 0;
        this.transition("closed");
      }
    } else {
      this.failures = 0;
    }
  }

  private onFailure(): void {
    this.failures++;
    this.lastFailureTime = Date.now();

    if (this.state === "half-open") {
      this.transition("open");
    } else if (this.failures >= this.options.failureThreshold) {
      this.transition("open");
    }
  }

  private transition(to: CircuitState): void {
    const from = this.state;
    this.state = to;
    this.successes = 0;
    this.options.onStateChange(from, to);
  }

  reset(): void {
    this.failures = 0;
    this.successes = 0;
    this.state = "closed";
  }
}
