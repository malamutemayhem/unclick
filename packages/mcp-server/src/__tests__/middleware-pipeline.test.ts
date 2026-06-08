import { describe, it, expect } from "vitest";
import { Pipeline, compose } from "../middleware-pipeline.js";

interface Ctx { log: string[] }

describe("Pipeline", () => {
  it("executes middleware in order", async () => {
    const p = new Pipeline<Ctx>();
    p.use(async (ctx, next) => { ctx.log.push("a"); await next(); }, "a");
    p.use(async (ctx, next) => { ctx.log.push("b"); await next(); }, "b");
    const ctx: Ctx = { log: [] };
    await p.execute(ctx);
    expect(ctx.log).toEqual(["a", "b"]);
  });

  it("stops if next not called", async () => {
    const p = new Pipeline<Ctx>();
    p.use(async (ctx) => { ctx.log.push("a"); }, "a");
    p.use(async (ctx, next) => { ctx.log.push("b"); await next(); }, "b");
    const ctx: Ctx = { log: [] };
    await p.execute(ctx);
    expect(ctx.log).toEqual(["a"]);
  });

  it("useBefore inserts correctly", async () => {
    const p = new Pipeline<Ctx>();
    p.use(async (ctx, next) => { ctx.log.push("b"); await next(); }, "b");
    p.useBefore("b", async (ctx, next) => { ctx.log.push("a"); await next(); }, "a");
    const ctx: Ctx = { log: [] };
    await p.execute(ctx);
    expect(ctx.log).toEqual(["a", "b"]);
  });

  it("useAfter inserts correctly", async () => {
    const p = new Pipeline<Ctx>();
    p.use(async (ctx, next) => { ctx.log.push("a"); await next(); }, "a");
    p.useAfter("a", async (ctx, next) => { ctx.log.push("b"); await next(); }, "b");
    const ctx: Ctx = { log: [] };
    await p.execute(ctx);
    expect(ctx.log).toEqual(["a", "b"]);
  });

  it("remove removes middleware", () => {
    const p = new Pipeline<Ctx>();
    p.use(async () => {}, "a");
    expect(p.remove("a")).toBe(true);
    expect(p.length).toBe(0);
  });

  it("names returns ordered names", () => {
    const p = new Pipeline<Ctx>();
    p.use(async () => {}, "x");
    p.use(async () => {}, "y");
    expect(p.names()).toEqual(["x", "y"]);
  });
});

describe("compose", () => {
  it("composes middlewares", async () => {
    const a = async (ctx: Ctx, next: () => Promise<void>) => { ctx.log.push("a"); await next(); };
    const b = async (ctx: Ctx, next: () => Promise<void>) => { ctx.log.push("b"); await next(); };
    const composed = compose(a, b);
    const ctx: Ctx = { log: [] };
    await composed(ctx, async () => { ctx.log.push("end"); });
    expect(ctx.log).toEqual(["a", "b", "end"]);
  });
});
