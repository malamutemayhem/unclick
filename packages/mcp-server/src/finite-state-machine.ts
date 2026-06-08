export type TransitionFn<S extends string, E extends string, C> = (
  context: C,
  event: E
) => { state: S; context: C } | undefined;

export interface FSMConfig<S extends string, E extends string, C> {
  initial: S;
  context: C;
  transitions: Record<S, Partial<Record<E, S | TransitionFn<S, E, C>>>>;
  onEnter?: Partial<Record<S, (context: C) => void>>;
  onExit?: Partial<Record<S, (context: C) => void>>;
}

export class FiniteStateMachine<S extends string, E extends string, C> {
  private _state: S;
  private _context: C;
  private config: FSMConfig<S, E, C>;
  private history: { from: S; to: S; event: E; timestamp: number }[] = [];
  private listeners = new Set<(state: S, context: C) => void>();

  constructor(config: FSMConfig<S, E, C>) {
    this.config = config;
    this._state = config.initial;
    this._context = structuredClone(config.context);
  }

  get state(): S { return this._state; }
  get context(): C { return this._context; }

  send(event: E): boolean {
    const stateTransitions = this.config.transitions[this._state];
    if (!stateTransitions) return false;

    const handler = stateTransitions[event];
    if (handler === undefined) return false;

    let nextState: S;
    if (typeof handler === "function") {
      const fn = handler as TransitionFn<S, E, C>;
      const result = fn(this._context, event);
      if (!result) return false;
      nextState = result.state;
      this._context = result.context;
    } else {
      nextState = handler as S;
    }

    const prevState = this._state;
    this.config.onExit?.[prevState]?.(this._context);
    this._state = nextState;
    this.config.onEnter?.[nextState]?.(this._context);
    this.history.push({ from: prevState, to: nextState, event, timestamp: Date.now() });

    for (const listener of this.listeners) listener(this._state, this._context);
    return true;
  }

  can(event: E): boolean {
    const stateTransitions = this.config.transitions[this._state];
    return stateTransitions?.[event] !== undefined;
  }

  allowedEvents(): E[] {
    const stateTransitions = this.config.transitions[this._state];
    if (!stateTransitions) return [];
    return Object.keys(stateTransitions) as E[];
  }

  getHistory(): { from: S; to: S; event: E; timestamp: number }[] {
    return [...this.history];
  }

  onChange(fn: (state: S, context: C) => void): () => void {
    this.listeners.add(fn);
    return () => this.listeners.delete(fn);
  }

  reset(): void {
    this._state = this.config.initial;
    this._context = structuredClone(this.config.context);
    this.history.length = 0;
  }
}
