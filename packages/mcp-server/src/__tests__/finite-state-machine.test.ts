import { describe, it, expect, vi } from "vitest";
import { createMachine } from "../finite-state-machine.js";

describe("StateMachine", () => {
  it("starts in initial state", () => {
    const m = createMachine({
      initial: "idle",
      states: { idle: { on: { START: "running" } }, running: {} },
    });
    expect(m.state).toBe("idle");
  });

  it("transitions on event", () => {
    const m = createMachine({
      initial: "idle",
      states: { idle: { on: { START: "running" } }, running: {} },
    });
    expect(m.send("START")).toBe(true);
    expect(m.state).toBe("running");
  });

  it("returns false for invalid event", () => {
    const m = createMachine({
      initial: "idle",
      states: { idle: { on: { START: "running" } }, running: {} },
    });
    expect(m.send("STOP" as any)).toBe(false);
    expect(m.state).toBe("idle");
  });

  it("calls onEnter and onExit", () => {
    const enter = vi.fn();
    const exit = vi.fn();
    const m = createMachine({
      initial: "a",
      states: {
        a: { on: { GO: "b" }, onExit: exit },
        b: { onEnter: enter },
      },
    });
    m.send("GO");
    expect(exit).toHaveBeenCalled();
    expect(enter).toHaveBeenCalled();
  });

  it("guard prevents transition", () => {
    const m = createMachine({
      initial: "locked",
      states: {
        locked: { on: { UNLOCK: { target: "unlocked", guard: () => false } } },
        unlocked: {},
      },
    });
    expect(m.send("UNLOCK")).toBe(false);
    expect(m.state).toBe("locked");
  });

  it("guard allows transition", () => {
    const m = createMachine({
      initial: "locked",
      states: {
        locked: { on: { UNLOCK: { target: "unlocked", guard: () => true } } },
        unlocked: {},
      },
    });
    expect(m.send("UNLOCK")).toBe(true);
    expect(m.state).toBe("unlocked");
  });

  it("action runs on transition", () => {
    const action = vi.fn();
    const m = createMachine({
      initial: "a",
      states: {
        a: { on: { GO: { target: "b", action } } },
        b: {},
      },
    });
    m.send("GO");
    expect(action).toHaveBeenCalled();
  });

  it("can() checks availability", () => {
    const m = createMachine({
      initial: "idle",
      states: { idle: { on: { START: "running" } }, running: {} },
    });
    expect(m.can("START")).toBe(true);
    expect(m.can("STOP" as any)).toBe(false);
  });

  it("matches() checks current state", () => {
    const m = createMachine({
      initial: "idle",
      states: { idle: {}, running: {} },
    });
    expect(m.matches("idle")).toBe(true);
    expect(m.matches("running")).toBe(false);
  });

  it("subscribe notifies on transition", () => {
    const listener = vi.fn();
    const m = createMachine({
      initial: "a",
      states: { a: { on: { GO: "b" } }, b: {} },
    });
    const unsub = m.subscribe(listener);
    m.send("GO");
    expect(listener).toHaveBeenCalledWith("b", "GO");
    unsub();
    m.send("GO" as any);
    expect(listener).toHaveBeenCalledTimes(1);
  });

  it("onEnter called for initial state", () => {
    const enter = vi.fn();
    createMachine({
      initial: "start",
      states: { start: { onEnter: enter } },
    });
    expect(enter).toHaveBeenCalled();
  });
});
