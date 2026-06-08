type Observer<T> = (value: T) => void;
type Unsubscribe = () => void;

export class Observable<T> {
  private observers = new Set<Observer<T>>();

  subscribe(observer: Observer<T>): Unsubscribe {
    this.observers.add(observer);
    return () => { this.observers.delete(observer); };
  }

  next(value: T): void {
    for (const observer of this.observers) {
      observer(value);
    }
  }

  get subscriberCount(): number {
    return this.observers.size;
  }

  pipe<U>(transform: (value: T) => U): Observable<U> {
    const derived = new Observable<U>();
    this.subscribe((value) => derived.next(transform(value)));
    return derived;
  }

  filter(predicate: (value: T) => boolean): Observable<T> {
    const filtered = new Observable<T>();
    this.subscribe((value) => { if (predicate(value)) filtered.next(value); });
    return filtered;
  }

  take(count: number): Observable<T> {
    const taken = new Observable<T>();
    let remaining = count;
    this.subscribe((value) => {
      if (remaining > 0) { remaining--; taken.next(value); }
    });
    return taken;
  }

  debounce(ms: number): Observable<T> {
    const debounced = new Observable<T>();
    let timer: ReturnType<typeof setTimeout> | null = null;
    this.subscribe((value) => {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => debounced.next(value), ms);
    });
    return debounced;
  }

  static merge<T>(...observables: Observable<T>[]): Observable<T> {
    const merged = new Observable<T>();
    for (const obs of observables) {
      obs.subscribe((value) => merged.next(value));
    }
    return merged;
  }

  static fromArray<T>(items: T[]): Observable<T> {
    const obs = new Observable<T>();
    for (const item of items) obs.next(item);
    return obs;
  }
}

export class BehaviorSubject<T> extends Observable<T> {
  private current: T;

  constructor(initial: T) {
    super();
    this.current = initial;
  }

  subscribe(observer: Observer<T>): Unsubscribe {
    observer(this.current);
    return super.subscribe(observer);
  }

  next(value: T): void {
    this.current = value;
    super.next(value);
  }

  get value(): T {
    return this.current;
  }
}
