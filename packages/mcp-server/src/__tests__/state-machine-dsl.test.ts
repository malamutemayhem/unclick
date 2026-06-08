import { describe, it, expect } from "vitest";
import { StateMachineDSL } from "../state-machine-dsl.js";

describe("StateMachineDSL", () => {
  it("starts in initial state", () => {
    const sm = new StateMachineDSL<"idle" | "running", "start">("idle");
    expect(sm.state).toBe("idle");
  });

  it("transitions on event", () => {
    const sm = new StateMachineDSL<"idle" | "running" | "done", "start" | "finish">("idle")
      .transition("idle", "start", "running")
      .transition("running", "finish", "done");
    expect(sm.send("start")).toBe(true);
    expect(sm.state).toBe("running");
    expect(sm.send("finish")).toBe(true);
    expect(sm.state).toBe("done");
  });

  it("rejects invalid transitions", () => {
    const sm = new StateMachineDSL<"a" | "b", "go">("a")
      .transition("a", "go", "b");
    sm.send("go");
    expect(sm.send("go")).toBe(false);
  });

  it("guard blocks transition", () => {
    let allowed = false;
    const sm = new StateMachineDSL<"a" | "b", "try">("a")
      .transition("a", "try", "b", { guard: () => allowed });
    expect(sm.send("try")).toBe(false);
    allowed = true;
    expect(sm.send("try")).toBe(true);
  });

  it("action fires on transition", () => {
    let fired = false;
    const sm = new StateMachineDSL<"a" | "b", "go">("a")
      .transition("a", "go", "b", { action: () => { fired = true; } });
    sm.send("go");
    expect(fired).toBe(true);
  });

  it("onEnter and onExit hooks", () => {
    const log: string[] = [];
    const sm = new StateMachineDSL<"a" | "b", "go">("a")
      .transition("a", "go", "b")
      .onExit("a", () => log.push("exit-a"))
      .onEnter("b", () => log.push("enter-b"));
    sm.send("go");
    expect(log).toEqual(["exit-a", "enter-b"]);
  });

  it("stateHistory tracks transitions", () => {
    const sm = new StateMachineDSL<"a" | "b" | "c", "next">("a")
      .transition("a", "next", "b")
      .transition("b", "next", "c");
    sm.send("next");
    sm.send("next");
    expect(sm.stateHistory).toEqual(["a", "b", "c"]);
  });

  it("availableEvents lists valid events", () => {
    const sm = new StateMachineDSL<"a" | "b", "go" | "stop">("a")
      .transition("a", "go", "b")
      .transition("a", "stop", "a");
    expect(sm.availableEvents().sort()).toEqual(["go", "stop"]);
  });
});
