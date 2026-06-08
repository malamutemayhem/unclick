export interface FSMConfig<S extends string, E extends string> {
  initial: S;
  transitions: Array<{ from: S; event: E; to: S }>;
  onEnter?: Partial<Record<S, () => void>>;
  onExit?: Partial<Record<S, () => void>>;
}

export class FiniteStateMachine<S extends string, E extends string> {
  private _state: S;
  private transitionMap = new Map<string, S>();
  private onEnter: Partial<Record<S, () => void>>;
  private onExit: Partial<Record<S, () => void>>;
  private listeners = new Set<(state: S, event: E) => void>();

  constructor(config: FSMConfig<S, E>) {
    this._state = config.initial;
    this.onEnter = config.onEnter ?? {};
    this.onExit = config.onExit ?? {};
    for (const t of config.transitions) {
      this.transitionMap.set(`${t.from}:${t.event}`, t.to);
    }
  }

  get state(): S {
    return this._state;
  }

  can(event: E): boolean {
    return this.transitionMap.has(`${this._state}:${event}`);
  }

  send(event: E): S {
    const key = `${this._state}:${event}`;
    const next = this.transitionMap.get(key);
    if (next === undefined) {
      throw new Error(`No transition from "${this._state}" on "${event}"`);
    }
    const exitFn = this.onExit[this._state];
    if (exitFn) exitFn();
    this._state = next;
    const enterFn = this.onEnter[next];
    if (enterFn) enterFn();
    for (const fn of this.listeners) fn(next, event);
    return next;
  }

  subscribe(fn: (state: S, event: E) => void): () => void {
    this.listeners.add(fn);
    return () => this.listeners.delete(fn);
  }

  availableEvents(): E[] {
    const events: E[] = [];
    for (const key of this.transitionMap.keys()) {
      const [from, event] = key.split(":");
      if (from === this._state && !events.includes(event as E)) {
        events.push(event as E);
      }
    }
    return events;
  }
}
