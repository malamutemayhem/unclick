interface NFAState {
  id: number;
  transitions: Map<string, Set<number>>;
  epsilon: Set<number>;
  accepting: boolean;
}

export class NFA {
  private states: NFAState[] = [];
  private startState: number;

  constructor() {
    this.startState = this.addState(false);
  }

  addState(accepting: boolean = false): number {
    const id = this.states.length;
    this.states.push({ id, transitions: new Map(), epsilon: new Set(), accepting });
    return id;
  }

  addTransition(from: number, symbol: string, to: number): void {
    const state = this.states[from];
    if (!state.transitions.has(symbol)) state.transitions.set(symbol, new Set());
    state.transitions.get(symbol)!.add(to);
  }

  addEpsilon(from: number, to: number): void {
    this.states[from].epsilon.add(to);
  }

  setAccepting(stateId: number, accepting: boolean): void {
    this.states[stateId].accepting = accepting;
  }

  setStart(stateId: number): void {
    this.startState = stateId;
  }

  private epsilonClosure(stateIds: Set<number>): Set<number> {
    const closure = new Set(stateIds);
    const stack = [...stateIds];
    while (stack.length > 0) {
      const s = stack.pop()!;
      for (const next of this.states[s].epsilon) {
        if (!closure.has(next)) {
          closure.add(next);
          stack.push(next);
        }
      }
    }
    return closure;
  }

  private move(stateIds: Set<number>, symbol: string): Set<number> {
    const result = new Set<number>();
    for (const s of stateIds) {
      const targets = this.states[s].transitions.get(symbol);
      if (targets) for (const t of targets) result.add(t);
    }
    return result;
  }

  accepts(input: string): boolean {
    let current = this.epsilonClosure(new Set([this.startState]));
    for (const ch of input) {
      current = this.epsilonClosure(this.move(current, ch));
      if (current.size === 0) return false;
    }
    for (const s of current) {
      if (this.states[s].accepting) return true;
    }
    return false;
  }

  get stateCount(): number {
    return this.states.length;
  }

  static fromPattern(pattern: string): NFA {
    const nfa = new NFA();
    let current = 0;
    for (let i = 0; i < pattern.length; i++) {
      const ch = pattern[i];
      if (ch === ".") {
        const next = nfa.addState(false);
        for (let c = 32; c < 127; c++) {
          nfa.addTransition(current, String.fromCharCode(c), next);
        }
        current = next;
      } else if (i + 1 < pattern.length && pattern[i + 1] === "*") {
        const loop = nfa.addState(false);
        nfa.addEpsilon(current, loop);
        nfa.addTransition(loop, ch, loop);
        current = loop;
        i++;
      } else if (i + 1 < pattern.length && pattern[i + 1] === "?") {
        const next = nfa.addState(false);
        nfa.addTransition(current, ch, next);
        nfa.addEpsilon(current, next);
        current = next;
        i++;
      } else {
        const next = nfa.addState(false);
        nfa.addTransition(current, ch, next);
        current = next;
      }
    }
    nfa.setAccepting(current, true);
    return nfa;
  }
}
