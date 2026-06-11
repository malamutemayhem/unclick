import { describe, it, expect } from "vitest";
import {
  speed, grainCapacity, efficiency, grainQuality,
  chCost, selfLeveling, forRice, separation,
  bestUse, combineHarvesterTypes,
} from "../combine-harvester-calc.js";

describe("speed", () => {
  it("rotary axial fastest", () => {
    expect(speed("rotary_axial")).toBeGreaterThan(speed("conventional_walker"));
  });
});

describe("grainCapacity", () => {
  it("rotary axial highest grain capacity", () => {
    expect(grainCapacity("rotary_axial")).toBeGreaterThan(grainCapacity("conventional_walker"));
  });
});

describe("efficiency", () => {
  it("rotary axial most efficient", () => {
    expect(efficiency("rotary_axial")).toBeGreaterThan(efficiency("conventional_walker"));
  });
});

describe("grainQuality", () => {
  it("conventional walker best grain quality", () => {
    expect(grainQuality("conventional_walker")).toBeGreaterThan(grainQuality("rotary_axial"));
  });
});

describe("chCost", () => {
  it("hybrid most expensive", () => {
    expect(chCost("hybrid")).toBeGreaterThan(chCost("conventional_walker"));
  });
});

describe("selfLeveling", () => {
  it("hillside leveling is self leveling", () => {
    expect(selfLeveling("hillside_leveling")).toBe(true);
  });
  it("rotary axial not self leveling", () => {
    expect(selfLeveling("rotary_axial")).toBe(false);
  });
});

describe("forRice", () => {
  it("track drive for rice", () => {
    expect(forRice("track_drive")).toBe(true);
  });
  it("rotary axial not for rice", () => {
    expect(forRice("rotary_axial")).toBe(false);
  });
});

describe("separation", () => {
  it("conventional walker uses straw walker", () => {
    expect(separation("conventional_walker")).toBe("straw_walker_reciprocating_rack_grain_pan_sieve_fan");
  });
});

describe("bestUse", () => {
  it("rotary axial for large scale corn soybean", () => {
    expect(bestUse("rotary_axial")).toBe("large_scale_corn_soybean_high_throughput_dryland_farming");
  });
});

describe("combineHarvesterTypes", () => {
  it("returns 5 types", () => {
    expect(combineHarvesterTypes()).toHaveLength(5);
  });
});
