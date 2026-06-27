export type HookCallback<T = unknown> = (context: T) => T | void | Promise<T | void>;

export interface HookRegistration {
  id: number;
  name: string;
  priority: number;
  once: boolean;
}

export class HookSystem<Events extends Record<string, unknown> = Record<string, unknown>> {
  private hooks = new Map<string, { callback: HookCallback<any>; priority: number; id: number; once: boolean }[]>();
  private nextId = 0;

  tap<K extends keyof Events & string>(
    name: K,
    callback: HookCallback<Events[K]>,
    options: { priority?: number; once?: boolean } = {}
  ): HookRegistration {
    const id = this.nextId++;
    const entry = {
      callback,
      priority: options.priority ?? 0,
      id,
      once: options.once ?? false,
    };
    if (!this.hooks.has(name)) this.hooks.set(name, []);
    const hooks = this.hooks.get(name)!;
    hooks.push(entry);
    hooks.sort((a, b) => b.priority - a.priority);
    return { id, name, priority: entry.priority, once: entry.once };
  }

  tapOnce<K extends keyof Events & string>(
    name: K,
    callback: HookCallback<Events[K]>,
    priority = 0
  ): HookRegistration {
    return this.tap(name, callback, { priority, once: true });
  }

  untap(id: number): boolean {
    for (const [, hooks] of this.hooks) {
      const idx = hooks.findIndex((h) => h.id === id);
      if (idx !== -1) {
        hooks.splice(idx, 1);
        return true;
      }
    }
    return false;
  }

  call<K extends keyof Events & string>(name: K, context: Events[K]): Events[K] {
    const hooks = this.hooks.get(name);
    if (!hooks || hooks.length === 0) return context;
    let result = context;
    const toRemove: number[] = [];
    for (const hook of hooks) {
      const returned = hook.callback(result);
      if (returned !== undefined && returned !== null && !(returned instanceof Promise)) {
        result = returned as Events[K];
      }
      if (hook.once) toRemove.push(hook.id);
    }
    for (const id of toRemove) {
      const idx = hooks.findIndex((h) => h.id === id);
      if (idx !== -1) hooks.splice(idx, 1);
    }
    return result;
  }

  async callAsync<K extends keyof Events & string>(name: K, context: Events[K]): Promise<Events[K]> {
    const hooks = this.hooks.get(name);
    if (!hooks || hooks.length === 0) return context;
    let result = context;
    const toRemove: number[] = [];
    for (const hook of hooks) {
      const returned = await hook.callback(result);
      if (returned !== undefined && returned !== null) {
        result = returned as Events[K];
      }
      if (hook.once) toRemove.push(hook.id);
    }
    for (const id of toRemove) {
      const idx = hooks.findIndex((h) => h.id === id);
      if (idx !== -1) hooks.splice(idx, 1);
    }
    return result;
  }

  callBail<K extends keyof Events & string>(name: K, context: Events[K]): Events[K] | null {
    const hooks = this.hooks.get(name);
    if (!hooks) return null;
    for (const hook of hooks) {
      const returned = hook.callback(context);
      if (returned !== undefined && returned !== null && !(returned instanceof Promise)) {
        return returned as Events[K];
      }
    }
    return null;
  }

  hasHooks(name: string): boolean {
    const hooks = this.hooks.get(name);
    return !!hooks && hooks.length > 0;
  }

  hookCount(name: string): number {
    return this.hooks.get(name)?.length ?? 0;
  }

  names(): string[] {
    return [...this.hooks.keys()].filter((k) => this.hooks.get(k)!.length > 0);
  }

  clear(name?: string): void {
    if (name) {
      this.hooks.delete(name);
    } else {
      this.hooks.clear();
    }
  }
}

export function createHookSystem<Events extends Record<string, unknown>>(): HookSystem<Events> {
  return new HookSystem<Events>();
}
