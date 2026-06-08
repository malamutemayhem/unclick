interface PDATransition {
  fromState: string;
  input: string;
  stackTop: string;
  toState: string;
  stackPush: string[];
}

export class PushdownAutomaton {
  private transitions: PDATransition[] = [];
  private startState: string;
  private acceptStates: Set<string>;
  private initialStack: string;

  constructor(startState: string, acceptStates: string[], initialStack = "Z") {
    this.startState = startState;
    this.acceptStates = new Set(acceptStates);
    this.initialStack = initialStack;
  }

  addTransition(
    fromState: string,
    input: string,
    stackTop: string,
    toState: string,
    stackPush: string[]
  ): void {
    this.transitions.push({ fromState, input, stackTop, toState, stackPush });
  }

  accepts(input: string): boolean {
    interface Config {
      state: string;
      pos: number;
      stack: string[];
    }

    const initial: Config = {
      state: this.startState,
      pos: 0,
      stack: [this.initialStack],
    };

    const queue: Config[] = [initial];
    let iterations = 0;
    const maxIterations = 10000;

    while (queue.length > 0 && iterations < maxIterations) {
      iterations++;
      const config = queue.shift()!;

      if (config.pos === input.length && this.acceptStates.has(config.state)) {
        return true;
      }

      for (const t of this.transitions) {
        if (t.fromState !== config.state) continue;
        if (config.stack.length === 0 || config.stack[config.stack.length - 1] !== t.stackTop) continue;

        if (t.input === "") {
          const newStack = [...config.stack];
          newStack.pop();
          newStack.push(...[...t.stackPush].reverse());
          queue.push({ state: t.toState, pos: config.pos, stack: newStack });
        } else if (config.pos < input.length && input[config.pos] === t.input) {
          const newStack = [...config.stack];
          newStack.pop();
          newStack.push(...[...t.stackPush].reverse());
          queue.push({ state: t.toState, pos: config.pos + 1, stack: newStack });
        }
      }
    }
    return false;
  }

  transitionCount(): number {
    return this.transitions.length;
  }

  stateCount(): number {
    const states = new Set<string>();
    states.add(this.startState);
    for (const s of this.acceptStates) states.add(s);
    for (const t of this.transitions) {
      states.add(t.fromState);
      states.add(t.toState);
    }
    return states.size;
  }
}
