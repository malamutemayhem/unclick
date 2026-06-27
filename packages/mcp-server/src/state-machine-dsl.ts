export interface Transition<S extends string, E extends string> {
  from: S;
  event: E;
  to: S;
  guard?: () => boolean;
  action?: () => void;
}

export class StateMachineDSL<S extends string, E extends string> {
  private current: S;
  private transitions: Transition<S, E>[] = [];
  private enterHooks = new Map<S, (() => void)[]>();
  private exitHooks = new Map<S, (() => void)[]>();
  private history: S[] = [];

  constructor(initial: S) {
    this.current = initial;
    this.history.push(initial);
  }

  transition(from: S, event: E, to: S, options?: { guard?: () => boolean; action?: () => void }): this {
    this.transitions.push({ from, event, to, guard: options?.guard, action: options?.action });
    return this;
  }

  onEnter(state: S, hook: () => void): this {
    if (!this.enterHooks.has(state)) this.enterHooks.set(state, []);
    this.enterHooks.get(state)!.push(hook);
    return this;
  }

  onExit(state: S, hook: () => void): this {
    if (!this.exitHooks.has(state)) this.exitHooks.set(state, []);
    this.exitHooks.get(state)!.push(hook);
    return this;
  }

  send(event: E): boolean {
    const t = this.transitions.find(
      (tr) => tr.from === this.current && tr.event === event && (!tr.guard || tr.guard()),
    );
    if (!t) return false;
    for (const hook of this.exitHooks.get(this.current) ?? []) hook();
    if (t.action) t.action();
    this.current = t.to;
    this.history.push(t.to);
    for (const hook of this.enterHooks.get(t.to) ?? []) hook();
    return true;
  }

  get state(): S {
    return this.current;
  }

  get stateHistory(): S[] {
    return [...this.history];
  }

  availableEvents(): E[] {
    return [...new Set(
      this.transitions
        .filter((t) => t.from === this.current && (!t.guard || t.guard()))
        .map((t) => t.event),
    )];
  }
}
