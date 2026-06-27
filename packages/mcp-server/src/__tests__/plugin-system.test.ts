import { describe, it, expect } from "vitest";
import { PluginManager } from "../plugin-system.js";
import type { Plugin } from "../plugin-system.js";

describe("PluginManager", () => {
  it("registers and lists plugins", () => {
    const mgr = new PluginManager();
    mgr.register({ name: "core" });
    mgr.register({ name: "ui" });
    expect(mgr.listPlugins()).toEqual(["core", "ui"]);
  });

  it("prevents duplicate registration", () => {
    const mgr = new PluginManager();
    mgr.register({ name: "core" });
    expect(() => mgr.register({ name: "core" })).toThrow();
  });

  it("initializes plugins", () => {
    const mgr = new PluginManager();
    let initialized = false;
    mgr.register({ name: "test", initialize: () => { initialized = true; } });
    mgr.initialize();
    expect(initialized).toBe(true);
  });

  it("resolves dependencies", () => {
    const mgr = new PluginManager();
    const order: string[] = [];
    mgr.register({ name: "db", initialize: () => order.push("db") });
    mgr.register({ name: "api", dependencies: ["db"], initialize: () => order.push("api") });
    mgr.initialize();
    expect(order).toEqual(["db", "api"]);
  });

  it("detects circular dependencies", () => {
    const mgr = new PluginManager();
    mgr.register({ name: "a", dependencies: ["b"] });
    mgr.register({ name: "b", dependencies: ["a"] });
    expect(() => mgr.initialize()).toThrow("Circular");
  });

  it("detects missing dependencies", () => {
    const mgr = new PluginManager();
    mgr.register({ name: "a", dependencies: ["missing"] });
    expect(() => mgr.initialize()).toThrow("Missing");
  });

  it("emits and listens to events", () => {
    const mgr = new PluginManager();
    let received: unknown;
    mgr.on("test", (data) => { received = data; });
    mgr.emit("test", "hello");
    expect(received).toBe("hello");
  });

  it("getPlugin returns registered plugin", () => {
    const mgr = new PluginManager();
    const plugin: Plugin = { name: "test" };
    mgr.register(plugin);
    expect(mgr.getPlugin("test")).toBe(plugin);
    expect(mgr.hasPlugin("test")).toBe(true);
    expect(mgr.hasPlugin("nope")).toBe(false);
  });

  it("destroys in reverse order", () => {
    const mgr = new PluginManager();
    const order: string[] = [];
    mgr.register({ name: "a", destroy: () => order.push("a") });
    mgr.register({ name: "b", dependencies: ["a"], destroy: () => order.push("b") });
    mgr.initialize();
    mgr.destroy();
    expect(order).toEqual(["b", "a"]);
  });
});
