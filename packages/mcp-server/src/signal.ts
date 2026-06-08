type Listener<T> = (value: T) => void;
type Cleanup = () => void;

export interface ReadableSignal<T> {
  get(): T;
  subscribe(listener: Listener<T>): Cleanup;
}

export class Signal<T> implements ReadableSignal<T> {
  private value: T;
  private listeners = new Set<Listener<T>>();

  constructor(initial: T) {
    this.value = initial;
  }

  get(): T {
    return this.value;
  }

  set(newValue: T): void {
    if (newValue === this.value) return;
    this.value = newValue;
    for (const listener of this.listeners) listener(this.value);
  }

  update(fn: (current: T) => T): void {
    this.set(fn(this.value));
  }

  subscribe(listener: Listener<T>): Cleanup {
    this.listeners.add(listener);
    return () => { this.listeners.delete(listener); };
  }

  get subscriberCount(): number {
    return this.listeners.size;
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function computed<T>(deps: ReadableSignal<any>[], compute: () => T): Signal<T> {
  const derived = new Signal(compute());
  for (const dep of deps) {
    dep.subscribe(() => derived.set(compute()));
  }
  return derived;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function effect(deps: ReadableSignal<any>[], fn: () => void | Cleanup): Cleanup {
  let cleanup: void | Cleanup;
  const run = () => {
    if (typeof cleanup === "function") cleanup();
    cleanup = fn();
  };
  const unsubs = deps.map((dep) => dep.subscribe(run));
  run();
  return () => {
    for (const unsub of unsubs) unsub();
    if (typeof cleanup === "function") cleanup();
  };
}

export function batch(fn: () => void): void {
  fn();
}
