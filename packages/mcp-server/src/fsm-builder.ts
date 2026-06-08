interface Transition {
  from: string;
  to: string;
  event: string;
  guard?: () => boolean;
  action?: () => void;
}

export class FSMBuilder {
  private transitions: Transition[] = [];
  private initialState: string | null = null;
  private enterActions = new Map<string, Array<() => void>>();
  private exitActions = new Map<string, Array<() => void>>();

  initial(state: string): this {
    this.initialState = state;
    return this;
  }

  on(event: string, from: string, to: string, opts?: { guard?: () => boolean; action?: () => void }): this {
    this.transitions.push({ from, to, event, guard: opts?.guard, action: opts?.action });
    return this;
  }

  onEnter(state: string, action: () => void): this {
    if (!this.enterActions.has(state)) this.enterActions.set(state, []);
    this.enterActions.get(state)!.push(action);
    return this;
  }

  onExit(state: string, action: () => void): this {
    if (!this.exitActions.has(state)) this.exitActions.set(state, []);
    this.exitActions.get(state)!.push(action);
    return this;
  }

  build(): FSMInstance {
    if (!this.initialState) throw new Error("Initial state not set");
    return new FSMInstance(
      this.initialState,
      this.transitions,
      this.enterActions,
      this.exitActions
    );
  }
}

export class FSMInstance {
  private current: string;
  private history: string[] = [];

  constructor(
    initial: string,
    private transitions: Transition[],
    private enterActions: Map<string, Array<() => void>>,
    private exitActions: Map<string, Array<() => void>>
  ) {
    this.current = initial;
  }

  get state(): string {
    return this.current;
  }

  send(event: string): boolean {
    const t = this.transitions.find(
      (tr) => tr.from === this.current && tr.event === event && (!tr.guard || tr.guard())
    );
    if (!t) return false;

    const exitFns = this.exitActions.get(this.current);
    if (exitFns) exitFns.forEach((fn) => fn());

    this.history.push(this.current);
    this.current = t.to;
    if (t.action) t.action();

    const enterFns = this.enterActions.get(this.current);
    if (enterFns) enterFns.forEach((fn) => fn());

    return true;
  }

  can(event: string): boolean {
    return this.transitions.some(
      (tr) => tr.from === this.current && tr.event === event && (!tr.guard || tr.guard())
    );
  }

  getHistory(): string[] {
    return [...this.history];
  }
}
