type Handler<T = unknown> = (data: T) => void;

export class PubSub<Topics extends Record<string, unknown> = Record<string, unknown>> {
  private subscribers = new Map<string, Set<Handler<any>>>();
  private history = new Map<string, unknown[]>();
  private maxHistory: number;

  constructor(options?: { maxHistory?: number }) {
    this.maxHistory = options?.maxHistory || 0;
  }

  publish<K extends keyof Topics & string>(topic: K, data: Topics[K]): void {
    if (this.maxHistory > 0) {
      if (!this.history.has(topic)) this.history.set(topic, []);
      const h = this.history.get(topic)!;
      h.push(data);
      if (h.length > this.maxHistory) h.shift();
    }
    const subs = this.subscribers.get(topic);
    if (subs) for (const handler of subs) handler(data);
  }

  subscribe<K extends keyof Topics & string>(topic: K, handler: Handler<Topics[K]>): () => void {
    if (!this.subscribers.has(topic)) this.subscribers.set(topic, new Set());
    this.subscribers.get(topic)!.add(handler);
    return () => this.unsubscribe(topic, handler);
  }

  unsubscribe<K extends keyof Topics & string>(topic: K, handler: Handler<Topics[K]>): void {
    this.subscribers.get(topic)?.delete(handler);
  }

  once<K extends keyof Topics & string>(topic: K, handler: Handler<Topics[K]>): () => void {
    const wrapper = ((data: Topics[K]) => {
      handler(data);
      this.unsubscribe(topic, wrapper as Handler<Topics[K]>);
    }) as Handler<Topics[K]>;
    return this.subscribe(topic, wrapper);
  }

  getHistory<K extends keyof Topics & string>(topic: K): Topics[K][] {
    return (this.history.get(topic) || []) as Topics[K][];
  }

  clearHistory(topic?: string): void {
    if (topic) this.history.delete(topic);
    else this.history.clear();
  }

  subscriberCount(topic?: string): number {
    if (topic) return this.subscribers.get(topic)?.size || 0;
    let total = 0;
    for (const subs of this.subscribers.values()) total += subs.size;
    return total;
  }

  topics(): string[] {
    return [...this.subscribers.keys()];
  }

  clear(): void {
    this.subscribers.clear();
    this.history.clear();
  }
}
