export interface IPCMessage {
  id: number;
  from: string;
  to: string;
  type: string;
  payload: unknown;
  timestamp: number;
}

export class MessageQueue {
  private queue: IPCMessage[] = [];
  private nextId = 1;
  private maxSize: number;
  private totalSent = 0;
  private totalReceived = 0;

  constructor(maxSize = 1024) {
    this.maxSize = maxSize;
  }

  send(from: string, to: string, type: string, payload: unknown): IPCMessage | null {
    if (this.queue.length >= this.maxSize) return null;
    const msg: IPCMessage = {
      id: this.nextId++,
      from,
      to,
      type,
      payload,
      timestamp: Date.now(),
    };
    this.queue.push(msg);
    this.totalSent++;
    return msg;
  }

  receive(recipient: string): IPCMessage | null {
    const idx = this.queue.findIndex(m => m.to === recipient);
    if (idx === -1) return null;
    this.totalReceived++;
    return this.queue.splice(idx, 1)[0];
  }

  receiveAll(recipient: string): IPCMessage[] {
    const messages: IPCMessage[] = [];
    let i = 0;
    while (i < this.queue.length) {
      if (this.queue[i].to === recipient) {
        messages.push(this.queue.splice(i, 1)[0]);
        this.totalReceived++;
      } else {
        i++;
      }
    }
    return messages;
  }

  peek(recipient: string): IPCMessage | null {
    return this.queue.find(m => m.to === recipient) || null;
  }

  get size(): number { return this.queue.length; }
  get sent(): number { return this.totalSent; }
  get received(): number { return this.totalReceived; }

  clear(): void {
    this.queue = [];
  }
}

export class PubSub {
  private subscribers = new Map<string, Array<(msg: IPCMessage) => void>>();
  private history: IPCMessage[] = [];
  private nextId = 1;
  private maxHistory: number;

  constructor(maxHistory = 100) {
    this.maxHistory = maxHistory;
  }

  subscribe(topic: string, handler: (msg: IPCMessage) => void): () => void {
    if (!this.subscribers.has(topic)) {
      this.subscribers.set(topic, []);
    }
    this.subscribers.get(topic)!.push(handler);
    return () => {
      const subs = this.subscribers.get(topic);
      if (subs) {
        const idx = subs.indexOf(handler);
        if (idx >= 0) subs.splice(idx, 1);
      }
    };
  }

  publish(from: string, topic: string, payload: unknown): number {
    const msg: IPCMessage = {
      id: this.nextId++,
      from,
      to: topic,
      type: "publish",
      payload,
      timestamp: Date.now(),
    };

    this.history.push(msg);
    if (this.history.length > this.maxHistory) {
      this.history.shift();
    }

    const subs = this.subscribers.get(topic) || [];
    for (const handler of subs) {
      handler(msg);
    }
    return subs.length;
  }

  getSubscriberCount(topic: string): number {
    return (this.subscribers.get(topic) || []).length;
  }

  getHistory(topic?: string): IPCMessage[] {
    if (topic) return this.history.filter(m => m.to === topic);
    return [...this.history];
  }

  get topics(): string[] {
    return [...this.subscribers.keys()];
  }

  clearHistory(): void {
    this.history = [];
  }
}

export class Pipe {
  private buffer: unknown[] = [];
  private maxSize: number;
  private closed = false;

  constructor(maxSize = 256) {
    this.maxSize = maxSize;
  }

  write(data: unknown): boolean {
    if (this.closed) return false;
    if (this.buffer.length >= this.maxSize) return false;
    this.buffer.push(data);
    return true;
  }

  read(): unknown | null {
    if (this.buffer.length === 0) return null;
    return this.buffer.shift()!;
  }

  close(): void {
    this.closed = true;
  }

  get isClosed(): boolean { return this.closed; }
  get available(): number { return this.buffer.length; }
  get capacity(): number { return this.maxSize - this.buffer.length; }
}
