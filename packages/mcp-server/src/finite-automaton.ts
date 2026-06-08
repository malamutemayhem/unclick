export interface DFAConfig {
  states: string[];
  alphabet: string[];
  transitions: Record<string, Record<string, string>>;
  startState: string;
  acceptStates: string[];
}

export class DFA {
  private config: DFAConfig;

  constructor(config: DFAConfig) { this.config = config; }

  accepts(input: string): boolean {
    let current = this.config.startState;
    for (const char of input) {
      const next = this.config.transitions[current]?.[char];
      if (!next) return false;
      current = next;
    }
    return this.config.acceptStates.includes(current);
  }

  run(input: string): { accepted: boolean; finalState: string; path: string[] } {
    let current = this.config.startState;
    const path = [current];
    for (const char of input) {
      const next = this.config.transitions[current]?.[char];
      if (!next) return { accepted: false, finalState: current, path };
      current = next;
      path.push(current);
    }
    return { accepted: this.config.acceptStates.includes(current), finalState: current, path };
  }
}

export function buildRegexDFA(pattern: string): DFA {
  const states: string[] = [];
  const transitions: Record<string, Record<string, string>> = {};
  const acceptStates: string[] = [];

  for (let i = 0; i <= pattern.length; i++) {
    const state = `s${i}`;
    states.push(state);
    transitions[state] = {};
  }

  for (let i = 0; i < pattern.length; i++) {
    const char = pattern[i];
    transitions[`s${i}`][char] = `s${i + 1}`;
  }

  acceptStates.push(`s${pattern.length}`);

  return new DFA({
    states,
    alphabet: [...new Set(pattern.split(""))],
    transitions,
    startState: "s0",
    acceptStates,
  });
}
