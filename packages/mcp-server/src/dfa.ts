export interface DFADef {
  states: string[];
  alphabet: string[];
  transitions: Record<string, Record<string, string>>;
  start: string;
  accept: string[];
}

export class DFA {
  private states: Set<string>;
  private alphabet: Set<string>;
  private transitions: Map<string, Map<string, string>>;
  private start: string;
  private accept: Set<string>;

  constructor(def: DFADef) {
    this.states = new Set(def.states);
    this.alphabet = new Set(def.alphabet);
    this.transitions = new Map();
    for (const [state, trans] of Object.entries(def.transitions)) {
      this.transitions.set(state, new Map(Object.entries(trans)));
    }
    this.start = def.start;
    this.accept = new Set(def.accept);
  }

  accepts(input: string): boolean {
    let state = this.start;
    for (const ch of input) {
      const trans = this.transitions.get(state);
      if (!trans || !trans.has(ch)) return false;
      state = trans.get(ch)!;
    }
    return this.accept.has(state);
  }

  run(input: string): { accepted: boolean; finalState: string; path: string[] } {
    const path: string[] = [this.start];
    let state = this.start;
    for (const ch of input) {
      const trans = this.transitions.get(state);
      if (!trans || !trans.has(ch)) {
        return { accepted: false, finalState: state, path };
      }
      state = trans.get(ch)!;
      path.push(state);
    }
    return { accepted: this.accept.has(state), finalState: state, path };
  }

  complement(): DFA {
    const newAccept = [...this.states].filter((s) => !this.accept.has(s));
    return new DFA({
      states: [...this.states],
      alphabet: [...this.alphabet],
      transitions: this.transitionsToRecord(),
      start: this.start,
      accept: newAccept,
    });
  }

  isComplete(): boolean {
    for (const state of this.states) {
      const trans = this.transitions.get(state);
      if (!trans) return false;
      for (const ch of this.alphabet) {
        if (!trans.has(ch)) return false;
      }
    }
    return true;
  }

  reachableStates(): Set<string> {
    const visited = new Set<string>();
    const queue = [this.start];
    while (queue.length > 0) {
      const state = queue.shift()!;
      if (visited.has(state)) continue;
      visited.add(state);
      const trans = this.transitions.get(state);
      if (trans) {
        for (const next of trans.values()) {
          if (!visited.has(next)) queue.push(next);
        }
      }
    }
    return visited;
  }

  minimize(): DFA {
    const reachable = this.reachableStates();
    const states = [...reachable];
    const accepting = states.filter((s) => this.accept.has(s));
    const nonAccepting = states.filter((s) => !this.accept.has(s));

    let partitions: Set<string>[] = [];
    if (accepting.length > 0) partitions.push(new Set(accepting));
    if (nonAccepting.length > 0) partitions.push(new Set(nonAccepting));

    let changed = true;
    while (changed) {
      changed = false;
      const newPartitions: Set<string>[] = [];
      for (const partition of partitions) {
        const split = this.splitPartition(partition, partitions);
        if (split.length > 1) changed = true;
        newPartitions.push(...split);
      }
      partitions = newPartitions;
    }

    const stateMap = new Map<string, string>();
    const newStates: string[] = [];
    for (const partition of partitions) {
      const representative = [...partition][0];
      newStates.push(representative);
      for (const s of partition) stateMap.set(s, representative);
    }

    const newTransitions: Record<string, Record<string, string>> = {};
    for (const s of newStates) {
      const trans = this.transitions.get(s);
      if (trans) {
        newTransitions[s] = {};
        for (const [ch, next] of trans) {
          newTransitions[s][ch] = stateMap.get(next) || next;
        }
      }
    }

    return new DFA({
      states: newStates,
      alphabet: [...this.alphabet],
      transitions: newTransitions,
      start: stateMap.get(this.start) || this.start,
      accept: newStates.filter((s) => this.accept.has(s)),
    });
  }

  toDot(): string {
    const lines: string[] = ["digraph DFA {", "  rankdir=LR;"];
    lines.push(`  node [shape=doublecircle]; ${[...this.accept].join(" ")};`);
    lines.push("  node [shape=circle];");
    lines.push(`  __start__ [shape=none, label=""];`);
    lines.push(`  __start__ -> ${this.start};`);
    for (const [state, trans] of this.transitions) {
      for (const [ch, next] of trans) {
        lines.push(`  ${state} -> ${next} [label="${ch}"];`);
      }
    }
    lines.push("}");
    return lines.join("\n");
  }

  private splitPartition(partition: Set<string>, allPartitions: Set<string>[]): Set<string>[] {
    const groups = new Map<string, Set<string>>();
    for (const state of partition) {
      const key = this.partitionSignature(state, allPartitions);
      if (!groups.has(key)) groups.set(key, new Set());
      groups.get(key)!.add(state);
    }
    return [...groups.values()];
  }

  private partitionSignature(state: string, partitions: Set<string>[]): string {
    const parts: string[] = [];
    for (const ch of [...this.alphabet].sort()) {
      const trans = this.transitions.get(state);
      if (!trans || !trans.has(ch)) {
        parts.push(`${ch}:dead`);
      } else {
        const next = trans.get(ch)!;
        const idx = partitions.findIndex((p) => p.has(next));
        parts.push(`${ch}:${idx}`);
      }
    }
    return parts.join(",");
  }

  private transitionsToRecord(): Record<string, Record<string, string>> {
    const result: Record<string, Record<string, string>> = {};
    for (const [state, trans] of this.transitions) {
      result[state] = Object.fromEntries(trans);
    }
    return result;
  }
}

export function fromRegexLike(pattern: string, alphabet: string[]): DFA {
  const states = ["q0", "q1", "dead"];
  const transitions: Record<string, Record<string, string>> = {
    q0: {}, q1: {}, dead: {},
  };
  for (const ch of alphabet) {
    transitions.q0[ch] = pattern.includes(ch) ? "q1" : "dead";
    transitions.q1[ch] = "q1";
    transitions.dead[ch] = "dead";
  }
  return new DFA({ states, alphabet, transitions, start: "q0", accept: ["q1"] });
}
