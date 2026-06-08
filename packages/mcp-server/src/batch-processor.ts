// Batch processor for grouping similar API calls.
// Collects individual requests over a short window, then sends them
// as one batch call. Useful for APIs that support bulk endpoints.

export interface BatchConfig<TInput, TOutput> {
  maxBatchSize: number;
  maxWaitMs: number;
  executor: (items: TInput[]) => Promise<TOutput[]>;
}

interface PendingItem<TInput, TOutput> {
  input: TInput;
  resolve: (value: TOutput) => void;
  reject: (err: unknown) => void;
}

export class BatchProcessor<TInput, TOutput> {
  private queue: PendingItem<TInput, TOutput>[] = [];
  private timer?: ReturnType<typeof setTimeout>;
  private readonly config: BatchConfig<TInput, TOutput>;

  constructor(config: BatchConfig<TInput, TOutput>) {
    this.config = config;
  }

  add(input: TInput): Promise<TOutput> {
    return new Promise<TOutput>((resolve, reject) => {
      this.queue.push({ input, resolve, reject });

      if (this.queue.length >= this.config.maxBatchSize) {
        this.flush();
      } else if (!this.timer) {
        this.timer = setTimeout(() => this.flush(), this.config.maxWaitMs);
      }
    });
  }

  async flush(): Promise<void> {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = undefined;
    }

    if (this.queue.length === 0) return;

    const batch = this.queue.splice(0);
    const inputs = batch.map((item) => item.input);

    try {
      const results = await this.config.executor(inputs);
      for (let i = 0; i < batch.length; i++) {
        if (i < results.length) {
          batch[i].resolve(results[i]);
        } else {
          batch[i].reject(new Error("Batch result missing for index " + i));
        }
      }
    } catch (err) {
      for (const item of batch) {
        item.reject(err);
      }
    }
  }

  get pending(): number {
    return this.queue.length;
  }

  dispose(): void {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = undefined;
    }
    for (const item of this.queue) {
      item.reject(new Error("BatchProcessor disposed"));
    }
    this.queue = [];
  }
}
