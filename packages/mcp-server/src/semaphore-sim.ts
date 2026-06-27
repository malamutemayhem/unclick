export class Semaphore {
  private count: number;
  private maxCount: number;
  private waitQueue: string[] = [];

  constructor(initial = 1, max?: number) {
    this.count = initial;
    this.maxCount = max ?? initial;
  }

  acquire(processId: string): boolean {
    if (this.count > 0) {
      this.count--;
      return true;
    }
    this.waitQueue.push(processId);
    return false;
  }

  release(): string | null {
    if (this.waitQueue.length > 0) {
      return this.waitQueue.shift()!;
    }
    if (this.count < this.maxCount) {
      this.count++;
    }
    return null;
  }

  get available(): number { return this.count; }
  get waiting(): number { return this.waitQueue.length; }
  get max(): number { return this.maxCount; }
}

export class Mutex {
  private owner: string | null = null;
  private waitQueue: string[] = [];

  lock(processId: string): boolean {
    if (this.owner === null) {
      this.owner = processId;
      return true;
    }
    if (this.owner === processId) return true;
    this.waitQueue.push(processId);
    return false;
  }

  unlock(processId: string): string | null {
    if (this.owner !== processId) return null;
    if (this.waitQueue.length > 0) {
      this.owner = this.waitQueue.shift()!;
      return this.owner;
    }
    this.owner = null;
    return null;
  }

  tryLock(processId: string): boolean {
    if (this.owner === null) {
      this.owner = processId;
      return true;
    }
    return false;
  }

  get isLocked(): boolean { return this.owner !== null; }
  get currentOwner(): string | null { return this.owner; }
  get waiting(): number { return this.waitQueue.length; }
}

export class ReadWriteLock {
  private readers = new Set<string>();
  private writer: string | null = null;
  private readWait: string[] = [];
  private writeWait: string[] = [];

  readLock(processId: string): boolean {
    if (this.writer === null && this.writeWait.length === 0) {
      this.readers.add(processId);
      return true;
    }
    this.readWait.push(processId);
    return false;
  }

  readUnlock(processId: string): void {
    this.readers.delete(processId);
    if (this.readers.size === 0 && this.writeWait.length > 0) {
      this.writer = this.writeWait.shift()!;
    }
  }

  writeLock(processId: string): boolean {
    if (this.writer === null && this.readers.size === 0) {
      this.writer = processId;
      return true;
    }
    this.writeWait.push(processId);
    return false;
  }

  writeUnlock(processId: string): void {
    if (this.writer !== processId) return;
    this.writer = null;

    if (this.writeWait.length > 0) {
      this.writer = this.writeWait.shift()!;
    } else {
      while (this.readWait.length > 0) {
        this.readers.add(this.readWait.shift()!);
      }
    }
  }

  get readerCount(): number { return this.readers.size; }
  get hasWriter(): boolean { return this.writer !== null; }
  get currentWriter(): string | null { return this.writer; }
  get readWaiting(): number { return this.readWait.length; }
  get writeWaiting(): number { return this.writeWait.length; }
}

export class Barrier {
  private count: number;
  private waiting: string[] = [];
  private generation = 0;

  constructor(count: number) {
    this.count = count;
  }

  arrive(processId: string): { released: boolean; generation: number; waiters: string[] } {
    this.waiting.push(processId);
    if (this.waiting.length >= this.count) {
      const waiters = [...this.waiting];
      this.waiting = [];
      this.generation++;
      return { released: true, generation: this.generation, waiters };
    }
    return { released: false, generation: this.generation, waiters: [] };
  }

  get arrived(): number { return this.waiting.length; }
  get threshold(): number { return this.count; }
  get currentGeneration(): number { return this.generation; }
}
