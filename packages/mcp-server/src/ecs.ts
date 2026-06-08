type ComponentData = Record<string, unknown>;
type Entity = number;

export class World {
  private nextId = 0;
  private entities = new Set<Entity>();
  private components = new Map<string, Map<Entity, ComponentData>>();
  private tags = new Map<Entity, Set<string>>();

  createEntity(): Entity {
    const id = this.nextId++;
    this.entities.add(id);
    return id;
  }

  destroyEntity(entity: Entity): void {
    this.entities.delete(entity);
    this.tags.delete(entity);
    for (const store of this.components.values()) {
      store.delete(entity);
    }
  }

  hasEntity(entity: Entity): boolean {
    return this.entities.has(entity);
  }

  addComponent(entity: Entity, name: string, data: ComponentData = {}): void {
    if (!this.entities.has(entity)) return;
    if (!this.components.has(name)) {
      this.components.set(name, new Map());
    }
    this.components.get(name)!.set(entity, { ...data });
  }

  removeComponent(entity: Entity, name: string): void {
    this.components.get(name)?.delete(entity);
  }

  getComponent(entity: Entity, name: string): ComponentData | undefined {
    return this.components.get(name)?.get(entity);
  }

  hasComponent(entity: Entity, name: string): boolean {
    return this.components.get(name)?.has(entity) ?? false;
  }

  addTag(entity: Entity, tag: string): void {
    if (!this.entities.has(entity)) return;
    if (!this.tags.has(entity)) {
      this.tags.set(entity, new Set());
    }
    this.tags.get(entity)!.add(tag);
  }

  removeTag(entity: Entity, tag: string): void {
    this.tags.get(entity)?.delete(tag);
  }

  hasTag(entity: Entity, tag: string): boolean {
    return this.tags.get(entity)?.has(tag) ?? false;
  }

  query(...componentNames: string[]): Entity[] {
    const result: Entity[] = [];
    for (const entity of this.entities) {
      let match = true;
      for (const name of componentNames) {
        if (!this.hasComponent(entity, name)) {
          match = false;
          break;
        }
      }
      if (match) result.push(entity);
    }
    return result;
  }

  queryWithTag(tag: string, ...componentNames: string[]): Entity[] {
    return this.query(...componentNames).filter((e) => this.hasTag(e, tag));
  }

  entityCount(): number {
    return this.entities.size;
  }

  allEntities(): Entity[] {
    return Array.from(this.entities);
  }
}

export type SystemFn = (world: World, dt: number) => void;

export class SystemRunner {
  private systems: { name: string; fn: SystemFn; priority: number }[] = [];

  add(name: string, fn: SystemFn, priority = 0): void {
    this.systems.push({ name, fn, priority });
    this.systems.sort((a, b) => a.priority - b.priority);
  }

  remove(name: string): void {
    this.systems = this.systems.filter((s) => s.name !== name);
  }

  run(world: World, dt: number): void {
    for (const system of this.systems) {
      system.fn(world, dt);
    }
  }

  list(): string[] {
    return this.systems.map((s) => s.name);
  }
}
