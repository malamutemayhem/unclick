// Sliding-window rate limiter for connector calls.
// Prevents a single tenant or runaway agent from hammering external APIs
// and burning through rate limits. The design follows OpenClaw's
// sliding-window counter pattern but is adapted for UnClick's per-tool
// and per-tenant scoping.

export interface RateLimitConfig {
  /** Maximum requests allowed within the window. */
  maxRequests: number;
  /** Window duration in milliseconds. */
  windowMs: number;
  /** Maximum number of active buckets before pruning (memory guard). */
  maxBuckets?: number;
}

interface Bucket {
  count: number;
  windowStartMs: number;
}

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  retryAfterMs?: number;
}

export class SlidingWindowLimiter {
  private buckets = new Map<string, Bucket>();
  private config: Required<RateLimitConfig>;

  constructor(config: RateLimitConfig) {
    this.config = {
      maxBuckets: 10_000,
      ...config,
    };
  }

  consume(key: string): RateLimitResult {
    const now = Date.now();
    this.pruneIfNeeded(now);

    const existing = this.buckets.get(key);

    if (!existing || now - existing.windowStartMs >= this.config.windowMs) {
      this.buckets.set(key, { count: 1, windowStartMs: now });
      return { allowed: true, remaining: this.config.maxRequests - 1 };
    }

    if (existing.count >= this.config.maxRequests) {
      const retryAfterMs = this.config.windowMs - (now - existing.windowStartMs);
      return { allowed: false, remaining: 0, retryAfterMs };
    }

    existing.count++;
    return { allowed: true, remaining: this.config.maxRequests - existing.count };
  }

  reset(key: string): void {
    this.buckets.delete(key);
  }

  private pruneIfNeeded(now: number): void {
    if (this.buckets.size <= this.config.maxBuckets) return;

    const staleThreshold = this.config.windowMs * 5;
    for (const [key, bucket] of this.buckets) {
      if (now - bucket.windowStartMs > staleThreshold) {
        this.buckets.delete(key);
      }
    }
  }

  get size(): number {
    return this.buckets.size;
  }
}

// Pre-configured limiters for common tiers.
// Connector handlers can import these directly instead of creating ad-hoc
// instances, keeping rate-limit policy centralized.

export const CONNECTOR_RATE_LIMITS = {
  standard: new SlidingWindowLimiter({ maxRequests: 60, windowMs: 60_000 }),
  strict: new SlidingWindowLimiter({ maxRequests: 10, windowMs: 60_000 }),
  generous: new SlidingWindowLimiter({ maxRequests: 300, windowMs: 60_000 }),
} as const;

// Helper: build a rate-limit key from connector name + tenant identifier.
export function rateLimitKey(connector: string, tenantHash?: string): string {
  return tenantHash ? `${connector}:${tenantHash}` : connector;
}
