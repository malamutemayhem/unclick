export interface BatchOptions {
  batchSize: number;
  delayMs?: number;
  onBatch?: (batch: unknown[], index: number) => void;
}

export async function processBatch<T, R>(
  items: T[],
  processor: (item: T) => Promise<R>,
  options: BatchOptions
): Promise<R[]> {
  const results: R[] = [];
  const batches = chunk(items, options.batchSize);
  for (let i = 0; i < batches.length; i++) {
    const batch = batches[i];
    if (options.onBatch) options.onBatch(batch, i);
    const batchResults = await Promise.all(batch.map(processor));
    results.push(...batchResults);
    if (options.delayMs && i < batches.length - 1) {
      await sleep(options.delayMs);
    }
  }
  return results;
}

export async function processBatchSequential<T, R>(
  items: T[],
  processor: (item: T) => Promise<R>,
  options: BatchOptions
): Promise<R[]> {
  const results: R[] = [];
  const batches = chunk(items, options.batchSize);
  for (let i = 0; i < batches.length; i++) {
    if (options.onBatch) options.onBatch(batches[i], i);
    for (const item of batches[i]) {
      results.push(await processor(item));
    }
    if (options.delayMs && i < batches.length - 1) {
      await sleep(options.delayMs);
    }
  }
  return results;
}

export function chunk<T>(items: T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < items.length; i += size) {
    chunks.push(items.slice(i, i + size));
  }
  return chunks;
}

export async function mapConcurrent<T, R>(
  items: T[],
  fn: (item: T) => Promise<R>,
  concurrency: number
): Promise<R[]> {
  const results: R[] = new Array(items.length);
  let index = 0;
  const worker = async () => {
    while (index < items.length) {
      const i = index++;
      results[i] = await fn(items[i]);
    }
  };
  await Promise.all(Array.from({ length: Math.min(concurrency, items.length) }, () => worker()));
  return results;
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
