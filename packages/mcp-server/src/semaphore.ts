export class Semaphore {
  private permits: number;
  private maxPermits: number;
  private waiters: Array<() => void> = [];

  constructor(maxPermits: number) {
    if (maxPermits < 1) throw new Error("Max permits must be at least 1");
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
    if (this.waiters.length > 0) {
      const waiter = this.waiters.shift()!;
      waiter();
    } else if (this.permits < this.maxPermits) {
      this.permits++;
    }
  }

  tryAcquire(): boolean {
    if (this.permits > 0) {
      this.permits--;
      return true;
    }
    return false;
  }

  get available(): number {
    return this.permits;
  }

  get waiting(): number {
    return this.waiters.length;
  }

  get max(): number {
    return this.maxPermits;
  }

  async withPermit<T>(fn: () => Promise<T>): Promise<T> {
    await this.acquire();
    try {
      return await fn();
    } finally {
      this.release();
    }
  }
}

export class Mutex extends Semaphore {
  constructor() {
    super(1);
  }

  async withLock<T>(fn: () => Promise<T>): Promise<T> {
    return this.withPermit(fn);
  }
}
