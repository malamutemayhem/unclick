import { describe, it, expect } from "vitest";
import { Container } from "../dependency-injector.js";

describe("Container", () => {
  it("registers and resolves", () => {
    const c = new Container();
    c.register("greeting", () => "hello");
    expect(c.resolve("greeting")).toBe("hello");
  });

  it("throws for unregistered name", () => {
    const c = new Container();
    expect(() => c.resolve("nope")).toThrow("No registration for: nope");
  });

  it("creates new instance each time by default", () => {
    const c = new Container();
    c.register("obj", () => ({ id: Math.random() }));
    const a = c.resolve<{ id: number }>("obj");
    const b = c.resolve<{ id: number }>("obj");
    expect(a.id).not.toBe(b.id);
  });

  it("singleton returns same instance", () => {
    const c = new Container();
    c.register("obj", () => ({ id: Math.random() }), { singleton: true });
    const a = c.resolve<{ id: number }>("obj");
    const b = c.resolve<{ id: number }>("obj");
    expect(a.id).toBe(b.id);
  });

  it("registerValue stores constant", () => {
    const c = new Container();
    c.registerValue("config", { port: 3000 });
    expect(c.resolve<{ port: number }>("config").port).toBe(3000);
  });

  it("has checks registration", () => {
    const c = new Container();
    c.register("x", () => 1);
    expect(c.has("x")).toBe(true);
    expect(c.has("y")).toBe(false);
  });

  it("unregister removes", () => {
    const c = new Container();
    c.register("x", () => 1);
    expect(c.unregister("x")).toBe(true);
    expect(c.has("x")).toBe(false);
  });

  it("getByTag filters", () => {
    const c = new Container();
    c.register("a", () => 1, { tags: ["service"] });
    c.register("b", () => 2, { tags: ["service", "core"] });
    c.register("c", () => 3, { tags: ["util"] });
    expect(c.getByTag("service")).toEqual(["a", "b"]);
  });

  it("names lists all", () => {
    const c = new Container();
    c.register("a", () => 1);
    c.register("b", () => 2);
    expect(c.names()).toEqual(["a", "b"]);
  });

  it("clear empties", () => {
    const c = new Container();
    c.register("a", () => 1);
    c.clear();
    expect(c.size).toBe(0);
  });

  it("createChild inherits registrations", () => {
    const parent = new Container();
    parent.register("x", () => 42);
    const child = parent.createChild();
    expect(child.resolve("x")).toBe(42);
    child.register("y", () => 99);
    expect(parent.has("y")).toBe(false);
  });
});
