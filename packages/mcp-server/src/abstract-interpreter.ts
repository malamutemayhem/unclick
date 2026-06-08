export type AbstractValue =
  | { kind: "top" }
  | { kind: "bottom" }
  | { kind: "const"; value: number }
  | { kind: "range"; lo: number; hi: number }
  | { kind: "sign"; sign: "pos" | "neg" | "zero" | "any" };

export const TOP: AbstractValue = { kind: "top" };
export const BOTTOM: AbstractValue = { kind: "bottom" };

export function constant(n: number): AbstractValue {
  return { kind: "const", value: n };
}

export function range(lo: number, hi: number): AbstractValue {
  if (lo > hi) return BOTTOM;
  if (lo === hi) return constant(lo);
  return { kind: "range", lo, hi };
}

export function sign(s: "pos" | "neg" | "zero" | "any"): AbstractValue {
  return { kind: "sign", sign: s };
}

export function join(a: AbstractValue, b: AbstractValue): AbstractValue {
  if (a.kind === "bottom") return b;
  if (b.kind === "bottom") return a;
  if (a.kind === "top" || b.kind === "top") return TOP;

  if (a.kind === "const" && b.kind === "const") {
    return a.value === b.value ? a : range(Math.min(a.value, b.value), Math.max(a.value, b.value));
  }

  if (a.kind === "range" && b.kind === "range") {
    return range(Math.min(a.lo, b.lo), Math.max(a.hi, b.hi));
  }

  if (a.kind === "const" && b.kind === "range") {
    return range(Math.min(a.value, b.lo), Math.max(a.value, b.hi));
  }
  if (a.kind === "range" && b.kind === "const") {
    return range(Math.min(a.lo, b.value), Math.max(a.hi, b.value));
  }

  if (a.kind === "sign" && b.kind === "sign") {
    return a.sign === b.sign ? a : sign("any");
  }

  return TOP;
}

export function meet(a: AbstractValue, b: AbstractValue): AbstractValue {
  if (a.kind === "top") return b;
  if (b.kind === "top") return a;
  if (a.kind === "bottom" || b.kind === "bottom") return BOTTOM;

  if (a.kind === "const" && b.kind === "const") {
    return a.value === b.value ? a : BOTTOM;
  }

  if (a.kind === "range" && b.kind === "range") {
    return range(Math.max(a.lo, b.lo), Math.min(a.hi, b.hi));
  }

  if (a.kind === "const" && b.kind === "range") {
    return a.value >= b.lo && a.value <= b.hi ? a : BOTTOM;
  }
  if (a.kind === "range" && b.kind === "const") {
    return b.value >= a.lo && b.value <= a.hi ? b : BOTTOM;
  }

  if (a.kind === "sign" && b.kind === "sign") {
    return a.sign === b.sign ? a : BOTTOM;
  }

  return BOTTOM;
}

export function abstractAdd(a: AbstractValue, b: AbstractValue): AbstractValue {
  if (a.kind === "bottom" || b.kind === "bottom") return BOTTOM;
  if (a.kind === "const" && b.kind === "const") return constant(a.value + b.value);
  if (a.kind === "range" && b.kind === "range") return range(a.lo + b.lo, a.hi + b.hi);
  if (a.kind === "const" && b.kind === "range") return range(a.value + b.lo, a.value + b.hi);
  if (a.kind === "range" && b.kind === "const") return range(a.lo + b.value, a.hi + b.value);
  return TOP;
}

export function abstractMul(a: AbstractValue, b: AbstractValue): AbstractValue {
  if (a.kind === "bottom" || b.kind === "bottom") return BOTTOM;
  if (a.kind === "const" && b.kind === "const") return constant(a.value * b.value);
  if (a.kind === "range" && b.kind === "range") {
    const products = [a.lo * b.lo, a.lo * b.hi, a.hi * b.lo, a.hi * b.hi];
    return range(Math.min(...products), Math.max(...products));
  }
  if (a.kind === "const" && b.kind === "range") {
    const products = [a.value * b.lo, a.value * b.hi];
    return range(Math.min(...products), Math.max(...products));
  }
  if (a.kind === "range" && b.kind === "const") {
    const products = [a.lo * b.value, a.hi * b.value];
    return range(Math.min(...products), Math.max(...products));
  }
  return TOP;
}

export function abstractNeg(a: AbstractValue): AbstractValue {
  if (a.kind === "bottom") return BOTTOM;
  if (a.kind === "const") return constant(-a.value);
  if (a.kind === "range") return range(-a.hi, -a.lo);
  if (a.kind === "sign") {
    if (a.sign === "pos") return sign("neg");
    if (a.sign === "neg") return sign("pos");
    return a;
  }
  return TOP;
}

export function contains(domain: AbstractValue, value: number): boolean {
  switch (domain.kind) {
    case "top": return true;
    case "bottom": return false;
    case "const": return domain.value === value;
    case "range": return value >= domain.lo && value <= domain.hi;
    case "sign":
      if (domain.sign === "pos") return value > 0;
      if (domain.sign === "neg") return value < 0;
      if (domain.sign === "zero") return value === 0;
      return true;
  }
}

export function isSubset(a: AbstractValue, b: AbstractValue): boolean {
  if (a.kind === "bottom") return true;
  if (b.kind === "top") return true;
  if (a.kind === "top") return b.kind === "top";

  const m = meet(a, b);
  return abstractEquals(m, a);
}

export function abstractEquals(a: AbstractValue, b: AbstractValue): boolean {
  if (a.kind !== b.kind) return false;
  if (a.kind === "const" && b.kind === "const") return a.value === b.value;
  if (a.kind === "range" && b.kind === "range") return a.lo === b.lo && a.hi === b.hi;
  if (a.kind === "sign" && b.kind === "sign") return a.sign === b.sign;
  return true;
}

export function toString(v: AbstractValue): string {
  switch (v.kind) {
    case "top": return "TOP";
    case "bottom": return "BOTTOM";
    case "const": return String(v.value);
    case "range": return `[${v.lo}, ${v.hi}]`;
    case "sign": return v.sign;
  }
}
