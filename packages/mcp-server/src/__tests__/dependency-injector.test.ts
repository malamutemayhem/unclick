import { describe, it, expect } from "vitest";
import { Container } from "../dependency-injector.js";

describe("Container", () => {
  it("register and resolve transient", () => {
    const c = new Container();
    let count = 0;
    c.transient("counter", () => ++count);
    expect(c.resolve("counter")).toBe(1);
    expect(c.resolve("counter")).toBe(2);
  });

  it("register and resolve singleton", () => {
    const c = new Container();
    let count = 0;
    c.singleton("counter", () => ++count);
    expect(c.resolve("counter")).toBe(1);
    expect(c.resolve("counter")).toBe(1);
  });

  it("throws on unregistered", () => {
    const c = new Container();
    expect(() => c.resolve("missing")).toThrow('No registration for "missing"');
  });

  it("has checks existence", () => {
    const c = new Container();
    c.register("a", () => 1);
    expect(c.has("a")).toBe(true);
    expect(c.has("b")).toBe(false);
  });

  it("remove deletes registration", () => {
    const c = new Container();
    c.register("a", () => 1);
    expect(c.remove("a")).toBe(true);
    expect(c.has("a")).toBe(false);
  });

  it("clear removes all", () => {
    const c = new Container();
    c.register("a", () => 1).register("b", () => 2);
    c.clear();
    expect(c.size).toBe(0);
  });

  it("names lists registered names", () => {
    const c = new Container();
    c.register("a", () => 1).register("b", () => 2);
    expect(c.names().sort()).toEqual(["a", "b"]);
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
