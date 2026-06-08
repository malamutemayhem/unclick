export interface PoolOptions {
  maxSize: number;
  acquireTimeoutMs?: number;
}

export interface PooledResource<T> {
  resource: T;
  createdAt: number;
  lastUsed: number;
  useCount: number;
}

export class ResourcePool<T> {
  private available: PooledResource<T>[] = [];
  private inUse = new Map<T, PooledResource<T>>();
  private factory: () => T;
  private options: PoolOptions;

  constructor(factory: () => T, options: PoolOptions) {
    this.factory = factory;
    this.options = options;
  }

  acquire(): T | undefined {
    let pooled = this.available.pop();
    if (!pooled) {
      if (this.totalSize >= this.options.maxSize) return undefined;
      pooled = {
        resource: this.factory(),
        createdAt: Date.now(),
        lastUsed: Date.now(),
        useCount: 0,
      };
    }
    pooled.lastUsed = Date.now();
    pooled.useCount++;
    this.inUse.set(pooled.resource, pooled);
    return pooled.resource;
  }

  release(resource: T): boolean {
    const pooled = this.inUse.get(resource);
    if (!pooled) return false;
    this.inUse.delete(resource);
    this.available.push(pooled);
    return true;
  }

  destroy(resource: T): boolean {
    const pooled = this.inUse.get(resource);
    if (!pooled) return false;
    this.inUse.delete(resource);
    return true;
  }

  get availableCount(): number {
    return this.available.length;
  }

  get inUseCount(): number {
    return this.inUse.size;
  }

  get totalSize(): number {
    return this.available.length + this.inUse.size;
  }

  drain(): void {
    this.available = [];
    this.inUse.clear();
  }

  stats(): { available: number; inUse: number; total: number; maxSize: number } {
    return {
      available: this.available.length,
      inUse: this.inUse.size,
      total: this.totalSize,
      maxSize: this.options.maxSize,
    };
  }
}
