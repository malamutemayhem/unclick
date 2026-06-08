export interface RetryPolicy {
  maxRetries: number;
  baseDelay: number;
  maxDelay?: number;
  backoff?: "fixed" | "linear" | "exponential";
  jitter?: boolean;
  retryOn?: (error: unknown) => boolean;
}

function computeDelay(policy: RetryPolicy, attempt: number): number {
  const { baseDelay, maxDelay = Infinity, backoff = "exponential", jitter = false } = policy;
  let delay: number;
  switch (backoff) {
    case "fixed": delay = baseDelay; break;
    case "linear": delay = baseDelay * (attempt + 1); break;
    case "exponential": delay = baseDelay * Math.pow(2, attempt); break;
  }
  delay = Math.min(delay, maxDelay);
  if (jitter) delay = delay * (0.5 + Math.random() * 0.5);
  return delay;
}

export async function retryWith<T>(fn: () => Promise<T>, policy: RetryPolicy): Promise<T> {
  let lastError: unknown;
  for (let attempt = 0; attempt <= policy.maxRetries; attempt++) {
    try {
      return await fn();
    } catch (err) {
      lastError = err;
      if (policy.retryOn && !policy.retryOn(err)) throw err;
      if (attempt < policy.maxRetries) {
        await new Promise((r) => setTimeout(r, computeDelay(policy, attempt)));
      }
    }
  }
  throw lastError;
}

export function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error("Timeout after " + ms + "ms")), ms);
    promise.then(
      (val) => { clearTimeout(timer); resolve(val); },
      (err) => { clearTimeout(timer); reject(err); }
    );
  });
}

export async function retryWithFallback<T>(primary: () => Promise<T>, fallback: () => Promise<T>, retries = 2): Promise<T> {
  try {
    return await retryWith(primary, { maxRetries: retries, baseDelay: 100 });
  } catch {
    return fallback();
  }
}
