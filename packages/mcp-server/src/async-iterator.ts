export async function* map<T, R>(iter: AsyncIterable<T>, fn: (item: T) => R | Promise<R>): AsyncGenerator<R> {
  for await (const item of iter) {
    yield await fn(item);
  }
}

export async function* filter<T>(iter: AsyncIterable<T>, predicate: (item: T) => boolean | Promise<boolean>): AsyncGenerator<T> {
  for await (const item of iter) {
    if (await predicate(item)) yield item;
  }
}

export async function* take<T>(iter: AsyncIterable<T>, count: number): AsyncGenerator<T> {
  let taken = 0;
  for await (const item of iter) {
    if (taken >= count) break;
    yield item;
    taken++;
  }
}

export async function* skip<T>(iter: AsyncIterable<T>, count: number): AsyncGenerator<T> {
  let skipped = 0;
  for await (const item of iter) {
    if (skipped < count) { skipped++; continue; }
    yield item;
  }
}

export async function* chunk<T>(iter: AsyncIterable<T>, size: number): AsyncGenerator<T[]> {
  let batch: T[] = [];
  for await (const item of iter) {
    batch.push(item);
    if (batch.length >= size) {
      yield batch;
      batch = [];
    }
  }
  if (batch.length > 0) yield batch;
}

export async function* flatten<T>(iter: AsyncIterable<T[]>): AsyncGenerator<T> {
  for await (const arr of iter) {
    for (const item of arr) {
      yield item;
    }
  }
}

export async function collect<T>(iter: AsyncIterable<T>): Promise<T[]> {
  const result: T[] = [];
  for await (const item of iter) {
    result.push(item);
  }
  return result;
}

export async function reduce<T, R>(iter: AsyncIterable<T>, fn: (acc: R, item: T) => R, initial: R): Promise<R> {
  let acc = initial;
  for await (const item of iter) {
    acc = fn(acc, item);
  }
  return acc;
}

export async function first<T>(iter: AsyncIterable<T>): Promise<T | undefined> {
  for await (const item of iter) {
    return item;
  }
  return undefined;
}

export async function* fromArray<T>(arr: T[]): AsyncGenerator<T> {
  for (const item of arr) {
    yield item;
  }
}

export async function* concat<T>(...iters: AsyncIterable<T>[]): AsyncGenerator<T> {
  for (const iter of iters) {
    for await (const item of iter) {
      yield item;
    }
  }
}

export async function* enumerate<T>(iter: AsyncIterable<T>): AsyncGenerator<[number, T]> {
  let i = 0;
  for await (const item of iter) {
    yield [i++, item];
  }
}
