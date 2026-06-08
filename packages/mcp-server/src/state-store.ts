type Listener<T> = (state: T) => void;
type Reducer<T, A> = (state: T, action: A) => T;
type Middleware<T, A> = (state: T, action: A, next: () => T) => T;

export class StateStore<T, A = { type: string; payload?: any }> {
  private state: T;
  private reducer: Reducer<T, A>;
  private listeners = new Set<Listener<T>>();
  private middlewares: Array<Middleware<T, A>> = [];
  private history: T[] = [];
  private maxHistory: number;

  constructor(initialState: T, reducer: Reducer<T, A>, maxHistory = 50) {
    this.state = initialState;
    this.reducer = reducer;
    this.maxHistory = maxHistory;
  }

  getState(): T { return this.state; }

  dispatch(action: A): void {
    this.history.push(this.state);
    if (this.history.length > this.maxHistory) this.history.shift();

    let idx = 0;
    const applyMiddleware = (): T => {
      if (idx < this.middlewares.length) {
        const mw = this.middlewares[idx++];
        return mw(this.state, action, applyMiddleware);
      }
      return this.reducer(this.state, action);
    };

    this.state = applyMiddleware();
    for (const listener of [...this.listeners]) listener(this.state);
  }

  subscribe(listener: Listener<T>): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  use(middleware: Middleware<T, A>): void {
    this.middlewares.push(middleware);
  }

  undo(): boolean {
    if (this.history.length === 0) return false;
    this.state = this.history.pop()!;
    for (const listener of [...this.listeners]) listener(this.state);
    return true;
  }

  select<R>(selector: (state: T) => R): R {
    return selector(this.state);
  }
}

export function createStore<T, A = { type: string; payload?: any }>(
  initialState: T,
  reducer: Reducer<T, A>
): StateStore<T, A> {
  return new StateStore(initialState, reducer);
}
