export class MinMaxHeap<T> {
  private data: T[] = [];
  private compare: (a: T, b: T) => number;

  constructor(compare: (a: T, b: T) => number = (a, b) => (a as number) - (b as number)) {
    this.compare = compare;
  }

  push(value: T): void {
    this.data.push(value);
    this.bubbleUp(this.data.length - 1);
  }

  peekMin(): T | undefined {
    return this.data[0];
  }

  peekMax(): T | undefined {
    if (this.data.length <= 1) return this.data[0];
    if (this.data.length === 2) return this.data[1];
    return this.compare(this.data[1], this.data[2]) >= 0 ? this.data[1] : this.data[2];
  }

  popMin(): T | undefined {
    if (this.data.length === 0) return undefined;
    const min = this.data[0];
    const last = this.data.pop()!;
    if (this.data.length > 0) {
      this.data[0] = last;
      this.trickleDown(0);
    }
    return min;
  }

  popMax(): T | undefined {
    if (this.data.length <= 1) return this.data.pop();
    let maxIdx = 1;
    if (this.data.length > 2 && this.compare(this.data[2], this.data[1]) > 0) {
      maxIdx = 2;
    }
    const max = this.data[maxIdx];
    const last = this.data.pop()!;
    if (maxIdx < this.data.length) {
      this.data[maxIdx] = last;
      this.trickleDown(maxIdx);
    }
    return max;
  }

  size(): number {
    return this.data.length;
  }

  isEmpty(): boolean {
    return this.data.length === 0;
  }

  toArray(): T[] {
    return [...this.data];
  }

  private level(i: number): number {
    return Math.floor(Math.log2(i + 1));
  }

  private isMinLevel(i: number): boolean {
    return this.level(i) % 2 === 0;
  }

  private parent(i: number): number {
    return Math.floor((i - 1) / 2);
  }

  private bubbleUp(i: number): void {
    if (i === 0) return;
    const p = this.parent(i);
    if (this.isMinLevel(i)) {
      if (this.compare(this.data[i], this.data[p]) > 0) {
        this.swap(i, p);
        this.bubbleUpMax(p);
      } else {
        this.bubbleUpMin(i);
      }
    } else {
      if (this.compare(this.data[i], this.data[p]) < 0) {
        this.swap(i, p);
        this.bubbleUpMin(p);
      } else {
        this.bubbleUpMax(i);
      }
    }
  }

  private bubbleUpMin(i: number): void {
    while (i > 2) {
      const gp = this.parent(this.parent(i));
      if (this.compare(this.data[i], this.data[gp]) < 0) {
        this.swap(i, gp);
        i = gp;
      } else break;
    }
  }

  private bubbleUpMax(i: number): void {
    while (i > 2) {
      const gp = this.parent(this.parent(i));
      if (this.compare(this.data[i], this.data[gp]) > 0) {
        this.swap(i, gp);
        i = gp;
      } else break;
    }
  }

  private trickleDown(i: number): void {
    if (this.isMinLevel(i)) {
      this.trickleDownMin(i);
    } else {
      this.trickleDownMax(i);
    }
  }

  private trickleDownMin(i: number): void {
    while (true) {
      const smallest = this.smallestDescendant(i);
      if (smallest === -1) return;
      if (this.isGrandchild(smallest, i)) {
        if (this.compare(this.data[smallest], this.data[i]) < 0) {
          this.swap(smallest, i);
          const p = this.parent(smallest);
          if (this.compare(this.data[smallest], this.data[p]) > 0) {
            this.swap(smallest, p);
          }
          i = smallest;
        } else return;
      } else {
        if (this.compare(this.data[smallest], this.data[i]) < 0) {
          this.swap(smallest, i);
        }
        return;
      }
    }
  }

  private trickleDownMax(i: number): void {
    while (true) {
      const largest = this.largestDescendant(i);
      if (largest === -1) return;
      if (this.isGrandchild(largest, i)) {
        if (this.compare(this.data[largest], this.data[i]) > 0) {
          this.swap(largest, i);
          const p = this.parent(largest);
          if (this.compare(this.data[largest], this.data[p]) < 0) {
            this.swap(largest, p);
          }
          i = largest;
        } else return;
      } else {
        if (this.compare(this.data[largest], this.data[i]) > 0) {
          this.swap(largest, i);
        }
        return;
      }
    }
  }

  private smallestDescendant(i: number): number {
    const candidates = this.childrenAndGrandchildren(i);
    if (candidates.length === 0) return -1;
    let min = candidates[0];
    for (let j = 1; j < candidates.length; j++) {
      if (this.compare(this.data[candidates[j]], this.data[min]) < 0) {
        min = candidates[j];
      }
    }
    return min;
  }

  private largestDescendant(i: number): number {
    const candidates = this.childrenAndGrandchildren(i);
    if (candidates.length === 0) return -1;
    let max = candidates[0];
    for (let j = 1; j < candidates.length; j++) {
      if (this.compare(this.data[candidates[j]], this.data[max]) > 0) {
        max = candidates[j];
      }
    }
    return max;
  }

  private childrenAndGrandchildren(i: number): number[] {
    const result: number[] = [];
    const left = 2 * i + 1;
    const right = 2 * i + 2;
    if (left < this.data.length) result.push(left);
    if (right < this.data.length) result.push(right);
    for (const c of [left, right]) {
      const gl = 2 * c + 1;
      const gr = 2 * c + 2;
      if (gl < this.data.length) result.push(gl);
      if (gr < this.data.length) result.push(gr);
    }
    return result;
  }

  private isGrandchild(gc: number, gp: number): boolean {
    if (gc <= gp) return false;
    let p = this.parent(gc);
    if (p <= 0) return false;
    p = this.parent(p);
    return p === gp;
  }

  private swap(i: number, j: number): void {
    [this.data[i], this.data[j]] = [this.data[j], this.data[i]];
  }
}

export class FibonacciHeap<T> {
  private trees: Array<{ value: T; children: Array<{ value: T; children: unknown[] }> }> = [];
  private minIdx = -1;
  private count = 0;
  private compare: (a: T, b: T) => number;

  constructor(compare: (a: T, b: T) => number = (a, b) => (a as number) - (b as number)) {
    this.compare = compare;
  }

  insert(value: T): void {
    this.trees.push({ value, children: [] });
    if (this.minIdx === -1 || this.compare(value, this.trees[this.minIdx].value) < 0) {
      this.minIdx = this.trees.length - 1;
    }
    this.count++;
  }

  peekMin(): T | undefined {
    if (this.minIdx === -1) return undefined;
    return this.trees[this.minIdx].value;
  }

  extractMin(): T | undefined {
    if (this.minIdx === -1) return undefined;
    const min = this.trees[this.minIdx];
    this.trees.splice(this.minIdx, 1);
    for (const child of min.children) {
      this.trees.push(child as any);
    }
    this.count--;
    this.minIdx = -1;
    for (let i = 0; i < this.trees.length; i++) {
      if (this.minIdx === -1 || this.compare(this.trees[i].value, this.trees[this.minIdx].value) < 0) {
        this.minIdx = i;
      }
    }
    return min.value;
  }

  size(): number {
    return this.count;
  }

  isEmpty(): boolean {
    return this.count === 0;
  }
}
