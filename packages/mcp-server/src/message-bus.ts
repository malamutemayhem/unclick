export type Handler<T = unknown> = (message: T, topic: string) => void;

export interface Subscription {
  topic: string;
  unsubscribe: () => void;
}

export class MessageBus {
  private handlers = new Map<string, Set<Handler>>();
  private wildcardHandlers = new Set<Handler>();
  private history: Array<{ topic: string; message: unknown; timestamp: number }> = [];
  private maxHistory: number;

  constructor(maxHistory = 100) {
    this.maxHistory = maxHistory;
  }

  subscribe<T = unknown>(topic: string, handler: Handler<T>): Subscription {
    if (!this.handlers.has(topic)) {
      this.handlers.set(topic, new Set());
    }
    this.handlers.get(topic)!.add(handler as Handler);
    return {
      topic,
      unsubscribe: () => {
        this.handlers.get(topic)?.delete(handler as Handler);
      },
    };
  }

  subscribeAll(handler: Handler): Subscription {
    this.wildcardHandlers.add(handler);
    return {
      topic: "*",
      unsubscribe: () => { this.wildcardHandlers.delete(handler); },
    };
  }

  publish<T = unknown>(topic: string, message: T): void {
    this.history.push({ topic, message, timestamp: Date.now() });
    if (this.history.length > this.maxHistory) {
      this.history.shift();
    }

    const topicHandlers = this.handlers.get(topic);
    if (topicHandlers) {
      for (const h of topicHandlers) h(message, topic);
    }
    for (const h of this.wildcardHandlers) h(message, topic);
  }

  once<T = unknown>(topic: string, handler: Handler<T>): Subscription {
    const sub = this.subscribe<T>(topic, (msg, t) => {
      sub.unsubscribe();
      handler(msg, t);
    });
    return sub;
  }

  getHistory(topic?: string): Array<{ topic: string; message: unknown; timestamp: number }> {
    if (topic) return this.history.filter((h) => h.topic === topic);
    return [...this.history];
  }

  topics(): string[] {
    return [...this.handlers.keys()];
  }

  subscriberCount(topic: string): number {
    return (this.handlers.get(topic)?.size ?? 0) + this.wildcardHandlers.size;
  }

  clear(): void {
    this.handlers.clear();
    this.wildcardHandlers.clear();
    this.history = [];
  }

  clearHistory(): void {
    this.history = [];
  }
}
