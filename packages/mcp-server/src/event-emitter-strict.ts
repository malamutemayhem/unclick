type Listener<T> = (data: T) => void;

export class StrictEmitter<Events extends Record<string, unknown>> {
  private listeners = new Map<keyof Events, Set<Listener<unknown>>>();

  on<K extends keyof Events>(event: K, listener: Listener<Events[K]>): () => void {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }
    this.listeners.get(event)!.add(listener as Listener<unknown>);
    return () => this.off(event, listener);
  }

  once<K extends keyof Events>(event: K, listener: Listener<Events[K]>): () => void {
    const wrapper: Listener<Events[K]> = (data) => {
      this.off(event, wrapper);
      listener(data);
    };
    return this.on(event, wrapper);
  }

  off<K extends keyof Events>(event: K, listener: Listener<Events[K]>): void {
    this.listeners.get(event)?.delete(listener as Listener<unknown>);
  }

  emit<K extends keyof Events>(event: K, data: Events[K]): void {
    const set = this.listeners.get(event);
    if (!set) return;
    for (const listener of set) {
      listener(data);
    }
  }

  removeAllListeners<K extends keyof Events>(event?: K): void {
    if (event) {
      this.listeners.delete(event);
    } else {
      this.listeners.clear();
    }
  }

  listenerCount<K extends keyof Events>(event: K): number {
    return this.listeners.get(event)?.size ?? 0;
  }

  eventNames(): Array<keyof Events> {
    return [...this.listeners.keys()].filter((k) => (this.listeners.get(k)?.size ?? 0) > 0);
  }

  waitFor<K extends keyof Events>(event: K): Promise<Events[K]> {
    return new Promise<Events[K]>((resolve) => {
      this.once(event, resolve);
    });
  }
}
