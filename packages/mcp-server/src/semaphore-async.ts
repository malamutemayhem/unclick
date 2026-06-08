interface Waiter {
  resolve: () => void;
  weight: number;
}

export class AsyncSemaphore {
  private permits: number;
  private readonly maxPermits: number;
  private waiters: Waiter[] = [];
  private acquireCount = 0;
  private releaseCount = 0;

  constructor(permits: number = 1) {
    this.permits = permits;
    this.maxPermits = permits;
  }

  async acquire(weight: number = 1): Promise<void> {
    if (weight > this.maxPermits) {
      throw new Error(`Weight ${weight} exceeds max permits ${this.maxPermits}`);
    }
    if (this.permits >= weight) {
      this.permits -= weight;
      this.acquireCount++;
      return;
    }
    return new Promise<void>((resolve) => {
      this.waiters.push({ resolve, weight });
    });
  }

  release(weight: number = 1): void {
    this.permits = Math.min(this.permits + weight, this.maxPermits);
    this.releaseCount++;
    this.processWaiters();
  }

  private processWaiters(): void {
    while (this.waiters.length > 0 && this.permits >= this.waiters[0].weight) {
      const waiter = this.waiters.shift()!;
      this.permits -= waiter.weight;
      this.acquireCount++;
      waiter.resolve();
    }
  }

  tryAcquire(weight: number = 1): boolean {
    if (this.permits >= weight) {
      this.permits -= weight;
      this.acquireCount++;
      return true;
    }
    return false;
  }

  async withPermit<T>(fn: () => Promise<T>, weight: number = 1): Promise<T> {
    await this.acquire(weight);
    try {
      return await fn();
    } finally {
      this.release(weight);
    }
  }

  get available(): number {
    return this.permits;
  }

  get waiting(): number {
    return this.waiters.length;
  }

  get totalAcquires(): number {
    return this.acquireCount;
  }

  get totalReleases(): number {
    return this.releaseCount;
  }

  drain(): void {
    this.permits = 0;
  }

  reset(): void {
    this.permits = this.maxPermits;
    this.processWaiters();
  }
}

export class AsyncMutex {
  private semaphore = new AsyncSemaphore(1);

  async lock(): Promise<void> {
    await this.semaphore.acquire();
  }

  unlock(): void {
    this.semaphore.release();
  }

  tryLock(): boolean {
    return this.semaphore.tryAcquire();
  }

  async withLock<T>(fn: () => Promise<T>): Promise<T> {
    return this.semaphore.withPermit(fn);
  }

  get isLocked(): boolean {
    return this.semaphore.available === 0;
  }
}

export class AsyncBarrier {
  private count = 0;
  private readonly parties: number;
  private waiters: (() => void)[] = [];
  private generation = 0;

  constructor(parties: number) {
    this.parties = parties;
  }

  async wait(): Promise<number> {
    const gen = this.generation;
    this.count++;
    if (this.count >= this.parties) {
      this.generation++;
      this.count = 0;
      const w = this.waiters;
      this.waiters = [];
      for (const resolve of w) resolve();
      return 0;
    }
    return new Promise<number>((resolve) => {
      this.waiters.push(() => resolve(gen));
    });
  }

  get waiting(): number {
    return this.count;
  }

  get currentGeneration(): number {
    return this.generation;
  }
}
