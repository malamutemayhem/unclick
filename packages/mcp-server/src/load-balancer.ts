export interface Backend {
  id: string;
  address: string;
  weight: number;
  healthy: boolean;
  connections: number;
  totalRequests: number;
  responseTimeMs: number;
}

export type Algorithm =
  | "round-robin"
  | "weighted-round-robin"
  | "least-connections"
  | "weighted-least-connections"
  | "ip-hash"
  | "random";

export class LoadBalancer {
  private backends: Backend[] = [];
  private algorithm: Algorithm;
  private rrIndex = 0;
  private wrrIndex = 0;
  private wrrCurrent = 0;

  constructor(algorithm: Algorithm = "round-robin") {
    this.algorithm = algorithm;
  }

  addBackend(id: string, address: string, weight = 1): void {
    this.backends.push({
      id,
      address,
      weight,
      healthy: true,
      connections: 0,
      totalRequests: 0,
      responseTimeMs: 0,
    });
  }

  removeBackend(id: string): boolean {
    const idx = this.backends.findIndex((b) => b.id === id);
    if (idx === -1) return false;
    this.backends.splice(idx, 1);
    return true;
  }

  setHealth(id: string, healthy: boolean): void {
    const b = this.backends.find((b) => b.id === id);
    if (b) b.healthy = healthy;
  }

  next(clientIp?: string): Backend | null {
    const healthy = this.backends.filter((b) => b.healthy);
    if (healthy.length === 0) return null;

    let selected: Backend;
    switch (this.algorithm) {
      case "round-robin":
        selected = this.roundRobin(healthy);
        break;
      case "weighted-round-robin":
        selected = this.weightedRoundRobin(healthy);
        break;
      case "least-connections":
        selected = this.leastConnections(healthy);
        break;
      case "weighted-least-connections":
        selected = this.weightedLeastConnections(healthy);
        break;
      case "ip-hash":
        selected = this.ipHash(healthy, clientIp || "0.0.0.0");
        break;
      case "random":
        selected = healthy[Math.floor(Math.random() * healthy.length)];
        break;
    }

    selected.connections++;
    selected.totalRequests++;
    return { ...selected };
  }

  release(id: string): void {
    const b = this.backends.find((b) => b.id === id);
    if (b && b.connections > 0) b.connections--;
  }

  updateResponseTime(id: string, ms: number): void {
    const b = this.backends.find((b) => b.id === id);
    if (b) b.responseTimeMs = ms;
  }

  private roundRobin(healthy: Backend[]): Backend {
    this.rrIndex = this.rrIndex % healthy.length;
    return healthy[this.rrIndex++];
  }

  private weightedRoundRobin(healthy: Backend[]): Backend {
    const maxWeight = Math.max(...healthy.map((b) => b.weight));
    const gcdWeight = healthy.reduce((g, b) => this.gcd(g, b.weight), healthy[0].weight);

    for (;;) {
      this.wrrIndex = (this.wrrIndex + 1) % healthy.length;
      if (this.wrrIndex === 0) {
        this.wrrCurrent -= gcdWeight;
        if (this.wrrCurrent <= 0) this.wrrCurrent = maxWeight;
      }
      if (healthy[this.wrrIndex].weight >= this.wrrCurrent) {
        return healthy[this.wrrIndex];
      }
    }
  }

  private leastConnections(healthy: Backend[]): Backend {
    let min = healthy[0];
    for (let i = 1; i < healthy.length; i++) {
      if (healthy[i].connections < min.connections) min = healthy[i];
    }
    return min;
  }

  private weightedLeastConnections(healthy: Backend[]): Backend {
    let best = healthy[0];
    let bestScore = best.connections / best.weight;
    for (let i = 1; i < healthy.length; i++) {
      const score = healthy[i].connections / healthy[i].weight;
      if (score < bestScore) {
        bestScore = score;
        best = healthy[i];
      }
    }
    return best;
  }

  private ipHash(healthy: Backend[], ip: string): Backend {
    let hash = 0;
    for (let i = 0; i < ip.length; i++) {
      hash = (hash * 31 + ip.charCodeAt(i)) | 0;
    }
    return healthy[Math.abs(hash) % healthy.length];
  }

  private gcd(a: number, b: number): number {
    while (b) {
      [a, b] = [b, a % b];
    }
    return a;
  }

  getBackend(id: string): Backend | null {
    const b = this.backends.find((b) => b.id === id);
    return b ? { ...b } : null;
  }

  get healthyCount(): number {
    return this.backends.filter((b) => b.healthy).length;
  }

  get totalCount(): number {
    return this.backends.length;
  }

  list(): Backend[] {
    return this.backends.map((b) => ({ ...b }));
  }

  setAlgorithm(alg: Algorithm): void {
    this.algorithm = alg;
    this.rrIndex = 0;
    this.wrrIndex = 0;
    this.wrrCurrent = 0;
  }

  get currentAlgorithm(): Algorithm {
    return this.algorithm;
  }
}
