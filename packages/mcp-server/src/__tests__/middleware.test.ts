import { describe, it, expect } from "vitest";
import { Pipeline, compose } from "../middleware.js";

interface Ctx {
  log: string[];
  [key: string]: unknown;
}

describe("Pipeline", () => {
  it("executes middlewares in order", async () => {
    const pipe = new Pipeline<Ctx>();
    pipe.use(async (ctx, next) => { ctx.log.push("a"); await next(); });
    pipe.use(async (ctx, next) => { ctx.log.push("b"); await next(); });
    pipe.use(async (ctx, next) => { ctx.log.push("c"); await next(); });
    const ctx: Ctx = { log: [] };
    await pipe.execute(ctx);
    expect(ctx.log).toEqual(["a", "b", "c"]);
  });

  it("supports before/after pattern", async () => {
    const pipe = new Pipeline<Ctx>();
    pipe.use(async (ctx, next) => {
      ctx.log.push("before");
      await next();
      ctx.log.push("after");
    });
    pipe.use(async (ctx, next) => {
      ctx.log.push("handler");
      await next();
    });
    const ctx: Ctx = { log: [] };
    await pipe.execute(ctx);
    expect(ctx.log).toEqual(["before", "handler", "after"]);
  });

  it("stops if next is not called", async () => {
    const pipe = new Pipeline<Ctx>();
    pipe.use(async (ctx) => { ctx.log.push("stopper"); });
    pipe.use(async (ctx, next) => { ctx.log.push("never"); await next(); });
    const ctx: Ctx = { log: [] };
    await pipe.execute(ctx);
    expect(ctx.log).toEqual(["stopper"]);
  });

  it("handles empty pipeline", async () => {
    const pipe = new Pipeline<Ctx>();
    const ctx: Ctx = { log: [] };
    await pipe.execute(ctx);
    expect(ctx.log).toEqual([]);
  });

  it("propagates errors", async () => {
    const pipe = new Pipeline<Ctx>();
    pipe.use(async () => { throw new Error("boom"); });
    await expect(pipe.execute({ log: [] })).rejects.toThrow("boom");
  });

  it("tracks length", () => {
    const pipe = new Pipeline<Ctx>();
    expect(pipe.length).toBe(0);
    pipe.use(async (_, next) => next());
    expect(pipe.length).toBe(1);
  });
});

describe("compose", () => {
  it("composes middlewares into one", async () => {
    const composed = compose<Ctx>(
      async (ctx, next) => { ctx.log.push("x"); await next(); },
      async (ctx, next) => { ctx.log.push("y"); await next(); },
    );
    const pipe = new Pipeline<Ctx>();
    pipe.use(composed);
    pipe.use(async (ctx, next) => { ctx.log.push("z"); await next(); });
    const ctx: Ctx = { log: [] };
    await pipe.execute(ctx);
    expect(ctx.log).toEqual(["x", "y", "z"]);
  });
});
