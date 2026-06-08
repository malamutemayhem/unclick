import { describe, it, expect } from "vitest";
import { HashChain } from "../hash-chain.js";

describe("HashChain", () => {
  it("generates chain of correct length", () => {
    const hc = HashChain.generate("seed", 10);
    expect(hc.length()).toBe(10);
  });

  it("root is the seed", () => {
    const hc = HashChain.generate("test", 5);
    expect(hc.root()).toBe("test");
  });

  it("verifyAll passes for valid chain", () => {
    const hc = HashChain.generate("abc", 10);
    expect(hc.verifyAll()).toBe(true);
  });

  it("verifyLink checks consecutive elements", () => {
    const hc = HashChain.generate("seed", 5);
    expect(hc.verifyLink(1)).toBe(true);
    expect(hc.verifyLink(0)).toBe(false);
  });

  it("verify checks value at index", () => {
    const hc = HashChain.generate("seed", 5);
    expect(hc.verify(0, "seed")).toBe(true);
    expect(hc.verify(0, "wrong")).toBe(false);
  });

  it("tip returns last element", () => {
    const hc = HashChain.generate("x", 3);
    expect(hc.tip()).toBe(hc.get(2));
  });

  it("slice returns subchain", () => {
    const hc = HashChain.generate("s", 5);
    const sl = hc.slice(1, 3);
    expect(sl.length).toBe(2);
  });

  it("different seeds produce different chains", () => {
    const a = HashChain.generate("alpha", 5);
    const b = HashChain.generate("beta", 5);
    expect(a.tip()).not.toBe(b.tip());
  });
});
