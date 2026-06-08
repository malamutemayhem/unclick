export interface ListNode<T> {
  value: T;
  prev: ListNode<T> | null;
  next: ListNode<T> | null;
}

export class LinkedList<T> {
  head: ListNode<T> | null = null;
  tail: ListNode<T> | null = null;
  private _size = 0;

  get size(): number {
    return this._size;
  }

  pushBack(value: T): ListNode<T> {
    const node: ListNode<T> = { value, prev: this.tail, next: null };
    if (this.tail) {
      this.tail.next = node;
    } else {
      this.head = node;
    }
    this.tail = node;
    this._size++;
    return node;
  }

  pushFront(value: T): ListNode<T> {
    const node: ListNode<T> = { value, prev: null, next: this.head };
    if (this.head) {
      this.head.prev = node;
    } else {
      this.tail = node;
    }
    this.head = node;
    this._size++;
    return node;
  }

  popBack(): T | undefined {
    if (!this.tail) return undefined;
    const value = this.tail.value;
    this.remove(this.tail);
    return value;
  }

  popFront(): T | undefined {
    if (!this.head) return undefined;
    const value = this.head.value;
    this.remove(this.head);
    return value;
  }

  remove(node: ListNode<T>): void {
    if (node.prev) {
      node.prev.next = node.next;
    } else {
      this.head = node.next;
    }
    if (node.next) {
      node.next.prev = node.prev;
    } else {
      this.tail = node.prev;
    }
    node.prev = null;
    node.next = null;
    this._size--;
  }

  find(predicate: (value: T) => boolean): ListNode<T> | null {
    let current = this.head;
    while (current) {
      if (predicate(current.value)) return current;
      current = current.next;
    }
    return null;
  }

  toArray(): T[] {
    const result: T[] = [];
    let current = this.head;
    while (current) {
      result.push(current.value);
      current = current.next;
    }
    return result;
  }

  toArrayReverse(): T[] {
    const result: T[] = [];
    let current = this.tail;
    while (current) {
      result.push(current.value);
      current = current.prev;
    }
    return result;
  }

  clear(): void {
    this.head = null;
    this.tail = null;
    this._size = 0;
  }

  *[Symbol.iterator](): Generator<T> {
    let current = this.head;
    while (current) {
      yield current.value;
      current = current.next;
    }
  }
}
