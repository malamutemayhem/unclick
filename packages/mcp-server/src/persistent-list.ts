interface Node<T> {
  value: T;
  next: Node<T> | null;
}

export class PersistentList<T> {
  private head: Node<T> | null;
  private _size: number;

  private constructor(head: Node<T> | null, size: number) {
    this.head = head;
    this._size = size;
  }

  static empty<T>(): PersistentList<T> {
    return new PersistentList<T>(null, 0);
  }

  static of<T>(...items: T[]): PersistentList<T> {
    let list = PersistentList.empty<T>();
    for (let i = items.length - 1; i >= 0; i--) {
      list = list.prepend(items[i]);
    }
    return list;
  }

  prepend(value: T): PersistentList<T> {
    return new PersistentList({ value, next: this.head }, this._size + 1);
  }

  first(): T | undefined {
    return this.head?.value;
  }

  rest(): PersistentList<T> {
    if (!this.head) return this;
    return new PersistentList(this.head.next, this._size - 1);
  }

  get(index: number): T | undefined {
    let node = this.head;
    let i = 0;
    while (node && i < index) {
      node = node.next;
      i++;
    }
    return node?.value;
  }

  get size(): number {
    return this._size;
  }

  get isEmpty(): boolean {
    return this._size === 0;
  }

  toArray(): T[] {
    const result: T[] = [];
    let node = this.head;
    while (node) {
      result.push(node.value);
      node = node.next;
    }
    return result;
  }

  map<U>(fn: (value: T) => U): PersistentList<U> {
    const arr = this.toArray().map(fn);
    return PersistentList.of(...arr);
  }

  filter(fn: (value: T) => boolean): PersistentList<T> {
    const arr = this.toArray().filter(fn);
    return PersistentList.of(...arr);
  }

  reduce<U>(fn: (acc: U, value: T) => U, initial: U): U {
    let acc = initial;
    let node = this.head;
    while (node) {
      acc = fn(acc, node.value);
      node = node.next;
    }
    return acc;
  }

  reverse(): PersistentList<T> {
    let result = PersistentList.empty<T>();
    let node = this.head;
    while (node) {
      result = result.prepend(node.value);
      node = node.next;
    }
    return result;
  }

  concat(other: PersistentList<T>): PersistentList<T> {
    return PersistentList.of(...this.toArray(), ...other.toArray());
  }

  find(fn: (value: T) => boolean): T | undefined {
    let node = this.head;
    while (node) {
      if (fn(node.value)) return node.value;
      node = node.next;
    }
    return undefined;
  }

  includes(value: T): boolean {
    return this.find((v) => v === value) !== undefined;
  }

  *[Symbol.iterator](): Iterator<T> {
    let node = this.head;
    while (node) {
      yield node.value;
      node = node.next;
    }
  }
}
