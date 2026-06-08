export class EventReplayBuffer<T> {
  private buffer: T[] = [];
  private maxSize: number;
  private subscribers = new Set<(event: T) => void>();

  constructor(maxSize = 100) {
    this.maxSize = maxSize;
  }

  emit(event: T): void {
    this.buffer.push(event);
    if (this.buffer.length > this.maxSize) {
      this.buffer.shift();
    }
    for (const fn of this.subscribers) {
      try { fn(event); } catch {}
    }
  }

  subscribe(fn: (event: T) => void, replay = true): () => void {
    if (replay) {
      for (const event of this.buffer) {
        try { fn(event); } catch {}
      }
    }
    this.subscribers.add(fn);
    return () => { this.subscribers.delete(fn); };
  }

  getHistory(): readonly T[] {
    return [...this.buffer];
  }

  clear(): void {
    this.buffer = [];
  }

  get size(): number {
    return this.buffer.length;
  }

  get subscriberCount(): number {
    return this.subscribers.size;
  }
}
