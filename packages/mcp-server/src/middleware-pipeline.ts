export type Next = () => Promise<void>;
export type Middleware<C> = (ctx: C, next: Next) => Promise<void>;

export class Pipeline<C> {
  private stack: { name: string; fn: Middleware<C> }[] = [];

  use(fn: Middleware<C>, name?: string): this {
    this.stack.push({ name: name ?? `mw_${this.stack.length}`, fn });
    return this;
  }

  useBefore(target: string, fn: Middleware<C>, name?: string): this {
    const idx = this.stack.findIndex((m) => m.name === target);
    if (idx === -1) throw new Error(`Middleware not found: ${target}`);
    this.stack.splice(idx, 0, { name: name ?? `mw_${this.stack.length}`, fn });
    return this;
  }

  useAfter(target: string, fn: Middleware<C>, name?: string): this {
    const idx = this.stack.findIndex((m) => m.name === target);
    if (idx === -1) throw new Error(`Middleware not found: ${target}`);
    this.stack.splice(idx + 1, 0, { name: name ?? `mw_${this.stack.length}`, fn });
    return this;
  }

  remove(name: string): boolean {
    const idx = this.stack.findIndex((m) => m.name === name);
    if (idx === -1) return false;
    this.stack.splice(idx, 1);
    return true;
  }

  async execute(ctx: C): Promise<void> {
    let index = 0;
    const dispatch = async (): Promise<void> => {
      if (index >= this.stack.length) return;
      const mw = this.stack[index++];
      await mw.fn(ctx, dispatch);
    };
    await dispatch();
  }

  get length(): number {
    return this.stack.length;
  }

  names(): string[] {
    return this.stack.map((m) => m.name);
  }
}

export function compose<C>(...middlewares: Middleware<C>[]): Middleware<C> {
  return async (ctx: C, next: Next) => {
    let index = 0;
    const dispatch = async (): Promise<void> => {
      if (index < middlewares.length) {
        const mw = middlewares[index++];
        await mw(ctx, dispatch);
      } else {
        await next();
      }
    };
    await dispatch();
  };
}
