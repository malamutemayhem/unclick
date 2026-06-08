export class MedianTracker {
  private lo: number[] = [];
  private hi: number[] = [];

  get size(): number {
    return this.lo.length + this.hi.length;
  }

  add(value: number): void {
    if (this.lo.length === 0 || value <= -this.lo[0]) {
      this._pushMaxHeap(this.lo, value);
    } else {
      this._pushMinHeap(this.hi, value);
    }
    this._balance();
  }

  median(): number {
    if (this.size === 0) throw new Error("No values");
    if (this.lo.length > this.hi.length) return -this.lo[0];
    if (this.hi.length > this.lo.length) return this.hi[0];
    return (-this.lo[0] + this.hi[0]) / 2;
  }

  values(): number[] {
    const loVals = this.lo.map((v) => -v).sort((a, b) => a - b);
    const hiVals = [...this.hi].sort((a, b) => a - b);
    return [...loVals, ...hiVals];
  }

  private _balance(): void {
    if (this.lo.length > this.hi.length + 1) {
      this._pushMinHeap(this.hi, this._popMaxHeap(this.lo));
    } else if (this.hi.length > this.lo.length + 1) {
      this._pushMaxHeap(this.lo, this._popMinHeap(this.hi));
    }
  }

  private _pushMinHeap(heap: number[], val: number): void {
    heap.push(val);
    let i = heap.length - 1;
    while (i > 0) {
      const parent = (i - 1) >>> 1;
      if (heap[parent] <= heap[i]) break;
      [heap[parent], heap[i]] = [heap[i], heap[parent]];
      i = parent;
    }
  }

  private _popMinHeap(heap: number[]): number {
    const top = heap[0];
    const last = heap.pop()!;
    if (heap.length > 0) {
      heap[0] = last;
      let i = 0;
      while (true) {
        let smallest = i;
        const left = 2 * i + 1;
        const right = 2 * i + 2;
        if (left < heap.length && heap[left] < heap[smallest]) smallest = left;
        if (right < heap.length && heap[right] < heap[smallest]) smallest = right;
        if (smallest === i) break;
        [heap[i], heap[smallest]] = [heap[smallest], heap[i]];
        i = smallest;
      }
    }
    return top;
  }

  private _pushMaxHeap(heap: number[], val: number): void {
    this._pushMinHeap(heap, -val);
  }

  private _popMaxHeap(heap: number[]): number {
    return -this._popMinHeap(heap);
  }
}
