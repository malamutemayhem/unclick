import { describe, it, expect } from "vitest";
import {
  efficiency, capacity, footprint, driftLoss,
  ctCost, evaporative, forLargeScale, fill,
  bestUse, coolingTowerTypes,
} from "../cooling-tower-calc.js";

describe("efficiency", () => {
  it("natural draft most efficient", () => {
    expect(efficiency("natural_draft_hyperbolic")).toBeGreaterThan(efficiency("forced_draft_crossflow"));
  });
});

describe("capacity", () => {
  it("natural draft highest capacity", () => {
    expect(capacity("natural_draft_hyperbolic")).toBeGreaterThan(capacity("closed_circuit_fluid"));
  });
});

describe("footprint", () => {
  it("closed circuit smallest footprint", () => {
    expect(footprint("closed_circuit_fluid")).toBeGreaterThan(footprint("natural_draft_hyperbolic"));
  });
});

describe("driftLoss", () => {
  it("forced draft highest drift loss", () => {
    expect(driftLoss("forced_draft_crossflow")).toBeGreaterThan(driftLoss("closed_circuit_fluid"));
  });
});

describe("ctCost", () => {
  it("natural draft most expensive", () => {
    expect(ctCost("natural_draft_hyperbolic")).toBeGreaterThan(ctCost("forced_draft_crossflow"));
  });
});

describe("evaporative", () => {
  it("induced draft is evaporative", () => {
    expect(evaporative("induced_draft_counterflow")).toBe(true);
  });
  it("closed circuit not evaporative", () => {
    expect(evaporative("closed_circuit_fluid")).toBe(false);
  });
});

describe("forLargeScale", () => {
  it("natural draft for large scale", () => {
    expect(forLargeScale("natural_draft_hyperbolic")).toBe(true);
  });
  it("forced draft not for large scale", () => {
    expect(forLargeScale("forced_draft_crossflow")).toBe(false);
  });
});

describe("fill", () => {
  it("hybrid uses combined wet dry section", () => {
    expect(fill("hybrid_plume_abatement")).toBe("combined_wet_dry_section_plume_free");
  });
});

describe("bestUse", () => {
  it("natural draft for power station", () => {
    expect(bestUse("natural_draft_hyperbolic")).toBe("power_station_large_continuous_base_load");
  });
});

describe("coolingTowerTypes", () => {
  it("returns 5 types", () => {
    expect(coolingTowerTypes()).toHaveLength(5);
  });
});
