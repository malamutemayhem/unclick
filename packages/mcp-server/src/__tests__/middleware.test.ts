import { describe, it, expect } from "vitest";
import { MiddlewareChain, compose, errorHandler } from "../middleware.js";

describe("MiddlewareChain", () => {
  it("executes in order", async () => {
    const chain = new MiddlewareChain();
    const order: number[] = [];
    chain.use(async (_ctx, next) => { order.push(1); await next(); order.push(4); });
    chain.use(async (_ctx, next) => { order.push(2); await next(); order.push(3); });
    await chain.execute();
    expect(order).toEqual([1, 2, 3, 4]);
  });

  it("passes context through", async () => {
    const chain = new MiddlewareChain();
    chain.use(async (ctx, next) => { ctx.value = 42; await next(); });
    chain.use(async (ctx, next) => { ctx.doubled = (ctx.value as number) * 2; await next(); });
    const result = await chain.execute();
    expect(result.doubled).toBe(84);
  });

  it("stops if next not called", async () => {
    const chain = new MiddlewareChain();
    chain.use(async (ctx) => { ctx.stopped = true; });
    chain.use(async (ctx, next) => { ctx.reached = true; await next(); });
    const result = await chain.execute();
    expect(result.stopped).toBe(true);
    expect(result.reached).toBeUndefined();
  });

  it("throws if next called twice", async () => {
    const chain = new MiddlewareChain();
    chain.use(async (_ctx, next) => { await next(); await next(); });
    await expect(chain.execute()).rejects.toThrow("next() called multiple times");
  });

  it("length tracks middleware count", () => {
    const chain = new MiddlewareChain();
    chain.use(async (_ctx, next) => { await next(); });
    chain.use(async (_ctx, next) => { await next(); });
    expect(chain.length).toBe(2);
  });
});

describe("compose", () => {
  it("combines middlewares into one", async () => {
    const combined = compose(
      async (ctx, next) => { ctx.a = 1; await next(); },
      async (ctx, next) => { ctx.b = 2; await next(); },
    );
    const chain = new MiddlewareChain();
    chain.use(combined);
    const result = await chain.execute();
    expect(result.a).toBe(1);
    expect(result.b).toBe(2);
  });
});

describe("errorHandler", () => {
  it("catches errors from downstream", async () => {
    const chain = new MiddlewareChain();
    let caught: unknown;
    chain.use(errorHandler((err) => { caught = err; }));
    chain.use(async () => { throw new Error("boom"); });
    await chain.execute();
    expect((caught as Error).message).toBe("boom");
  });
});
