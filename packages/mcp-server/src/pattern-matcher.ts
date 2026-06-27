export interface MatchCase<T, R> {
  pattern: (value: T) => boolean;
  handler: (value: T) => R;
}

export class PatternMatcher<T, R> {
  private cases: MatchCase<T, R>[] = [];
  private defaultHandler?: (value: T) => R;

  when(pattern: (value: T) => boolean, handler: (value: T) => R): PatternMatcher<T, R> {
    this.cases.push({ pattern, handler });
    return this;
  }

  otherwise(handler: (value: T) => R): PatternMatcher<T, R> {
    this.defaultHandler = handler;
    return this;
  }

  match(value: T): R {
    for (const c of this.cases) {
      if (c.pattern(value)) return c.handler(value);
    }
    if (this.defaultHandler) return this.defaultHandler(value);
    throw new Error("No matching pattern");
  }

  matchAll(value: T): R[] {
    const results: R[] = [];
    for (const c of this.cases) {
      if (c.pattern(value)) results.push(c.handler(value));
    }
    return results;
  }
}

export function match<T, R>(value: T, cases: [((v: T) => boolean), ((v: T) => R)][], defaultCase?: (v: T) => R): R {
  for (const [pattern, handler] of cases) {
    if (pattern(value)) return handler(value);
  }
  if (defaultCase) return defaultCase(value);
  throw new Error("No matching pattern");
}
