// Retry budget - limits total retries per time window.
// Prevents runaway retry storms when many tools fail at once.
// Each consumer (tenant, connector, endpoint) gets a budget that
// refills over time.

export interface RetryBudgetOptions {
  maxRetries: number;
  windowMs: number;
}

export class RetryBudget {
  private timestamps: number[] = [];
  private readonly maxRetries: number;
  private readonly windowMs: number;

  constructor(opts: RetryBudgetOptions) {
    this.maxRetries = opts.maxRetries;
    this.windowMs = opts.windowMs;
  }

  canRetry(): boolean {
    this.prune();
    return this.timestamps.length < this.maxRetries;
  }

  consume(): boolean {
    if (!this.canRetry()) return false;
    this.timestamps.push(Date.now());
    return true;
  }

  get remaining(): number {
    this.prune();
    return Math.max(0, this.maxRetries - this.timestamps.length);
  }

  get used(): number {
    this.prune();
    return this.timestamps.length;
  }

  reset(): void {
    this.timestamps = [];
  }

  private prune(): void {
    const cutoff = Date.now() - this.windowMs;
    this.timestamps = this.timestamps.filter((t) => t > cutoff);
  }
}

// Pre-configured budgets for common scenarios.

export function standardBudget(): RetryBudget {
  return new RetryBudget({ maxRetries: 10, windowMs: 60_000 });
}

export function strictBudget(): RetryBudget {
  return new RetryBudget({ maxRetries: 3, windowMs: 60_000 });
}

export function generousBudget(): RetryBudget {
  return new RetryBudget({ maxRetries: 50, windowMs: 60_000 });
}
