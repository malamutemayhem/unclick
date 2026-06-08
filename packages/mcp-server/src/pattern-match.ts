type Pattern<T, R> = {
  when: (value: T) => boolean;
  then: (value: T) => R;
};

export class Matcher<T, R = unknown> {
  private patterns: Pattern<T, R>[] = [];
  private fallback?: (value: T) => R;

  when(predicate: (value: T) => boolean, handler: (value: T) => R): Matcher<T, R> {
    this.patterns.push({ when: predicate, then: handler });
    return this;
  }

  whenEqual(target: T, handler: (value: T) => R): Matcher<T, R> {
    return this.when((v) => v === target, handler);
  }

  whenType(type: string, handler: (value: T) => R): Matcher<T, R> {
    return this.when((v) => typeof v === type, handler);
  }

  whenIn(values: T[], handler: (value: T) => R): Matcher<T, R> {
    return this.when((v) => values.includes(v), handler);
  }

  otherwise(handler: (value: T) => R): Matcher<T, R> {
    this.fallback = handler;
    return this;
  }

  execute(value: T): R {
    for (const pattern of this.patterns) {
      if (pattern.when(value)) return pattern.then(value);
    }
    if (this.fallback) return this.fallback(value);
    throw new Error("No matching pattern");
  }
}

export function match<T>(value: T): MatchBuilder<T> {
  return new MatchBuilder(value);
}

class MatchBuilder<T> {
  private value: T;
  private patterns: { check: (v: T) => boolean; result: unknown }[] = [];
  private fallbackResult?: unknown;

  constructor(value: T) {
    this.value = value;
  }

  with<R>(predicate: (v: T) => boolean, result: R): MatchBuilder<T> {
    this.patterns.push({ check: predicate, result });
    return this;
  }

  equals<R>(target: T, result: R): MatchBuilder<T> {
    this.patterns.push({ check: (v) => v === target, result });
    return this;
  }

  otherwise<R>(result: R): R {
    for (const p of this.patterns) {
      if (p.check(this.value)) return p.result as R;
    }
    return result;
  }

  exhaustive(): unknown {
    for (const p of this.patterns) {
      if (p.check(this.value)) return p.result;
    }
    throw new Error("Non-exhaustive match");
  }
}

export function isString(v: unknown): v is string { return typeof v === "string"; }
export function isNumber(v: unknown): v is number { return typeof v === "number"; }
export function isBoolean(v: unknown): v is boolean { return typeof v === "boolean"; }
export function isNull(v: unknown): v is null { return v === null; }
export function isUndefined(v: unknown): v is undefined { return v === undefined; }
export function isNullish(v: unknown): v is null | undefined { return v == null; }
export function isArray(v: unknown): v is unknown[] { return Array.isArray(v); }
