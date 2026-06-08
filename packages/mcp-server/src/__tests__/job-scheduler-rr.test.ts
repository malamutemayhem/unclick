import { describe, it, expect } from "vitest";
import { RoundRobinScheduler } from "../job-scheduler-rr.js";

describe("RoundRobinScheduler", () => {
  it("schedules jobs with quantum slicing", () => {
    const jobs = [
      { id: "A", burstTime: 4, arrivalTime: 0 },
      { id: "B", burstTime: 3, arrivalTime: 0 },
    ];
    const result = RoundRobinScheduler.schedule(jobs, 2);
    expect(result.schedule.length).toBeGreaterThan(2);
    expect(result.schedule[0].id).toBe("A");
    expect(result.schedule[0].end - result.schedule[0].start).toBe(2);
  });

  it("computes average wait time", () => {
    const jobs = [
      { id: "A", burstTime: 4, arrivalTime: 0 },
      { id: "B", burstTime: 3, arrivalTime: 0 },
      { id: "C", burstTime: 2, arrivalTime: 0 },
    ];
    const result = RoundRobinScheduler.schedule(jobs, 2);
    expect(result.avgWaitTime).toBeGreaterThanOrEqual(0);
    expect(result.avgTurnaroundTime).toBeGreaterThan(0);
  });

  it("handles single job", () => {
    const jobs = [{ id: "X", burstTime: 5, arrivalTime: 0 }];
    const result = RoundRobinScheduler.schedule(jobs, 3);
    expect(result.schedule.length).toBe(2);
    expect(result.avgWaitTime).toBe(0);
  });

  it("handles empty input", () => {
    const result = RoundRobinScheduler.schedule([], 2);
    expect(result.schedule.length).toBe(0);
    expect(result.avgWaitTime).toBe(0);
  });

  it("respects arrival times", () => {
    const jobs = [
      { id: "A", burstTime: 3, arrivalTime: 0 },
      { id: "B", burstTime: 2, arrivalTime: 5 },
    ];
    const result = RoundRobinScheduler.schedule(jobs, 2);
    const bStart = result.schedule.find((s) => s.id === "B")!.start;
    expect(bStart).toBeGreaterThanOrEqual(5);
  });

  it("quantum equal to burst runs without preemption", () => {
    const jobs = [
      { id: "A", burstTime: 2, arrivalTime: 0 },
      { id: "B", burstTime: 2, arrivalTime: 0 },
    ];
    const result = RoundRobinScheduler.schedule(jobs, 2);
    expect(result.schedule.length).toBe(2);
  });

  it("total time covers all bursts", () => {
    const jobs = [
      { id: "A", burstTime: 3, arrivalTime: 0 },
      { id: "B", burstTime: 4, arrivalTime: 0 },
    ];
    const result = RoundRobinScheduler.schedule(jobs, 2);
    const lastEnd = result.schedule[result.schedule.length - 1].end;
    expect(lastEnd).toBe(7);
  });
});
