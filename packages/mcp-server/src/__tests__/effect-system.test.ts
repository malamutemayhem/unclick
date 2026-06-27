import { describe, it, expect } from "vitest";
import {
  EffectRunner, createEffect, createEffectLogger,
  withLogging, composeHandlers, interceptEffect,
} from "../effect-system.js";

describe("EffectRunner", () => {
  it("handles and performs effects", () => {
    const runner = new EffectRunner();
    runner.handle("log", (payload, resume) => {
      resume(`logged: ${payload}`);
      return `logged: ${payload}`;
    });
    const result = runner.perform<string, string>(createEffect("log", "hello"));
    expect(result).toBe("logged: hello");
  });

  it("throws on unhandled effect", () => {
    const runner = new EffectRunner();
    expect(() => runner.perform(createEffect("missing", null))).toThrow("Unhandled effect");
  });

  it("checks handler existence", () => {
    const runner = new EffectRunner();
    expect(runner.hasHandler("x")).toBe(false);
    runner.handle("x", (_p, r) => r(null));
    expect(runner.hasHandler("x")).toBe(true);
  });

  it("removes handlers", () => {
    const runner = new EffectRunner();
    runner.handle("x", (_p, r) => r(null));
    runner.removeHandler("x");
    expect(runner.hasHandler("x")).toBe(false);
  });

  it("counts handlers", () => {
    const runner = new EffectRunner();
    runner.handle("a", (_p, r) => r(null));
    runner.handle("b", (_p, r) => r(null));
    expect(runner.handlerCount()).toBe(2);
  });
});

describe("withLogging", () => {
  it("logs effects", () => {
    const runner = new EffectRunner();
    const log = createEffectLogger();
    withLogging(runner, log, "compute", (payload, resume) => {
      const result = (payload as number) * 2;
      resume(result);
      return result;
    });
    runner.perform(createEffect("compute", 5));
    expect(log.effects.length).toBe(1);
    expect(log.effects[0].tag).toBe("compute");
    expect(log.effects[0].result).toBe(10);
  });
});

describe("composeHandlers", () => {
  it("creates runner with multiple handlers", () => {
    const runner = composeHandlers(
      ["add", (p, r) => { r((p as number) + 1); return (p as number) + 1; }],
      ["mul", (p, r) => { r((p as number) * 2); return (p as number) * 2; }],
    );
    expect(runner.perform(createEffect("add", 5))).toBe(6);
    expect(runner.perform(createEffect("mul", 5))).toBe(10);
  });
});

describe("interceptEffect", () => {
  it("intercepts and modifies payload", () => {
    const runner = new EffectRunner();
    interceptEffect(runner, "transform", (payload) => (payload as number) * 10);
    const result = runner.perform<number, number>(createEffect("transform", 3));
    expect(result).toBe(30);
  });
});
