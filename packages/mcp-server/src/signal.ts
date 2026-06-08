type Listener = () => void;
type Cleanup = () => void;

export class Signal<T> {
  private value: T;
  private listeners = new Set<Listener>();

  constructor(initial: T) {
    this.value = initial;
  }

  get(): T {
    return this.value;
  }

  set(newValue: T): void {
    if (this.value === newValue) return;
    this.value = newValue;
    this.notify();
  }

  update(fn: (current: T) => T): void {
    this.set(fn(this.value));
  }

  subscribe(listener: Listener): Cleanup {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  get listenerCount(): number {
    return this.listeners.size;
  }

  private notify(): void {
    for (const listener of this.listeners) {
      listener();
    }
  }
}

export function computed<T>(deps: Signal<unknown>[], fn: () => T): Signal<T> {
  const signal = new Signal(fn());
  for (const dep of deps) {
    dep.subscribe(() => signal.set(fn()));
  }
  return signal;
}

export function effect(deps: Signal<unknown>[], fn: () => void | Cleanup): Cleanup {
  let cleanup: Cleanup | void;

  const run = () => {
    if (cleanup) cleanup();
    cleanup = fn();
  };

  const unsubs = deps.map((dep) => dep.subscribe(run));
  run();

  return () => {
    for (const unsub of unsubs) unsub();
    if (cleanup) cleanup();
  };
}

export function batch(fn: () => void): void {
  fn();
}
