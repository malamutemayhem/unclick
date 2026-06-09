import { describe, it, expect } from "vitest";
import { InstructionScheduler } from "../instruction-scheduler.js";

describe("InstructionScheduler", () => {
  it("add creates instruction", () => {
    const sched = new InstructionScheduler();
    const instr = sched.add("ADD", 1, ["r1", "r2"], ["r3"]);
    expect(instr.name).toBe("ADD");
    expect(instr.latency).toBe(1);
    expect(sched.count).toBe(1);
  });

  it("buildDependencyGraph detects RAW", () => {
    const sched = new InstructionScheduler();
    sched.add("ADD", 1, [], ["r1"]);
    sched.add("SUB", 1, ["r1"], ["r2"]);
    const deps = sched.buildDependencyGraph();
    const instructions = sched.getInstructions();
    expect(deps.get(instructions[1].id)!).toContain(instructions[0].id);
  });

  it("buildDependencyGraph detects WAR", () => {
    const sched = new InstructionScheduler();
    sched.add("LOAD", 3, ["r1"], ["r2"]);
    sched.add("ADD", 1, [], ["r1"]);
    const deps = sched.buildDependencyGraph();
    const instructions = sched.getInstructions();
    expect(deps.get(instructions[1].id)!).toContain(instructions[0].id);
  });

  it("independent instructions have no deps", () => {
    const sched = new InstructionScheduler();
    sched.add("ADD", 1, ["r1"], ["r3"]);
    sched.add("SUB", 1, ["r4"], ["r5"]);
    const deps = sched.buildDependencyGraph();
    const instructions = sched.getInstructions();
    expect(deps.get(instructions[1].id)!).toHaveLength(0);
  });

  it("scheduleInOrder respects dependencies", () => {
    const sched = new InstructionScheduler();
    sched.add("MUL", 3, ["r1", "r2"], ["r3"], "mul");
    sched.add("ADD", 1, ["r3"], ["r4"]);
    const schedule = sched.scheduleInOrder();
    expect(schedule[1].cycle).toBeGreaterThanOrEqual(schedule[0].cycle + 3);
  });

  it("scheduleListScheduling produces valid schedule", () => {
    const sched = new InstructionScheduler();
    sched.add("ADD", 1, [], ["r1"]);
    sched.add("SUB", 1, [], ["r2"]);
    sched.add("MUL", 3, ["r1", "r2"], ["r3"], "mul");
    const schedule = sched.scheduleListScheduling();
    expect(schedule).toHaveLength(3);
  });

  it("criticalPathLength computes longest path", () => {
    const sched = new InstructionScheduler();
    sched.add("LOAD", 3, [], ["r1"], "mem");
    sched.add("ADD", 1, ["r1"], ["r2"]);
    sched.add("MUL", 2, ["r2"], ["r3"], "mul");
    expect(sched.criticalPathLength()).toBe(6);
  });

  it("getInstructions returns copies", () => {
    const sched = new InstructionScheduler();
    sched.add("NOP", 1, [], []);
    const instrs = sched.getInstructions();
    expect(instrs).toHaveLength(1);
  });

  it("clear removes all instructions", () => {
    const sched = new InstructionScheduler();
    sched.add("NOP", 1, [], []);
    sched.clear();
    expect(sched.count).toBe(0);
  });

  it("multiple units can issue in parallel with list scheduling", () => {
    const sched = new InstructionScheduler();
    sched.add("ADD", 1, [], ["r1"]);
    sched.add("LOAD", 3, [], ["r2"], "mem");
    const schedule = sched.scheduleListScheduling();
    expect(schedule[0].cycle).toBe(schedule[1].cycle);
  });
});
