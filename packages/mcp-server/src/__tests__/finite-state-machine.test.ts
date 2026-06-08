import { describe, it, expect } from "vitest";
import { FiniteStateMachine } from "../finite-state-machine.js";

type State = "idle" | "loading" | "success" | "error";
type Event = "fetch" | "resolve" | "reject" | "reset";

describe("FiniteStateMachine", () => {
  function makeFSM() {
    const fsm = new FiniteStateMachine<State, Event>("idle");
    fsm.addTransitions([
      { from: "idle", event: "fetch", to: "loading" },
      { from: "loading", event: "resolve", to: "success" },
      { from: "loading", event: "reject", to: "error" },
      { from: "success", event: "reset", to: "idle" },
      { from: "error", event: "reset", to: "idle" },
    ]);
    return fsm;
  }

  it("starts in initial state", () => {
    expect(makeFSM().state).toBe("idle");
  });

  it("transitions on event", () => {
    const fsm = makeFSM();
    fsm.send("fetch");
    expect(fsm.state).toBe("loading");
  });

  it("rejects invalid events", () => {
    const fsm = makeFSM();
    expect(fsm.send("resolve")).toBe(false);
    expect(fsm.state).toBe("idle");
  });

  it("chains transitions", () => {
    const fsm = makeFSM();
    fsm.send("fetch");
    fsm.send("resolve");
    expect(fsm.state).toBe("success");
  });

  it("canSend checks validity", () => {
    const fsm = makeFSM();
    expect(fsm.canSend("fetch")).toBe(true);
    expect(fsm.canSend("resolve")).toBe(false);
  });

  it("availableEvents lists valid events", () => {
    const fsm = makeFSM();
    expect(fsm.availableEvents()).toEqual(["fetch"]);
  });

  it("guard prevents transition", () => {
    const fsm = new FiniteStateMachine<"a" | "b", "go">("a");
    fsm.addTransition({ from: "a", event: "go", to: "b", guard: () => false });
    expect(fsm.send("go")).toBe(false);
    expect(fsm.state).toBe("a");
  });

  it("action fires on transition", () => {
    let fired = false;
    const fsm = new FiniteStateMachine<"a" | "b", "go">("a");
    fsm.addTransition({ from: "a", event: "go", to: "b", action: () => { fired = true; } });
    fsm.send("go");
    expect(fired).toBe(true);
  });

  it("tracks history", () => {
    const fsm = makeFSM();
    fsm.send("fetch");
    fsm.send("resolve");
    const hist = fsm.getHistory();
    expect(hist.length).toBe(2);
    expect(hist[0].from).toBe("idle");
    expect(hist[0].to).toBe("loading");
  });

  it("reset clears state and history", () => {
    const fsm = makeFSM();
    fsm.send("fetch");
    fsm.reset("idle");
    expect(fsm.state).toBe("idle");
    expect(fsm.getHistory()).toEqual([]);
  });
});
