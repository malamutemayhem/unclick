import { describe, it, expect } from "vitest";
import { StateMachine } from "../fsm.js";

type DoorState = "locked" | "closed" | "open";
type DoorEvent = "unlock" | "lock" | "open" | "close";

function createDoorFSM(): StateMachine<DoorState, DoorEvent> {
  return new StateMachine<DoorState, DoorEvent>("locked", [
    { from: "locked", event: "unlock", to: "closed" },
    { from: "closed", event: "lock", to: "locked" },
    { from: "closed", event: "open", to: "open" },
    { from: "open", event: "close", to: "closed" },
  ]);
}

describe("StateMachine", () => {
  it("starts in initial state", () => {
    const fsm = createDoorFSM();
    expect(fsm.state).toBe("locked");
  });

  it("transitions on valid event", () => {
    const fsm = createDoorFSM();
    expect(fsm.send("unlock")).toBe(true);
    expect(fsm.state).toBe("closed");
  });

  it("rejects invalid event", () => {
    const fsm = createDoorFSM();
    expect(fsm.send("open")).toBe(false);
    expect(fsm.state).toBe("locked");
  });

  it("can check if event is available", () => {
    const fsm = createDoorFSM();
    expect(fsm.can("unlock")).toBe(true);
    expect(fsm.can("open")).toBe(false);
  });

  it("lists available events", () => {
    const fsm = createDoorFSM();
    expect(fsm.availableEvents()).toEqual(["unlock"]);
    fsm.send("unlock");
    expect(fsm.availableEvents()).toContain("lock");
    expect(fsm.availableEvents()).toContain("open");
  });

  it("fires action on transition", () => {
    let actionCalled = false;
    const fsm = new StateMachine<"a" | "b", "go">("a", [
      { from: "a", event: "go", to: "b", action: () => { actionCalled = true; } },
    ]);
    fsm.send("go");
    expect(actionCalled).toBe(true);
  });

  it("respects guard condition", () => {
    let allowed = false;
    const fsm = new StateMachine<"a" | "b", "go">("a", [
      { from: "a", event: "go", to: "b", guard: () => allowed },
    ]);
    expect(fsm.send("go")).toBe(false);
    expect(fsm.state).toBe("a");
    allowed = true;
    expect(fsm.send("go")).toBe(true);
    expect(fsm.state).toBe("b");
  });

  it("emits transition events to listeners", () => {
    const fsm = createDoorFSM();
    const transitions: Array<{ from: string; to: string }> = [];
    fsm.on("transition", (from: DoorState, to: DoorState) => {
      transitions.push({ from, to });
    });
    fsm.send("unlock");
    fsm.send("open");
    expect(transitions).toEqual([
      { from: "locked", to: "closed" },
      { from: "closed", to: "open" },
    ]);
  });

  it("unsubscribes listener", () => {
    const fsm = createDoorFSM();
    let count = 0;
    const unsub = fsm.on("transition", () => { count++; });
    fsm.send("unlock");
    unsub();
    fsm.send("open");
    expect(count).toBe(1);
  });
});
