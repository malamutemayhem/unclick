type Observer<T> = {
  next?: (value: T) => void;
  error?: (err: Error) => void;
  complete?: () => void;
};

type Subscription = { unsubscribe: () => void };

export class Observable<T> {
  private producer: (observer: Observer<T>) => (() => void) | void;

  constructor(producer: (observer: Observer<T>) => (() => void) | void) {
    this.producer = producer;
  }

  subscribe(observer: Observer<T>): Subscription {
    let closed = false;
    const safeObserver: Observer<T> = {
      next: (v) => { if (!closed && observer.next) observer.next(v); },
      error: (e) => { if (!closed) { closed = true; if (observer.error) observer.error(e); } },
      complete: () => { if (!closed) { closed = true; if (observer.complete) observer.complete(); } },
    };
    const teardown = this.producer(safeObserver);
    return {
      unsubscribe: () => { closed = true; if (teardown) teardown(); },
    };
  }

  map<U>(fn: (value: T) => U): Observable<U> {
    return new Observable<U>((obs) => {
      const sub = this.subscribe({
        next: (v) => obs.next?.(fn(v)),
        error: (e) => obs.error?.(e),
        complete: () => obs.complete?.(),
      });
      return () => sub.unsubscribe();
    });
  }

  filter(predicate: (value: T) => boolean): Observable<T> {
    return new Observable<T>((obs) => {
      const sub = this.subscribe({
        next: (v) => { if (predicate(v)) obs.next?.(v); },
        error: (e) => obs.error?.(e),
        complete: () => obs.complete?.(),
      });
      return () => sub.unsubscribe();
    });
  }

  take(count: number): Observable<T> {
    return new Observable<T>((obs) => {
      let taken = 0;
      let sub: Subscription | undefined;
      sub = this.subscribe({
        next: (v) => {
          if (taken < count) { taken++; obs.next?.(v); }
          if (taken >= count) { obs.complete?.(); sub?.unsubscribe(); }
        },
        error: (e) => obs.error?.(e),
        complete: () => obs.complete?.(),
      });
      return () => sub?.unsubscribe();
    });
  }

  static of<T>(...values: T[]): Observable<T> {
    return new Observable<T>((obs) => {
      for (const v of values) obs.next?.(v);
      obs.complete?.();
    });
  }

  static from<T>(iterable: Iterable<T>): Observable<T> {
    return new Observable<T>((obs) => {
      for (const v of iterable) obs.next?.(v);
      obs.complete?.();
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

export class Subject<T> extends Observable<T> {
  private observers = new Set<Observer<T>>();
  private closed = false;

  constructor() {
    super((observer) => {
      this.observers.add(observer);
      return () => this.observers.delete(observer);
    });
  }

  next(value: T): void {
    if (this.closed) return;
    for (const obs of this.observers) obs.next?.(value);
  }

  error(err: Error): void {
    if (this.closed) return;
    this.closed = true;
    for (const obs of this.observers) obs.error?.(err);
  }

  complete(): void {
    if (this.closed) return;
    this.closed = true;
    for (const obs of this.observers) obs.complete?.();
    this.observers.clear();
  }
}
