import { describe, it, expect } from "vitest";
import { TuringMachine } from "../turing-machine.js";

describe("TuringMachine", () => {
  it("accepts unary addition", () => {
    const tm = new TuringMachine("q0", "accept", "reject");
    tm.addTransition("q0", "1", "1", "R", "q0");
    tm.addTransition("q0", "+", "1", "R", "q1");
    tm.addTransition("q1", "1", "1", "R", "q1");
    tm.addTransition("q1", "_", "_", "L", "q2");
    tm.addTransition("q2", "1", "_", "S", "accept");
    const result = tm.run("11+11");
    expect(result.accepted).toBe(true);
    expect(result.tape).toBe("1111");
  });

  it("accepts even-length binary string", () => {
    const tm = new TuringMachine("q0", "accept", "reject");
    tm.addTransition("q0", "0", "0", "R", "q1");
    tm.addTransition("q0", "1", "1", "R", "q1");
    tm.addTransition("q0", "_", "_", "S", "accept");
    tm.addTransition("q1", "0", "0", "R", "q0");
    tm.addTransition("q1", "1", "1", "R", "q0");
    tm.addTransition("q1", "_", "_", "S", "reject");
    expect(tm.run("01").accepted).toBe(true);
    expect(tm.run("0110").accepted).toBe(true);
    expect(tm.run("0").accepted).toBe(false);
  });

  it("halts and rejects on no transition", () => {
    const tm = new TuringMachine("q0", "accept", "reject");
    const result = tm.run("abc");
    expect(result.accepted).toBe(false);
  });

  it("reports step count", () => {
    const tm = new TuringMachine("q0", "accept", "reject");
    tm.addTransition("q0", "_", "_", "S", "accept");
    const result = tm.run("");
    expect(result.steps).toBe(1);
    expect(result.accepted).toBe(true);
  });

  it("respects max steps limit", () => {
    const tm = new TuringMachine("q0", "accept", "reject");
    tm.addTransition("q0", "_", "_", "R", "q0");
    const result = tm.run("", 100);
    expect(result.accepted).toBe(false);
    expect(result.steps).toBe(100);
  });

  it("transitionCount tracks additions", () => {
    const tm = new TuringMachine("q0", "accept", "reject");
    tm.addTransition("q0", "a", "b", "R", "q1");
    tm.addTransition("q1", "b", "a", "L", "q0");
    expect(tm.transitionCount()).toBe(2);
  });

  it("handles tape expansion", () => {
    const tm = new TuringMachine("q0", "accept", "reject");
    tm.addTransition("q0", "a", "a", "R", "q0");
    tm.addTransition("q0", "_", "b", "S", "accept");
    const result = tm.run("aa");
    expect(result.accepted).toBe(true);
    expect(result.tape).toBe("aab");
  });
});
