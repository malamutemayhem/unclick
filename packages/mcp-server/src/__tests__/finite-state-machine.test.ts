import { describe, it, expect, vi } from "vitest";
import { FiniteStateMachine } from "../finite-state-machine.js";

type State = "idle" | "loading" | "success" | "error";
type Event = "fetch" | "resolve" | "reject" | "reset";

const config = {
  initial: "idle" as State,
  transitions: [
    { from: "idle" as State, event: "fetch" as Event, to: "loading" as State },
    { from: "loading" as State, event: "resolve" as Event, to: "success" as State },
    { from: "loading" as State, event: "reject" as Event, to: "error" as State },
    { from: "success" as State, event: "reset" as Event, to: "idle" as State },
    { from: "error" as State, event: "reset" as Event, to: "idle" as State },
  ],
};

describe("FiniteStateMachine", () => {
  it("starts in initial state", () => {
    const fsm = new FiniteStateMachine(config);
    expect(fsm.state).toBe("idle");
  });

  it("transitions on valid event", () => {
    const fsm = new FiniteStateMachine(config);
    expect(fsm.send("fetch")).toBe("loading");
    expect(fsm.state).toBe("loading");
  });

  it("throws on invalid transition", () => {
    const fsm = new FiniteStateMachine(config);
    expect(() => fsm.send("resolve")).toThrow();
  });

  it("checks can() for valid/invalid events", () => {
    const fsm = new FiniteStateMachine(config);
    expect(fsm.can("fetch")).toBe(true);
    expect(fsm.can("resolve")).toBe(false);
  });

  it("follows a full path", () => {
    const fsm = new FiniteStateMachine(config);
    fsm.send("fetch");
    fsm.send("resolve");
    expect(fsm.state).toBe("success");
    fsm.send("reset");
    expect(fsm.state).toBe("idle");
  });

  it("calls onEnter and onExit hooks", () => {
    const onEnter = vi.fn();
    const onExit = vi.fn();
    const fsm = new FiniteStateMachine({
      ...config,
      onEnter: { loading: onEnter },
      onExit: { idle: onExit },
    });
    fsm.send("fetch");
    expect(onExit).toHaveBeenCalled();
    expect(onEnter).toHaveBeenCalled();
  });

  it("notifies subscribers on transition", () => {
    const fsm = new FiniteStateMachine(config);
    const fn = vi.fn();
    fsm.subscribe(fn);
    fsm.send("fetch");
    expect(fn).toHaveBeenCalledWith("loading", "fetch");
  });

  it("unsubscribe stops notifications", () => {
    const fsm = new FiniteStateMachine(config);
    const fn = vi.fn();
    const off = fsm.subscribe(fn);
    off();
    fsm.send("fetch");
    expect(fn).not.toHaveBeenCalled();
  });

  it("lists available events", () => {
    const fsm = new FiniteStateMachine(config);
    expect(fsm.availableEvents()).toEqual(["fetch"]);
    fsm.send("fetch");
    expect(fsm.availableEvents().sort()).toEqual(["reject", "resolve"]);
  });
});
