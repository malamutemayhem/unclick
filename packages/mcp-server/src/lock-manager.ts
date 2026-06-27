export type LockMode = "shared" | "exclusive";

export interface Lock {
  resource: string;
  mode: LockMode;
  holder: string;
  acquired: number;
  timeout: number;
}

export interface LockRequest {
  resource: string;
  mode: LockMode;
  requester: string;
  requested: number;
}

export class LockManager {
  private locks = new Map<string, Lock[]>();
  private waitQueue: LockRequest[] = [];
  private clock = 0;
  private deadlockDetection = true;

  constructor(options?: { deadlockDetection?: boolean }) {
    if (options?.deadlockDetection !== undefined) {
      this.deadlockDetection = options.deadlockDetection;
    }
  }

  acquire(resource: string, mode: LockMode, holder: string, timeout = 0): boolean {
    if (this.deadlockDetection && this.wouldDeadlock(resource, holder)) {
      return false;
    }

    const existing = this.locks.get(resource) ?? [];

    if (mode === "shared") {
      const hasExclusive = existing.some((l) => l.mode === "exclusive" && l.holder !== holder);
      if (hasExclusive) {
        this.waitQueue.push({ resource, mode, requester: holder, requested: this.clock++ });
        return false;
      }
      existing.push({ resource, mode, holder, acquired: this.clock++, timeout });
      this.locks.set(resource, existing);
      return true;
    }

    if (existing.length > 0 && !existing.every((l) => l.holder === holder)) {
      this.waitQueue.push({ resource, mode, requester: holder, requested: this.clock++ });
      return false;
    }

    existing.push({ resource, mode, holder, acquired: this.clock++, timeout });
    this.locks.set(resource, existing);
    return true;
  }

  release(resource: string, holder: string): boolean {
    const existing = this.locks.get(resource);
    if (!existing) return false;
    const idx = existing.findIndex((l) => l.holder === holder);
    if (idx === -1) return false;
    existing.splice(idx, 1);
    if (existing.length === 0) this.locks.delete(resource);
    this.processWaitQueue();
    return true;
  }

  releaseAll(holder: string): number {
    let released = 0;
    for (const [resource, locks] of this.locks) {
      const before = locks.length;
      const remaining = locks.filter((l) => l.holder !== holder);
      if (remaining.length < before) {
        released += before - remaining.length;
        if (remaining.length === 0) this.locks.delete(resource);
        else this.locks.set(resource, remaining);
      }
    }
    if (released > 0) this.processWaitQueue();
    return released;
  }

  isLocked(resource: string): boolean {
    const locks = this.locks.get(resource);
    return locks !== undefined && locks.length > 0;
  }

  holdsLock(resource: string, holder: string): boolean {
    const locks = this.locks.get(resource);
    if (!locks) return false;
    return locks.some((l) => l.holder === holder);
  }

  lockMode(resource: string): LockMode | null {
    const locks = this.locks.get(resource);
    if (!locks || locks.length === 0) return null;
    return locks.some((l) => l.mode === "exclusive") ? "exclusive" : "shared";
  }

  waitQueueSize(): number {
    return this.waitQueue.length;
  }

  activeLocks(): number {
    let count = 0;
    for (const locks of this.locks.values()) {
      count += locks.length;
    }
    return count;
  }

  lockedResources(): string[] {
    return [...this.locks.keys()].sort();
  }

  private wouldDeadlock(resource: string, requester: string): boolean {
    const visited = new Set<string>();
    const check = (holder: string): boolean => {
      if (holder === requester) return true;
      if (visited.has(holder)) return false;
      visited.add(holder);
      for (const req of this.waitQueue) {
        if (req.requester === holder) {
          const locks = this.locks.get(req.resource);
          if (locks) {
            for (const lock of locks) {
              if (check(lock.holder)) return true;
            }
          }
        }
      }
      return false;
    };

    const existing = this.locks.get(resource);
    if (!existing) return false;
    for (const lock of existing) {
      if (check(lock.holder)) return true;
    }
    return false;
  }

  private processWaitQueue(): void {
    const remaining: LockRequest[] = [];
    for (const req of this.waitQueue) {
      const existing = this.locks.get(req.resource) ?? [];
      let canAcquire = false;

      if (req.mode === "shared") {
        canAcquire = !existing.some((l) => l.mode === "exclusive" && l.holder !== req.requester);
      } else {
        canAcquire = existing.length === 0 || existing.every((l) => l.holder === req.requester);
      }

      if (canAcquire) {
        existing.push({
          resource: req.resource,
          mode: req.mode,
          holder: req.requester,
          acquired: this.clock++,
          timeout: 0,
        });
        this.locks.set(req.resource, existing);
      } else {
        remaining.push(req);
      }
    }
    this.waitQueue = remaining;
  }
}
