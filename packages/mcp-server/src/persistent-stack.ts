interface PSNode<T> {
  value: T;
  next: PSNode<T> | null;
}

export class PersistentStack<T> {
  private head: PSNode<T> | null;
  private _size: number;

  constructor(head: PSNode<T> | null = null, size = 0) {
    this.head = head;
    this._size = size;
  }

  push(value: T): PersistentStack<T> {
    return new PersistentStack<T>({ value, next: this.head }, this._size + 1);
  }

  pop(): { value: T; stack: PersistentStack<T> } | undefined {
    if (!this.head) return undefined;
    return {
      value: this.head.value,
      stack: new PersistentStack<T>(this.head.next, this._size - 1),
    };
  }

  peek(): T | undefined {
    return this.head?.value;
  }

  size(): number {
    return this._size;
  }

  isEmpty(): boolean {
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

  reverse(): PersistentStack<T> {
    let result = new PersistentStack<T>();
    let node = this.head;
    while (node) {
      result = result.push(node.value);
      node = node.next;
    }
    return result;
  }

  static from<T>(items: T[]): PersistentStack<T> {
    let stack = new PersistentStack<T>();
    for (let i = items.length - 1; i >= 0; i--) {
      stack = stack.push(items[i]);
    }
    return stack;
  }
}
