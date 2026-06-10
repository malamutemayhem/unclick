import { describe, it, expect } from "vitest";
import {
  stretchability, seamStrength, visibility,
  speedRating, fabricBulk, preventsRavel,
  decorative, bestUse, threadConsumption, sewingStitches,
} from "../sewing-stitch-calc.js";

describe("stretchability", () => {
  it("overlock stretches most", () => {
    expect(stretchability("overlock")).toBeGreaterThan(
      stretchability("straight")
    );
  });
});

describe("seamStrength", () => {
  it("overlock is strongest", () => {
    expect(seamStrength("overlock")).toBeGreaterThan(
      seamStrength("blind_hem")
    );
  });
});

describe("visibility", () => {
  it("topstitch is most visible", () => {
    expect(visibility("topstitch")).toBeGreaterThan(
      visibility("blind_hem")
    );
  });
});

describe("speedRating", () => {
  it("straight is fastest", () => {
    expect(speedRating("straight")).toBeGreaterThan(
      speedRating("blind_hem")
    );
  });
});

describe("fabricBulk", () => {
  it("overlock adds most bulk", () => {
    expect(fabricBulk("overlock")).toBeGreaterThan(
      fabricBulk("blind_hem")
    );
  });
});

describe("preventsRavel", () => {
  it("overlock prevents ravel", () => {
    expect(preventsRavel("overlock")).toBe(true);
  });
  it("straight does not", () => {
    expect(preventsRavel("straight")).toBe(false);
  });
});

describe("decorative", () => {
  it("topstitch is decorative", () => {
    expect(decorative("topstitch")).toBe(true);
  });
  it("zigzag is not", () => {
    expect(decorative("zigzag")).toBe(false);
  });
});

describe("bestUse", () => {
  it("overlock for edge finishing", () => {
    expect(bestUse("overlock")).toBe("edge_finishing");
  });
});

describe("threadConsumption", () => {
  it("overlock uses most thread", () => {
    expect(threadConsumption("overlock")).toBeGreaterThan(
      threadConsumption("straight")
    );
  });
});

describe("sewingStitches", () => {
  it("returns 5 types", () => {
    expect(sewingStitches()).toHaveLength(5);
  });
});
