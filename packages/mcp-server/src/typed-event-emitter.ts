type Listener<T> = (data: T) => void;

export class TypedEventEmitter<Events extends Record<string, unknown>> {
  private listeners = new Map<string, Set<Listener<unknown>>>();
  private onceListeners = new Map<string, Set<Listener<unknown>>>();
  private history: Array<{ event: string; data: unknown; timestamp: number }> = [];
  private maxHistory: number;

  constructor(maxHistory = 100) {
    this.maxHistory = maxHistory;
  }

  on<K extends keyof Events & string>(event: K, listener: Listener<Events[K]>): () => void {
    if (!this.listeners.has(event)) this.listeners.set(event, new Set());
    this.listeners.get(event)!.add(listener as Listener<unknown>);
    return () => this.off(event, listener);
  }

  once<K extends keyof Events & string>(event: K, listener: Listener<Events[K]>): void {
    if (!this.onceListeners.has(event)) this.onceListeners.set(event, new Set());
    this.onceListeners.get(event)!.add(listener as Listener<unknown>);
  }

  off<K extends keyof Events & string>(event: K, listener: Listener<Events[K]>): void {
    this.listeners.get(event)?.delete(listener as Listener<unknown>);
    this.onceListeners.get(event)?.delete(listener as Listener<unknown>);
  }

  emit<K extends keyof Events & string>(event: K, data: Events[K]): number {
    let count = 0;
    const regular = this.listeners.get(event);
    if (regular) {
      for (const listener of regular) {
        listener(data);
        count++;
      }
    }
    const once = this.onceListeners.get(event);
    if (once) {
      for (const listener of once) {
        listener(data);
        count++;
      }
      once.clear();
    }
    this.history.push({ event, data, timestamp: Date.now() });
    if (this.history.length > this.maxHistory) {
      this.history.shift();
    }
    return count;
  }

  listenerCount(event: string): number {
    return (this.listeners.get(event)?.size ?? 0) + (this.onceListeners.get(event)?.size ?? 0);
  }

  eventNames(): string[] {
    const names = new Set<string>();
    for (const key of this.listeners.keys()) names.add(key);
    for (const key of this.onceListeners.keys()) names.add(key);
    return [...names];
  }

  getHistory(): Array<{ event: string; data: unknown; timestamp: number }> {
    return [...this.history];
  }

  clear(): void {
    this.listeners.clear();
    this.onceListeners.clear();
    this.history = [];
  }

  removeAllListeners(event?: string): void {
    if (event) {
      this.listeners.delete(event);
      this.onceListeners.delete(event);
    } else {
      this.listeners.clear();
      this.onceListeners.clear();
    }
  }
}
