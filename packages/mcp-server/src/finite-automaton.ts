interface Transition {
  from: string;
  input: string;
  to: string;
}

export class DFA {
  private transitions = new Map<string, Map<string, string>>();
  private _start: string;
  private accepts = new Set<string>();
  private current: string;

  constructor(start: string, acceptStates: string[]) {
    this._start = start;
    this.current = start;
    for (const s of acceptStates) this.accepts.add(s);
  }

  addTransition(from: string, input: string, to: string): void {
    if (!this.transitions.has(from)) this.transitions.set(from, new Map());
    this.transitions.get(from)!.set(input, to);
  }

  step(input: string): string | null {
    const trans = this.transitions.get(this.current);
    if (!trans || !trans.has(input)) return null;
    this.current = trans.get(input)!;
    return this.current;
  }

  isAccepting(): boolean {
    return this.accepts.has(this.current);
  }

  reset(): void {
    this.current = this._start;
  }

  get state(): string {
    return this.current;
  }

  accepts_string(input: string): boolean {
    this.reset();
    for (const ch of input) {
      if (this.step(ch) === null) return false;
    }
    return this.isAccepting();
  }

  static fromTransitions(start: string, acceptStates: string[], transitions: Transition[]): DFA {
    const dfa = new DFA(start, acceptStates);
    for (const t of transitions) {
      dfa.addTransition(t.from, t.input, t.to);
    }
    return dfa;
  }
}
