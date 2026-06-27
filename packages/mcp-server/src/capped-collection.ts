export class CappedCollection<T> {
  private items: T[] = [];
  private readonly maxSize: number;
  private readonly onEvict?: (item: T) => void;

  constructor(maxSize: number, onEvict?: (item: T) => void) {
    this.maxSize = maxSize;
    this.onEvict = onEvict;
  }

  add(item: T): T | undefined {
    let evicted: T | undefined;
    if (this.items.length >= this.maxSize) {
      evicted = this.items.shift();
      if (evicted !== undefined && this.onEvict) this.onEvict(evicted);
    }
    this.items.push(item);
    return evicted;
  }

  get(index: number): T | undefined {
    return this.items[index];
  }

  latest(n?: number): T[] {
    if (n === undefined) return [...this.items];
    return this.items.slice(-n);
  }

  oldest(n: number): T[] {
    return this.items.slice(0, n);
  }

  get size(): number {
    return this.items.length;
  }

  get full(): boolean {
    return this.items.length >= this.maxSize;
  }

  clear(): void {
    this.items = [];
  }

  find(pred: (item: T) => boolean): T | undefined {
    return this.items.find(pred);
  }

  filter(pred: (item: T) => boolean): T[] {
    return this.items.filter(pred);
  }

  toArray(): T[] {
    return [...this.items];
  }
}
