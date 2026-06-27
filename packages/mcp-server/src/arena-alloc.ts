export class Arena {
  private buffer: Float64Array;
  private offset = 0;
  private marks: number[] = [];

  constructor(size = 1024) {
    this.buffer = new Float64Array(size);
  }

  get used(): number {
    return this.offset;
  }

  get capacity(): number {
    return this.buffer.length;
  }

  get available(): number {
    return this.buffer.length - this.offset;
  }

  alloc(count: number): { offset: number; view: Float64Array } {
    if (this.offset + count > this.buffer.length) {
      this.grow(Math.max(this.buffer.length * 2, this.offset + count));
    }
    const start = this.offset;
    this.offset += count;
    return { offset: start, view: this.buffer.subarray(start, start + count) };
  }

  allocZeroed(count: number): { offset: number; view: Float64Array } {
    const result = this.alloc(count);
    result.view.fill(0);
    return result;
  }

  get(offset: number, count: number): Float64Array {
    return this.buffer.subarray(offset, offset + count);
  }

  set(offset: number, values: number[]): void {
    for (let i = 0; i < values.length; i++) {
      this.buffer[offset + i] = values[i];
    }
  }

  mark(): number {
    this.marks.push(this.offset);
    return this.marks.length - 1;
  }

  restore(markId?: number): void {
    if (markId !== undefined && markId < this.marks.length) {
      this.offset = this.marks[markId];
      this.marks.length = markId;
    } else if (this.marks.length > 0) {
      this.offset = this.marks.pop()!;
    }
  }

  reset(): void {
    this.offset = 0;
    this.marks = [];
  }

  private grow(newSize: number): void {
    const newBuffer = new Float64Array(newSize);
    newBuffer.set(this.buffer);
    this.buffer = newBuffer;
  }
}

export class TypedArena<T> {
  private items: T[] = [];
  private freed: number[] = [];

  get size(): number {
    return this.items.length - this.freed.length;
  }

  get capacity(): number {
    return this.items.length;
  }

  alloc(value: T): number {
    if (this.freed.length > 0) {
      const idx = this.freed.pop()!;
      this.items[idx] = value;
      return idx;
    }
    this.items.push(value);
    return this.items.length - 1;
  }

  get(handle: number): T {
    return this.items[handle];
  }

  set(handle: number, value: T): void {
    this.items[handle] = value;
  }

  free(handle: number): void {
    this.freed.push(handle);
  }

  forEach(fn: (value: T, handle: number) => void): void {
    const freedSet = new Set(this.freed);
    for (let i = 0; i < this.items.length; i++) {
      if (!freedSet.has(i)) fn(this.items[i], i);
    }
  }

  toArray(): T[] {
    const freedSet = new Set(this.freed);
    return this.items.filter((_, i) => !freedSet.has(i));
  }

  reset(): void {
    this.items = [];
    this.freed = [];
  }
}

export class PoolArena<T> {
  private pool: T[] = [];
  private active = new Set<number>();
  private factory: () => T;
  private resetFn?: (item: T) => void;

  constructor(factory: () => T, initialSize = 0, resetFn?: (item: T) => void) {
    this.factory = factory;
    this.resetFn = resetFn;
    for (let i = 0; i < initialSize; i++) {
      this.pool.push(factory());
    }
  }

  get size(): number {
    return this.active.size;
  }

  get poolSize(): number {
    return this.pool.length;
  }

  acquire(): { handle: number; value: T } {
    let item: T;
    let handle: number;
    if (this.pool.length > this.active.size) {
      for (let i = 0; i < this.pool.length; i++) {
        if (!this.active.has(i)) {
          handle = i;
          item = this.pool[i];
          if (this.resetFn) this.resetFn(item);
          this.active.add(handle);
          return { handle, value: item };
        }
      }
    }
    item = this.factory();
    this.pool.push(item);
    handle = this.pool.length - 1;
    this.active.add(handle);
    return { handle, value: item };
  }

  release(handle: number): void {
    this.active.delete(handle);
  }

  get(handle: number): T {
    return this.pool[handle];
  }
}
