interface StateConfig {
  onEnter?: () => void;
  onExit?: () => void;
  children?: Record<string, StateConfig>;
  initial?: string;
}

interface Transition {
  from: string;
  event: string;
  to: string;
  guard?: () => boolean;
  action?: () => void;
}

export class StateChart {
  private states: Record<string, StateConfig> = {};
  private transitions: Transition[] = [];
  private _current: string[] = [];
  private _history: string[][] = [];

  addState(path: string, config: StateConfig = {}): this {
    this.states[path] = config;
    return this;
  }

  addTransition(from: string, event: string, to: string, options?: { guard?: () => boolean; action?: () => void }): this {
    this.transitions.push({ from, event, to, guard: options?.guard, action: options?.action });
    return this;
  }

  start(initial: string): void {
    this._current = this.resolveInitial(initial);
    this._history = [[...this._current]];
    for (const state of this._current) {
      this.states[state]?.onEnter?.();
    }
  }

  send(event: string): boolean {
    const currentLeaf = this._current[this._current.length - 1];
    const transition = this.transitions.find(
      (t) => (t.from === currentLeaf || this._current.includes(t.from)) && t.event === event
    );
    if (!transition) return false;
    if (transition.guard && !transition.guard()) return false;

    for (let i = this._current.length - 1; i >= 0; i--) {
      this.states[this._current[i]]?.onExit?.();
    }

    transition.action?.();
    this._current = this.resolveInitial(transition.to);
    this._history.push([...this._current]);

    for (const state of this._current) {
      this.states[state]?.onEnter?.();
    }

    return true;
  }

  get current(): string[] {
    return [...this._current];
  }

  get leaf(): string {
    return this._current[this._current.length - 1];
  }

  get history(): string[][] {
    return this._history.map((h) => [...h]);
  }

  isIn(state: string): boolean {
    return this._current.includes(state);
  }

  private resolveInitial(path: string): string[] {
    const parts = [path];
    let config = this.states[path];
    while (config?.initial && config.children?.[config.initial]) {
      const childPath = `${path}.${config.initial}`;
      parts.push(childPath);
      config = this.states[childPath];
    }
    return parts;
  }
}
