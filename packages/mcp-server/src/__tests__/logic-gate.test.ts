import { describe, it, expect } from "vitest";
import { Circuit, halfAdder, fullAdder, rippleCarryAdd } from "../logic-gate.js";

describe("Circuit", () => {
  it("AND gate", () => {
    const c = new Circuit();
    c.addInput("a", true);
    c.addInput("b", true);
    c.addGate("out", "AND", ["a", "b"]);
    expect(c.getOutput("out")).toBe(true);
    c.setInput("b", false);
    expect(c.getOutput("out")).toBe(false);
  });

  it("OR gate", () => {
    const c = new Circuit();
    c.addInput("a", false);
    c.addInput("b", true);
    c.addGate("out", "OR", ["a", "b"]);
    expect(c.getOutput("out")).toBe(true);
  });

  it("NOT gate", () => {
    const c = new Circuit();
    c.addInput("a", true);
    c.addGate("out", "NOT", ["a"]);
    expect(c.getOutput("out")).toBe(false);
  });

  it("NAND gate", () => {
    const c = new Circuit();
    c.addInput("a", true);
    c.addInput("b", true);
    c.addGate("out", "NAND", ["a", "b"]);
    expect(c.getOutput("out")).toBe(false);
    c.setInput("a", false);
    expect(c.getOutput("out")).toBe(true);
  });

  it("XOR gate", () => {
    const c = new Circuit();
    c.addInput("a", true);
    c.addInput("b", false);
    c.addGate("out", "XOR", ["a", "b"]);
    expect(c.getOutput("out")).toBe(true);
    c.setInput("b", true);
    expect(c.getOutput("out")).toBe(false);
  });

  it("chained gates", () => {
    const c = new Circuit();
    c.addInput("a", true);
    c.addInput("b", true);
    c.addGate("g1", "AND", ["a", "b"]);
    c.addGate("out", "NOT", ["g1"]);
    expect(c.getOutput("out")).toBe(false);
  });

  it("truthTable generates all combinations", () => {
    const c = new Circuit();
    c.addInput("a");
    c.addInput("b");
    c.addGate("out", "AND", ["a", "b"]);
    const table = c.truthTable(["out"]);
    expect(table).toHaveLength(4);
    expect(table[3].out).toBe(true); // a=1, b=1
    expect(table[0].out).toBe(false); // a=0, b=0
  });

  it("gateCount and inputCount", () => {
    const c = new Circuit();
    c.addInput("a");
    c.addInput("b");
    c.addGate("g1", "AND", ["a", "b"]);
    c.addGate("g2", "OR", ["a", "b"]);
    expect(c.gateCount).toBe(2);
    expect(c.inputCount).toBe(2);
  });

  it("removeGate works", () => {
    const c = new Circuit();
    c.addGate("g1", "AND", ["a", "b"]);
    expect(c.removeGate("g1")).toBe(true);
    expect(c.gateCount).toBe(0);
  });

  it("getGate returns info", () => {
    const c = new Circuit();
    c.addGate("g1", "XOR", ["a", "b"]);
    const gate = c.getGate("g1")!;
    expect(gate.type).toBe("XOR");
    expect(gate.inputs).toEqual(["a", "b"]);
  });

  it("listGates returns all gates", () => {
    const c = new Circuit();
    c.addGate("g1", "AND", ["a"]);
    c.addGate("g2", "OR", ["b"]);
    expect(c.listGates()).toHaveLength(2);
  });
});

describe("halfAdder", () => {
  it("0 + 0 = 0, carry 0", () => {
    expect(halfAdder(false, false)).toEqual({ sum: false, carry: false });
  });
  it("1 + 1 = 0, carry 1", () => {
    expect(halfAdder(true, true)).toEqual({ sum: false, carry: true });
  });
  it("1 + 0 = 1, carry 0", () => {
    expect(halfAdder(true, false)).toEqual({ sum: true, carry: false });
  });
});

describe("fullAdder", () => {
  it("1 + 1 + 1 = 1, carry 1", () => {
    expect(fullAdder(true, true, true)).toEqual({ sum: true, carry: true });
  });
  it("1 + 0 + 1 = 0, carry 1", () => {
    expect(fullAdder(true, false, true)).toEqual({ sum: false, carry: true });
  });
});

describe("rippleCarryAdd", () => {
  it("adds 3 + 5 = 8 in 4 bits", () => {
    const a = [true, true, false, false]; // 3
    const b = [true, false, true, false]; // 5
    const { result, carry } = rippleCarryAdd(a, b);
    expect(result).toEqual([false, false, false, true]); // 8
    expect(carry).toBe(false);
  });

  it("overflow produces carry", () => {
    const a = [true, true, true, true]; // 15
    const b = [true, false, false, false]; // 1
    const { carry } = rippleCarryAdd(a, b);
    expect(carry).toBe(true);
  });
});
