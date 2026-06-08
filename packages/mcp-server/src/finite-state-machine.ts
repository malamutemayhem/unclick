export interface FSMConfig<E extends string = string> {
  initial: string;
  states: Record<string, StateConfig<E>>;
}

export interface StateConfig<E extends string = string> {
  on?: Partial<Record<E, string | TransitionConfig>>;
  onEnter?: () => void;
  onExit?: () => void;
}

export interface TransitionConfig {
  target: string;
  guard?: () => boolean;
  action?: () => void;
}

export class StateMachine<E extends string = string> {
  private _state: string;
  private config: FSMConfig<E>;
  private listeners = new Set<(state: string, event: E) => void>();

  constructor(config: FSMConfig<E>) {
    this.config = config;
    this._state = config.initial;
    const initial = config.states[config.initial];
    if (initial?.onEnter) initial.onEnter();
  }

  get state(): string {
    return this._state;
  }

  send(event: E): boolean {
    const stateConfig = this.config.states[this._state];
    if (!stateConfig?.on) return false;
    const transition = stateConfig.on[event];
    if (!transition) return false;

    let target: string;
    let action: (() => void) | undefined;

    if (typeof transition === "string") {
      target = transition;
    } else {
      if (transition.guard && !transition.guard()) return false;
      target = transition.target;
      action = transition.action;
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
      if (transition.guard && !transition.guard()) return false;
    }
    return true;
  }

  subscribe(listener: (state: string, event: E) => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  matches(state: string): boolean {
    return this._state === state;
  }
}

export function createMachine<E extends string = string>(config: FSMConfig<E>): StateMachine<E> {
  return new StateMachine(config);
}
