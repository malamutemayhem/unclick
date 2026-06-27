export class Mutex {
  private locked: boolean = false;
  private queue: (() => void)[] = [];
  private owner: string | null = null;

  async acquire(ownerId?: string): Promise<void> {
    if (!this.locked) {
      this.locked = true;
      this.owner = ownerId ?? null;
      return;
    }
    return new Promise<void>((resolve) => {
      this.queue.push(() => {
        this.owner = ownerId ?? null;
        resolve();
      });
    });
  }

  release(): void {
    if (!this.locked) return;
    if (this.queue.length > 0) {
      const next = this.queue.shift()!;
      next();
    } else {
      this.locked = false;
      this.owner = null;
    }
  }

  isLocked(): boolean {
    return this.locked;
  }

  getOwner(): string | null {
    return this.owner;
  }

  queueLength(): number {
    return this.queue.length;
  }

  async withLock<T>(fn: () => Promise<T>, ownerId?: string): Promise<T> {
    await this.acquire(ownerId);
    try {
      return await fn();
    } finally {
      this.release();
    }
  }

  tryAcquire(ownerId?: string): boolean {
    if (this.locked) return false;
    this.locked = true;
    this.owner = ownerId ?? null;
    return true;
  }
}

export class ReadWriteLock {
  private readers: number = 0;
  private writer: boolean = false;
  private readQueue: (() => void)[] = [];
  private writeQueue: (() => void)[] = [];

  async acquireRead(): Promise<void> {
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
    return new Promise<void>((resolve) => {
      this.writeQueue.push(() => resolve());
    });
  }

  releaseWrite(): void {
    this.writer = false;
    if (this.writeQueue.length > 0) {
      this.writer = true;
      this.writeQueue.shift()!();
    } else {
      while (this.readQueue.length > 0) {
        this.readQueue.shift()!();
      }
    }
  }

  readerCount(): number {
    return this.readers;
  }

  isWriteLocked(): boolean {
    return this.writer;
  }
}
