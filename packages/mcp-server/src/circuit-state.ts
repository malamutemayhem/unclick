type CircuitBreakerState = "closed" | "open" | "half-open";

export class CircuitState {
  private state: CircuitBreakerState = "closed";
  private failures = 0;
  private successes = 0;
  private lastFailureTime = 0;
  private readonly threshold: number;
  private readonly resetTimeout: number;
  private readonly halfOpenMax: number;

  constructor(threshold = 5, resetTimeout = 30000, halfOpenMax = 1) {
    this.threshold = threshold;
    this.resetTimeout = resetTimeout;
    this.halfOpenMax = halfOpenMax;
  }

  get currentState(): CircuitBreakerState {
    if (this.state === "open" && Date.now() - this.lastFailureTime >= this.resetTimeout) {
      this.state = "half-open";
      this.successes = 0;
    }
    return this.state;
  }

  get isAllowed(): boolean {
    const s = this.currentState;
    return s === "closed" || s === "half-open";
  }

  recordSuccess(): void {
    if (this.state === "half-open") {
      this.successes++;
      if (this.successes >= this.halfOpenMax) {
        this.state = "closed";
        this.failures = 0;
      }
    } else {
      this.failures = 0;
    }
  }

  recordFailure(): void {
    this.failures++;
    this.lastFailureTime = Date.now();
    if (this.failures >= this.threshold) {
      this.state = "open";
    }
  }

  reset(): void {
    this.state = "closed";
    this.failures = 0;
    this.successes = 0;
    this.lastFailureTime = 0;
  }

  get failureCount(): number {
    return this.failures;
  }

  async execute<T>(fn: () => Promise<T>): Promise<T> {
    if (!this.isAllowed) throw new Error("Circuit is open");
    try {
      const result = await fn();
      this.recordSuccess();
      return result;
    } catch (err) {
      this.recordFailure();
      throw err;
    }
  }
}
