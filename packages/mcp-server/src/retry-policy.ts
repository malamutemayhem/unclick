export interface RetryPolicy {
  maxRetries: number;
  baseDelayMs: number;
  maxDelayMs: number;
  backoffFactor: number;
  jitter: boolean;
  retryOn?: (error: unknown) => boolean;
}

export function createPolicy(overrides: Partial<RetryPolicy> = {}): RetryPolicy {
  return {
    maxRetries: 3,
    baseDelayMs: 1000,
    maxDelayMs: 30000,
    backoffFactor: 2,
    jitter: true,
    ...overrides,
  };
}

export function calculateDelay(policy: RetryPolicy, attempt: number): number {
  let delay = policy.baseDelayMs * Math.pow(policy.backoffFactor, attempt);
  delay = Math.min(delay, policy.maxDelayMs);
  if (policy.jitter) {
    delay = delay * (0.5 + Math.random() * 0.5);
  }
  return Math.round(delay);
}

export async function executeWithPolicy<T>(
  fn: () => Promise<T>,
  policy: RetryPolicy,
): Promise<T> {
  let lastError: unknown;
  for (let attempt = 0; attempt <= policy.maxRetries; attempt++) {
    try {
      return await fn();
    } catch (err) {
      lastError = err;
      if (policy.retryOn && !policy.retryOn(err)) throw err;
      if (attempt < policy.maxRetries) {
        const delay = calculateDelay(policy, attempt);
        await new Promise((r) => setTimeout(r, delay));
      }
    }
  }
  throw lastError;
}

export const policies = {
  aggressive: createPolicy({ maxRetries: 5, baseDelayMs: 100, backoffFactor: 1.5 }),
  conservative: createPolicy({ maxRetries: 3, baseDelayMs: 2000, backoffFactor: 3 }),
  none: createPolicy({ maxRetries: 0 }),
  linear: createPolicy({ backoffFactor: 1, jitter: false }),
};
