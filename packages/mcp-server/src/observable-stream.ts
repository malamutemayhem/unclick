export interface Observer<T> {
  next: (value: T) => void;
  error?: (err: Error) => void;
  complete?: () => void;
}

export interface Subscription {
  unsubscribe: () => void;
  readonly closed: boolean;
}

type Producer<T> = (observer: Observer<T>) => (() => void) | void;

export class Observable<T> {
  constructor(private producer: Producer<T>) {}

  subscribe(observer: Observer<T> | ((value: T) => void)): Subscription {
    const obs: Observer<T> =
      typeof observer === "function" ? { next: observer } : observer;
    let closed = false;
    const wrappedObserver: Observer<T> = {
      next: (v) => { if (!closed) obs.next(v); },
      error: (e) => { if (!closed) { closed = true; obs.error?.(e); } },
      complete: () => { if (!closed) { closed = true; obs.complete?.(); } },
    };
    const teardown = this.producer(wrappedObserver);
    return {
      unsubscribe: () => {
        closed = true;
        teardown?.();
      },
      get closed() { return closed; },
    };
  }

  map<U>(fn: (value: T) => U): Observable<U> {
    return new Observable<U>((obs) => {
      const sub = this.subscribe({
        next: (v) => obs.next(fn(v)),
        error: (e) => obs.error?.(e),
        complete: () => obs.complete?.(),
      });
      return () => sub.unsubscribe();
    });
  }

  filter(predicate: (value: T) => boolean): Observable<T> {
    return new Observable<T>((obs) => {
      const sub = this.subscribe({
        next: (v) => { if (predicate(v)) obs.next(v); },
        error: (e) => obs.error?.(e),
        complete: () => obs.complete?.(),
      });
      return () => sub.unsubscribe();
    });
  }

  take(count: number): Observable<T> {
    return new Observable<T>((obs) => {
      let taken = 0;
      let sub: Subscription | null = null;
      sub = this.subscribe({
        next: (v) => {
          if (taken < count) {
            taken++;
            obs.next(v);
            if (taken >= count) {
              obs.complete?.();
              sub?.unsubscribe();
            }
          }
        },
        error: (e) => obs.error?.(e),
        complete: () => obs.complete?.(),
      });
      return () => sub?.unsubscribe();
    });
  }

  scan<U>(reducer: (acc: U, value: T) => U, seed: U): Observable<U> {
    return new Observable<U>((obs) => {
      let acc = seed;
      const sub = this.subscribe({
        next: (v) => { acc = reducer(acc, v); obs.next(acc); },
        error: (e) => obs.error?.(e),
        complete: () => obs.complete?.(),
      });
      return () => sub.unsubscribe();
    });
  }

  toArray(): Promise<T[]> {
    return new Promise((resolve, reject) => {
      const items: T[] = [];
      this.subscribe({
        next: (v) => items.push(v),
        error: reject,
        complete: () => resolve(items),
      });
    });
  }

  static of<T>(...values: T[]): Observable<T> {
    return new Observable<T>((obs) => {
      for (const v of values) obs.next(v);
      obs.complete?.();
    });
  }

  static from<T>(iterable: Iterable<T>): Observable<T> {
    return new Observable<T>((obs) => {
      for (const v of iterable) obs.next(v);
      obs.complete?.();
    });
  }

  static merge<T>(...observables: Observable<T>[]): Observable<T> {
    return new Observable<T>((obs) => {
      let completed = 0;
      const subs = observables.map((o) =>
        o.subscribe({
          next: (v) => obs.next(v),
          error: (e) => obs.error?.(e),
          complete: () => {
            completed++;
            if (completed === observables.length) obs.complete?.();
          },
        })
      );
      return () => subs.forEach((s) => s.unsubscribe());
    });
  }
}
