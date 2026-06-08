export type Expr =
  | { tag: "var"; name: string }
  | { tag: "abs"; param: string; body: Expr }
  | { tag: "app"; fn: Expr; arg: Expr }
  | { tag: "num"; value: number }
  | { tag: "bool"; value: boolean }
  | { tag: "if"; cond: Expr; then: Expr; else_: Expr }
  | { tag: "binop"; op: string; left: Expr; right: Expr };

export function v(name: string): Expr { return { tag: "var", name }; }
export function abs(param: string, body: Expr): Expr { return { tag: "abs", param, body }; }
export function app(fn: Expr, arg: Expr): Expr { return { tag: "app", fn, arg }; }
export function num(n: number): Expr { return { tag: "num", value: n }; }
export function bool(b: boolean): Expr { return { tag: "bool", value: b }; }
export function if_(cond: Expr, then: Expr, else_: Expr): Expr { return { tag: "if", cond, then, else_ }; }
export function binop(op: string, left: Expr, right: Expr): Expr { return { tag: "binop", op, left, right }; }

export function freeVars(expr: Expr): Set<string> {
  switch (expr.tag) {
    case "var": return new Set([expr.name]);
    case "abs": { const s = freeVars(expr.body); s.delete(expr.param); return s; }
    case "app": { const s = freeVars(expr.fn); for (const v of freeVars(expr.arg)) s.add(v); return s; }
    case "num": case "bool": return new Set();
    case "if": {
      const s = freeVars(expr.cond);
      for (const v of freeVars(expr.then)) s.add(v);
      for (const v of freeVars(expr.else_)) s.add(v);
      return s;
    }
    case "binop": {
      const s = freeVars(expr.left);
      for (const v of freeVars(expr.right)) s.add(v);
      return s;
    }
  }
}

let freshCounter = 0;
export function resetFresh(): void { freshCounter = 0; }

function freshName(base: string): string {
  return `${base}_${freshCounter++}`;
}

export function substitute(expr: Expr, name: string, replacement: Expr): Expr {
  switch (expr.tag) {
    case "var": return expr.name === name ? replacement : expr;
    case "num": case "bool": return expr;
    case "app": return app(substitute(expr.fn, name, replacement), substitute(expr.arg, name, replacement));
    case "abs": {
      if (expr.param === name) return expr;
      if (freeVars(replacement).has(expr.param)) {
        const fresh = freshName(expr.param);
        const renamed = substitute(expr.body, expr.param, v(fresh));
        return abs(fresh, substitute(renamed, name, replacement));
      }
      return abs(expr.param, substitute(expr.body, name, replacement));
    }
    case "if": return if_(substitute(expr.cond, name, replacement), substitute(expr.then, name, replacement), substitute(expr.else_, name, replacement));
    case "binop": return binop(expr.op, substitute(expr.left, name, replacement), substitute(expr.right, name, replacement));
  }
}

export function betaReduce(expr: Expr, maxSteps = 1000): Expr {
  let current = expr;
  for (let i = 0; i < maxSteps; i++) {
    const next = step(current);
    if (next === null) return current;
    current = next;
  }
  return current;
}

function step(expr: Expr): Expr | null {
  if (expr.tag === "app" && expr.fn.tag === "abs") {
    return substitute(expr.fn.body, expr.fn.param, expr.arg);
  }

  if (expr.tag === "app") {
    const fnStep = step(expr.fn);
    if (fnStep) return app(fnStep, expr.arg);
    const argStep = step(expr.arg);
    if (argStep) return app(expr.fn, argStep);
  }

  if (expr.tag === "if") {
    if (expr.cond.tag === "bool") {
      return expr.cond.value ? expr.then : expr.else_;
    }
    const condStep = step(expr.cond);
    if (condStep) return if_(condStep, expr.then, expr.else_);
  }

  if (expr.tag === "binop") {
    if (expr.left.tag === "num" && expr.right.tag === "num") {
      const l = expr.left.value;
      const r = expr.right.value;
      switch (expr.op) {
        case "+": return num(l + r);
        case "-": return num(l - r);
        case "*": return num(l * r);
        case "/": return num(Math.trunc(l / r));
        case "==": return bool(l === r);
        case "<": return bool(l < r);
        case ">": return bool(l > r);
      }
    }
    const leftStep = step(expr.left);
    if (leftStep) return binop(expr.op, leftStep, expr.right);
    const rightStep = step(expr.right);
    if (rightStep) return binop(expr.op, expr.left, rightStep);
  }

  return null;
}

export function exprToString(expr: Expr): string {
  switch (expr.tag) {
    case "var": return expr.name;
    case "num": return String(expr.value);
    case "bool": return String(expr.value);
    case "abs": return `(\\${expr.param}. ${exprToString(expr.body)})`;
    case "app": return `(${exprToString(expr.fn)} ${exprToString(expr.arg)})`;
    case "if": return `(if ${exprToString(expr.cond)} then ${exprToString(expr.then)} else ${exprToString(expr.else_)})`;
    case "binop": return `(${exprToString(expr.left)} ${expr.op} ${exprToString(expr.right)})`;
  }
}

export function isNormalForm(expr: Expr): boolean {
  return step(expr) === null;
}
