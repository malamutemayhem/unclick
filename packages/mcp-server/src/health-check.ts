export type HealthStatus = "healthy" | "degraded" | "unhealthy" | "unknown";

export interface HealthResult {
  name: string;
  status: HealthStatus;
  message?: string;
  latencyMs?: number;
  lastChecked: number;
}

export interface AggregatedHealth {
  status: HealthStatus;
  checks: HealthResult[];
  timestamp: number;
}

export type HealthCheckFn = () => Promise<{ status: HealthStatus; message?: string }> | { status: HealthStatus; message?: string };

export class HealthChecker {
  private checks = new Map<string, HealthCheckFn>();
  private results = new Map<string, HealthResult>();

  register(name: string, check: HealthCheckFn): void {
    this.checks.set(name, check);
  }

  unregister(name: string): boolean {
    this.results.delete(name);
    return this.checks.delete(name);
  }

  async check(name: string): Promise<HealthResult> {
    const fn = this.checks.get(name);
    if (!fn) throw new Error(`Unknown check: ${name}`);
    const start = Date.now();
    try {
      const result = await fn();
      const entry: HealthResult = {
        name, status: result.status, message: result.message,
        latencyMs: Date.now() - start, lastChecked: Date.now(),
      };
      this.results.set(name, entry);
      return entry;
    } catch (err) {
      const entry: HealthResult = {
        name, status: "unhealthy",
        message: err instanceof Error ? err.message : String(err),
        latencyMs: Date.now() - start, lastChecked: Date.now(),
      };
      this.results.set(name, entry);
      return entry;
    }
  }

  async checkAll(): Promise<AggregatedHealth> {
    const checks: HealthResult[] = [];
    for (const name of this.checks.keys()) {
      checks.push(await this.check(name));
    }
    return {
      status: aggregateStatus(checks),
      checks,
      timestamp: Date.now(),
    };
  }

  getLastResult(name: string): HealthResult | undefined {
    return this.results.get(name);
  }

  get checkCount(): number {
    return this.checks.size;
  }

  names(): string[] {
    return [...this.checks.keys()];
  }

  clear(): void {
    this.checks.clear();
    this.results.clear();
  }
}

function aggregateStatus(checks: HealthResult[]): HealthStatus {
  if (checks.length === 0) return "unknown";
  if (checks.every((c) => c.status === "healthy")) return "healthy";
  if (checks.some((c) => c.status === "unhealthy")) return "unhealthy";
  return "degraded";
}
