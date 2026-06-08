import { describe, it, expect, vi } from "vitest";
import { FiniteStateMachine } from "../finite-state-machine.js";

type LightState = "red" | "yellow" | "green";
type LightEvent = "next" | "emergency";

describe("FiniteStateMachine", () => {
  function createLight() {
    return new FiniteStateMachine<LightState, LightEvent, { count: number }>({
      initial: "red",
      context: { count: 0 },
      transitions: {
        red: { next: "green" },
        green: { next: "yellow", emergency: "red" },
        yellow: { next: "red" },
      },
    });
  }

  it("starts in initial state", () => {
    const fsm = createLight();
    expect(fsm.state).toBe("red");
  });

  it("transitions on event", () => {
    const fsm = createLight();
    expect(fsm.send("next")).toBe(true);
    expect(fsm.state).toBe("green");
  });

  it("rejects invalid events", () => {
    const fsm = createLight();
    expect(fsm.send("emergency")).toBe(false);
    expect(fsm.state).toBe("red");
  });

  it("can check allowed events", () => {
    const fsm = createLight();
    expect(fsm.can("next")).toBe(true);
    expect(fsm.can("emergency")).toBe(false);
  });

  it("lists allowed events", () => {
    const fsm = createLight();
    fsm.send("next");
    expect(fsm.allowedEvents()).toContain("next");
    expect(fsm.allowedEvents()).toContain("emergency");
  });

  it("tracks history", () => {
    const fsm = createLight();
    fsm.send("next");
    fsm.send("next");
    const h = fsm.getHistory();
    expect(h).toHaveLength(2);
    expect(h[0].from).toBe("red");
    expect(h[0].to).toBe("green");
  });

  it("calls onChange listeners", () => {
    const fsm = createLight();
    const listener = vi.fn();
    fsm.onChange(listener);
    fsm.send("next");
    expect(listener).toHaveBeenCalledWith("green", expect.any(Object));
  });

  it("resets to initial", () => {
    const fsm = createLight();
    fsm.send("next");
    fsm.reset();
    expect(fsm.state).toBe("red");
    expect(fsm.getHistory()).toHaveLength(0);
  });

  it("calls onEnter/onExit", () => {
    const enter = vi.fn();
    const exit = vi.fn();
    const fsm = new FiniteStateMachine<LightState, LightEvent, { count: number }>({
      initial: "red",
      context: { count: 0 },
      transitions: { red: { next: "green" }, green: { next: "yellow" }, yellow: { next: "red" } },
      onEnter: { green: enter },
      onExit: { red: exit },
    });
    fsm.send("next");
    expect(exit).toHaveBeenCalled();
    expect(enter).toHaveBeenCalled();
  });
});
