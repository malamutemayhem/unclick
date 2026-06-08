type Subscriber<T> = (value: T, prev: T) => void;

export class ObservableValue<T> {
  private _value: T;
  private subscribers = new Set<Subscriber<T>>();
  private history: T[] = [];
  private maxHistory: number;

  constructor(initial: T, maxHistory = 50) {
    this._value = initial;
    this.maxHistory = maxHistory;
  }

  get value(): T {
    return this._value;
  }

  set(newValue: T): void {
    const prev = this._value;
    this.history.push(prev);
    if (this.history.length > this.maxHistory) this.history.shift();
    this._value = newValue;
    for (const sub of this.subscribers) {
      sub(newValue, prev);
    }
  }

  update(fn: (current: T) => T): void {
    this.set(fn(this._value));
  }

  subscribe(fn: Subscriber<T>): () => void {
    this.subscribers.add(fn);
    return () => this.subscribers.delete(fn);
  }

  once(fn: Subscriber<T>): void {
    const unsub = this.subscribe((v, p) => {
      unsub();
      fn(v, p);
    });
  }

  getHistory(): T[] {
    return [...this.history];
  }

  get subscriberCount(): number {
    return this.subscribers.size;
  }

  reset(value: T): void {
    this._value = value;
    this.history = [];
  }

  derived<U>(transform: (value: T) => U): ObservableValue<U> {
    const d = new ObservableValue(transform(this._value));
    this.subscribe((v) => d.set(transform(v)));
    return d;
  }
}

export function combine<A, B, C>(a: ObservableValue<A>, b: ObservableValue<B>, fn: (a: A, b: B) => C): ObservableValue<C> {
  const result = new ObservableValue(fn(a.value, b.value));
  a.subscribe((va) => result.set(fn(va, b.value)));
  b.subscribe((vb) => result.set(fn(a.value, vb)));
  return result;
}
