import { describe, it, expect } from "vitest";
import {
  precision, minRadius, wallThin, speed,
  tbCost, mandrel, forTightRadius, mechanism,
  bestUse, tubeBendTypes,
} from "../tube-bend-calc.js";

describe("precision", () => {
  it("rotary draw most precise", () => {
    expect(precision("rotary_draw_mandrel")).toBeGreaterThan(precision("compression_ram_push"));
  });
});

describe("minRadius", () => {
  it("rotary draw tightest min radius", () => {
    expect(minRadius("rotary_draw_mandrel")).toBeGreaterThan(minRadius("roll_bend_three_roll"));
  });
});

describe("wallThin", () => {
  it("rotary draw best wall thinning control", () => {
    expect(wallThin("rotary_draw_mandrel")).toBeGreaterThan(wallThin("compression_ram_push"));
  });
});

describe("speed", () => {
  it("compression ram fastest", () => {
    expect(speed("compression_ram_push")).toBeGreaterThan(speed("induction_hot_bend"));
  });
});

describe("tbCost", () => {
  it("induction hot bend most expensive", () => {
    expect(tbCost("induction_hot_bend")).toBeGreaterThan(tbCost("compression_ram_push"));
  });
});

describe("mandrel", () => {
  it("rotary draw uses mandrel", () => {
    expect(mandrel("rotary_draw_mandrel")).toBe(true);
  });
  it("compression ram no mandrel", () => {
    expect(mandrel("compression_ram_push")).toBe(false);
  });
});

describe("forTightRadius", () => {
  it("rotary draw for tight radius", () => {
    expect(forTightRadius("rotary_draw_mandrel")).toBe(true);
  });
  it("roll bend not for tight radius", () => {
    expect(forTightRadius("roll_bend_three_roll")).toBe(false);
  });
});

describe("mechanism", () => {
  it("induction uses coil heat push quench", () => {
    expect(mechanism("induction_hot_bend")).toBe("induction_coil_heat_push_quench");
  });
});

describe("bestUse", () => {
  it("roll bend for large radius coil ring", () => {
    expect(bestUse("roll_bend_three_roll")).toBe("large_radius_coil_ring_structural");
  });
});

describe("tubeBendTypes", () => {
  it("returns 5 types", () => {
    expect(tubeBendTypes()).toHaveLength(5);
  });
});
