export interface BGPRoute {
  prefix: string;
  asPath: number[];
  nextHop: string;
  localPref: number;
  med: number;
  origin: "igp" | "egp" | "incomplete";
}

export type BGPState = "Idle" | "Connect" | "OpenSent" | "OpenConfirm" | "Established";

export class BGPPeer {
  readonly asn: number;
  readonly routerId: string;
  private adjRibIn = new Map<string, Map<string, BGPRoute>>();
  private locRib = new Map<string, BGPRoute>();
  private peers = new Map<string, { asn: number; state: BGPState }>();

  constructor(asn: number, routerId: string) {
    this.asn = asn;
    this.routerId = routerId;
  }

  addPeer(peerId: string, peerAsn: number): void {
    this.peers.set(peerId, { asn: peerAsn, state: "Idle" });
    this.adjRibIn.set(peerId, new Map());
  }

  removePeer(peerId: string): void {
    this.peers.delete(peerId);
    this.adjRibIn.delete(peerId);
    for (const [prefix, route] of this.locRib) {
      if (this.routeFrom(route) === peerId) {
        this.locRib.delete(prefix);
      }
    }
  }

  setPeerState(peerId: string, state: BGPState): void {
    const peer = this.peers.get(peerId);
    if (peer) peer.state = state;
  }

  getPeerState(peerId: string): BGPState | null {
    return this.peers.get(peerId)?.state ?? null;
  }

  receiveUpdate(peerId: string, route: BGPRoute): boolean {
    const peerRoutes = this.adjRibIn.get(peerId);
    if (!peerRoutes) return false;

    const withPath: BGPRoute = {
      ...route,
      asPath: [...route.asPath],
    };

    if (route.asPath.includes(this.asn)) return false;

    peerRoutes.set(route.prefix, withPath);
    return this.runBestPathSelection(route.prefix);
  }

  withdraw(peerId: string, prefix: string): boolean {
    const peerRoutes = this.adjRibIn.get(peerId);
    if (!peerRoutes) return false;
    peerRoutes.delete(prefix);
    return this.runBestPathSelection(prefix);
  }

  private runBestPathSelection(prefix: string): boolean {
    let best: BGPRoute | null = null;
    let bestPeer: string | null = null;

    for (const [peerId, routes] of this.adjRibIn) {
      const route = routes.get(prefix);
      if (!route) continue;
      if (!best || this.isBetter(route, best)) {
        best = route;
        bestPeer = peerId;
      }
    }

    const current = this.locRib.get(prefix);
    if (!best) {
      if (current) {
        this.locRib.delete(prefix);
        return true;
      }
      return false;
    }

    if (!current || this.isBetter(best, current)) {
      this.locRib.set(prefix, { ...best, asPath: [...best.asPath] });
      return true;
    }
    return false;
  }

  private isBetter(a: BGPRoute, b: BGPRoute): boolean {
    if (a.localPref !== b.localPref) return a.localPref > b.localPref;
    if (a.asPath.length !== b.asPath.length) return a.asPath.length < b.asPath.length;
    const originRank = { igp: 0, egp: 1, incomplete: 2 };
    if (originRank[a.origin] !== originRank[b.origin]) return originRank[a.origin] < originRank[b.origin];
    if (a.med !== b.med) return a.med < b.med;
    return false;
  }

  private routeFrom(route: BGPRoute): string | null {
    for (const [peerId, routes] of this.adjRibIn) {
      if (routes.has(route.prefix)) {
        const r = routes.get(route.prefix)!;
        if (r.nextHop === route.nextHop) return peerId;
      }
    }
    return null;
  }

  generateUpdate(prefix: string): BGPRoute | null {
    const route = this.locRib.get(prefix);
    if (!route) return null;
    return {
      ...route,
      asPath: [this.asn, ...route.asPath],
      nextHop: this.routerId,
    };
  }

  getRoute(prefix: string): BGPRoute | null {
    const r = this.locRib.get(prefix);
    return r ? { ...r, asPath: [...r.asPath] } : null;
  }

  getRoutingTable(): BGPRoute[] {
    return [...this.locRib.values()].map((r) => ({ ...r, asPath: [...r.asPath] }));
  }

  get routeCount(): number {
    return this.locRib.size;
  }

  get peerCount(): number {
    return this.peers.size;
  }

  listPeers(): Array<{ id: string; asn: number; state: BGPState }> {
    return [...this.peers.entries()].map(([id, p]) => ({ id, asn: p.asn, state: p.state }));
  }
}
