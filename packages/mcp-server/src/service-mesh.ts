export type ServiceStatus = "healthy" | "degraded" | "down";
export type LoadBalanceStrategy = "round-robin" | "least-connections" | "random";

export interface ServiceInstance {
  id: string;
  service: string;
  host: string;
  port: number;
  status: ServiceStatus;
  connections: number;
  weight: number;
  metadata: Record<string, string>;
}

export interface Route {
  source: string;
  destination: string;
  weight: number;
  retries: number;
  timeout: number;
}

export class ServiceMesh {
  private instances = new Map<string, ServiceInstance[]>();
  private routes: Route[] = [];
  private rrCounters = new Map<string, number>();
  private circuitBreakers = new Map<string, { failures: number; open: boolean; lastFailure: number }>();
  private cbThreshold: number;

  constructor(circuitBreakerThreshold = 5) {
    this.cbThreshold = circuitBreakerThreshold;
  }

  register(service: string, id: string, host: string, port: number, weight = 1): void {
    const instances = this.instances.get(service) ?? [];
    instances.push({ id, service, host, port, status: "healthy", connections: 0, weight, metadata: {} });
    this.instances.set(service, instances);
  }

  deregister(service: string, id: string): boolean {
    const instances = this.instances.get(service);
    if (!instances) return false;
    const idx = instances.findIndex((i) => i.id === id);
    if (idx === -1) return false;
    instances.splice(idx, 1);
    return true;
  }

  resolve(service: string, strategy: LoadBalanceStrategy = "round-robin"): ServiceInstance | null {
    const instances = (this.instances.get(service) ?? []).filter((i) => i.status !== "down");
    if (instances.length === 0) return null;

    switch (strategy) {
      case "round-robin": {
        const counter = (this.rrCounters.get(service) ?? 0) % instances.length;
        this.rrCounters.set(service, counter + 1);
        return instances[counter];
      }
      case "least-connections":
        return instances.sort((a, b) => a.connections - b.connections)[0];
      case "random":
        return instances[Math.floor(Math.random() * instances.length)];
    }
  }

  addRoute(source: string, destination: string, weight = 100, retries = 3, timeout = 30): void {
    this.routes.push({ source, destination, weight, retries, timeout });
  }

  getRoutes(source: string): Route[] {
    return this.routes.filter((r) => r.source === source);
  }

  setStatus(service: string, id: string, status: ServiceStatus): boolean {
    const instance = this.findInstance(service, id);
    if (!instance) return false;
    instance.status = status;
    return true;
  }

  recordFailure(service: string): void {
    const cb = this.circuitBreakers.get(service) ?? { failures: 0, open: false, lastFailure: 0 };
    cb.failures++;
    cb.lastFailure = Date.now();
    if (cb.failures >= this.cbThreshold) cb.open = true;
    this.circuitBreakers.set(service, cb);
  }

  recordSuccess(service: string): void {
    this.circuitBreakers.set(service, { failures: 0, open: false, lastFailure: 0 });
  }

  isCircuitOpen(service: string): boolean {
    return this.circuitBreakers.get(service)?.open ?? false;
  }

  healthCheck(): Map<string, { total: number; healthy: number; degraded: number; down: number }> {
    const result = new Map<string, { total: number; healthy: number; degraded: number; down: number }>();
    for (const [service, instances] of this.instances) {
      const stats = { total: instances.length, healthy: 0, degraded: 0, down: 0 };
      for (const inst of instances) {
        stats[inst.status]++;
      }
      result.set(service, stats);
    }
    return result;
  }

  serviceCount(): number {
    return this.instances.size;
  }

  instanceCount(service: string): number {
    return this.instances.get(service)?.length ?? 0;
  }

  private findInstance(service: string, id: string): ServiceInstance | undefined {
    return this.instances.get(service)?.find((i) => i.id === id);
  }
}
