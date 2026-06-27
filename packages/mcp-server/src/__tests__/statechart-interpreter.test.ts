import { describe, it, expect } from "vitest";
import {
  createStatechart, send, matches, canSend,
  availableEvents, reset, stateNode,
  type StatechartConfig,
} from "../statechart-interpreter.js";

function trafficLight(): StatechartConfig {
  return {
    id: "traffic",
    initial: "green",
    states: new Map([
      ["green", stateNode("green", [{ event: "TIMER", target: "yellow" }])],
      ["yellow", stateNode("yellow", [{ event: "TIMER", target: "red" }])],
      ["red", stateNode("red", [{ event: "TIMER", target: "green" }])],
    ]),
    context: {},
  };
}

describe("createStatechart", () => {
  it("starts in initial state", () => {
    const sc = createStatechart(trafficLight());
    expect(matches(sc, "green")).toBe(true);
  });
});

describe("send", () => {
  it("transitions on event", () => {
    const sc = createStatechart(trafficLight());
    send(sc, "TIMER");
    expect(matches(sc, "yellow")).toBe(true);
  });

  it("cycles through states", () => {
    const sc = createStatechart(trafficLight());
    send(sc, "TIMER");
    send(sc, "TIMER");
    send(sc, "TIMER");
    expect(matches(sc, "green")).toBe(true);
  });

  it("records history", () => {
    const sc = createStatechart(trafficLight());
    send(sc, "TIMER");
    expect(sc.history.length).toBe(1);
    expect(sc.history[0]).toEqual({ from: "green", event: "TIMER", to: "yellow" });
  });

  it("ignores unhandled events", () => {
    const sc = createStatechart(trafficLight());
    const changed = send(sc, "UNKNOWN");
    expect(changed).toBe(false);
    expect(matches(sc, "green")).toBe(true);
  });
});

describe("guards and actions", () => {
  it("respects guard conditions", () => {
    const config: StatechartConfig = {
      id: "door",
      initial: "locked",
      states: new Map([
        ["locked", stateNode("locked", [
          { event: "UNLOCK", target: "unlocked", guard: (ctx) => ctx.hasKey === true },
        ])],
        ["unlocked", stateNode("unlocked", [{ event: "LOCK", target: "locked" }])],
      ]),
      context: { hasKey: false },
    };
    const sc = createStatechart(config);
    expect(send(sc, "UNLOCK")).toBe(false);
    sc.context.hasKey = true;
    expect(send(sc, "UNLOCK")).toBe(true);
    expect(matches(sc, "unlocked")).toBe(true);
  });

  it("executes actions", () => {
    const config: StatechartConfig = {
      id: "counter",
      initial: "idle",
      states: new Map([
        ["idle", stateNode("idle", [
          { event: "INC", target: "idle", action: (ctx) => { ctx.count = (ctx.count as number) + 1; } },
        ])],
      ]),
      context: { count: 0 },
    };
    const sc = createStatechart(config);
    send(sc, "INC");
    send(sc, "INC");
    expect(sc.context.count).toBe(2);
  });
});

describe("final states", () => {
  it("marks done on final state", () => {
    const config: StatechartConfig = {
      id: "process",
      initial: "running",
      states: new Map([
        ["running", stateNode("running", [{ event: "FINISH", target: "done" }])],
        ["done", stateNode("done", [], { final: true })],
      ]),
      context: {},
    };
    const sc = createStatechart(config);
    send(sc, "FINISH");
    expect(sc.done).toBe(true);
    expect(send(sc, "FINISH")).toBe(false);
  });
});

describe("utilities", () => {
  it("canSend checks availability", () => {
    const sc = createStatechart(trafficLight());
    expect(canSend(sc, "TIMER")).toBe(true);
    expect(canSend(sc, "UNKNOWN")).toBe(false);
  });

  it("availableEvents lists valid events", () => {
    const sc = createStatechart(trafficLight());
    expect(availableEvents(sc)).toEqual(["TIMER"]);
  });

  it("reset returns to initial", () => {
    const sc = createStatechart(trafficLight());
    send(sc, "TIMER");
    reset(sc);
    expect(matches(sc, "green")).toBe(true);
    expect(sc.history).toEqual([]);
  });
});
