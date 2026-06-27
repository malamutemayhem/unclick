export class Semaphore {
  private permits: number;
  private queue: (() => void)[] = [];

  constructor(permits: number) {
    if (permits < 1) throw new Error("Semaphore permits must be at least 1");
    this.permits = permits;
  }

  get available(): number { return this.permits; }
  get waiting(): number { return this.queue.length; }

  acquire(): Promise<void> {
    if (this.permits > 0) {
      this.permits--;
      return Promise.resolve();
    }
    return new Promise<void>((resolve) => { this.queue.push(resolve); });
  }

  release(): void {
    const next = this.queue.shift();
    if (next) {
      next();
    } else {
      this.permits++;
    }
  }

  async run<T>(fn: () => Promise<T>): Promise<T> {
    await this.acquire();
    try { return await fn(); }
    finally { this.release(); }
  }

  tryAcquire(): boolean {
    if (this.permits > 0) { this.permits--; return true; }
    return false;
  }
}

export class Mutex {
  private semaphore = new Semaphore(1);

  get locked(): boolean { return this.semaphore.available === 0; }
  get waiting(): number { return this.semaphore.waiting; }

  acquire(): Promise<void> { return this.semaphore.acquire(); }
  release(): void { this.semaphore.release(); }

  async run<T>(fn: () => Promise<T>): Promise<T> {
    return this.semaphore.run(fn);
  }

  tryAcquire(): boolean { return this.semaphore.tryAcquire(); }
}

export class ReadWriteLock {
  private readers = 0;
  private writer = false;
  private readQueue: (() => void)[] = [];
  private writeQueue: (() => void)[] = [];

  async acquireRead(): Promise<void> {
    if (!this.writer && this.writeQueue.length === 0) {
      this.readers++;
      return;
    }
    return new Promise<void>((resolve) => { this.readQueue.push(resolve); });
  }

  releaseRead(): void {
    this.readers--;
    if (this.readers === 0 && this.writeQueue.length > 0) {
      this.writer = true;
      this.writeQueue.shift()!();
    }
  }

  async acquireWrite(): Promise<void> {
    if (!this.writer && this.readers === 0) {
      this.writer = true;
      return;
    }
    return new Promise<void>((resolve) => { this.writeQueue.push(resolve); });
  }

  releaseWrite(): void {
    this.writer = false;
    if (this.writeQueue.length > 0) {
      this.writer = true;
      this.writeQueue.shift()!();
    } else {
      while (this.readQueue.length > 0) {
        this.readers++;
        this.readQueue.shift()!();
      }
    }
  }
}
