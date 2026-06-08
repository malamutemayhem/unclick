interface Quota {
  limit: number;
  used: number;
  resetAt: number;
}

export class QuotaTracker {
  private quotas = new Map<string, Quota>();

  define(key: string, limit: number, windowMs: number): void {
    this.quotas.set(key, { limit, used: 0, resetAt: Date.now() + windowMs });
  }

  consume(key: string, amount = 1): boolean {
    const quota = this.quotas.get(key);
    if (!quota) return false;
    this.maybeReset(key, quota);
    if (quota.used + amount > quota.limit) return false;
    quota.used += amount;
    return true;
  }

  remaining(key: string): number {
    const quota = this.quotas.get(key);
    if (!quota) return 0;
    this.maybeReset(key, quota);
    return Math.max(0, quota.limit - quota.used);
  }

  isExhausted(key: string): boolean {
    return this.remaining(key) === 0;
  }

  getStatus(key: string): { limit: number; used: number; remaining: number; resetsIn: number } | undefined {
    const quota = this.quotas.get(key);
    if (!quota) return undefined;
    this.maybeReset(key, quota);
    return {
      limit: quota.limit,
      used: quota.used,
      remaining: Math.max(0, quota.limit - quota.used),
      resetsIn: Math.max(0, quota.resetAt - Date.now()),
    };
  }

  reset(key: string): void {
    const quota = this.quotas.get(key);
    if (quota) quota.used = 0;
  }

  get size(): number {
    return this.quotas.size;
  }

  private maybeReset(key: string, quota: Quota): void {
    if (Date.now() >= quota.resetAt) {
      const windowMs = quota.resetAt - (quota.resetAt - (quota.limit > 0 ? quota.resetAt : 0));
      quota.used = 0;
      quota.resetAt = Date.now() + (windowMs || 60000);
    }
  }
}
