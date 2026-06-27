import { describe, it, expect } from "vitest";
import { ElevatorAlgorithm } from "../elevator-algorithm.js";

describe("ElevatorAlgorithm", () => {
  it("SCAN moves in direction then reverses", () => {
    const result = ElevatorAlgorithm.scan([98, 183, 37, 122, 14, 124, 65, 67], 53, "up", 199);
    expect(result.order[0]).toBe(65);
    expect(result.totalMovement).toBeGreaterThan(0);
  });

  it("SCAN down processes left first", () => {
    const result = ElevatorAlgorithm.scan([98, 37, 14, 122], 53, "down", 199);
    expect(result.order[0]).toBe(37);
  });

  it("C-SCAN always goes up then wraps", () => {
    const result = ElevatorAlgorithm.cscan([98, 183, 37, 122, 14], 53, 199);
    const rightIdx = result.order.indexOf(98);
    const leftIdx = result.order.indexOf(37);
    expect(rightIdx).toBeLessThan(leftIdx);
  });

  it("SSTF picks shortest seek first", () => {
    const result = ElevatorAlgorithm.sstf([98, 183, 37, 122, 14], 53);
    expect(result.order[0]).toBe(37);
  });

  it("FCFS processes in order", () => {
    const requests = [98, 183, 37];
    const result = ElevatorAlgorithm.fcfs(requests, 53);
    expect(result.order).toEqual([98, 183, 37]);
    expect(result.totalMovement).toBe(45 + 85 + 146);
  });

  it("handles empty requests", () => {
    expect(ElevatorAlgorithm.scan([], 50, "up", 199).totalMovement).toBe(0);
    expect(ElevatorAlgorithm.sstf([], 50).totalMovement).toBe(0);
    expect(ElevatorAlgorithm.fcfs([], 50).totalMovement).toBe(0);
  });

  it("single request", () => {
    const result = ElevatorAlgorithm.scan([100], 50, "up", 199);
    expect(result.order).toEqual([100]);
    expect(result.totalMovement).toBe(50);
  });
});
