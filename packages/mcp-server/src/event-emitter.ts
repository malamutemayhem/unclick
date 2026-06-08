type Handler = (...args: unknown[]) => void;

export class EventEmitter {
  private handlers = new Map<string, Set<Handler>>();
  private onceHandlers = new Map<string, Set<Handler>>();

  on(event: string, handler: Handler): () => void {
    if (!this.handlers.has(event)) this.handlers.set(event, new Set());
    this.handlers.get(event)!.add(handler);
    return () => this.off(event, handler);
  }

  once(event: string, handler: Handler): () => void {
    if (!this.onceHandlers.has(event)) this.onceHandlers.set(event, new Set());
    this.onceHandlers.get(event)!.add(handler);
    return () => this.onceHandlers.get(event)?.delete(handler);
  }

  off(event: string, handler: Handler): void {
    this.handlers.get(event)?.delete(handler);
    this.onceHandlers.get(event)?.delete(handler);
  }

  emit(event: string, ...args: unknown[]): void {
    const regular = this.handlers.get(event);
    if (regular) {
      for (const h of regular) h(...args);
    }
    const once = this.onceHandlers.get(event);
    if (once) {
      for (const h of once) h(...args);
      once.clear();
    }
  }

  removeAllListeners(event?: string): void {
    if (event) {
      this.handlers.delete(event);
      this.onceHandlers.delete(event);
    } else {
      this.handlers.clear();
      this.onceHandlers.clear();
    }
  }

  listenerCount(event: string): number {
    return (this.handlers.get(event)?.size || 0) + (this.onceHandlers.get(event)?.size || 0);
  }

  eventNames(): string[] {
    const names = new Set<string>();
    for (const key of this.handlers.keys()) names.add(key);
    for (const key of this.onceHandlers.keys()) {
      if (this.onceHandlers.get(key)!.size > 0) names.add(key);
    }
    return [...names];
  }
}
