// Command queue with deduplication and ordered execution.
// Prevents duplicate concurrent requests to the same endpoint,
// and optionally groups related commands into ordered lanes.

export interface QueueOptions {
  concurrency?: number;
  deduplicateKey?: (cmd: QueuedCommand) => string;
}

export interface QueuedCommand {
  id: string;
  execute: () => Promise<unknown>;
}

interface PendingEntry {
  command: QueuedCommand;
  resolve: (value: unknown) => void;
  reject: (err: unknown) => void;
}

export class CommandQueue {
  private pending: PendingEntry[] = [];
  private active = 0;
  private readonly concurrency: number;
  private readonly deduplicateKey?: (cmd: QueuedCommand) => string;
  private readonly inflightKeys = new Map<string, Promise<unknown>>();

  constructor(opts: QueueOptions = {}) {
    this.concurrency = opts.concurrency ?? 1;
    this.deduplicateKey = opts.deduplicateKey;
  }

  enqueue<T>(command: QueuedCommand): Promise<T> {
    if (this.deduplicateKey) {
      const key = this.deduplicateKey(command);
      const existing = this.inflightKeys.get(key);
      if (existing) return existing as Promise<T>;

      const promise = new Promise<unknown>((resolve, reject) => {
        this.pending.push({ command, resolve, reject });
      });

      this.inflightKeys.set(key, promise);
      void promise.finally(() => this.inflightKeys.delete(key));
      this.drain();
      return promise as Promise<T>;
    }

    const promise = new Promise<unknown>((resolve, reject) => {
      this.pending.push({ command, resolve, reject });
    });
    this.drain();
    return promise as Promise<T>;
  }

  get size(): number {
    return this.pending.length;
  }

  get running(): number {
    return this.active;
  }

  private drain(): void {
    while (this.active < this.concurrency && this.pending.length > 0) {
      const entry = this.pending.shift()!;
      this.active++;
      entry.command.execute().then(
        (result) => {
          this.active--;
          entry.resolve(result);
          this.drain();
        },
        (err) => {
          this.active--;
          entry.reject(err);
          this.drain();
        },
      );
    }
  }
}

// Lane-based queue: commands in the same lane run in order,
// different lanes run concurrently up to a global limit.
export class LaneQueue {
  private lanes = new Map<string, CommandQueue>();
  private readonly concurrencyPerLane: number;

  constructor(concurrencyPerLane = 1) {
    this.concurrencyPerLane = concurrencyPerLane;
  }

  enqueue<T>(lane: string, command: QueuedCommand): Promise<T> {
    let queue = this.lanes.get(lane);
    if (!queue) {
      queue = new CommandQueue({ concurrency: this.concurrencyPerLane });
      this.lanes.set(lane, queue);
    }
    return queue.enqueue<T>(command);
  }

  getLaneSize(lane: string): number {
    return this.lanes.get(lane)?.size ?? 0;
  }
}
