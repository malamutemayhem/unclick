export type Next = () => Promise<void>;
export type Middleware<C> = (context: C, next: Next) => Promise<void>;

export class Pipeline<C> {
  private middlewares: Middleware<C>[] = [];

  use(middleware: Middleware<C>): this {
    this.middlewares.push(middleware);
    return this;
  }

  async execute(context: C): Promise<void> {
    let index = 0;
    const run = async (): Promise<void> => {
      if (index >= this.middlewares.length) return;
      const mw = this.middlewares[index++];
      await mw(context, run);
    };
    await run();
  }

  get length(): number {
    return this.middlewares.length;
  }
}

export function compose<C>(...middlewares: Middleware<C>[]): Middleware<C> {
  return async (context: C, next: Next) => {
    let index = 0;
    const run = async (): Promise<void> => {
      if (index < middlewares.length) {
        const mw = middlewares[index++];
        await mw(context, run);
      } else {
        await next();
      }
    };
    await run();
  };
}
