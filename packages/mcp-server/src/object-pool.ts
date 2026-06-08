export class ObjectPool<T> {
  private pool: T[] = [];
  private active = new Set<T>();
  private readonly factory: () => T;
  private readonly reset?: (obj: T) => void;
  private readonly maxSize: number;

  constructor(factory: () => T, options?: { reset?: (obj: T) => void; maxSize?: number; prewarm?: number }) {
    this.factory = factory;
    this.reset = options?.reset;
    this.maxSize = options?.maxSize ?? Infinity;
    if (options?.prewarm) {
      for (let i = 0; i < options.prewarm; i++) {
        this.pool.push(factory());
      }
    }
  }

  acquire(): T {
    let obj: T;
    if (this.pool.length > 0) {
      obj = this.pool.pop()!;
    } else {
      obj = this.factory();
    }
    this.active.add(obj);
    return obj;
  }

  release(obj: T): boolean {
    if (!this.active.has(obj)) return false;
    this.active.delete(obj);
    if (this.reset) this.reset(obj);
    if (this.pool.length < this.maxSize) {
      this.pool.push(obj);
    }
    return true;
  }

  get available(): number {
    return this.pool.length;
  }

  get inUse(): number {
    return this.active.size;
  }

  get totalSize(): number {
    return this.pool.length + this.active.size;
  }

  clear(): void {
    this.pool.length = 0;
    this.active.clear();
  }
}
