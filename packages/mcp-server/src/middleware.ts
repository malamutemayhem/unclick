export type Next = () => Promise<void>;
export type Middleware<C> = (ctx: C, next: Next) => Promise<void>;

export class MiddlewareChain<C> {
  private stack: Middleware<C>[] = [];

  use(mw: Middleware<C>): this {
    this.stack.push(mw);
    return this;
  }

  async execute(ctx: C): Promise<void> {
    let index = -1;
    const dispatch = async (i: number): Promise<void> => {
      if (i <= index) throw new Error("next() called multiple times");
      index = i;
      if (i >= this.stack.length) return;
      await this.stack[i](ctx, () => dispatch(i + 1));
    };
    await dispatch(0);
  }

  get length(): number { return this.stack.length; }
}

export function compose<C>(...middlewares: Middleware<C>[]): Middleware<C> {
  return async (ctx: C, next: Next) => {
    let index = -1;
    const dispatch = async (i: number): Promise<void> => {
      if (i <= index) throw new Error("next() called multiple times");
      index = i;
      if (i >= middlewares.length) { await next(); return; }
      await middlewares[i](ctx, () => dispatch(i + 1));
    };
    await dispatch(0);
  };
}

export function conditional<C>(
  predicate: (ctx: C) => boolean,
  mw: Middleware<C>
): Middleware<C> {
  return async (ctx, next) => {
    if (predicate(ctx)) { await mw(ctx, next); }
    else { await next(); }
  };
}

export function timing<C extends { timing?: Record<string, number> }>(
  label: string,
  mw: Middleware<C>
): Middleware<C> {
  return async (ctx, next) => {
    const start = performance.now();
    await mw(ctx, next);
    if (!ctx.timing) ctx.timing = {};
    ctx.timing[label] = performance.now() - start;
  };
}
