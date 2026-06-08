interface Transition<S extends string, E extends string> {
  from: S;
  event: E;
  to: S;
  guard?: () => boolean;
  action?: () => void;
}

export class StateMachineBuilder<S extends string, E extends string> {
  private initial: S | undefined;
  private transitions: Transition<S, E>[] = [];

  setInitial(state: S): this {
    this.initial = state;
    return this;
  }

  addTransition(
    from: S,
    event: E,
    to: S,
    options?: { guard?: () => boolean; action?: () => void }
  ): this {
    this.transitions.push({ from, event, to, guard: options?.guard, action: options?.action });
    return this;
  }

  build(): StateMachine<S, E> {
    if (!this.initial) throw new Error("Initial state not set");
    return new StateMachine(this.initial, this.transitions);
  }
}

export class StateMachine<S extends string, E extends string> {
  private _state: S;
  private transitionMap = new Map<string, Transition<S, E>[]>();

  constructor(initial: S, transitions: Transition<S, E>[]) {
    this._state = initial;
    for (const t of transitions) {
      const key = `${t.from}:${t.event}`;
      const list = this.transitionMap.get(key) ?? [];
      list.push(t);
      this.transitionMap.set(key, list);
    }
  }

  get state(): S {
    return this._state;
  }

  send(event: E): S {
    const candidates = this.transitionMap.get(`${this._state}:${event}`) ?? [];
    for (const t of candidates) {
      if (!t.guard || t.guard()) {
        if (t.action) t.action();
        this._state = t.to;
        return this._state;
      }
    }
    throw new Error(`No valid transition from "${this._state}" on "${event}"`);
  }

  can(event: E): boolean {
    const candidates = this.transitionMap.get(`${this._state}:${event}`) ?? [];
    return candidates.some((t) => !t.guard || t.guard());
  }
}
