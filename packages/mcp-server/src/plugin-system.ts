export interface Plugin {
  name: string;
  version?: string;
  dependencies?: string[];
  initialize?: (context: PluginContext) => void;
  destroy?: () => void;
}

export interface PluginContext {
  getPlugin(name: string): Plugin | undefined;
  hasPlugin(name: string): boolean;
  emit(event: string, data?: unknown): void;
  on(event: string, handler: (data?: unknown) => void): void;
}

export class PluginManager implements PluginContext {
  private plugins: Map<string, Plugin> = new Map();
  private loadOrder: string[] = [];
  private listeners: Map<string, ((data?: unknown) => void)[]> = new Map();

  register(plugin: Plugin): void {
    if (this.plugins.has(plugin.name)) {
      throw new Error(`Plugin "${plugin.name}" already registered`);
    }
    this.plugins.set(plugin.name, plugin);
  }

  initialize(): void {
    const resolved = this.resolveDependencies();
    for (const name of resolved) {
      const plugin = this.plugins.get(name)!;
      plugin.initialize?.(this);
      this.loadOrder.push(name);
    }
  }

  private resolveDependencies(): string[] {
    const visited = new Set<string>();
    const order: string[] = [];

    const visit = (name: string, path: Set<string>) => {
      if (visited.has(name)) return;
      if (path.has(name)) {
        throw new Error(`Circular dependency detected: ${name}`);
      }
      const plugin = this.plugins.get(name);
      if (!plugin) throw new Error(`Missing plugin: ${name}`);

      path.add(name);
      for (const dep of plugin.dependencies ?? []) {
        visit(dep, path);
      }
      path.delete(name);
      visited.add(name);
      order.push(name);
    };

    for (const name of this.plugins.keys()) {
      visit(name, new Set());
    }

    return order;
  }

  destroy(): void {
    for (let i = this.loadOrder.length - 1; i >= 0; i--) {
      this.plugins.get(this.loadOrder[i])?.destroy?.();
    }
    this.loadOrder = [];
    this.listeners.clear();
  }

  getPlugin(name: string): Plugin | undefined {
    return this.plugins.get(name);
  }

  hasPlugin(name: string): boolean {
    return this.plugins.has(name);
  }

  emit(event: string, data?: unknown): void {
    const handlers = this.listeners.get(event);
    if (handlers) {
      for (const handler of handlers) {
        handler(data);
      }
    }
  }

  on(event: string, handler: (data?: unknown) => void): void {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }
    this.listeners.get(event)!.push(handler);
  }

  listPlugins(): string[] {
    return Array.from(this.plugins.keys());
  }

  isInitialized(name: string): boolean {
    return this.loadOrder.includes(name);
  }
}
