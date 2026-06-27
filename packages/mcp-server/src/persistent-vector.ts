const BITS = 5;
const WIDTH = 1 << BITS;
const MASK = WIDTH - 1;

type Node<T> = T[] | Node<T>[];

export class PersistentVector<T> {
  private root: Node<T>;
  private tail: T[];
  private _size: number;
  private shift: number;

  private constructor(size: number, shift: number, root: Node<T>, tail: T[]) {
    this._size = size;
    this.shift = shift;
    this.root = root;
    this.tail = tail;
  }

  static empty<T>(): PersistentVector<T> {
    return new PersistentVector<T>(0, BITS, [], []);
  }

  static of<T>(...items: T[]): PersistentVector<T> {
    let v = PersistentVector.empty<T>();
    for (const item of items) v = v.push(item);
    return v;
  }

  static from<T>(items: Iterable<T>): PersistentVector<T> {
    let v = PersistentVector.empty<T>();
    for (const item of items) v = v.push(item);
    return v;
  }

  get size(): number {
    return this._size;
  }

  get(index: number): T {
    if (index < 0 || index >= this._size) throw new RangeError(`Index ${index} out of bounds`);
    if (index >= this.tailOffset()) {
      return this.tail[index - this.tailOffset()];
    }
    let node = this.root;
    for (let level = this.shift; level > 0; level -= BITS) {
      node = (node as Node<T>[])[(index >>> level) & MASK];
    }
    return (node as T[])[index & MASK];
  }

  push(value: T): PersistentVector<T> {
    if (this.tail.length < WIDTH) {
      const newTail = [...this.tail, value];
      return new PersistentVector(this._size + 1, this.shift, this.root, newTail);
    }
    let newRoot: Node<T>;
    let newShift = this.shift;
    const tailNode = this.tail;

    if ((this._size >>> BITS) > (1 << this.shift)) {
      newRoot = [this.root, this.newPath(this.shift, tailNode)];
      newShift += BITS;
    } else {
      newRoot = this.pushTail(this.shift, this.root, tailNode);
    }
    return new PersistentVector(this._size + 1, newShift, newRoot, [value]);
  }

  set(index: number, value: T): PersistentVector<T> {
    if (index < 0 || index >= this._size) throw new RangeError(`Index ${index} out of bounds`);
    if (index >= this.tailOffset()) {
      const newTail = [...this.tail];
      newTail[index - this.tailOffset()] = value;
      return new PersistentVector(this._size, this.shift, this.root, newTail);
    }
    const newRoot = this.doSet(this.shift, this.root, index, value);
    return new PersistentVector(this._size, this.shift, newRoot, this.tail);
  }

  pop(): PersistentVector<T> {
    if (this._size === 0) throw new Error("Cannot pop from empty vector");
    if (this._size === 1) return PersistentVector.empty<T>();
    if (this.tail.length > 1) {
      const newTail = this.tail.slice(0, -1);
      return new PersistentVector(this._size - 1, this.shift, this.root, newTail);
    }
    const newTail = this.getArray(this._size - 2);
    let newRoot = this.popTail(this.shift, this.root);
    let newShift = this.shift;
    if (newRoot === null) newRoot = [];
    if (this.shift > BITS && (newRoot as Node<T>[]).length === 1) {
      newRoot = (newRoot as Node<T>[])[0];
      newShift -= BITS;
    }
    return new PersistentVector(this._size - 1, newShift, newRoot, [...newTail]);
  }

  toArray(): T[] {
    const result: T[] = [];
    for (let i = 0; i < this._size; i++) result.push(this.get(i));
    return result;
  }

  map<U>(fn: (value: T, index: number) => U): PersistentVector<U> {
    let result = PersistentVector.empty<U>();
    for (let i = 0; i < this._size; i++) result = result.push(fn(this.get(i), i));
    return result;
  }

  filter(fn: (value: T, index: number) => boolean): PersistentVector<T> {
    let result = PersistentVector.empty<T>();
    for (let i = 0; i < this._size; i++) {
      const v = this.get(i);
      if (fn(v, i)) result = result.push(v);
    }
    return result;
  }

  reduce<U>(fn: (acc: U, value: T, index: number) => U, initial: U): U {
    let acc = initial;
    for (let i = 0; i < this._size; i++) acc = fn(acc, this.get(i), i);
    return acc;
  }

  slice(start: number, end?: number): PersistentVector<T> {
    const s = Math.max(0, start < 0 ? this._size + start : start);
    const e = Math.min(this._size, end === undefined ? this._size : end < 0 ? this._size + end : end);
    let result = PersistentVector.empty<T>();
    for (let i = s; i < e; i++) result = result.push(this.get(i));
    return result;
  }

  concat(other: PersistentVector<T>): PersistentVector<T> {
    let result: PersistentVector<T> = this;
    for (let i = 0; i < other.size; i++) result = result.push(other.get(i));
    return result;
  }

  find(fn: (value: T) => boolean): T | undefined {
    for (let i = 0; i < this._size; i++) {
      const v = this.get(i);
      if (fn(v)) return v;
    }
    return undefined;
  }

  indexOf(value: T): number {
    for (let i = 0; i < this._size; i++) {
      if (this.get(i) === value) return i;
    }
    return -1;
  }

  private tailOffset(): number {
    return this._size < WIDTH ? 0 : ((this._size - 1) >>> BITS) << BITS;
  }

  private newPath(level: number, node: Node<T>): Node<T> {
    if (level === 0) return node;
    return [this.newPath(level - BITS, node)];
  }

  private pushTail(level: number, parent: Node<T>, tailNode: T[]): Node<T> {
    const subIdx = ((this._size - 1) >>> level) & MASK;
    const result = [...parent] as Node<T>[];
    if (level === BITS) {
      result[subIdx] = tailNode;
    } else if (subIdx < parent.length) {
      result[subIdx] = this.pushTail(level - BITS, (parent as Node<T>[])[subIdx], tailNode);
    } else {
      result[subIdx] = this.newPath(level - BITS, tailNode);
    }
    return result;
  }

  private doSet(level: number, node: Node<T>, index: number, value: T): Node<T> {
    if (level === 0) {
      const result = [...node] as T[];
      result[index & MASK] = value;
      return result;
    }
    const result = [...node] as Node<T>[];
    const subIdx = (index >>> level) & MASK;
    result[subIdx] = this.doSet(level - BITS, (node as Node<T>[])[subIdx], index, value);
    return result;
  }

  private getArray(index: number): T[] {
    if (index >= this.tailOffset()) return this.tail;
    let node = this.root;
    for (let level = this.shift; level > 0; level -= BITS) {
      node = (node as Node<T>[])[(index >>> level) & MASK];
    }
    return node as T[];
  }

  private popTail(level: number, node: Node<T>): Node<T> | null {
    const subIdx = ((this._size - 2) >>> level) & MASK;
    if (level > BITS) {
      const newChild = this.popTail(level - BITS, (node as Node<T>[])[subIdx]);
      if (newChild === null && subIdx === 0) return null;
      const result = [...node] as Node<T>[];
      if (newChild === null) {
        result.length = subIdx;
      } else {
        result[subIdx] = newChild;
      }
      return result;
    }
    if (subIdx === 0) return null;
    const result = [...node] as Node<T>[];
    result.length = subIdx;
    return result;
  }
}
