export class ObjectPool<T> {
  private pool: T[] = [];
  private _created = 0;
  private _reused = 0;

  constructor(
    private factory: () => T,
    private reset?: (obj: T) => void,
    private maxSize = 64
  ) {}

  get created(): number {
    return this._created;
  }

  get reused(): number {
    return this._reused;
  }

  get available(): number {
    return this.pool.length;
  }

  acquire(): T {
    if (this.pool.length > 0) {
      this._reused++;
      return this.pool.pop()!;
    }
    this._created++;
    return this.factory();
  }

  release(obj: T): void {
    if (this.pool.length >= this.maxSize) return;
    if (this.reset) this.reset(obj);
    this.pool.push(obj);
  }

  drain(): void {
    this.pool.length = 0;
  }

  fill(count: number): void {
    const toCreate = Math.min(count, this.maxSize) - this.pool.length;
    for (let i = 0; i < toCreate; i++) {
      this._created++;
      this.pool.push(this.factory());
    }
  }
}
