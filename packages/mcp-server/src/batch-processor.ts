export interface BatchResult<T, R> {
  results: { item: T; result: R }[];
  errors: { item: T; error: Error }[];
  totalTime: number;
}

export async function processBatch<T, R>(
  items: T[],
  fn: (item: T) => Promise<R>,
  options?: { concurrency?: number; onProgress?: (completed: number, total: number) => void }
): Promise<BatchResult<T, R>> {
  const concurrency = options?.concurrency || 5;
  const results: { item: T; result: R }[] = [];
  const errors: { item: T; error: Error }[] = [];
  const start = Date.now();
  let completed = 0;

  const queue = [...items];
  const executing = new Set<Promise<void>>();

  while (queue.length > 0 || executing.size > 0) {
    while (queue.length > 0 && executing.size < concurrency) {
      const item = queue.shift()!;
      const promise = fn(item)
        .then((result) => { results.push({ item, result }); })
        .catch((error) => { errors.push({ item, error: error instanceof Error ? error : new Error(String(error)) }); })
        .then(() => {
          completed++;
          if (options?.onProgress) options.onProgress(completed, items.length);
          executing.delete(promise);
        });
      executing.add(promise);
    }
    if (executing.size > 0) await Promise.race(executing);
  }

  return { results, errors, totalTime: Date.now() - start };
}

export async function processSequential<T, R>(
  items: T[],
  fn: (item: T, index: number) => Promise<R>
): Promise<BatchResult<T, R>> {
  const results: { item: T; result: R }[] = [];
  const errors: { item: T; error: Error }[] = [];
  const start = Date.now();

  for (let i = 0; i < items.length; i++) {
    try {
      const result = await fn(items[i], i);
      results.push({ item: items[i], result });
    } catch (error) {
      errors.push({ item: items[i], error: error instanceof Error ? error : new Error(String(error)) });
    }
  }

  return { results, errors, totalTime: Date.now() - start };
}

export function chunkArray<T>(arr: T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size));
  }
  return chunks;
}
