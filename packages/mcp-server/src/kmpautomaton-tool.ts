import { stampMeta, ConnectorMeta } from "./connector-meta.js";

/**
 * Build the full KMP automaton (DFA) for a pattern over a given alphabet.
 * Returns a transition table suitable for streaming / single-pass matching.
 *
 * transitions[state][charIndex] gives the next state.
 * State `m` (pattern length) is the accept state.
 */
export async function kmpAutomaton(args: Record<string, unknown>) {
  const pattern = args.pattern as string;
  if (typeof pattern !== "string" || pattern.length === 0) {
    throw new Error("pattern must be a non-empty string");
  }
  if (pattern.length > 1000) {
    throw new Error("pattern length must be at most 1000");
  }

  const alphabet =
    typeof args.alphabet === "string" && args.alphabet.length > 0
      ? args.alphabet
      : "abcdefghijklmnopqrstuvwxyz";

  if (alphabet.length > 256) {
    throw new Error("alphabet length must be at most 256");
  }

  const m = pattern.length;
  const alphaSize = alphabet.length;

  // Map characters to indices
  const charIndex = new Map<string, number>();
  for (let i = 0; i < alphaSize; i++) {
    charIndex.set(alphabet[i], i);
  }

  // Build failure function first
  const fail = new Array<number>(m + 1).fill(0);
  for (let i = 1; i < m; i++) {
    let j = fail[i];
    while (j > 0 && pattern[j] !== pattern[i]) j = fail[j];
    fail[i + 1] = pattern[j] === pattern[i] ? j + 1 : 0;
  }

  // Build DFA transitions: states 0..m, alphabet indices 0..alphaSize-1
  const transitions: number[][] = [];
  for (let state = 0; state <= m; state++) {
    const row = new Array<number>(alphaSize).fill(0);
    for (let c = 0; c < alphaSize; c++) {
      const ch = alphabet[c];
      let s = state;
      // Follow failure links until we can extend or reach 0
      while (s > 0 && (s >= m || pattern[s] !== ch)) {
        s = fail[s];
      }
      if (pattern[s] === ch) {
        row[c] = s + 1;
      } else {
        row[c] = 0;
      }
    }
    transitions.push(row);
  }

  const meta: ConnectorMeta = {
    source: "local-computation",
    fetched_at: new Date().toISOString(),
    next_steps: [
      "Feed text character by character; transition from state 0; reaching accept_state means a match",
      "Each transition is O(1), total matching is O(n) for text of length n",
    ],
  };

  return stampMeta(
    {
      pattern,
      alphabet,
      states: m + 1,
      transitions,
      accept_state: m,
    },
    meta,
  );
}
