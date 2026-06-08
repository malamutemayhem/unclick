import { describe, it, expect } from "vitest";
import { ConversationChain, pipe, branch } from "../conversation-chain.js";

interface Ctx { value: number; log: string[] }

describe("ConversationChain", () => {
  it("runs steps in order", async () => {
    const chain = new ConversationChain<Ctx>();
    chain.addStep({ name: "add1", execute: (c) => ({ ...c, value: c.value + 1, log: [...c.log, "add1"] }) });
    chain.addStep({ name: "double", execute: (c) => ({ ...c, value: c.value * 2, log: [...c.log, "double"] }) });
    const result = await chain.run({ value: 5, log: [] });
    expect(result.success).toBe(true);
    expect(result.context.value).toBe(12);
    expect(result.stepsExecuted).toEqual(["add1", "double"]);
  });

  it("catches errors and reports failed step", async () => {
    const chain = new ConversationChain<Ctx>();
    chain.addStep({ name: "ok", execute: (c) => c });
    chain.addStep({ name: "fail", execute: () => { throw new Error("boom"); } });
    chain.addStep({ name: "never", execute: (c) => c });
    const result = await chain.run({ value: 0, log: [] });
    expect(result.success).toBe(false);
    expect(result.failedStep).toBe("fail");
    expect(result.error).toBe("boom");
    expect(result.stepsExecuted).toEqual(["ok"]);
  });

  it("handles async steps", async () => {
    const chain = new ConversationChain<Ctx>();
    chain.addStep({ name: "async", execute: async (c) => ({ ...c, value: c.value + 10 }) });
    const result = await chain.run({ value: 0, log: [] });
    expect(result.context.value).toBe(10);
  });

  it("removeStep works", () => {
    const chain = new ConversationChain<Ctx>();
    chain.addStep({ name: "a", execute: (c) => c });
    expect(chain.removeStep("a")).toBe(true);
    expect(chain.stepCount).toBe(0);
  });

  it("stepNames lists steps", () => {
    const chain = new ConversationChain<Ctx>();
    chain.addStep({ name: "a", execute: (c) => c });
    chain.addStep({ name: "b", execute: (c) => c });
    expect(chain.stepNames()).toEqual(["a", "b"]);
  });

  it("clear empties chain", () => {
    const chain = new ConversationChain<Ctx>();
    chain.addStep({ name: "a", execute: (c) => c });
    chain.clear();
    expect(chain.stepCount).toBe(0);
  });
});

describe("pipe", () => {
  it("creates chain from steps", async () => {
    const chain = pipe<Ctx>(
      { name: "add5", execute: (c) => ({ ...c, value: c.value + 5 }) },
      { name: "add3", execute: (c) => ({ ...c, value: c.value + 3 }) },
    );
    const result = await chain.run({ value: 0, log: [] });
    expect(result.context.value).toBe(8);
  });
});

describe("branch", () => {
  it("executes true branch when condition met", async () => {
    const step = branch<Ctx>(
      (c) => c.value > 5,
      { name: "big", execute: (c) => ({ ...c, value: c.value * 10 }) },
      { name: "small", execute: (c) => ({ ...c, value: c.value + 1 }) },
    );
    const chain = new ConversationChain<Ctx>();
    chain.addStep(step);
    const r1 = await chain.run({ value: 10, log: [] });
    expect(r1.context.value).toBe(100);
  });

  it("executes false branch when condition not met", async () => {
    const step = branch<Ctx>(
      (c) => c.value > 5,
      { name: "big", execute: (c) => ({ ...c, value: c.value * 10 }) },
      { name: "small", execute: (c) => ({ ...c, value: c.value + 1 }) },
    );
    const chain = new ConversationChain<Ctx>();
    chain.addStep(step);
    const r2 = await chain.run({ value: 2, log: [] });
    expect(r2.context.value).toBe(3);
  });
});
