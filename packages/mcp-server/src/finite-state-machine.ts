export interface FSMConfig<S extends string, E extends string> {
  initial: S;
  states: Record<S, StateConfig<S, E>>;
}

export interface StateConfig<S extends string, E extends string> {
  on?: Partial<Record<E, S | TransitionConfig<S>>>;
  onEnter?: () => void;
  onExit?: () => void;
}

export interface TransitionConfig<S extends string> {
  target: S;
  guard?: () => boolean;
  action?: () => void;
}

export class StateMachine<S extends string, E extends string> {
  private _state: S;
  private config: FSMConfig<S, E>;
  private listeners = new Set<(state: S, event: E) => void>();

  constructor(config: FSMConfig<S, E>) {
    this.config = config;
    this._state = config.initial;
    const initial = config.states[config.initial];
    if (initial?.onEnter) initial.onEnter();
  }

  get state(): S {
    return this._state;
  }

  send(event: E): boolean {
    const stateConfig = this.config.states[this._state];
    if (!stateConfig?.on) return false;
    const transition = stateConfig.on[event];
    if (!transition) return false;

    let target: S;
    let action: (() => void) | undefined;

    if (typeof transition === "string") {
      target = transition;
    } else {
      const t = transition as TransitionConfig<S>;
      if (t.guard && !t.guard()) return false;
      target = t.target;
      action = t.action;
    }

    if (stateConfig.onExit) stateConfig.onExit();
    if (action) action();
    this._state = target;
    const newStateConfig = this.config.states[target];
    if (newStateConfig?.onEnter) newStateConfig.onEnter();

    for (const listener of this.listeners) {
      listener(target, event);
    }
    return true;
  }

  can(event: E): boolean {
    const stateConfig = this.config.states[this._state];
    if (!stateConfig?.on) return false;
    const transition = stateConfig.on[event];
    if (!transition) return false;
    if (typeof transition !== "string") {
      const t = transition as TransitionConfig<S>;
      if (t.guard && !t.guard()) return false;
    }
    return true;
  }

  subscribe(listener: (state: S, event: E) => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  matches(state: S): boolean {
    return this._state === state;
  }
}

export function createMachine<S extends string, E extends string>(config: FSMConfig<S, E>): StateMachine<S, E> {
  return new StateMachine(config);
}
