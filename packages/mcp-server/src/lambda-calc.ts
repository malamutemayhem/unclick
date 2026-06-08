export type LambdaTerm =
  | { kind: "var"; name: string }
  | { kind: "abs"; param: string; body: LambdaTerm }
  | { kind: "app"; func: LambdaTerm; arg: LambdaTerm };

export class LambdaCalculus {
  static variable(name: string): LambdaTerm {
    return { kind: "var", name };
  }

  static abstraction(param: string, body: LambdaTerm): LambdaTerm {
    return { kind: "abs", param, body };
  }

  static application(func: LambdaTerm, arg: LambdaTerm): LambdaTerm {
    return { kind: "app", func, arg };
  }

  static toString(term: LambdaTerm): string {
    switch (term.kind) {
      case "var": return term.name;
      case "abs": return `(\\${term.param}.${this.toString(term.body)})`;
      case "app": return `(${this.toString(term.func)} ${this.toString(term.arg)})`;
    }
  }

  static freeVars(term: LambdaTerm): Set<string> {
    switch (term.kind) {
      case "var": return new Set([term.name]);
      case "abs": {
        const free = this.freeVars(term.body);
        free.delete(term.param);
        return free;
      }
      case "app": {
        const free = this.freeVars(term.func);
        for (const v of this.freeVars(term.arg)) free.add(v);
        return free;
      }
    }
  }

  private static freshVar(avoid: Set<string>, base: string): string {
    let name = base;
    let i = 0;
    while (avoid.has(name)) { name = `${base}${i++}`; }
    return name;
  }

  static substitute(term: LambdaTerm, variable: string, replacement: LambdaTerm): LambdaTerm {
    switch (term.kind) {
      case "var":
        return term.name === variable ? replacement : term;
      case "abs":
        if (term.param === variable) return term;
        if (this.freeVars(replacement).has(term.param)) {
          const allVars = new Set([...this.freeVars(term.body), ...this.freeVars(replacement)]);
          const fresh = this.freshVar(allVars, term.param);
          const renamedBody = this.substitute(term.body, term.param, this.variable(fresh));
          return this.abstraction(fresh, this.substitute(renamedBody, variable, replacement));
        }
        return this.abstraction(term.param, this.substitute(term.body, variable, replacement));
      case "app":
        return this.application(
          this.substitute(term.func, variable, replacement),
          this.substitute(term.arg, variable, replacement)
        );
    }
  }

  static betaReduce(term: LambdaTerm): LambdaTerm | null {
    if (term.kind === "app" && term.func.kind === "abs") {
      return this.substitute(term.func.body, term.func.param, term.arg);
    }
    return null;
  }

  static normalize(term: LambdaTerm, maxSteps: number = 100): LambdaTerm {
    let current = term;
    for (let i = 0; i < maxSteps; i++) {
      const reduced = this.reduceOnce(current);
      if (reduced === null) return current;
      current = reduced;
    }
    return current;
  }

  private static reduceOnce(term: LambdaTerm): LambdaTerm | null {
    const beta = this.betaReduce(term);
    if (beta !== null) return beta;
    if (term.kind === "abs") {
      const bodyReduced = this.reduceOnce(term.body);
      if (bodyReduced !== null) return this.abstraction(term.param, bodyReduced);
    }
    if (term.kind === "app") {
      const funcReduced = this.reduceOnce(term.func);
      if (funcReduced !== null) return this.application(funcReduced, term.arg);
      const argReduced = this.reduceOnce(term.arg);
      if (argReduced !== null) return this.application(term.func, argReduced);
    }
    return null;
  }

  static churchNumeral(n: number): LambdaTerm {
    let body: LambdaTerm = this.variable("x");
    for (let i = 0; i < n; i++) {
      body = this.application(this.variable("f"), body);
    }
    return this.abstraction("f", this.abstraction("x", body));
  }

  static isAlphaEquivalent(a: LambdaTerm, b: LambdaTerm): boolean {
    return this.toDebruijn(a) === this.toDebruijn(b);
  }

  private static toDebruijn(term: LambdaTerm, env: string[] = []): string {
    switch (term.kind) {
      case "var": {
        const idx = env.indexOf(term.name);
        return idx >= 0 ? String(idx) : term.name;
      }
      case "abs":
        return `L${this.toDebruijn(term.body, [term.param, ...env])}`;
      case "app":
        return `(${this.toDebruijn(term.func, env)} ${this.toDebruijn(term.arg, env)})`;
    }
  }
}
