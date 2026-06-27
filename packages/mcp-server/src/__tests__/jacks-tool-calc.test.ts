import { describe, it, expect } from "vitest";
import {
  shapeControl, cutAbility, heatResist, springReturn,
  jacksCost, forCutting, curvedBlade, bladeStyle,
  bestUse, jacksTools,
} from "../jacks-tool-calc.js";

describe("shapeControl", () => {
  it("straight blade pair best shape control", () => {
    expect(shapeControl("straight_blade_pair")).toBeGreaterThan(shapeControl("diamond_shears_cut"));
  });
});

describe("cutAbility", () => {
  it("diamond shears cut best cutting", () => {
    expect(cutAbility("diamond_shears_cut")).toBeGreaterThan(cutAbility("battledore_paddle_flat"));
  });
});

describe("heatResist", () => {
  it("battledore paddle flat best heat resist", () => {
    expect(heatResist("battledore_paddle_flat")).toBeGreaterThan(heatResist("tweezers_fine_grab"));
  });
});

describe("springReturn", () => {
  it("tweezers fine grab best spring return", () => {
    expect(springReturn("tweezers_fine_grab")).toBeGreaterThan(springReturn("battledore_paddle_flat"));
  });
});

describe("jacksCost", () => {
  it("parrot beak curve most expensive", () => {
    expect(jacksCost("parrot_beak_curve")).toBeGreaterThan(jacksCost("tweezers_fine_grab"));
  });
});

describe("forCutting", () => {
  it("diamond shears cut is for cutting", () => {
    expect(forCutting("diamond_shears_cut")).toBe(true);
  });
  it("straight blade pair not for cutting", () => {
    expect(forCutting("straight_blade_pair")).toBe(false);
  });
});

describe("curvedBlade", () => {
  it("parrot beak curve has curved blade", () => {
    expect(curvedBlade("parrot_beak_curve")).toBe(true);
  });
  it("straight blade pair no curved blade", () => {
    expect(curvedBlade("straight_blade_pair")).toBe(false);
  });
});

describe("bladeStyle", () => {
  it("battledore paddle flat uses flat paddle face", () => {
    expect(bladeStyle("battledore_paddle_flat")).toBe("flat_paddle_face");
  });
});

describe("bestUse", () => {
  it("straight blade pair best for neck constrict form", () => {
    expect(bestUse("straight_blade_pair")).toBe("neck_constrict_form");
  });
});

describe("jacksTools", () => {
  it("returns 5 types", () => {
    expect(jacksTools()).toHaveLength(5);
  });
});
