import { describe, it, expect } from "vitest";
import { FSMBuilder } from "../fsm-builder.js";

describe("FSMBuilder", () => {
  it("builds and transitions between states", () => {
    const fsm = new FSMBuilder()
      .initial("idle")
      .on("start", "idle", "running")
      .on("stop", "running", "idle")
      .build();

    expect(fsm.state).toBe("idle");
    expect(fsm.send("start")).toBe(true);
    expect(fsm.state).toBe("running");
    expect(fsm.send("stop")).toBe(true);
    expect(fsm.state).toBe("idle");
  });

  it("returns false for invalid transitions", () => {
    const fsm = new FSMBuilder()
      .initial("idle")
      .on("start", "idle", "running")
      .build();

    expect(fsm.send("stop")).toBe(false);
    expect(fsm.state).toBe("idle");
  });

  it("guards block transitions", () => {
    let allowed = false;
    const fsm = new FSMBuilder()
      .initial("locked")
      .on("unlock", "locked", "unlocked", { guard: () => allowed })
      .build();

    expect(fsm.send("unlock")).toBe(false);
    allowed = true;
    expect(fsm.send("unlock")).toBe(true);
    expect(fsm.state).toBe("unlocked");
  });

  it("actions execute on transition", () => {
    const log: string[] = [];
    const fsm = new FSMBuilder()
      .initial("a")
      .on("go", "a", "b", { action: () => log.push("went") })
      .build();

    fsm.send("go");
    expect(log).toEqual(["went"]);
  });

  it("onEnter and onExit fire", () => {
    const log: string[] = [];
    const fsm = new FSMBuilder()
      .initial("a")
      .on("go", "a", "b")
      .onExit("a", () => log.push("exit-a"))
      .onEnter("b", () => log.push("enter-b"))
      .build();

    fsm.send("go");
    expect(log).toEqual(["exit-a", "enter-b"]);
  });

  it("can checks if event is valid", () => {
    const fsm = new FSMBuilder()
      .initial("idle")
      .on("start", "idle", "running")
      .build();

    expect(fsm.can("start")).toBe(true);
    expect(fsm.can("stop")).toBe(false);
  });

  it("getHistory tracks state transitions", () => {
    const fsm = new FSMBuilder()
      .initial("a")
      .on("next", "a", "b")
      .on("next", "b", "c")
      .build();

    fsm.send("next");
    fsm.send("next");
    expect(fsm.getHistory()).toEqual(["a", "b"]);
  });

  it("throws if no initial state", () => {
    expect(() => new FSMBuilder().on("x", "a", "b").build()).toThrow("Initial state");
  });
});
