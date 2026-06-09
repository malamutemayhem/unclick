import { stampMeta, ConnectorMeta } from "./connector-meta.js";

interface State {
  len: number;
  link: number;
  next: Map<string, number>;
}

export async function suffixAutomaton(args: Record<string, unknown>) {
  const text = args.text as string;
  if (typeof text !== "string" || text.length === 0) {
    throw new Error("text must be a non-empty string");
  }
  if (text.length > 100_000) {
    throw new Error("text length must be at most 100,000");
  }

  const states: State[] = [{ len: 0, link: -1, next: new Map() }];
  let last = 0;

  for (const ch of text) {
    const cur = states.length;
    states.push({ len: states[last].len + 1, link: -1, next: new Map() });
    let p = last;
    while (p !== -1 && !states[p].next.has(ch)) {
      states[p].next.set(ch, cur);
      p = states[p].link;
    }
    if (p === -1) {
      states[cur].link = 0;
    } else {
      const q = states[p].next.get(ch)!;
      if (states[p].len + 1 === states[q].len) {
        states[cur].link = q;
      } else {
        const clone = states.length;
        states.push({
          len: states[p].len + 1,
          link: states[q].link,
          next: new Map(states[q].next),
        });
        while (p !== -1 && states[p].next.get(ch) === q) {
          states[p].next.set(ch, clone);
          p = states[p].link;
        }
        states[q].link = clone;
        states[cur].link = clone;
      }
    }
    last = cur;
  }

  let distinctSubstrings = 0;
  for (let i = 1; i < states.length; i++) {
    distinctSubstrings += states[i].len - states[states[i].link].len;
  }

  const meta: ConnectorMeta = {
    source: "local-computation",
    fetched_at: new Date().toISOString(),
    next_steps: ["Use suffix automaton for substring counting and pattern matching"],
  };

  return stampMeta(
    {
      text_length: text.length,
      state_count: states.length,
      distinct_substrings: distinctSubstrings,
    },
    meta,
  );
}
