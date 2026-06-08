type Listener<T = unknown> = (data: T) => void;

interface ListenerEntry<T = unknown> {
  fn: Listener<T>;
  once: boolean;
}

export class EventEmitter<Events extends Record<string, unknown> = Record<string, unknown>> {
  private listeners = new Map<string, ListenerEntry[]>();
  private maxListeners = 10;

  on<K extends keyof Events & string>(event: K, fn: Listener<Events[K]>): this {
    return this.addListener(event, fn as Listener, false);
  }

  once<K extends keyof Events & string>(event: K, fn: Listener<Events[K]>): this {
    return this.addListener(event, fn as Listener, true);
  }

  off<K extends keyof Events & string>(event: K, fn: Listener<Events[K]>): this {
    const list = this.listeners.get(event);
    if (list) {
      this.listeners.set(event, list.filter((e) => e.fn !== fn));
    }
    return this;
  }

  emit<K extends keyof Events & string>(event: K, data: Events[K]): boolean {
    const list = this.listeners.get(event);
    if (!list || list.length === 0) return false;
    const toRemove: Listener[] = [];
    for (const entry of list) {
      entry.fn(data);
      if (entry.once) toRemove.push(entry.fn);
    }
    if (toRemove.length > 0) {
      this.listeners.set(event, list.filter((e) => !toRemove.includes(e.fn)));
    }
    return true;
  }

  removeAllListeners(event?: string): this {
    if (event) {
      this.listeners.delete(event);
    } else {
      this.listeners.clear();
    }
    return this;
  }

  listenerCount(event: string): number {
    return this.listeners.get(event)?.length ?? 0;
  }

  eventNames(): string[] {
    return [...this.listeners.keys()].filter((k) => (this.listeners.get(k)?.length ?? 0) > 0);
  }

  setMaxListeners(n: number): this {
    this.maxListeners = n;
    return this;
  }

  private addListener(event: string, fn: Listener, once: boolean): this {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }
    const list = this.listeners.get(event)!;
    if (list.length >= this.maxListeners) {
      console.warn(`MaxListenersExceeded: ${event} has ${list.length + 1} listeners`);
    }
    list.push({ fn, once });
    return this;
  }
}
