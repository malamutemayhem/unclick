export type Subscriber<T> = (message: T, topic: string) => void;

export class PubSub<T = unknown> {
  private subscribers = new Map<string, Set<Subscriber<T>>>();
  private history = new Map<string, T[]>();
  private retainCount: number;

  constructor(retainCount = 0) {
    this.retainCount = retainCount;
  }

  subscribe(topic: string, subscriber: Subscriber<T>): () => void {
    if (!this.subscribers.has(topic)) this.subscribers.set(topic, new Set());
    this.subscribers.get(topic)!.add(subscriber);
    if (this.retainCount > 0) {
      const retained = this.history.get(topic) ?? [];
      for (const msg of retained) subscriber(msg, topic);
    }
    return () => this.unsubscribe(topic, subscriber);
  }

  unsubscribe(topic: string, subscriber: Subscriber<T>): boolean {
    return this.subscribers.get(topic)?.delete(subscriber) ?? false;
  }

  publish(topic: string, message: T): number {
    if (this.retainCount > 0) {
      if (!this.history.has(topic)) this.history.set(topic, []);
      const hist = this.history.get(topic)!;
      hist.push(message);
      if (hist.length > this.retainCount) hist.shift();
    }
    const subs = this.subscribers.get(topic);
    if (!subs) return 0;
    for (const sub of subs) sub(message, topic);
    return subs.size;
  }

  subscriberCount(topic: string): number {
    return this.subscribers.get(topic)?.size ?? 0;
  }

  get topics(): string[] {
    return [...this.subscribers.keys()];
  }

  clear(): void {
    this.subscribers.clear();
    this.history.clear();
  }
}
