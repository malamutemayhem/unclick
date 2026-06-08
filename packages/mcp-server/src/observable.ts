export type Subscriber<T> = (value: T, prev: T) => void;

export class Observable<T> {
  private value: T;
  private subscribers = new Set<Subscriber<T>>();

  constructor(initial: T) {
    this.value = initial;
  }

  get(): T {
    return this.value;
  }

  set(next: T): void {
    if (next === this.value) return;
    const prev = this.value;
    this.value = next;
    for (const fn of this.subscribers) {
      try { fn(next, prev); } catch {}
    }
  }

  update(fn: (current: T) => T): void {
    this.set(fn(this.value));
  }

  subscribe(fn: Subscriber<T>): () => void {
    this.subscribers.add(fn);
    return () => { this.subscribers.delete(fn); };
  }

  get subscriberCount(): number {
    return this.subscribers.size;
  }
}

export function computed<T, R>(source: Observable<T>, transform: (value: T) => R): Observable<R> {
  const derived = new Observable<R>(transform(source.get()));
  source.subscribe((val) => derived.set(transform(val)));
  return derived;
}
