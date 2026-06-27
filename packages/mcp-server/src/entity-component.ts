export type ComponentData = Record<string, unknown>;

export class Entity {
  readonly id: number;
  private components = new Map<string, ComponentData>();

  constructor(id: number) {
    this.id = id;
  }

  addComponent(name: string, data: ComponentData = {}): this {
    this.components.set(name, data);
    return this;
  }

  removeComponent(name: string): boolean {
    return this.components.delete(name);
  }

  getComponent<T extends ComponentData = ComponentData>(name: string): T | null {
    return (this.components.get(name) as T) || null;
  }

  hasComponent(name: string): boolean {
    return this.components.has(name);
  }

  hasAll(...names: string[]): boolean {
    return names.every(n => this.components.has(n));
  }

  get componentNames(): string[] {
    return Array.from(this.components.keys());
  }
}

export type SystemFn = (entities: Entity[], dt: number) => void;

export class World {
  private entities = new Map<number, Entity>();
  private systems: { name: string; fn: SystemFn; required: string[] }[] = [];
  private nextId = 1;

  createEntity(): Entity {
    const entity = new Entity(this.nextId++);
    this.entities.set(entity.id, entity);
    return entity;
  }

  removeEntity(id: number): boolean {
    return this.entities.delete(id);
  }

  getEntity(id: number): Entity | null {
    return this.entities.get(id) ?? null;
  }

  addSystem(name: string, required: string[], fn: SystemFn): void {
    this.systems.push({ name, fn, required });
  }

  removeSystem(name: string): boolean {
    const idx = this.systems.findIndex(s => s.name === name);
    if (idx === -1) return false;
    this.systems.splice(idx, 1);
    return true;
  }

  query(...components: string[]): Entity[] {
    const result: Entity[] = [];
    for (const entity of this.entities.values()) {
      if (entity.hasAll(...components)) {
        result.push(entity);
      }
    }
    return result;
  }

  update(dt: number): void {
    for (const system of this.systems) {
      const matching = this.query(...system.required);
      system.fn(matching, dt);
    }
  }

  get entityCount(): number {
    return this.entities.size;
  }

  get systemCount(): number {
    return this.systems.length;
  }

  clear(): void {
    this.entities.clear();
  }
}
