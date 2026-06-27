import { describe, it, expect } from "vitest";
import { FSMBuilder } from "../fsm-builder.js";

describe("FSMBuilder", () => {
  it("builds and runs a simple FSM", () => {
    const fsm = new FSMBuilder<"off" | "on", "toggle">()
      .setInitial("off")
      .addTransition("off", "toggle", "on")
      .addTransition("on", "toggle", "off")
      .build();
    expect(fsm.state).toBe("off");
    fsm.send("toggle");
    expect(fsm.state).toBe("on");
    fsm.send("toggle");
    expect(fsm.state).toBe("off");
  });

  it("supports guards", () => {
    let allowed = false;
    const fsm = new FSMBuilder<"locked" | "unlocked", "unlock">()
      .setInitial("locked")
      .addTransition("locked", "unlock", "unlocked", { guard: () => allowed })
      .build();
    expect(fsm.send("unlock")).toBe(false);
    expect(fsm.state).toBe("locked");
    allowed = true;
    expect(fsm.send("unlock")).toBe(true);
    expect(fsm.state).toBe("unlocked");
  });

  it("fires actions on transition", () => {
    let actionRan = false;
    const fsm = new FSMBuilder<"a" | "b", "go">()
      .setInitial("a")
      .addTransition("a", "go", "b", { action: () => { actionRan = true; } })
      .build();
    fsm.send("go");
    expect(actionRan).toBe(true);
  });

  it("fires enter/exit hooks", () => {
    const events: string[] = [];
    const fsm = new FSMBuilder<"a" | "b", "go">()
      .setInitial("a")
      .addTransition("a", "go", "b")
      .onExit("a", () => events.push("exit-a"))
      .onEnter("b", () => events.push("enter-b"))
      .build();
    fsm.send("go");
    expect(events).toEqual(["exit-a", "enter-b"]);
  });

  it("can checks availability with guards", () => {
    let ok = false;
    const fsm = new FSMBuilder<"x" | "y", "move">()
      .setInitial("x")
      .addTransition("x", "move", "y", { guard: () => ok })
      .build();
    expect(fsm.can("move")).toBe(false);
    ok = true;
    expect(fsm.can("move")).toBe(true);
  });

  it("throws if no initial state set", () => {
    expect(() => new FSMBuilder().build()).toThrow("Initial state not set");
  });
});
