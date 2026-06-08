interface Node<T> {
  value: T;
  next: Node<T> | null;
}

export class SortedLinkedList<T> {
  private head: Node<T> | null = null;
  private _size = 0;
  private compare: (a: T, b: T) => number;

  constructor(compare?: (a: T, b: T) => number) {
    this.compare = compare ?? ((a: any, b: any) => (a < b ? -1 : a > b ? 1 : 0));
  }

  get size(): number {
    return this._size;
  }

  insert(value: T): void {
    const node: Node<T> = { value, next: null };
    if (!this.head || this.compare(value, this.head.value) <= 0) {
      node.next = this.head;
      this.head = node;
    } else {
      let current = this.head;
      while (current.next && this.compare(value, current.next.value) > 0) {
        current = current.next;
      }
      node.next = current.next;
      current.next = node;
    }
    this._size++;
  }

  remove(value: T): boolean {
    if (!this.head) return false;
    if (this.compare(this.head.value, value) === 0) {
      this.head = this.head.next;
      this._size--;
      return true;
    }
    let current = this.head;
    while (current.next) {
      if (this.compare(current.next.value, value) === 0) {
        current.next = current.next.next;
        this._size--;
        return true;
      }
      current = current.next;
    }
    return false;
  }

  contains(value: T): boolean {
    let current = this.head;
    while (current) {
      const cmp = this.compare(current.value, value);
      if (cmp === 0) return true;
      if (cmp > 0) return false;
      current = current.next;
    }
    return false;
  }

  first(): T | undefined {
    return this.head?.value;
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

  clear(): void {
    this.head = null;
    this._size = 0;
  }

  *[Symbol.iterator](): Iterator<T> {
    let current = this.head;
    while (current) {
      yield current.value;
      current = current.next;
    }
  }
}
