export class ObjectPool<T> {
  private pool: T[] = [];
  private factory: () => T;
  private resetter?: (obj: T) => void;
  private maxSize: number;

  constructor(opts: {
    factory: () => T;
    reset?: (obj: T) => void;
    initialSize?: number;
    maxSize?: number;
  }) {
    this.factory = opts.factory;
    this.resetter = opts.reset;
    this.maxSize = opts.maxSize ?? 100;
    const initial = opts.initialSize ?? 0;
    for (let i = 0; i < initial; i++) {
      this.pool.push(this.factory());
    }
  }

  acquire(): T {
    if (this.pool.length > 0) {
      return this.pool.pop()!;
    }
    return this.factory();
  }

  release(obj: T): void {
    if (this.pool.length >= this.maxSize) return;
    if (this.resetter) this.resetter(obj);
    this.pool.push(obj);
  }

  prewarm(count: number): void {
    for (let i = 0; i < count && this.pool.length < this.maxSize; i++) {
      this.pool.push(this.factory());
    }
  }

  clear(): void {
    this.pool = [];
  }

  get available(): number {
    return this.pool.length;
  }
}
