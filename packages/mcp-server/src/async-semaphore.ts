export class AsyncSemaphore {
  private permits: number;
  private queue: (() => void)[] = [];

  constructor(permits: number) {
    if (permits < 1) throw new Error("Permits must be at least 1");
    this.permits = permits;
  }

  get available(): number { return this.permits; }
  get waiting(): number { return this.queue.length; }

  async acquire(): Promise<void> {
    if (this.permits > 0) {
      this.permits--;
      return;
    }
    return new Promise<void>((resolve) => {
      this.queue.push(resolve);
    });
  }

  release(): void {
    const next = this.queue.shift();
    if (next) {
      next();
    } else {
      this.permits++;
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

  tryAcquire(): boolean {
    if (this.permits > 0) {
      this.permits--;
      return true;
    }
    return false;
  }

  drain(): void {
    this.permits = 0;
  }
}

export class AsyncMutex {
  private semaphore = new AsyncSemaphore(1);

  get isLocked(): boolean { return this.semaphore.available === 0; }

  async lock(): Promise<void> { return this.semaphore.acquire(); }
  unlock(): void { this.semaphore.release(); }

  async withLock<T>(fn: () => Promise<T>): Promise<T> {
    return this.semaphore.withPermit(fn);
  }
}
