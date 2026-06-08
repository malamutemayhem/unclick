interface ListNode<T> {
  value: T;
  next: ListNode<T> | null;
  prev: ListNode<T> | null;
}

export class LinkedList<T> {
  private head: ListNode<T> | null = null;
  private tail: ListNode<T> | null = null;
  private count = 0;

  pushFront(value: T): void {
    const node: ListNode<T> = { value, next: this.head, prev: null };
    if (this.head) this.head.prev = node;
    this.head = node;
    if (!this.tail) this.tail = node;
    this.count++;
  }

  pushBack(value: T): void {
    const node: ListNode<T> = { value, next: null, prev: this.tail };
    if (this.tail) this.tail.next = node;
    this.tail = node;
    if (!this.head) this.head = node;
    this.count++;
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

  get size(): number {
    return this.count;
  }

  get isEmpty(): boolean {
    return this.count === 0;
  }

  find(predicate: (value: T) => boolean): T | undefined {
    let node = this.head;
    while (node) {
      if (predicate(node.value)) return node.value;
      node = node.next;
    }
    return undefined;
  }

  remove(predicate: (value: T) => boolean): boolean {
    let node = this.head;
    while (node) {
      if (predicate(node.value)) {
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

  toArray(): T[] {
    const result: T[] = [];
    let node = this.head;
    while (node) {
      result.push(node.value);
      node = node.next;
    }
    return result;
  }

  clear(): void {
    this.head = null;
    this.tail = null;
    this.count = 0;
  }

  *[Symbol.iterator](): Iterator<T> {
    let node = this.head;
    while (node) {
      yield node.value;
      node = node.next;
    }
  }

  reverse(): void {
    let current = this.head;
    let temp: ListNode<T> | null = null;
    while (current) {
      temp = current.prev;
      current.prev = current.next;
      current.next = temp;
      current = current.prev;
    }
    temp = this.head;
    this.head = this.tail;
    this.tail = temp;
  }
}
