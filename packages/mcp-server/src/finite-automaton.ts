export interface FATransition {
  from: string;
  to: string;
  on: string;
}

export interface FiniteAutomaton {
  states: Set<string>;
  alphabet: Set<string>;
  transitions: FATransition[];
  start: string;
  accept: Set<string>;
}

export function createFA(
  transitions: FATransition[],
  start: string,
  accept: string[],
): FiniteAutomaton {
  const states = new Set<string>();
  const alphabet = new Set<string>();
  for (const t of transitions) {
    states.add(t.from);
    states.add(t.to);
    alphabet.add(t.on);
  }
  states.add(start);
  for (const a of accept) states.add(a);
  return { states, alphabet, transitions, start, accept: new Set(accept) };
}

export function runDFA(fa: FiniteAutomaton, input: string): boolean {
  let current = fa.start;
  for (const ch of input) {
    const t = fa.transitions.find((tr) => tr.from === current && tr.on === ch);
    if (!t) return false;
    current = t.to;
  }
  return fa.accept.has(current);
}

export function runNFA(fa: FiniteAutomaton, input: string): boolean {
  let currentStates = new Set<string>([fa.start]);
  currentStates = epsilonClosure(fa, currentStates);

  for (const ch of input) {
    const next = new Set<string>();
    for (const state of currentStates) {
      for (const t of fa.transitions) {
        if (t.from === state && t.on === ch) {
          next.add(t.to);
        }
      }
    }
    currentStates = epsilonClosure(fa, next);
    if (currentStates.size === 0) return false;
  }

  for (const state of currentStates) {
    if (fa.accept.has(state)) return true;
  }
  return false;
}

function epsilonClosure(fa: FiniteAutomaton, states: Set<string>): Set<string> {
  const result = new Set(states);
  const stack = [...states];
  while (stack.length > 0) {
    const state = stack.pop()!;
    for (const t of fa.transitions) {
      if (t.from === state && t.on === "" && !result.has(t.to)) {
        result.add(t.to);
        stack.push(t.to);
      }
    }
  }
  return result;
}

export function accepts(fa: FiniteAutomaton, input: string): boolean {
  const hasEpsilon = fa.transitions.some((t) => t.on === "");
  return hasEpsilon ? runNFA(fa, input) : runDFA(fa, input);
}

export function getReachableStates(fa: FiniteAutomaton): Set<string> {
  const visited = new Set<string>();
  const stack = [fa.start];
  while (stack.length > 0) {
    const state = stack.pop()!;
    if (visited.has(state)) continue;
    visited.add(state);
    for (const t of fa.transitions) {
      if (t.from === state && !visited.has(t.to)) {
        stack.push(t.to);
      }
    }
  }
  return visited;
}

export function isComplete(fa: FiniteAutomaton): boolean {
  for (const state of fa.states) {
    for (const sym of fa.alphabet) {
      if (sym === "") continue;
      const has = fa.transitions.some((t) => t.from === state && t.on === sym);
      if (!has) return false;
    }
  }
  return true;
}
