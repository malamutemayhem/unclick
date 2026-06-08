export type ObjId = number;

export interface GCObject {
  id: ObjId;
  size: number;
  refs: ObjId[];
  marked: boolean;
  generation: number;
}

export class GCHeap {
  private objects = new Map<ObjId, GCObject>();
  private roots = new Set<ObjId>();
  private nextId = 0;
  private totalAllocated = 0;
  private totalCollected = 0;
  private collectionCount = 0;

  alloc(size: number, refs: ObjId[] = []): ObjId {
    const id = this.nextId++;
    this.objects.set(id, { id, size, refs: [...refs], marked: false, generation: 0 });
    this.totalAllocated += size;
    return id;
  }

  addRoot(id: ObjId): void {
    this.roots.add(id);
  }

  removeRoot(id: ObjId): void {
    this.roots.delete(id);
  }

  addRef(from: ObjId, to: ObjId): void {
    const obj = this.objects.get(from);
    if (obj) obj.refs.push(to);
  }

  removeRef(from: ObjId, to: ObjId): void {
    const obj = this.objects.get(from);
    if (obj) {
      const idx = obj.refs.indexOf(to);
      if (idx >= 0) obj.refs.splice(idx, 1);
    }
  }

  markSweep(): number {
    for (const obj of this.objects.values()) {
      obj.marked = false;
    }

    const stack = [...this.roots];
    while (stack.length > 0) {
      const id = stack.pop()!;
      const obj = this.objects.get(id);
      if (!obj || obj.marked) continue;
      obj.marked = true;
      for (const ref of obj.refs) {
        stack.push(ref);
      }
    }

    let collected = 0;
    for (const [id, obj] of this.objects) {
      if (!obj.marked) {
        collected += obj.size;
        this.objects.delete(id);
      }
    }

    this.totalCollected += collected;
    this.collectionCount++;
    return collected;
  }

  generationalCollect(maxGen = 0): number {
    for (const obj of this.objects.values()) {
      obj.marked = false;
    }

    const stack = [...this.roots];
    while (stack.length > 0) {
      const id = stack.pop()!;
      const obj = this.objects.get(id);
      if (!obj || obj.marked) continue;
      obj.marked = true;
      for (const ref of obj.refs) {
        stack.push(ref);
      }
    }

    let collected = 0;
    for (const [id, obj] of this.objects) {
      if (!obj.marked && obj.generation <= maxGen) {
        collected += obj.size;
        this.objects.delete(id);
      } else if (obj.marked) {
        obj.generation = Math.min(obj.generation + 1, 2);
      }
    }

    this.totalCollected += collected;
    this.collectionCount++;
    return collected;
  }

  objectCount(): number {
    return this.objects.size;
  }

  heapSize(): number {
    let total = 0;
    for (const obj of this.objects.values()) total += obj.size;
    return total;
  }

  rootCount(): number {
    return this.roots.size;
  }

  isAlive(id: ObjId): boolean {
    return this.objects.has(id);
  }

  stats(): { totalAllocated: number; totalCollected: number; collections: number; liveObjects: number; heapSize: number } {
    return {
      totalAllocated: this.totalAllocated,
      totalCollected: this.totalCollected,
      collections: this.collectionCount,
      liveObjects: this.objectCount(),
      heapSize: this.heapSize(),
    };
  }
}
