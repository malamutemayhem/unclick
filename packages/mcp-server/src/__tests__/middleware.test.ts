import { describe, it, expect } from "vitest";
import { MiddlewareChain, compose, conditional, timing } from "../middleware.js";

interface Ctx {
  [key: string]: unknown;
  log: string[];
  timing?: Record<string, number>;
}

describe("MiddlewareChain", () => {
  it("executes in order", async () => {
    const chain = new MiddlewareChain<Ctx>();
    chain.use(async (ctx, next) => { ctx.log.push("a"); await next(); ctx.log.push("a-after"); });
    chain.use(async (ctx, next) => { ctx.log.push("b"); await next(); });
    const ctx: Ctx = { log: [] };
    await chain.execute(ctx);
    expect(ctx.log).toEqual(["a", "b", "a-after"]);
  });

  it("works with no middleware", async () => {
    const chain = new MiddlewareChain<Ctx>();
    await chain.execute({ log: [] });
  });

  it("stops if next not called", async () => {
    const chain = new MiddlewareChain<Ctx>();
    chain.use(async (ctx) => { ctx.log.push("only"); });
    chain.use(async (ctx) => { ctx.log.push("never"); });
    const ctx: Ctx = { log: [] };
    await chain.execute(ctx);
    expect(ctx.log).toEqual(["only"]);
  });

  it("throws on double next()", async () => {
    const chain = new MiddlewareChain<Ctx>();
    chain.use(async (_ctx, next) => { await next(); await next(); });
    await expect(chain.execute({ log: [] })).rejects.toThrow("multiple times");
  });

  it("length reflects stack size", () => {
    const chain = new MiddlewareChain<Ctx>();
    expect(chain.length).toBe(0);
    chain.use(async (_, next) => next());
    expect(chain.length).toBe(1);
  });
});

describe("compose", () => {
  it("composes middlewares into one", async () => {
    const composed = compose<Ctx>(
      async (ctx, next) => { ctx.log.push("1"); await next(); },
      async (ctx, next) => { ctx.log.push("2"); await next(); }
    );
    const ctx: Ctx = { log: [] };
    await composed(ctx, async () => { ctx.log.push("end"); });
    expect(ctx.log).toEqual(["1", "2", "end"]);
  });
});

describe("conditional", () => {
  it("runs middleware when predicate is true", async () => {
    const mw = conditional<Ctx>((ctx) => ctx.log.length === 0, async (ctx, next) => {
      ctx.log.push("ran");
      await next();
    });
    const ctx: Ctx = { log: [] };
    await mw(ctx, async () => {});
    expect(ctx.log).toEqual(["ran"]);
  });

  it("skips middleware when predicate is false", async () => {
    const mw = conditional<Ctx>(() => false, async (ctx, next) => {
      ctx.log.push("ran");
      await next();
    });
    const ctx: Ctx = { log: [] };
    let nextCalled = false;
    await mw(ctx, async () => { nextCalled = true; });
    expect(ctx.log).toEqual([]);
    expect(nextCalled).toBe(true);
  });
});

describe("timing", () => {
  it("records timing", async () => {
    const mw = timing<Ctx>("test", async (_ctx, next) => { await next(); });
    const ctx: Ctx = { log: [] };
    await mw(ctx, async () => {});
    expect(ctx.timing).toBeDefined();
    expect(ctx.timing!["test"]).toBeGreaterThanOrEqual(0);
  });
});
