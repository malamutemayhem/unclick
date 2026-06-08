import { describe, it, expect } from "vitest";
import { StateMachineViz } from "../state-machine-viz.js";

describe("StateMachineViz", () => {
  it("transitions between states", () => {
    const sm = new StateMachineViz("idle");
    sm.addTransition("idle", "start", "running");
    sm.addTransition("running", "stop", "idle");
    expect(sm.state).toBe("idle");
    sm.send("start");
    expect(sm.state).toBe("running");
  });

  it("returns false for invalid transitions", () => {
    const sm = new StateMachineViz("idle");
    sm.addTransition("idle", "start", "running");
    expect(sm.send("stop")).toBe(false);
    expect(sm.state).toBe("idle");
  });

  it("tracks history", () => {
    const sm = new StateMachineViz("a");
    sm.addTransition("a", "go", "b");
    sm.addTransition("b", "go", "c");
    sm.send("go");
    sm.send("go");
    expect(sm.getHistory()).toEqual(["a", "b", "c"]);
  });

  it("detects final states", () => {
    const sm = new StateMachineViz("start");
    sm.addState("end", true);
    sm.addTransition("start", "finish", "end");
    sm.send("finish");
    expect(sm.isInFinalState).toBe(true);
  });

  it("getAvailableEvents lists valid events", () => {
    const sm = new StateMachineViz("idle");
    sm.addTransition("idle", "start", "running");
    sm.addTransition("idle", "configure", "config");
    expect(sm.getAvailableEvents().sort()).toEqual(["configure", "start"]);
  });

  it("reset returns to initial state", () => {
    const sm = new StateMachineViz("idle");
    sm.addTransition("idle", "go", "active");
    sm.send("go");
    sm.reset();
    expect(sm.state).toBe("idle");
  });

  it("toDot generates DOT format", () => {
    const sm = new StateMachineViz("idle");
    sm.addTransition("idle", "start", "running");
    const dot = sm.toDot();
    expect(dot).toContain("digraph");
    expect(dot).toContain('"idle" -> "running"');
  });

  it("toMermaid generates Mermaid format", () => {
    const sm = new StateMachineViz("idle");
    sm.addTransition("idle", "start", "running");
    const mermaid = sm.toMermaid();
    expect(mermaid).toContain("stateDiagram-v2");
    expect(mermaid).toContain("idle --> running");
  });

  it("counts states and transitions", () => {
    const sm = new StateMachineViz("a");
    sm.addTransition("a", "x", "b");
    sm.addTransition("b", "y", "c");
    expect(sm.stateCount).toBe(3);
    expect(sm.transitionCount).toBe(2);
  });
});
