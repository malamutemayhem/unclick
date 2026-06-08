import { describe, it, expect, vi } from "vitest";
import { StateChart } from "../state-chart.js";

describe("state-chart", () => {
  it("starts in initial state", () => {
    const sc = new StateChart();
    sc.addState("idle");
    sc.addState("running");
    sc.start("idle");
    expect(sc.leaf).toBe("idle");
    expect(sc.isIn("idle")).toBe(true);
  });

  it("transitions on event", () => {
    const sc = new StateChart();
    sc.addState("idle");
    sc.addState("running");
    sc.addTransition("idle", "start", "running");
    sc.start("idle");
    expect(sc.send("start")).toBe(true);
    expect(sc.leaf).toBe("running");
  });

  it("returns false for unknown event", () => {
    const sc = new StateChart();
    sc.addState("idle");
    sc.start("idle");
    expect(sc.send("unknown")).toBe(false);
  });

  it("guard prevents transition", () => {
    const sc = new StateChart();
    sc.addState("idle");
    sc.addState("running");
    sc.addTransition("idle", "start", "running", { guard: () => false });
    sc.start("idle");
    expect(sc.send("start")).toBe(false);
    expect(sc.leaf).toBe("idle");
  });

  it("calls onEnter and onExit", () => {
    const enter = vi.fn();
    const exit = vi.fn();
    const sc = new StateChart();
    sc.addState("idle", { onExit: exit });
    sc.addState("running", { onEnter: enter });
    sc.addTransition("idle", "start", "running");
    sc.start("idle");
    sc.send("start");
    expect(exit).toHaveBeenCalled();
    expect(enter).toHaveBeenCalled();
  });

  it("action fires on transition", () => {
    const action = vi.fn();
    const sc = new StateChart();
    sc.addState("a");
    sc.addState("b");
    sc.addTransition("a", "go", "b", { action });
    sc.start("a");
    sc.send("go");
    expect(action).toHaveBeenCalled();
  });

  it("tracks history", () => {
    const sc = new StateChart();
    sc.addState("a");
    sc.addState("b");
    sc.addTransition("a", "next", "b");
    sc.start("a");
    sc.send("next");
    expect(sc.history.length).toBe(2);
  });
});
