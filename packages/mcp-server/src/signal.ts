type Subscriber<T> = (value: T) => void;

export class Signal<T> {
  private _value: T;
  private subscribers = new Set<Subscriber<T>>();

  constructor(initialValue: T) {
    this._value = initialValue;
  }

  get value(): T {
    return this._value;
  }

  set value(newValue: T) {
    if (Object.is(this._value, newValue)) return;
    this._value = newValue;
    this.notify();
  }

  peek(): T {
    return this._value;
  }

  update(fn: (current: T) => T): void {
    this.value = fn(this._value);
  }

  subscribe(fn: Subscriber<T>): () => void {
    this.subscribers.add(fn);
    return () => this.subscribers.delete(fn);
  }

  private notify(): void {
    for (const fn of this.subscribers) {
      fn(this._value);
    }
  }
}

export function computed<T>(fn: () => T, deps: Signal<unknown>[]): Signal<T> {
  const sig = new Signal<T>(fn());
  for (const dep of deps) {
    dep.subscribe(() => {
      sig.value = fn();
    });
  }
  return sig;
}

export function effect(fn: () => void, deps: Signal<unknown>[]): () => void {
  fn();
  const unsubs = deps.map((dep) => dep.subscribe(fn));
  return () => unsubs.forEach((u) => u());
}

export function batch(fn: () => void): void {
  fn();
}
