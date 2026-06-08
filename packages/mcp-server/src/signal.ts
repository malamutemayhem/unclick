type Subscriber<T> = (value: T) => void;

export class Signal<T> {
  private _value: T;
  private subscribers = new Set<Subscriber<T>>();

  constructor(initial: T) { this._value = initial; }

  get value(): T { return this._value; }

  set(value: T): void {
    if (value === this._value) return;
    this._value = value;
    for (const sub of this.subscribers) sub(value);
  }

  update(fn: (current: T) => T): void { this.set(fn(this._value)); }

  subscribe(fn: Subscriber<T>): () => void {
    this.subscribers.add(fn);
    return () => this.subscribers.delete(fn);
  }

  get subscriberCount(): number { return this.subscribers.size; }
}

export class Computed<T> {
  private _value: T;
  private unsubs: (() => void)[] = [];
  private subscribers = new Set<Subscriber<T>>();

  constructor(compute: () => T, deps: Signal<unknown>[]) {
    this._value = compute();
    for (const dep of deps) {
      this.unsubs.push(dep.subscribe(() => {
        const next = compute();
        if (next !== this._value) {
          this._value = next;
          for (const sub of this.subscribers) sub(next);
        }
      }));
    }
  }

  get value(): T { return this._value; }

  subscribe(fn: Subscriber<T>): () => void {
    this.subscribers.add(fn);
    return () => this.subscribers.delete(fn);
  }

  dispose(): void {
    for (const unsub of this.unsubs) unsub();
    this.unsubs.length = 0;
    this.subscribers.clear();
  }
}

export class Effect {
  private unsubs: (() => void)[] = [];

  constructor(fn: () => void, deps: Signal<unknown>[]) {
    for (const dep of deps) {
      this.unsubs.push(dep.subscribe(() => fn()));
    }
  }

  dispose(): void {
    for (const unsub of this.unsubs) unsub();
    this.unsubs.length = 0;
  }
}

export function batch(fn: () => void): void {
  fn();
}
