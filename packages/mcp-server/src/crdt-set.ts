export class GSet<T> {
  private elements: Set<T> = new Set();

  add(element: T): void {
    this.elements.add(element);
  }

  has(element: T): boolean {
    return this.elements.has(element);
  }

  merge(other: GSet<T>): GSet<T> {
    const result = new GSet<T>();
    for (const e of this.elements) result.elements.add(e);
    for (const e of other.elements) result.elements.add(e);
    return result;
  }

  values(): T[] {
    return [...this.elements];
  }

  size(): number {
    return this.elements.size;
  }
}

export class TwoPSet<T> {
  private added: GSet<T> = new GSet();
  private removed: GSet<T> = new GSet();

  add(element: T): void {
    this.added.add(element);
  }

  remove(element: T): void {
    if (this.added.has(element)) {
      this.removed.add(element);
    }
  }

  has(element: T): boolean {
    return this.added.has(element) && !this.removed.has(element);
  }

  merge(other: TwoPSet<T>): TwoPSet<T> {
    const result = new TwoPSet<T>();
    result.added = this.added.merge(other.added);
    result.removed = this.removed.merge(other.removed);
    return result;
  }

  values(): T[] {
    return this.added.values().filter((e) => !this.removed.has(e));
  }

  size(): number {
    return this.values().length;
  }
}

export class LWWSet<T> {
  private addMap: Map<T, number> = new Map();
  private removeMap: Map<T, number> = new Map();

  add(element: T, timestamp: number): void {
    const existing = this.addMap.get(element);
    if (existing === undefined || timestamp > existing) {
      this.addMap.set(element, timestamp);
    }
  }

  remove(element: T, timestamp: number): void {
    const existing = this.removeMap.get(element);
    if (existing === undefined || timestamp > existing) {
      this.removeMap.set(element, timestamp);
    }
  }

  has(element: T): boolean {
    const addTime = this.addMap.get(element);
    if (addTime === undefined) return false;
    const removeTime = this.removeMap.get(element);
    if (removeTime === undefined) return true;
    return addTime > removeTime;
  }

  merge(other: LWWSet<T>): LWWSet<T> {
    const result = new LWWSet<T>();
    for (const [k, v] of this.addMap) result.add(k, v);
    for (const [k, v] of other.addMap) result.add(k, v);
    for (const [k, v] of this.removeMap) result.remove(k, v);
    for (const [k, v] of other.removeMap) result.remove(k, v);
    return result;
  }

  values(): T[] {
    const result: T[] = [];
    for (const k of this.addMap.keys()) {
      if (this.has(k)) result.push(k);
    }
    return result;
  }

  size(): number {
    return this.values().length;
  }
}
