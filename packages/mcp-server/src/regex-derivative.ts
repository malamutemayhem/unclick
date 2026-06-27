export type RE =
  | { kind: "empty" }
  | { kind: "eps" }
  | { kind: "char"; ch: string }
  | { kind: "dot" }
  | { kind: "alt"; left: RE; right: RE }
  | { kind: "seq"; left: RE; right: RE }
  | { kind: "star"; inner: RE }
  | { kind: "charClass"; chars: Set<string>; negated: boolean };

export const EMPTY: RE = { kind: "empty" };
export const EPS: RE = { kind: "eps" };
export const DOT: RE = { kind: "dot" };

export function char(ch: string): RE {
  return { kind: "char", ch };
}

export function charClass(chars: string, negated = false): RE {
  return { kind: "charClass", chars: new Set(chars.split("")), negated };
}

export function alt(left: RE, right: RE): RE {
  if (left.kind === "empty") return right;
  if (right.kind === "empty") return left;
  return { kind: "alt", left, right };
}

export function seq(left: RE, right: RE): RE {
  if (left.kind === "empty" || right.kind === "empty") return EMPTY;
  if (left.kind === "eps") return right;
  if (right.kind === "eps") return left;
  return { kind: "seq", left, right };
}

export function star(inner: RE): RE {
  if (inner.kind === "empty" || inner.kind === "eps") return EPS;
  if (inner.kind === "star") return inner;
  return { kind: "star", inner };
}

export function nullable(re: RE): boolean {
  switch (re.kind) {
    case "empty": return false;
    case "eps": return true;
    case "char": return false;
    case "dot": return false;
    case "charClass": return false;
    case "alt": return nullable(re.left) || nullable(re.right);
    case "seq": return nullable(re.left) && nullable(re.right);
    case "star": return true;
  }
}

export function derivative(re: RE, ch: string): RE {
  switch (re.kind) {
    case "empty": return EMPTY;
    case "eps": return EMPTY;
    case "char": return re.ch === ch ? EPS : EMPTY;
    case "dot": return EPS;
    case "charClass": {
      const has = re.chars.has(ch);
      return (re.negated ? !has : has) ? EPS : EMPTY;
    }
    case "alt": return alt(derivative(re.left, ch), derivative(re.right, ch));
    case "seq": {
      const d = seq(derivative(re.left, ch), re.right);
      if (nullable(re.left)) {
        return alt(d, derivative(re.right, ch));
      }
      return d;
    }
    case "star": return seq(derivative(re.inner, ch), star(re.inner));
  }
}

export function matches(re: RE, input: string): boolean {
  let current = re;
  for (const ch of input) {
    current = derivative(current, ch);
  }
  return nullable(current);
}

export function reToString(re: RE): string {
  switch (re.kind) {
    case "empty": return "EMPTY";
    case "eps": return "EPS";
    case "char": return re.ch;
    case "dot": return ".";
    case "charClass": {
      const chars = [...re.chars].join("");
      return re.negated ? `[^${chars}]` : `[${chars}]`;
    }
    case "alt": return `(${reToString(re.left)}|${reToString(re.right)})`;
    case "seq": return `${reToString(re.left)}${reToString(re.right)}`;
    case "star": return `${reToString(re.inner)}*`;
  }
}

export function parseSimple(pattern: string): RE {
  let i = 0;

  function parseAlternation(): RE {
    let left = parseSequence();
    while (i < pattern.length && pattern[i] === "|") {
      i++;
      left = alt(left, parseSequence());
    }
    return left;
  }

  function parseSequence(): RE {
    let result: RE = EPS;
    while (i < pattern.length && pattern[i] !== ")" && pattern[i] !== "|") {
      result = seq(result, parseQuantifier());
    }
    return result;
  }

  function parseQuantifier(): RE {
    let atom = parseAtom();
    if (i < pattern.length && pattern[i] === "*") {
      i++;
      atom = star(atom);
    } else if (i < pattern.length && pattern[i] === "+") {
      i++;
      atom = seq(atom, star(atom));
    } else if (i < pattern.length && pattern[i] === "?") {
      i++;
      atom = alt(atom, EPS);
    }
    return atom;
  }

  function parseAtom(): RE {
    if (pattern[i] === "(") {
      i++;
      const inner = parseAlternation();
      i++;
      return inner;
    }
    if (pattern[i] === ".") {
      i++;
      return DOT;
    }
    if (pattern[i] === "\\") {
      i++;
      const ch = pattern[i++];
      return char(ch);
    }
    return char(pattern[i++]);
  }

  return parseAlternation();
}
