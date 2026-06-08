export type StateConfig<S extends string, E extends string> = {
  [state in S]?: {
    [event in E]?: { target: S; action?: () => void };
  };
};

export class StateMachine<S extends string, E extends string> {
  private currentState: S;
  private config: StateConfig<S, E>;
  private listeners: Array<(from: S, to: S, event: E) => void> = [];
  private history: S[] = [];
  private readonly maxHistory: number;

  constructor(initial: S, config: StateConfig<S, E>, maxHistory: number = 50) {
    this.currentState = initial;
    this.config = config;
    this.maxHistory = maxHistory;
    this.history.push(initial);
  }

  send(event: E): boolean {
    const stateConfig = this.config[this.currentState];
    if (!stateConfig) return false;
    const transition = stateConfig[event];
    if (!transition) return false;
    const from = this.currentState;
    this.currentState = transition.target;
    this.history.push(this.currentState);
    if (this.history.length > this.maxHistory) this.history.shift();
    if (transition.action) transition.action();
    for (const listener of this.listeners) listener(from, this.currentState, event);
    return true;
  }

  get state(): S {
    return this.currentState;
  }

  can(event: E): boolean {
    const stateConfig = this.config[this.currentState];
    return !!(stateConfig && stateConfig[event]);
  }

  availableEvents(): E[] {
    const stateConfig = this.config[this.currentState];
    if (!stateConfig) return [];
    return Object.keys(stateConfig) as E[];
  }

  onTransition(listener: (from: S, to: S, event: E) => void): () => void {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  getHistory(): S[] {
    return [...this.history];
  }

  reset(state: S): void {
    this.currentState = state;
    this.history = [state];
  }
}
