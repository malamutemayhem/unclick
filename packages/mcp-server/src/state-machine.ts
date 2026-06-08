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
  private listeners: Array<(from: S, event: E, to: S) => void> = [];

  constructor(initial: S, transitions: Transition<S, E>[]) {
    this.current = initial;
    this.transitions = transitions;
  }

  get state(): S {
    return this.current;
  }

  send(event: E): boolean {
    const match = this.transitions.find(
      (t) => t.from === this.current && t.event === event && (t.guard ? t.guard() : true),
    );
    if (!match) return false;
    const from = this.current;
    this.current = match.to;
    match.action?.();
    for (const fn of this.listeners) {
      try { fn(from, event, match.to); } catch {}
    }
    return true;
  }

  can(event: E): boolean {
    return this.transitions.some(
      (t) => t.from === this.current && t.event === event && (t.guard ? t.guard() : true),
    );
  }

  allowedEvents(): E[] {
    return [
      ...new Set(
        this.transitions
          .filter((t) => t.from === this.current && (t.guard ? t.guard() : true))
          .map((t) => t.event),
      ),
    ];
  }

  onTransition(fn: (from: S, event: E, to: S) => void): () => void {
    this.listeners.push(fn);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== fn);
    };
  }
}
