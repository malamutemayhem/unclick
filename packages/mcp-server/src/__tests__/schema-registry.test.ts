import { describe, it, expect } from "vitest";
import { SchemaRegistry } from "../schema-registry.js";

describe("SchemaRegistry", () => {
  it("register and get latest schema", () => {
    const reg = new SchemaRegistry();
    reg.register("user", { type: "object" });
    const entry = reg.get("user");
    expect(entry?.version).toBe(1);
    expect(entry?.schema).toEqual({ type: "object" });
  });

  it("tracks multiple versions", () => {
    const reg = new SchemaRegistry();
    reg.register("event", { v: 1 });
    reg.register("event", { v: 2 });
    expect(reg.getLatestVersion("event")).toBe(2);
    expect(reg.get("event")?.schema).toEqual({ v: 2 });
    expect(reg.get("event", 1)?.schema).toEqual({ v: 1 });
  });

  it("returns undefined for unknown schema", () => {
    const reg = new SchemaRegistry();
    expect(reg.get("nope")).toBeUndefined();
  });

  it("has checks existence", () => {
    const reg = new SchemaRegistry();
    reg.register("a", {});
    expect(reg.has("a")).toBe(true);
    expect(reg.has("a", 1)).toBe(true);
    expect(reg.has("a", 99)).toBe(false);
    expect(reg.has("b")).toBe(false);
  });

  it("listNames returns all registered names", () => {
    const reg = new SchemaRegistry();
    reg.register("alpha", {});
    reg.register("beta", {});
    expect(reg.listNames().sort()).toEqual(["alpha", "beta"]);
  });

  it("listVersions returns version numbers", () => {
    const reg = new SchemaRegistry();
    reg.register("x", {});
    reg.register("x", {});
    reg.register("x", {});
    expect(reg.listVersions("x")).toEqual([1, 2, 3]);
    expect(reg.listVersions("missing")).toEqual([]);
  });

  it("size tracks unique schema names", () => {
    const reg = new SchemaRegistry();
    reg.register("a", {});
    reg.register("a", {});
    reg.register("b", {});
    expect(reg.size).toBe(2);
  });
});
