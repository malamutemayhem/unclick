import { describe, it, expect } from "vitest";
import {
  breakingLoadKn, stretchPercent, corrosionResistance,
  fatigueLife, inspectionEase, uvVulnerable,
  spliceable, bestApplication, costPerMeter, riggingWires,
} from "../rigging-wire-calc.js";

describe("breakingLoadKn", () => {
  it("rod rigging has highest breaking load", () => {
    expect(breakingLoadKn("rod_rigging")).toBeGreaterThan(
      breakingLoadKn("galvanized")
    );
  });
});

describe("stretchPercent", () => {
  it("stainless 7x7 stretches most", () => {
    expect(stretchPercent("stainless_7x7")).toBeGreaterThan(
      stretchPercent("rod_rigging")
    );
  });
});

describe("corrosionResistance", () => {
  it("dyneema resists corrosion best", () => {
    expect(corrosionResistance("dyneema_standing")).toBeGreaterThan(
      corrosionResistance("galvanized")
    );
  });
});

describe("fatigueLife", () => {
  it("rod rigging has best fatigue life", () => {
    expect(fatigueLife("rod_rigging")).toBeGreaterThan(
      fatigueLife("galvanized")
    );
  });
});

describe("inspectionEase", () => {
  it("galvanized easiest to inspect", () => {
    expect(inspectionEase("galvanized")).toBeGreaterThan(
      inspectionEase("rod_rigging")
    );
  });
});

describe("uvVulnerable", () => {
  it("dyneema is UV vulnerable", () => {
    expect(uvVulnerable("dyneema_standing")).toBe(true);
  });
  it("stainless is not", () => {
    expect(uvVulnerable("stainless_1x19")).toBe(false);
  });
});

describe("spliceable", () => {
  it("dyneema is spliceable", () => {
    expect(spliceable("dyneema_standing")).toBe(true);
  });
  it("stainless is not", () => {
    expect(spliceable("stainless_1x19")).toBe(false);
  });
});

describe("bestApplication", () => {
  it("rod rigging best for performance yacht", () => {
    expect(bestApplication("rod_rigging")).toBe("performance_yacht");
  });
});

describe("costPerMeter", () => {
  it("rod rigging costs most", () => {
    expect(costPerMeter("rod_rigging")).toBeGreaterThan(
      costPerMeter("galvanized")
    );
  });
});

describe("riggingWires", () => {
  it("returns 5 types", () => {
    expect(riggingWires()).toHaveLength(5);
  });
});
