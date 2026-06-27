import { describe, it, expect, vi } from "vitest";
import { StateMachineBuilder } from "../state-machine-builder.js";

describe("StateMachineBuilder", () => {
  it("builds a state machine", () => {
    const sm = new StateMachineBuilder<"a" | "b", "go">()
      .setInitial("a")
      .addTransition("a", "go", "b")
      .build();
    expect(sm.state).toBe("a");
    sm.send("go");
    expect(sm.state).toBe("b");
  });

  it("throws without initial state", () => {
    expect(() =>
      new StateMachineBuilder<"a", "go">()
        .addTransition("a", "go", "a")
        .build()
    ).toThrow("Initial state not set");
  });

  it("supports guard conditions", () => {
    let allowed = false;
    const sm = new StateMachineBuilder<"a" | "b", "go">()
      .setInitial("a")
      .addTransition("a", "go", "b", { guard: () => allowed })
      .build();
    expect(sm.can("go")).toBe(false);
    expect(() => sm.send("go")).toThrow();
    allowed = true;
    expect(sm.can("go")).toBe(true);
    sm.send("go");
    expect(sm.state).toBe("b");
  });

  it("runs actions on transition", () => {
    const action = vi.fn();
    const sm = new StateMachineBuilder<"a" | "b", "go">()
      .setInitial("a")
      .addTransition("a", "go", "b", { action })
      .build();
    sm.send("go");
    expect(action).toHaveBeenCalled();
  });

  it("throws on invalid transition", () => {
    const sm = new StateMachineBuilder<"a" | "b", "go" | "back">()
      .setInitial("a")
      .addTransition("a", "go", "b")
      .build();
    expect(() => sm.send("back")).toThrow();
  });
});
