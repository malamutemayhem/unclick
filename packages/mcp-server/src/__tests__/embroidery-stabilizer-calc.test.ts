import { describe, it, expect } from "vitest";
import {
  holdStrength, removalEase, fabricSafe, versatility,
  stabilizerCost, fullRemoval, noHoopNeeded, removalMethod,
  bestFabric, embroideryStabilizers,
} from "../embroidery-stabilizer-calc.js";

describe("holdStrength", () => {
  it("cut away permanent strongest hold", () => {
    expect(holdStrength("cut_away_permanent")).toBeGreaterThan(holdStrength("wash_away_dissolve"));
  });
});

describe("removalEase", () => {
  it("wash away dissolve easiest removal", () => {
    expect(removalEase("wash_away_dissolve")).toBeGreaterThan(removalEase("cut_away_permanent"));
  });
});

describe("fabricSafe", () => {
  it("wash away dissolve most fabric safe", () => {
    expect(fabricSafe("wash_away_dissolve")).toBeGreaterThan(fabricSafe("heat_away_vanish"));
  });
});

describe("versatility", () => {
  it("sticky back adhesive most versatile", () => {
    expect(versatility("sticky_back_adhesive")).toBeGreaterThan(versatility("heat_away_vanish"));
  });
});

describe("stabilizerCost", () => {
  it("heat away vanish more expensive than tear away", () => {
    expect(stabilizerCost("heat_away_vanish")).toBeGreaterThan(stabilizerCost("tear_away_light"));
  });
});

describe("fullRemoval", () => {
  it("wash away dissolve has full removal", () => {
    expect(fullRemoval("wash_away_dissolve")).toBe(true);
  });
  it("cut away permanent does not have full removal", () => {
    expect(fullRemoval("cut_away_permanent")).toBe(false);
  });
});

describe("noHoopNeeded", () => {
  it("sticky back adhesive needs no hoop", () => {
    expect(noHoopNeeded("sticky_back_adhesive")).toBe(true);
  });
  it("tear away light needs hoop", () => {
    expect(noHoopNeeded("tear_away_light")).toBe(false);
  });
});

describe("removalMethod", () => {
  it("wash away dissolve uses water dissolve rinse", () => {
    expect(removalMethod("wash_away_dissolve")).toBe("water_dissolve_rinse");
  });
});

describe("bestFabric", () => {
  it("cut away permanent best for knit stretch jersey", () => {
    expect(bestFabric("cut_away_permanent")).toBe("knit_stretch_jersey");
  });
});

describe("embroideryStabilizers", () => {
  it("returns 5 types", () => {
    expect(embroideryStabilizers()).toHaveLength(5);
  });
});
