import { describe, it, expect } from "vitest";
import { ReteEngine } from "../rete-engine.js";

describe("ReteEngine", () => {
  it("fires matching rules", () => {
    const engine = new ReteEngine();
    const results: string[] = [];
    engine.addRule("adult", [(f) => (f.age as number) >= 18], (facts) => {
      results.push(`adult:${facts[0].name}`);
    });
    engine.addFact({ name: "Alice", age: 25 });
    engine.fire();
    expect(results).toEqual(["adult:Alice"]);
  });

  it("does not fire when conditions fail", () => {
    const engine = new ReteEngine();
    const results: string[] = [];
    engine.addRule("check", [(f) => (f.value as number) > 100], () => {
      results.push("fired");
    });
    engine.addFact({ value: 50 });
    engine.fire();
    expect(results).toEqual([]);
  });

  it("priority ordering", () => {
    const engine = new ReteEngine();
    const order: string[] = [];
    engine.addRule("low", [() => true], () => order.push("low"), 1);
    engine.addRule("high", [() => true], () => order.push("high"), 10);
    engine.addFact({});
    engine.fire();
    expect(order[0]).toBe("high");
  });

  it("does not re-fire same rule for same facts", () => {
    const engine = new ReteEngine();
    let count = 0;
    engine.addRule("counter", [() => true], () => count++);
    engine.addFact({});
    engine.fire();
    engine.fire();
    expect(count).toBe(1);
  });

  it("reset allows re-firing", () => {
    const engine = new ReteEngine();
    let count = 0;
    engine.addRule("counter", [() => true], () => count++);
    engine.addFact({});
    engine.fire();
    engine.reset();
    engine.fire();
    expect(count).toBe(2);
  });

  it("factCount and ruleCount", () => {
    const engine = new ReteEngine();
    engine.addRule("r1", [() => true], () => {});
    engine.addFact({ a: 1 });
    engine.addFact({ b: 2 });
    expect(engine.factCount()).toBe(2);
    expect(engine.ruleCount()).toBe(1);
  });

  it("removeFact works", () => {
    const engine = new ReteEngine();
    const fact = { x: 1 };
    engine.addFact(fact);
    expect(engine.removeFact(fact)).toBe(true);
    expect(engine.factCount()).toBe(0);
  });

  it("multiple conditions all must match", () => {
    const engine = new ReteEngine();
    let fired = false;
    engine.addRule("multi",
      [(f) => (f.a as number) > 0, (f) => (f.b as number) > 0],
      () => { fired = true; }
    );
    engine.addFact({ a: 1, b: 0 });
    engine.fire();
    expect(fired).toBe(false);
  });
});
