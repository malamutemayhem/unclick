type Listener<T> = (value: T) => void;

export class Signal<T> {
  private _value: T;
  private listeners = new Set<Listener<T>>();

  constructor(initial: T) {
    this._value = initial;
  }

  get value(): T { return this._value; }

  set(value: T): void {
    if (this._value === value) return;
    this._value = value;
    this.notify();
  }

  update(fn: (current: T) => T): void {
    this.set(fn(this._value));
  }

  subscribe(listener: Listener<T>): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  peek(): T { return this._value; }

  private notify(): void {
    for (const listener of [...this.listeners]) listener(this._value);
  }
}

export class Computed<T> {
  private _value: T;
  private listeners = new Set<Listener<T>>();
  private unsubscribers: Array<() => void> = [];

  constructor(fn: () => T, deps: Array<Signal<any> | Computed<any>>) {
    this._value = fn();
    for (const dep of deps) {
      this.unsubscribers.push(dep.subscribe(() => {
        const next = fn();
        if (next !== this._value) {
          this._value = next;
          for (const listener of [...this.listeners]) listener(this._value);
        }
      }));
    }
  }

  get value(): T { return this._value; }

  subscribe(listener: Listener<T>): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  dispose(): void {
    for (const unsub of this.unsubscribers) unsub();
    this.unsubscribers = [];
    this.listeners.clear();
  }
}

export function signal<T>(initial: T): Signal<T> {
  return new Signal(initial);
}

export function computed<T>(fn: () => T, deps: Array<Signal<any> | Computed<any>>): Computed<T> {
  return new Computed(fn, deps);
}
