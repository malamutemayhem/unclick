import { describe, it, expect } from "vitest";
import { Arb, check, assert, sample, PRNG } from "../property-test.js";

describe("PropertyTest", () => {
  it("PRNG is deterministic", () => {
    const a = new PRNG(123);
    const b = new PRNG(123);
    for (let i = 0; i < 10; i++) {
      expect(a.next()).toBe(b.next());
    }
  });

  it("generates integers in range", () => {
    const values = sample(Arb.int(0, 10), 50);
    for (const v of values) {
      expect(v).toBeGreaterThanOrEqual(0);
      expect(v).toBeLessThanOrEqual(10);
    }
  });

  it("generates strings", () => {
    const values = sample(Arb.string(5), 20);
    for (const v of values) {
      expect(v.length).toBeLessThanOrEqual(5);
    }
  });

  it("generates booleans", () => {
    const values = sample(Arb.bool(), 100);
    expect(values.some((v) => v === true)).toBe(true);
    expect(values.some((v) => v === false)).toBe(true);
  });

  it("generates arrays", () => {
    const values = sample(Arb.array(Arb.int(0, 5), 3), 10);
    for (const arr of values) {
      expect(arr.length).toBeLessThanOrEqual(3);
      for (const v of arr) {
        expect(v).toBeGreaterThanOrEqual(0);
        expect(v).toBeLessThanOrEqual(5);
      }
    }
  });

  it("check passes for valid properties", () => {
    const result = check(Arb.int(1, 100), (n) => n > 0);
    expect(result.success).toBe(true);
    expect(result.numTests).toBe(100);
  });

  it("check finds counterexample", () => {
    const result = check(Arb.int(-100, 100), (n) => n >= 0, { seed: 42 });
    expect(result.success).toBe(false);
    expect(result.counterexample).toBeDefined();
    expect(typeof result.counterexample).toBe("number");
    expect(result.counterexample as number).toBeLessThan(0);
  });

  it("assert throws on failure", () => {
    expect(() => assert(Arb.int(-50, 50), (n) => n > 0)).toThrow("Property failed");
  });

  it("assert passes on success", () => {
    expect(() => assert(Arb.nat(100), (n) => n >= 0)).not.toThrow();
  });

  it("map transforms generator output", () => {
    const doubled = Arb.int(1, 5).map((n) => n * 2);
    const values = sample(doubled, 20);
    for (const v of values) {
      expect(v % 2).toBe(0);
      expect(v).toBeGreaterThanOrEqual(2);
    }
  });

  it("filter constrains output", () => {
    const evens = Arb.int(0, 100).filter((n) => n % 2 === 0);
    const values = sample(evens, 20);
    for (const v of values) {
      expect(v % 2).toBe(0);
    }
  });

  it("oneOf picks from generators", () => {
    const gen = Arb.oneOf(Arb.constant(1), Arb.constant(2), Arb.constant(3));
    const values = sample(gen, 50);
    expect(new Set(values).size).toBeGreaterThan(1);
    for (const v of values) {
      expect([1, 2, 3]).toContain(v);
    }
  });

  it("record generates objects", () => {
    const gen = Arb.record({ name: Arb.string(5), age: Arb.nat(99) });
    const values = sample(gen, 10);
    for (const v of values) {
      expect(typeof v.name).toBe("string");
      expect(typeof v.age).toBe("number");
    }
  });

  it("tuple generates pairs", () => {
    const gen = Arb.tuple(Arb.int(0, 10), Arb.string(3));
    const values = sample(gen, 10);
    for (const [n, s] of values) {
      expect(typeof n).toBe("number");
      expect(typeof s).toBe("string");
    }
  });

  it("addition is commutative (property)", () => {
    assert(Arb.tuple(Arb.int(), Arb.int()), ([a, b]) => a + b === b + a);
  });
});
