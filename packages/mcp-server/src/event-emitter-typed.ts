type Listener<T> = (data: T) => void;

export class TypedEventEmitter<Events extends { [K: string]: unknown }> {
  private listeners = new Map<keyof Events, Set<Listener<unknown>>>();
  private onceListeners = new Map<keyof Events, Set<Listener<unknown>>>();
  private maxListeners = 10;

  on<K extends keyof Events>(event: K, listener: Listener<Events[K]>): this {
    if (!this.listeners.has(event)) this.listeners.set(event, new Set());
    this.listeners.get(event)!.add(listener as Listener<unknown>);
    return this;
  }

  once<K extends keyof Events>(event: K, listener: Listener<Events[K]>): this {
    if (!this.onceListeners.has(event)) this.onceListeners.set(event, new Set());
    this.onceListeners.get(event)!.add(listener as Listener<unknown>);
    return this;
  }

  off<K extends keyof Events>(event: K, listener: Listener<Events[K]>): this {
    this.listeners.get(event)?.delete(listener as Listener<unknown>);
    this.onceListeners.get(event)?.delete(listener as Listener<unknown>);
    return this;
  }

  emit<K extends keyof Events>(event: K, data: Events[K]): boolean {
    const regular = this.listeners.get(event);
    const once = this.onceListeners.get(event);
    const hasRegular = regular !== undefined && regular.size > 0;
    const hasOnce = once !== undefined && once.size > 0;
    if (regular) {
      for (const fn of regular) fn(data);
    }
    if (once) {
      for (const fn of once) fn(data);
      once.clear();
    }
    return hasRegular || hasOnce;
  }

  removeAllListeners<K extends keyof Events>(event?: K): this {
    if (event !== undefined) {
      this.listeners.delete(event);
      this.onceListeners.delete(event);
    } else {
      this.listeners.clear();
      this.onceListeners.clear();
    }
    return this;
  }

  listenerCount<K extends keyof Events>(event: K): number {
    const regular = this.listeners.get(event)?.size ?? 0;
    const once = this.onceListeners.get(event)?.size ?? 0;
    return regular + once;
  }

  eventNames(): (keyof Events)[] {
    const names = new Set<keyof Events>();
    for (const k of this.listeners.keys()) names.add(k);
    for (const k of this.onceListeners.keys()) names.add(k);
    return [...names];
  }

  setMaxListeners(n: number): this {
    this.maxListeners = n;
    return this;
  }

  getMaxListeners(): number {
    return this.maxListeners;
  }

  pipe<K extends keyof Events>(
    event: K,
    target: TypedEventEmitter<Events>,
    targetEvent?: K
  ): this {
    this.on(event, ((data: Events[K]) => {
      target.emit(targetEvent ?? event, data);
    }) as Listener<Events[K]>);
    return this;
  }
}
