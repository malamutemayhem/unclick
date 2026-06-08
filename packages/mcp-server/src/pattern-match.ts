type MatchArm<T, R> = { pattern: (value: T) => boolean; handler: (value: T) => R };

export class Matcher<T, R = unknown> {
  private arms: MatchArm<T, R>[] = [];
  private fallback?: (value: T) => R;

  when(pattern: (value: T) => boolean, handler: (value: T) => R): this {
    this.arms.push({ pattern, handler });
    return this;
  }

  otherwise(handler: (value: T) => R): this {
    this.fallback = handler;
    return this;
  }

  run(value: T): R {
    for (const arm of this.arms) {
      if (arm.pattern(value)) return arm.handler(value);
    }
    if (this.fallback) return this.fallback(value);
    throw new Error("No matching pattern and no fallback defined");
  }
}

export function match<T, R>(value: T): Matcher<T, R> & { run: () => R } {
  const matcher = new Matcher<T, R>();
  const proxy = new Proxy(matcher, {
    get(target, prop) {
      if (prop === "run") return () => target.run(value);
      return (target as any)[prop].bind(target);
    },
  });
  return proxy as any;
}

export function when<T>(pattern: Partial<T>): (value: T) => boolean {
  const entries = Object.entries(pattern) as Array<[keyof T, T[keyof T]]>;
  return (value) => entries.every(([key, expected]) => value[key] === expected);
}

export function isType<T>(type: string): (value: unknown) => value is T {
  return ((value: unknown) => typeof value === type) as any;
}
