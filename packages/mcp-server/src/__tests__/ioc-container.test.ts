import { describe, it, expect } from "vitest";
import { IoCContainer } from "../ioc-container.js";

describe("IoCContainer", () => {
  it("registers and resolves transient", () => {
    const container = new IoCContainer();
    let count = 0;
    container.transient("counter", () => ++count);
    expect(container.resolve("counter")).toBe(1);
    expect(container.resolve("counter")).toBe(2);
  });

  it("registers and resolves singleton", () => {
    const container = new IoCContainer();
    let count = 0;
    container.singleton("counter", () => ++count);
    expect(container.resolve("counter")).toBe(1);
    expect(container.resolve("counter")).toBe(1);
  });

  it("registers values directly", () => {
    const container = new IoCContainer();
    container.registerValue("config", { port: 8080 });
    expect(container.resolve<{ port: number }>("config").port).toBe(8080);
  });

  it("throws on missing binding", () => {
    const container = new IoCContainer();
    expect(() => container.resolve("missing")).toThrow("No binding found");
  });

  it("detects circular dependencies", () => {
    const container = new IoCContainer();
    container.singleton("a", () => container.resolve("b"));
    container.singleton("b", () => container.resolve("a"));
    expect(() => container.resolve("a")).toThrow("Circular dependency");
  });

  it("has checks existence", () => {
    const container = new IoCContainer();
    container.registerValue("x", 1);
    expect(container.has("x")).toBe(true);
    expect(container.has("y")).toBe(false);
  });

  it("remove deletes binding", () => {
    const container = new IoCContainer();
    container.registerValue("x", 1);
    container.remove("x");
    expect(container.has("x")).toBe(false);
  });

  it("createChild inherits bindings", () => {
    const parent = new IoCContainer();
    parent.registerValue("shared", 42);
    const child = parent.createChild();
    expect(child.resolve("shared")).toBe(42);
  });

  it("registeredNames lists all", () => {
    const container = new IoCContainer();
    container.registerValue("a", 1);
    container.registerValue("b", 2);
    expect(container.registeredNames.sort()).toEqual(["a", "b"]);
  });
});
