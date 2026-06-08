import { describe, it, expect, vi } from "vitest";
import { StateMachine } from "../state-machine.js";

type S = "idle" | "loading" | "success" | "error";
type E = "fetch" | "resolve" | "reject" | "reset";

function createTestMachine() {
  return new StateMachine<S, E>("idle", [
    { from: "idle", event: "fetch", to: "loading" },
    { from: "loading", event: "resolve", to: "success" },
    { from: "loading", event: "reject", to: "error" },
    { from: "success", event: "reset", to: "idle" },
    { from: "error", event: "reset", to: "idle" },
  ]);
}

describe("StateMachine", () => {
  it("starts in initial state", () => {
    const sm = createTestMachine();
    expect(sm.state).toBe("idle");
  });

  it("transitions on valid event", () => {
    const sm = createTestMachine();
    expect(sm.send("fetch")).toBe(true);
    expect(sm.state).toBe("loading");
  });

  it("rejects invalid event", () => {
    const sm = createTestMachine();
    expect(sm.send("resolve")).toBe(false);
    expect(sm.state).toBe("idle");
  });

  it("can checks if event is allowed", () => {
    const sm = createTestMachine();
    expect(sm.can("fetch")).toBe(true);
    expect(sm.can("resolve")).toBe(false);
  });

  it("lists allowed events", () => {
    const sm = createTestMachine();
    expect(sm.allowedEvents()).toEqual(["fetch"]);
    sm.send("fetch");
    expect(sm.allowedEvents()).toEqual(["resolve", "reject"]);
  });

  it("fires transition actions", () => {
    const action = vi.fn();
    const sm = new StateMachine<"a" | "b", "go">("a", [
      { from: "a", event: "go", to: "b", action },
    ]);
    sm.send("go");
    expect(action).toHaveBeenCalledTimes(1);
  });

  it("respects guard conditions", () => {
    let allowed = false;
    const sm = new StateMachine<"a" | "b", "go">("a", [
      { from: "a", event: "go", to: "b", guard: () => allowed },
    ]);
    expect(sm.send("go")).toBe(false);
    allowed = true;
    expect(sm.send("go")).toBe(true);
  });

  it("notifies transition listeners", () => {
    const sm = createTestMachine();
    const listener = vi.fn();
    sm.onTransition(listener);
    sm.send("fetch");
    expect(listener).toHaveBeenCalledWith("idle", "fetch", "loading");
  });

  it("unsubscribes listeners", () => {
    const sm = createTestMachine();
    const listener = vi.fn();
    const unsub = sm.onTransition(listener);
    unsub();
    sm.send("fetch");
    expect(listener).not.toHaveBeenCalled();
  });

  it("walks through full lifecycle", () => {
    const sm = createTestMachine();
    sm.send("fetch");
    sm.send("resolve");
    expect(sm.state).toBe("success");
    sm.send("reset");
    expect(sm.state).toBe("idle");
  });
});
