export type Subscriber<T> = (message: T, topic: string) => void;

export interface Subscription {
  id: string;
  topic: string;
  pattern: boolean;
}

export class PubSubBroker<T = unknown> {
  private subscribers = new Map<string, Map<string, Subscriber<T>>>();
  private patterns = new Map<string, Map<string, Subscriber<T>>>();
  private history: Array<{ topic: string; message: T; timestamp: number }> = [];
  private nextId = 1;
  private maxHistory: number;
  private clock = 0;

  constructor(maxHistory = 100) {
    this.maxHistory = maxHistory;
  }

  subscribe(topic: string, handler: Subscriber<T>): string {
    const id = `sub_${this.nextId++}`;
    const subs = this.subscribers.get(topic) ?? new Map();
    subs.set(id, handler);
    this.subscribers.set(topic, subs);
    return id;
  }

  subscribePattern(pattern: string, handler: Subscriber<T>): string {
    const id = `sub_${this.nextId++}`;
    const subs = this.patterns.get(pattern) ?? new Map();
    subs.set(id, handler);
    this.patterns.set(pattern, subs);
    return id;
  }

  unsubscribe(id: string): boolean {
    for (const [, subs] of this.subscribers) {
      if (subs.delete(id)) return true;
    }
    for (const [, subs] of this.patterns) {
      if (subs.delete(id)) return true;
    }
    return false;
  }

  publish(topic: string, message: T): number {
    let delivered = 0;

    const subs = this.subscribers.get(topic);
    if (subs) {
      for (const handler of subs.values()) {
        handler(message, topic);
        delivered++;
      }
    }

    for (const [pattern, patSubs] of this.patterns) {
      if (this.matchPattern(pattern, topic)) {
        for (const handler of patSubs.values()) {
          handler(message, topic);
          delivered++;
        }
      }
    }

    this.history.push({ topic, message, timestamp: this.clock++ });
    if (this.history.length > this.maxHistory) {
      this.history.shift();
    }

    return delivered;
  }

  getHistory(topic?: string): Array<{ topic: string; message: T; timestamp: number }> {
    if (!topic) return [...this.history];
    return this.history.filter((h) => h.topic === topic);
  }

  topics(): string[] {
    return [...this.subscribers.keys()].sort();
  }

  subscriberCount(topic: string): number {
    let count = 0;
    const subs = this.subscribers.get(topic);
    if (subs) count += subs.size;
    for (const [pattern, patSubs] of this.patterns) {
      if (this.matchPattern(pattern, topic)) count += patSubs.size;
    }
    return count;
  }

  totalSubscribers(): number {
    let count = 0;
    for (const subs of this.subscribers.values()) count += subs.size;
    for (const subs of this.patterns.values()) count += subs.size;
    return count;
  }

  private matchPattern(pattern: string, topic: string): boolean {
    if (pattern === "#") return true;
    const patParts = pattern.split(".");
    const topicParts = topic.split(".");

    let pi = 0;
    let ti = 0;
    while (pi < patParts.length && ti < topicParts.length) {
      if (patParts[pi] === "#") return true;
      if (patParts[pi] === "*" || patParts[pi] === topicParts[ti]) {
        pi++;
        ti++;
      } else {
        return false;
      }
    }
    return pi === patParts.length && ti === topicParts.length;
  }
}
