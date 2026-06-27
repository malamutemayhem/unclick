type Step<I, O> = (input: I) => O | Promise<O>;

export class Pipeline<I, O> {
  private steps: Step<any, any>[];

  private constructor(steps: Step<any, any>[]) {
    this.steps = steps;
  }

  static create<T>(): Pipeline<T, T> {
    return new Pipeline<T, T>([]);
  }

  pipe<N>(step: Step<O, N>): Pipeline<I, N> {
    return new Pipeline<I, N>([...this.steps, step]);
  }

  async execute(input: I): Promise<O> {
    let current: unknown = input;
    for (const step of this.steps) {
      current = await step(current);
    }
    return current as O;
  }

  tap(fn: (value: O) => void): Pipeline<I, O> {
    return this.pipe((val: O) => { fn(val); return val; });
  }

  branch<A, B>(
    predicate: (value: O) => boolean,
    ifTrue: Step<O, A>,
    ifFalse: Step<O, B>
  ): Pipeline<I, A | B> {
    return this.pipe(async (val: O) => {
      if (predicate(val)) return ifTrue(val);
      return ifFalse(val);
    });
  }
}

export function pipe<A, B>(fn: Step<A, B>): Pipeline<A, B>;
export function pipe<A, B, C>(f1: Step<A, B>, f2: Step<B, C>): Pipeline<A, C>;
export function pipe<A, B, C, D>(f1: Step<A, B>, f2: Step<B, C>, f3: Step<C, D>): Pipeline<A, D>;
export function pipe(...fns: Step<any, any>[]): Pipeline<any, any> {
  let p = Pipeline.create<any>();
  for (const fn of fns) {
    p = p.pipe(fn);
  }
  return p;
}

export function compose<A, B>(fn: Step<A, B>): Step<A, B>;
export function compose<A, B, C>(f1: Step<B, C>, f2: Step<A, B>): Step<A, C>;
export function compose(...fns: Step<any, any>[]): Step<any, any> {
  const reversed = [...fns].reverse();
  return async (input: any) => {
    let current = input;
    for (const fn of reversed) {
      current = await fn(current);
    }
    return current;
  };
}
