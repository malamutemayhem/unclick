import { describe, it, expect } from "vitest";
import {
  knotsPerCm, threadConsumptionFactor, toolsNeeded,
  joinComplexity, reversible, speedRating,
  dimensionalStability, beginnerFriendly, costPerProject, tattingStyles,
} from "../tatting-calc.js";

describe("knotsPerCm", () => {
  it("celtic has most knots", () => {
    expect(knotsPerCm("celtic")).toBeGreaterThan(
      knotsPerCm("cro_tatting")
    );
  });
});

describe("threadConsumptionFactor", () => {
  it("celtic consumes most thread", () => {
    expect(threadConsumptionFactor("celtic")).toBeGreaterThan(
      threadConsumptionFactor("needle")
    );
  });
});

describe("toolsNeeded", () => {
  it("shuttle needs 2 tools", () => {
    expect(toolsNeeded("shuttle")).toBe(2);
  });
  it("needle needs 1 tool", () => {
    expect(toolsNeeded("needle")).toBe(1);
  });
});

describe("joinComplexity", () => {
  it("celtic has most complex joins", () => {
    expect(joinComplexity("celtic")).toBeGreaterThan(
      joinComplexity("needle")
    );
  });
});

describe("reversible", () => {
  it("shuttle is reversible", () => {
    expect(reversible("shuttle")).toBe(true);
  });
  it("needle is not", () => {
    expect(reversible("needle")).toBe(false);
  });
});

describe("speedRating", () => {
  it("needle is fastest", () => {
    expect(speedRating("needle")).toBeGreaterThan(
      speedRating("celtic")
    );
  });
});

describe("dimensionalStability", () => {
  it("shuttle is most stable", () => {
    expect(dimensionalStability("shuttle")).toBeGreaterThan(
      dimensionalStability("cro_tatting")
    );
  });
});

describe("beginnerFriendly", () => {
  it("needle is most beginner friendly", () => {
    expect(beginnerFriendly("needle")).toBeGreaterThan(
      beginnerFriendly("celtic")
    );
  });
});

describe("costPerProject", () => {
  it("celtic is most expensive", () => {
    expect(costPerProject("celtic")).toBeGreaterThan(
      costPerProject("needle")
    );
  });
});

describe("tattingStyles", () => {
  it("returns 5 styles", () => {
    expect(tattingStyles()).toHaveLength(5);
  });
});
