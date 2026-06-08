export interface Entity {
  id: string;
  type: string;
  name: string;
  aliases?: string[];
  metadata?: Record<string, unknown>;
}

export interface EntityMention {
  entity: Entity;
  position: number;
  length: number;
  text: string;
}

export class EntityIndex {
  private entities = new Map<string, Entity>();
  private nameIndex = new Map<string, string>();

  add(entity: Entity): void {
    this.entities.set(entity.id, entity);
    this.nameIndex.set(entity.name.toLowerCase(), entity.id);
    if (entity.aliases) {
      for (const alias of entity.aliases) {
        this.nameIndex.set(alias.toLowerCase(), entity.id);
      }
    }
  }

  remove(id: string): boolean {
    const entity = this.entities.get(id);
    if (!entity) return false;
    this.nameIndex.delete(entity.name.toLowerCase());
    if (entity.aliases) {
      for (const alias of entity.aliases) {
        this.nameIndex.delete(alias.toLowerCase());
      }
    }
    this.entities.delete(id);
    return true;
  }

  getById(id: string): Entity | undefined {
    return this.entities.get(id);
  }

  getByName(name: string): Entity | undefined {
    const id = this.nameIndex.get(name.toLowerCase());
    return id ? this.entities.get(id) : undefined;
  }

  search(query: string): Entity[] {
    const lower = query.toLowerCase();
    const results: Entity[] = [];
    for (const entity of this.entities.values()) {
      if (entity.name.toLowerCase().includes(lower)) {
        results.push(entity);
        continue;
      }
      if (entity.aliases?.some((a) => a.toLowerCase().includes(lower))) {
        results.push(entity);
      }
    }
    return results;
  }

  findMentions(text: string): EntityMention[] {
    const lower = text.toLowerCase();
    const mentions: EntityMention[] = [];

    for (const [name, id] of this.nameIndex.entries()) {
      let pos = lower.indexOf(name);
      while (pos !== -1) {
        const entity = this.entities.get(id)!;
        mentions.push({
          entity,
          position: pos,
          length: name.length,
          text: text.slice(pos, pos + name.length),
        });
        pos = lower.indexOf(name, pos + 1);
      }
    }

    mentions.sort((a, b) => a.position - b.position);
    return mentions;
  }

  getByType(type: string): Entity[] {
    return [...this.entities.values()].filter((e) => e.type === type);
  }

  get size(): number {
    return this.entities.size;
  }

  clear(): void {
    this.entities.clear();
    this.nameIndex.clear();
  }

  all(): Entity[] {
    return [...this.entities.values()];
  }
}

export function linkEntities(
  text: string,
  index: EntityIndex,
): { text: string; entities: Entity[]; mentions: EntityMention[] } {
  const mentions = index.findMentions(text);
  const uniqueEntities = new Map<string, Entity>();
  for (const m of mentions) {
    uniqueEntities.set(m.entity.id, m.entity);
  }
  return {
    text,
    entities: [...uniqueEntities.values()],
    mentions,
  };
}
