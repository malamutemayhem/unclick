type Subscriber<T> = (value: T) => void;

export class BehaviorSubject<T> {
  private current: T;
  private subscribers = new Set<Subscriber<T>>();
  private completed = false;

  constructor(initialValue: T) {
    this.current = initialValue;
  }

  get value(): T {
    return this.current;
  }

  next(value: T): void {
    if (this.completed) return;
    this.current = value;
    for (const sub of this.subscribers) sub(value);
  }

  subscribe(subscriber: Subscriber<T>): () => void {
    subscriber(this.current);
    if (this.completed) return () => {};
    this.subscribers.add(subscriber);
    return () => this.subscribers.delete(subscriber);
  }

  complete(): void {
    this.completed = true;
    this.subscribers.clear();
  }

  get isCompleted(): boolean {
    return this.completed;
  }

  get subscriberCount(): number {
    return this.subscribers.size;
  }

  map<U>(fn: (value: T) => U): BehaviorSubject<U> {
    const mapped = new BehaviorSubject<U>(fn(this.current));
    this.subscribe((v) => mapped.next(fn(v)));
    return mapped;
  }

  filter(predicate: (value: T) => boolean): BehaviorSubject<T> {
    const filtered = new BehaviorSubject<T>(this.current);
    this.subscribe((v) => { if (predicate(v)) filtered.next(v); });
    return filtered;
  }

  distinctUntilChanged(equals?: (a: T, b: T) => boolean): BehaviorSubject<T> {
    const eq = equals ?? ((a, b) => a === b);
    const distinct = new BehaviorSubject<T>(this.current);
    let prev = this.current;
    this.subscribe((v) => {
      if (!eq(v, prev)) {
        prev = v;
        distinct.next(v);
      }
    });
    return distinct;
  }

  static combine<A, B>(a: BehaviorSubject<A>, b: BehaviorSubject<B>): BehaviorSubject<[A, B]> {
    const combined = new BehaviorSubject<[A, B]>([a.value, b.value]);
    a.subscribe(() => combined.next([a.value, b.value]));
    b.subscribe(() => combined.next([a.value, b.value]));
    return combined;
  }
}

export class ReplaySubject<T> {
  private buffer: T[] = [];
  private readonly bufferSize: number;
  private subscribers = new Set<Subscriber<T>>();

  constructor(bufferSize: number = Infinity) {
    this.bufferSize = bufferSize;
  }

  next(value: T): void {
    this.buffer.push(value);
    if (this.buffer.length > this.bufferSize) {
      this.buffer.shift();
    }
    for (const sub of this.subscribers) sub(value);
  }

  subscribe(subscriber: Subscriber<T>): () => void {
    for (const v of this.buffer) subscriber(v);
    this.subscribers.add(subscriber);
    return () => this.subscribers.delete(subscriber);
  }

  get bufferLength(): number {
    return this.buffer.length;
  }
}
