export interface Item {
  id: string;
  name: string;
  stackable?: boolean;
  maxStack?: number;
  weight?: number;
  tags?: string[];
  metadata?: Record<string, unknown>;
}

export interface InventorySlot {
  item: Item;
  quantity: number;
}

export class Inventory {
  private slots: Map<string, InventorySlot> = new Map();
  private maxSlots: number;
  private maxWeight: number;

  constructor(maxSlots = Infinity, maxWeight = Infinity) {
    this.maxSlots = maxSlots;
    this.maxWeight = maxWeight;
  }

  add(item: Item, quantity = 1): number {
    if (quantity <= 0) return 0;

    const existing = this.slots.get(item.id);
    if (existing && item.stackable !== false) {
      const maxAdd = (item.maxStack ?? Infinity) - existing.quantity;
      const weightLimit = this.remainingWeight() / ((item.weight ?? 0) || Infinity);
      const toAdd = Math.min(quantity, maxAdd, item.weight ? Math.floor(weightLimit) : quantity);
      if (toAdd <= 0) return 0;
      existing.quantity += toAdd;
      return toAdd;
    }

    if (this.slots.size >= this.maxSlots) return 0;

    const weightAvail = this.remainingWeight();
    const byWeight = item.weight ? Math.floor(weightAvail / item.weight) : quantity;
    const maxStack = item.stackable === false ? 1 : (item.maxStack ?? Infinity);
    const toAdd = Math.min(quantity, maxStack, byWeight);
    if (toAdd <= 0) return 0;

    this.slots.set(item.id, { item, quantity: toAdd });
    return toAdd;
  }

  remove(itemId: string, quantity = 1): number {
    const slot = this.slots.get(itemId);
    if (!slot) return 0;
    const toRemove = Math.min(quantity, slot.quantity);
    slot.quantity -= toRemove;
    if (slot.quantity <= 0) this.slots.delete(itemId);
    return toRemove;
  }

  has(itemId: string): boolean {
    return this.slots.has(itemId);
  }

  count(itemId: string): number {
    return this.slots.get(itemId)?.quantity ?? 0;
  }

  get(itemId: string): InventorySlot | undefined {
    return this.slots.get(itemId);
  }

  totalWeight(): number {
    let total = 0;
    for (const slot of this.slots.values()) {
      total += (slot.item.weight ?? 0) * slot.quantity;
    }
    return total;
  }

  remainingWeight(): number {
    return this.maxWeight - this.totalWeight();
  }

  slotCount(): number {
    return this.slots.size;
  }

  isFull(): boolean {
    return this.slots.size >= this.maxSlots;
  }

  clear(): void {
    this.slots.clear();
  }

  allItems(): InventorySlot[] {
    return Array.from(this.slots.values());
  }

  findByTag(tag: string): InventorySlot[] {
    return this.allItems().filter((s) => s.item.tags?.includes(tag));
  }

  transfer(target: Inventory, itemId: string, quantity = 1): number {
    const slot = this.slots.get(itemId);
    if (!slot) return 0;
    const available = Math.min(quantity, slot.quantity);
    const added = target.add(slot.item, available);
    if (added > 0) this.remove(itemId, added);
    return added;
  }
}
