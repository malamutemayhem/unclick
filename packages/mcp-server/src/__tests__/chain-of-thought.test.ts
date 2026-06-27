import { describe, it, expect } from "vitest";
import { ChainOfThought } from "../chain-of-thought.js";

describe("ChainOfThought", () => {
  it("adds and retrieves steps", () => {
    const cot = new ChainOfThought();
    const id = cot.addStep("Analyze data", "Data needs analysis", 0.8);
    expect(cot.getStep(id)?.content).toBe("Analyze data");
    expect(cot.length).toBe(1);
  });

  it("builds a chain from parent links", () => {
    const cot = new ChainOfThought();
    const s1 = cot.addStep("Step 1", "reason 1", 0.9);
    const s2 = cot.addStep("Step 2", "reason 2", 0.8, s1);
    const s3 = cot.addStep("Step 3", "reason 3", 0.7, s2);
    const chain = cot.getChain(s3);
    expect(chain.length).toBe(3);
    expect(chain[0].content).toBe("Step 1");
    expect(chain[2].content).toBe("Step 3");
  });

  it("detects branches", () => {
    const cot = new ChainOfThought();
    const root = cot.addStep("Root", "start", 0.9);
    cot.addStep("Branch A", "option a", 0.8, root);
    cot.addStep("Branch B", "option b", 0.7, root);
    const branches = cot.getBranches();
    expect(branches.length).toBe(2);
  });

  it("bestBranch picks highest average confidence", () => {
    const cot = new ChainOfThought();
    const root = cot.addStep("Root", "start", 0.5);
    const a = cot.addStep("A", "good path", 0.9, root);
    cot.addStep("A2", "still good", 0.95, a);
    const b = cot.addStep("B", "bad path", 0.3, root);
    cot.addStep("B2", "still bad", 0.2, b);
    const best = cot.bestBranch();
    expect(best[best.length - 1].content).toBe("A2");
  });

  it("prune removes low confidence steps", () => {
    const cot = new ChainOfThought();
    cot.addStep("High", "ok", 0.9);
    cot.addStep("Low", "not great", 0.2);
    cot.addStep("Mid", "ok", 0.5);
    expect(cot.prune(0.5)).toBe(1);
    expect(cot.length).toBe(2);
  });

  it("summarize creates text summary", () => {
    const cot = new ChainOfThought();
    cot.addStep("First", "reason", 0.8);
    cot.addStep("Second", "reason", 0.9);
    const summary = cot.summarize();
    expect(summary).toContain("1.");
    expect(summary).toContain("80%");
    expect(summary).toContain("First");
  });

  it("clear resets everything", () => {
    const cot = new ChainOfThought();
    cot.addStep("test", "test", 1);
    cot.clear();
    expect(cot.length).toBe(0);
  });

  it("getChain returns all steps when no leaf specified", () => {
    const cot = new ChainOfThought();
    cot.addStep("A", "r", 1);
    cot.addStep("B", "r", 1);
    expect(cot.getChain().length).toBe(2);
  });
});
