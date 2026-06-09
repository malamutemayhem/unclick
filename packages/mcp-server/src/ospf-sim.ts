export interface OSPFNeighbor {
  routerId: string;
  state: "Down" | "Init" | "TwoWay" | "ExStart" | "Exchange" | "Loading" | "Full";
  priority: number;
  interfaceCost: number;
}

export interface OSPFArea {
  id: number;
  routers: Set<string>;
  networks: string[];
}

export interface OSPFRouteEntry {
  dest: string;
  cost: number;
  nextHop: string;
  area: number;
  type: "intra" | "inter" | "external-1" | "external-2";
}

export class OSPFRouter {
  readonly routerId: string;
  readonly priority: number;
  private neighbors = new Map<string, OSPFNeighbor>();
  private areas = new Map<number, OSPFArea>();
  private routes = new Map<string, OSPFRouteEntry>();
  private dr: string | null = null;
  private bdr: string | null = null;

  constructor(routerId: string, priority = 1) {
    this.routerId = routerId;
    this.priority = priority;
  }

  addNeighbor(routerId: string, cost: number, priority = 1): void {
    this.neighbors.set(routerId, {
      routerId,
      state: "Down",
      priority,
      interfaceCost: cost,
    });
  }

  setNeighborState(routerId: string, state: OSPFNeighbor["state"]): void {
    const n = this.neighbors.get(routerId);
    if (n) n.state = state;
  }

  getNeighborState(routerId: string): OSPFNeighbor["state"] | null {
    return this.neighbors.get(routerId)?.state ?? null;
  }

  joinArea(areaId: number, networks: string[] = []): void {
    if (!this.areas.has(areaId)) {
      this.areas.set(areaId, { id: areaId, routers: new Set(), networks: [] });
    }
    const area = this.areas.get(areaId)!;
    area.routers.add(this.routerId);
    area.networks.push(...networks);
  }

  electDR(): { dr: string; bdr: string | null } {
    const candidates: Array<{ id: string; priority: number }> = [
      { id: this.routerId, priority: this.priority },
    ];
    for (const [id, n] of this.neighbors) {
      if (n.state === "TwoWay" || n.state === "Full") {
        candidates.push({ id, priority: n.priority });
      }
    }

    candidates.sort((a, b) => {
      if (a.priority !== b.priority) return b.priority - a.priority;
      return a.id > b.id ? -1 : 1;
    });

    this.dr = candidates[0]?.id ?? this.routerId;
    this.bdr = candidates[1]?.id ?? null;
    return { dr: this.dr, bdr: this.bdr };
  }

  addRoute(entry: OSPFRouteEntry): void {
    const existing = this.routes.get(entry.dest);
    if (!existing || this.routePreference(entry) < this.routePreference(existing) || entry.cost < existing.cost) {
      this.routes.set(entry.dest, { ...entry });
    }
  }

  private routePreference(entry: OSPFRouteEntry): number {
    const prefs = { intra: 0, inter: 1, "external-1": 2, "external-2": 3 };
    return prefs[entry.type];
  }

  getRoute(dest: string): OSPFRouteEntry | null {
    const r = this.routes.get(dest);
    return r ? { ...r } : null;
  }

  getRoutingTable(): OSPFRouteEntry[] {
    return [...this.routes.values()].map((r) => ({ ...r }));
  }

  getNeighbors(): OSPFNeighbor[] {
    return [...this.neighbors.values()].map((n) => ({ ...n }));
  }

  get neighborCount(): number {
    return this.neighbors.size;
  }

  get fullNeighborCount(): number {
    let count = 0;
    for (const n of this.neighbors.values()) {
      if (n.state === "Full") count++;
    }
    return count;
  }

  get designatedRouter(): string | null {
    return this.dr;
  }

  get backupDesignatedRouter(): string | null {
    return this.bdr;
  }

  get routeCount(): number {
    return this.routes.size;
  }

  get areaCount(): number {
    return this.areas.size;
  }

  isABR(): boolean {
    return this.areas.size > 1;
  }

  removeNeighbor(routerId: string): boolean {
    return this.neighbors.delete(routerId);
  }
}
