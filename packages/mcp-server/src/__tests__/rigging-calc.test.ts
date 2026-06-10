import { describe, it, expect } from "vitest";
import {
  mastHeightM, sailAreaM2, standingRiggingLengthM, runningRiggingLengthM,
  shroudCount, blockCount, ropeDiameterMm, windForceKn,
  reefPoints, riggingCost, rigTypes,
} from "../rigging-calc.js";

describe("mastHeightM", () => {
  it("bermuda tallest", () => {
    expect(mastHeightM(15, "bermuda")).toBeGreaterThan(mastHeightM(15, "junk"));
  });
});

describe("sailAreaM2", () => {
  it("positive area", () => {
    expect(sailAreaM2(13, "square")).toBeGreaterThan(0);
  });
});

describe("standingRiggingLengthM", () => {
  it("4.5x mast height", () => {
    expect(standingRiggingLengthM(10)).toBe(45);
  });
});

describe("runningRiggingLengthM", () => {
  it("square most running rigging", () => {
    expect(runningRiggingLengthM(10, "square")).toBeGreaterThan(
      runningRiggingLengthM(10, "junk")
    );
  });
});

describe("shroudCount", () => {
  it("at least 4", () => {
    expect(shroudCount(5)).toBeGreaterThanOrEqual(4);
  });
});

describe("blockCount", () => {
  it("square most blocks", () => {
    expect(blockCount("square", 1)).toBeGreaterThan(blockCount("junk", 1));
  });
});

describe("ropeDiameterMm", () => {
  it("positive diameter", () => {
    expect(ropeDiameterMm(100)).toBeGreaterThan(8);
  });
});

describe("windForceKn", () => {
  it("positive force", () => {
    expect(windForceKn(100, 20)).toBeGreaterThan(0);
  });
});

describe("reefPoints", () => {
  it("at least 1", () => {
    expect(reefPoints(20)).toBe(1);
  });
});

describe("riggingCost", () => {
  it("square most expensive", () => {
    expect(riggingCost("square", 13, 100)).toBeGreaterThan(riggingCost("junk", 13, 100));
  });
});

describe("rigTypes", () => {
  it("returns 5 rig types", () => {
    expect(rigTypes()).toHaveLength(5);
  });
});
