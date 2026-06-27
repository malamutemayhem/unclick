export class EntityStore<T extends { id: string }> {
  private entities = new Map<string, T>();
  private indices = new Map<string, Map<string, Set<string>>>();

  get size(): number {
    return this.entities.size;
  }

  addIndex(field: string): void {
    if (this.indices.has(field)) return;
    const index = new Map<string, Set<string>>();
    for (const entity of this.entities.values()) {
      const val = String((entity as any)[field] ?? "");
      let set = index.get(val);
      if (!set) { set = new Set(); index.set(val, set); }
      set.add(entity.id);
    }
    this.indices.set(field, index);
  }

  put(entity: T): void {
    const existing = this.entities.get(entity.id);
    if (existing) this.removeFromIndices(existing);
    this.entities.set(entity.id, entity);
    this.addToIndices(entity);
  }

  get(id: string): T | undefined {
    return this.entities.get(id);
  }

  delete(id: string): boolean {
    const entity = this.entities.get(id);
    if (!entity) return false;
    this.removeFromIndices(entity);
    return this.entities.delete(id);
  }

  findBy(field: string, value: string): T[] {
    const index = this.indices.get(field);
    if (!index) {
      return this.all().filter((e) => String((e as any)[field]) === value);
    }
    const ids = index.get(value);
    if (!ids) return [];
    return [...ids].map((id) => this.entities.get(id)!);
  }

  all(): T[] {
    return [...this.entities.values()];
  }

  clear(): void {
    this.entities.clear();
    for (const index of this.indices.values()) index.clear();
  }

  private addToIndices(entity: T): void {
    for (const [field, index] of this.indices) {
      const val = String((entity as any)[field] ?? "");
      let set = index.get(val);
      if (!set) { set = new Set(); index.set(val, set); }
      set.add(entity.id);
    }
  }

  private removeFromIndices(entity: T): void {
    for (const [field, index] of this.indices) {
      const val = String((entity as any)[field] ?? "");
      const set = index.get(val);
      if (set) set.delete(entity.id);
    }
  }
}
