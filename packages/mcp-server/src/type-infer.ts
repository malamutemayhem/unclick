export type Type =
  | { kind: "int" }
  | { kind: "bool" }
  | { kind: "string" }
  | { kind: "fn"; param: Type; ret: Type }
  | { kind: "var"; id: number }
  | { kind: "list"; elem: Type };

let nextId = 0;
export function freshVar(): Type {
  return { kind: "var", id: nextId++ };
}

export function resetIds(): void {
  nextId = 0;
}

export const INT: Type = { kind: "int" };
export const BOOL: Type = { kind: "bool" };
export const STRING: Type = { kind: "string" };

export function fnType(param: Type, ret: Type): Type {
  return { kind: "fn", param, ret };
}

export function listType(elem: Type): Type {
  return { kind: "list", elem };
}

export type Substitution = Map<number, Type>;

export function emptySubst(): Substitution {
  return new Map();
}

export function apply(subst: Substitution, t: Type): Type {
  switch (t.kind) {
    case "int":
    case "bool":
    case "string":
      return t;
    case "var": {
      const bound = subst.get(t.id);
      if (bound) return apply(subst, bound);
      return t;
    }
    case "fn":
      return { kind: "fn", param: apply(subst, t.param), ret: apply(subst, t.ret) };
    case "list":
      return { kind: "list", elem: apply(subst, t.elem) };
  }
}

function occursIn(id: number, t: Type, subst: Substitution): boolean {
  const resolved = apply(subst, t);
  switch (resolved.kind) {
    case "var": return resolved.id === id;
    case "fn": return occursIn(id, resolved.param, subst) || occursIn(id, resolved.ret, subst);
    case "list": return occursIn(id, resolved.elem, subst);
    default: return false;
  }
}

export function unify(a: Type, b: Type, subst: Substitution = emptySubst()): Substitution {
  const ra = apply(subst, a);
  const rb = apply(subst, b);

  if (ra.kind === "var" && rb.kind === "var" && ra.id === rb.id) return subst;

  if (ra.kind === "var") {
    if (occursIn(ra.id, rb, subst)) throw new Error("Infinite type");
    subst.set(ra.id, rb);
    return subst;
  }

  if (rb.kind === "var") {
    if (occursIn(rb.id, ra, subst)) throw new Error("Infinite type");
    subst.set(rb.id, ra);
    return subst;
  }

  if (ra.kind === "int" && rb.kind === "int") return subst;
  if (ra.kind === "bool" && rb.kind === "bool") return subst;
  if (ra.kind === "string" && rb.kind === "string") return subst;

  if (ra.kind === "fn" && rb.kind === "fn") {
    const s1 = unify(ra.param, rb.param, subst);
    return unify(ra.ret, rb.ret, s1);
  }

  if (ra.kind === "list" && rb.kind === "list") {
    return unify(ra.elem, rb.elem, subst);
  }

  throw new Error(`Cannot unify ${typeToString(ra)} with ${typeToString(rb)}`);
}

export function typeToString(t: Type): string {
  switch (t.kind) {
    case "int": return "Int";
    case "bool": return "Bool";
    case "string": return "String";
    case "var": return `t${t.id}`;
    case "fn": {
      const p = t.param.kind === "fn" ? `(${typeToString(t.param)})` : typeToString(t.param);
      return `${p} -> ${typeToString(t.ret)}`;
    }
    case "list": return `[${typeToString(t.elem)}]`;
  }
}

export type Expr =
  | { tag: "lit"; type: "int" | "bool" | "string" }
  | { tag: "var"; name: string }
  | { tag: "app"; fn: Expr; arg: Expr }
  | { tag: "lam"; param: string; body: Expr }
  | { tag: "let"; name: string; value: Expr; body: Expr };

export type TypeEnv = Map<string, Type>;

export function infer(expr: Expr, env: TypeEnv = new Map(), subst: Substitution = emptySubst()): [Type, Substitution] {
  switch (expr.tag) {
    case "lit":
      if (expr.type === "int") return [INT, subst];
      if (expr.type === "bool") return [BOOL, subst];
      return [STRING, subst];

    case "var": {
      const t = env.get(expr.name);
      if (!t) throw new Error(`Unbound variable: ${expr.name}`);
      return [t, subst];
    }

    case "app": {
      const [fnT, s1] = infer(expr.fn, env, subst);
      const [argT, s2] = infer(expr.arg, env, s1);
      const retT = freshVar();
      const s3 = unify(apply(s2, fnT), fnType(argT, retT), s2);
      return [apply(s3, retT), s3];
    }

    case "lam": {
      const paramT = freshVar();
      const newEnv = new Map(env);
      newEnv.set(expr.param, paramT);
      const [bodyT, s1] = infer(expr.body, newEnv, subst);
      return [fnType(apply(s1, paramT), bodyT), s1];
    }

    case "let": {
      const [valT, s1] = infer(expr.value, env, subst);
      const newEnv = new Map(env);
      newEnv.set(expr.name, apply(s1, valT));
      return infer(expr.body, newEnv, s1);
    }
  }
}
