export interface GossipNode {
  id: string;
  state: Map<string, { value: unknown; version: number }>;
  peers: string[];
}

export class GossipCluster {
  private nodes = new Map<string, GossipNode>();
  private log: string[] = [];

  addNode(id: string, peers: string[] = []): void {
    this.nodes.set(id, { id, state: new Map(), peers: [...peers] });
  }

  removeNode(id: string): void {
    this.nodes.delete(id);
    for (const [, node] of this.nodes) {
      node.peers = node.peers.filter((p) => p !== id);
    }
  }

  connect(a: string, b: string): void {
    const nodeA = this.nodes.get(a);
    const nodeB = this.nodes.get(b);
    if (!nodeA || !nodeB) return;
    if (!nodeA.peers.includes(b)) nodeA.peers.push(b);
    if (!nodeB.peers.includes(a)) nodeB.peers.push(a);
  }

  setLocal(nodeId: string, key: string, value: unknown): void {
    const node = this.nodes.get(nodeId);
    if (!node) return;
    const existing = node.state.get(key);
    const version = existing ? existing.version + 1 : 1;
    node.state.set(key, { value, version });
    this.log.push(`${nodeId}: set ${key}=${JSON.stringify(value)} v${version}`);
  }

  getLocal(nodeId: string, key: string): unknown | undefined {
    return this.nodes.get(nodeId)?.state.get(key)?.value;
  }

  gossipRound(): number {
    let updates = 0;
    for (const [, node] of this.nodes) {
      if (node.peers.length === 0) continue;
      const peerIdx = Math.floor(Math.random() * node.peers.length);
      const peerId = node.peers[peerIdx];
      const peer = this.nodes.get(peerId);
      if (!peer) continue;
      updates += this.exchange(node, peer);
    }
    return updates;
  }

  gossipRoundDeterministic(): number {
    let updates = 0;
    for (const [, node] of this.nodes) {
      for (const peerId of node.peers) {
        const peer = this.nodes.get(peerId);
        if (!peer) continue;
        updates += this.exchange(node, peer);
      }
    }
    return updates;
  }

  private exchange(a: GossipNode, b: GossipNode): number {
    let updates = 0;
    for (const [key, entry] of a.state) {
      const bEntry = b.state.get(key);
      if (!bEntry || bEntry.version < entry.version) {
        b.state.set(key, { ...entry });
        updates++;
        this.log.push(`${b.id}: received ${key}=${JSON.stringify(entry.value)} v${entry.version} from ${a.id}`);
      }
    }
    for (const [key, entry] of b.state) {
      const aEntry = a.state.get(key);
      if (!aEntry || aEntry.version < entry.version) {
        a.state.set(key, { ...entry });
        updates++;
        this.log.push(`${a.id}: received ${key}=${JSON.stringify(entry.value)} v${entry.version} from ${b.id}`);
      }
    }
    return updates;
  }

  converge(maxRounds = 100): number {
    for (let i = 0; i < maxRounds; i++) {
      const updates = this.gossipRoundDeterministic();
      if (updates === 0) return i + 1;
    }
    return maxRounds;
  }

  isConverged(key: string): boolean {
    let expected: { value: unknown; version: number } | undefined;
    for (const [, node] of this.nodes) {
      const entry = node.state.get(key);
      if (!entry) return false;
      if (!expected) {
        expected = entry;
      } else if (entry.version !== expected.version) {
        return false;
      }
    }
    return true;
  }

  get nodeCount(): number {
    return this.nodes.size;
  }

  getLog(): string[] {
    return [...this.log];
  }

  clearLog(): void {
    this.log = [];
  }

  nodeIds(): string[] {
    return [...this.nodes.keys()];
  }

  getState(nodeId: string): Map<string, unknown> {
    const node = this.nodes.get(nodeId);
    if (!node) return new Map();
    const result = new Map<string, unknown>();
    for (const [k, v] of node.state) {
      result.set(k, v.value);
    }
    return result;
  }
}
