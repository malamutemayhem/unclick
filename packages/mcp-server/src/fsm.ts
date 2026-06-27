export interface Transition<S extends string, E extends string> {
  from: S;
  event: E;
  to: S;
  guard?: () => boolean;
  action?: () => void;
}

export class StateMachine<S extends string, E extends string> {
  private current: S;
  private transitions: Transition<S, E>[];
  private listeners = new Map<string, Array<(from: S, to: S) => void>>();

  constructor(initial: S, transitions: Transition<S, E>[]) {
    this.current = initial;
    this.transitions = transitions;
  }

  get state(): S { return this.current; }

  send(event: E): boolean {
    const t = this.transitions.find(
      (tr: Transition<S, E>) => tr.from === this.current && tr.event === event
    );
    if (!t) return false;
    if (t.guard && !t.guard()) return false;
    const from = this.current;
    this.current = t.to;
    t.action?.();
    this.emit(from, t.to);
    return true;
  }

  can(event: E): boolean {
    return this.transitions.some(
      (tr: Transition<S, E>) => tr.from === this.current && tr.event === event && (!tr.guard || tr.guard())
    );
  }

  availableEvents(): E[] {
    return this.transitions
      .filter((tr: Transition<S, E>) => tr.from === this.current && (!tr.guard || tr.guard()))
      .map((tr: Transition<S, E>) => tr.event);
  }

  on(event: string, listener: (from: S, to: S) => void): () => void {
    if (!this.listeners.has(event)) this.listeners.set(event, []);
    this.listeners.get(event)!.push(listener);
    return () => {
      const arr = this.listeners.get(event);
      if (arr) {
        const idx = arr.indexOf(listener);
        if (idx >= 0) arr.splice(idx, 1);
      }
    };
  }

  private emit(from: S, to: S): void {
    const key = "transition";
    const arr = this.listeners.get(key);
    if (arr) for (const fn of arr) fn(from, to);
  }
}
