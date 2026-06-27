export interface BackoffConfig {
  baseDelayMs: number;
  maxDelayMs: number;
  maxRetries: number;
  multiplier: number;
  jitter: boolean;
}

const DEFAULT_CONFIG: BackoffConfig = {
  baseDelayMs: 100,
  maxDelayMs: 30_000,
  maxRetries: 5,
  multiplier: 2,
  jitter: true,
};

export function exponentialDelay(attempt: number, config: Partial<BackoffConfig> = {}): number {
  const c = { ...DEFAULT_CONFIG, ...config };
  const delay = c.baseDelayMs * Math.pow(c.multiplier, attempt);
  const capped = Math.min(delay, c.maxDelayMs);
  return c.jitter ? capped * (0.5 + Math.random() * 0.5) : capped;
}

export function fibonacciDelay(attempt: number, config: Partial<BackoffConfig> = {}): number {
  const c = { ...DEFAULT_CONFIG, ...config };
  let a = 1, b = 1;
  for (let i = 0; i < attempt; i++) { [a, b] = [b, a + b]; }
  const delay = c.baseDelayMs * a;
  const capped = Math.min(delay, c.maxDelayMs);
  return c.jitter ? capped * (0.5 + Math.random() * 0.5) : capped;
}

export function linearDelay(attempt: number, config: Partial<BackoffConfig> = {}): number {
  const c = { ...DEFAULT_CONFIG, ...config };
  const delay = c.baseDelayMs * (attempt + 1);
  const capped = Math.min(delay, c.maxDelayMs);
  return c.jitter ? capped * (0.5 + Math.random() * 0.5) : capped;
}

export function constantDelay(config: Partial<BackoffConfig> = {}): number {
  const c = { ...DEFAULT_CONFIG, ...config };
  return c.jitter ? c.baseDelayMs * (0.5 + Math.random() * 0.5) : c.baseDelayMs;
}

export function decorrelatedJitter(prevDelay: number, config: Partial<BackoffConfig> = {}): number {
  const c = { ...DEFAULT_CONFIG, ...config };
  const delay = Math.random() * (prevDelay * 3 - c.baseDelayMs) + c.baseDelayMs;
  return Math.min(delay, c.maxDelayMs);
}

export function delaySequence(
  attempts: number,
  strategy: "exponential" | "fibonacci" | "linear" | "constant" = "exponential",
  config: Partial<BackoffConfig> = {},
): number[] {
  const delays: number[] = [];
  for (let i = 0; i < attempts; i++) {
    switch (strategy) {
      case "exponential": delays.push(exponentialDelay(i, config)); break;
      case "fibonacci": delays.push(fibonacciDelay(i, config)); break;
      case "linear": delays.push(linearDelay(i, config)); break;
      case "constant": delays.push(constantDelay(config)); break;
    }
  }
  return delays;
}

export async function withBackoff<T>(
  fn: () => T | Promise<T>,
  config: Partial<BackoffConfig> = {},
  shouldRetry: (error: unknown, attempt: number) => boolean = () => true,
): Promise<T> {
  const c = { ...DEFAULT_CONFIG, ...config };
  let lastError: unknown;
  for (let attempt = 0; attempt <= c.maxRetries; attempt++) {
    try {
      return await fn();
    } catch (err) {
      lastError = err;
      if (attempt >= c.maxRetries || !shouldRetry(err, attempt)) break;
      const delay = exponentialDelay(attempt, c);
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }
  throw lastError;
}
