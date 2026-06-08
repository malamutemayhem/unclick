export class Semaphore {
  private permits: number;
  private waiting: (() => void)[] = [];

  constructor(permits: number) {
    this.permits = permits;
  }

  async acquire(): Promise<void> {
    if (this.permits > 0) {
      this.permits--;
      return;
    }
    return new Promise<void>((resolve) => {
      this.waiting.push(resolve);
    });
  }

  release(): void {
    if (this.waiting.length > 0) {
      const next = this.waiting.shift()!;
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

  get available(): number {
    return this.permits;
  }

  get waitingCount(): number {
    return this.waiting.length;
  }
}

export class Mutex extends Semaphore {
  constructor() {
    super(1);
  }

  async lock(): Promise<void> {
    await this.acquire();
  }

  unlock(): void {
    this.release();
  }

  async withLock<T>(fn: () => Promise<T>): Promise<T> {
    return this.withPermit(fn);
  }
}

export class ReadWriteLock {
  private readers = 0;
  private writer = false;
  private readQueue: (() => void)[] = [];
  private writeQueue: (() => void)[] = [];

  async readLock(): Promise<void> {
    if (!this.writer && this.writeQueue.length === 0) {
      this.readers++;
      return;
    }
    return new Promise<void>((resolve) => {
      this.readQueue.push(() => {
        this.readers++;
        resolve();
      });
    });
  }

  readUnlock(): void {
    this.readers--;
    if (this.readers === 0 && this.writeQueue.length > 0) {
      this.writer = true;
      const next = this.writeQueue.shift()!;
      next();
    }
  }

  async writeLock(): Promise<void> {
    if (!this.writer && this.readers === 0) {
      this.writer = true;
      return;
    }
    return new Promise<void>((resolve) => {
      this.writeQueue.push(() => resolve());
    });
  }

  writeUnlock(): void {
    this.writer = false;
    if (this.writeQueue.length > 0) {
      this.writer = true;
      const next = this.writeQueue.shift()!;
      next();
    } else {
      while (this.readQueue.length > 0) {
        const next = this.readQueue.shift()!;
        next();
      }
    }
  }
}
