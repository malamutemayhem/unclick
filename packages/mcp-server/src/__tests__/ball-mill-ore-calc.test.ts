import { describe, it, expect } from "vitest";
import {
  grindFineness, throughput, energyEfficiency, mediaWear,
  bmCost, autogenous, forUltrafine, millConfig,
  bestUse, ballMillOreTypes,
} from "../ball-mill-ore-calc.js";

describe("grindFineness", () => {
  it("tower mill best grind fineness", () => {
    expect(grindFineness("tower_mill")).toBeGreaterThan(grindFineness("rod_mill"));
  });
});

describe("throughput", () => {
  it("sag mill highest throughput", () => {
    expect(throughput("sag_mill")).toBeGreaterThan(throughput("tower_mill"));
  });
});

describe("energyEfficiency", () => {
  it("sag mill best energy efficiency", () => {
    expect(energyEfficiency("sag_mill")).toBeGreaterThan(energyEfficiency("overflow_ball"));
  });
});

describe("mediaWear", () => {
  it("sag mill most media wear", () => {
    expect(mediaWear("sag_mill")).toBeGreaterThan(mediaWear("tower_mill"));
  });
});

describe("bmCost", () => {
  it("sag mill most expensive", () => {
    expect(bmCost("sag_mill")).toBeGreaterThan(bmCost("rod_mill"));
  });
});

describe("autogenous", () => {
  it("sag mill is autogenous", () => {
    expect(autogenous("sag_mill")).toBe(true);
  });
  it("overflow ball not autogenous", () => {
    expect(autogenous("overflow_ball")).toBe(false);
  });
});

describe("forUltrafine", () => {
  it("tower mill for ultrafine", () => {
    expect(forUltrafine("tower_mill")).toBe(true);
  });
  it("rod mill not for ultrafine", () => {
    expect(forUltrafine("rod_mill")).toBe(false);
  });
});

describe("millConfig", () => {
  it("sag mill uses semi autogenous ore media large diameter primary grind", () => {
    expect(millConfig("sag_mill")).toBe("sag_mill_semi_autogenous_ore_media_large_diameter_primary_grind");
  });
});

describe("bestUse", () => {
  it("rod mill for aggregate uniform coarse grind minimal fines sand", () => {
    expect(bestUse("rod_mill")).toBe("aggregate_rod_mill_uniform_coarse_grind_minimal_fines_sand");
  });
});

describe("ballMillOreTypes", () => {
  it("returns 5 types", () => {
    expect(ballMillOreTypes()).toHaveLength(5);
  });
});
