class ListNode<T> {
  value: T;
  next: ListNode<T> | null = null;
  prev: ListNode<T> | null = null;
  constructor(value: T) { this.value = value; }
}

export class LinkedList<T> {
  private head: ListNode<T> | null = null;
  private tail: ListNode<T> | null = null;
  private count = 0;

  pushBack(value: T): void {
    const node = new ListNode(value);
    if (!this.tail) {
      this.head = this.tail = node;
    } else {
      node.prev = this.tail;
      this.tail.next = node;
      this.tail = node;
    }
    this.count++;
  }

  pushFront(value: T): void {
    const node = new ListNode(value);
    if (!this.head) {
      this.head = this.tail = node;
    } else {
      node.next = this.head;
      this.head.prev = node;
      this.head = node;
    }
    this.count++;
  }

  popBack(): T | undefined {
    if (!this.tail) return undefined;
    const value = this.tail.value;
    if (this.tail === this.head) {
      this.head = this.tail = null;
    } else {
      this.tail = this.tail.prev!;
      this.tail.next = null;
    }
    this.count--;
    return value;
  }

  popFront(): T | undefined {
    if (!this.head) return undefined;
    const value = this.head.value;
    if (this.head === this.tail) {
      this.head = this.tail = null;
    } else {
      this.head = this.head.next!;
      this.head.prev = null;
    }
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

  isEmpty(): boolean {
    return this.count === 0;
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

  find(predicate: (value: T) => boolean): T | undefined {
    let current = this.head;
    while (current) {
      if (predicate(current.value)) return current.value;
      current = current.next;
    }
    return undefined;
  }

  remove(predicate: (value: T) => boolean): boolean {
    let current = this.head;
    while (current) {
      if (predicate(current.value)) {
        if (current === this.head) this.head = current.next;
        if (current === this.tail) this.tail = current.prev;
        if (current.prev) current.prev.next = current.next;
        if (current.next) current.next.prev = current.prev;
        this.count--;
        return true;
      }
      current = current.next;
    }
    return false;
  }

  clear(): void {
    this.head = this.tail = null;
    this.count = 0;
  }
}
