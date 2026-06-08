export interface BackoffOptions {
  baseDelay: number;
  maxDelay: number;
  factor: number;
  jitter: boolean;
  maxRetries: number;
}

const DEFAULT_OPTIONS: BackoffOptions = {
  baseDelay: 100,
  maxDelay: 30000,
  factor: 2,
  jitter: true,
  maxRetries: 5,
};

export class ExponentialBackoff {
  private readonly options: BackoffOptions;
  private attempt = 0;
  private seed: number;

  constructor(options?: Partial<BackoffOptions>) {
    this.options = { ...DEFAULT_OPTIONS, ...options };
    this.seed = 42;
  }

  private nextRandom(): number {
    this.seed = (this.seed * 1103515245 + 12345) & 0x7fffffff;
    return this.seed / 0x7fffffff;
  }

  nextDelay(): number {
    const delay = Math.min(
      this.options.baseDelay * Math.pow(this.options.factor, this.attempt),
      this.options.maxDelay
    );
    this.attempt++;
    if (this.options.jitter) {
      return Math.floor(delay * this.nextRandom());
    }
    return delay;
  }

  reset(): void {
    this.attempt = 0;
  }

  get currentAttempt(): number {
    return this.attempt;
  }

  get canRetry(): boolean {
    return this.attempt < this.options.maxRetries;
  }

  delays(): number[] {
    const result: number[] = [];
    const saved = this.attempt;
    this.attempt = 0;
    for (let i = 0; i < this.options.maxRetries; i++) {
      result.push(this.nextDelay());
    }
    this.attempt = saved;
    return result;
  }

  static calculateDelay(attempt: number, options?: Partial<BackoffOptions>): number {
    const opts = { ...DEFAULT_OPTIONS, ...options };
    return Math.min(
      opts.baseDelay * Math.pow(opts.factor, attempt),
      opts.maxDelay
    );
  }

  static linearDelay(attempt: number, baseDelay: number = 1000): number {
    return baseDelay * (attempt + 1);
  }

  static constantDelay(delay: number = 1000): number {
    return delay;
  }

  static decorrelatedJitter(
    prevDelay: number,
    baseDelay: number = 100,
    maxDelay: number = 30000
  ): number {
    return Math.min(maxDelay, Math.floor(baseDelay + Math.random() * (prevDelay * 3 - baseDelay)));
  }

  totalTime(): number {
    const saved = this.attempt;
    const savedSeed = this.seed;
    this.attempt = 0;
    let total = 0;
    for (let i = 0; i < this.options.maxRetries; i++) {
      total += this.nextDelay();
    }
    this.attempt = saved;
    this.seed = savedSeed;
    return total;
  }
}
