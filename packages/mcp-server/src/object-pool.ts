export class ObjectPool<T> {
  private available: T[] = [];
  private inUse = new Set<T>();
  private readonly factory: () => T;
  private readonly reset?: (obj: T) => void;
  private readonly maxSize: number;
  private created = 0;

  constructor(options: {
    factory: () => T;
    reset?: (obj: T) => void;
    initialSize?: number;
    maxSize?: number;
  }) {
    this.factory = options.factory;
    this.reset = options.reset;
    this.maxSize = options.maxSize || Infinity;

    for (let i = 0; i < (options.initialSize || 0); i++) {
      this.available.push(this.factory());
      this.created++;
    }
  }

  acquire(): T {
    let obj: T;
    if (this.available.length > 0) {
      obj = this.available.pop()!;
    } else if (this.created < this.maxSize) {
      obj = this.factory();
      this.created++;
    } else {
      throw new Error("Pool exhausted");
    }
    this.inUse.add(obj);
    return obj;
  }

  release(obj: T): void {
    if (!this.inUse.has(obj)) return;
    this.inUse.delete(obj);
    this.reset?.(obj);
    this.available.push(obj);
  }

  get availableCount(): number {
    return this.available.length;
  }

  get inUseCount(): number {
    return this.inUse.size;
  }

  get totalCreated(): number {
    return this.created;
  }

  drain(): void {
    this.available = [];
  }
}
