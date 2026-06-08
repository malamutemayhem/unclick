import { describe, it, expect } from "vitest";
import { FiniteStateMachine } from "../finite-state-machine.js";

describe("FiniteStateMachine", () => {
  it("starts in initial state", () => {
    const fsm = new FiniteStateMachine<"idle" | "running", "start">("idle");
    expect(fsm.state).toBe("idle");
  });

  it("transitions on event", () => {
    const fsm = new FiniteStateMachine<"idle" | "running" | "done", "start" | "finish">("idle");
    fsm.addTransition({ from: "idle", event: "start", to: "running" });
    fsm.addTransition({ from: "running", event: "finish", to: "done" });
    expect(fsm.send("start")).toBe(true);
    expect(fsm.state).toBe("running");
    expect(fsm.send("finish")).toBe(true);
    expect(fsm.state).toBe("done");
  });

  it("rejects invalid transitions", () => {
    const fsm = new FiniteStateMachine<"idle" | "running", "start" | "stop">("idle");
    fsm.addTransition({ from: "idle", event: "start", to: "running" });
    expect(fsm.send("stop")).toBe(false);
    expect(fsm.state).toBe("idle");
  });

  it("respects guards", () => {
    let allowed = false;
    const fsm = new FiniteStateMachine<"a" | "b", "go">("a");
    fsm.addTransition({ from: "a", event: "go", to: "b", guard: () => allowed });
    expect(fsm.send("go")).toBe(false);
    expect(fsm.state).toBe("a");
    allowed = true;
    expect(fsm.send("go")).toBe(true);
    expect(fsm.state).toBe("b");
  });

  it("runs actions on transition", () => {
    let count = 0;
    const fsm = new FiniteStateMachine<"a" | "b", "go">("a");
    fsm.addTransition({ from: "a", event: "go", to: "b", action: () => count++ });
    fsm.send("go");
    expect(count).toBe(1);
  });

  it("can() checks availability", () => {
    const fsm = new FiniteStateMachine<"a" | "b", "go" | "back">("a");
    fsm.addTransition({ from: "a", event: "go", to: "b" });
    fsm.addTransition({ from: "b", event: "back", to: "a" });
    expect(fsm.can("go")).toBe(true);
    expect(fsm.can("back")).toBe(false);
  });

  it("lists available events", () => {
    const fsm = new FiniteStateMachine<"a" | "b", "go" | "stay">("a");
    fsm.addTransitions([
      { from: "a", event: "go", to: "b" },
      { from: "a", event: "stay", to: "a" },
    ]);
    expect(fsm.availableEvents().sort()).toEqual(["go", "stay"]);
  });

  it("notifies listeners on transition", () => {
    const log: string[] = [];
    const fsm = new FiniteStateMachine<"a" | "b", "go">("a");
    fsm.addTransition({ from: "a", event: "go", to: "b" });
    const unsub = fsm.onTransition((from, to, event) => log.push(`${from}->${to}:${event}`));
    fsm.send("go");
    expect(log).toEqual(["a->b:go"]);
    unsub();
  });

  it("resets state", () => {
    const fsm = new FiniteStateMachine<"a" | "b", "go">("a");
    fsm.addTransition({ from: "a", event: "go", to: "b" });
    fsm.send("go");
    fsm.reset("a");
    expect(fsm.state).toBe("a");
  });
});
