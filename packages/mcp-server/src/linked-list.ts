class Node<T> {
  value: T;
  next: Node<T> | null = null;
  prev: Node<T> | null = null;
  constructor(value: T) { this.value = value; }
}

export class LinkedList<T> {
  private head: Node<T> | null = null;
  private tail: Node<T> | null = null;
  private _size = 0;

  get size(): number { return this._size; }

  pushFront(value: T): void {
    const node = new Node(value);
    if (!this.head) {
      this.head = this.tail = node;
    } else {
      node.next = this.head;
      this.head.prev = node;
      this.head = node;
    }
    this._size++;
  }

  pushBack(value: T): void {
    const node = new Node(value);
    if (!this.tail) {
      this.head = this.tail = node;
    } else {
      node.prev = this.tail;
      this.tail.next = node;
      this.tail = node;
    }
    this._size++;
  }

  popFront(): T | undefined {
    if (!this.head) return undefined;
    const value = this.head.value;
    this.head = this.head.next;
    if (this.head) this.head.prev = null;
    else this.tail = null;
    this._size--;
    return value;
  }

  popBack(): T | undefined {
    if (!this.tail) return undefined;
    const value = this.tail.value;
    this.tail = this.tail.prev;
    if (this.tail) this.tail.next = null;
    else this.head = null;
    this._size--;
    return value;
  }

  peekFront(): T | undefined { return this.head?.value; }
  peekBack(): T | undefined { return this.tail?.value; }

  has(value: T): boolean {
    let current = this.head;
    while (current) {
      if (current.value === value) return true;
      current = current.next;
    }
    return false;
  }

  remove(value: T): boolean {
    let current = this.head;
    while (current) {
      if (current.value === value) {
        if (current.prev) current.prev.next = current.next;
        else this.head = current.next;
        if (current.next) current.next.prev = current.prev;
        else this.tail = current.prev;
        this._size--;
        return true;
      }
      current = current.next;
    }
    return false;
  }

  toArray(): T[] {
    const arr: T[] = [];
    let current = this.head;
    while (current) { arr.push(current.value); current = current.next; }
    return arr;
  }

  clear(): void {
    this.head = null;
    this.tail = null;
    this._size = 0;
  }

  *[Symbol.iterator](): Iterator<T> {
    let current = this.head;
    while (current) { yield current.value; current = current.next; }
  }
}
