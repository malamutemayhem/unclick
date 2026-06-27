export interface DVEntry {
  dest: string;
  cost: number;
  nextHop: string;
}

export interface DVUpdate {
  from: string;
  entries: DVEntry[];
}

export class DistanceVectorRouter {
  readonly id: string;
  private neighbors = new Map<string, number>();
  private table = new Map<string, DVEntry>();

  constructor(id: string) {
    this.id = id;
    this.table.set(id, { dest: id, cost: 0, nextHop: id });
  }

  addNeighbor(id: string, cost: number): void {
    this.neighbors.set(id, cost);
    const existing = this.table.get(id);
    if (!existing || cost < existing.cost) {
      this.table.set(id, { dest: id, cost, nextHop: id });
    }
  }

  removeNeighbor(id: string): void {
    this.neighbors.delete(id);
    const toRemove: string[] = [];
    for (const [dest, entry] of this.table) {
      if (entry.nextHop === id && dest !== this.id) {
        toRemove.push(dest);
      }
    }
    for (const d of toRemove) this.table.delete(d);
  }

  getUpdate(): DVUpdate {
    return {
      from: this.id,
      entries: [...this.table.values()].map((e) => ({ ...e })),
    };
  }

  receiveUpdate(update: DVUpdate): boolean {
    const linkCost = this.neighbors.get(update.from);
    if (linkCost === undefined) return false;

    let changed = false;
    for (const entry of update.entries) {
      if (entry.dest === this.id) continue;
      const newCost = linkCost + entry.cost;
      const current = this.table.get(entry.dest);

      if (!current || newCost < current.cost) {
        this.table.set(entry.dest, {
          dest: entry.dest,
          cost: newCost,
          nextHop: update.from,
        });
        changed = true;
      } else if (current.nextHop === update.from && newCost !== current.cost) {
        this.table.set(entry.dest, {
          dest: entry.dest,
          cost: newCost,
          nextHop: update.from,
        });
        changed = true;
      }
    }
    return changed;
  }

  getRoute(dest: string): DVEntry | null {
    return this.table.get(dest) || null;
  }

  getRoutingTable(): DVEntry[] {
    return [...this.table.values()].map((e) => ({ ...e }));
  }

  get tableSize(): number {
    return this.table.size;
  }

  getNextHop(dest: string): string | null {
    const entry = this.table.get(dest);
    return entry ? entry.nextHop : null;
  }

  getCost(dest: string): number | null {
    const entry = this.table.get(dest);
    return entry ? entry.cost : null;
  }
}

export function converge(routers: DistanceVectorRouter[], maxRounds = 100): number {
  for (let round = 0; round < maxRounds; round++) {
    const updates = routers.map((r) => r.getUpdate());
    let anyChanged = false;
    for (const router of routers) {
      for (const update of updates) {
        if (update.from === router.id) continue;
        if (router.receiveUpdate(update)) anyChanged = true;
      }
    }
    if (!anyChanged) return round + 1;
  }
  return maxRounds;
}
