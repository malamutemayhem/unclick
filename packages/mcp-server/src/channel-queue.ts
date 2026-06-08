interface Pending<T> {
  resolve: (value: T) => void;
}

export class Channel<T> {
  private buffer: T[] = [];
  private readonly capacity: number;
  private receivers: Pending<T>[] = [];
  private senders: { value: T; resolve: () => void }[] = [];
  private closed = false;
  private sentCount = 0;
  private receivedCount = 0;

  constructor(capacity: number = 0) {
    this.capacity = capacity;
  }

  async send(value: T): Promise<void> {
    if (this.closed) throw new Error("Cannot send on closed channel");
    if (this.receivers.length > 0) {
      const receiver = this.receivers.shift()!;
      this.sentCount++;
      this.receivedCount++;
      receiver.resolve(value);
      return;
    }
    if (this.buffer.length < this.capacity) {
      this.buffer.push(value);
      this.sentCount++;
      return;
    }
    return new Promise<void>((resolve) => {
      this.senders.push({ value, resolve });
    });
  }

  async receive(): Promise<T> {
    if (this.buffer.length > 0) {
      const value = this.buffer.shift()!;
      this.receivedCount++;
      if (this.senders.length > 0) {
        const sender = this.senders.shift()!;
        this.buffer.push(sender.value);
        this.sentCount++;
        sender.resolve();
      }
      return value;
    }
    if (this.senders.length > 0) {
      const sender = this.senders.shift()!;
      this.sentCount++;
      this.receivedCount++;
      sender.resolve();
      return sender.value;
    }
    if (this.closed) throw new Error("Channel is closed and empty");
    return new Promise<T>((resolve) => {
      this.receivers.push({ resolve });
    });
  }

  tryReceive(): T | undefined {
    if (this.buffer.length > 0) {
      this.receivedCount++;
      const value = this.buffer.shift()!;
      if (this.senders.length > 0) {
        const sender = this.senders.shift()!;
        this.buffer.push(sender.value);
        this.sentCount++;
        sender.resolve();
      }
      return value;
    }
    if (this.senders.length > 0) {
      const sender = this.senders.shift()!;
      this.sentCount++;
      this.receivedCount++;
      sender.resolve();
      return sender.value;
    }
    return undefined;
  }

  close(): void {
    this.closed = true;
  }

  get isClosed(): boolean {
    return this.closed;
  }

  get size(): number {
    return this.buffer.length;
  }

  get pendingSenders(): number {
    return this.senders.length;
  }

  get pendingReceivers(): number {
    return this.receivers.length;
  }

  get totalSent(): number {
    return this.sentCount;
  }

  get totalReceived(): number {
    return this.receivedCount;
  }
}

export class FanOut<T> {
  private channels: Channel<T>[] = [];

  addChannel(capacity: number = 0): Channel<T> {
    const ch = new Channel<T>(capacity);
    this.channels.push(ch);
    return ch;
  }

  async broadcast(value: T): Promise<void> {
    await Promise.all(this.channels.map((ch) => ch.send(value)));
  }

  get channelCount(): number {
    return this.channels.length;
  }
}
