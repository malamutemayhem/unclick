import { describe, it, expect } from "vitest";
import { AuctionAlgorithm } from "../auction-algorithm.js";

describe("AuctionAlgorithm", () => {
  it("assigns each person to an object", () => {
    const benefits = [
      [10, 5, 1],
      [1, 10, 5],
      [5, 1, 10],
    ];
    const { assignment } = AuctionAlgorithm.solve(benefits);
    expect(assignment.length).toBe(3);
    for (const j of assignment) {
      expect(j).toBeGreaterThanOrEqual(0);
      expect(j).toBeLessThan(3);
    }
  });

  it("produces valid assignment (no duplicates)", () => {
    const benefits = [
      [10, 5],
      [5, 10],
    ];
    const { assignment } = AuctionAlgorithm.solve(benefits);
    expect(AuctionAlgorithm.isValidAssignment(assignment, 2)).toBe(true);
  });

  it("optimal for diagonal preference", () => {
    const benefits = [
      [100, 0, 0],
      [0, 100, 0],
      [0, 0, 100],
    ];
    const { assignment, totalBenefit } = AuctionAlgorithm.solve(benefits);
    expect(totalBenefit).toBe(300);
    expect(assignment).toEqual([0, 1, 2]);
  });

  it("single person single object", () => {
    const { assignment, totalBenefit } = AuctionAlgorithm.solve([[42]]);
    expect(assignment).toEqual([0]);
    expect(totalBenefit).toBe(42);
  });

  it("isValidAssignment rejects duplicates", () => {
    expect(AuctionAlgorithm.isValidAssignment([0, 0], 2)).toBe(false);
  });

  it("isValidAssignment rejects out of range", () => {
    expect(AuctionAlgorithm.isValidAssignment([0, 5], 2)).toBe(false);
  });
});
