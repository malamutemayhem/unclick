export class ResourcePool<T> {
  private available: T[] = [];
  private inUse = new Set<T>();
  private maxSize: number;
  private factory: () => T | Promise<T>;
  private destroyer?: (resource: T) => void | Promise<void>;

  constructor(opts: {
    maxSize: number;
    factory: () => T | Promise<T>;
    destroyer?: (resource: T) => void | Promise<void>;
  }) {
    this.maxSize = opts.maxSize;
    this.factory = opts.factory;
    this.destroyer = opts.destroyer;
  }

  async acquire(): Promise<T> {
    if (this.available.length > 0) {
      const resource = this.available.pop()!;
      this.inUse.add(resource);
      return resource;
    }
    if (this.inUse.size >= this.maxSize) {
      throw new Error("Pool exhausted");
    }
    const resource = await this.factory();
    this.inUse.add(resource);
    return resource;
  }

  release(resource: T): void {
    if (!this.inUse.has(resource)) return;
    this.inUse.delete(resource);
    this.available.push(resource);
  }

  async destroy(resource: T): Promise<void> {
    this.inUse.delete(resource);
    if (this.destroyer) await this.destroyer(resource);
  }

  async destroyAll(): Promise<void> {
    const all = [...this.available, ...this.inUse];
    this.available = [];
    this.inUse.clear();
    if (this.destroyer) {
      for (const r of all) await this.destroyer(r);
    }
  }

  get availableCount(): number {
    return this.available.length;
  }

  get inUseCount(): number {
    return this.inUse.size;
  }

  get totalCount(): number {
    return this.available.length + this.inUse.size;
  }
}
