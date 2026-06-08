export type Context = Record<string, unknown>;
export type Next = () => Promise<void>;
export type MiddlewareFn = (ctx: Context, next: Next) => Promise<void>;

export class MiddlewareChain {
  private stack: MiddlewareFn[] = [];

  use(fn: MiddlewareFn): this {
    this.stack.push(fn);
    return this;
  }

  async execute(ctx: Context = {}): Promise<Context> {
    let index = -1;
    const dispatch = async (i: number): Promise<void> => {
      if (i <= index) throw new Error("next() called multiple times");
      index = i;
      if (i >= this.stack.length) return;
      await this.stack[i](ctx, () => dispatch(i + 1));
    };
    await dispatch(0);
    return ctx;
  }

  get length(): number {
    return this.stack.length;
  }
}

export function compose(...middlewares: MiddlewareFn[]): MiddlewareFn {
  return async (ctx: Context, next: Next) => {
    let index = -1;
    const dispatch = async (i: number): Promise<void> => {
      if (i <= index) throw new Error("next() called multiple times");
      index = i;
      if (i >= middlewares.length) {
        await next();
        return;
      }
      await middlewares[i](ctx, () => dispatch(i + 1));
    };
    await dispatch(0);
  };
}

export function errorHandler(handler: (err: unknown, ctx: Context) => void): MiddlewareFn {
  return async (ctx: Context, next: Next) => {
    try {
      await next();
    } catch (err) {
      handler(err, ctx);
    }
  };
}
