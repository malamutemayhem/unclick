export interface LootItem {
  id: string;
  name: string;
  weight: number;
  rarity?: string;
  minQuantity?: number;
  maxQuantity?: number;
}

export interface LootDrop {
  id: string;
  name: string;
  quantity: number;
  rarity?: string;
}

export class LootTable {
  private items: LootItem[] = [];
  private name: string;

  constructor(name: string) {
    this.name = name;
  }

  add(item: LootItem): void {
    this.items.push(item);
  }

  remove(id: string): boolean {
    const idx = this.items.findIndex((i) => i.id === id);
    if (idx < 0) return false;
    this.items.splice(idx, 1);
    return true;
  }

  roll(rng?: () => number): LootDrop | null {
    const rand = rng ?? Math.random;
    if (this.items.length === 0) return null;
    const totalWeight = this.items.reduce((sum, i) => sum + i.weight, 0);
    let r = rand() * totalWeight;
    for (const item of this.items) {
      r -= item.weight;
      if (r <= 0) {
        const min = item.minQuantity ?? 1;
        const max = item.maxQuantity ?? 1;
        const quantity = min + Math.floor(rand() * (max - min + 1));
        return { id: item.id, name: item.name, quantity, rarity: item.rarity };
      }
    }
    return null;
  }

  rollMany(count: number, rng?: () => number): LootDrop[] {
    const drops: LootDrop[] = [];
    for (let i = 0; i < count; i++) {
      const drop = this.roll(rng);
      if (drop) drops.push(drop);
    }
    return drops;
  }

  probability(id: string): number {
    const totalWeight = this.items.reduce((sum, i) => sum + i.weight, 0);
    if (totalWeight === 0) return 0;
    const item = this.items.find((i) => i.id === id);
    if (!item) return 0;
    return item.weight / totalWeight;
  }

  itemCount(): number {
    return this.items.length;
  }

  getName(): string {
    return this.name;
  }

  getItems(): LootItem[] {
    return [...this.items];
  }

  sortByWeight(): void {
    this.items.sort((a, b) => b.weight - a.weight);
  }

  filterByRarity(rarity: string): LootItem[] {
    return this.items.filter((i) => i.rarity === rarity);
  }

  totalWeight(): number {
    return this.items.reduce((sum, i) => sum + i.weight, 0);
  }
}

export class TieredLootSystem {
  private tables: Map<string, LootTable> = new Map();

  addTable(name: string, table: LootTable): void {
    this.tables.set(name, table);
  }

  getTable(name: string): LootTable | undefined {
    return this.tables.get(name);
  }

  roll(tableName: string, rng?: () => number): LootDrop | null {
    const table = this.tables.get(tableName);
    if (!table) return null;
    return table.roll(rng);
  }

  rollFromAll(rng?: () => number): LootDrop[] {
    const drops: LootDrop[] = [];
    for (const table of this.tables.values()) {
      const drop = table.roll(rng);
      if (drop) drops.push(drop);
    }
    return drops;
  }

  tableCount(): number {
    return this.tables.size;
  }

  tableNames(): string[] {
    return Array.from(this.tables.keys());
  }
}
