export type Transition<S extends string, E extends string> = {
  from: S;
  event: E;
  to: S;
  guard?: () => boolean;
  action?: () => void;
};

export class FiniteStateMachine<S extends string, E extends string> {
  private current: S;
  private transitions: Transition<S, E>[] = [];
  private listeners: Array<(from: S, to: S, event: E) => void> = [];

  constructor(initial: S) {
    this.current = initial;
  }

  addTransition(transition: Transition<S, E>): this {
    this.transitions.push(transition);
    return this;
  }

  addTransitions(transitions: Transition<S, E>[]): this {
    for (const t of transitions) this.transitions.push(t);
    return this;
  }

  send(event: E): boolean {
    const t = this.transitions.find(
      (tr: Transition<S, E>) =>
        tr.from === this.current && tr.event === event && (!tr.guard || tr.guard()),
    );
    if (!t) return false;
    const from = this.current;
    this.current = t.to;
    if (t.action) t.action();
    for (const listener of this.listeners) listener(from, t.to, event);
    return true;
  }

  get state(): S {
    return this.current;
  }

  can(event: E): boolean {
    return this.transitions.some(
      (tr: Transition<S, E>) =>
        tr.from === this.current && tr.event === event && (!tr.guard || tr.guard()),
    );
  }

  availableEvents(): E[] {
    const events = new Set<E>();
    for (const t of this.transitions) {
      if (t.from === this.current && (!t.guard || t.guard())) {
        events.add(t.event);
      }
    }
    return [...events];
  }

  onTransition(listener: (from: S, to: S, event: E) => void): () => void {
    this.listeners.push(listener);
    return () => {
      const idx = this.listeners.indexOf(listener);
      if (idx !== -1) this.listeners.splice(idx, 1);
    };
  }

  reset(state: S): void {
    this.current = state;
  }
}
