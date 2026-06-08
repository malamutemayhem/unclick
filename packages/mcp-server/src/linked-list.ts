interface Node<T> {
  value: T;
  prev: Node<T> | null;
  next: Node<T> | null;
}

export class LinkedList<T> {
  private head: Node<T> | null = null;
  private tail: Node<T> | null = null;
  private count = 0;

  get size(): number {
    return this.count;
  }

  get isEmpty(): boolean {
    return this.count === 0;
  }

  pushFront(value: T): this {
    const node: Node<T> = { value, prev: null, next: this.head };
    if (this.head) this.head.prev = node;
    this.head = node;
    if (!this.tail) this.tail = node;
    this.count++;
    return this;
  }

  pushBack(value: T): this {
    const node: Node<T> = { value, prev: this.tail, next: null };
    if (this.tail) this.tail.next = node;
    this.tail = node;
    if (!this.head) this.head = node;
    this.count++;
    return this;
  }

  popFront(): T | undefined {
    if (!this.head) return undefined;
    const value = this.head.value;
    this.head = this.head.next;
    if (this.head) this.head.prev = null;
    else this.tail = null;
    this.count--;
    return value;
  }

  popBack(): T | undefined {
    if (!this.tail) return undefined;
    const value = this.tail.value;
    this.tail = this.tail.prev;
    if (this.tail) this.tail.next = null;
    else this.head = null;
    this.count--;
    return value;
  }

  peekFront(): T | undefined {
    return this.head?.value;
  }

  peekBack(): T | undefined {
    return this.tail?.value;
  }

  contains(value: T): boolean {
    let node = this.head;
    while (node) {
      if (node.value === value) return true;
      node = node.next;
    }
    return false;
  }

  remove(value: T): boolean {
    let node = this.head;
    while (node) {
      if (node.value === value) {
        if (node.prev) node.prev.next = node.next;
        else this.head = node.next;
        if (node.next) node.next.prev = node.prev;
        else this.tail = node.prev;
        this.count--;
        return true;
      }
      node = node.next;
    }
    return false;
  }

  clear(): void {
    this.head = null;
    this.tail = null;
    this.count = 0;
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

  toArrayReverse(): T[] {
    const result: T[] = [];
    let node = this.tail;
    while (node) {
      result.push(node.value);
      node = node.prev;
    }
    return result;
  }

  [Symbol.iterator](): Iterator<T> {
    let node = this.head;
    return {
      next(): IteratorResult<T> {
        if (!node) return { done: true, value: undefined };
        const value = node.value;
        node = node.next;
        return { done: false, value };
      },
    };
  }
}
