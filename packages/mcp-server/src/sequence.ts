export function* range(start: number, end: number, step = 1): Generator<number> {
  if (step > 0) {
    for (let i = start; i < end; i += step) yield i;
  } else if (step < 0) {
    for (let i = start; i > end; i += step) yield i;
  }
}

export function* repeat<T>(value: T, times: number): Generator<T> {
  for (let i = 0; i < times; i++) yield value;
}

export function* cycle<T>(items: T[], times?: number): Generator<T> {
  let count = 0;
  while (times === undefined || count < times) {
    for (const item of items) {
      yield item;
      count++;
      if (times !== undefined && count >= times) return;
    }
  }
}

export function* zip<A, B>(a: Iterable<A>, b: Iterable<B>): Generator<[A, B]> {
  const iterA = a[Symbol.iterator]();
  const iterB = b[Symbol.iterator]();
  while (true) {
    const nextA = iterA.next();
    const nextB = iterB.next();
    if (nextA.done || nextB.done) return;
    yield [nextA.value, nextB.value];
  }
}

export function* enumerate<T>(items: Iterable<T>, start = 0): Generator<[number, T]> {
  let i = start;
  for (const item of items) {
    yield [i++, item];
  }
}

export function* take<T>(items: Iterable<T>, count: number): Generator<T> {
  let taken = 0;
  for (const item of items) {
    if (taken >= count) return;
    yield item;
    taken++;
  }
}

export function* skip<T>(items: Iterable<T>, count: number): Generator<T> {
  let skipped = 0;
  for (const item of items) {
    if (skipped < count) { skipped++; continue; }
    yield item;
  }
}

export function collect<T>(gen: Iterable<T>): T[] {
  return [...gen];
}
