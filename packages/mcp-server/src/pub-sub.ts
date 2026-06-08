type Handler<T = unknown> = (data: T) => void;

export class PubSub {
  private topics = new Map<string, Set<Handler>>();

  subscribe<T = unknown>(topic: string, handler: Handler<T>): () => void {
    if (!this.topics.has(topic)) this.topics.set(topic, new Set());
    this.topics.get(topic)!.add(handler as Handler);
    return () => this.unsubscribe(topic, handler);
  }

  unsubscribe<T = unknown>(topic: string, handler: Handler<T>): void {
    this.topics.get(topic)?.delete(handler as Handler);
  }

  publish<T = unknown>(topic: string, data: T): number {
    const handlers = this.topics.get(topic);
    if (!handlers) return 0;
    let count = 0;
    for (const fn of handlers) {
      try { fn(data); count++; } catch {}
    }
    return count;
  }

  publishToAll<T = unknown>(data: T): number {
    let total = 0;
    for (const handlers of this.topics.values()) {
      for (const fn of handlers) {
        try { fn(data); total++; } catch {}
      }
    }
    return total;
  }

  listTopics(): string[] {
    return [...this.topics.keys()];
  }

  subscriberCount(topic: string): number {
    return this.topics.get(topic)?.size ?? 0;
  }

  clear(topic?: string): void {
    if (topic) {
      this.topics.delete(topic);
    } else {
      this.topics.clear();
    }
  }
}
