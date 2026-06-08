type Observer<T> = {
  next: (value: T) => void;
  error?: (err: unknown) => void;
  complete?: () => void;
};

type TeardownFn = () => void;
type SubscribeFn<T> = (observer: Observer<T>) => TeardownFn | void;

export class Observable<T> {
  private subscribeFn: SubscribeFn<T>;

  constructor(subscribeFn: SubscribeFn<T>) {
    this.subscribeFn = subscribeFn;
  }

  subscribe(observer: Observer<T> | ((value: T) => void)): { unsubscribe: () => void } {
    const obs: Observer<T> = typeof observer === "function" ? { next: observer } : observer;
    let active = true;
    const teardown = this.subscribeFn({
      next: (v) => { if (active) obs.next(v); },
      error: (e) => { if (active) { active = false; obs.error?.(e); } },
      complete: () => { if (active) { active = false; obs.complete?.(); } },
    });
    return {
      unsubscribe: () => {
        active = false;
        teardown?.();
      },
    };
  }

  map<R>(fn: (value: T) => R): Observable<R> {
    return new Observable<R>((observer) => {
      const sub = this.subscribe({
        next: (v) => observer.next(fn(v)),
        error: (e) => observer.error?.(e),
        complete: () => observer.complete?.(),
      });
      return () => sub.unsubscribe();
    });
  }

  filter(predicate: (value: T) => boolean): Observable<T> {
    return new Observable<T>((observer) => {
      const sub = this.subscribe({
        next: (v) => { if (predicate(v)) observer.next(v); },
        error: (e) => observer.error?.(e),
        complete: () => observer.complete?.(),
      });
      return () => sub.unsubscribe();
    });
  }

  take(count: number): Observable<T> {
    return new Observable<T>((observer) => {
      let taken = 0;
      let subRef: { unsubscribe: () => void } | null = null;
      const sub = this.subscribe({
        next: (v) => {
          if (taken < count) {
            taken++;
            observer.next(v);
            if (taken >= count) {
              observer.complete?.();
              if (subRef) subRef.unsubscribe();
            }
          }
        },
        error: (e) => observer.error?.(e),
        complete: () => observer.complete?.(),
      });
      subRef = sub;
      if (taken >= count) sub.unsubscribe();
      return () => sub.unsubscribe();
    });
  }

  scan<R>(fn: (acc: R, value: T) => R, seed: R): Observable<R> {
    return new Observable<R>((observer) => {
      let acc = seed;
      const sub = this.subscribe({
        next: (v) => { acc = fn(acc, v); observer.next(acc); },
        error: (e) => observer.error?.(e),
        complete: () => observer.complete?.(),
      });
      return () => sub.unsubscribe();
    });
  }

  toPromise(): Promise<T | undefined> {
    return new Promise((resolve, reject) => {
      let last: T | undefined;
      this.subscribe({
        next: (v) => { last = v; },
        error: reject,
        complete: () => resolve(last),
      });
    });
  }
}

export function of<T>(...values: T[]): Observable<T> {
  return new Observable<T>((observer) => {
    for (const v of values) observer.next(v);
    observer.complete?.();
  });
}

export function fromArray<T>(arr: T[]): Observable<T> {
  return of(...arr);
}

export function interval(ms: number): Observable<number> {
  return new Observable<number>((observer) => {
    let count = 0;
    const id = setInterval(() => observer.next(count++), ms);
    return () => clearInterval(id);
  });
}

export function merge<T>(...observables: Observable<T>[]): Observable<T> {
  return new Observable<T>((observer) => {
    let completed = 0;
    const subs = observables.map((obs) =>
      obs.subscribe({
        next: (v) => observer.next(v),
        error: (e) => observer.error?.(e),
        complete: () => { completed++; if (completed === observables.length) observer.complete?.(); },
      })
    );
    return () => subs.forEach((s) => s.unsubscribe());
  });
}
