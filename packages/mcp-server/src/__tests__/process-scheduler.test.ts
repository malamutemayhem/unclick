import { describe, it, expect } from "vitest";
import {
  defineProcesses, fcfs, sjf, roundRobin, prioritySchedule,
} from "../process-scheduler.js";

const procs = () => defineProcesses([
  { name: "P1", burst: 4, arrival: 0 },
  { name: "P2", burst: 3, arrival: 1 },
  { name: "P3", burst: 2, arrival: 2 },
]);

describe("FCFS", () => {
  it("schedules in arrival order", () => {
    const result = fcfs(procs());
    expect(result.processes[0].completionTime).toBe(4);
    expect(result.processes[1].completionTime).toBe(7);
    expect(result.processes[2].completionTime).toBe(9);
  });

  it("calculates avg wait time", () => {
    const result = fcfs(procs());
    expect(result.avgWaitTime).toBeGreaterThanOrEqual(0);
  });

  it("generates timeline", () => {
    const result = fcfs(procs());
    expect(result.timeline.length).toBe(9);
  });
});

describe("SJF", () => {
  it("schedules shortest job first", () => {
    const result = sjf(procs());
    expect(result.avgWaitTime).toBeLessThanOrEqual(fcfs(procs()).avgWaitTime);
  });

  it("completes all processes", () => {
    const result = sjf(procs());
    expect(result.processes.every((p) => p.remaining === 0)).toBe(true);
  });
});

describe("Round Robin", () => {
  it("schedules with quantum", () => {
    const result = roundRobin(procs(), 2);
    expect(result.processes.every((p) => p.remaining === 0)).toBe(true);
  });

  it("timeline reflects quantum slicing", () => {
    const result = roundRobin(procs(), 2);
    expect(result.timeline.length).toBe(9);
  });

  it("handles quantum larger than burst", () => {
    const result = roundRobin(procs(), 100);
    expect(result.processes.every((p) => p.remaining === 0)).toBe(true);
  });
});

describe("Priority", () => {
  it("schedules highest priority first", () => {
    const p = defineProcesses([
      { name: "low", burst: 3, arrival: 0, priority: 1 },
      { name: "high", burst: 3, arrival: 0, priority: 10 },
    ]);
    const result = prioritySchedule(p);
    expect(result.processes.find((x) => x.name === "high")!.completionTime).toBe(3);
    expect(result.processes.find((x) => x.name === "low")!.completionTime).toBe(6);
  });

  it("calculates throughput", () => {
    const result = prioritySchedule(procs());
    expect(result.throughput).toBeGreaterThan(0);
  });
});
