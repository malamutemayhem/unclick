export type NodeId = string;
export type PacketId = number;

export interface Packet {
  id: PacketId;
  src: NodeId;
  dst: NodeId;
  payload: unknown;
  hops: NodeId[];
  ttl: number;
}

export interface Link {
  from: NodeId;
  to: NodeId;
  latency: number;
  bandwidth: number;
  dropRate: number;
}

export interface NetworkNode {
  id: NodeId;
  queue: Packet[];
  received: Packet[];
  dropped: number;
}

export class NetworkSimulator {
  private nodes = new Map<NodeId, NetworkNode>();
  private links: Link[] = [];
  private nextPacketId = 0;
  private inFlight: Array<{ packet: Packet; link: Link; arriveAt: number }> = [];
  private time = 0;
  private rng: () => number;

  constructor(rngSeed?: number) {
    this.rng = rngSeed !== undefined ? seededRandom(rngSeed) : Math.random;
  }

  addNode(id: NodeId): void {
    this.nodes.set(id, { id, queue: [], received: [], dropped: 0 });
  }

  addLink(from: NodeId, to: NodeId, latency = 1, bandwidth = Infinity, dropRate = 0): void {
    this.links.push({ from, to, latency, bandwidth, dropRate });
  }

  addBidirectionalLink(a: NodeId, b: NodeId, latency = 1, bandwidth = Infinity, dropRate = 0): void {
    this.addLink(a, b, latency, bandwidth, dropRate);
    this.addLink(b, a, latency, bandwidth, dropRate);
  }

  send(src: NodeId, dst: NodeId, payload: unknown, ttl = 64): PacketId {
    const id = this.nextPacketId++;
    const packet: Packet = { id, src, dst, payload, hops: [src], ttl };

    const link = this.findLink(src, dst);
    if (!link) {
      const route = this.findRoute(src, dst);
      if (route && route.length > 1) {
        const firstLink = this.findLink(src, route[1]);
        if (firstLink) {
          this.enqueue(packet, firstLink);
          return id;
        }
      }
      this.nodes.get(src)!.dropped++;
      return id;
    }

    this.enqueue(packet, link);
    return id;
  }

  private enqueue(packet: Packet, link: Link): void {
    if (this.rng() < link.dropRate) {
      this.nodes.get(packet.hops[0])!.dropped++;
      return;
    }
    this.inFlight.push({ packet, link, arriveAt: this.time + link.latency });
  }

  tick(): void {
    this.time++;
    const arrived: typeof this.inFlight = [];
    const remaining: typeof this.inFlight = [];

    for (const f of this.inFlight) {
      if (f.arriveAt <= this.time) {
        arrived.push(f);
      } else {
        remaining.push(f);
      }
    }
    this.inFlight = remaining;

    for (const { packet, link } of arrived) {
      const node = this.nodes.get(link.to);
      if (!node) continue;

      packet.hops.push(link.to);
      packet.ttl--;

      if (packet.ttl <= 0) {
        node.dropped++;
        continue;
      }

      if (link.to === packet.dst) {
        node.received.push(packet);
      } else {
        const route = this.findRoute(link.to, packet.dst);
        if (route && route.length > 1) {
          const nextLink = this.findLink(link.to, route[1]);
          if (nextLink) {
            this.enqueue({ ...packet }, nextLink);
            continue;
          }
        }
        node.dropped++;
      }
    }
  }

  tickN(n: number): void {
    for (let i = 0; i < n; i++) this.tick();
  }

  getTime(): number {
    return this.time;
  }

  getNode(id: NodeId): NetworkNode | undefined {
    return this.nodes.get(id);
  }

  getReceived(id: NodeId): Packet[] {
    return this.nodes.get(id)?.received ?? [];
  }

  getDropped(id: NodeId): number {
    return this.nodes.get(id)?.dropped ?? 0;
  }

  inFlightCount(): number {
    return this.inFlight.length;
  }

  private findLink(from: NodeId, to: NodeId): Link | undefined {
    return this.links.find((l) => l.from === from && l.to === to);
  }

  private findRoute(src: NodeId, dst: NodeId): NodeId[] | null {
    const visited = new Set<NodeId>();
    const queue: NodeId[][] = [[src]];
    visited.add(src);

    while (queue.length > 0) {
      const path = queue.shift()!;
      const current = path[path.length - 1];
      if (current === dst) return path;

      for (const link of this.links) {
        if (link.from === current && !visited.has(link.to)) {
          visited.add(link.to);
          queue.push([...path, link.to]);
        }
      }
    }
    return null;
  }
}

function seededRandom(seed: number): () => number {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) & 0x7fffffff;
    return s / 0x7fffffff;
  };
}
