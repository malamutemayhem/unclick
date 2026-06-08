export interface BatchResult<T, R> {
  input: T;
  output?: R;
  error?: Error;
  success: boolean;
}

export async function processBatch<T, R>(
  items: T[],
  processor: (item: T) => Promise<R>,
  concurrency = 5,
): Promise<BatchResult<T, R>[]> {
  const results: BatchResult<T, R>[] = [];
  const queue = [...items];
  const promises: Promise<void>[] = [];

  for (let i = 0; i < Math.min(concurrency, queue.length); i++) {
    promises.push(worker());
  }

  async function worker(): Promise<void> {
    while (queue.length > 0) {
      const item = queue.shift()!;
      try {
        const output = await processor(item);
        results.push({ input: item, output, success: true });
      } catch (err) {
        results.push({ input: item, error: err instanceof Error ? err : new Error(String(err)), success: false });
      }
    }
  }

  await Promise.all(promises);
  return results;
}

export function chunk<T>(items: T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < items.length; i += size) {
    chunks.push(items.slice(i, i + size));
  }
  return chunks;
}

export async function processChunked<T, R>(
  items: T[],
  chunkSize: number,
  processor: (chunk: T[]) => Promise<R[]>,
): Promise<R[]> {
  const chunks = chunk(items, chunkSize);
  const results: R[] = [];
  for (const c of chunks) {
    results.push(...await processor(c));
  }
  return results;
}
