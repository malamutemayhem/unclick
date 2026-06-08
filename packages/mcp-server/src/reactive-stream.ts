export type Observer<T> = {
  next: (value: T) => void;
  error?: (err: Error) => void;
  complete?: () => void;
};

export type Unsubscribe = () => void;

export class Subject<T> {
  private observers: Observer<T>[] = [];
  private completed = false;
  private errored = false;

  subscribe(observer: Observer<T>): Unsubscribe {
    if (this.completed || this.errored) return () => {};
    this.observers.push(observer);
    return () => {
      this.observers = this.observers.filter((o) => o !== observer);
    };
  }

  next(value: T): void {
    if (this.completed || this.errored) return;
    for (const obs of [...this.observers]) {
      obs.next(value);
    }
  }

  error(err: Error): void {
    if (this.completed || this.errored) return;
    this.errored = true;
    for (const obs of [...this.observers]) {
      obs.error?.(err);
    }
  }

  complete(): void {
    if (this.completed || this.errored) return;
    this.completed = true;
    for (const obs of [...this.observers]) {
      obs.complete?.();
    }
  }

  get subscriberCount(): number {
    return this.observers.length;
  }

  get isComplete(): boolean {
    return this.completed;
  }
}

export function map<T, U>(
  source: Subject<T>,
  fn: (value: T) => U,
): Subject<U> {
  const out = new Subject<U>();
  source.subscribe({
    next: (v) => out.next(fn(v)),
    error: (e) => out.error(e),
    complete: () => out.complete(),
  });
  return out;
}

export function filter<T>(
  source: Subject<T>,
  predicate: (value: T) => boolean,
): Subject<T> {
  const out = new Subject<T>();
  source.subscribe({
    next: (v) => { if (predicate(v)) out.next(v); },
    error: (e) => out.error(e),
    complete: () => out.complete(),
  });
  return out;
}

export function scan<T, U>(
  source: Subject<T>,
  reducer: (acc: U, value: T) => U,
  initial: U,
): Subject<U> {
  const out = new Subject<U>();
  let acc = initial;
  source.subscribe({
    next: (v) => {
      acc = reducer(acc, v);
      out.next(acc);
    },
    error: (e) => out.error(e),
    complete: () => out.complete(),
  });
  return out;
}

export function merge<T>(...sources: Subject<T>[]): Subject<T> {
  const out = new Subject<T>();
  let remaining = sources.length;
  for (const source of sources) {
    source.subscribe({
      next: (v) => out.next(v),
      error: (e) => out.error(e),
      complete: () => {
        remaining--;
        if (remaining === 0) out.complete();
      },
    });
  }
  return out;
}

export function take<T>(source: Subject<T>, count: number): Subject<T> {
  const out = new Subject<T>();
  let taken = 0;
  source.subscribe({
    next: (v) => {
      if (taken < count) {
        taken++;
        out.next(v);
        if (taken === count) out.complete();
      }
    },
    error: (e) => out.error(e),
    complete: () => out.complete(),
  });
  return out;
}

export function collect<T>(source: Subject<T>): Promise<T[]> {
  return new Promise((resolve, reject) => {
    const items: T[] = [];
    source.subscribe({
      next: (v) => items.push(v),
      error: (e) => reject(e),
      complete: () => resolve(items),
    });
  });
}
