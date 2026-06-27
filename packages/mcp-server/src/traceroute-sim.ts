export interface TracerouteHop {
  hop: number;
  ip: string;
  rtt: number[];
  label?: string;
  reached: boolean;
}

export interface TracerouteResult {
  target: string;
  hops: TracerouteHop[];
  reached: boolean;
  totalHops: number;
}

export interface NetworkNode {
  ip: string;
  label?: string;
  latency: number;
  next?: string;
  dropRate?: number;
}

export class TracerouteSim {
  private nodes = new Map<string, NetworkNode>();
  private paths = new Map<string, string[]>();
  private probesPerHop: number;
  private maxHops: number;
  private rng: () => number;

  constructor(probesPerHop = 3, maxHops = 30, seed?: number) {
    this.probesPerHop = probesPerHop;
    this.maxHops = maxHops;
    this.rng = seed !== undefined ? this.seededRandom(seed) : Math.random.bind(Math);
  }

  addNode(ip: string, latency: number, label?: string, dropRate = 0): void {
    this.nodes.set(ip, { ip, label, latency, dropRate });
  }

  addPath(target: string, hops: string[]): void {
    this.paths.set(target, hops);
  }

  trace(target: string): TracerouteResult {
    const path = this.paths.get(target);
    if (!path) {
      return { target, hops: [], reached: false, totalHops: 0 };
    }

    const hops: TracerouteHop[] = [];
    let reachedTarget = false;

    for (let i = 0; i < path.length && i < this.maxHops; i++) {
      const nodeIp = path[i];
      const node = this.nodes.get(nodeIp);
      const baseLatency = node ? node.latency : 10;
      const dropRate = node ? (node.dropRate ?? 0) : 0;

      const rtts: number[] = [];
      for (let p = 0; p < this.probesPerHop; p++) {
        if (this.rng() < dropRate) {
          rtts.push(-1);
        } else {
          const cumulativeLatency = this.getCumulativeLatency(path, i);
          const jitter = (this.rng() - 0.5) * baseLatency * 0.2;
          rtts.push(Math.round((cumulativeLatency + jitter) * 100) / 100);
        }
      }

      hops.push({
        hop: i + 1,
        ip: nodeIp,
        rtt: rtts,
        label: node?.label,
        reached: true,
      });

      if (nodeIp === target) {
        reachedTarget = true;
        break;
      }
    }

    return {
      target,
      hops,
      reached: reachedTarget,
      totalHops: hops.length,
    };
  }

  private getCumulativeLatency(path: string[], upToIndex: number): number {
    let total = 0;
    for (let i = 0; i <= upToIndex; i++) {
      const node = this.nodes.get(path[i]);
      total += node ? node.latency : 10;
    }
    return total;
  }

  format(result: TracerouteResult): string {
    const lines: string[] = [`traceroute to ${result.target}, ${this.maxHops} hops max`];
    for (const hop of result.hops) {
      const rtts = hop.rtt.map((r) => (r < 0 ? "*" : `${r} ms`)).join("  ");
      const label = hop.label ? ` (${hop.label})` : "";
      lines.push(`  ${hop.hop}  ${hop.ip}${label}  ${rtts}`);
    }
    if (!result.reached) {
      lines.push("  * * * destination unreachable");
    }
    return lines.join("\n");
  }

  get nodeCount(): number {
    return this.nodes.size;
  }

  get pathCount(): number {
    return this.paths.size;
  }

  private seededRandom(seed: number): () => number {
    let s = seed;
    return () => {
      s = (s * 1103515245 + 12345) & 0x7fffffff;
      return s / 0x7fffffff;
    };
  }
}
