import { describe, it, expect } from "vitest";
import {
  cutQuality, speed, thickness, operatingCost,
  pcCost, lowFume, forStainless, gas,
  bestUse, plasmaCutTypes,
} from "../plasma-cut-calc.js";

describe("cutQuality", () => {
  it("fine plasma best cut quality", () => {
    expect(cutQuality("fine_plasma_precision")).toBeGreaterThan(cutQuality("conventional_dual_gas"));
  });
});

describe("speed", () => {
  it("conventional fastest", () => {
    expect(speed("conventional_dual_gas")).toBeGreaterThan(speed("fine_plasma_precision"));
  });
});

describe("thickness", () => {
  it("conventional thickest capacity", () => {
    expect(thickness("conventional_dual_gas")).toBeGreaterThan(thickness("fine_plasma_precision"));
  });
});

describe("operatingCost", () => {
  it("fine plasma highest operating cost", () => {
    expect(operatingCost("fine_plasma_precision")).toBeGreaterThan(operatingCost("conventional_dual_gas"));
  });
});

describe("pcCost", () => {
  it("CNC bevel most expensive", () => {
    expect(pcCost("cnc_bevel_3d_head")).toBeGreaterThan(pcCost("conventional_dual_gas"));
  });
});

describe("lowFume", () => {
  it("underwater is low fume", () => {
    expect(lowFume("underwater_submerged")).toBe(true);
  });
  it("conventional not low fume", () => {
    expect(lowFume("conventional_dual_gas")).toBe(false);
  });
});

describe("forStainless", () => {
  it("high definition for stainless", () => {
    expect(forStainless("high_definition_hd")).toBe(true);
  });
  it("conventional not for stainless", () => {
    expect(forStainless("conventional_dual_gas")).toBe(false);
  });
});

describe("gas", () => {
  it("underwater uses oxygen shield water muffler", () => {
    expect(gas("underwater_submerged")).toBe("oxygen_shield_water_muffler");
  });
});

describe("bestUse", () => {
  it("conventional for structural steel", () => {
    expect(bestUse("conventional_dual_gas")).toBe("structural_steel_plate_fab");
  });
});

describe("plasmaCutTypes", () => {
  it("returns 5 types", () => {
    expect(plasmaCutTypes()).toHaveLength(5);
  });
});
