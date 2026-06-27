export type Entity = number;
export type ComponentType = string;

export class World {
  private nextEntity = 0;
  private entities = new Set<Entity>();
  private components = new Map<ComponentType, Map<Entity, unknown>>();
  private tags = new Map<Entity, Set<string>>();

  createEntity(): Entity {
    const id = this.nextEntity++;
    this.entities.add(id);
    return id;
  }

  destroyEntity(entity: Entity): void {
    this.entities.delete(entity);
    for (const store of this.components.values()) {
      store.delete(entity);
    }
    this.tags.delete(entity);
  }

  isAlive(entity: Entity): boolean {
    return this.entities.has(entity);
  }

  addComponent<T>(entity: Entity, type: ComponentType, data: T): void {
    if (!this.components.has(type)) {
      this.components.set(type, new Map());
    }
    this.components.get(type)!.set(entity, data);
  }

  getComponent<T>(entity: Entity, type: ComponentType): T | undefined {
    return this.components.get(type)?.get(entity) as T | undefined;
  }

  hasComponent(entity: Entity, type: ComponentType): boolean {
    return this.components.get(type)?.has(entity) ?? false;
  }

  removeComponent(entity: Entity, type: ComponentType): void {
    this.components.get(type)?.delete(entity);
  }

  addTag(entity: Entity, tag: string): void {
    if (!this.tags.has(entity)) this.tags.set(entity, new Set());
    this.tags.get(entity)!.add(tag);
  }

  hasTag(entity: Entity, tag: string): boolean {
    return this.tags.get(entity)?.has(tag) ?? false;
  }

  removeTag(entity: Entity, tag: string): void {
    this.tags.get(entity)?.delete(tag);
  }

  query(...types: ComponentType[]): Entity[] {
    const result: Entity[] = [];
    for (const entity of this.entities) {
      if (types.every((t) => this.hasComponent(entity, t))) {
        result.push(entity);
      }
    }
    return result;
  }

  queryWithTag(tag: string): Entity[] {
    const result: Entity[] = [];
    for (const entity of this.entities) {
      if (this.hasTag(entity, tag)) result.push(entity);
    }
    return result;
  }

  entityCount(): number {
    return this.entities.size;
  }

  componentTypes(): ComponentType[] {
    return [...this.components.keys()];
  }

  allEntities(): Entity[] {
    return [...this.entities];
  }

  clear(): void {
    this.entities.clear();
    this.components.clear();
    this.tags.clear();
    this.nextEntity = 0;
  }
}

export class System {
  private name: string;
  private requiredComponents: ComponentType[];
  private handler: (world: World, entities: Entity[]) => void;

  constructor(name: string, components: ComponentType[], handler: (world: World, entities: Entity[]) => void) {
    this.name = name;
    this.requiredComponents = components;
    this.handler = handler;
  }

  run(world: World): void {
    const entities = world.query(...this.requiredComponents);
    this.handler(world, entities);
  }

  getName(): string {
    return this.name;
  }
}

export class SystemRunner {
  private systems: System[] = [];

  add(system: System): void {
    this.systems.push(system);
  }

  tick(world: World): void {
    for (const system of this.systems) {
      system.run(world);
    }
  }

  systemCount(): number {
    return this.systems.length;
  }
}
