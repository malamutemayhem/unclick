import { describe, it, expect } from "vitest";
import {
  strictQuorum, readHeavyQuorum, writeHeavyQuorum, customQuorum,
  isStrongConsistency, faultTolerance, availabilityScore, SloppyQuorum,
} from "../quorum-calc.js";

describe("quorum configurations", () => {
  it("strictQuorum for 3 nodes", () => {
    const q = strictQuorum(3);
    expect(q.readQuorum).toBe(2);
    expect(q.writeQuorum).toBe(2);
  });

  it("strictQuorum for 5 nodes", () => {
    const q = strictQuorum(5);
    expect(q.readQuorum).toBe(3);
    expect(q.writeQuorum).toBe(3);
  });

  it("readHeavyQuorum reads from 1, writes to all", () => {
    const q = readHeavyQuorum(3);
    expect(q.readQuorum).toBe(1);
    expect(q.writeQuorum).toBe(3);
  });

  it("writeHeavyQuorum writes to 1, reads from all", () => {
    const q = writeHeavyQuorum(3);
    expect(q.readQuorum).toBe(3);
    expect(q.writeQuorum).toBe(1);
  });

  it("customQuorum validates R+W > N", () => {
    expect(customQuorum(5, 2, 4)).not.toBeNull();
    expect(customQuorum(5, 2, 3)).toBeNull();
  });

  it("customQuorum validates bounds", () => {
    expect(customQuorum(3, 0, 3)).toBeNull();
    expect(customQuorum(3, 4, 1)).toBeNull();
  });
});

describe("isStrongConsistency", () => {
  it("strict quorum is strong", () => {
    expect(isStrongConsistency(strictQuorum(3))).toBe(true);
  });

  it("weak config is not strong", () => {
    expect(isStrongConsistency({ nodes: 5, readQuorum: 1, writeQuorum: 1 })).toBe(false);
  });
});

describe("faultTolerance", () => {
  it("calculates read and write faults", () => {
    const ft = faultTolerance(strictQuorum(5));
    expect(ft.readFaults).toBe(2);
    expect(ft.writeFaults).toBe(2);
  });

  it("readHeavy tolerates more read faults", () => {
    const ft = faultTolerance(readHeavyQuorum(5));
    expect(ft.readFaults).toBe(4);
    expect(ft.writeFaults).toBe(0);
  });
});

describe("availabilityScore", () => {
  it("returns high availability for low failure rate", () => {
    const score = availabilityScore(strictQuorum(3), 0.01);
    expect(score.readAvail).toBeGreaterThan(0.99);
    expect(score.writeAvail).toBeGreaterThan(0.99);
  });

  it("returns 1.0 for zero failure rate", () => {
    const score = availabilityScore(strictQuorum(3), 0);
    expect(score.readAvail).toBeCloseTo(1);
    expect(score.writeAvail).toBeCloseTo(1);
  });
});

describe("SloppyQuorum", () => {
  it("getWriteNodes returns W nodes", () => {
    const sq = new SloppyQuorum(["a", "b", "c", "d", "e"], 3, 2, 2);
    const alive = new Set(["a", "b", "c", "d", "e"]);
    expect(sq.getWriteNodes(alive)).toHaveLength(2);
  });

  it("getReadNodes returns R nodes", () => {
    const sq = new SloppyQuorum(["a", "b", "c"], 3, 2, 2);
    const alive = new Set(["a", "b", "c"]);
    expect(sq.getReadNodes(alive)).toHaveLength(2);
  });

  it("canWrite returns false when not enough alive", () => {
    const sq = new SloppyQuorum(["a", "b", "c"], 3, 2, 2);
    const alive = new Set(["a"]);
    expect(sq.canWrite(alive)).toBe(false);
  });

  it("hintedHandoff returns substitute", () => {
    const sq = new SloppyQuorum(["a", "b", "c"], 3, 2, 2);
    const alive = new Set(["b", "c"]);
    expect(sq.hintedHandoff("a", alive)).toBe("b");
  });

  it("hintedHandoff returns null if node is alive", () => {
    const sq = new SloppyQuorum(["a", "b", "c"], 3, 2, 2);
    const alive = new Set(["a", "b", "c"]);
    expect(sq.hintedHandoff("a", alive)).toBeNull();
  });

  it("replicationFactor and quorum getters", () => {
    const sq = new SloppyQuorum(["a", "b", "c"], 3, 2, 2);
    expect(sq.replicationFactor).toBe(3);
    expect(sq.readQuorum).toBe(2);
    expect(sq.writeQuorum).toBe(2);
  });
});
