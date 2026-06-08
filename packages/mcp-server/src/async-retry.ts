export interface RetryOptions {
  maxAttempts: number;
  delayMs: number;
  backoffMultiplier?: number;
  maxDelayMs?: number;
  retryOn?: (error: unknown) => boolean;
}

export interface RetryResult<T> {
  success: boolean;
  value?: T;
  error?: unknown;
  attempts: number;
  totalTimeMs: number;
}

export class AsyncRetry {
  static async execute<T>(fn: () => Promise<T>, options: RetryOptions): Promise<RetryResult<T>> {
    const start = Date.now();
    let delay = options.delayMs;
    const multiplier = options.backoffMultiplier ?? 1;
    const maxDelay = options.maxDelayMs ?? Infinity;

    for (let attempt = 1; attempt <= options.maxAttempts; attempt++) {
      try {
        const value = await fn();
        return {
          success: true,
          value,
          attempts: attempt,
          totalTimeMs: Date.now() - start,
        };
      } catch (error) {
        if (options.retryOn && !options.retryOn(error)) {
          return {
            success: false,
            error,
            attempts: attempt,
            totalTimeMs: Date.now() - start,
          };
        }
        if (attempt < options.maxAttempts) {
          await AsyncRetry.sleep(delay);
          delay = Math.min(delay * multiplier, maxDelay);
        } else {
          return {
            success: false,
            error,
            attempts: attempt,
            totalTimeMs: Date.now() - start,
          };
        }
      }
    }
    return { success: false, attempts: options.maxAttempts, totalTimeMs: Date.now() - start };
  }

  static async withTimeout<T>(fn: () => Promise<T>, timeoutMs: number): Promise<T> {
    return Promise.race([
      fn(),
      new Promise<T>((_, reject) =>
        setTimeout(() => reject(new Error("Timeout")), timeoutMs)
      ),
    ]);
  }

  static computeDelay(attempt: number, baseDelay: number, multiplier: number, maxDelay: number): number {
    return Math.min(baseDelay * Math.pow(multiplier, attempt - 1), maxDelay);
  }

  static computeJitter(delay: number, jitterFactor: number = 0.5): number {
    const jitter = delay * jitterFactor;
    return delay + (Math.random() * 2 - 1) * jitter;
  }

  private static sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
