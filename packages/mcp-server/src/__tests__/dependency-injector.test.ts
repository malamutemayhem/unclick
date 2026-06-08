import { describe, it, expect } from "vitest";
import { Container } from "../dependency-injector.js";

describe("Container", () => {
  it("register and resolve", () => {
    const c = new Container();
    c.register("greeting", () => "hello");
    expect(c.resolve<string>("greeting")).toBe("hello");
  });

  it("transient creates new instance each time", () => {
    const c = new Container();
    c.register("obj", () => ({ id: Math.random() }));
    const a = c.resolve<{ id: number }>("obj");
    const b = c.resolve<{ id: number }>("obj");
    expect(a.id).not.toBe(b.id);
  });

  it("singleton returns same instance", () => {
    const c = new Container();
    c.singleton("obj", () => ({ id: Math.random() }));
    const a = c.resolve<{ id: number }>("obj");
    const b = c.resolve<{ id: number }>("obj");
    expect(a.id).toBe(b.id);
  });

  it("has checks registration", () => {
    const c = new Container();
    c.register("x", () => 1);
    expect(c.has("x")).toBe(true);
    expect(c.has("y")).toBe(false);
  });

  it("throws for unknown name", () => {
    const c = new Container();
    expect(() => c.resolve("nope")).toThrow("No registration for");
  });

  it("clear removes all registrations", () => {
    const c = new Container();
    c.register("x", () => 1);
    c.clear();
    expect(c.has("x")).toBe(false);
  });

  it("names lists registered names", () => {
    const c = new Container();
    c.register("a", () => 1);
    c.register("b", () => 2);
    expect(c.names().sort()).toEqual(["a", "b"]);
  });
});
