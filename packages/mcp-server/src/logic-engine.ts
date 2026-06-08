export type Term = Atom | Variable | Compound;

export interface Atom {
  type: "atom";
  name: string;
}

export interface Variable {
  type: "variable";
  name: string;
}

export interface Compound {
  type: "compound";
  functor: string;
  args: Term[];
}

export type Substitution = Map<string, Term>;

export function atom(name: string): Atom {
  return { type: "atom", name };
}

export function variable(name: string): Variable {
  return { type: "variable", name };
}

export function compound(functor: string, ...args: Term[]): Compound {
  return { type: "compound", functor, args };
}

export function unify(a: Term, b: Term, subst: Substitution = new Map()): Substitution | null {
  a = walk(a, subst);
  b = walk(b, subst);

  if (a.type === "variable") {
    if (a.type === b.type && a.name === b.name) return subst;
    if (occursIn(a.name, b, subst)) return null;
    const result = new Map(subst);
    result.set(a.name, b);
    return result;
  }

  if (b.type === "variable") {
    return unify(b, a, subst);
  }

  if (a.type === "atom" && b.type === "atom") {
    return a.name === b.name ? subst : null;
  }

  if (a.type === "compound" && b.type === "compound") {
    if (a.functor !== b.functor || a.args.length !== b.args.length) return null;
    let current: Substitution | null = subst;
    for (let i = 0; i < a.args.length; i++) {
      current = unify(a.args[i], b.args[i], current);
      if (current === null) return null;
    }
    return current;
  }

  return null;
}

function walk(term: Term, subst: Substitution): Term {
  if (term.type === "variable" && subst.has(term.name)) {
    return walk(subst.get(term.name)!, subst);
  }
  return term;
}

function occursIn(varName: string, term: Term, subst: Substitution): boolean {
  term = walk(term, subst);
  if (term.type === "variable") return term.name === varName;
  if (term.type === "atom") return false;
  return term.args.some((arg) => occursIn(varName, arg, subst));
}

export function resolve(term: Term, subst: Substitution): Term {
  term = walk(term, subst);
  if (term.type === "variable") return term;
  if (term.type === "atom") return term;
  return compound(term.functor, ...term.args.map((a) => resolve(a, subst)));
}

export function termToString(term: Term): string {
  if (term.type === "atom") return term.name;
  if (term.type === "variable") return term.name;
  if (term.args.length === 0) return `${term.functor}()`;
  return `${term.functor}(${term.args.map(termToString).join(", ")})`;
}

export interface Rule {
  head: Term;
  body: Term[];
}

export function rule(head: Term, ...body: Term[]): Rule {
  return { head, body };
}

export function fact(term: Term): Rule {
  return { head: term, body: [] };
}

export class LogicEngine {
  private rules: Rule[] = [];
  private nextVarId = 0;

  addRule(r: Rule): void {
    this.rules.push(r);
  }

  addFact(term: Term): void {
    this.rules.push(fact(term));
  }

  query(goal: Term): Substitution[] {
    return this.solve([goal], new Map());
  }

  queryAll(goals: Term[]): Substitution[] {
    return this.solve(goals, new Map());
  }

  private solve(goals: Term[], subst: Substitution): Substitution[] {
    if (goals.length === 0) return [subst];

    const [goal, ...rest] = goals;
    const results: Substitution[] = [];

    for (const r of this.rules) {
      const renamed = this.renameVars(r);
      const s = unify(goal, renamed.head, new Map(subst));
      if (s !== null) {
        const newGoals = [...renamed.body, ...rest];
        results.push(...this.solve(newGoals, s));
      }
    }

    return results;
  }

  private renameVars(r: Rule): Rule {
    const mapping = new Map<string, string>();
    const rename = (term: Term): Term => {
      if (term.type === "variable") {
        if (!mapping.has(term.name)) {
          mapping.set(term.name, `_${this.nextVarId++}`);
        }
        return variable(mapping.get(term.name)!);
      }
      if (term.type === "atom") return term;
      return compound(term.functor, ...term.args.map(rename));
    };
    return {
      head: rename(r.head),
      body: r.body.map(rename),
    };
  }
}

export function parseTerm(input: string): Term {
  input = input.trim();
  const parenIdx = input.indexOf("(");
  if (parenIdx === -1) {
    if (input[0] >= "A" && input[0] <= "Z") return variable(input);
    return atom(input);
  }
  const functor = input.slice(0, parenIdx);
  const argsStr = input.slice(parenIdx + 1, -1);
  const args = splitArgs(argsStr).map(parseTerm);
  return compound(functor, ...args);
}

function splitArgs(s: string): string[] {
  const args: string[] = [];
  let depth = 0;
  let current = "";
  for (const ch of s) {
    if (ch === "(") depth++;
    if (ch === ")") depth--;
    if (ch === "," && depth === 0) {
      args.push(current.trim());
      current = "";
    } else {
      current += ch;
    }
  }
  if (current.trim()) args.push(current.trim());
  return args;
}
