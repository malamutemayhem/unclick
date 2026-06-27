type TransitionDef<S extends string, E extends string> = {
  from: S;
  event: E;
  to: S;
  guard?: () => boolean;
  action?: () => void;
};

export class FSMBuilder<S extends string, E extends string> {
  private initial: S | null = null;
  private transitions: TransitionDef<S, E>[] = [];
  private enterHooks = new Map<S, Array<() => void>>();
  private exitHooks = new Map<S, Array<() => void>>();

  setInitial(state: S): this {
    this.initial = state;
    return this;
  }

  addTransition(from: S, event: E, to: S, options?: { guard?: () => boolean; action?: () => void }): this {
    this.transitions.push({ from, event, to, guard: options?.guard, action: options?.action });
    return this;
  }

  onEnter(state: S, fn: () => void): this {
    if (!this.enterHooks.has(state)) this.enterHooks.set(state, []);
    this.enterHooks.get(state)!.push(fn);
    return this;
  }

  onExit(state: S, fn: () => void): this {
    if (!this.exitHooks.has(state)) this.exitHooks.set(state, []);
    this.exitHooks.get(state)!.push(fn);
    return this;
  }

  build(): BuiltFSM<S, E> {
    if (!this.initial) throw new Error("Initial state not set");
    return new BuiltFSM(this.initial, this.transitions, this.enterHooks, this.exitHooks);
  }
}

export class BuiltFSM<S extends string, E extends string> {
  private current: S;
  private transitions: TransitionDef<S, E>[];
  private enterHooks: Map<S, Array<() => void>>;
  private exitHooks: Map<S, Array<() => void>>;

  constructor(
    initial: S,
    transitions: TransitionDef<S, E>[],
    enterHooks: Map<S, Array<() => void>>,
    exitHooks: Map<S, Array<() => void>>
  ) {
    this.current = initial;
    this.transitions = transitions;
    this.enterHooks = enterHooks;
    this.exitHooks = exitHooks;
  }

  send(event: E): boolean {
    const candidates = this.transitions.filter((t) => t.from === this.current && t.event === event);
    for (const t of candidates) {
      if (t.guard && !t.guard()) continue;
      const exitFns = this.exitHooks.get(this.current) ?? [];
      for (const fn of exitFns) fn();
      this.current = t.to;
      if (t.action) t.action();
      const enterFns = this.enterHooks.get(this.current) ?? [];
      for (const fn of enterFns) fn();
      return true;
    }
    return false;
  }

  get state(): S {
    return this.current;
  }

  can(event: E): boolean {
    return this.transitions.some((t) => t.from === this.current && t.event === event && (!t.guard || t.guard()));
  }
}
