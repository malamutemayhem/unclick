export async function* map<T, U>(source: AsyncIterable<T>, fn: (item: T) => U): AsyncGenerator<U> {
  for await (const item of source) yield fn(item);
}

export async function* filter<T>(source: AsyncIterable<T>, predicate: (item: T) => boolean): AsyncGenerator<T> {
  for await (const item of source) if (predicate(item)) yield item;
}

export async function* take<T>(source: AsyncIterable<T>, n: number): AsyncGenerator<T> {
  let count = 0;
  for await (const item of source) {
    if (count >= n) return;
    yield item;
    count++;
  }
}

export async function* skip<T>(source: AsyncIterable<T>, n: number): AsyncGenerator<T> {
  let count = 0;
  for await (const item of source) {
    if (count >= n) yield item;
    else count++;
  }
}

export async function* chunk<T>(source: AsyncIterable<T>, size: number): AsyncGenerator<T[]> {
  let batch: T[] = [];
  for await (const item of source) {
    batch.push(item);
    if (batch.length >= size) { yield batch; batch = []; }
  }
  if (batch.length > 0) yield batch;
}

export async function* flatten<T>(source: AsyncIterable<T[]>): AsyncGenerator<T> {
  for await (const arr of source) for (const item of arr) yield item;
}

export async function collect<T>(source: AsyncIterable<T>): Promise<T[]> {
  const result: T[] = [];
  for await (const item of source) result.push(item);
  return result;
}

export async function reduce<T, U>(
  source: AsyncIterable<T>,
  fn: (acc: U, item: T) => U,
  initial: U
): Promise<U> {
  let acc = initial;
  for await (const item of source) acc = fn(acc, item);
  return acc;
}

export async function* merge<T>(...sources: AsyncIterable<T>[]): AsyncGenerator<T> {
  const iterators = sources.map((s) => s[Symbol.asyncIterator]());
  const pending = new Map<number, Promise<{ index: number; result: IteratorResult<T> }>>();

  for (let i = 0; i < iterators.length; i++) {
    pending.set(i, iterators[i].next().then((result) => ({ index: i, result })));
  }

  while (pending.size > 0) {
    const { index, result } = await Promise.race(pending.values());
    if (result.done) {
      pending.delete(index);
    } else {
      yield result.value;
      pending.set(index, iterators[index].next().then((r) => ({ index, result: r })));
    }
  }
}

export function fromArray<T>(arr: T[]): AsyncGenerator<T> {
  return (async function* () { for (const item of arr) yield item; })();
}
