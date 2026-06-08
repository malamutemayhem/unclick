export class BiMap<L, R> {
  private leftToRight = new Map<L, R>();
  private rightToLeft = new Map<R, L>();

  set(left: L, right: R): void {
    if (this.leftToRight.has(left)) {
      this.rightToLeft.delete(this.leftToRight.get(left)!);
    }
    if (this.rightToLeft.has(right)) {
      this.leftToRight.delete(this.rightToLeft.get(right)!);
    }
    this.leftToRight.set(left, right);
    this.rightToLeft.set(right, left);
  }

  getByLeft(left: L): R | undefined {
    return this.leftToRight.get(left);
  }

  getByRight(right: R): L | undefined {
    return this.rightToLeft.get(right);
  }

  hasLeft(left: L): boolean { return this.leftToRight.has(left); }
  hasRight(right: R): boolean { return this.rightToLeft.has(right); }

  deleteByLeft(left: L): boolean {
    const right = this.leftToRight.get(left);
    if (right === undefined) return false;
    this.leftToRight.delete(left);
    this.rightToLeft.delete(right);
    return true;
  }

  deleteByRight(right: R): boolean {
    const left = this.rightToLeft.get(right);
    if (left === undefined) return false;
    this.rightToLeft.delete(right);
    this.leftToRight.delete(left);
    return true;
  }

  get size(): number { return this.leftToRight.size; }

  leftKeys(): IterableIterator<L> { return this.leftToRight.keys(); }
  rightKeys(): IterableIterator<R> { return this.rightToLeft.keys(); }

  clear(): void {
    this.leftToRight.clear();
    this.rightToLeft.clear();
  }

  inverse(): BiMap<R, L> {
    const inv = new BiMap<R, L>();
    for (const [left, right] of this.leftToRight) {
      inv.set(right, left);
    }
    return inv;
  }
}
