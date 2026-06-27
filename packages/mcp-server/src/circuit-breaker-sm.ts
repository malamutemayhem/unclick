export type CircuitState = "closed" | "open" | "half-open";

export interface CircuitBreakerOptions {
  failureThreshold: number;
  resetTimeoutMs: number;
  halfOpenMax?: number;
}

export class CircuitBreakerSM {
  private state: CircuitState = "closed";
  private failureCount = 0;
  private successCount = 0;
  private lastFailureTime = 0;
  private readonly failureThreshold: number;
  private readonly resetTimeoutMs: number;
  private readonly halfOpenMax: number;

  constructor(options: CircuitBreakerOptions) {
    this.failureThreshold = options.failureThreshold;
    this.resetTimeoutMs = options.resetTimeoutMs;
    this.halfOpenMax = options.halfOpenMax ?? 1;
  }

  getState(now?: number): CircuitState {
    const t = now ?? Date.now();
    if (this.state === "open" && t - this.lastFailureTime >= this.resetTimeoutMs) {
      this.state = "half-open";
      this.successCount = 0;
    }
    return this.state;
  }

  canExecute(now?: number): boolean {
    const s = this.getState(now);
    return s === "closed" || s === "half-open";
  }

  recordSuccess(now?: number): void {
    const t = now ?? Date.now();
    const s = this.getState(t);
    if (s === "half-open") {
      this.successCount++;
      if (this.successCount >= this.halfOpenMax) {
        this.state = "closed";
        this.failureCount = 0;
        this.successCount = 0;
      }
    } else if (s === "closed") {
      this.failureCount = 0;
    }
  }

  recordFailure(now?: number): void {
    const t = now ?? Date.now();
    const s = this.getState(t);
    if (s === "half-open") {
      this.state = "open";
      this.lastFailureTime = t;
    } else if (s === "closed") {
      this.failureCount++;
      if (this.failureCount >= this.failureThreshold) {
        this.state = "open";
        this.lastFailureTime = t;
      }
    }
  }

  reset(): void {
    this.state = "closed";
    this.failureCount = 0;
    this.successCount = 0;
    this.lastFailureTime = 0;
  }

  getFailureCount(): number {
    return this.failureCount;
  }

  getSuccessCount(): number {
    return this.successCount;
  }
}
