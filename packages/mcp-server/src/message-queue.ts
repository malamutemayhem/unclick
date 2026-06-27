export interface QueueMessage<T> {
  id: string;
  body: T;
  enqueued: number;
  attempts: number;
  visibleAfter: number;
}

export class MessageQueue<T> {
  private messages: QueueMessage<T>[] = [];
  private dlq: QueueMessage<T>[] = [];
  private nextId = 1;
  private clock = 0;
  private maxRetries: number;
  private visibilityTimeout: number;
  private processed = 0;

  constructor(maxRetries = 3, visibilityTimeout = 30) {
    this.maxRetries = maxRetries;
    this.visibilityTimeout = visibilityTimeout;
  }

  enqueue(body: T): string {
    const id = `msg_${this.nextId++}`;
    this.messages.push({
      id,
      body,
      enqueued: this.clock++,
      attempts: 0,
      visibleAfter: 0,
    });
    return id;
  }

  dequeue(now?: number): QueueMessage<T> | null {
    const time = now ?? this.clock++;
    for (const msg of this.messages) {
      if (msg.visibleAfter <= time) {
        msg.attempts++;
        msg.visibleAfter = time + this.visibilityTimeout;
        return { ...msg };
      }
    }
    return null;
  }

  ack(id: string): boolean {
    const idx = this.messages.findIndex((m) => m.id === id);
    if (idx === -1) return false;
    this.messages.splice(idx, 1);
    this.processed++;
    return true;
  }

  nack(id: string): boolean {
    const msg = this.messages.find((m) => m.id === id);
    if (!msg) return false;
    msg.visibleAfter = 0;
    if (msg.attempts >= this.maxRetries) {
      this.moveToDLQ(id);
    }
    return true;
  }

  private moveToDLQ(id: string): void {
    const idx = this.messages.findIndex((m) => m.id === id);
    if (idx === -1) return;
    const [msg] = this.messages.splice(idx, 1);
    this.dlq.push(msg);
  }

  peek(): QueueMessage<T> | null {
    return this.messages.length > 0 ? { ...this.messages[0] } : null;
  }

  size(): number {
    return this.messages.length;
  }

  dlqSize(): number {
    return this.dlq.length;
  }

  getDLQ(): QueueMessage<T>[] {
    return this.dlq.map((m) => ({ ...m }));
  }

  replayDLQ(): number {
    const count = this.dlq.length;
    for (const msg of this.dlq) {
      msg.attempts = 0;
      msg.visibleAfter = 0;
      this.messages.push(msg);
    }
    this.dlq = [];
    return count;
  }

  purge(): number {
    const count = this.messages.length;
    this.messages = [];
    return count;
  }

  processedCount(): number {
    return this.processed;
  }

  advanceClock(amount: number): void {
    this.clock += amount;
  }
}

export class PriorityQueue<T> {
  private queues = new Map<number, T[]>();
  private count = 0;

  enqueue(item: T, priority = 0): void {
    const queue = this.queues.get(priority) ?? [];
    queue.push(item);
    this.queues.set(priority, queue);
    this.count++;
  }

  dequeue(): T | null {
    const priorities = [...this.queues.keys()].sort((a, b) => b - a);
    for (const p of priorities) {
      const queue = this.queues.get(p)!;
      if (queue.length > 0) {
        this.count--;
        return queue.shift()!;
      }
    }
    return null;
  }

  peek(): T | null {
    const priorities = [...this.queues.keys()].sort((a, b) => b - a);
    for (const p of priorities) {
      const queue = this.queues.get(p)!;
      if (queue.length > 0) return queue[0];
    }
    return null;
  }

  size(): number {
    return this.count;
  }

  isEmpty(): boolean {
    return this.count === 0;
  }
}
