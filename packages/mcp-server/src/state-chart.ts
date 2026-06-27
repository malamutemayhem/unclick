export interface StateConfig<C = unknown> {
  onEnter?: (context: C) => void;
  onExit?: (context: C) => void;
}

export interface Transition<C = unknown> {
  from: string;
  event: string;
  to: string;
  guard?: (context: C) => boolean;
  action?: (context: C) => void;
}

export class StateChart<C = unknown> {
  private currentState: string;
  private states = new Map<string, StateConfig<C>>();
  private transitions: Transition<C>[] = [];
  private history: string[] = [];
  private context: C;

  constructor(initialState: string, context: C) {
    this.currentState = initialState;
    this.context = context;
    this.history.push(initialState);
  }

  addState(name: string, config: StateConfig<C> = {}): this {
    this.states.set(name, config);
    return this;
  }

  addTransition(transition: Transition<C>): this {
    this.transitions.push(transition);
    return this;
  }

  send(event: string): boolean {
    const matching = this.transitions.filter(
      (t) => t.from === this.currentState && t.event === event,
    );

    for (const t of matching) {
      if (t.guard && !t.guard(this.context)) continue;

      const exitConfig = this.states.get(this.currentState);
      if (exitConfig?.onExit) exitConfig.onExit(this.context);

      if (t.action) t.action(this.context);

      this.currentState = t.to;
      this.history.push(t.to);

      const enterConfig = this.states.get(t.to);
      if (enterConfig?.onEnter) enterConfig.onEnter(this.context);

      return true;
    }

    return false;
  }

  get state(): string {
    return this.currentState;
  }

  getContext(): C {
    return this.context;
  }

  setContext(ctx: C): void {
    this.context = ctx;
  }

  canSend(event: string): boolean {
    return this.transitions.some(
      (t) => t.from === this.currentState && t.event === event && (!t.guard || t.guard(this.context)),
    );
  }

  availableEvents(): string[] {
    return [...new Set(
      this.transitions
        .filter((t) => t.from === this.currentState && (!t.guard || t.guard(this.context)))
        .map((t) => t.event),
    )];
  }

  getHistory(): string[] {
    return [...this.history];
  }

  reset(state?: string): void {
    this.currentState = state ?? this.history[0];
    this.history = [this.currentState];
  }
}
