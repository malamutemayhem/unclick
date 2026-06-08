import { describe, it, expect } from "vitest";
import { StateMachine } from "../state-machine.js";

describe("StateMachine", () => {
  const config = {
    idle: { start: { target: "running" as const } },
    running: {
      pause: { target: "paused" as const },
      stop: { target: "idle" as const },
    },
    paused: {
      resume: { target: "running" as const },
      stop: { target: "idle" as const },
    },
  };

  it("starts in initial state", () => {
    const sm = new StateMachine("idle", config);
    expect(sm.state).toBe("idle");
  });

  it("transitions on valid events", () => {
    const sm = new StateMachine("idle", config);
    expect(sm.send("start")).toBe(true);
    expect(sm.state).toBe("running");
  });

  it("rejects invalid events", () => {
    const sm = new StateMachine("idle", config);
    expect(sm.send("pause")).toBe(false);
    expect(sm.state).toBe("idle");
  });

  it("can checks event availability", () => {
    const sm = new StateMachine("idle", config);
    expect(sm.can("start")).toBe(true);
    expect(sm.can("pause")).toBe(false);
  });

  it("availableEvents lists valid events", () => {
    const sm = new StateMachine("running", config);
    expect(sm.availableEvents().sort()).toEqual(["pause", "stop"]);
  });

  it("fires transition actions", () => {
    let actionCalled = false;
    const sm = new StateMachine("idle", {
      idle: { go: { target: "done" as const, action: () => { actionCalled = true; } } },
    });
    sm.send("go");
    expect(actionCalled).toBe(true);
  });

  it("notifies transition listeners", () => {
    const sm = new StateMachine("idle", config);
    const transitions: string[] = [];
    sm.onTransition((from, to) => transitions.push(`${from}->${to}`));
    sm.send("start");
    sm.send("pause");
    expect(transitions).toEqual(["idle->running", "running->paused"]);
  });

  it("tracks history", () => {
    const sm = new StateMachine("idle", config);
    sm.send("start");
    sm.send("pause");
    expect(sm.getHistory()).toEqual(["idle", "running", "paused"]);
  });

  it("reset clears state and history", () => {
    const sm = new StateMachine("idle", config);
    sm.send("start");
    sm.reset("idle");
    expect(sm.state).toBe("idle");
    expect(sm.getHistory()).toEqual(["idle"]);
  });
});
