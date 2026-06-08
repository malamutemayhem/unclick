interface Waiter<T> {
  resolve: (value: T) => void;
  reject: (reason: unknown) => void;
}

export class Channel<T> {
  private buffer: T[] = [];
  private readonly capacity: number;
  private sendWaiters: Array<{ value: T; resolve: () => void }> = [];
  private recvWaiters: Array<Waiter<T>> = [];
  private _closed = false;

  constructor(capacity = 0) {
    this.capacity = capacity;
  }

  get isClosed(): boolean {
    return this._closed;
  }

  get length(): number {
    return this.buffer.length;
  }

  async send(value: T): Promise<void> {
    if (this._closed) throw new Error("Cannot send on closed channel");

    if (this.recvWaiters.length > 0) {
      const waiter = this.recvWaiters.shift()!;
      waiter.resolve(value);
      return;
    }

    if (this.buffer.length < this.capacity) {
      this.buffer.push(value);
      return;
    }

    return new Promise<void>((resolve) => {
      this.sendWaiters.push({ value, resolve });
    });
  }

  async recv(): Promise<T> {
    if (this.buffer.length > 0) {
      const value = this.buffer.shift()!;
      if (this.sendWaiters.length > 0) {
        const waiter = this.sendWaiters.shift()!;
        this.buffer.push(waiter.value);
        waiter.resolve();
      }
      return value;
    }

    if (this.sendWaiters.length > 0) {
      const waiter = this.sendWaiters.shift()!;
      waiter.resolve();
      return waiter.value;
    }

    if (this._closed) throw new Error("Channel is closed");

    return new Promise<T>((resolve, reject) => {
      this.recvWaiters.push({ resolve, reject });
    });
  }

  tryRecv(): T | undefined {
    if (this.buffer.length > 0) {
      const value = this.buffer.shift()!;
      if (this.sendWaiters.length > 0) {
        const waiter = this.sendWaiters.shift()!;
        this.buffer.push(waiter.value);
        waiter.resolve();
      }
      return value;
    }
    if (this.sendWaiters.length > 0) {
      const waiter = this.sendWaiters.shift()!;
      waiter.resolve();
      return waiter.value;
    }
    return undefined;
  }

  close(): void {
    this._closed = true;
    for (const waiter of this.recvWaiters) {
      waiter.reject(new Error("Channel is closed"));
    }
    this.recvWaiters = [];
  }
}
