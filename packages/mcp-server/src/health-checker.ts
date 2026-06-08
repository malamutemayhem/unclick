export type HealthStatus = "healthy" | "degraded" | "unhealthy" | "unknown";

export interface HealthCheck {
  name: string;
  status: HealthStatus;
  latencyMs?: number;
  message?: string;
  timestamp: number;
}

export interface HealthReport {
  status: HealthStatus;
  checks: HealthCheck[];
  timestamp: number;
  uptime: number;
}

export class HealthChecker {
  private checks = new Map<string, () => Promise<HealthCheck>>();
  private results = new Map<string, HealthCheck>();
  private startTime = Date.now();

  register(name: string, check: () => Promise<HealthCheck>): void {
    this.checks.set(name, check);
  }

  unregister(name: string): void {
    this.checks.delete(name);
    this.results.delete(name);
  }

  async runAll(): Promise<HealthReport> {
    const promises = [...this.checks.entries()].map(async ([name, check]) => {
      const start = Date.now();
      try {
        const result = await check();
        result.latencyMs = Date.now() - start;
        this.results.set(name, result);
        return result;
      } catch (err) {
        const result: HealthCheck = {
          name,
          status: "unhealthy",
          latencyMs: Date.now() - start,
          message: err instanceof Error ? err.message : String(err),
          timestamp: Date.now(),
        };
        this.results.set(name, result);
        return result;
      }
    });

    const checks = await Promise.all(promises);
    return {
      status: aggregateStatus(checks),
      checks,
      timestamp: Date.now(),
      uptime: Date.now() - this.startTime,
    };
  }

  getLastResult(name: string): HealthCheck | undefined {
    return this.results.get(name);
  }

  get registeredChecks(): string[] {
    return [...this.checks.keys()];
  }
}

function aggregateStatus(checks: HealthCheck[]): HealthStatus {
  if (checks.length === 0) return "unknown";
  if (checks.every((c) => c.status === "healthy")) return "healthy";
  if (checks.some((c) => c.status === "unhealthy")) return "unhealthy";
  return "degraded";
}
