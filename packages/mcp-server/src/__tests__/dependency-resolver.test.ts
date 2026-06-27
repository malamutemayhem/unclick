import { describe, it, expect } from "vitest";
import { DependencyResolver } from "../dependency-resolver.js";

describe("DependencyResolver", () => {
  it("resolves a simple dependency chain", () => {
    const resolver = new DependencyResolver();
    resolver.register({ name: "app", version: "1.0.0", dependencies: { lib: "^1.0.0" } });
    resolver.register({ name: "lib", version: "1.2.0", dependencies: {} });
    const resolved = resolver.resolve("app");
    expect(resolved.map((r) => r.name)).toEqual(["lib", "app"]);
  });

  it("resolves transitive dependencies", () => {
    const resolver = new DependencyResolver();
    resolver.register({ name: "app", version: "1.0.0", dependencies: { mid: "^1.0.0" } });
    resolver.register({ name: "mid", version: "1.1.0", dependencies: { base: "^2.0.0" } });
    resolver.register({ name: "base", version: "2.3.0", dependencies: {} });
    const resolved = resolver.resolve("app");
    const names = resolved.map((r) => r.name);
    expect(names.indexOf("base")).toBeLessThan(names.indexOf("mid"));
    expect(names.indexOf("mid")).toBeLessThan(names.indexOf("app"));
  });

  it("detects missing dependencies", () => {
    const resolver = new DependencyResolver();
    resolver.register({ name: "app", version: "1.0.0", dependencies: { missing: "^1.0.0" } });
    resolver.resolve("app");
    const conflicts = resolver.getConflicts();
    expect(conflicts.length).toBe(1);
    expect(conflicts[0].package).toBe("missing");
    expect(conflicts[0].available).toBe("none");
  });

  it("detects version conflicts", () => {
    const resolver = new DependencyResolver();
    resolver.register({ name: "app", version: "1.0.0", dependencies: { lib: "~2.0.0" } });
    resolver.register({ name: "lib", version: "2.1.0", dependencies: {} });
    resolver.resolve("app");
    const conflicts = resolver.getConflicts();
    expect(conflicts.length).toBe(1);
    expect(conflicts[0].required).toBe("~2.0.0");
  });

  it("handles circular dependencies without infinite loop", () => {
    const resolver = new DependencyResolver();
    resolver.register({ name: "a", version: "1.0.0", dependencies: { b: "*" } });
    resolver.register({ name: "b", version: "1.0.0", dependencies: { a: "*" } });
    const resolved = resolver.resolve("a");
    expect(resolved.length).toBeGreaterThan(0);
  });

  it("satisfies caret version ranges", () => {
    const resolver = new DependencyResolver();
    resolver.register({ name: "app", version: "1.0.0", dependencies: { lib: "^1.2.0" } });
    resolver.register({ name: "lib", version: "1.5.0", dependencies: {} });
    resolver.resolve("app");
    expect(resolver.getConflicts().length).toBe(0);
  });

  it("rejects caret range with different major", () => {
    const resolver = new DependencyResolver();
    resolver.register({ name: "app", version: "1.0.0", dependencies: { lib: "^1.0.0" } });
    resolver.register({ name: "lib", version: "2.0.0", dependencies: {} });
    resolver.resolve("app");
    expect(resolver.getConflicts().length).toBe(1);
  });

  it("satisfies >= version ranges", () => {
    const resolver = new DependencyResolver();
    resolver.register({ name: "app", version: "1.0.0", dependencies: { lib: ">=1.0.0" } });
    resolver.register({ name: "lib", version: "2.5.0", dependencies: {} });
    resolver.resolve("app");
    expect(resolver.getConflicts().length).toBe(0);
  });

  it("gets install order", () => {
    const resolver = new DependencyResolver();
    resolver.register({ name: "app", version: "1.0.0", dependencies: { lib: "*" } });
    resolver.register({ name: "lib", version: "1.0.0", dependencies: {} });
    resolver.resolve("app");
    const order = resolver.getInstallOrder();
    expect(order).toEqual(["lib", "app"]);
  });

  it("builds dependency tree", () => {
    const resolver = new DependencyResolver();
    resolver.register({ name: "app", version: "1.0.0", dependencies: { lib: "*", util: "*" } });
    resolver.register({ name: "lib", version: "1.0.0", dependencies: {} });
    resolver.register({ name: "util", version: "1.0.0", dependencies: {} });
    const tree = resolver.getDependencyTree("app");
    expect(tree["app"]).toContain("lib");
    expect(tree["app"]).toContain("util");
  });

  it("counts packages", () => {
    const resolver = new DependencyResolver();
    resolver.register({ name: "a", version: "1.0.0", dependencies: {} });
    resolver.register({ name: "b", version: "1.0.0", dependencies: {} });
    expect(resolver.packageCount()).toBe(2);
  });
});
