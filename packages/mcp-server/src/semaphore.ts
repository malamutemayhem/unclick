export class Semaphore {
  private permits: number;
  private readonly maxPermits: number;
  private waitQueue: Array<() => void> = [];

  constructor(permits: number) {
    this.permits = permits;
    this.maxPermits = permits;
  }

  async acquire(): Promise<void> {
    if (this.permits > 0) {
      this.permits--;
      return;
    }
    return new Promise<void>((resolve) => {
      this.waitQueue.push(resolve);
    });
  }

  release(): void {
    if (this.waitQueue.length > 0) {
      const next = this.waitQueue.shift()!;
      next();
    } else if (this.permits < this.maxPermits) {
      this.permits++;
    }
  }

  get available(): number {
    return this.permits;
  }

  get waiting(): number {
    return this.waitQueue.length;
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

export class Mutex {
  private semaphore = new Semaphore(1);

  async lock(): Promise<void> {
    await this.semaphore.acquire();
  }

  unlock(): void {
    this.semaphore.release();
  }

  get isLocked(): boolean {
    return this.semaphore.available === 0;
  }

  async withLock<T>(fn: () => Promise<T>): Promise<T> {
    return this.semaphore.withPermit(fn);
  }
}
