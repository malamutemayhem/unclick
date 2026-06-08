import { describe, it, expect } from "vitest";
import { Circuit, halfAdder } from "../circuit-sim.js";

describe("Circuit", () => {
  it("simulates AND gate", () => {
    const c = new Circuit();
    c.addInput("a", 1);
    c.addInput("b", 1);
    c.addOutput("out");
    c.addGate("g1", "AND", ["a", "b"], "out");
    c.simulate();
    expect(c.getWire("out")).toBe(1);
  });

  it("simulates OR gate", () => {
    const c = new Circuit();
    c.addInput("a", 0);
    c.addInput("b", 1);
    c.addOutput("out");
    c.addGate("g1", "OR", ["a", "b"], "out");
    c.simulate();
    expect(c.getWire("out")).toBe(1);
  });

  it("simulates NOT gate", () => {
    const c = new Circuit();
    c.addInput("a", 1);
    c.addOutput("out");
    c.addGate("g1", "NOT", ["a"], "out");
    c.simulate();
    expect(c.getWire("out")).toBe(0);
  });

  it("simulates NAND gate", () => {
    const c = new Circuit();
    c.addInput("a", 1);
    c.addInput("b", 1);
    c.addOutput("out");
    c.addGate("g1", "NAND", ["a", "b"], "out");
    c.simulate();
    expect(c.getWire("out")).toBe(0);
  });

  it("simulates XOR gate", () => {
    const c = new Circuit();
    c.addInput("a", 1);
    c.addInput("b", 0);
    c.addOutput("out");
    c.addGate("g1", "XOR", ["a", "b"], "out");
    c.simulate();
    expect(c.getWire("out")).toBe(1);
  });

  it("simulates chained gates", () => {
    const c = new Circuit();
    c.addInput("a", 1);
    c.addInput("b", 1);
    c.addOutput("out");
    c.addGate("g1", "AND", ["a", "b"], "mid");
    c.addGate("g2", "NOT", ["mid"], "out");
    c.simulate();
    expect(c.getWire("out")).toBe(0);
  });

  it("gets inputs and outputs", () => {
    const c = new Circuit();
    c.addInput("a", 1);
    c.addOutput("out");
    c.addGate("g1", "BUF", ["a"], "out");
    c.simulate();
    expect(c.getInputs().get("a")).toBe(1);
    expect(c.getOutputs().get("out")).toBe(1);
  });

  it("counts gates and wires", () => {
    const c = new Circuit();
    c.addInput("a");
    c.addInput("b");
    c.addOutput("out");
    c.addGate("g1", "AND", ["a", "b"], "out");
    expect(c.gateCount()).toBe(1);
    expect(c.wireCount()).toBe(3);
  });
});

describe("halfAdder", () => {
  it("computes sum and carry for 0,0", () => {
    const c = halfAdder();
    c.setInput("a", 0);
    c.setInput("b", 0);
    c.simulate();
    expect(c.getOutputs().get("sum")).toBe(0);
    expect(c.getOutputs().get("carry")).toBe(0);
  });

  it("computes sum and carry for 1,1", () => {
    const c = halfAdder();
    c.setInput("a", 1);
    c.setInput("b", 1);
    c.simulate();
    expect(c.getOutputs().get("sum")).toBe(0);
    expect(c.getOutputs().get("carry")).toBe(1);
  });

  it("generates truth table", () => {
    const c = halfAdder();
    const table = c.truthTable();
    expect(table.length).toBe(4);
    const row11 = table.find(
      (r) => r.inputs.get("a") === 1 && r.inputs.get("b") === 1
    )!;
    expect(row11.outputs.get("sum")).toBe(0);
    expect(row11.outputs.get("carry")).toBe(1);
  });
});
