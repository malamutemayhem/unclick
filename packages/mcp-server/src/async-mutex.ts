export class AsyncMutex {
  private locked = false;
  private queue: Array<() => void> = [];

  get isLocked(): boolean {
    return this.locked;
  }

  get waiting(): number {
    return this.queue.length;
  }

  async acquire(): Promise<() => void> {
    if (!this.locked) {
      this.locked = true;
      return this.createRelease();
    }
    return new Promise<() => void>((resolve) => {
      this.queue.push(() => resolve(this.createRelease()));
    });
  }

  async runExclusive<T>(fn: () => T | Promise<T>): Promise<T> {
    const release = await this.acquire();
    try {
      return await fn();
    } finally {
      release();
    }
  }

  private createRelease(): () => void {
    let released = false;
    return () => {
      if (released) return;
      released = true;
      if (this.queue.length > 0) {
        const next = this.queue.shift()!;
        next();
      } else {
        this.locked = false;
      }
    };
  }
}

export class AsyncRWLock {
  private readers = 0;
  private writing = false;
  private readQueue: Array<() => void> = [];
  private writeQueue: Array<() => void> = [];

  async acquireRead(): Promise<() => void> {
    if (!this.writing && this.writeQueue.length === 0) {
      this.readers++;
      return this.createReadRelease();
    }
    return new Promise<() => void>((resolve) => {
      this.readQueue.push(() => {
        this.readers++;
        resolve(this.createReadRelease());
      });
    });
  }

  async acquireWrite(): Promise<() => void> {
    if (!this.writing && this.readers === 0) {
      this.writing = true;
      return this.createWriteRelease();
    }
    return new Promise<() => void>((resolve) => {
      this.writeQueue.push(() => {
        this.writing = true;
        resolve(this.createWriteRelease());
      });
    });
  }

  private createReadRelease(): () => void {
    let released = false;
    return () => {
      if (released) return;
      released = true;
      this.readers--;
      if (this.readers === 0 && this.writeQueue.length > 0) {
        this.writeQueue.shift()!();
      }
    };
  }

  private createWriteRelease(): () => void {
    let released = false;
    return () => {
      if (released) return;
      released = true;
      this.writing = false;
      if (this.readQueue.length > 0) {
        const waiting = [...this.readQueue];
        this.readQueue = [];
        for (const fn of waiting) fn();
      } else if (this.writeQueue.length > 0) {
        this.writeQueue.shift()!();
      }
    };
  }
}
