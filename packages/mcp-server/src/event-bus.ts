type Handler<T = unknown> = (data: T) => void;
type Unsubscribe = () => void;

export class EventBus {
  private handlers = new Map<string, Set<Handler>>();

  on<T = unknown>(event: string, handler: Handler<T>): Unsubscribe {
    if (!this.handlers.has(event)) this.handlers.set(event, new Set());
    this.handlers.get(event)!.add(handler as Handler);
    return () => { this.handlers.get(event)?.delete(handler as Handler); };
  }

  once<T = unknown>(event: string, handler: Handler<T>): Unsubscribe {
    const unsub = this.on<T>(event, (data: T) => {
      unsub();
      handler(data);
    });
    return unsub;
  }

  emit<T = unknown>(event: string, data: T): void {
    const handlers = this.handlers.get(event);
    if (handlers) {
      for (const handler of [...handlers]) handler(data);
    }
    if (event !== "*") {
      const wildcardHandlers = this.handlers.get("*");
      if (wildcardHandlers) {
        for (const handler of [...wildcardHandlers]) handler({ event, data });
      }
    }
  }

  off(event: string): void {
    this.handlers.delete(event);
  }

  clear(): void {
    this.handlers.clear();
  }

  listenerCount(event: string): number {
    return this.handlers.get(event)?.size ?? 0;
  }

  events(): string[] {
    return [...this.handlers.keys()];
  }
}
