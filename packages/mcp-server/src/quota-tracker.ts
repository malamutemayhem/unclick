export interface Quota {
  limit: number;
  used: number;
  resetAt: number;
}

export class QuotaTracker {
  private quotas = new Map<string, Quota>();

  define(key: string, limit: number, resetIntervalMs: number): void {
    this.quotas.set(key, { limit, used: 0, resetAt: Date.now() + resetIntervalMs });
  }

  consume(key: string, amount = 1): { allowed: boolean; remaining: number } {
    const quota = this.quotas.get(key);
    if (!quota) return { allowed: false, remaining: 0 };
    this.maybeReset(key, quota);
    if (quota.used + amount > quota.limit) {
      return { allowed: false, remaining: quota.limit - quota.used };
    }
    quota.used += amount;
    return { allowed: true, remaining: quota.limit - quota.used };
  }

  remaining(key: string): number {
    const quota = this.quotas.get(key);
    if (!quota) return 0;
    this.maybeReset(key, quota);
    return quota.limit - quota.used;
  }

  usage(key: string): { used: number; limit: number; percent: number } | undefined {
    const quota = this.quotas.get(key);
    if (!quota) return undefined;
    this.maybeReset(key, quota);
    return { used: quota.used, limit: quota.limit, percent: (quota.used / quota.limit) * 100 };
  }

  reset(key: string): boolean {
    const quota = this.quotas.get(key);
    if (!quota) return false;
    quota.used = 0;
    return true;
  }

  get keys(): string[] {
    return [...this.quotas.keys()];
  }

  private maybeReset(key: string, quota: Quota): void {
    if (Date.now() >= quota.resetAt) {
      const interval = quota.resetAt - (quota.resetAt - (Date.now() - quota.resetAt));
      quota.used = 0;
      quota.resetAt = Date.now() + interval;
    }
  }
}
