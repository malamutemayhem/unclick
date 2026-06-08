import { describe, it, expect } from "vitest";
import { ForthInterpreter } from "../forth-interp.js";

describe("ForthInterpreter", () => {
  it("pushes numbers and prints", () => {
    const forth = new ForthInterpreter();
    const output = forth.execute("42 .");
    expect(output).toEqual(["42"]);
  });

  it("performs arithmetic", () => {
    const forth = new ForthInterpreter();
    forth.execute("3 4 +");
    expect(forth.getStack()).toEqual([7]);
  });

  it("stack manipulation: DUP, DROP, SWAP", () => {
    const forth = new ForthInterpreter();
    forth.execute("1 2 SWAP");
    expect(forth.getStack()).toEqual([2, 1]);
  });

  it("defines and uses words", () => {
    const forth = new ForthInterpreter();
    const output = forth.execute(": SQUARE DUP * ; 5 SQUARE .");
    expect(output).toEqual(["25"]);
  });

  it("comparison operators", () => {
    const forth = new ForthInterpreter();
    forth.execute("3 5 <");
    expect(forth.getStack()).toEqual([-1]);
  });

  it("math helpers", () => {
    const forth = new ForthInterpreter();
    forth.execute("-5 ABS");
    expect(forth.getStack()).toEqual([5]);
  });

  it("MOD operator", () => {
    const forth = new ForthInterpreter();
    forth.execute("10 3 MOD");
    expect(forth.getStack()).toEqual([1]);
  });

  it("OVER copies second element", () => {
    const forth = new ForthInterpreter();
    forth.execute("1 2 OVER");
    expect(forth.getStack()).toEqual([1, 2, 1]);
  });

  it("ROT rotates top three", () => {
    const forth = new ForthInterpreter();
    forth.execute("1 2 3 ROT");
    expect(forth.getStack()).toEqual([2, 3, 1]);
  });

  it("throws on unknown word", () => {
    const forth = new ForthInterpreter();
    expect(() => forth.execute("UNKNOWN")).toThrow("Unknown word");
  });
});
