interface PANode<T> {
  left: PANode<T> | null;
  right: PANode<T> | null;
  value: T | undefined;
}

export class PersistentArray<T> {
  private root: PANode<T>;
  private _size: number;

  constructor(size: number, defaultValue?: T) {
    this._size = size;
    this.root = size > 0
      ? PersistentArray.build(0, size, defaultValue)
      : { left: null, right: null, value: undefined };
  }

  private static build<T>(lo: number, hi: number, val?: T): PANode<T> {
    if (hi - lo === 1) {
      return { left: null, right: null, value: val };
    }
    const mid = (lo + hi) >> 1;
    return {
      left: PersistentArray.build(lo, mid, val),
      right: PersistentArray.build(mid, hi, val),
      value: undefined,
    };
  }

  get(index: number): T | undefined {
    return this.getNode(this.root, 0, this._size, index);
  }

  private getNode(node: PANode<T>, lo: number, hi: number, idx: number): T | undefined {
    if (hi - lo === 1) return node.value;
    const mid = (lo + hi) >> 1;
    if (idx < mid) return this.getNode(node.left!, lo, mid, idx);
    return this.getNode(node.right!, mid, hi, idx);
  }

  set(index: number, value: T): PersistentArray<T> {
    const newRoot = this.setNode(this.root, 0, this._size, index, value);
    const result = Object.create(PersistentArray.prototype) as PersistentArray<T>;
    result._size = this._size;
    result.root = newRoot;
    return result;
  }

  private setNode(node: PANode<T>, lo: number, hi: number, idx: number, val: T): PANode<T> {
    if (hi - lo === 1) {
      return { left: null, right: null, value: val };
    }
    const mid = (lo + hi) >> 1;
    if (idx < mid) {
      return {
        left: this.setNode(node.left!, lo, mid, idx, val),
        right: node.right,
        value: undefined,
      };
    }
    return {
      left: node.left,
      right: this.setNode(node.right!, mid, hi, idx, val),
      value: undefined,
    };
  }

  size(): number {
    return this._size;
  }

  toArray(): (T | undefined)[] {
    const result: (T | undefined)[] = [];
    for (let i = 0; i < this._size; i++) {
      result.push(this.get(i));
    }
    return result;
  }
}
