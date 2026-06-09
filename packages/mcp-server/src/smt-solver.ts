export type SMTSort = "Bool" | "Int" | "Real";

export type SMTExpr =
  | { kind: "var"; name: string; sort: SMTSort }
  | { kind: "const"; value: number | boolean }
  | { kind: "not"; arg: SMTExpr }
  | { kind: "and"; args: SMTExpr[] }
  | { kind: "or"; args: SMTExpr[] }
  | { kind: "eq"; left: SMTExpr; right: SMTExpr }
  | { kind: "lt"; left: SMTExpr; right: SMTExpr }
  | { kind: "le"; left: SMTExpr; right: SMTExpr }
  | { kind: "gt"; left: SMTExpr; right: SMTExpr }
  | { kind: "ge"; left: SMTExpr; right: SMTExpr }
  | { kind: "add"; args: SMTExpr[] }
  | { kind: "sub"; left: SMTExpr; right: SMTExpr }
  | { kind: "mul"; args: SMTExpr[] }
  | { kind: "ite"; cond: SMTExpr; then: SMTExpr; else: SMTExpr };

export type SMTModel = Map<string, number | boolean>;

export function smtVar(name: string, sort: SMTSort = "Int"): SMTExpr {
  return { kind: "var", name, sort };
}

export function smtConst(value: number | boolean): SMTExpr {
  return { kind: "const", value };
}

export function smtAnd(...args: SMTExpr[]): SMTExpr {
  return { kind: "and", args };
}

export function smtOr(...args: SMTExpr[]): SMTExpr {
  return { kind: "or", args };
}

export function smtNot(arg: SMTExpr): SMTExpr {
  return { kind: "not", arg };
}

export function smtEq(left: SMTExpr, right: SMTExpr): SMTExpr {
  return { kind: "eq", left, right };
}

export function smtLt(left: SMTExpr, right: SMTExpr): SMTExpr {
  return { kind: "lt", left, right };
}

export function smtLe(left: SMTExpr, right: SMTExpr): SMTExpr {
  return { kind: "le", left, right };
}

export function smtGt(left: SMTExpr, right: SMTExpr): SMTExpr {
  return { kind: "gt", left, right };
}

export function smtGe(left: SMTExpr, right: SMTExpr): SMTExpr {
  return { kind: "ge", left, right };
}

export function smtAdd(...args: SMTExpr[]): SMTExpr {
  return { kind: "add", args };
}

export function smtSub(left: SMTExpr, right: SMTExpr): SMTExpr {
  return { kind: "sub", left, right };
}

export function smtMul(...args: SMTExpr[]): SMTExpr {
  return { kind: "mul", args };
}

export function smtIte(cond: SMTExpr, then: SMTExpr, els: SMTExpr): SMTExpr {
  return { kind: "ite", cond, then, else: els };
}

function evaluate(expr: SMTExpr, model: SMTModel): number | boolean {
  switch (expr.kind) {
    case "var": return model.get(expr.name) ?? 0;
    case "const": return expr.value;
    case "not": return !evaluate(expr.arg, model);
    case "and": return expr.args.every((a) => !!evaluate(a, model));
    case "or": return expr.args.some((a) => !!evaluate(a, model));
    case "eq": return evaluate(expr.left, model) === evaluate(expr.right, model);
    case "lt": return (evaluate(expr.left, model) as number) < (evaluate(expr.right, model) as number);
    case "le": return (evaluate(expr.left, model) as number) <= (evaluate(expr.right, model) as number);
    case "gt": return (evaluate(expr.left, model) as number) > (evaluate(expr.right, model) as number);
    case "ge": return (evaluate(expr.left, model) as number) >= (evaluate(expr.right, model) as number);
    case "add": return expr.args.reduce((s, a) => s + (evaluate(a, model) as number), 0);
    case "sub": return (evaluate(expr.left, model) as number) - (evaluate(expr.right, model) as number);
    case "mul": return expr.args.reduce((p, a) => p * (evaluate(a, model) as number), 1);
    case "ite": return evaluate(expr.cond, model) ? evaluate(expr.then, model) : evaluate(expr.else, model);
  }
}

function collectVars(expr: SMTExpr): Map<string, SMTSort> {
  const vars = new Map<string, SMTSort>();
  const visit = (e: SMTExpr) => {
    switch (e.kind) {
      case "var": vars.set(e.name, e.sort); break;
      case "not": visit(e.arg); break;
      case "and": case "or": e.args.forEach(visit); break;
      case "eq": case "lt": case "le": case "gt": case "ge": case "sub":
        visit(e.left); visit(e.right); break;
      case "add": case "mul": e.args.forEach(visit); break;
      case "ite": visit(e.cond); visit(e.then); visit(e.else); break;
    }
  };
  visit(expr);
  return vars;
}

export class SMTSolver {
  private assertions: SMTExpr[] = [];
  private searchRange: number;

  constructor(searchRange = 10) {
    this.searchRange = searchRange;
  }

  assert(expr: SMTExpr): void {
    this.assertions.push(expr);
  }

  check(): "sat" | "unsat" | "unknown" {
    const model = this.solve();
    return model ? "sat" : "unsat";
  }

  solve(): SMTModel | null {
    const combined = smtAnd(...this.assertions);
    const vars = collectVars(combined);
    const varNames = [...vars.keys()];

    if (varNames.length === 0) {
      return evaluate(combined, new Map()) ? new Map() : null;
    }

    const model: SMTModel = new Map();
    return this.search(combined, varNames, 0, model, vars);
  }

  private search(
    formula: SMTExpr,
    vars: string[],
    idx: number,
    model: SMTModel,
    sorts: Map<string, SMTSort>
  ): SMTModel | null {
    if (idx >= vars.length) {
      return evaluate(formula, model) ? new Map(model) : null;
    }

    const name = vars[idx];
    const sort = sorts.get(name)!;

    if (sort === "Bool") {
      for (const val of [true, false]) {
        model.set(name, val);
        const result = this.search(formula, vars, idx + 1, model, sorts);
        if (result) return result;
      }
    } else {
      for (let v = -this.searchRange; v <= this.searchRange; v++) {
        model.set(name, v);
        const result = this.search(formula, vars, idx + 1, model, sorts);
        if (result) return result;
      }
    }

    return null;
  }

  eval(expr: SMTExpr, model: SMTModel): number | boolean {
    return evaluate(expr, model);
  }

  reset(): void {
    this.assertions = [];
  }

  get assertionCount(): number {
    return this.assertions.length;
  }
}
