// Circuit breaker for upstream API endpoints.
// Prevents cascading failures by short-circuiting calls to endpoints
// that are failing repeatedly, then slowly re-testing them.

export type CircuitState = "closed" | "open" | "half-open";

export interface CircuitBreakerOptions {
  failureThreshold?: number;
  resetTimeoutMs?: number;
  halfOpenMax?: number;
}

const DEFAULTS: Required<CircuitBreakerOptions> = {
  failureThreshold: 5,
  resetTimeoutMs: 30_000,
  halfOpenMax: 1,
};

export class CircuitBreaker {
  private state: CircuitState = "closed";
  private failures = 0;
  private successes = 0;
  private lastFailureTime = 0;
  private halfOpenAttempts = 0;
  private readonly opts: Required<CircuitBreakerOptions>;

  constructor(opts: CircuitBreakerOptions = {}) {
    this.opts = { ...DEFAULTS, ...opts };
  }

  getState(): CircuitState {
    if (this.state === "open" && this.shouldAttemptReset()) {
      this.state = "half-open";
      this.halfOpenAttempts = 0;
    }
    return this.state;
  }

  canExecute(): boolean {
    const current = this.getState();
    if (current === "closed") return true;
    if (current === "half-open") return this.halfOpenAttempts < this.opts.halfOpenMax;
    return false;
  }

  recordSuccess(): void {
    if (this.state === "half-open") {
      this.successes++;
      this.state = "closed";
      this.failures = 0;
      this.successes = 0;
      this.halfOpenAttempts = 0;
    } else {
      this.failures = 0;
    }
  }

  recordFailure(): void {
    this.failures++;
    this.lastFailureTime = Date.now();

    if (this.state === "half-open") {
      this.state = "open";
      this.halfOpenAttempts = 0;
      return;
    }

    if (this.failures >= this.opts.failureThreshold) {
      this.state = "open";
    }
  }

  async execute<T>(fn: () => Promise<T>): Promise<T> {
    if (!this.canExecute()) {
      throw new CircuitOpenError(this.timeUntilReset());
    }

    if (this.state === "half-open") {
      this.halfOpenAttempts++;
    }

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
    this.lastFailureTime = 0;
    this.halfOpenAttempts = 0;
  }

  getStats(): { state: CircuitState; failures: number; lastFailureTime: number } {
    return {
      state: this.getState(),
      failures: this.failures,
      lastFailureTime: this.lastFailureTime,
    };
  }

  private shouldAttemptReset(): boolean {
    return Date.now() - this.lastFailureTime >= this.opts.resetTimeoutMs;
  }

  private timeUntilReset(): number {
    const elapsed = Date.now() - this.lastFailureTime;
    return Math.max(0, this.opts.resetTimeoutMs - elapsed);
  }
}

export class CircuitOpenError extends Error {
  readonly retryAfterMs: number;

  constructor(retryAfterMs: number) {
    super(`Circuit is open. Retry after ${Math.ceil(retryAfterMs / 1000)}s.`);
    this.name = "CircuitOpenError";
    this.retryAfterMs = retryAfterMs;
  }
}

// Registry for per-endpoint circuit breakers.
const breakers = new Map<string, CircuitBreaker>();

export function getBreaker(endpoint: string, opts?: CircuitBreakerOptions): CircuitBreaker {
  let breaker = breakers.get(endpoint);
  if (!breaker) {
    breaker = new CircuitBreaker(opts);
    breakers.set(endpoint, breaker);
  }
  return breaker;
}

export function resetBreaker(endpoint: string): void {
  breakers.get(endpoint)?.reset();
}

export function resetAllBreakers(): void {
  breakers.forEach((b) => b.reset());
  breakers.clear();
}
