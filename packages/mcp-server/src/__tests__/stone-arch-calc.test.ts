import { describe, it, expect } from "vitest";
import {
  riseToSpanRatio, voussoirCount, thrustAngleDeg, keystoneRequired,
  centeringRequired, maxSpanM, loadCapacityRating, skillLevel,
  costPerMeterSpan, archTypes,
} from "../stone-arch-calc.js";

describe("riseToSpanRatio", () => {
  it("pointed has highest rise", () => {
    expect(riseToSpanRatio("pointed")).toBeGreaterThan(
      riseToSpanRatio("flat_jack")
    );
  });
});

describe("voussoirCount", () => {
  it("more voussoirs for wider span", () => {
    expect(voussoirCount("semicircular", 3)).toBeGreaterThan(
      voussoirCount("semicircular", 1)
    );
  });
});

describe("thrustAngleDeg", () => {
  it("flat jack has steepest thrust", () => {
    expect(thrustAngleDeg("flat_jack")).toBeGreaterThan(
      thrustAngleDeg("pointed")
    );
  });
});

describe("keystoneRequired", () => {
  it("semicircular needs keystone", () => {
    expect(keystoneRequired("semicircular")).toBe(true);
  });
  it("flat jack does not need keystone", () => {
    expect(keystoneRequired("flat_jack")).toBe(false);
  });
});

describe("centeringRequired", () => {
  it("always required", () => {
    expect(centeringRequired("semicircular")).toBe(true);
  });
});

describe("maxSpanM", () => {
  it("pointed spans furthest", () => {
    expect(maxSpanM("pointed")).toBeGreaterThan(maxSpanM("flat_jack"));
  });
});

describe("loadCapacityRating", () => {
  it("pointed has best load capacity", () => {
    expect(loadCapacityRating("pointed")).toBeGreaterThan(
      loadCapacityRating("flat_jack")
    );
  });
});

describe("skillLevel", () => {
  it("horseshoe needs most skill", () => {
    expect(skillLevel("horseshoe")).toBeGreaterThan(
      skillLevel("flat_jack")
    );
  });
});

describe("costPerMeterSpan", () => {
  it("horseshoe is most expensive", () => {
    expect(costPerMeterSpan("horseshoe")).toBeGreaterThan(
      costPerMeterSpan("flat_jack")
    );
  });
});

describe("archTypes", () => {
  it("returns 5 types", () => {
    expect(archTypes()).toHaveLength(5);
  });
});
