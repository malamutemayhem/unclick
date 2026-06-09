export type PullSource<T> = (abort: boolean) => { done: boolean; value?: T };
export type PullThrough<T, U> = (source: PullSource<T>) => PullSource<U>;
export type PullSink<T> = (source: PullSource<T>) => void;

export function values<T>(arr: T[]): PullSource<T> {
  let i = 0;
  return (abort) => {
    if (abort || i >= arr.length) return { done: true };
    return { done: false, value: arr[i++] };
  };
}

export function count(start = 0, end = Infinity): PullSource<number> {
  let n = start;
  return (abort) => {
    if (abort || n >= end) return { done: true };
    return { done: false, value: n++ };
  };
}

export function infinite<T>(fn: (i: number) => T): PullSource<T> {
  let i = 0;
  return (abort) => {
    if (abort) return { done: true };
    return { done: false, value: fn(i++) };
  };
}

export function map<T, U>(fn: (val: T) => U): PullThrough<T, U> {
  return (source) => (abort) => {
    const result = source(abort);
    if (result.done) return { done: true };
    return { done: false, value: fn(result.value!) };
  };
}

export function filter<T>(pred: (val: T) => boolean): PullThrough<T, T> {
  return (source) => (abort) => {
    while (true) {
      const result = source(abort);
      if (result.done) return { done: true };
      if (pred(result.value!)) return result;
    }
  };
}

export function take<T>(n: number): PullThrough<T, T> {
  let taken = 0;
  return (source) => (abort) => {
    if (abort || taken >= n) return source(true), { done: true };
    taken++;
    return source(false);
  };
}

export function skip<T>(n: number): PullThrough<T, T> {
  let skipped = 0;
  return (source) => (abort) => {
    while (skipped < n) {
      const result = source(abort);
      if (result.done) return { done: true };
      skipped++;
    }
    return source(abort);
  };
}

export function scan<T, U>(fn: (acc: U, val: T) => U, initial: U): PullThrough<T, U> {
  let acc = initial;
  return (source) => (abort) => {
    const result = source(abort);
    if (result.done) return { done: true };
    acc = fn(acc, result.value!);
    return { done: false, value: acc };
  };
}

export function collect<T>(source: PullSource<T>): T[] {
  const result: T[] = [];
  while (true) {
    const item = source(false);
    if (item.done) break;
    result.push(item.value!);
  }
  return result;
}

export function reduce<T, U>(source: PullSource<T>, fn: (acc: U, val: T) => U, initial: U): U {
  let acc = initial;
  while (true) {
    const item = source(false);
    if (item.done) break;
    acc = fn(acc, item.value!);
  }
  return acc;
}

export function forEach<T>(source: PullSource<T>, fn: (val: T) => void): void {
  while (true) {
    const item = source(false);
    if (item.done) break;
    fn(item.value!);
  }
}

export function pipe<A, B>(source: PullSource<A>, t1: PullThrough<A, B>): PullSource<B>;
export function pipe<A, B, C>(source: PullSource<A>, t1: PullThrough<A, B>, t2: PullThrough<B, C>): PullSource<C>;
export function pipe(source: PullSource<unknown>, ...throughs: PullThrough<unknown, unknown>[]): PullSource<unknown> {
  let current: PullSource<unknown> = source;
  for (const through of throughs) {
    current = through(current);
  }
  return current;
}

export function concat<T>(...sources: PullSource<T>[]): PullSource<T> {
  let idx = 0;
  return (abort) => {
    while (idx < sources.length) {
      const result = sources[idx](abort);
      if (!result.done) return result;
      idx++;
    }
    return { done: true };
  };
}
