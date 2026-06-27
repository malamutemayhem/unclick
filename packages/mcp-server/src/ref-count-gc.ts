export interface GCObject {
  id: number;
  refCount: number;
  refs: Set<number>;
  data: unknown;
  weak: boolean;
}

export class RefCountGC {
  private objects = new Map<number, GCObject>();
  private nextId = 0;
  private roots = new Set<number>();
  private freed: number[] = [];

  alloc(data: unknown = null): number {
    const id = this.nextId++;
    this.objects.set(id, { id, refCount: 0, refs: new Set(), data, weak: false });
    return id;
  }

  addRoot(id: number): void {
    if (!this.objects.has(id)) return;
    this.roots.add(id);
    this.incRef(id);
  }

  removeRoot(id: number): void {
    if (!this.roots.has(id)) return;
    this.roots.delete(id);
    this.decRef(id);
  }

  addRef(from: number, to: number): void {
    const obj = this.objects.get(from);
    if (!obj || !this.objects.has(to)) return;
    if (!obj.refs.has(to)) {
      obj.refs.add(to);
      this.incRef(to);
    }
  }

  removeRef(from: number, to: number): void {
    const obj = this.objects.get(from);
    if (!obj) return;
    if (obj.refs.has(to)) {
      obj.refs.delete(to);
      this.decRef(to);
    }
  }

  addWeakRef(from: number, to: number): void {
    const obj = this.objects.get(from);
    if (!obj || !this.objects.has(to)) return;
    obj.refs.add(to);
  }

  private incRef(id: number): void {
    const obj = this.objects.get(id);
    if (obj) obj.refCount++;
  }

  private decRef(id: number): void {
    const obj = this.objects.get(id);
    if (!obj) return;
    obj.refCount--;
    if (obj.refCount <= 0) {
      this.collect(id);
    }
  }

  private collect(id: number): void {
    const obj = this.objects.get(id);
    if (!obj) return;
    this.objects.delete(id);
    this.freed.push(id);
    for (const ref of obj.refs) {
      this.decRef(ref);
    }
  }

  collectCycles(): number {
    const reachable = new Set<number>();
    const stack = [...this.roots];
    while (stack.length > 0) {
      const id = stack.pop()!;
      if (reachable.has(id)) continue;
      const obj = this.objects.get(id);
      if (!obj) continue;
      reachable.add(id);
      for (const ref of obj.refs) {
        stack.push(ref);
      }
    }

    let collected = 0;
    for (const [id] of this.objects) {
      if (!reachable.has(id)) {
        this.objects.delete(id);
        this.freed.push(id);
        collected++;
      }
    }
    return collected;
  }

  isAlive(id: number): boolean {
    return this.objects.has(id);
  }

  getRefCount(id: number): number {
    return this.objects.get(id)?.refCount ?? 0;
  }

  getData(id: number): unknown {
    return this.objects.get(id)?.data;
  }

  get liveCount(): number {
    return this.objects.size;
  }

  get freedIds(): number[] {
    return [...this.freed];
  }

  get rootCount(): number {
    return this.roots.size;
  }

  stats(): { live: number; freed: number; roots: number } {
    return { live: this.objects.size, freed: this.freed.length, roots: this.roots.size };
  }
}
