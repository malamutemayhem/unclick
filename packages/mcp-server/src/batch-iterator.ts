export async function* batchIterator<T>(
  items: AsyncIterable<T> | Iterable<T>,
  batchSize: number
): AsyncGenerator<T[]> {
  let batch: T[] = [];
  for await (const item of items) {
    batch.push(item);
    if (batch.length >= batchSize) {
      yield batch;
      batch = [];
    }
  }
  if (batch.length > 0) yield batch;
}

export function* batchSync<T>(items: Iterable<T>, batchSize: number): Generator<T[]> {
  let batch: T[] = [];
  for (const item of items) {
    batch.push(item);
    if (batch.length >= batchSize) {
      yield batch;
      batch = [];
    }
  }
  if (batch.length > 0) yield batch;
}

export async function collectBatches<T>(
  items: AsyncIterable<T> | Iterable<T>,
  batchSize: number
): Promise<T[][]> {
  const result: T[][] = [];
  for await (const batch of batchIterator(items, batchSize)) {
    result.push(batch);
  }
  return result;
}

export async function processBatches<T, R>(
  items: AsyncIterable<T> | Iterable<T>,
  batchSize: number,
  fn: (batch: T[]) => R | Promise<R>
): Promise<R[]> {
  const results: R[] = [];
  for await (const batch of batchIterator(items, batchSize)) {
    results.push(await fn(batch));
  }
  return results;
}
