export interface BackoffStrategy {
  delay(attempt: number): number;
}

export class ConstantBackoff implements BackoffStrategy {
  constructor(private ms: number) {}
  delay(_attempt: number): number { return this.ms; }
}

export class LinearBackoff implements BackoffStrategy {
  constructor(private baseMs: number, private increment: number = 0) {
    if (!increment) this.increment = baseMs;
  }
  delay(attempt: number): number { return this.baseMs + this.increment * attempt; }
}

export class ExponentialBackoff implements BackoffStrategy {
  constructor(private baseMs: number, private factor: number = 2, private maxMs: number = 30000) {}
  delay(attempt: number): number {
    return Math.min(this.baseMs * Math.pow(this.factor, attempt), this.maxMs);
  }
}

export class JitteredBackoff implements BackoffStrategy {
  private inner: BackoffStrategy;
  private jitterFactor: number;

  constructor(inner: BackoffStrategy, jitterFactor = 0.5) {
    this.inner = inner;
    this.jitterFactor = jitterFactor;
  }

  delay(attempt: number): number {
    const base = this.inner.delay(attempt);
    const jitter = base * this.jitterFactor * Math.random();
    return Math.floor(base + jitter);
  }
}

export class DecorrelatedJitterBackoff implements BackoffStrategy {
  private baseMs: number;
  private maxMs: number;
  private lastDelay: number;

  constructor(baseMs: number, maxMs = 30000) {
    this.baseMs = baseMs;
    this.maxMs = maxMs;
    this.lastDelay = baseMs;
  }

  delay(_attempt: number): number {
    this.lastDelay = Math.min(this.maxMs, Math.random() * this.lastDelay * 3);
    return Math.max(this.baseMs, Math.floor(this.lastDelay));
  }
}

export async function retryWithBackoff<T>(
  fn: (attempt: number) => Promise<T>,
  strategy: BackoffStrategy,
  maxAttempts: number,
  shouldRetry: (error: unknown) => boolean = () => true
): Promise<T> {
  let lastError: unknown;
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    try {
      return await fn(attempt);
    } catch (error) {
      lastError = error;
      if (attempt === maxAttempts - 1 || !shouldRetry(error)) throw error;
      await new Promise((r) => setTimeout(r, strategy.delay(attempt)));
    }
  }
  throw lastError;
}

export function computeDelays(strategy: BackoffStrategy, count: number): number[] {
  return Array.from({ length: count }, (_, i) => strategy.delay(i));
}
