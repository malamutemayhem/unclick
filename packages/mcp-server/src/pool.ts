export class Pool<T> {
  private available: T[] = [];
  private inUse = new Set<T>();
  private waiters: ((item: T) => void)[] = [];
  private factory: () => T;
  private destroyer: ((item: T) => void) | undefined;
  private maxSize: number;

  constructor(options: { factory: () => T; destroy?: (item: T) => void; maxSize?: number; initialSize?: number }) {
    this.factory = options.factory;
    this.destroyer = options.destroy;
    this.maxSize = options.maxSize || 10;
    const initial = options.initialSize || 0;
    for (let i = 0; i < initial; i++) {
      this.available.push(this.factory());
    }
  }

  get size(): number { return this.available.length + this.inUse.size; }
  get activeCount(): number { return this.inUse.size; }
  get idleCount(): number { return this.available.length; }
  get waitingCount(): number { return this.waiters.length; }

  acquire(): Promise<T> {
    if (this.available.length > 0) {
      const item = this.available.pop()!;
      this.inUse.add(item);
      return Promise.resolve(item);
    }
    if (this.size < this.maxSize) {
      const item = this.factory();
      this.inUse.add(item);
      return Promise.resolve(item);
    }
    return new Promise<T>((resolve) => { this.waiters.push(resolve); });
  }

  release(item: T): void {
    if (!this.inUse.has(item)) return;
    this.inUse.delete(item);
    const waiter = this.waiters.shift();
    if (waiter) {
      this.inUse.add(item);
      waiter(item);
    } else {
      this.available.push(item);
    }
  }

  async use<R>(fn: (item: T) => Promise<R>): Promise<R> {
    const item = await this.acquire();
    try { return await fn(item); }
    finally { this.release(item); }
  }

  drain(): void {
    for (const item of this.available) {
      if (this.destroyer) this.destroyer(item);
    }
    this.available.length = 0;
  }

  destroyAll(): void {
    this.drain();
    for (const item of this.inUse) {
      if (this.destroyer) this.destroyer(item);
    }
    this.inUse.clear();
  }
}
