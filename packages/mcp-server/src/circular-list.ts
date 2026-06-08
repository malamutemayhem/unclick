export class CircularList<T> {
  private items: T[] = [];
  private cursor = 0;

  constructor(items?: T[]) {
    if (items) this.items = [...items];
  }

  add(item: T): void {
    this.items.push(item);
  }

  remove(index: number): T | undefined {
    if (index < 0 || index >= this.items.length) return undefined;
    const removed = this.items.splice(index, 1)[0];
    if (this.cursor >= this.items.length && this.items.length > 0) {
      this.cursor = 0;
    }
    return removed;
  }

  get(index: number): T | undefined {
    if (this.items.length === 0) return undefined;
    const i = ((index % this.items.length) + this.items.length) % this.items.length;
    return this.items[i];
  }

  next(): T | undefined {
    if (this.items.length === 0) return undefined;
    const item = this.items[this.cursor];
    this.cursor = (this.cursor + 1) % this.items.length;
    return item;
  }

  prev(): T | undefined {
    if (this.items.length === 0) return undefined;
    this.cursor = (this.cursor - 1 + this.items.length) % this.items.length;
    return this.items[this.cursor];
  }

  current(): T | undefined {
    if (this.items.length === 0) return undefined;
    return this.items[this.cursor];
  }

  seek(index: number): void {
    if (this.items.length === 0) return;
    this.cursor = ((index % this.items.length) + this.items.length) % this.items.length;
  }

  size(): number {
    return this.items.length;
  }

  toArray(): T[] {
    return [...this.items];
  }

  rotate(n: number): void {
    if (this.items.length === 0) return;
    const shift = ((n % this.items.length) + this.items.length) % this.items.length;
    this.items = [...this.items.slice(shift), ...this.items.slice(0, shift)];
    this.cursor = 0;
  }

  contains(item: T): boolean {
    return this.items.includes(item);
  }

  indexOf(item: T): number {
    return this.items.indexOf(item);
  }

  clear(): void {
    this.items = [];
    this.cursor = 0;
  }

  map<U>(fn: (item: T, index: number) => U): CircularList<U> {
    return new CircularList(this.items.map(fn));
  }

  filter(fn: (item: T) => boolean): CircularList<T> {
    return new CircularList(this.items.filter(fn));
  }
}
