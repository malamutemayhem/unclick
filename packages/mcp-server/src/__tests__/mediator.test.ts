import { describe, it, expect } from "vitest";
import { Mediator, AsyncMediator } from "../mediator.js";

describe("Mediator", () => {
  it("registers and sends", () => {
    const m = new Mediator();
    m.register<number>("double", (n) => n * 2);
    expect(m.send<number, number>("double", 5)).toBe(10);
  });

  it("returns undefined for unregistered channel", () => {
    const m = new Mediator();
    expect(m.send("nope", 1)).toBeUndefined();
  });

  it("unregisters via returned function", () => {
    const m = new Mediator();
    const unsub = m.register("ch", () => "ok");
    expect(m.has("ch")).toBe(true);
    unsub();
    expect(m.has("ch")).toBe(false);
  });

  it("lists channels", () => {
    const m = new Mediator();
    m.register("a", () => {});
    m.register("b", () => {});
    expect(m.channels().sort()).toEqual(["a", "b"]);
  });

  it("clear removes all", () => {
    const m = new Mediator();
    m.register("a", () => {});
    m.clear();
    expect(m.channels()).toEqual([]);
  });
});

describe("AsyncMediator", () => {
  it("sends async", async () => {
    const m = new AsyncMediator();
    m.register<string, string>("greet", async (name) => `hi ${name}`);
    expect(await m.send<string, string>("greet", "world")).toBe("hi world");
  });

  it("returns undefined for missing channel", async () => {
    const m = new AsyncMediator();
    expect(await m.send("nope", 1)).toBeUndefined();
  });
});
