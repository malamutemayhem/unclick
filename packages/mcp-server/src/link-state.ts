export interface LinkStateEdge {
  neighbor: string;
  cost: number;
}

export interface LSA {
  router: string;
  seq: number;
  links: LinkStateEdge[];
}

export interface SPFResult {
  dest: string;
  cost: number;
  path: string[];
}

export class LinkStateRouter {
  readonly id: string;
  private links = new Map<string, number>();
  private lsdb = new Map<string, LSA>();
  private seq = 0;

  constructor(id: string) {
    this.id = id;
  }

  addLink(neighbor: string, cost: number): void {
    this.links.set(neighbor, cost);
  }

  removeLink(neighbor: string): boolean {
    return this.links.delete(neighbor);
  }

  updateLinkCost(neighbor: string, cost: number): void {
    this.links.set(neighbor, cost);
  }

  originateLSA(): LSA {
    this.seq++;
    const lsa: LSA = {
      router: this.id,
      seq: this.seq,
      links: [...this.links.entries()].map(([neighbor, cost]) => ({ neighbor, cost })),
    };
    this.lsdb.set(this.id, lsa);
    return { ...lsa, links: lsa.links.map((l) => ({ ...l })) };
  }

  receiveLSA(lsa: LSA): boolean {
    const existing = this.lsdb.get(lsa.router);
    if (existing && existing.seq >= lsa.seq) return false;
    this.lsdb.set(lsa.router, {
      router: lsa.router,
      seq: lsa.seq,
      links: lsa.links.map((l) => ({ ...l })),
    });
    return true;
  }

  runSPF(): SPFResult[] {
    const dist = new Map<string, number>();
    const prev = new Map<string, string | null>();
    const visited = new Set<string>();

    for (const [router] of this.lsdb) {
      dist.set(router, Infinity);
      prev.set(router, null);
    }
    dist.set(this.id, 0);

    for (;;) {
      let u: string | null = null;
      let minDist = Infinity;
      for (const [node, d] of dist) {
        if (!visited.has(node) && d < minDist) {
          minDist = d;
          u = node;
        }
      }
      if (u === null) break;
      visited.add(u);

      const lsa = this.lsdb.get(u);
      if (!lsa) continue;

      for (const link of lsa.links) {
        if (!dist.has(link.neighbor)) {
          dist.set(link.neighbor, Infinity);
          prev.set(link.neighbor, null);
        }
        const alt = minDist + link.cost;
        if (alt < dist.get(link.neighbor)!) {
          dist.set(link.neighbor, alt);
          prev.set(link.neighbor, u);
        }
      }
    }

    const results: SPFResult[] = [];
    for (const [dest, cost] of dist) {
      if (dest === this.id) continue;
      if (cost === Infinity) continue;
      const path: string[] = [];
      let cur: string | null | undefined = dest;
      while (cur !== null && cur !== undefined) {
        path.unshift(cur);
        cur = prev.get(cur);
      }
      results.push({ dest, cost, path });
    }
    return results;
  }

  getNextHop(dest: string): string | null {
    const results = this.runSPF();
    const route = results.find((r) => r.dest === dest);
    if (!route || route.path.length < 2) return null;
    return route.path[1];
  }

  getLSDB(): LSA[] {
    return [...this.lsdb.values()].map((lsa) => ({
      router: lsa.router,
      seq: lsa.seq,
      links: lsa.links.map((l) => ({ ...l })),
    }));
  }

  get lsdbSize(): number {
    return this.lsdb.size;
  }

  getDirectLinks(): LinkStateEdge[] {
    return [...this.links.entries()].map(([neighbor, cost]) => ({ neighbor, cost }));
  }
}

export function floodLSAs(routers: LinkStateRouter[]): void {
  const lsas = routers.map((r) => r.originateLSA());
  let changed = true;
  while (changed) {
    changed = false;
    for (const router of routers) {
      for (const lsa of lsas) {
        if (router.receiveLSA(lsa)) changed = true;
      }
    }
  }
}
