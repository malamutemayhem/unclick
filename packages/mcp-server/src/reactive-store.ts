type Listener<T> = (state: T, prev: T) => void;
type Selector<T, R> = (state: T) => R;
type Updater<T> = T | ((prev: T) => T);

export class Store<T> {
  private state: T;
  private listeners = new Set<Listener<T>>();
  private history: T[] = [];
  private maxHistory: number;

  constructor(initial: T, maxHistory = 0) {
    this.state = initial;
    this.maxHistory = maxHistory;
  }

  get(): T {
    return this.state;
  }

  set(updater: Updater<T>): void {
    const prev = this.state;
    this.state = typeof updater === "function"
      ? (updater as (prev: T) => T)(prev)
      : updater;
    if (this.maxHistory > 0) {
      this.history.push(prev);
      if (this.history.length > this.maxHistory) this.history.shift();
    }
    for (const listener of this.listeners) {
      listener(this.state, prev);
    }
  }

  subscribe(listener: Listener<T>): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  select<R>(selector: Selector<T, R>, listener: (value: R, prev: R) => void): () => void {
    let prev = selector(this.state);
    return this.subscribe((state, prevState) => {
      const next = selector(state);
      const oldVal = selector(prevState);
      if (next !== oldVal) {
        listener(next, prev);
        prev = next;
      }
    });
  }

  undo(): boolean {
    if (this.history.length === 0) return false;
    const prev = this.state;
    this.state = this.history.pop()!;
    for (const listener of this.listeners) {
      listener(this.state, prev);
    }
    return true;
  }

  getHistory(): T[] {
    return [...this.history];
  }

  reset(value: T): void {
    const prev = this.state;
    this.state = value;
    this.history = [];
    for (const listener of this.listeners) {
      listener(this.state, prev);
    }
  }

  get listenerCount(): number {
    return this.listeners.size;
  }
}

export function computed<T, R>(store: Store<T>, selector: Selector<T, R>): Store<R> {
  const derived = new Store(selector(store.get()));
  store.subscribe((state) => {
    derived.set(selector(state));
  });
  return derived;
}
