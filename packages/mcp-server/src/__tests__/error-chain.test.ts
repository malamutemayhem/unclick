import { describe, it, expect } from "vitest";
import { ChainedError, wrap, isChainedError } from "../error-chain.js";

describe("ChainedError", () => {
  it("creates with message", () => {
    const e = new ChainedError("bad thing");
    expect(e.message).toBe("bad thing");
    expect(e.name).toBe("ChainedError");
  });

  it("chains errors", () => {
    const root = new Error("root");
    const mid = new ChainedError("mid", { cause: root });
    const top = new ChainedError("top", { cause: mid });
    expect(top.chain.length).toBe(3);
    expect(top.rootCause).toBe(root);
    expect(top.depth).toBe(3);
  });

  it("stores code and context", () => {
    const e = new ChainedError("fail", { code: "E001", context: { key: "val" } });
    expect(e.code).toBe("E001");
    expect(e.context.key).toBe("val");
  });

  it("toJSON serializes chain", () => {
    const root = new ChainedError("root");
    const top = new ChainedError("top", { cause: root, code: "ERR" });
    const json = top.toJSON();
    expect(json.message).toBe("top");
    expect(json.code).toBe("ERR");
  });
});

describe("wrap", () => {
  it("wraps error with context", () => {
    const original = new Error("oops");
    const wrapped = wrap(original, "failed to process", { id: 123 });
    expect(wrapped.message).toBe("failed to process");
    expect(wrapped.cause).toBe(original);
    expect(wrapped.context.id).toBe(123);
  });

  it("wraps non-error values", () => {
    const wrapped = wrap("string error", "wrapped");
    expect(wrapped.cause?.message).toBe("string error");
  });
});

describe("isChainedError", () => {
  it("detects ChainedError", () => {
    expect(isChainedError(new ChainedError("x"))).toBe(true);
    expect(isChainedError(new Error("x"))).toBe(false);
  });
});
