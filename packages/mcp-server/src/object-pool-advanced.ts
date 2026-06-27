export class ObjectPool<T> {
  private pool: T[] = [];
  private active = new Set<T>();
  private factory: () => T;
  private reset?: (obj: T) => void;
  private maxSize: number;
  private totalCreated = 0;
  private totalAcquired = 0;
  private totalReleased = 0;

  constructor(factory: () => T, options: { initialSize?: number; maxSize?: number; reset?: (obj: T) => void } = {}) {
    this.factory = factory;
    this.reset = options.reset;
    this.maxSize = options.maxSize ?? Infinity;
    const initial = options.initialSize ?? 0;
    for (let i = 0; i < initial; i++) {
      this.pool.push(this.factory());
      this.totalCreated++;
    }
  }

  acquire(): T | undefined {
    let obj: T;
    if (this.pool.length > 0) {
      obj = this.pool.pop()!;
    } else if (this.active.size < this.maxSize) {
      obj = this.factory();
      this.totalCreated++;
    } else {
      return undefined;
    }
    this.active.add(obj);
    this.totalAcquired++;
    return obj;
  }

  release(obj: T): boolean {
    if (!this.active.has(obj)) return false;
    this.active.delete(obj);
    if (this.reset) this.reset(obj);
    this.pool.push(obj);
    this.totalReleased++;
    return true;
  }

  available(): number {
    return this.pool.length;
  }

  inUse(): number {
    return this.active.size;
  }

  totalSize(): number {
    return this.pool.length + this.active.size;
  }

  stats(): { created: number; acquired: number; released: number; hitRate: number } {
    const reused = this.totalAcquired - this.totalCreated;
    const hitRate = this.totalAcquired > 0 ? Math.max(0, reused) / this.totalAcquired : 0;
    return {
      created: this.totalCreated,
      acquired: this.totalAcquired,
      released: this.totalReleased,
      hitRate,
    };
  }

  drain(): void {
    this.pool.length = 0;
  }

  prewarm(count: number): void {
    for (let i = 0; i < count && this.totalSize() < this.maxSize; i++) {
      this.pool.push(this.factory());
      this.totalCreated++;
    }
  }
}

export class TypedPool {
  private pools = new Map<string, ObjectPool<unknown>>();

  register<T>(type: string, factory: () => T, options?: { initialSize?: number; maxSize?: number; reset?: (obj: T) => void }): void {
    this.pools.set(type, new ObjectPool(factory, options) as unknown as ObjectPool<unknown>);
  }

  acquire<T>(type: string): T | undefined {
    return this.pools.get(type)?.acquire() as T | undefined;
  }

  release<T>(type: string, obj: T): boolean {
    const pool = this.pools.get(type);
    return pool ? pool.release(obj as unknown) : false;
  }

  stats(type: string): ReturnType<ObjectPool<unknown>["stats"]> | undefined {
    return this.pools.get(type)?.stats();
  }

  types(): string[] {
    return [...this.pools.keys()];
  }
}
