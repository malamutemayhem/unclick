export type Entity = number;
export type ComponentType = string;

export class World {
  private nextEntity = 0;
  private components = new Map<ComponentType, Map<Entity, unknown>>();
  private alive = new Set<Entity>();

  spawn(): Entity {
    const id = this.nextEntity++;
    this.alive.add(id);
    return id;
  }

  despawn(entity: Entity): void {
    this.alive.delete(entity);
    for (const store of this.components.values()) {
      store.delete(entity);
    }
  }

  isAlive(entity: Entity): boolean {
    return this.alive.has(entity);
  }

  add<T>(entity: Entity, type: ComponentType, data: T): void {
    if (!this.components.has(type)) {
      this.components.set(type, new Map());
    }
    this.components.get(type)!.set(entity, data);
  }

  remove(entity: Entity, type: ComponentType): void {
    this.components.get(type)?.delete(entity);
  }

  get<T>(entity: Entity, type: ComponentType): T | undefined {
    return this.components.get(type)?.get(entity) as T | undefined;
  }

  has(entity: Entity, type: ComponentType): boolean {
    return this.components.get(type)?.has(entity) ?? false;
  }

  set<T>(entity: Entity, type: ComponentType, data: T): void {
    this.add(entity, type, data);
  }

  query(...types: ComponentType[]): Entity[] {
    if (types.length === 0) return [...this.alive];

    const results: Entity[] = [];
    const smallest = types.reduce((min, t) => {
      const store = this.components.get(t);
      const size = store?.size ?? 0;
      return size < (this.components.get(min)?.size ?? Infinity) ? t : min;
    }, types[0]);

    const store = this.components.get(smallest);
    if (!store) return [];

    for (const entity of store.keys()) {
      if (!this.alive.has(entity)) continue;
      if (types.every((t) => this.has(entity, t))) {
        results.push(entity);
      }
    }

    return results;
  }

  queryWith<T>(type: ComponentType): Array<[Entity, T]> {
    const store = this.components.get(type);
    if (!store) return [];
    const results: Array<[Entity, T]> = [];
    for (const [e, v] of store) {
      if (this.alive.has(e)) {
        results.push([e, v as T]);
      }
    }
    return results;
  }

  queryWithout(has: ComponentType[], without: ComponentType[]): Entity[] {
    const candidates = this.query(...has);
    return candidates.filter((e) => without.every((t) => !this.has(e, t)));
  }

  entityCount(): number {
    return this.alive.size;
  }

  componentCount(type: ComponentType): number {
    const store = this.components.get(type);
    if (!store) return 0;
    let count = 0;
    for (const e of store.keys()) {
      if (this.alive.has(e)) count++;
    }
    return count;
  }

  clear(): void {
    this.alive.clear();
    this.components.clear();
  }
}

export type System = (world: World) => void;

export class Pipeline {
  private systems: Array<{ name: string; fn: System }> = [];

  addSystem(name: string, fn: System): void {
    this.systems.push({ name, fn });
  }

  removeSystem(name: string): void {
    this.systems = this.systems.filter((s) => s.name !== name);
  }

  run(world: World): void {
    for (const sys of this.systems) {
      sys.fn(world);
    }
  }

  systemNames(): string[] {
    return this.systems.map((s) => s.name);
  }
}
