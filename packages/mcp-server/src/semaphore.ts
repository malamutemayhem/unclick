// Async semaphore for controlling concurrent access to shared resources.
// Like a bouncer at a club - only lets N people in at a time.
// Callers wait in line until a slot opens up.

export class Semaphore {
  private permits: number;
  private readonly maxPermits: number;
  private waiters: Array<() => void> = [];

  constructor(maxPermits: number) {
    this.maxPermits = maxPermits;
    this.permits = maxPermits;
  }

  async acquire(): Promise<void> {
    if (this.permits > 0) {
      this.permits--;
      return;
    }
    return new Promise<void>((resolve) => {
      this.waiters.push(resolve);
    });
  }

  release(): void {
    const next = this.waiters.shift();
    if (next) {
      next();
    } else {
      this.permits = Math.min(this.permits + 1, this.maxPermits);
    }
  }

  async withPermit<T>(fn: () => Promise<T>): Promise<T> {
    await this.acquire();
    try {
      return await fn();
    } finally {
      this.release();
    }
  }

  get available(): number {
    return this.permits;
  }

  get waiting(): number {
    return this.waiters.length;
  }
}

// Named semaphore registry for per-resource concurrency control.
const registry = new Map<string, Semaphore>();

export function getSemaphore(name: string, maxPermits = 1): Semaphore {
  let sem = registry.get(name);
  if (!sem) {
    sem = new Semaphore(maxPermits);
    registry.set(name, sem);
  }
  return sem;
}

export function resetSemaphores(): void {
  registry.clear();
}
