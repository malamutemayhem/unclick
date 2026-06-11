import { describe, it, expect } from "vitest";
import {
  braidQuality, throughput, patternRange, tensionControl,
  rbCost, automated, forComposite, braiderConfig,
  bestUse, ropeBraiderTypes,
} from "../rope-braider-calc.js";

describe("braidQuality", () => {
  it("3d braider best braid quality", () => {
    expect(braidQuality("3d_braider")).toBeGreaterThan(braidQuality("horn_gear"));
  });
});

describe("throughput", () => {
  it("rotary braider highest throughput", () => {
    expect(throughput("rotary_braider")).toBeGreaterThan(throughput("3d_braider"));
  });
});

describe("patternRange", () => {
  it("3d braider widest pattern range", () => {
    expect(patternRange("3d_braider")).toBeGreaterThan(patternRange("maypole_braider"));
  });
});

describe("tensionControl", () => {
  it("3d braider best tension control", () => {
    expect(tensionControl("3d_braider")).toBeGreaterThan(tensionControl("horn_gear"));
  });
});

describe("rbCost", () => {
  it("3d braider most expensive", () => {
    expect(rbCost("3d_braider")).toBeGreaterThan(rbCost("horn_gear"));
  });
});

describe("automated", () => {
  it("rotary braider is automated", () => {
    expect(automated("rotary_braider")).toBe(true);
  });
  it("horn gear not automated", () => {
    expect(automated("horn_gear")).toBe(false);
  });
});

describe("forComposite", () => {
  it("3d braider for composite", () => {
    expect(forComposite("3d_braider")).toBe(true);
  });
  it("maypole braider not for composite", () => {
    expect(forComposite("maypole_braider")).toBe(false);
  });
});

describe("braiderConfig", () => {
  it("carrier braider uses multi carrier track over under weave sheath", () => {
    expect(braiderConfig("carrier_braider")).toBe("carrier_braider_multi_carrier_track_over_under_weave_sheath");
  });
});

describe("bestUse", () => {
  it("3d braider for aerospace composite preform structural reinforcement", () => {
    expect(bestUse("3d_braider")).toBe("aerospace_3d_braider_composite_preform_structural_reinforcement");
  });
});

describe("ropeBraiderTypes", () => {
  it("returns 5 types", () => {
    expect(ropeBraiderTypes()).toHaveLength(5);
  });
});
