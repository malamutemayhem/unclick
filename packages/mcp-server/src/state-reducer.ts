export type Reducer<S, A> = (state: S, action: A) => S;
export type Listener<S> = (state: S) => void;
export type Unsubscribe = () => void;

export class Store<S, A> {
  private state: S;
  private reducer: Reducer<S, A>;
  private listeners = new Set<Listener<S>>();

  constructor(reducer: Reducer<S, A>, initialState: S) {
    this.reducer = reducer;
    this.state = initialState;
  }

  getState(): S { return this.state; }

  dispatch(action: A): void {
    this.state = this.reducer(this.state, action);
    for (const listener of this.listeners) listener(this.state);
  }

  subscribe(listener: Listener<S>): Unsubscribe {
    this.listeners.add(listener);
    return () => { this.listeners.delete(listener); };
  }

  replaceReducer(nextReducer: Reducer<S, A>): void {
    this.reducer = nextReducer;
  }
}

export function createStore<S, A>(reducer: Reducer<S, A>, initialState: S): Store<S, A> {
  return new Store(reducer, initialState);
}

export function combineReducers<S extends Record<string, unknown>, A>(
  reducers: { [K in keyof S]: Reducer<S[K], A> }
): Reducer<S, A> {
  return (state: S, action: A): S => {
    const next = {} as S;
    let changed = false;
    for (const key of Object.keys(reducers) as (keyof S)[]) {
      const prev = state[key];
      next[key] = reducers[key](prev, action);
      if (next[key] !== prev) changed = true;
    }
    return changed ? next : state;
  };
}

export function applyMiddleware<S, A>(
  store: Store<S, A>,
  ...middlewares: ((store: Store<S, A>, next: (action: A) => void, action: A) => void)[]
): (action: A) => void {
  const originalDispatch = store.dispatch.bind(store);
  return (action: A) => {
    let index = 0;
    function next(a: A): void {
      if (index < middlewares.length) {
        const mw = middlewares[index++];
        mw(store, next, a);
      } else {
        originalDispatch(a);
      }
    }
    next(action);
  };
}
