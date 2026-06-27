export type Term =
  | { kind: "atom"; name: string }
  | { kind: "var"; name: string }
  | { kind: "compound"; functor: string; args: Term[] }
  | { kind: "num"; value: number };

export function atom(name: string): Term {
  return { kind: "atom", name };
}

export function variable(name: string): Term {
  return { kind: "var", name };
}

export function compound(functor: string, ...args: Term[]): Term {
  return { kind: "compound", functor, args };
}

export function num(value: number): Term {
  return { kind: "num", value };
}

export type Substitution = Map<string, Term>;

export function emptySubst(): Substitution {
  return new Map();
}

function walk(t: Term, subst: Substitution): Term {
  if (t.kind === "var") {
    const bound = subst.get(t.name);
    if (bound) return walk(bound, subst);
  }
  return t;
}

function occursIn(varName: string, t: Term, subst: Substitution): boolean {
  const resolved = walk(t, subst);
  if (resolved.kind === "var") return resolved.name === varName;
  if (resolved.kind === "compound") {
    return resolved.args.some((a) => occursIn(varName, a, subst));
  }
  return false;
}

export function unify(a: Term, b: Term, subst: Substitution = emptySubst()): Substitution | null {
  const ra = walk(a, subst);
  const rb = walk(b, subst);

  if (ra.kind === "var" && rb.kind === "var" && ra.name === rb.name) return subst;
  if (ra.kind === "var") {
    if (occursIn(ra.name, rb, subst)) return null;
    const s = new Map(subst);
    s.set(ra.name, rb);
    return s;
  }
  if (rb.kind === "var") {
    if (occursIn(rb.name, ra, subst)) return null;
    const s = new Map(subst);
    s.set(rb.name, ra);
    return s;
  }
  if (ra.kind === "atom" && rb.kind === "atom" && ra.name === rb.name) return subst;
  if (ra.kind === "num" && rb.kind === "num" && ra.value === rb.value) return subst;
  if (ra.kind === "compound" && rb.kind === "compound" && ra.functor === rb.functor && ra.args.length === rb.args.length) {
    let s: Substitution | null = subst;
    for (let i = 0; i < ra.args.length; i++) {
      s = unify(ra.args[i], rb.args[i], s);
      if (!s) return null;
    }
    return s;
  }
  return null;
}

export function resolve(t: Term, subst: Substitution): Term {
  const resolved = walk(t, subst);
  if (resolved.kind === "compound") {
    return { kind: "compound", functor: resolved.functor, args: resolved.args.map((a) => resolve(a, subst)) };
  }
  return resolved;
}

export function termToString(t: Term): string {
  switch (t.kind) {
    case "atom": return t.name;
    case "var": return t.name;
    case "num": return String(t.value);
    case "compound": return `${t.functor}(${t.args.map(termToString).join(", ")})`;
  }
}

export interface Clause {
  head: Term;
  body: Term[];
}

export function fact(head: Term): Clause {
  return { head, body: [] };
}

export function rule(head: Term, ...body: Term[]): Clause {
  return { head, body };
}

let varCounter = 0;

function renameCopy(clause: Clause): Clause {
  const suffix = `_${varCounter++}`;
  const rename = (t: Term): Term => {
    if (t.kind === "var") return variable(t.name + suffix);
    if (t.kind === "compound") return compound(t.functor, ...t.args.map(rename));
    return t;
  };
  return { head: rename(clause.head), body: clause.body.map(rename) };
}

export function* query(program: Clause[], goals: Term[], subst: Substitution = emptySubst()): Generator<Substitution> {
  if (goals.length === 0) {
    yield subst;
    return;
  }

  const [goal, ...rest] = goals;

  for (const clause of program) {
    const fresh = renameCopy(clause);
    const s = unify(goal, fresh.head, subst);
    if (s !== null) {
      yield* query(program, [...fresh.body, ...rest], s);
    }
  }
}

export function queryAll(program: Clause[], goals: Term[], limit = 100): Substitution[] {
  const results: Substitution[] = [];
  for (const s of query(program, goals)) {
    results.push(s);
    if (results.length >= limit) break;
  }
  return results;
}

export function resetVarCounter(): void {
  varCounter = 0;
}
