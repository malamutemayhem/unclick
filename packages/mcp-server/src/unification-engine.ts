export type Term =
  | { kind: "var"; name: string }
  | { kind: "const"; value: string }
  | { kind: "compound"; functor: string; args: Term[] };

export function variable(name: string): Term {
  return { kind: "var", name };
}

export function constant(value: string): Term {
  return { kind: "const", value };
}

export function compound(functor: string, ...args: Term[]): Term {
  return { kind: "compound", functor, args };
}

export type Binding = Map<string, Term>;

export function unify(t1: Term, t2: Term, bindings: Binding = new Map()): Binding | null {
  const a = walk(t1, bindings);
  const b = walk(t2, bindings);

  if (a.kind === "var" && b.kind === "var" && a.name === b.name) return bindings;
  if (a.kind === "var") {
    if (occursIn(a.name, b, bindings)) return null;
    const result = new Map(bindings);
    result.set(a.name, b);
    return result;
  }
  if (b.kind === "var") return unify(b, a, bindings);
  if (a.kind === "const" && b.kind === "const") {
    return a.value === b.value ? bindings : null;
  }
  if (a.kind === "compound" && b.kind === "compound") {
    if (a.functor !== b.functor || a.args.length !== b.args.length) return null;
    let current: Binding | null = bindings;
    for (let i = 0; i < a.args.length; i++) {
      current = unify(a.args[i], b.args[i], current);
      if (current === null) return null;
    }
    return current;
  }
  return null;
}

export function walk(term: Term, bindings: Binding): Term {
  if (term.kind === "var") {
    const bound = bindings.get(term.name);
    if (bound) return walk(bound, bindings);
  }
  return term;
}

export function deepWalk(term: Term, bindings: Binding): Term {
  const walked = walk(term, bindings);
  if (walked.kind === "compound") {
    return compound(walked.functor, ...walked.args.map((a) => deepWalk(a, bindings)));
  }
  return walked;
}

export function occursIn(name: string, term: Term, bindings: Binding): boolean {
  const walked = walk(term, bindings);
  if (walked.kind === "var") return walked.name === name;
  if (walked.kind === "compound") {
    return walked.args.some((a) => occursIn(name, a, bindings));
  }
  return false;
}

export function termToString(term: Term, bindings?: Binding): string {
  const t = bindings ? deepWalk(term, bindings) : term;
  switch (t.kind) {
    case "var": return `?${t.name}`;
    case "const": return t.value;
    case "compound":
      if (t.args.length === 0) return t.functor;
      return `${t.functor}(${t.args.map((a) => termToString(a, bindings)).join(", ")})`;
  }
}

export function termEquals(a: Term, b: Term): boolean {
  if (a.kind !== b.kind) return false;
  if (a.kind === "var" && b.kind === "var") return a.name === b.name;
  if (a.kind === "const" && b.kind === "const") return a.value === b.value;
  if (a.kind === "compound" && b.kind === "compound") {
    return a.functor === b.functor &&
      a.args.length === b.args.length &&
      a.args.every((arg, i) => termEquals(arg, b.args[i]));
  }
  return false;
}

export function freeVars(term: Term, bindings: Binding = new Map()): Set<string> {
  const walked = walk(term, bindings);
  if (walked.kind === "var") return new Set([walked.name]);
  if (walked.kind === "compound") {
    const result = new Set<string>();
    for (const arg of walked.args) {
      for (const v of freeVars(arg, bindings)) result.add(v);
    }
    return result;
  }
  return new Set();
}

export function substitute(term: Term, bindings: Binding): Term {
  return deepWalk(term, bindings);
}

export class UnificationEngine {
  private bindings: Binding = new Map();

  unify(t1: Term, t2: Term): boolean {
    const result = unify(t1, t2, this.bindings);
    if (result) {
      this.bindings = result;
      return true;
    }
    return false;
  }

  resolve(term: Term): Term {
    return deepWalk(term, this.bindings);
  }

  getBinding(name: string): Term | undefined {
    const v = variable(name);
    const walked = walk(v, this.bindings);
    return walked.kind === "var" && walked.name === name ? undefined : deepWalk(walked, this.bindings);
  }

  reset(): void {
    this.bindings = new Map();
  }

  get bindingCount(): number {
    return this.bindings.size;
  }
}
