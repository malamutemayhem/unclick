type Step<I, O> = (input: I) => O;
type AsyncStep<I, O> = (input: I) => O | Promise<O>;

export class Pipeline<I, O> {
  private steps: AsyncStep<unknown, unknown>[] = [];

  constructor(private initialStep?: AsyncStep<I, O>) {
    if (initialStep) {
      this.steps.push(initialStep as AsyncStep<unknown, unknown>);
    }
  }

  pipe<N>(step: AsyncStep<O, N>): Pipeline<I, N> {
    const next = new Pipeline<I, N>();
    next.steps = [...this.steps, step as AsyncStep<unknown, unknown>];
    return next;
  }

  async execute(input: I): Promise<O> {
    let current: unknown = input;
    for (const step of this.steps) {
      current = await step(current);
    }
    return current as O;
  }

  async executeBatch(inputs: I[]): Promise<O[]> {
    return Promise.all(inputs.map((input) => this.execute(input)));
  }

  get length(): number {
    return this.steps.length;
  }
}

export function pipeline<I, O>(step: Step<I, O>): Pipeline<I, O> {
  return new Pipeline(step);
}

export function tap<T>(fn: (value: T) => void): Step<T, T> {
  return (value: T) => { fn(value); return value; };
}

export function filter<T>(predicate: (value: T) => boolean): Step<T[], T[]> {
  return (arr: T[]) => arr.filter(predicate);
}

export function mapStep<T, R>(fn: (item: T) => R): Step<T[], R[]> {
  return (arr: T[]) => arr.map(fn);
}

export function sortBy<T>(key: keyof T, order: "asc" | "desc" = "asc"): Step<T[], T[]> {
  return (arr: T[]) => [...arr].sort((a, b) => {
    const av = a[key];
    const bv = b[key];
    const cmp = av < bv ? -1 : av > bv ? 1 : 0;
    return order === "asc" ? cmp : -cmp;
  });
}

export function groupBy<T>(key: keyof T): Step<T[], Record<string, T[]>> {
  return (arr: T[]) => {
    const groups: Record<string, T[]> = {};
    for (const item of arr) {
      const k = String(item[key]);
      if (!groups[k]) groups[k] = [];
      groups[k].push(item);
    }
    return groups;
  };
}

export function unique<T>(key?: keyof T): Step<T[], T[]> {
  return (arr: T[]) => {
    if (!key) return [...new Set(arr)];
    const seen = new Set<unknown>();
    return arr.filter((item) => {
      const k = item[key];
      if (seen.has(k)) return false;
      seen.add(k);
      return true;
    });
  };
}

export function take<T>(count: number): Step<T[], T[]> {
  return (arr: T[]) => arr.slice(0, count);
}

export function skip<T>(count: number): Step<T[], T[]> {
  return (arr: T[]) => arr.slice(count);
}
