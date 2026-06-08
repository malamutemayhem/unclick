import { describe, it, expect } from "vitest";
import { ContextChain } from "../context-chain.js";

describe("ContextChain", () => {
  it("stores and retrieves values", () => {
    const ctx = new ContextChain({ name: "test" });
    expect(ctx.get("name")).toBe("test");
  });

  it("returns undefined for missing keys", () => {
    const ctx = new ContextChain();
    expect(ctx.get("nope")).toBeUndefined();
  });

  it("set overwrites values", () => {
    const ctx = new ContextChain({ x: 1 });
    ctx.set("x", 2);
    expect(ctx.get("x")).toBe(2);
  });

  it("child inherits parent values", () => {
    const parent = new ContextChain({ service: "mcp" });
    const child = parent.child({ request: "123" });
    expect(child.get("service")).toBe("mcp");
    expect(child.get("request")).toBe("123");
  });

  it("child overrides parent values", () => {
    const parent = new ContextChain({ level: "info" });
    const child = parent.child({ level: "debug" });
    expect(child.get("level")).toBe("debug");
    expect(parent.get("level")).toBe("info");
  });

  it("has checks parent chain", () => {
    const parent = new ContextChain({ x: 1 });
    const child = parent.child();
    expect(child.has("x")).toBe(true);
    expect(child.has("y")).toBe(false);
  });

  it("toObject merges chain", () => {
    const parent = new ContextChain({ a: 1, b: 2 });
    const child = parent.child({ b: 3, c: 4 });
    expect(child.toObject()).toEqual({ a: 1, b: 3, c: 4 });
  });

  it("depth counts chain length", () => {
    const root = new ContextChain();
    const child = root.child();
    const grandchild = child.child();
    expect(root.depth).toBe(1);
    expect(child.depth).toBe(2);
    expect(grandchild.depth).toBe(3);
  });

  it("keys returns all unique keys", () => {
    const parent = new ContextChain({ a: 1, b: 2 });
    const child = parent.child({ b: 3, c: 4 });
    const keys = child.keys().sort();
    expect(keys).toEqual(["a", "b", "c"]);
  });
});
