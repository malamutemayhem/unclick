import { describe, it, expect } from "vitest";
import {
  capacity, heatEfficiency, materialRange, footprint,
  rdCost, directHeat, forBulk, heating,
  bestUse, rotaryDryerTypes,
} from "../rotary-dryer-calc.js";

describe("capacity", () => {
  it("rotary kiln highest capacity", () => {
    expect(capacity("rotary_kiln_calcine")).toBeGreaterThan(capacity("rotary_louvre_gentle"));
  });
});

describe("heatEfficiency", () => {
  it("indirect steam tube most efficient", () => {
    expect(heatEfficiency("indirect_steam_tube")).toBeGreaterThan(heatEfficiency("rotary_kiln_calcine"));
  });
});

describe("materialRange", () => {
  it("direct heat widest material range", () => {
    expect(materialRange("direct_heat_co_current")).toBeGreaterThan(materialRange("rotary_louvre_gentle"));
  });
});

describe("footprint", () => {
  it("triple pass most compact", () => {
    expect(footprint("triple_pass_compact")).toBeGreaterThan(footprint("rotary_kiln_calcine"));
  });
});

describe("rdCost", () => {
  it("rotary kiln most expensive", () => {
    expect(rdCost("rotary_kiln_calcine")).toBeGreaterThan(rdCost("direct_heat_co_current"));
  });
});

describe("directHeat", () => {
  it("direct heat is direct", () => {
    expect(directHeat("direct_heat_co_current")).toBe(true);
  });
  it("indirect steam tube not direct", () => {
    expect(directHeat("indirect_steam_tube")).toBe(false);
  });
});

describe("forBulk", () => {
  it("direct heat for bulk", () => {
    expect(forBulk("direct_heat_co_current")).toBe(true);
  });
  it("rotary louvre not for bulk", () => {
    expect(forBulk("rotary_louvre_gentle")).toBe(false);
  });
});

describe("heating", () => {
  it("triple pass uses three concentric cylinder", () => {
    expect(heating("triple_pass_compact")).toBe("three_concentric_cylinder_compact_path");
  });
});

describe("bestUse", () => {
  it("rotary kiln for cement clinker", () => {
    expect(bestUse("rotary_kiln_calcine")).toBe("cement_clinker_lime_calcine_high_temp");
  });
});

describe("rotaryDryerTypes", () => {
  it("returns 5 types", () => {
    expect(rotaryDryerTypes()).toHaveLength(5);
  });
});
