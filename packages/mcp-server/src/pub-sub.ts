type Handler<T> = (data: T) => void;

export class PubSub<Events extends Record<string, any>> {
  private handlers = new Map<keyof Events, Set<Handler<any>>>();

  on<K extends keyof Events>(event: K, handler: Handler<Events[K]>): () => void {
    let set = this.handlers.get(event);
    if (!set) {
      set = new Set();
      this.handlers.set(event, set);
    }
    set.add(handler);
    return () => set!.delete(handler);
  }

  once<K extends keyof Events>(event: K, handler: Handler<Events[K]>): () => void {
    const wrapper: Handler<Events[K]> = (data) => {
      off();
      handler(data);
    };
    const off = this.on(event, wrapper);
    return off;
  }

  emit<K extends keyof Events>(event: K, data: Events[K]): void {
    const set = this.handlers.get(event);
    if (!set) return;
    for (const handler of set) handler(data);
  }

  off<K extends keyof Events>(event: K): void {
    this.handlers.delete(event);
  }

  offAll(): void {
    this.handlers.clear();
  }

  listenerCount<K extends keyof Events>(event: K): number {
    return this.handlers.get(event)?.size ?? 0;
  }
}
