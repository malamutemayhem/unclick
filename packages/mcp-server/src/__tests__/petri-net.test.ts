import { describe, it, expect } from "vitest";
import { PetriNet } from "../petri-net.js";

describe("PetriNet", () => {
  it("addPlace and getTokens return correct count", () => {
    const pn = new PetriNet();
    pn.addPlace("p1", 3);
    expect(pn.getTokens("p1")).toBe(3);
  });

  it("fire consumes and produces tokens", () => {
    const pn = new PetriNet();
    pn.addPlace("p1", 2);
    pn.addPlace("p2", 0);
    pn.addTransition("t1", [{ placeId: "p1", weight: 1 }], [{ placeId: "p2", weight: 1 }]);
    expect(pn.fire("t1")).toBe(true);
    expect(pn.getTokens("p1")).toBe(1);
    expect(pn.getTokens("p2")).toBe(1);
  });

  it("isEnabled checks token availability", () => {
    const pn = new PetriNet();
    pn.addPlace("p1", 0);
    pn.addTransition("t1", [{ placeId: "p1", weight: 1 }], []);
    expect(pn.isEnabled("t1")).toBe(false);
    pn.setTokens("p1", 1);
    expect(pn.isEnabled("t1")).toBe(true);
  });

  it("fire returns false when not enabled", () => {
    const pn = new PetriNet();
    pn.addPlace("p1", 0);
    pn.addTransition("t1", [{ placeId: "p1", weight: 1 }], []);
    expect(pn.fire("t1")).toBe(false);
  });

  it("enabledTransitions lists all fireable transitions", () => {
    const pn = new PetriNet();
    pn.addPlace("p1", 1);
    pn.addPlace("p2", 0);
    pn.addTransition("t1", [{ placeId: "p1", weight: 1 }], []);
    pn.addTransition("t2", [{ placeId: "p2", weight: 1 }], []);
    expect(pn.enabledTransitions()).toEqual(["t1"]);
  });

  it("marking returns all place tokens", () => {
    const pn = new PetriNet();
    pn.addPlace("p1", 2);
    pn.addPlace("p2", 5);
    expect(pn.marking()).toEqual({ p1: 2, p2: 5 });
  });

  it("isDeadlocked detects when no transitions can fire", () => {
    const pn = new PetriNet();
    pn.addPlace("p1", 0);
    pn.addTransition("t1", [{ placeId: "p1", weight: 1 }], []);
    expect(pn.isDeadlocked()).toBe(true);
  });

  it("totalTokens sums all tokens", () => {
    const pn = new PetriNet();
    pn.addPlace("p1", 3);
    pn.addPlace("p2", 7);
    expect(pn.totalTokens()).toBe(10);
  });

  it("reset restores a saved marking", () => {
    const pn = new PetriNet();
    pn.addPlace("p1", 5);
    pn.addPlace("p2", 0);
    pn.reset({ p1: 1, p2: 10 });
    expect(pn.getTokens("p1")).toBe(1);
    expect(pn.getTokens("p2")).toBe(10);
  });

  it("placeCount and transitionCount return sizes", () => {
    const pn = new PetriNet();
    pn.addPlace("a", 0);
    pn.addPlace("b", 0);
    pn.addTransition("t", [], []);
    expect(pn.placeCount()).toBe(2);
    expect(pn.transitionCount()).toBe(1);
  });
});
