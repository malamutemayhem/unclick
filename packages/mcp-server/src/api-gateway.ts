export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

export interface RouteConfig {
  method: HttpMethod;
  path: string;
  service: string;
  rateLimit?: number;
  auth?: boolean;
  transform?: (req: GatewayRequest) => GatewayRequest;
}

export interface GatewayRequest {
  method: HttpMethod;
  path: string;
  headers: Record<string, string>;
  body?: unknown;
  params: Record<string, string>;
}

export interface GatewayResponse {
  status: number;
  body: unknown;
  headers: Record<string, string>;
  service: string;
  latency: number;
}

export type Middleware = (req: GatewayRequest, next: () => GatewayResponse) => GatewayResponse;

export class APIGateway {
  private routes: RouteConfig[] = [];
  private middlewares: Middleware[] = [];
  private requestCounts = new Map<string, number[]>();
  private clock = 0;
  private totalRequests = 0;

  addRoute(config: RouteConfig): void {
    this.routes.push(config);
  }

  use(middleware: Middleware): void {
    this.middlewares.push(middleware);
  }

  handle(req: GatewayRequest): GatewayResponse {
    this.totalRequests++;
    const now = this.clock++;

    const route = this.matchRoute(req.method, req.path);
    if (!route) {
      return { status: 404, body: { error: "Not Found" }, headers: {}, service: "", latency: 0 };
    }

    if (route.rateLimit) {
      const key = `${req.headers["x-client-id"] ?? "anon"}:${route.path}`;
      const times = this.requestCounts.get(key) ?? [];
      const recent = times.filter((t) => now - t < 60);
      if (recent.length >= route.rateLimit) {
        return { status: 429, body: { error: "Rate limit exceeded" }, headers: {}, service: route.service, latency: 0 };
      }
      recent.push(now);
      this.requestCounts.set(key, recent);
    }

    if (route.auth && !req.headers["authorization"]) {
      return { status: 401, body: { error: "Unauthorized" }, headers: {}, service: route.service, latency: 0 };
    }

    let processedReq = { ...req, params: this.extractParams(route.path, req.path) };
    if (route.transform) {
      processedReq = route.transform(processedReq);
    }

    const baseHandler = (): GatewayResponse => ({
      status: 200,
      body: { service: route.service, path: processedReq.path, params: processedReq.params },
      headers: { "x-service": route.service },
      service: route.service,
      latency: 1,
    });

    let handler = baseHandler;
    for (let i = this.middlewares.length - 1; i >= 0; i--) {
      const mw = this.middlewares[i];
      const next = handler;
      handler = () => mw(processedReq, next);
    }

    return handler();
  }

  private matchRoute(method: HttpMethod, path: string): RouteConfig | null {
    for (const route of this.routes) {
      if (route.method !== method) continue;
      if (this.pathMatches(route.path, path)) return route;
    }
    return null;
  }

  private pathMatches(pattern: string, path: string): boolean {
    const patParts = pattern.split("/").filter(Boolean);
    const pathParts = path.split("/").filter(Boolean);
    if (patParts.length !== pathParts.length) return false;
    return patParts.every((p, i) => p.startsWith(":") || p === pathParts[i]);
  }

  private extractParams(pattern: string, path: string): Record<string, string> {
    const params: Record<string, string> = {};
    const patParts = pattern.split("/").filter(Boolean);
    const pathParts = path.split("/").filter(Boolean);
    for (let i = 0; i < patParts.length; i++) {
      if (patParts[i].startsWith(":")) {
        params[patParts[i].slice(1)] = pathParts[i];
      }
    }
    return params;
  }

  routeCount(): number {
    return this.routes.length;
  }

  getRequestCount(): number {
    return this.totalRequests;
  }

  listRoutes(): Array<{ method: HttpMethod; path: string; service: string }> {
    return this.routes.map((r) => ({ method: r.method, path: r.path, service: r.service }));
  }
}
