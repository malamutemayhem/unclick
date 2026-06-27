import { describe, it, expect } from "vitest";
import { PipelineSim } from "../pipeline-sim.js";

describe("PipelineSim", () => {
  it("single instruction completes in 5 cycles", () => {
    const sim = new PipelineSim();
    sim.addInstruction("ADD r1, r2, r3");
    sim.run();
    expect(sim.cycleCount).toBe(5);
    expect(sim.isDone()).toBe(true);
  });

  it("two independent instructions pipeline", () => {
    const sim = new PipelineSim();
    sim.addInstruction("ADD r1, r2, r3");
    sim.addInstruction("SUB r4, r5, r6");
    sim.run();
    expect(sim.cycleCount).toBeLessThanOrEqual(6);
    expect(sim.isDone()).toBe(true);
  });

  it("instructionCount tracks added instructions", () => {
    const sim = new PipelineSim();
    sim.addInstruction("NOP");
    sim.addInstruction("NOP");
    sim.addInstruction("NOP");
    expect(sim.instructionCount).toBe(3);
  });

  it("IPC calculated correctly", () => {
    const sim = new PipelineSim();
    sim.addInstruction("ADD");
    sim.run();
    expect(sim.ipc).toBeGreaterThan(0);
  });

  it("getHistory records all cycles", () => {
    const sim = new PipelineSim();
    sim.addInstruction("ADD");
    sim.run();
    expect(sim.getHistory().length).toBe(sim.cycleCount);
  });

  it("step advances one cycle", () => {
    const sim = new PipelineSim();
    sim.addInstruction("ADD");
    sim.step();
    expect(sim.cycleCount).toBe(1);
    expect(sim.isDone()).toBe(false);
  });

  it("flush marks all in-flight as done", () => {
    const sim = new PipelineSim();
    sim.addInstruction("ADD");
    sim.addInstruction("SUB");
    sim.step();
    sim.step();
    sim.flush();
    expect(sim.flushCount).toBeGreaterThan(0);
  });

  it("data hazard with forwarding disabled causes stalls", () => {
    const sim = new PipelineSim(false);
    sim.addInstruction("LOAD", [], "r1");
    sim.addInstruction("ADD", ["r1"], "r2");
    sim.run();
    expect(sim.stallCount).toBeGreaterThan(0);
  });

  it("no stall without dependency", () => {
    const sim = new PipelineSim();
    sim.addInstruction("ADD", [], "r1");
    sim.addInstruction("SUB", [], "r3");
    sim.run();
    expect(sim.stallCount).toBe(0);
  });
});
