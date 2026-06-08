type Handler<T = unknown> = (data: T) => void;

export class EventEmitter<Events extends Record<string, unknown> = Record<string, unknown>> {
  private handlers = new Map<string, Set<Handler<any>>>();
  private onceHandlers = new Map<string, Set<Handler<any>>>();

  on<K extends keyof Events & string>(event: K, handler: Handler<Events[K]>): () => void {
    if (!this.handlers.has(event)) this.handlers.set(event, new Set());
    this.handlers.get(event)!.add(handler);
    return () => this.off(event, handler);
  }

  once<K extends keyof Events & string>(event: K, handler: Handler<Events[K]>): () => void {
    if (!this.onceHandlers.has(event)) this.onceHandlers.set(event, new Set());
    this.onceHandlers.get(event)!.add(handler);
    return () => this.onceHandlers.get(event)?.delete(handler);
  }

  off<K extends keyof Events & string>(event: K, handler: Handler<Events[K]>): void {
    this.handlers.get(event)?.delete(handler);
    this.onceHandlers.get(event)?.delete(handler);
  }

  emit<K extends keyof Events & string>(event: K, data: Events[K]): void {
    const regular = this.handlers.get(event);
    if (regular) {
      for (const handler of regular) handler(data);
    }
    const once = this.onceHandlers.get(event);
    if (once) {
      for (const handler of once) handler(data);
      once.clear();
    }
  }

  removeAllListeners(event?: keyof Events & string): void {
    if (event) {
      this.handlers.delete(event);
      this.onceHandlers.delete(event);
    } else {
      this.handlers.clear();
      this.onceHandlers.clear();
    }
  }

  listenerCount(event: keyof Events & string): number {
    const regular = this.handlers.get(event)?.size || 0;
    const once = this.onceHandlers.get(event)?.size || 0;
    return regular + once;
  }

  eventNames(): string[] {
    const names = new Set<string>();
    for (const key of this.handlers.keys()) names.add(key);
    for (const key of this.onceHandlers.keys()) names.add(key);
    return [...names];
  }

  waitFor<K extends keyof Events & string>(event: K, timeout?: number): Promise<Events[K]> {
    return new Promise((resolve, reject) => {
      let timer: ReturnType<typeof setTimeout> | undefined;
      const unsub = this.once(event, ((data: Events[K]) => {
        if (timer) clearTimeout(timer);
        resolve(data);
      }) as Handler<Events[K]>);

      if (timeout !== undefined) {
        timer = setTimeout(() => {
          unsub();
          reject(new Error(`Timeout waiting for event "${event}"`));
        }, timeout);
      }
    });
  }
}
