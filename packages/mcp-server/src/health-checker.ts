// Upstream service health tracking.
// Records success/failure per endpoint and computes a simple health
// score. Connectors can check if an endpoint is healthy before
// making a call, and dashboards can surface degraded services.

export interface HealthSnapshot {
  endpoint: string;
  healthy: boolean;
  successRate: number;
  totalCalls: number;
  lastSuccess?: number;
  lastFailure?: number;
}

interface EndpointStats {
  successes: number;
  failures: number;
  lastSuccess: number;
  lastFailure: number;
  recentResults: boolean[];
}

export class HealthChecker {
  private stats = new Map<string, EndpointStats>();
  private readonly windowSize: number;
  private readonly healthyThreshold: number;

  constructor(opts: { windowSize?: number; healthyThreshold?: number } = {}) {
    this.windowSize = opts.windowSize ?? 20;
    this.healthyThreshold = opts.healthyThreshold ?? 0.5;
  }

  recordSuccess(endpoint: string): void {
    const s = this.getOrCreate(endpoint);
    s.successes++;
    s.lastSuccess = Date.now();
    s.recentResults.push(true);
    if (s.recentResults.length > this.windowSize) s.recentResults.shift();
  }

  recordFailure(endpoint: string): void {
    const s = this.getOrCreate(endpoint);
    s.failures++;
    s.lastFailure = Date.now();
    s.recentResults.push(false);
    if (s.recentResults.length > this.windowSize) s.recentResults.shift();
  }

  isHealthy(endpoint: string): boolean {
    const s = this.stats.get(endpoint);
    if (!s || s.recentResults.length === 0) return true;
    return this.successRate(s) >= this.healthyThreshold;
  }

  getSnapshot(endpoint: string): HealthSnapshot {
    const s = this.stats.get(endpoint);
    if (!s) {
      return { endpoint, healthy: true, successRate: 1, totalCalls: 0 };
    }
    const rate = this.successRate(s);
    return {
      endpoint,
      healthy: rate >= this.healthyThreshold,
      successRate: rate,
      totalCalls: s.successes + s.failures,
      lastSuccess: s.lastSuccess || undefined,
      lastFailure: s.lastFailure || undefined,
    };
  }

  getAllSnapshots(): HealthSnapshot[] {
    return [...this.stats.keys()].map((ep) => this.getSnapshot(ep));
  }

  getDegraded(): HealthSnapshot[] {
    return this.getAllSnapshots().filter((s) => !s.healthy);
  }

  reset(endpoint?: string): void {
    if (endpoint) {
      this.stats.delete(endpoint);
    } else {
      this.stats.clear();
    }
  }

  private getOrCreate(endpoint: string): EndpointStats {
    let s = this.stats.get(endpoint);
    if (!s) {
      s = { successes: 0, failures: 0, lastSuccess: 0, lastFailure: 0, recentResults: [] };
      this.stats.set(endpoint, s);
    }
    return s;
  }

  private successRate(s: EndpointStats): number {
    if (s.recentResults.length === 0) return 1;
    const wins = s.recentResults.filter(Boolean).length;
    return wins / s.recentResults.length;
  }
}
