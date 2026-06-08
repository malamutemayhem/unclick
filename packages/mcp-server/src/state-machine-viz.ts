interface Transition {
  from: string;
  to: string;
  event: string;
  guard?: string;
  action?: string;
}

export class StateMachineViz {
  private states = new Set<string>();
  private transitions: Transition[] = [];
  private initialState: string;
  private currentState: string;
  private finalStates = new Set<string>();
  private history: string[] = [];

  constructor(initialState: string) {
    this.initialState = initialState;
    this.currentState = initialState;
    this.states.add(initialState);
    this.history.push(initialState);
  }

  addState(name: string, isFinal: boolean = false): this {
    this.states.add(name);
    if (isFinal) this.finalStates.add(name);
    return this;
  }

  addTransition(from: string, event: string, to: string, options?: { guard?: string; action?: string }): this {
    this.states.add(from);
    this.states.add(to);
    this.transitions.push({ from, to, event, guard: options?.guard, action: options?.action });
    return this;
  }

  send(event: string): boolean {
    const transition = this.transitions.find(
      (t) => t.from === this.currentState && t.event === event
    );
    if (!transition) return false;
    this.currentState = transition.to;
    this.history.push(this.currentState);
    return true;
  }

  get state(): string {
    return this.currentState;
  }

  get isInFinalState(): boolean {
    return this.finalStates.has(this.currentState);
  }

  getAvailableEvents(): string[] {
    return this.transitions
      .filter((t) => t.from === this.currentState)
      .map((t) => t.event);
  }

  getHistory(): string[] {
    return [...this.history];
  }

  reset(): void {
    this.currentState = this.initialState;
    this.history = [this.initialState];
  }

  toDot(): string {
    const lines: string[] = ["digraph StateMachine {", "  rankdir=LR;"];
    if (this.finalStates.size > 0) {
      lines.push(`  node [shape=doublecircle]; ${[...this.finalStates].map((s) => `"${s}"`).join(" ")};`);
    }
    lines.push("  node [shape=circle];");
    lines.push(`  "" [shape=point];`);
    lines.push(`  "" -> "${this.initialState}";`);
    for (const t of this.transitions) {
      let label = t.event;
      if (t.guard) label += ` [${t.guard}]`;
      if (t.action) label += ` / ${t.action}`;
      lines.push(`  "${t.from}" -> "${t.to}" [label="${label}"];`);
    }
    lines.push("}");
    return lines.join("\n");
  }

  toMermaid(): string {
    const lines: string[] = ["stateDiagram-v2"];
    lines.push(`  [*] --> ${this.initialState}`);
    for (const t of this.transitions) {
      lines.push(`  ${t.from} --> ${t.to} : ${t.event}`);
    }
    for (const f of this.finalStates) {
      lines.push(`  ${f} --> [*]`);
    }
    return lines.join("\n");
  }

  get stateCount(): number {
    return this.states.size;
  }

  get transitionCount(): number {
    return this.transitions.length;
  }
}
