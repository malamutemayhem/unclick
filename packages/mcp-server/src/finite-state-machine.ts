export interface Transition<S extends string, E extends string> {
  from: S;
  event: E;
  to: S;
  guard?: () => boolean;
  action?: () => void;
}

export class FiniteStateMachine<S extends string, E extends string> {
  private current: S;
  private transitions: Transition<S, E>[] = [];
  private history: Array<{ from: S; event: E; to: S; timestamp: number }> = [];

  constructor(initial: S) {
    this.current = initial;
  }

  addTransition(t: Transition<S, E>): void {
    this.transitions.push(t);
  }

  addTransitions(ts: Transition<S, E>[]): void {
    for (const t of ts) this.transitions.push(t);
  }

  send(event: E): boolean {
    const t = this.transitions.find(
      (tr) => tr.from === this.current && tr.event === event && (!tr.guard || tr.guard()),
    );
    if (!t) return false;
    const from = this.current;
    this.current = t.to;
    t.action?.();
    this.history.push({ from, event, to: t.to, timestamp: Date.now() });
    return true;
  }

  get state(): S {
    return this.current;
  }

  canSend(event: E): boolean {
    return this.transitions.some(
      (t) => t.from === this.current && t.event === event && (!t.guard || t.guard()),
    );
  }

  availableEvents(): E[] {
    return [...new Set(
      this.transitions
        .filter((t) => t.from === this.current && (!t.guard || t.guard()))
        .map((t) => t.event),
    )];
  }

  getHistory(): Array<{ from: S; event: E; to: S; timestamp: number }> {
    return [...this.history];
  }

  reset(state: S): void {
    this.current = state;
    this.history = [];
  }
}
