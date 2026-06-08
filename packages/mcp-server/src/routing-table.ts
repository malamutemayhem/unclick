export interface Route<C = unknown> {
  name: string;
  condition: (context: C) => boolean;
  priority?: number;
}

export interface RouteMatch<C = unknown> {
  route: Route<C>;
  matched: boolean;
}

export class RoutingTable<C = unknown> {
  private routes: Route<C>[] = [];
  private defaultRoute: string | null = null;

  add(route: Route<C>): this {
    this.routes.push(route);
    this.routes.sort((a, b) => (b.priority ?? 0) - (a.priority ?? 0));
    return this;
  }

  remove(name: string): boolean {
    const idx = this.routes.findIndex((r) => r.name === name);
    if (idx === -1) return false;
    this.routes.splice(idx, 1);
    return true;
  }

  setDefault(name: string): this {
    this.defaultRoute = name;
    return this;
  }

  resolve(context: C): string | null {
    for (const route of this.routes) {
      if (route.condition(context)) return route.name;
    }
    return this.defaultRoute;
  }

  resolveAll(context: C): string[] {
    const matched: string[] = [];
    for (const route of this.routes) {
      if (route.condition(context)) matched.push(route.name);
    }
    if (matched.length === 0 && this.defaultRoute) return [this.defaultRoute];
    return matched;
  }

  evaluate(context: C): RouteMatch<C>[] {
    return this.routes.map((route) => ({
      route,
      matched: route.condition(context),
    }));
  }

  get size(): number {
    return this.routes.length;
  }

  has(name: string): boolean {
    return this.routes.some((r) => r.name === name);
  }

  names(): string[] {
    return this.routes.map((r) => r.name);
  }

  clear(): void {
    this.routes = [];
    this.defaultRoute = null;
  }
}

export function createRouter<C = unknown>(
  routes: Array<{ name: string; condition: (context: C) => boolean; priority?: number }>,
  defaultRoute?: string,
): RoutingTable<C> {
  const table = new RoutingTable<C>();
  for (const r of routes) table.add(r);
  if (defaultRoute) table.setDefault(defaultRoute);
  return table;
}
