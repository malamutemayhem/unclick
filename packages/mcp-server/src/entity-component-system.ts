export type ComponentData = Record<string, unknown>;

export class ECS {
  private nextId = 0;
  private entities: Set<number> = new Set();
  private components: Map<string, Map<number, ComponentData>> = new Map();

  createEntity(): number {
    const id = this.nextId++;
    this.entities.add(id);
    return id;
  }

  destroyEntity(id: number): void {
    this.entities.delete(id);
    for (const store of this.components.values()) {
      store.delete(id);
    }
  }

  addComponent(entity: number, type: string, data: ComponentData): void {
    if (!this.entities.has(entity)) return;
    if (!this.components.has(type)) {
      this.components.set(type, new Map());
    }
    this.components.get(type)!.set(entity, { ...data });
  }

  removeComponent(entity: number, type: string): void {
    this.components.get(type)?.delete(entity);
  }

  getComponent(entity: number, type: string): ComponentData | undefined {
    return this.components.get(type)?.get(entity);
  }

  hasComponent(entity: number, type: string): boolean {
    return this.components.get(type)?.has(entity) ?? false;
  }

  query(...types: string[]): number[] {
    const result: number[] = [];
    for (const entity of this.entities) {
      if (types.every(t => this.hasComponent(entity, t))) {
        result.push(entity);
      }
    }
    return result;
  }

  entityCount(): number {
    return this.entities.size;
  }

  componentCount(type: string): number {
    return this.components.get(type)?.size ?? 0;
  }

  allComponents(entity: number): string[] {
    const result: string[] = [];
    for (const [type, store] of this.components) {
      if (store.has(entity)) result.push(type);
    }
    return result;
  }

  serialize(): { entities: number[]; components: Record<string, Record<number, ComponentData>> } {
    const components: Record<string, Record<number, ComponentData>> = {};
    for (const [type, store] of this.components) {
      components[type] = {};
      for (const [id, data] of store) {
        components[type][id] = data;
      }
    }
    return { entities: [...this.entities], components };
  }

  clear(): void {
    this.entities.clear();
    this.components.clear();
  }
}
