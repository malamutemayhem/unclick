interface Lease {
  key: string;
  holder: string;
  expiresAt: number;
}

export class LeaseManager {
  private leases = new Map<string, Lease>();

  acquire(key: string, holder: string, ttlMs: number): boolean {
    const existing = this.leases.get(key);
    if (existing && existing.expiresAt > Date.now() && existing.holder !== holder) {
      return false;
    }
    this.leases.set(key, { key, holder, expiresAt: Date.now() + ttlMs });
    return true;
  }

  release(key: string, holder: string): boolean {
    const lease = this.leases.get(key);
    if (!lease || lease.holder !== holder) return false;
    this.leases.delete(key);
    return true;
  }

  renew(key: string, holder: string, ttlMs: number): boolean {
    const lease = this.leases.get(key);
    if (!lease || lease.holder !== holder) return false;
    lease.expiresAt = Date.now() + ttlMs;
    return true;
  }

  isHeld(key: string): boolean {
    const lease = this.leases.get(key);
    if (!lease) return false;
    if (lease.expiresAt <= Date.now()) {
      this.leases.delete(key);
      return false;
    }
    return true;
  }

  getHolder(key: string): string | undefined {
    const lease = this.leases.get(key);
    if (!lease || lease.expiresAt <= Date.now()) return undefined;
    return lease.holder;
  }

  purgeExpired(): number {
    const now = Date.now();
    let count = 0;
    for (const [key, lease] of this.leases) {
      if (lease.expiresAt <= now) {
        this.leases.delete(key);
        count++;
      }
    }
    return count;
  }

  get size(): number {
    return this.leases.size;
  }
}
