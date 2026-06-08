export type RetryDecision = { retry: boolean; delayMs: number };

export type RetryPolicy = (attempt: number, error?: string) => RetryDecision;

export function exponentialBackoff(baseMs = 1000, maxMs = 30000): RetryPolicy {
  return (attempt) => ({
    retry: true,
    delayMs: Math.min(baseMs * Math.pow(2, attempt), maxMs),
  });
}

export function linearBackoff(stepMs = 1000, maxMs = 10000): RetryPolicy {
  return (attempt) => ({
    retry: true,
    delayMs: Math.min(stepMs * (attempt + 1), maxMs),
  });
}

export function constantDelay(delayMs = 1000): RetryPolicy {
  return () => ({ retry: true, delayMs });
}

export function noRetry(): RetryPolicy {
  return () => ({ retry: false, delayMs: 0 });
}

export function maxAttempts(policy: RetryPolicy, max: number): RetryPolicy {
  return (attempt, error) => {
    if (attempt >= max) return { retry: false, delayMs: 0 };
    return policy(attempt, error);
  };
}

export function retryOn(policy: RetryPolicy, predicate: (error: string) => boolean): RetryPolicy {
  return (attempt, error) => {
    if (!error || !predicate(error)) return { retry: false, delayMs: 0 };
    return policy(attempt, error);
  };
}

export function withJitter(policy: RetryPolicy, jitterFraction = 0.5): RetryPolicy {
  return (attempt, error) => {
    const decision = policy(attempt, error);
    if (!decision.retry) return decision;
    const jitter = decision.delayMs * jitterFraction * Math.random();
    return { retry: true, delayMs: decision.delayMs + jitter };
  };
}

export function compose(...policies: RetryPolicy[]): RetryPolicy {
  return (attempt, error) => {
    for (const policy of policies) {
      const decision = policy(attempt, error);
      if (!decision.retry) return decision;
    }
    return policies[policies.length - 1](attempt, error);
  };
}
