import { describe, it, expect } from "vitest";
import { WorkflowEngine } from "../workflow-engine.js";

describe("WorkflowEngine", () => {
  it("adds and runs task steps", () => {
    const engine = new WorkflowEngine();
    engine.addStep("a", "task", { handler: (ctx) => { ctx.done = true; return true; } });
    engine.addStep("b", "task", { handler: () => true });
    const result = engine.run();
    expect(result.completed).toBe(2);
    expect(result.failed).toBe(0);
    expect(engine.isComplete()).toBe(true);
  });

  it("handles task failure", () => {
    const engine = new WorkflowEngine();
    engine.addStep("a", "task", { handler: () => false });
    const result = engine.run();
    expect(result.failed).toBe(1);
  });

  it("retries failed tasks up to maxRetries", () => {
    const engine = new WorkflowEngine();
    let attempts = 0;
    engine.addStep("a", "task", {
      maxRetries: 2,
      handler: () => { attempts++; return attempts >= 3; },
    });
    const result = engine.run();
    expect(attempts).toBe(3);
    expect(result.completed).toBe(1);
    expect(result.failed).toBe(0);
  });

  it("handles decision steps with branches", () => {
    const engine = new WorkflowEngine();
    engine.setContext("route", "fast");
    engine.addStep("decide", "decision", {
      branches: [
        { condition: (ctx) => ctx.route === "fast", next: "fast-step" },
        { condition: (ctx) => ctx.route === "slow", next: "slow-step" },
      ],
    });
    engine.addStep("slow-step", "task", { handler: (ctx) => { ctx.path = "slow"; return true; } });
    engine.addStep("fast-step", "task", { handler: (ctx) => { ctx.path = "fast"; return true; } });
    const result = engine.run();
    expect(engine.getContext().path).toBe("fast");
  });

  it("handles parallel steps", () => {
    const engine = new WorkflowEngine();
    engine.addStep("p1", "task", { handler: (ctx) => { ctx.p1 = true; return true; } });
    engine.addStep("p2", "task", { handler: (ctx) => { ctx.p2 = true; return true; } });
    engine.addStep("par", "parallel", { parallelSteps: ["p1", "p2"] });
    engine.start();
    // Skip to parallel step
    engine.executeStep(); // p1
    engine.executeStep(); // p2
    const status = engine.executeStep(); // par
    expect(status).toBe("completed");
  });

  it("handles wait steps", () => {
    const engine = new WorkflowEngine();
    engine.addStep("w", "wait");
    const result = engine.run();
    expect(result.completed).toBe(1);
  });

  it("records history", () => {
    const engine = new WorkflowEngine();
    engine.addStep("a", "task", { handler: () => true });
    engine.addStep("b", "task", { handler: () => true });
    engine.run();
    const history = engine.getHistory();
    expect(history.length).toBe(2);
    expect(history[0].step).toBe("a");
    expect(history[0].status).toBe("completed");
    expect(history[1].step).toBe("b");
  });

  it("manages context", () => {
    const engine = new WorkflowEngine();
    engine.setContext("x", 42);
    expect(engine.getContext().x).toBe(42);
  });

  it("reports step count", () => {
    const engine = new WorkflowEngine();
    engine.addStep("a", "task");
    engine.addStep("b", "task");
    expect(engine.stepCount()).toBe(2);
  });

  it("returns false from start when empty", () => {
    const engine = new WorkflowEngine();
    expect(engine.start()).toBe(false);
  });

  it("follows nextStep overrides", () => {
    const engine = new WorkflowEngine();
    engine.addStep("a", "task", { handler: () => true, nextStep: "c" });
    engine.addStep("b", "task", { handler: (ctx) => { ctx.visited_b = true; return true; } });
    engine.addStep("c", "task", { handler: (ctx) => { ctx.visited_c = true; return true; } });
    engine.run();
    expect(engine.getContext().visited_c).toBe(true);
    expect(engine.getContext().visited_b).toBeUndefined();
  });

  it("getStep returns step info", () => {
    const engine = new WorkflowEngine();
    engine.addStep("x", "task", { maxRetries: 3 });
    const step = engine.getStep("x");
    expect(step?.type).toBe("task");
    expect(step?.maxRetries).toBe(3);
    expect(step?.status).toBe("pending");
  });
});
