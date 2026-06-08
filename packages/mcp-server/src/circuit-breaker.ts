export type CircuitState = "closed" | "open" | "half-open";

export interface CircuitBreakerOptions {
  failureThreshold: number;
  resetTimeoutMs: number;
  halfOpenMaxAttempts?: number;
}

export class CircuitBreaker {
  private state: CircuitState = "closed";
  private failures = 0;
  private successes = 0;
  private lastFailureTime = 0;
  private readonly options: Required<CircuitBreakerOptions>;

  constructor(options: CircuitBreakerOptions) {
    this.options = {
      halfOpenMaxAttempts: 1,
      ...options,
    };
  }

  async execute<T>(fn: () => Promise<T>): Promise<T> {
    if (!this.canExecute()) {
      throw new CircuitOpenError("Circuit breaker is open");
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

  get currentState(): CircuitState {
    if (this.state === "open" && this.shouldAttemptReset()) return "half-open";
    return this.state;
  }

  get failureCount(): number {
    return this.failures;
  }

  reset(): void {
    this.state = "closed";
    this.failures = 0;
    this.successes = 0;
    this.lastFailureTime = 0;
  }

  private canExecute(): boolean {
    if (this.state === "closed") return true;
    if (this.state === "open") {
      if (this.shouldAttemptReset()) {
        this.state = "half-open";
        this.successes = 0;
        return true;
      }
      return false;
    }
    return this.successes < this.options.halfOpenMaxAttempts;
  }

  private onSuccess(): void {
    if (this.state === "half-open") {
      this.successes++;
      if (this.successes >= this.options.halfOpenMaxAttempts) {
        this.state = "closed";
        this.failures = 0;
      }
    } else {
      this.failures = 0;
    }
  }

  private onFailure(): void {
    this.failures++;
    this.lastFailureTime = Date.now();
    if (this.failures >= this.options.failureThreshold) {
      this.state = "open";
    }
  }

  private shouldAttemptReset(): boolean {
    return Date.now() - this.lastFailureTime >= this.options.resetTimeoutMs;
  }
}

export class CircuitOpenError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "CircuitOpenError";
  }
}
