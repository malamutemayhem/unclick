import { describe, it, expect } from "vitest";
import { StateChart } from "../state-chart.js";

describe("StateChart", () => {
  it("starts in initial state", () => {
    const sc = new StateChart("idle", {});
    expect(sc.state).toBe("idle");
  });

  it("transitions on event", () => {
    const sc = new StateChart("idle", {});
    sc.addTransition({ from: "idle", event: "start", to: "running" });
    expect(sc.send("start")).toBe(true);
    expect(sc.state).toBe("running");
  });

  it("returns false for invalid event", () => {
    const sc = new StateChart("idle", {});
    expect(sc.send("unknown")).toBe(false);
    expect(sc.state).toBe("idle");
  });

  it("respects guards", () => {
    const sc = new StateChart<{ ready: boolean }>("idle", { ready: false });
    sc.addTransition({ from: "idle", event: "go", to: "running", guard: (c) => c.ready });
    expect(sc.send("go")).toBe(false);
    sc.setContext({ ready: true });
    expect(sc.send("go")).toBe(true);
  });

  it("fires onEnter and onExit", () => {
    const log: string[] = [];
    const sc = new StateChart("a", {});
    sc.addState("a", { onExit: () => log.push("exit-a") });
    sc.addState("b", { onEnter: () => log.push("enter-b") });
    sc.addTransition({ from: "a", event: "go", to: "b" });
    sc.send("go");
    expect(log).toEqual(["exit-a", "enter-b"]);
  });

  it("fires transition actions", () => {
    const log: string[] = [];
    const sc = new StateChart("a", {});
    sc.addTransition({ from: "a", event: "go", to: "b", action: () => log.push("action") });
    sc.send("go");
    expect(log).toEqual(["action"]);
  });

  it("tracks history", () => {
    const sc = new StateChart("a", {});
    sc.addTransition({ from: "a", event: "next", to: "b" });
    sc.addTransition({ from: "b", event: "next", to: "c" });
    sc.send("next");
    sc.send("next");
    expect(sc.getHistory()).toEqual(["a", "b", "c"]);
  });

  it("canSend checks availability", () => {
    const sc = new StateChart("idle", {});
    sc.addTransition({ from: "idle", event: "start", to: "running" });
    expect(sc.canSend("start")).toBe(true);
    expect(sc.canSend("stop")).toBe(false);
  });

  it("availableEvents lists options", () => {
    const sc = new StateChart("idle", {});
    sc.addTransition({ from: "idle", event: "start", to: "running" });
    sc.addTransition({ from: "idle", event: "reset", to: "idle" });
    expect(sc.availableEvents().sort()).toEqual(["reset", "start"]);
  });

  it("reset goes back to initial", () => {
    const sc = new StateChart("a", {});
    sc.addTransition({ from: "a", event: "go", to: "b" });
    sc.send("go");
    sc.reset();
    expect(sc.state).toBe("a");
    expect(sc.getHistory()).toEqual(["a"]);
  });
});
