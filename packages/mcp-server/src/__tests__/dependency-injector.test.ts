import { describe, it, expect } from "vitest";
import { Container, createContainer } from "../dependency-injector.js";

describe("Container", () => {
  it("register and resolve", () => {
    const c = new Container();
    c.register("num", () => 42);
    expect(c.resolve("num")).toBe(42);
  });

  it("singleton by default", () => {
    const c = new Container();
    let count = 0;
    c.register("obj", () => ({ id: ++count }));
    const a = c.resolve("obj");
    const b = c.resolve("obj");
    expect(a).toBe(b);
    expect(count).toBe(1);
  });

  it("registerTransient creates new each time", () => {
    const c = new Container();
    let count = 0;
    c.registerTransient("obj", () => ({ id: ++count }));
    const a = c.resolve<{ id: number }>("obj");
    const b = c.resolve<{ id: number }>("obj");
    expect(a).not.toBe(b);
    expect(a.id).toBe(1);
    expect(b.id).toBe(2);
  });

  it("registerSingleton explicitly", () => {
    const c = new Container();
    let count = 0;
    c.registerSingleton("s", () => ++count);
    expect(c.resolve("s")).toBe(1);
    expect(c.resolve("s")).toBe(1);
  });

  it("registerValue stores value directly", () => {
    const c = new Container();
    c.registerValue("val", "hello");
    expect(c.resolve("val")).toBe("hello");
  });

  it("has checks registration", () => {
    const c = new Container();
    expect(c.has("x")).toBe(false);
    c.register("x", () => 1);
    expect(c.has("x")).toBe(true);
  });

  it("throws for unknown name", () => {
    const c = new Container();
    expect(() => c.resolve("missing")).toThrow("No registration found");
  });

  it("remove deletes registration", () => {
    const c = new Container();
    c.register("x", () => 1);
    expect(c.remove("x")).toBe(true);
    expect(c.has("x")).toBe(false);
    expect(c.remove("x")).toBe(false);
  });

  it("clear removes all", () => {
    const c = new Container();
    c.register("a", () => 1);
    c.register("b", () => 2);
    c.clear();
    expect(c.registeredNames).toEqual([]);
  });

  it("registeredNames lists all", () => {
    const c = new Container();
    c.register("a", () => 1);
    c.registerValue("b", 2);
    expect(c.registeredNames.sort()).toEqual(["a", "b"]);
  });

  it("createContainer helper", () => {
    const c = createContainer();
    expect(c).toBeInstanceOf(Container);
  });
});
