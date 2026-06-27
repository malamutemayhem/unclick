type Listener<T> = (state: T) => void;
type Reducer<T, A> = (state: T, action: A) => T;
type Selector<T, R> = (state: T) => R;
type Unsubscribe = () => void;

export class Store<T, A = { type: string }> {
  private state: T;
  private readonly reducer: Reducer<T, A>;
  private listeners = new Set<Listener<T>>();

  constructor(reducer: Reducer<T, A>, initialState: T) {
    this.reducer = reducer;
    this.state = initialState;
  }

  getState(): T {
    return this.state;
  }

  dispatch(action: A): void {
    this.state = this.reducer(this.state, action);
    for (const listener of this.listeners) listener(this.state);
  }

  subscribe(listener: Listener<T>): Unsubscribe {
    this.listeners.add(listener);
    return () => { this.listeners.delete(listener); };
  }

  select<R>(selector: Selector<T, R>): R {
    return selector(this.state);
  }

  get listenerCount(): number {
    return this.listeners.size;
  }
}

export function createStore<T, A = { type: string }>(reducer: Reducer<T, A>, initialState: T): Store<T, A> {
  return new Store(reducer, initialState);
}

export function combineReducers<T extends Record<string, unknown>>(
  reducers: { [K in keyof T]: Reducer<T[K], { type: string }> },
): Reducer<T, { type: string }> {
  return (state: T, action: { type: string }): T => {
    const next = {} as T;
    let changed = false;
    for (const key of Object.keys(reducers) as Array<keyof T>) {
      const prev = state[key];
      next[key] = reducers[key](prev, action);
      if (next[key] !== prev) changed = true;
    }
    return changed ? next : state;
  };
}
