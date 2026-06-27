export type Type =
  | { kind: "var"; name: string }
  | { kind: "const"; name: string }
  | { kind: "fn"; param: Type; ret: Type }
  | { kind: "list"; elem: Type };

export type Expr =
  | { kind: "lit"; type: "int" | "bool" | "string" }
  | { kind: "var"; name: string }
  | { kind: "abs"; param: string; body: Expr }
  | { kind: "app"; fn: Expr; arg: Expr }
  | { kind: "let"; name: string; value: Expr; body: Expr }
  | { kind: "if"; cond: Expr; then: Expr; else: Expr };

export type Subst = Map<string, Type>;

export function typeVar(name: string): Type {
  return { kind: "var", name };
}

export function typeConst(name: string): Type {
  return { kind: "const", name };
}

export function typeFn(param: Type, ret: Type): Type {
  return { kind: "fn", param, ret };
}

export function typeList(elem: Type): Type {
  return { kind: "list", elem };
}

export function freeVars(t: Type): Set<string> {
  switch (t.kind) {
    case "var": return new Set([t.name]);
    case "const": return new Set();
    case "fn": {
      const s = freeVars(t.param);
      for (const v of freeVars(t.ret)) s.add(v);
      return s;
    }
    case "list": return freeVars(t.elem);
  }
}

export function applySubst(subst: Subst, t: Type): Type {
  switch (t.kind) {
    case "var":
      return subst.has(t.name) ? applySubst(subst, subst.get(t.name)!) : t;
    case "const":
      return t;
    case "fn":
      return typeFn(applySubst(subst, t.param), applySubst(subst, t.ret));
    case "list":
      return typeList(applySubst(subst, t.elem));
  }
}

export function composeSubst(s1: Subst, s2: Subst): Subst {
  const result = new Map<string, Type>();
  for (const [k, v] of s2) {
    result.set(k, applySubst(s1, v));
  }
  for (const [k, v] of s1) {
    if (!result.has(k)) result.set(k, v);
  }
  return result;
}

export function occursIn(name: string, t: Type): boolean {
  switch (t.kind) {
    case "var": return t.name === name;
    case "const": return false;
    case "fn": return occursIn(name, t.param) || occursIn(name, t.ret);
    case "list": return occursIn(name, t.elem);
  }
}

export function unify(t1: Type, t2: Type): Subst {
  if (t1.kind === "const" && t2.kind === "const" && t1.name === t2.name) {
    return new Map();
  }
  if (t1.kind === "var") {
    if (t1.name === (t2 as any).name && t2.kind === "var") return new Map();
    if (occursIn(t1.name, t2)) throw new Error(`Occurs check: ${t1.name} in ${typeToString(t2)}`);
    return new Map([[t1.name, t2]]);
  }
  if (t2.kind === "var") {
    return unify(t2, t1);
  }
  if (t1.kind === "fn" && t2.kind === "fn") {
    const s1 = unify(t1.param, t2.param);
    const s2 = unify(applySubst(s1, t1.ret), applySubst(s1, t2.ret));
    return composeSubst(s2, s1);
  }
  if (t1.kind === "list" && t2.kind === "list") {
    return unify(t1.elem, t2.elem);
  }
  throw new Error(`Cannot unify ${typeToString(t1)} with ${typeToString(t2)}`);
}

type Env = Map<string, { type: Type; freeVars: Set<string> }>;

let varCounter = 0;

export function resetCounter(): void {
  varCounter = 0;
}

function freshVar(): Type {
  return typeVar(`t${varCounter++}`);
}

function instantiate(scheme: { type: Type; freeVars: Set<string> }): Type {
  const subst = new Map<string, Type>();
  for (const v of scheme.freeVars) {
    subst.set(v, freshVar());
  }
  return applySubst(subst, scheme.type);
}

function generalize(env: Env, t: Type): { type: Type; freeVars: Set<string> } {
  const envFree = new Set<string>();
  for (const [, scheme] of env) {
    for (const v of freeVars(scheme.type)) {
      if (!scheme.freeVars.has(v)) envFree.add(v);
    }
  }
  const free = freeVars(t);
  const quantified = new Set<string>();
  for (const v of free) {
    if (!envFree.has(v)) quantified.add(v);
  }
  return { type: t, freeVars: quantified };
}

export function infer(expr: Expr, env: Env = new Map()): { type: Type; subst: Subst } {
  switch (expr.kind) {
    case "lit": {
      const t = expr.type === "int" ? typeConst("Int") :
                expr.type === "bool" ? typeConst("Bool") : typeConst("String");
      return { type: t, subst: new Map() };
    }
    case "var": {
      const scheme = env.get(expr.name);
      if (!scheme) throw new Error(`Unbound variable: ${expr.name}`);
      return { type: instantiate(scheme), subst: new Map() };
    }
    case "abs": {
      const paramType = freshVar();
      const newEnv = new Map(env);
      newEnv.set(expr.param, { type: paramType, freeVars: new Set() });
      const { type: bodyType, subst } = infer(expr.body, newEnv);
      return { type: typeFn(applySubst(subst, paramType), bodyType), subst };
    }
    case "app": {
      const retType = freshVar();
      const { type: fnType, subst: s1 } = infer(expr.fn, env);
      const newEnv1 = applySubstEnv(s1, env);
      const { type: argType, subst: s2 } = infer(expr.arg, newEnv1);
      const s3 = unify(applySubst(s2, fnType), typeFn(argType, retType));
      return { type: applySubst(s3, retType), subst: composeSubst(s3, composeSubst(s2, s1)) };
    }
    case "let": {
      const { type: valType, subst: s1 } = infer(expr.value, env);
      const newEnv = applySubstEnv(s1, env);
      const scheme = generalize(newEnv, valType);
      newEnv.set(expr.name, scheme);
      const { type: bodyType, subst: s2 } = infer(expr.body, newEnv);
      return { type: bodyType, subst: composeSubst(s2, s1) };
    }
    case "if": {
      const { type: condType, subst: s1 } = infer(expr.cond, env);
      const s1b = unify(condType, typeConst("Bool"));
      const cs1 = composeSubst(s1b, s1);
      const { type: thenType, subst: s2 } = infer(expr.then, applySubstEnv(cs1, env));
      const cs2 = composeSubst(s2, cs1);
      const { type: elseType, subst: s3 } = infer(expr.else, applySubstEnv(cs2, env));
      const cs3 = composeSubst(s3, cs2);
      const s4 = unify(applySubst(cs3, thenType), elseType);
      return { type: applySubst(s4, elseType), subst: composeSubst(s4, cs3) };
    }
  }
}

function applySubstEnv(subst: Subst, env: Env): Env {
  const result = new Map<string, { type: Type; freeVars: Set<string> }>();
  for (const [k, v] of env) {
    result.set(k, { type: applySubst(subst, v.type), freeVars: v.freeVars });
  }
  return result;
}

export function typeToString(t: Type): string {
  switch (t.kind) {
    case "var": return t.name;
    case "const": return t.name;
    case "fn": {
      const p = t.param.kind === "fn" ? `(${typeToString(t.param)})` : typeToString(t.param);
      return `${p} -> ${typeToString(t.ret)}`;
    }
    case "list": return `[${typeToString(t.elem)}]`;
  }
}
