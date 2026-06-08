type Observer<T> = {
  next: (value: T) => void;
  error?: (err: any) => void;
  complete?: () => void;
};

type Unsubscribe = () => void;

export class Observable<T> {
  private subscribeFn: (observer: Observer<T>) => Unsubscribe | void;

  constructor(subscribeFn: (observer: Observer<T>) => Unsubscribe | void) {
    this.subscribeFn = subscribeFn;
  }

  subscribe(observer: Observer<T> | ((value: T) => void)): { unsubscribe: Unsubscribe } {
    const obs: Observer<T> = typeof observer === "function" ? { next: observer } : observer;
    const cleanup = this.subscribeFn(obs);
    return { unsubscribe: cleanup ?? (() => {}) };
  }

  map<R>(fn: (value: T) => R): Observable<R> {
    return new Observable<R>((observer) => {
      const sub = this.subscribe({
        next: (value: T) => observer.next(fn(value)),
        error: observer.error,
        complete: observer.complete,
      });
      return sub.unsubscribe;
    });
  }

  filter(pred: (value: T) => boolean): Observable<T> {
    return new Observable<T>((observer) => {
      const sub = this.subscribe({
        next: (value: T) => { if (pred(value)) observer.next(value); },
        error: observer.error,
        complete: observer.complete,
      });
      return sub.unsubscribe;
    });
  }

  take(count: number): Observable<T> {
    return new Observable<T>((observer) => {
      let taken = 0;
      let sub: { unsubscribe: Unsubscribe } | null = null;
      let done = false;
      sub = this.subscribe({
        next: (value: T) => {
          if (taken < count) {
            observer.next(value);
            taken++;
            if (taken >= count) {
              done = true;
              observer.complete?.();
              sub?.unsubscribe();
            }
          }
        },
        error: observer.error,
      });
      if (done) sub.unsubscribe();
      return sub.unsubscribe;
    });
  }

  static of<T>(...values: T[]): Observable<T> {
    return new Observable((observer) => {
      for (const v of values) observer.next(v);
      observer.complete?.();
    });
  }

  static from<T>(iterable: Iterable<T>): Observable<T> {
    return new Observable((observer) => {
      for (const v of iterable) observer.next(v);
      observer.complete?.();
    });
  }
}

export class Subject<T> extends Observable<T> {
  private observers = new Set<Observer<T>>();

  constructor() {
    super((observer) => {
      this.observers.add(observer);
      return () => this.observers.delete(observer);
    });
  }

  next(value: T): void {
    for (const obs of [...this.observers]) obs.next(value);
  }

  error(err: any): void {
    for (const obs of [...this.observers]) obs.error?.(err);
  }

  complete(): void {
    for (const obs of [...this.observers]) obs.complete?.();
  }
}
