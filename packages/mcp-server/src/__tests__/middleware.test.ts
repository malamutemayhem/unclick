import { describe, it, expect } from "vitest";
import { MiddlewareChain, compose } from "../middleware.js";
import type { Context, Next } from "../middleware.js";

describe("MiddlewareChain", () => {
  it("executes middleware in order", async () => {
    const chain = new MiddlewareChain();
    const order: number[] = [];
    chain.use(async (_ctx: Context, next: Next) => { order.push(1); await next(); order.push(4); });
    chain.use(async (_ctx: Context, next: Next) => { order.push(2); await next(); order.push(3); });
    await chain.execute();
    expect(order).toEqual([1, 2, 3, 4]);
  });

  it("modifies context", async () => {
    const chain = new MiddlewareChain();
    chain.use(async (ctx: Context, next: Next) => { ctx.value = 42; await next(); });
    const result = await chain.execute();
    expect(result.value).toBe(42);
  });

  it("stops without calling next", async () => {
    const chain = new MiddlewareChain();
    let reached = false;
    chain.use(async (_ctx: Context, _next: Next) => {});
    chain.use(async (_ctx: Context, _next: Next) => { reached = true; });
    await chain.execute();
    expect(reached).toBe(false);
  });

  it("tracks length", () => {
    const chain = new MiddlewareChain();
    chain.use(async (_: Context, next: Next) => { await next(); });
    chain.use(async (_: Context, next: Next) => { await next(); });
    expect(chain.length).toBe(2);
  });
});

describe("compose", () => {
  it("composes middleware functions", async () => {
    const order: number[] = [];
    const composed = compose(
      async (_: Context, next: Next) => { order.push(1); await next(); },
      async (_: Context, next: Next) => { order.push(2); await next(); },
    );
    await composed({}, async () => { order.push(3); });
    expect(order).toEqual([1, 2, 3]);
  });
});
