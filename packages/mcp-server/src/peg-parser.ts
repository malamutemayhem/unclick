export type PegResult = { ok: true; value: unknown; rest: string } | { ok: false };

export type PegRule = (input: string) => PegResult;

export function literal(str: string): PegRule {
  return (input) => {
    if (input.startsWith(str)) {
      return { ok: true, value: str, rest: input.slice(str.length) };
    }
    return { ok: false };
  };
}

export function regex(pattern: RegExp): PegRule {
  const anchored = new RegExp("^" + pattern.source, pattern.flags.replace("g", ""));
  return (input) => {
    const m = input.match(anchored);
    if (m) {
      return { ok: true, value: m[0], rest: input.slice(m[0].length) };
    }
    return { ok: false };
  };
}

export function sequence(...rules: PegRule[]): PegRule {
  return (input) => {
    const values: unknown[] = [];
    let rest = input;
    for (const rule of rules) {
      const r = rule(rest);
      if (!r.ok) return { ok: false };
      values.push(r.value);
      rest = r.rest;
    }
    return { ok: true, value: values, rest };
  };
}

export function choice(...rules: PegRule[]): PegRule {
  return (input) => {
    for (const rule of rules) {
      const r = rule(input);
      if (r.ok) return r;
    }
    return { ok: false };
  };
}

export function zeroOrMore(rule: PegRule): PegRule {
  return (input) => {
    const values: unknown[] = [];
    let rest = input;
    while (true) {
      const r = rule(rest);
      if (!r.ok) break;
      values.push(r.value);
      rest = r.rest;
      if (rest.length === input.length) break;
      input = rest;
    }
    return { ok: true, value: values, rest };
  };
}

export function oneOrMore(rule: PegRule): PegRule {
  return (input) => {
    const r = zeroOrMore(rule)(input);
    if (!r.ok) return { ok: false };
    const arr = r.value as unknown[];
    if (arr.length === 0) return { ok: false };
    return r;
  };
}

export function optional(rule: PegRule): PegRule {
  return (input) => {
    const r = rule(input);
    if (r.ok) return r;
    return { ok: true, value: null, rest: input };
  };
}

export function not(rule: PegRule): PegRule {
  return (input) => {
    const r = rule(input);
    if (r.ok) return { ok: false };
    return { ok: true, value: null, rest: input };
  };
}

export function peek(rule: PegRule): PegRule {
  return (input) => {
    const r = rule(input);
    if (r.ok) return { ok: true, value: r.value, rest: input };
    return { ok: false };
  };
}

export function map(rule: PegRule, fn: (value: unknown) => unknown): PegRule {
  return (input) => {
    const r = rule(input);
    if (!r.ok) return { ok: false };
    return { ok: true, value: fn(r.value), rest: r.rest };
  };
}

export function lazy(fn: () => PegRule): PegRule {
  let cached: PegRule | null = null;
  return (input) => {
    if (!cached) cached = fn();
    return cached(input);
  };
}

export function eof(): PegRule {
  return (input) => {
    if (input.length === 0) return { ok: true, value: null, rest: "" };
    return { ok: false };
  };
}

export function whitespace(): PegRule {
  return regex(/\s*/);
}

export function token(rule: PegRule): PegRule {
  return map(sequence(whitespace(), rule, whitespace()), (v) => (v as unknown[])[1]);
}

export function sepBy(rule: PegRule, sep: PegRule): PegRule {
  return (input) => {
    const first = rule(input);
    if (!first.ok) return { ok: true, value: [], rest: input };
    const values: unknown[] = [first.value];
    let rest = first.rest;
    while (true) {
      const s = sep(rest);
      if (!s.ok) break;
      const next = rule(s.rest);
      if (!next.ok) break;
      values.push(next.value);
      rest = next.rest;
    }
    return { ok: true, value: values, rest };
  };
}
