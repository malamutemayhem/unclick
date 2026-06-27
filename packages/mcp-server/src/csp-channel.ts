export class Channel<T> {
  private buffer: T[] = [];
  private capacity: number;
  private closed = false;
  private waitingSenders: Array<{ value: T; resolve: () => void }> = [];
  private waitingReceivers: Array<{ resolve: (value: T | null) => void }> = [];

  constructor(capacity = 0) {
    this.capacity = capacity;
  }

  send(value: T): Promise<void> {
    if (this.closed) throw new Error("Cannot send on closed channel");

    if (this.waitingReceivers.length > 0) {
      const receiver = this.waitingReceivers.shift()!;
      receiver.resolve(value);
      return Promise.resolve();
    }

    if (this.buffer.length < this.capacity) {
      this.buffer.push(value);
      return Promise.resolve();
    }

    return new Promise((resolve) => {
      this.waitingSenders.push({ value, resolve });
    });
  }

  sendSync(value: T): boolean {
    if (this.closed) return false;

    if (this.waitingReceivers.length > 0) {
      const receiver = this.waitingReceivers.shift()!;
      receiver.resolve(value);
      return true;
    }

    if (this.buffer.length < this.capacity) {
      this.buffer.push(value);
      return true;
    }

    return false;
  }

  receive(): Promise<T | null> {
    if (this.buffer.length > 0) {
      const value = this.buffer.shift()!;
      if (this.waitingSenders.length > 0) {
        const sender = this.waitingSenders.shift()!;
        this.buffer.push(sender.value);
        sender.resolve();
      }
      return Promise.resolve(value);
    }

    if (this.waitingSenders.length > 0) {
      const sender = this.waitingSenders.shift()!;
      sender.resolve();
      return Promise.resolve(sender.value);
    }

    if (this.closed) return Promise.resolve(null);

    return new Promise((resolve) => {
      this.waitingReceivers.push({ resolve });
    });
  }

  tryReceive(): T | null {
    if (this.buffer.length > 0) {
      const value = this.buffer.shift()!;
      if (this.waitingSenders.length > 0) {
        const sender = this.waitingSenders.shift()!;
        this.buffer.push(sender.value);
        sender.resolve();
      }
      return value;
    }

    if (this.waitingSenders.length > 0) {
      const sender = this.waitingSenders.shift()!;
      sender.resolve();
      return sender.value;
    }

    return null;
  }

  close(): void {
    this.closed = true;
    for (const r of this.waitingReceivers) {
      r.resolve(null);
    }
    this.waitingReceivers = [];
  }

  isClosed(): boolean {
    return this.closed;
  }

  isEmpty(): boolean {
    return this.buffer.length === 0 && this.waitingSenders.length === 0;
  }

  size(): number {
    return this.buffer.length;
  }

  pendingSenders(): number {
    return this.waitingSenders.length;
  }

  pendingReceivers(): number {
    return this.waitingReceivers.length;
  }
}

export function select<T>(...channels: Channel<T>[]): T | null {
  for (const ch of channels) {
    const value = ch.tryReceive();
    if (value !== null) return value;
  }
  return null;
}

export function fan<T>(input: Channel<T>, outputs: Channel<T>[]): void {
  let idx = 0;
  const drain = () => {
    let value = input.tryReceive();
    while (value !== null) {
      outputs[idx % outputs.length].sendSync(value);
      idx++;
      value = input.tryReceive();
    }
  };
  drain();
}

export function merge<T>(...inputs: Channel<T>[]): Channel<T> {
  const output = new Channel<T>(inputs.length * 10);
  for (const ch of inputs) {
    let value = ch.tryReceive();
    while (value !== null) {
      output.sendSync(value);
      value = ch.tryReceive();
    }
  }
  return output;
}
