import { describe, it, expect } from "vitest";
import { BankerAlgorithm } from "../banker-algorithm.js";

describe("BankerAlgorithm", () => {
  it("detects safe state", () => {
    const available = [3, 3, 2];
    const max = [[7, 5, 3], [3, 2, 2], [9, 0, 2], [2, 2, 2], [4, 3, 3]];
    const allocation = [[0, 1, 0], [2, 0, 0], [3, 0, 2], [2, 1, 1], [0, 0, 2]];
    const banker = new BankerAlgorithm(available, max, allocation);
    expect(banker.isSafe()).toBe(true);
  });

  it("returns safe sequence", () => {
    const available = [3, 3, 2];
    const max = [[7, 5, 3], [3, 2, 2], [9, 0, 2], [2, 2, 2], [4, 3, 3]];
    const allocation = [[0, 1, 0], [2, 0, 0], [3, 0, 2], [2, 1, 1], [0, 0, 2]];
    const banker = new BankerAlgorithm(available, max, allocation);
    const seq = banker.safeSequence();
    expect(seq).not.toBeNull();
    expect(seq!.length).toBe(5);
    expect(new Set(seq!).size).toBe(5);
  });

  it("detects unsafe state", () => {
    const available = [0, 0, 0];
    const max = [[2, 2, 2], [2, 2, 2]];
    const allocation = [[1, 1, 1], [1, 1, 1]];
    const banker = new BankerAlgorithm(available, max, allocation);
    expect(banker.isSafe()).toBe(false);
    expect(banker.safeSequence()).toBeNull();
  });

  it("canRequest allows safe requests", () => {
    const available = [3, 3, 2];
    const max = [[7, 5, 3], [3, 2, 2], [9, 0, 2], [2, 2, 2], [4, 3, 3]];
    const allocation = [[0, 1, 0], [2, 0, 0], [3, 0, 2], [2, 1, 1], [0, 0, 2]];
    const banker = new BankerAlgorithm(available, max, allocation);
    expect(banker.canRequest(1, [1, 0, 2])).toBe(true);
  });

  it("canRequest rejects request exceeding need", () => {
    const available = [3, 3, 2];
    const max = [[3, 2, 2]];
    const allocation = [[2, 0, 0]];
    const banker = new BankerAlgorithm(available, max, allocation);
    expect(banker.canRequest(0, [2, 0, 0])).toBe(false);
  });

  it("canRequest rejects request exceeding available", () => {
    const available = [1, 0, 0];
    const max = [[5, 5, 5]];
    const allocation = [[0, 0, 0]];
    const banker = new BankerAlgorithm(available, max, allocation);
    expect(banker.canRequest(0, [0, 1, 0])).toBe(false);
  });

  it("processCount and resourceCount", () => {
    const banker = new BankerAlgorithm([1, 2], [[3, 4]], [[0, 0]]);
    expect(banker.processCount()).toBe(1);
    expect(banker.resourceCount()).toBe(2);
  });

  it("single process trivially safe", () => {
    const banker = new BankerAlgorithm([5], [[5]], [[0]]);
    expect(banker.isSafe()).toBe(true);
    expect(banker.safeSequence()).toEqual([0]);
  });
});
