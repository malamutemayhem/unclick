type ComponentType = string;
type Entity = number;

export class ECSWorld {
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

  addComponent<T>(entity: Entity, type: ComponentType, data: T): void {
    if (!this.components.has(type)) this.components.set(type, new Map());
    this.components.get(type)!.set(entity, data);
  }

  getComponent<T>(entity: Entity, type: ComponentType): T | undefined {
    return this.components.get(type)?.get(entity) as T | undefined;
  }

  removeComponent(entity: Entity, type: ComponentType): void {
    this.components.get(type)?.delete(entity);
  }

  hasComponent(entity: Entity, type: ComponentType): boolean {
    return this.components.get(type)?.has(entity) ?? false;
  }

  addTag(entity: Entity, tag: string): void {
    if (!this.tags.has(entity)) this.tags.set(entity, new Set());
    this.tags.get(entity)!.add(tag);
  }

  hasTag(entity: Entity, tag: string): boolean {
    return this.tags.get(entity)?.has(tag) ?? false;
  }

  query(...componentTypes: ComponentType[]): Entity[] {
    const results: Entity[] = [];
    for (const entity of this.entities) {
      if (componentTypes.every((t) => this.hasComponent(entity, t))) {
        results.push(entity);
      }
    }
    return results;
  }

  queryWithTags(tags: string[], ...componentTypes: ComponentType[]): Entity[] {
    return this.query(...componentTypes).filter((entity) =>
      tags.every((tag) => this.hasTag(entity, tag))
    );
  }

  get entityCount(): number {
    return this.entities.size;
  }

  getComponentTypes(entity: Entity): ComponentType[] {
    const types: ComponentType[] = [];
    for (const [type, store] of this.components) {
      if (store.has(entity)) types.push(type);
    }
    return types;
  }

  clear(): void {
    this.entities.clear();
    this.components.clear();
    this.tags.clear();
  }

  forEach(componentTypes: ComponentType[], callback: (entity: Entity) => void): void {
    for (const entity of this.query(...componentTypes)) {
      callback(entity);
    }
  }
}
