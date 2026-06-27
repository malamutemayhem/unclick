import { describe, it, expect } from "vitest";
import {
  holesPerCm, threadLengthMultiplier, needlesRequired, strengthRating,
  decorativeRating, speedRating, ponyRequired, bestForProject,
  costPerMeter, stitchTypes,
} from "../stitching-pony-calc.js";

describe("holesPerCm", () => {
  it("whip stitch has most holes", () => {
    expect(holesPerCm("whip_stitch")).toBeGreaterThan(
      holesPerCm("lacing")
    );
  });
});

describe("threadLengthMultiplier", () => {
  it("cross stitch uses most thread", () => {
    expect(threadLengthMultiplier("cross_stitch")).toBeGreaterThan(
      threadLengthMultiplier("whip_stitch")
    );
  });
});

describe("needlesRequired", () => {
  it("saddle stitch needs two needles", () => {
    expect(needlesRequired("saddle_stitch")).toBe(2);
  });
});

describe("strengthRating", () => {
  it("saddle stitch is strongest", () => {
    expect(strengthRating("saddle_stitch")).toBeGreaterThan(
      strengthRating("whip_stitch")
    );
  });
});

describe("decorativeRating", () => {
  it("cross stitch is most decorative", () => {
    expect(decorativeRating("cross_stitch")).toBeGreaterThan(
      decorativeRating("whip_stitch")
    );
  });
});

describe("speedRating", () => {
  it("whip stitch is fastest", () => {
    expect(speedRating("whip_stitch")).toBeGreaterThan(
      speedRating("cross_stitch")
    );
  });
});

describe("ponyRequired", () => {
  it("saddle stitch needs a pony", () => {
    expect(ponyRequired("saddle_stitch")).toBe(true);
  });
  it("whip stitch does not", () => {
    expect(ponyRequired("whip_stitch")).toBe(false);
  });
});

describe("bestForProject", () => {
  it("saddle stitch is best for wallets", () => {
    expect(bestForProject("saddle_stitch")).toBe("wallet");
  });
});

describe("costPerMeter", () => {
  it("lacing is most expensive", () => {
    expect(costPerMeter("lacing")).toBeGreaterThan(
      costPerMeter("whip_stitch")
    );
  });
});

describe("stitchTypes", () => {
  it("returns 5 types", () => {
    expect(stitchTypes()).toHaveLength(5);
  });
});
