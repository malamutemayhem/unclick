interface State {
  transitions: Map<string, number>;
  isAccept: boolean;
  epsilon: number[];
}

export class NFARegex {
  private states: State[] = [];
  private startState: number;

  constructor(pattern: string) {
    const parser = new Parser(pattern, this);
    const { start, accept } = parser.parse();
    this.startState = start;
    this.states[accept].isAccept = true;
  }

  test(input: string): boolean {
    let current = this.epsilonClosure(new Set([this.startState]));
    for (const ch of input) {
      const next = new Set<number>();
      for (const state of current) {
        const s = this.states[state];
        const target = s.transitions.get(ch);
        if (target !== undefined) next.add(target);
        const dotTarget = s.transitions.get(".");
        if (dotTarget !== undefined) next.add(dotTarget);
      }
      current = this.epsilonClosure(next);
    }
    for (const state of current) {
      if (this.states[state].isAccept) return true;
    }
    return false;
  }

  addState(): number {
    const id = this.states.length;
    this.states.push({ transitions: new Map(), isAccept: false, epsilon: [] });
    return id;
  }

  getState(id: number): State {
    return this.states[id];
  }

  private epsilonClosure(states: Set<number>): Set<number> {
    const closure = new Set(states);
    const stack = [...states];
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
}

class Parser {
  private pos = 0;

  constructor(
    private pattern: string,
    private nfa: NFARegex
  ) {}

  parse(): { start: number; accept: number } {
    return this.parseExpr();
  }

  private peek(): string | undefined {
    return this.pattern[this.pos];
  }

  private next(): string {
    return this.pattern[this.pos++];
  }

  private parseExpr(): { start: number; accept: number } {
    let left = this.parseTerm();
    while (this.peek() === "|") {
      this.next();
      const right = this.parseTerm();
      const s = this.nfa.addState();
      const a = this.nfa.addState();
      this.nfa.getState(s).epsilon.push(left.start, right.start);
      this.nfa.getState(left.accept).epsilon.push(a);
      this.nfa.getState(right.accept).epsilon.push(a);
      left = { start: s, accept: a };
    }
    return left;
  }

  private parseTerm(): { start: number; accept: number } {
    let result: { start: number; accept: number } | null = null;
    while (this.pos < this.pattern.length && this.peek() !== ")" && this.peek() !== "|") {
      let atom = this.parseAtom();
      if (this.peek() === "*") {
        this.next();
        const s = this.nfa.addState();
        const a = this.nfa.addState();
        this.nfa.getState(s).epsilon.push(atom.start, a);
        this.nfa.getState(atom.accept).epsilon.push(atom.start, a);
        atom = { start: s, accept: a };
      } else if (this.peek() === "+") {
        this.next();
        const s = this.nfa.addState();
        const a = this.nfa.addState();
        this.nfa.getState(s).epsilon.push(atom.start);
        this.nfa.getState(atom.accept).epsilon.push(atom.start, a);
        atom = { start: s, accept: a };
      } else if (this.peek() === "?") {
        this.next();
        const s = this.nfa.addState();
        const a = this.nfa.addState();
        this.nfa.getState(s).epsilon.push(atom.start, a);
        this.nfa.getState(atom.accept).epsilon.push(a);
        atom = { start: s, accept: a };
      }
      if (result) {
        this.nfa.getState(result.accept).epsilon.push(atom.start);
        result = { start: result.start, accept: atom.accept };
      } else {
        result = atom;
      }
    }
    if (!result) {
      const s = this.nfa.addState();
      return { start: s, accept: s };
    }
    return result;
  }

  private parseAtom(): { start: number; accept: number } {
    if (this.peek() === "(") {
      this.next();
      const inner = this.parseExpr();
      this.next();
      return inner;
    }
    const c = this.next();
    const s = this.nfa.addState();
    const a = this.nfa.addState();
    this.nfa.getState(s).transitions.set(c, a);
    return { start: s, accept: a };
  }
}
