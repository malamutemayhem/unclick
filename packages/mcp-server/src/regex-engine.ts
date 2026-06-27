interface NFAState {
  id: number;
  transitions: Map<string, NFAState[]>;
  epsilon: NFAState[];
  accepting: boolean;
}

let stateCounter = 0;

function createState(accepting = false): NFAState {
  return { id: stateCounter++, transitions: new Map(), epsilon: [], accepting };
}

interface Fragment {
  start: NFAState;
  end: NFAState;
}

function charFragment(ch: string): Fragment {
  const start = createState();
  const end = createState();
  start.transitions.set(ch, [end]);
  return { start, end };
}

const DOT_WILDCARD = "\x00DOT";

function dotFragment(): Fragment {
  const start = createState();
  const end = createState();
  start.transitions.set(DOT_WILDCARD, [end]);
  return { start, end };
}

function concatFragments(a: Fragment, b: Fragment): Fragment {
  a.end.epsilon.push(b.start);
  return { start: a.start, end: b.end };
}

function alternateFragments(a: Fragment, b: Fragment): Fragment {
  const start = createState();
  const end = createState();
  start.epsilon.push(a.start, b.start);
  a.end.epsilon.push(end);
  b.end.epsilon.push(end);
  return { start, end };
}

function starFragment(a: Fragment): Fragment {
  const start = createState();
  const end = createState();
  start.epsilon.push(a.start, end);
  a.end.epsilon.push(a.start, end);
  return { start, end };
}

function plusFragment(a: Fragment): Fragment {
  const start = createState();
  const end = createState();
  start.epsilon.push(a.start);
  a.end.epsilon.push(a.start, end);
  return { start, end };
}

function questionFragment(a: Fragment): Fragment {
  const start = createState();
  const end = createState();
  start.epsilon.push(a.start, end);
  a.end.epsilon.push(end);
  return { start, end };
}

function parse(pattern: string): Fragment {
  let pos = 0;

  function parseAlternation(): Fragment {
    let left = parseConcatenation();
    while (pos < pattern.length && pattern[pos] === "|") {
      pos++;
      const right = parseConcatenation();
      left = alternateFragments(left, right);
    }
    return left;
  }

  function parseConcatenation(): Fragment {
    let result: Fragment | null = null;
    while (pos < pattern.length && pattern[pos] !== ")" && pattern[pos] !== "|") {
      let atom = parseAtom();
      if (pos < pattern.length) {
        if (pattern[pos] === "*") { pos++; atom = starFragment(atom); }
        else if (pattern[pos] === "+") { pos++; atom = plusFragment(atom); }
        else if (pattern[pos] === "?") { pos++; atom = questionFragment(atom); }
      }
      result = result ? concatFragments(result, atom) : atom;
    }
    if (!result) {
      const s = createState();
      return { start: s, end: s };
    }
    return result;
  }

  function parseAtom(): Fragment {
    if (pattern[pos] === "(") {
      pos++;
      const frag = parseAlternation();
      pos++;
      return frag;
    }
    if (pattern[pos] === ".") {
      pos++;
      return dotFragment();
    }
    if (pattern[pos] === "\\") {
      pos++;
      const ch = pattern[pos++];
      return charFragment(ch);
    }
    return charFragment(pattern[pos++]);
  }

  return parseAlternation();
}

function epsilonClosure(states: Set<NFAState>): Set<NFAState> {
  const stack = [...states];
  const closure = new Set(states);
  while (stack.length > 0) {
    const state = stack.pop()!;
    for (const next of state.epsilon) {
      if (!closure.has(next)) {
        closure.add(next);
        stack.push(next);
      }
    }
  }
  return closure;
}

function step(states: Set<NFAState>, ch: string): Set<NFAState> {
  const next = new Set<NFAState>();
  for (const state of states) {
    const targets = state.transitions.get(ch) ?? [];
    for (const t of targets) next.add(t);
    const dotTargets = state.transitions.get(DOT_WILDCARD) ?? [];
    for (const t of dotTargets) next.add(t);
  }
  return epsilonClosure(next);
}

export function compile(pattern: string): (input: string) => boolean {
  stateCounter = 0;
  const fragment = parse(pattern);
  fragment.end.accepting = true;

  return (input: string): boolean => {
    let current = epsilonClosure(new Set([fragment.start]));
    for (const ch of input) {
      current = step(current, ch);
      if (current.size === 0) return false;
    }
    for (const state of current) {
      if (state.accepting) return true;
    }
    return false;
  };
}

export function test(pattern: string, input: string): boolean {
  return compile(pattern)(input);
}

export function findFirst(
  pattern: string,
  input: string,
): { match: string; index: number } | null {
  const matcher = compile(pattern);
  for (let i = 0; i < input.length; i++) {
    for (let len = 1; len <= input.length - i; len++) {
      const sub = input.substring(i, i + len);
      if (matcher(sub)) {
        return { match: sub, index: i };
      }
    }
  }
  return null;
}

export function findAll(
  pattern: string,
  input: string,
): { match: string; index: number }[] {
  const results: { match: string; index: number }[] = [];
  const matcher = compile(pattern);
  let i = 0;
  while (i < input.length) {
    let longest: { match: string; index: number } | null = null;
    for (let len = 1; len <= input.length - i; len++) {
      const sub = input.substring(i, i + len);
      if (matcher(sub)) {
        longest = { match: sub, index: i };
      }
    }
    if (longest) {
      results.push(longest);
      i += longest.match.length;
    } else {
      i++;
    }
  }
  return results;
}
