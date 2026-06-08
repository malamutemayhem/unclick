import { describe, it, expect } from "vitest";
import { Container } from "../dependency-injector.js";

describe("Container", () => {
  it("registers and resolves", () => {
    const c = new Container();
    c.register("greeting", () => "hello");
    expect(c.resolve("greeting")).toBe("hello");
  });

  it("resolves dependencies", () => {
    const c = new Container();
    c.value("name", "World");
    c.register("greeting", (ctx) => `Hello, ${ctx.resolve<string>("name")}!`);
    expect(c.resolve("greeting")).toBe("Hello, World!");
  });

  it("singleton returns same instance", () => {
    const c = new Container();
    c.singleton("obj", () => ({ id: Math.random() }));
    const a = c.resolve("obj");
    const b = c.resolve("obj");
    expect(a).toBe(b);
  });

  it("non-singleton creates new each time", () => {
    const c = new Container();
    c.register("obj", () => ({ id: Math.random() }));
    const a = c.resolve("obj");
    const b = c.resolve("obj");
    expect(a).not.toBe(b);
  });

  it("detects circular dependencies", () => {
    const c = new Container();
    c.register("a", (ctx) => ctx.resolve("b"));
    c.register("b", (ctx) => ctx.resolve("a"));
    expect(() => c.resolve("a")).toThrow("Circular");
  });

  it("throws for unknown binding", () => {
    const c = new Container();
    expect(() => c.resolve("missing")).toThrow("No binding");
  });

  it("has checks existence", () => {
    const c = new Container();
    c.value("x", 1);
    expect(c.has("x")).toBe(true);
    expect(c.has("y")).toBe(false);
  });

  it("getByTag returns tagged bindings", () => {
    const c = new Container();
    c.value("a", 1, ["num"]);
    c.value("b", 2, ["num"]);
    c.value("c", "x", ["str"]);
    expect(c.getByTag("num")).toEqual([1, 2]);
  });

  it("reset clears singleton instances", () => {
    const c = new Container();
    c.singleton("obj", () => ({ id: Math.random() }));
    const a = c.resolve("obj");
    c.reset();
    const b = c.resolve("obj");
    expect(a).not.toBe(b);
  });

  it("child creates independent container", () => {
    const parent = new Container();
    parent.singleton("x", () => ({ v: 1 }));
    parent.resolve("x");
    const child = parent.child();
    const cv = child.resolve<{ v: number }>("x");
    expect(cv.v).toBe(1);
    expect(child.resolve("x")).not.toBe(parent.resolve("x"));
  });

  it("listBindings returns names", () => {
    const c = new Container();
    c.value("a", 1);
    c.value("b", 2);
    expect(c.listBindings().sort()).toEqual(["a", "b"]);
  });
});
