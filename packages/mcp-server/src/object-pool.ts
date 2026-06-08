export class ObjectPool<T> {
  private available: T[] = [];
  private inUse = new Set<T>();
  private factory: () => T;
  private reset?: (obj: T) => void;
  private maxSize: number;

  constructor(options: { factory: () => T; reset?: (obj: T) => void; initialSize?: number; maxSize?: number }) {
    this.factory = options.factory;
    this.reset = options.reset;
    this.maxSize = options.maxSize ?? Infinity;
    for (let i = 0; i < (options.initialSize ?? 0); i++) {
      this.available.push(this.factory());
    }
  }

  acquire(): T {
    let obj: T;
    if (this.available.length > 0) {
      obj = this.available.pop()!;
    } else {
      obj = this.factory();
    }
    this.inUse.add(obj);
    return obj;
  }

  release(obj: T): void {
    if (!this.inUse.has(obj)) return;
    this.inUse.delete(obj);
    this.reset?.(obj);
    if (this.available.length < this.maxSize) {
      this.available.push(obj);
    }
  }

  get availableCount(): number { return this.available.length; }
  get inUseCount(): number { return this.inUse.size; }
  get totalCount(): number { return this.available.length + this.inUse.size; }

  clear(): void {
    this.available = [];
    this.inUse.clear();
  }

  drain(): void {
    this.available = [];
  }
}
